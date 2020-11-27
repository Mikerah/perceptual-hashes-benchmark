import { pHash } from "./hashers";
import fs from "fs";
import { ethers } from "ethers";

const main = async (path: string) => {
  let image = fs.readFileSync(path);
  pHash(image).then((bits: string) => {
    let entropy = ethers.utils.keccak256(Buffer.from(bits));
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
  main("./static/" + name)
})
