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

async function downloadBuffer(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PortfolioAssetBot/1.0)' },
  })
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 80) throw new Error(`HTTP ${res.status} (empty)`)
  if (!res.ok && res.status !== 404) throw new Error(`HTTP ${res.status}`)
  return buf
}

async function saveWebp(buffer, outBase) {
  const pngPath = `${outBase}.png`
  const webpPath = `${outBase}.webp`
  try {
    await sharp(buffer).resize(256, 256, { fit: 'contain', background: { r: 7, g: 7, b: 8, alpha: 1 } }).png().toFile(pngPath)
  } catch {
    // ICO/SVG or odd formats — use Google favicon fallback handled by caller
    throw new Error('unsupported image format')
  }
  await sharp(pngPath).webp({ quality: 88 }).toFile(webpPath)
  console.log(`  ✓ ${path.basename(webpPath)}`)
}

async function googleFavicon(hostname) {
  return downloadBuffer(`https://www.google.com/s2/favicons?domain=${hostname}&sz=128`)
}

async function fetchLogoFromSite(page, brand) {
  const hostname = new URL(brand.url).hostname

  await page.goto(brand.url, { waitUntil: 'domcontentloaded', timeout: 45000 })
  await page.waitForTimeout(2500)

  if (brand.slug === 'nyuton') {
    await page.evaluate(() => {
      document.getElementById('loadingScreen')?.remove()
      document.querySelectorAll('.loading-screen').forEach((el) => el.remove())
    })
    await page.waitForTimeout(1000)
  }

  const iconUrl = await page.evaluate(() => {
    const icons = Array.from(document.querySelectorAll('link[rel*="icon"]'))
    const apple = document.querySelector('link[rel="apple-touch-icon"]')
    const best =
      apple?.getAttribute('href') ||
      icons.find((l) => (l.getAttribute('sizes') || '').includes('192'))?.getAttribute('href') ||
      icons.find((l) => (l.getAttribute('type') || '').includes('png'))?.getAttribute('href') ||
      icons[0]?.getAttribute('href')
    if (!best) return null
    try {
      return new URL(best, location.href).href
    } catch {
      return null
    }
  })

  if (iconUrl) {
    try {
      const buf = await downloadBuffer(iconUrl)
      if (buf.length > 200) return buf
    } catch {
      /* try fallbacks */
    }
  }

  return googleFavicon(hostname)
}

async function duckFavicon(hostname) {
  return downloadBuffer(`https://icons.duckduckgo.com/ip3/${hostname}.ico`)
}

async function fetchLogos() {
  console.log('Fetching brand logos...\n')
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  for (const brand of BRANDS) {
    try {
      let buffer = await fetchLogoFromSite(page, brand)
      try {
        await saveWebp(buffer, path.join(logosDir, brand.slug))
      } catch {
        const host = new URL(brand.url).hostname
        try {
          buffer = await duckFavicon(host)
          await saveWebp(buffer, path.join(logosDir, brand.slug))
        } catch {
          buffer = await googleFavicon(host)
          await saveWebp(buffer, path.join(logosDir, brand.slug))
        }
      }
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
