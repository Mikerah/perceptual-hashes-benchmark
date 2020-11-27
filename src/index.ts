import { pHash } from "./hashers";
import fs from "fs";
import { ethers } from "ethers";

// https://keepass.info/help/kb/pw_quality_est.html
// This has no randommness check and just checks length
const goodEntropyCheck = (bits: string): boolean => {
  return bits.length >= 128
}

const main = async (path: string): Promise<void> => {
  let image = fs.readFileSync(path);
  let bits = await pHash(image, 12)
  console.log("Bits Length: ", bits.length);
  if (!goodEntropyCheck(bits)) {
    throw "Not good enough entropy"
  }

  let entropy = ethers.utils.sha512(ethers.utils.toUtf8Bytes(bits));
  console.log(path, ethers.utils.HDNode.fromSeed(entropy).privateKey);
}

[
  "fast-13.jpg",
  "fast-compressed-237.jpg",
  "fast-compressed-82.jpg",
  "fast-compressed.jpg",
  "fast.jpg",
  "fast.png"
].map((name) => {
  main("./static/" + name).catch((e) => {
    console.log(e)
  })
})
