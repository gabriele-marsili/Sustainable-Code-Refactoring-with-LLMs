#include "resistor_color_trio.h"

resistor_value_t color_code(resistor_band_t *color_band) {
    resistor_value_t result = {0, OHMS};
    uint64_t value;

    value = *color_band * 10;
    color_band++;

    value += *color_band;
    color_band++;

    value *= (int)pow(10, *color_band);
    if (value == 0) return (result);

    while (value % (uint16_t)pow(10, 3) == 0) {
        result.unit++;
        value = value / (uint16_t)pow(10, 3);
    }
    result.value = value;
    return (result);
}
