const COLOR_MAP: ReadonlyMap<string, number> = new Map([
    ['black', 0],
    ['brown', 1],
    ['red', 2],
    ['orange', 3],
    ['yellow', 4],
    ['green', 5],
    ['blue', 6],
    ['violet', 7],
    ['grey', 8],
    ['white', 9],
]);

export const COLORS: string[] = Array.from(COLOR_MAP.keys());

export const colorCode = (color: string): number => {
    const code = COLOR_MAP.get(color);
    return code !== undefined ? code : -1;
};