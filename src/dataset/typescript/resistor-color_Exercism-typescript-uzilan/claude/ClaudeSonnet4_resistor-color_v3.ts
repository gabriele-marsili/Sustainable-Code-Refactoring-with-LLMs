export const COLORS: readonly string[] = [
    'black',
    'brown',
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'violet',
    'grey',
    'white',
] as const;

const COLOR_MAP = new Map(COLORS.map((color, index) => [color, index]));

export const colorCode = (color: string): number => {
    return COLOR_MAP.get(color) ?? -1;
}