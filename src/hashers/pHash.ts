import phash from "./sharp-phash";
export async function pHash(image: Buffer, low_size: number): Promise<string> {
  return phash(image, low_size)
};
