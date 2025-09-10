const COLORS_MAP: Record<string, number> = {
  black: 0, brown: 1, red: 2, orange: 3, yellow: 4,
  green: 5, blue: 6, violet: 7, grey: 8, white: 9
};

export const colorCode = (code: string): number => {
  return COLORS_MAP[code] ?? -1;
};

export const COLORS = Object.keys(COLORS_MAP);