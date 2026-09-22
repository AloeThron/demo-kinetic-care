import fs from "node:fs"
import path from "node:path"

const dist = path.resolve("dist")
const index = path.join(dist, "index.html")

for (const route of ["portfolio", "proposal"]) {
  const dir = path.join(dist, route)
  fs.mkdirSync(dir, { recursive: true })
  fs.copyFileSync(index, path.join(dir, "index.html"))
}
