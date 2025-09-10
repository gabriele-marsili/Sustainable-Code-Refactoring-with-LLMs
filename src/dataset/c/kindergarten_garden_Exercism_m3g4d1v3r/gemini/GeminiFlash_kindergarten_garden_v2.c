#include "kindergarten_garden.h"

#include <string.h>

static const char *students[] = {"Alice",  "Bob",    "Charlie", "David",
                                 "Eve",    "Fred",   "Ginny",   "Harriet",
                                 "Ileana", "Joseph", "Kincaid", "Larry"};

plants_t plants(const char *diagram, const char *student) {
    plants_t result = {{DIRT, DIRT, DIRT, DIRT}};

    if (diagram == NULL || student == NULL) return result;

    size_t diagram_row_length = 0;
    while (diagram[diagram_row_length] != '\n' && diagram[diagram_row_length] != '\0') {
        diagram_row_length++;
        if (diagram_row_length > (sizeof(students) / sizeof(students[0]) * 2)) return result;
    }

    if (diagram_row_length == 0) return result;

    int student_index = -1;
    for (size_t i = 0; i < sizeof(students) / sizeof(students[0]); ++i) {
        if (strcmp(student, students[i]) == 0) {
            student_index = (int)i;
            break;
        }
    }

    if (student_index == -1) return result;

    size_t student_offset = (size_t)student_index * 2;

    if (student_offset >= diagram_row_length) return result;

    size_t diagram_length = strlen(diagram);
    if (student_offset + diagram_row_length + 1 >= diagram_length) return result;

    char plants_symbols[4] = {
        diagram[student_offset],
        diagram[student_offset + 1],
        diagram[student_offset + diagram_row_length + 1],
        diagram[student_offset + diagram_row_length + 2]
    };

    for (int i = 0; i < 4; ++i) {
        switch (plants_symbols[i]) {
            case 'C':
                result.plants[i] = CLOVER;
                break;
            case 'G':
                result.plants[i] = GRASS;
                break;
            case 'R':
                result.plants[i] = RADISHES;
                break;
            case 'V':
                result.plants[i] = VIOLETS;
                break;
            default:
                result.plants[i] = DIRT;
                break;
        }
    }

    return result;
}