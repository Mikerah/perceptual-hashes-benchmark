import { pHash } from "./hashers";
import fs from "fs";
import { ethers } from "ethers";

let image = fs.readFileSync("./static/fast.png");
const main = async () => {
  pHash(image).then((bits: string) => {
    let entropy = ethers.utils.keccak256(Buffer.from(bits));
    console.log(ethers.utils.HDNode.fromSeed(entropy).privateKey);
  })
}

main()
