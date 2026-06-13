import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const MAX_WIDTH = 1440

const TARGETS = [
  { dir: 'public/projects', exts: ['.png'] },
  { dir: 'public/ai', exts: ['.jpg', '.jpeg'] },
  { dir: 'public', exts: ['.png', '.jpg', '.jpeg'], flat: true },
]

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const outPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp')

  const meta = await sharp(filePath).metadata()
  let pipeline = sharp(filePath)

  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true })
  }

  await pipeline.webp({ quality: 82, effort: 4 }).toFile(outPath)

  const before = fs.statSync(filePath).size
  const after = fs.statSync(outPath).size
  const rel = path.relative(ROOT, outPath)
  console.log(`  ${rel}: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`)
}

async function main() {
  console.log('Optimizing images to WebP...\n')

  for (const { dir, exts, flat } of TARGETS) {
    const fullDir = path.join(ROOT, dir)
    if (!fs.existsSync(fullDir)) continue

    const entries = flat
      ? fs.readdirSync(fullDir).map((f) => path.join(fullDir, f))
      : fs.readdirSync(fullDir).map((f) => path.join(fullDir, f))

    for (const filePath of entries) {
      if (!fs.statSync(filePath).isFile()) continue
      const ext = path.extname(filePath).toLowerCase()
      if (!exts.includes(ext)) continue
      if (filePath.includes('og-image') && ext === '.svg') continue
      await optimizeFile(filePath)
    }
  }

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
