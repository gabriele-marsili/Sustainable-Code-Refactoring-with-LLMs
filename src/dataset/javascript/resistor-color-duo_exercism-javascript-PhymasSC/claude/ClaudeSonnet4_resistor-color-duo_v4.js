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

export const decodedValue = colorArr => {
	if (colorArr.length === 0) return 0;
	return COLOR_CODE[colorArr[0]] * 10 + COLOR_CODE[colorArr[1]];
};