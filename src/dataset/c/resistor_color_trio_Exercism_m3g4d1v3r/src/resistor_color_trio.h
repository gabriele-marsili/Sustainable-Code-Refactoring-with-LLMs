#ifndef RESISTOR_COLOR_TRIO_H
#define RESISTOR_COLOR_TRIO_H

#include <math.h>
#include <stddef.h>
#include <stdint.h>

typedef enum {
    BLACK = 0,
    BROWN = 1,
    RED = 2,
    ORANGE = 3,
    YELLOW = 4,
    GREEN = 5,
    BLUE = 6,
    VIOLET = 7,
    GREY = 8,
    WHITE = 9,
    COLOR_COUNT
} resistor_band_t;

typedef enum {
    OHMS = 0,
    KILOOHMS = 1,
    MEGAOHMS = 2,
    GIGAOHMS = 3
} resistance_units_t;

typedef struct {
    uint64_t value;
    uint16_t unit;
} resistor_value_t;

resistor_value_t color_code(resistor_band_t *color_band);

#endif
