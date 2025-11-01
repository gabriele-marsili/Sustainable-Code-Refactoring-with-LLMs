#include <stdlib.h>
#include <string.h>

#include "resistor_color.h"

int color_code(resistor_band_t color) {
    return (int)color;
}

resistor_band_t *colors() {
    static const resistor_band_t color_array[] = { BLACK, BROWN, RED, ORANGE, YELLOW,
        GREEN, BLUE, VIOLET, GREY, WHITE };
    static resistor_band_t *cached_result = NULL;
    
    if (cached_result == NULL) {
        cached_result = malloc(sizeof(color_array));
        memcpy(cached_result, color_array, sizeof(color_array));
    }
    
    return cached_result;
}