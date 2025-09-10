export const COLORS = Object.freeze([
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
]);

const COLOR_MAP = Object.freeze(
    COLORS.reduce<Record<string, number>>((map, color, index) => {
        map[color] = index;
        return map;
    }, {})
);

export const colorCode = (color: string): number => COLOR_MAP[color] ?? -1;