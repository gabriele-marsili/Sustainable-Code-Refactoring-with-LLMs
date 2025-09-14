#include "kindergarten_garden.h"

#include <stdio.h>

static const char *students[] = {"Alice",  "Bob",    "Charlie", "David",
                                 "Eve",    "Fred",   "Ginny",   "Harriet",
                                 "Ileana", "Joseph", "Kincaid", "Larry"};

static inline size_t rowlen(const char *diagram) {
    const char *start = diagram;
    while (*diagram != '\n' && (diagram - start) < (ARRAY_SIZE(students) * 2 + 1)) {
        diagram++;
    }
    return (*diagram == '\n') ? (diagram - start) : 0;
}

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
    
    const size_t diag_rowlen = rowlen(diagram);
    if (diag_rowlen == 0) return result;
    
    int student_idx = -1;
    for (size_t idx = 0; idx < ARRAY_SIZE(students); idx++) {
        if (strcmp(student, students[idx]) == 0) {
            student_idx = idx;
            break;
        }
    }
    
    if (student_idx == -1) return result;
    
    const size_t base_pos = 2 * student_idx;
    if (base_pos >= diag_rowlen) return result;
    
    const size_t second_row_pos = base_pos + diag_rowlen + 1;
    if (second_row_pos + 1 >= strlen(diagram)) return result;
    
    result.plants[0] = char_to_plant(diagram[base_pos]);
    result.plants[1] = char_to_plant(diagram[base_pos + 1]);
    result.plants[2] = char_to_plant(diagram[second_row_pos]);
    result.plants[3] = char_to_plant(diagram[second_row_pos + 1]);
    
    return result;
}