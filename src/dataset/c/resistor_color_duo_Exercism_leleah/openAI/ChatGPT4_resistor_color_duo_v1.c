#include "resistor_color_duo.h"

static const uint8_t expected[] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};

uint16_t color_code(resistor_band_t *color_1) {
    return (uint16_t)(expected[color_1[0]] * 10 + expected[color_1[1]]);
}