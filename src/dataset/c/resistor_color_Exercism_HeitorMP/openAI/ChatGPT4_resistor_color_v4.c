#include "resistor_color.h"

static const resistor_band_t mycolors[] = {
    BLACK, BROWN, RED, ORANGE, YELLOW,
    GREEN, BLUE, VIOLET, GREY, WHITE
};

inline int color_code(resistor_band_t colors) {
    return colors;
}

inline const resistor_band_t *colors(void) {
    return mycolors;
}