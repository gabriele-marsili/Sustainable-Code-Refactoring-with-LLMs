#include "kindergarten_garden.h"

#include <stdio.h>

static const char *students[] = {"Alice",  "Bob",    "Charlie", "David",
                                 "Eve",    "Fred",   "Ginny",   "Harriet",
                                 "Ileana", "Joseph", "Kincaid", "Larry"};

size_t rowlen(const char *diagram) {
    size_t len = 0;

    while (*diagram != '\n') {
        if (len >= (ARRAY_SIZE(students) * 2 + 1)) return (0);
        len++;
        diagram++;
    }
    return (len);
}

plants_t plants(const char *diagram, const char *student) {
    plants_t result = {{DIRT, DIRT, DIRT, DIRT}};
    char input_plants[4];
    size_t diag_len;
    size_t diag_rowlen;
    size_t out_idx;
    int student_idx = -1;

    if (diagram == NULL || student == NULL) return (result);
    diag_rowlen = rowlen(diagram);
    diag_len = strlen(diagram);
    if (diag_rowlen == 0 || diag_len == 0) return (result);
    for (size_t idx = 0; idx < ARRAY_SIZE(students); idx++) {
        if (strcmp(student, students[idx]) == 0) {
            student_idx = idx;
        }
    }
    if (student_idx == -1) return (result);
    if ((2 * (size_t)student_idx) >= diag_rowlen) return (result);
    if ((2 * (size_t)student_idx + diag_rowlen + 1) >= diag_len)
        return (result);
    input_plants[0] = diagram[2 * student_idx];
    input_plants[1] = diagram[2 * student_idx + 1];
    input_plants[2] = diagram[2 * student_idx + diag_rowlen + 1];
    input_plants[3] = diagram[2 * student_idx + diag_rowlen + 2];
    out_idx = 0;
    for (size_t idx = 0; idx < 4; idx++) {
        switch (input_plants[idx]) {
            case 'C':
                result.plants[out_idx++] = CLOVER;
                break;
            case 'G':
                result.plants[out_idx++] = GRASS;
                break;
            case 'R':
                result.plants[out_idx++] = RADISHES;
                break;
            case 'V':
                result.plants[out_idx++] = VIOLETS;
                break;
        }
    }
    return (result);
}
