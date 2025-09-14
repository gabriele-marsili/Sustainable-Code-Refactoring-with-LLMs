export const COLORS = ['black','brown','red','orange','yellow','green','blue','violet','grey','white'];

const COLOR_MAP = new Map(COLORS.map((color, index) => [color, index]));

export const colorCode = (code: string): number => {
  return COLOR_MAP.get(code) ?? -1;
}