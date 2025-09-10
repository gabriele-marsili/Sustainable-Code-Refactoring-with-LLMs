#include "resistor_color.h"

const resistor_band_t color_codes[] = {
    BLACK, BROWN, RED, ORANGE, YELLOW,
    GREEN, BLUE, VIOLET, GREY, WHITE
};

int color_code(resistor_band_t color) {
    return color;
}

const resistor_band_t *colors(void) {
    return color_codes;
}