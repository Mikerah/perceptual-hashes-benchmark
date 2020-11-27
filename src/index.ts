import { pHash } from "./hashers";
import fs from "fs"

let image = fs.readFileSync("./static/fast.png");
pHash(image).then(console.log)
