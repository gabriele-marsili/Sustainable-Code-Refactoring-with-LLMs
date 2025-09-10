#include "kindergarten_garden.h"

#include <stdio.h>
#include <string.h>

static const char *students[] = {"Alice",  "Bob",    "Charlie", "David",
                                 "Eve",    "Fred",   "Ginny",   "Harriet",
                                 "Ileana", "Joseph", "Kincaid", "Larry"};

#define STUDENT_COUNT (sizeof(students) / sizeof(students[0]))

size_t rowlen(const char *diagram) {
    const char *newline = strchr(diagram, '\n');
    return (newline && (newline - diagram) <= (STUDENT_COUNT * 2)) ? (size_t)(newline - diagram) : 0;
}

plants_t plants(const char *diagram, const char *student) {
    plants_t result = {{DIRT, DIRT, DIRT, DIRT}};
    if (!diagram || !student) return result;

    size_t diag_rowlen = rowlen(diagram);
    if (diag_rowlen == 0) return result;

    int student_idx = -1;
    for (size_t idx = 0; idx < STUDENT_COUNT; idx++) {
        if (strcmp(student, students[idx]) == 0) {
            student_idx = (int)idx;
            break;
        }
    }
    if (student_idx == -1 || (2 * (size_t)student_idx) >= diag_rowlen) return result;

    const char *row2 = diagram + diag_rowlen + 1;
    if (row2 >= diagram + strlen(diagram)) return result;

    const char input_plants[] = {
        diagram[2 * student_idx],
        diagram[2 * student_idx + 1],
        row2[2 * student_idx],
        row2[2 * student_idx + 1]
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