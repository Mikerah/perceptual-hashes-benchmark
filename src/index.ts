import { pHash } from "./hashers";
import fs from "fs";
import {format} from "util";
import { ethers } from "ethers";
const log = console.log;

// https://keepass.info/help/kb/pw_quality_est.html
// This has no randommness check and just checks length
const bitLenghCheck = (bits: string): boolean => bits.length >= 32

const generatePrivateKey = async (path: string): Promise<void> => {
  let image = fs.readFileSync(path);
  // TODO  we need to convert binary to hex from the output of the phash
  // For example: 
  // defaults to BIP39 English word list
  // uses HEX strings for entropy
  //const mnemonic = bip39.entropyToMnemonic('00000000000000000000000000000000')
  // bip39.entropyToMnemonic('00000000000000000000000000000fff')
  let bits = await pHash(image, 8);
  if (!bitLenghCheck(bits)) {
    throw "Not good enough entropy"
  }
  let wallet =  ethers.utils.HDNode.fromSeed(ethers.utils.toUtf8Bytes(bits));
  log(format('image: %s\nsha256: %s\nperceptual hash: %s\nkey: %s\n', path, ethers.utils.sha256(image), bits, wallet.privateKey));
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
