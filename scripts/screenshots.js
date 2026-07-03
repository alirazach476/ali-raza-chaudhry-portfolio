import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const sites = [
  { name: 'autozy', url: 'https://autozy.co', wait: 3000, until: 'networkidle' },
  { name: 'raahban', url: 'https://raahban.com', wait: 3500, until: 'networkidle' },
  { name: 'healthystartnc', url: 'https://healthystartnc.com', wait: 3000, until: 'networkidle' },
  {
    name: 'nyuton',
    url: 'https://nyutonenterprises.com',
    wait: 5000,
    until: 'networkidle',
    async prepare(page) {
      await page.waitForTimeout(4000)
      // Splash screen stays visible in headless — remove to capture the real homepage
      await page.evaluate(() => {
        document.getElementById('loadingScreen')?.remove()
        document.querySelectorAll('.loading-screen').forEach((el) => el.remove())
      })
      await page.waitForTimeout(2000)
      await page.evaluate(() => window.scrollTo(0, 0))
    },
  },
  { name: 'watches', url: 'https://watchs-gray.vercel.app', wait: 8000, until: 'domcontentloaded' },
  { name: 'nova', url: 'https://core-seven-henna.vercel.app', wait: 8000, until: 'domcontentloaded' },
  {
    name: 'construction',
    url: 'https://constractioncompany.netlify.app',
    wait: 6000,
    until: 'networkidle',
    async prepare(page) {
      try {
        await page.waitForLoadState('networkidle', { timeout: 30000 })
      } catch {
        /* continue with best-effort capture */
      }
      await page.waitForTimeout(3000)
      // Scroll to trigger lazy-loaded hero imagery, then return to top
      await page.evaluate(async () => {
        const step = () =>
          new Promise((resolve) => {
            window.scrollBy(0, 500)
            setTimeout(resolve, 600)
          })
        for (let i = 0; i < 4; i++) await step()
        window.scrollTo(0, 0)
      })
      await page.waitForTimeout(2500)
      try {
        await page.waitForSelector('img[src], [class*="hero"], main section', { timeout: 8000 })
      } catch {
        /* capture whatever rendered */
      }
    },
  },
  { name: 'steppingstone', url: 'https://stteppingstone.netlify.app', wait: 3000, until: 'networkidle' },
]

const filterNames = process.argv.slice(2)
const sitesToCapture = filterNames.length
  ? sites.filter((s) => filterNames.includes(s.name))
  : sites

if (filterNames.length && sitesToCapture.length === 0) {
  console.error(`No matching sites for: ${filterNames.join(', ')}`)
  process.exit(1)
}

const outDir = path.join(rootDir, 'public', 'projects')
fs.mkdirSync(outDir, { recursive: true })

const results = { success: [], failed: [] }

async function captureScreenshot(page, outPath) {
  try {
    await page.screenshot({
      path: outPath,
      fullPage: false,
      timeout: 60000,
      animations: 'disabled',
      caret: 'hide',
    })
    return
  } catch {
    // CDP fallback for WebGL / font-wait hangs (e.g. Three.js sites)
    const client = await page.context().newCDPSession(page)
    const { data } = await client.send('Page.captureScreenshot', {
      format: 'png',
      fromSurface: true,
    })
    fs.writeFileSync(outPath, Buffer.from(data, 'base64'))
  }
}

console.log('Capturing project screenshots...\n')

const browser = await chromium.launch({ headless: true })

for (const site of sitesToCapture) {
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    })

    await page.goto(site.url, {
      waitUntil: site.until ?? 'networkidle',
      timeout: 60000,
    })
    await page.waitForTimeout(site.wait ?? 3000)
    if (site.prepare) await site.prepare(page)
    await page.evaluate(() => window.scrollTo(0, 0))

    const outPath = path.join(outDir, `${site.name}.png`)
    await captureScreenshot(page, outPath)
    console.log(`✓ screenshot: ${site.name} → public/projects/${site.name}.png`)
    results.success.push(site.name)

    await page.close()
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    console.warn(`✗ ${site.name} failed: ${message}`)
    results.failed.push({ name: site.name, error: message })
  }
}

if (results.failed.length > 0) {
  console.log('\nRetrying failed sites once...\n')
  const retryList = [...results.failed]
  results.failed = []

  for (const { name } of retryList) {
    const site = sites.find((s) => s.name === name)
    if (!site) continue

    try {
      const page = await browser.newPage({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
      })

      await page.goto(site.url, { waitUntil: 'load', timeout: 60000 })
      await page.waitForTimeout(4000)
      if (site.prepare) await site.prepare(page)
      await page.evaluate(() => window.scrollTo(0, 0))

      const outPath = path.join(outDir, `${site.name}.png`)
      await captureScreenshot(page, outPath)
      console.log(`✓ retry succeeded: ${site.name}`)
      results.success.push(site.name)

      await page.close()
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e)
      console.warn(`✗ retry failed: ${site.name}: ${message}`)
      results.failed.push({ name: site.name, error: message })
    }
  }
}

await browser.close()

console.log(`\nDone: ${results.success.length}/${sitesToCapture.length} screenshots saved.`)

if (results.failed.length > 0) {
  console.log('\nFailed sites:')
  for (const f of results.failed) {
    console.log(`  - ${f.name}: ${f.error}`)
  }
  process.exitCode = 1
}
