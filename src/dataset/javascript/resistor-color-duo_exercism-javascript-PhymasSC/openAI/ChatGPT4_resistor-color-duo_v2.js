const COLOR_CODE = {
	black: 0,
	brown: 1,
	red: 2,
	orange: 3,
	yellow: 4,
	green: 5,
	blue: 6,
	violet: 7,
	grey: 8,
	white: 9
};

export const decodedValue = ([firstColor, secondColor]) => 
	COLOR_CODE[firstColor] * 10 + COLOR_CODE[secondColor];