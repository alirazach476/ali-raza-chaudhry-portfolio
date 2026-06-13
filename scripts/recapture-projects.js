import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(path.resolve(__dirname, '..'), 'public', 'projects')

async function capture(page, outPath) {
  try {
    await page.screenshot({ path: outPath, fullPage: false, timeout: 60000, animations: 'disabled' })
  } catch {
    const client = await page.context().newCDPSession(page)
    const { data } = await client.send('Page.captureScreenshot', { format: 'png', fromSurface: true })
    fs.writeFileSync(outPath, Buffer.from(data, 'base64'))
  }
}

const browser = await chromium.launch({ headless: true })

// Nyuton — wait for hero content
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
  await page.goto('https://nyutonenterprises.com', { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(6000)
  await capture(page, path.join(outDir, 'nyuton.png'))
  console.log('✓ nyuton')
  await page.close()
}

// Watches 3D — wait for WebGL scene
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
  await page.goto('https://watchs-gray.vercel.app', { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(8000)
  await capture(page, path.join(outDir, 'watches.png'))
  console.log('✓ watches')
  await page.close()
}

// Construction — scroll to portfolio/gallery section for visual content
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
  await page.goto('https://constractioncompany.netlify.app', { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(3000)
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.6))
  await page.waitForTimeout(3000)
  await capture(page, path.join(outDir, 'construction.png'))
  console.log('✓ construction')
  await page.close()
}

await browser.close()
