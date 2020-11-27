import { pHash } from "./hashers";
import fs from "fs";
import {format} from "util";
import { ethers } from "ethers";
const log = console.log

// https://keepass.info/help/kb/pw_quality_est.html
// This has no randommness check and just checks length
const bitLenghCheck = (bits: string): boolean => bits.length >= 128

const generatePrivateKey = async (path: string): Promise<void> => {
  let image = fs.readFileSync(path);
  let bits = await pHash(image, 15);
  if (!bitLenghCheck(bits)) {
    throw "Not good enough entropy"
  }

  let entropy = ethers.utils.sha512(ethers.utils.toUtf8Bytes(bits));
  let pk =  ethers.utils.HDNode.fromSeed(entropy).privateKey;
  log(format('image: %s\nsha256: %s\nperceptual hash: %s\nkey: %s\n', path, ethers.utils.sha256(image), bits, pk));
}

let mountains = [
  "mountain-telegram.jpg",
  "mountain.jpg",
  "mountain-gphotos.jpg",
]
let atila = [
 "atila.jpg",
 "atila-telegram.jpg",
]

let fast = [
 "fast-13.jpg",
 "fast-compressed-237.jpg",
 "fast-compressed-82.jpg",
 "fast-compressed.jpg",
 "fast.jpg",
 "fast.png",
]

const main = async() => {
  for (let i in fast) {
    await generatePrivateKey("./static/" + fast[i]).catch((e) => {
      log(e)
    })
  }
  for (let i in atila) {
    await generatePrivateKey("./static/" + atila[i]).catch((e) => {
      log(e)
    })
  }
  for (let i in mountains) {
    await generatePrivateKey("./static/" + mountains[i]).catch((e) => {
      log(e)
    })
  }
}
main()
