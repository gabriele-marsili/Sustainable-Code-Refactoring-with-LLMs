#include "resistor_color.h"

const resistor_band_t* colors() {
	static const resistor_band_t color_array[] = {
		BLACK, BROWN, RED, ORANGE, YELLOW,
		GREEN, BLUE, VIOLET, GREY, WHITE
	};
	return color_array;
}

resistor_band_t color_code(resistor_band_t color) {
	return color;
}