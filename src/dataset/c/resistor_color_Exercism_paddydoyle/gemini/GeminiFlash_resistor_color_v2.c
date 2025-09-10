#include "resistor_color.h"

const resistor_band_t color_array[] = {
	BLACK, BROWN, RED, ORANGE, YELLOW,
	GREEN, BLUE, VIOLET, GREY, WHITE
};

int color_code(resistor_band_t color) {
  return color;
}

const resistor_band_t* colors() {
	return color_array;
}