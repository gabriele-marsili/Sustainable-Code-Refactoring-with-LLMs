#include "resistor_color.h"

static const resistor_band_t color_codes[] = {
    BLACK, BROWN, RED, ORANGE, YELLOW,
    GREEN, BLUE, VIOLET, GREY, WHITE
};

resistor_band_t color_code(resistor_band_t resistor) {
    return color_codes[resistor];
}

const resistor_band_t* colors(void) {
    return color_codes;
}