#include "resistor_color.h"

const resistor_band_t *colors(void)
{
    static const resistor_band_t mycolors[] = {
        BLACK, BROWN, RED, ORANGE, YELLOW,
        GREEN, BLUE, VIOLET, GREY, WHITE
    };
    return mycolors;
}

int color_code(resistor_band_t color)
{
    return color;
}