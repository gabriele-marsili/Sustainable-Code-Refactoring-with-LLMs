#include "resistor_color_duo.h"

uint16_t color_code(resistor_band_t *color_band) {
    return (uint16_t)(color_band[0] * 10 + color_band[1]);
}