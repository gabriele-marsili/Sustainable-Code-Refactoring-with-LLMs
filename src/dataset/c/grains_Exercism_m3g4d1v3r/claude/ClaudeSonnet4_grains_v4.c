#include "grains.h"

static uint64_t cached_total = 0;
static bool cache_initialized = false;

uint64_t square(uint8_t index) {
    if (index == 0 || index > BOARD_SIZE) return 0;
    return UINT64_C(1) << (index - 1);
}

uint64_t total(void) {
    if (!cache_initialized) {
        cached_total = (UINT64_C(1) << BOARD_SIZE) - 1;
        cache_initialized = true;
    }
    return cached_total;
}