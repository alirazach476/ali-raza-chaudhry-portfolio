import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const svgPath = path.join(rootDir, 'public', 'og-image.svg')
const outPath = path.join(rootDir, 'public', 'og-image.png')

const html = `<!DOCTYPE html>
<html><head><style>*{margin:0;padding:0}body{background:#070708}</style></head>
<body>${fs.readFileSync(svgPath, 'utf8')}</body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html, { waitUntil: 'load' })
await page.screenshot({ path: outPath, type: 'png' })
await browser.close()
console.log('✓ OG image saved to public/og-image.png')
