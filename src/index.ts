import { pHash } from "./hashers";
import fs from "fs";
import { ethers } from "ethers";

// https://keepass.info/help/kb/pw_quality_est.html
const goodEntropyCheck = (bits: string): boolean => {
  console.log("Bits Lenght: ", bits.length);
  return bits.length >= 128
}

const main = async (path: string): Promise<void> => {
  let image = fs.readFileSync(path);
  pHash(image).then((bits: string) => {

    if (!goodEntropyCheck(bits)) {
      throw "Not good enough entropy"
    }

    let entropy = ethers.utils.sha512(ethers.utils.toUtf8Bytes(bits));
    console.log(path, ethers.utils.HDNode.fromSeed(entropy).privateKey);
  })
}

let files = [
  "fast-13.jpg",
  "fast-compressed-237.jpg",
  "fast-compressed-82.jpg",
  "fast-compressed.jpg",
  "fast.jpg",
  "fast.png"
];

files.map((name) => {
  main("./static/" + name).catch((e) => {
    console.log(e)
  })
})
