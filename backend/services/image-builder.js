import sharp from "sharp";
import { buildSvg } from "@goalcal/core";

export default async function buildGoalPng(options) {
  const svg = buildSvg(options);
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return png;
}
