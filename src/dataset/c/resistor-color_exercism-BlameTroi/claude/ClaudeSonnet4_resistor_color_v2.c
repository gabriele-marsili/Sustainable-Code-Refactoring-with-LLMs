// exercism resistor color
// given the colored bands on a resistor one can determine the resistance
// in ohms. 
// t.brumley june 2022

#include <stdlib.h>
#include <string.h>

#include "resistor_color.h"

// return the integer value for a given color code
int color_code(resistor_band_t color) {
    return (int)color;
}

// return the complete list of color codes
resistor_band_t *colors() {
    static const resistor_band_t color_array[] = { BLACK, BROWN, RED, ORANGE, YELLOW,
        GREEN, BLUE, VIOLET, GREY, WHITE };
    return (resistor_band_t *)color_array;
}