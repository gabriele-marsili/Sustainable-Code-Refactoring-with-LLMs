#include "kindergarten_garden.h"

#include <stdio.h>

static const char *students[] = {"Alice",  "Bob",    "Charlie", "David",
                                 "Eve",    "Fred",   "Ginny",   "Harriet",
                                 "Ileana", "Joseph", "Kincaid", "Larry"};

size_t rowlen(const char *diagram) {
    const char *ptr = diagram;
    size_t len = 0;
    const size_t max_len = ARRAY_SIZE(students) * 2 + 1;

    while (*ptr != '\n' && len < max_len) {
        len++;
        ptr++;
    }
    return (*ptr == '\n') ? len : 0;
}

plants_t plants(const char *diagram, const char *student) {
    plants_t result = {{DIRT, DIRT, DIRT, DIRT}};
    
    if (!diagram || !student) return result;
    
    int student_idx = -1;
    for (size_t idx = 0; idx < ARRAY_SIZE(students); idx++) {
        if (strcmp(student, students[idx]) == 0) {
            student_idx = (int)idx;
            break;
        }
    }
    if (student_idx == -1) return result;
    
    size_t diag_rowlen = rowlen(diagram);
    if (diag_rowlen == 0) return result;
    
    size_t base_pos = 2 * (size_t)student_idx;
    if (base_pos + 1 >= diag_rowlen) return result;
    
    size_t second_row_pos = base_pos + diag_rowlen + 1;
    size_t diag_len = strlen(diagram);
    if (second_row_pos + 1 >= diag_len) return result;
    
    const char plant_chars[4] = {
        diagram[base_pos],
        diagram[base_pos + 1],
        diagram[second_row_pos],
        diagram[second_row_pos + 1]
    };
    
    size_t out_idx = 0;
    for (size_t idx = 0; idx < 4; idx++) {
        switch (plant_chars[idx]) {
            case 'C': result.plants[out_idx++] = CLOVER; break;
            case 'G': result.plants[out_idx++] = GRASS; break;
            case 'R': result.plants[out_idx++] = RADISHES; break;
            case 'V': result.plants[out_idx++] = VIOLETS; break;
        }
    }
    return result;
}