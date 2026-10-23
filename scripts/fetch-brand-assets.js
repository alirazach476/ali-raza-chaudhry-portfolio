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
  {
    slug: 'autozy',
    url: 'https://autozy.co',
    direct: 'https://autozy.co/logo.png',
    selectors: ['header img', 'nav img', '.navbar-brand img'],
    maxWidth: 280,
    maxHeight: 90,
  },
  {
    slug: 'raahban',
    url: 'https://raahban.com',
    brandIcon: 'graduation-cap',
    selectors: ['header a img', 'header img', 'nav a img', 'nav img'],
    maxWidth: 220,
    maxHeight: 72,
  },
  {
    slug: 'healthystart',
    url: 'https://healthystartnc.com',
    direct: 'https://healthystartnc.com/assets/img/logo.png',
    selectors: ['header img', 'nav img', '.logo img', '#logo img'],
    maxWidth: 300,
    maxHeight: 120,
  },
  {
    slug: 'nyuton',
    url: 'https://nyutonenterprises.com',
    direct: 'https://nyutonenterprises.com/assets/img/logo.svg',
    selectors: ['header img', 'nav img', '.logo img', 'img[alt*="nyuton" i]'],
    maxWidth: 300,
    maxHeight: 100,
  },
  {
    slug: 'construction',
    url: 'https://constractioncompany.netlify.app',
    direct: 'https://constractioncompany.netlify.app/logo.svg',
    selectors: ['header img', 'nav img', 'img[alt*="logo" i]', '.logo img'],
    maxWidth: 240,
    maxHeight: 90,
  },
  {
    slug: 'ethisol',
    url: 'https://ethisol.com',
    direct:
      'https://ethisol.com/wp-content/uploads/2023/05/Ethisol-Digital-Marketing-Firm-copy-1024x373.png',
    selectors: ['header img', 'nav img', '.logo img'],
    maxWidth: 280,
    maxHeight: 100,
  },
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
  'header picture img',
  'nav picture img',
  '[class*="brand" i] img',
  'img[alt*="logo" i]',
]

const COMMON_LOGO_PATHS = ['/logo.png', '/logo.svg', '/images/logo.png', '/assets/logo.png', '/img/logo.png']

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

async function normalizeBuffer(buffer) {
  const sniff = buffer.subarray(0, 256).toString('utf8').toLowerCase()
  if (sniff.includes('<svg') || sniff.includes('<?xml')) {
    return sharp(buffer, { density: 320 }).png().toBuffer()
  }
  return buffer
}

async function isLogoSizedBuffer(buffer) {
  try {
    const meta = await sharp(buffer).metadata()
    if (!meta.width || !meta.height) return false

    const w = meta.width
    const h = meta.height
    const aspect = w / h
    const area = w * h

    if (w < 24 || h < 24) return false
    if (w > 900 || h > 500) return false
    if (w >= 500 && aspect >= 1.35) return false
    if (h >= 350 && aspect <= 0.75) return false
    if (area > 420000 && aspect > 1.15) return false

    return true
  } catch {
    return false
  }
}

async function saveLogo(buffer, outBase) {
  const pngPath = `${outBase}.png`
  const webpPath = `${outBase}.webp`
  const normalized = await normalizeBuffer(buffer)

  if (!(await isLogoSizedBuffer(normalized))) {
    throw new Error('Downloaded asset is not logo-sized (likely a hero/banner image)')
  }

  const meta = await sharp(normalized).metadata()
  const hasAlpha = meta.hasAlpha

  let pipeline = sharp(normalized).resize(512, 512, {
    fit: 'contain',
    background: { r: 255, g: 255, b: 255, alpha: 1 },
    position: 'centre',
  })

  if (hasAlpha) {
    pipeline = pipeline.flatten({ background: { r: 255, g: 255, b: 255 } })
  } else {
    pipeline = pipeline.flatten({ background: { r: 255, g: 255, b: 255 } })
  }

  await pipeline.png({ compressionLevel: 9, quality: 100 }).toFile(pngPath)
  await sharp(pngPath).webp({ quality: 95, effort: 6 }).toFile(webpPath)
  console.log(
    `  ✓ ${path.basename(webpPath)} (webp ${fs.statSync(webpPath).size}b, png ${fs.statSync(pngPath).size}b)`
  )
}

async function clearbitLogo(hostname) {
  try {
    const buf = await downloadBuffer(`https://logo.clearbit.com/${hostname}`)
    if (buf.length > 1200 && (await isLogoSizedBuffer(buf))) return buf
  } catch {
    /* fallback */
  }
  return null
}

async function googleFavicon(hostname) {
  return downloadBuffer(
    `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${hostname}&size=256`
  )
}

async function dismissOverlays(page, slug) {
  if (slug === 'nyuton') {
    await page.evaluate(() => {
      document.getElementById('loadingScreen')?.remove()
      document.querySelectorAll('.loading-screen').forEach((el) => el.remove())
    })
    await page.waitForTimeout(1500)
  }
}

async function screenshotLogoElement(page, brand) {
  const selectors = [...new Set([...(brand.selectors ?? []), ...LOGO_SELECTORS])]
  const maxW = brand.maxWidth ?? 320
  const maxH = brand.maxHeight ?? 120

  let bestBuffer = null
  let bestArea = Infinity

  for (const selector of selectors) {
    const locators = page.locator(selector)
    const count = await locators.count()

    for (let i = 0; i < Math.min(count, 8); i++) {
      const locator = locators.nth(i)
      try {
        if (!(await locator.isVisible())) continue

        const box = await locator.boundingBox()
        if (!box || box.width < 16 || box.height < 16) continue
        if (box.width > maxW || box.height > maxH) continue

        const area = box.width * box.height
        if (area >= bestArea) continue

        const buffer = await locator.screenshot({
          type: 'png',
          omitBackground: true,
          scale: 'css',
        })

        if (buffer.length < 500) continue
        if (!(await isLogoSizedBuffer(buffer))) continue

        bestBuffer = buffer
        bestArea = area
      } catch {
        /* try next */
      }
    }
  }

  return bestBuffer
}

async function fetchIconMeta(page) {
  const urls = await page.evaluate(() => {
    const candidates = []
    const apple = document.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href')
    const icons = Array.from(
      document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')
    )
      .map((l) => l.getAttribute('href'))
      .filter(Boolean)

    if (apple) candidates.push(apple)
    candidates.push(...icons)
    return candidates
  })

  for (const raw of urls) {
    try {
      const absolute = new URL(raw, page.url()).href
      const buf = await normalizeBuffer(await downloadBuffer(absolute))
      if (buf.length > 500 && (await isLogoSizedBuffer(buf))) return buf
    } catch {
      /* next */
    }
  }
  return null
}

async function fetchCommonLogoPaths(baseUrl) {
  for (const logoPath of COMMON_LOGO_PATHS) {
    try {
      const buf = await normalizeBuffer(await downloadBuffer(new URL(logoPath, baseUrl).href))
      if (buf.length > 500 && (await isLogoSizedBuffer(buf))) return buf
    } catch {
      /* next */
    }
  }
  return null
}

async function fetchBrandIcon(page, brand) {
  if (brand.brandIcon !== 'graduation-cap') return null

  await page.evaluate(() => {
    const source = document.querySelector('svg.lucide-graduation-cap')
    if (!source) throw new Error('graduation cap icon not found')

    document.body.innerHTML = ''
    document.body.style.margin = '0'
    document.body.style.background = '#ffffff'
    document.body.style.display = 'grid'
    document.body.style.placeItems = 'center'
    document.body.style.height = '100vh'

    const wrap = document.createElement('div')
    wrap.style.width = '280px'
    wrap.style.height = '280px'
    wrap.style.display = 'grid'
    wrap.style.placeItems = 'center'
    wrap.style.borderRadius = '28px'
    wrap.style.background = 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)'

    const svg = source.cloneNode(true)
    svg.setAttribute('width', '156')
    svg.setAttribute('height', '156')
    svg.style.color = '#ffffff'
    svg.style.stroke = '#ffffff'
    wrap.appendChild(svg)
    document.body.appendChild(wrap)
  })

  return page.screenshot({ type: 'png' })
}

async function fetchLogoFromSite(page, brand) {
  const hostname = new URL(brand.url).hostname

  if (brand.direct) {
    try {
      const direct = await normalizeBuffer(await downloadBuffer(brand.direct))
      if (await isLogoSizedBuffer(direct)) return direct
    } catch {
      /* fall through */
    }
  }

  await page.goto(brand.url, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(2000)
  await dismissOverlays(page, brand.slug)

  if (brand.brandIcon) {
    const branded = await fetchBrandIcon(page, brand)
    if (branded) return branded
  }

  const sources = [
    () => screenshotLogoElement(page, brand),
    () => fetchIconMeta(page),
    () => fetchCommonLogoPaths(brand.url),
    () => clearbitLogo(hostname),
    () => googleFavicon(hostname),
  ]

  for (const source of sources) {
    try {
      const buffer = await source()
      if (buffer) return buffer
    } catch {
      /* next source */
    }
  }

  throw new Error('No logo source found')
}

async function fetchLogos() {
  console.log('Fetching brand logos...\n')
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()

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
