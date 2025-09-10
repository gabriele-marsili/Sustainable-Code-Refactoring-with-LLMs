#include "resistor_color.h"

// Use a static const array to avoid re-initialization on every call.
static const resistor_band_t color_codes[] = {BLACK, BROWN, RED, ORANGE, YELLOW,
                                              GREEN, BLUE, VIOLET, GREY, WHITE};

resistor_band_t color_code(resistor_band_t resistor) {
  // Add a check for valid input to prevent out-of-bounds access.
  if (resistor < BLACK || resistor > WHITE) {
    return BLACK; // Or handle the error in a more appropriate way.
  }
  return color_codes[resistor];
}

const resistor_band_t *colors(void) { return color_codes; }