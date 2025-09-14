#include "resistor_color_duo.h"

static const uint16_t resistor_values[] = {0,1,2,3,4,5,6,7,8,9};

uint16_t color_code (resistor_band_t *color_1)
{
    return resistor_values[color_1[0]] * 10 + resistor_values[color_1[1]];
}