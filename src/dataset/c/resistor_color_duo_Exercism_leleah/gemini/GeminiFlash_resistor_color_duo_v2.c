#include "resistor_color_duo.h"

uint16_t color_code(resistor_band_t color_1, resistor_band_t color_2) {
  return (uint16_t)(color_1 * 10 + color_2);
}