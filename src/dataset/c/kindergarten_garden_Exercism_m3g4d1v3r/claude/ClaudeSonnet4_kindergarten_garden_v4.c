#include "kindergarten_garden.h"

#include <stdio.h>

static const char *students[] = {"Alice",  "Bob",    "Charlie", "David",
                                 "Eve",    "Fred",   "Ginny",   "Harriet",
                                 "Ileana", "Joseph", "Kincaid", "Larry"};

static const plant_t plant_lookup[256] = {
    ['C'] = CLOVER,
    ['G'] = GRASS,
    ['R'] = RADISHES,
    ['V'] = VIOLETS
};

size_t rowlen(const char *diagram) {
    const char *start = diagram;
    const char *end = diagram;
    const size_t max_len = ARRAY_SIZE(students) * 2 + 1;
    
    while (*end != '\n' && (size_t)(end - start) < max_len) {
        end++;
    }
    
    return (*end == '\n') ? (size_t)(end - start) : 0;
}

plants_t plants(const char *diagram, const char *student) {
    plants_t result = {{DIRT, DIRT, DIRT, DIRT}};
    
    if (!diagram || !student) return result;
    
    const size_t diag_rowlen = rowlen(diagram);
    if (diag_rowlen == 0) return result;
    
    int student_idx = -1;
    for (size_t idx = 0; idx < ARRAY_SIZE(students); idx++) {
        if (strcmp(student, students[idx]) == 0) {
            student_idx = (int)idx;
            break;
        }
    }
    
    if (student_idx == -1) return result;
    
    const size_t base_pos = 2 * (size_t)student_idx;
    if (base_pos + 1 >= diag_rowlen) return result;
    
    const size_t second_row_pos = base_pos + diag_rowlen + 1;
    const size_t diag_len = strlen(diagram);
    if (second_row_pos + 1 >= diag_len) return result;
    
    result.plants[0] = plant_lookup[(unsigned char)diagram[base_pos]];
    result.plants[1] = plant_lookup[(unsigned char)diagram[base_pos + 1]];
    result.plants[2] = plant_lookup[(unsigned char)diagram[second_row_pos]];
    result.plants[3] = plant_lookup[(unsigned char)diagram[second_row_pos + 1]];
    
    return result;
}