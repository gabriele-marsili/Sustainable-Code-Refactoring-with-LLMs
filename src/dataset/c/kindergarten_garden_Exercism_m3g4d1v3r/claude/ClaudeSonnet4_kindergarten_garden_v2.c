#include "kindergarten_garden.h"

#include <stdio.h>

static const char *students[] = {"Alice",  "Bob",    "Charlie", "David",
                                 "Eve",    "Fred",   "Ginny",   "Harriet",
                                 "Ileana", "Joseph", "Kincaid", "Larry"};

static inline plant_t char_to_plant(char c) {
    switch (c) {
        case 'C': return CLOVER;
        case 'G': return GRASS;
        case 'R': return RADISHES;
        case 'V': return VIOLETS;
        default: return DIRT;
    }
}

plants_t plants(const char *diagram, const char *student) {
    plants_t result = {{DIRT, DIRT, DIRT, DIRT}};
    
    if (!diagram || !student) return result;
    
    // Find student index using early termination
    int student_idx = -1;
    for (size_t idx = 0; idx < ARRAY_SIZE(students); idx++) {
        if (strcmp(student, students[idx]) == 0) {
            student_idx = idx;
            break;
        }
    }
    if (student_idx == -1) return result;
    
    // Find row length efficiently
    const char *newline = strchr(diagram, '\n');
    if (!newline) return result;
    
    size_t diag_rowlen = newline - diagram;
    if (diag_rowlen == 0 || diag_rowlen > ARRAY_SIZE(students) * 2) return result;
    
    // Bounds checking
    size_t plant_col = 2 * student_idx;
    if (plant_col + 1 >= diag_rowlen) return result;
    
    size_t second_row_start = diag_rowlen + 1;
    if (plant_col + second_row_start + 1 >= strlen(diagram)) return result;
    
    // Direct assignment with inline conversion
    result.plants[0] = char_to_plant(diagram[plant_col]);
    result.plants[1] = char_to_plant(diagram[plant_col + 1]);
    result.plants[2] = char_to_plant(diagram[plant_col + second_row_start]);
    result.plants[3] = char_to_plant(diagram[plant_col + second_row_start + 1]);
    
    return result;
}