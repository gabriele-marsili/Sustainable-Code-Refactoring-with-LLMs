#include "resistor_color_duo.h"

resistor_band_t res,color_1,color_2;
resistor_band_t expected[] = {BLACK,BROWN,RED,ORANGE,YELLOW,GREEN,BLUE,VIOLET,GREY,WHITE};
uint16_t color_code (resistor_band_t *color_1)
{
    uint16_t code;
    code = (uint16_t) (expected[(color_1[0])]*10+expected[(color_1[1])]);
    return code;
}