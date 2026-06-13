import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const logosDir = path.join(rootDir, 'public', 'logos')
const avatarsDir = path.join(rootDir, 'public', 'testimonials')

fs.mkdirSync(logosDir, { recursive: true })
fs.mkdirSync(avatarsDir, { recursive: true })

const BRANDS = [
  { slug: 'autozy', url: 'https://autozy.co' },
  { slug: 'raahban', url: 'https://raahban.com' },
  { slug: 'healthystart', url: 'https://healthystartnc.com' },
  { slug: 'nyuton', url: 'https://nyutonenterprises.com' },
  { slug: 'construction', url: 'https://constractioncompany.netlify.app' },
  { slug: 'ethisol', url: 'https://ethisol.com' },
]

const AVATARS = [
  {
    slug: 'client-1',
    url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=256&h=256&fit=crop&crop=face',
  },
  {
    slug: 'client-2',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&h=256&fit=crop&crop=face',
  },
  {
    slug: 'client-3',
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=256&h=256&fit=crop&crop=face',
  },
]

const LOGO_SELECTORS = [
  'header img:not([width="1"]):not([height="1"])',
  'nav img:not([width="1"]):not([height="1"])',
  '[class*="logo" i] img',
  '[id*="logo" i] img',
  'a[aria-label*="logo" i] img',
  '.navbar-brand img',
  'header a > img',
  'nav a > img',
  'header svg',
  'nav svg',
  '[class*="brand" i] img',
]

async function downloadBuffer(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PortfolioAssetBot/1.0)' },
    redirect: 'follow',
  })
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 80) throw new Error(`HTTP ${res.status} (empty)`)
  if (!res.ok && res.status !== 404) throw new Error(`HTTP ${res.status}`)
  return buf
}

async function saveLogo(buffer, outBase) {
  const pngPath = `${outBase}.png`
  const webpPath = `${outBase}.webp`

  const pipeline = sharp(buffer)
    .resize(256, 256, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .png()

  await pipeline.toFile(pngPath)
  await sharp(pngPath).webp({ quality: 90 }).toFile(webpPath)
  console.log(`  ✓ ${path.basename(webpPath)} (${fs.statSync(webpPath).size} bytes)`)
}

async function googleFavicon(hostname) {
  return downloadBuffer(`https://www.google.com/s2/favicons?domain=${hostname}&sz=256`)
}

async function dismissOverlays(page, slug) {
  if (slug === 'nyuton') {
    await page.evaluate(() => {
      document.getElementById('loadingScreen')?.remove()
      document.querySelectorAll('.loading-screen').forEach((el) => el.remove())
    })
    await page.waitForTimeout(1000)
  }
}

async function screenshotLogoElement(page) {
  for (const selector of LOGO_SELECTORS) {
    const locator = page.locator(selector).first()
    try {
      if ((await locator.count()) === 0) continue
      if (!(await locator.isVisible())) continue

      const box = await locator.boundingBox()
      if (!box || box.width < 12 || box.height < 12) continue
      if (box.width > 420 || box.height > 220) continue

      const buffer = await locator.screenshot({ type: 'png', omitBackground: true })
      if (buffer.length > 400) return buffer
    } catch {
      /* try next selector */
    }
  }
  return null
}

async function fetchMetaImage(page) {
  const urls = await page.evaluate(() => {
    const candidates = []
    const og = document.querySelector('meta[property="og:image"]')?.getAttribute('content')
    const apple = document.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href')
    const icons = Array.from(document.querySelectorAll('link[rel*="icon"]'))
      .map((l) => l.getAttribute('href'))
      .filter(Boolean)

    if (og) candidates.push(og)
    if (apple) candidates.push(apple)
    candidates.push(...icons)
    return candidates
  })

  for (const raw of urls) {
    try {
      const absolute = new URL(raw, page.url()).href
      const buf = await downloadBuffer(absolute)
      if (buf.length > 400) return buf
    } catch {
      /* next */
    }
  }
  return null
}

async function fetchLogoFromSite(page, brand) {
  const hostname = new URL(brand.url).hostname

  await page.goto(brand.url, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(2000)
  await dismissOverlays(page, brand.slug)

  const screenshot = await screenshotLogoElement(page)
  if (screenshot) return screenshot

  const metaImage = await fetchMetaImage(page)
  if (metaImage) return metaImage

  return googleFavicon(hostname)
}

async function fetchLogos() {
  console.log('Fetching brand logos...\n')
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

  for (const brand of BRANDS) {
    try {
      const buffer = await fetchLogoFromSite(page, brand)
      await saveLogo(buffer, path.join(logosDir, brand.slug))
    } catch (e) {
      console.warn(`  ✗ ${brand.slug}: ${e instanceof Error ? e.message : e}`)
    }
  }

  await browser.close()
}

async function fetchAvatars() {
  console.log('\nFetching testimonial portraits...\n')
  for (const avatar of AVATARS) {
    try {
      const buffer = await downloadBuffer(avatar.url)
      await sharp(buffer)
        .resize(128, 128, { fit: 'cover', position: 'centre' })
        .webp({ quality: 85 })
        .toFile(path.join(avatarsDir, `${avatar.slug}.webp`))
      console.log(`  ✓ ${avatar.slug}.webp`)
    } catch (e) {
      console.warn(`  ✗ ${avatar.slug}: ${e instanceof Error ? e.message : e}`)
    }
  }
}

await fetchLogos()
await fetchAvatars()
console.log('\nDone.')
