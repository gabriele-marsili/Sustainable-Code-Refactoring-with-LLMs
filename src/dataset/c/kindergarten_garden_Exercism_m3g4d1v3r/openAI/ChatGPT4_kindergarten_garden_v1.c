#include "kindergarten_garden.h"

#include <stdio.h>
#include <string.h>

static const char *students[] = {"Alice",  "Bob",    "Charlie", "David",
                                 "Eve",    "Fred",   "Ginny",   "Harriet",
                                 "Ileana", "Joseph", "Kincaid", "Larry"};

static inline size_t rowlen(const char *diagram) {
    const char *newline = strchr(diagram, '\n');
    return newline ? (size_t)(newline - diagram) : 0;
}

plants_t plants(const char *diagram, const char *student) {
    plants_t result = {{DIRT, DIRT, DIRT, DIRT}};
    if (!diagram || !student) return result;

    size_t diag_rowlen = rowlen(diagram);
    if (diag_rowlen == 0) return result;

    size_t student_idx = 0;
    for (; student_idx < ARRAY_SIZE(students); student_idx++) {
        if (strcmp(student, students[student_idx]) == 0) break;
    }
    if (student_idx == ARRAY_SIZE(students)) return result;

    size_t plant_idx = 2 * student_idx;
    if (plant_idx + diag_rowlen + 2 >= strlen(diagram)) return result;

    const char input_plants[] = {
        diagram[plant_idx],
        diagram[plant_idx + 1],
        diagram[plant_idx + diag_rowlen + 1],
        diagram[plant_idx + diag_rowlen + 2]
    };

    for (size_t idx = 0; idx < 4; idx++) {
        switch (input_plants[idx]) {
            case 'C': result.plants[idx] = CLOVER; break;
            case 'G': result.plants[idx] = GRASS; break;
            case 'R': result.plants[idx] = RADISHES; break;
            case 'V': result.plants[idx] = VIOLETS; break;
        }
    }
    return result;
}