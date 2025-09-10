#include "kindergarten_garden.h"

#include <stdio.h>
#include <string.h>

static const char *students[] = {"Alice",  "Bob",    "Charlie", "David",
                                 "Eve",    "Fred",   "Ginny",   "Harriet",
                                 "Ileana", "Joseph", "Kincaid", "Larry"};

size_t rowlen(const char *diagram) {
    const char *newline = strchr(diagram, '\n');
    size_t len = newline ? (size_t)(newline - diagram) : 0;
    return (len <= ARRAY_SIZE(students) * 2) ? len : 0;
}

plants_t plants(const char *diagram, const char *student) {
    plants_t result = {{DIRT, DIRT, DIRT, DIRT}};
    if (!diagram || !student) return result;

    size_t diag_rowlen = rowlen(diagram);
    if (diag_rowlen == 0) return result;

    int student_idx = -1;
    for (size_t idx = 0; idx < ARRAY_SIZE(students); idx++) {
        if (strcmp(student, students[idx]) == 0) {
            student_idx = (int)idx;
            break;
        }
    }
    if (student_idx == -1 || (size_t)(2 * student_idx) >= diag_rowlen) return result;

    const char *row2 = strchr(diagram, '\n') + 1;
    if (!row2 || strlen(row2) < diag_rowlen) return result;

    char input_plants[] = {
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