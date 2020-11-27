import phash from "sharp-phash";
export async function pHash(image: Buffer): Promise<string> {
  return phash(image)
};
