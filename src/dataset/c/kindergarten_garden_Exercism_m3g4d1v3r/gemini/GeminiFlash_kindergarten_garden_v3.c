#include "kindergarten_garden.h"

#include <string.h>

static const char *students[] = {"Alice",  "Bob",    "Charlie", "David",
                                 "Eve",    "Fred",   "Ginny",   "Harriet",
                                 "Ileana", "Joseph", "Kincaid", "Larry"};

plants_t plants(const char *diagram, const char *student) {
    plants_t result = {{DIRT, DIRT, DIRT, DIRT}};
    if (diagram == NULL || student == NULL) return (result);

    size_t diag_len = strlen(diagram);
    if (diag_len == 0) return (result);

    size_t diag_rowlen = 0;
    while (diag_rowlen < diag_len && diagram[diag_rowlen] != '\n') {
        diag_rowlen++;
    }
    if (diag_rowlen == 0 || diag_rowlen >= diag_len) return (result);

    int student_idx = -1;
    for (size_t idx = 0; idx < ARRAY_SIZE(students); idx++) {
        if (strcmp(student, students[idx]) == 0) {
            student_idx = (int)idx;
            break;
        }
    }
    if (student_idx == -1) return (result);

    size_t student_offset = 2 * (size_t)student_idx;
    if (student_offset >= diag_rowlen || student_offset + diag_rowlen + 2 > diag_len) return (result);

    char input_plants[4] = {
        diagram[student_offset],
        diagram[student_offset + 1],
        diagram[student_offset + diag_rowlen + 1],
        diagram[student_offset + diag_rowlen + 2]
    };

    for (int idx = 0; idx < 4; idx++) {
        switch (input_plants[idx]) {
            case 'C':
                result.plants[idx] = CLOVER;
                break;
            case 'G':
                result.plants[idx] = GRASS;
                break;
            case 'R':
                result.plants[idx] = RADISHES;
                break;
            case 'V':
                result.plants[idx] = VIOLETS;
                break;
            default:
                result.plants[idx] = DIRT;
                break;
        }
    }
    return (result);
}