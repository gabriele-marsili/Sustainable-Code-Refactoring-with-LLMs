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

const colorMap = new Map<string, number>(COLORS.map((color, index) => [color, index]));

export const colorCode = (color: string): number | undefined => {
    return colorMap.get(color);
};