#include "resistor_color.h"

// Use a static const array to avoid unnecessary copies and ensure immutability.
static const resistor_band_t color_array[] = {
    BLACK, BROWN, RED, ORANGE, YELLOW,
    GREEN, BLUE, VIOLET, GREY, WHITE
};

resistor_band_t color_code(resistor_band_t color) {
    // The original function simply returns the input.  No change needed, but consider if it's truly necessary.
    return color;
}

const resistor_band_t* colors() {
    // Return a pointer to the static const array.  This avoids copying the array.
    return color_array;
}