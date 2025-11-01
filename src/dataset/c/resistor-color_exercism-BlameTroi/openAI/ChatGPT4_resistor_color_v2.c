#include <stddef.h>
#include "resistor_color.h"

// return the integer value for a given color code
int color_code(resistor_band_t color) {
    return (int)color;
}

// return the complete list of color codes
const resistor_band_t *colors() {
    static const resistor_band_t color_list[] = { BLACK, BROWN, RED, ORANGE, YELLOW,
        GREEN, BLUE, VIOLET, GREY, WHITE };
    return color_list;
}