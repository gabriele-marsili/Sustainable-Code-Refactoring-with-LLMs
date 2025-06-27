#ifndef KINDERGARTEN_GARDEN_H
#define KINDERGARTEN_GARDEN_H

#include <string.h>
#define ARRAY_SIZE(x) sizeof(x) / sizeof(x[0])

typedef enum {
    CLOVER = 0,
    GRASS = 1,
    RADISHES = 2,
    VIOLETS = 3,
    DIRT = 4
} plant_t;

typedef struct {
    plant_t plants[4];
} plants_t;

size_t rowlen(const char *diagram);
plants_t plants(const char *diagram, const char *student);

#endif
