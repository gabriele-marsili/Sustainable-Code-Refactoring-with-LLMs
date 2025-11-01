#include "resistor_color_duo.h"

uint16_t color_code(resistor_band_t *color_1)
{
    return (uint16_t)(color_1[0] * 10 + color_1[1]);
}