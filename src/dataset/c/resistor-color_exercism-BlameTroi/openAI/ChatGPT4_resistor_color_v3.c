#include <stdlib.h>
#include <string.h>

#include "resistor_color.h"

int color_code(resistor_band_t color) {
    return (int)color;
}

const resistor_band_t *colors() {
    static const resistor_band_t color_list[] = { BLACK, BROWN, RED, ORANGE, YELLOW,
        GREEN, BLUE, VIOLET, GREY, WHITE };
    return color_list;
}