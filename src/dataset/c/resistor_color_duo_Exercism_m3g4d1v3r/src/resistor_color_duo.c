#include "resistor_color_duo.h"

uint16_t color_code(resistor_band_t *color_band) {
    // I'm assuming that I always receive a 2 sized array or more
    uint16_t result = 0;
    result += *color_band++ * 10;
    result += *color_band;
    return (result);
}
