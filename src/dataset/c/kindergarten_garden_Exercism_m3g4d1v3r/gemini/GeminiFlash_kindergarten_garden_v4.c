#include "kindergarten_garden.h"

#include <string.h>

static const char *students[] = {"Alice",  "Bob",    "Charlie", "David",
                                 "Eve",    "Fred",   "Ginny",   "Harriet",
                                 "Ileana", "Joseph", "Kincaid", "Larry"};

size_t rowlen(const char *diagram) {
    size_t len = 0;
    while (diagram[len] != '\n' && diagram[len] != '\0') {
        if (len >= (sizeof(students) / sizeof(students[0]) * 2)) return 0;
        len++;
    }
    return len;
}

plants_t plants(const char *diagram, const char *student) {
    plants_t result = {{DIRT, DIRT, DIRT, DIRT}};

    if (diagram == NULL || student == NULL) return result;

    size_t diag_rowlen = rowlen(diagram);
    if (diag_rowlen == 0 || diagram[0] == '\0') return result;

    int student_idx = -1;
    for (size_t idx = 0; idx < sizeof(students) / sizeof(students[0]); idx++) {
        if (strcmp(student, students[idx]) == 0) {
            student_idx = (int)idx;
            break;
        }
    }
    if (student_idx == -1) return result;

    size_t student_offset = 2 * (size_t)student_idx;
    if (student_offset >= diag_rowlen) return result;

    const char *second_row = strchr(diagram, '\n');
    if (second_row == NULL) return result;
    second_row++;

    result.plants[0] = DIRT;
    result.plants[1] = DIRT;
    result.plants[2] = DIRT;
    result.plants[3] = DIRT;

    switch (diagram[student_offset]) {
        case 'C': result.plants[0] = CLOVER; break;
        case 'G': result.plants[0] = GRASS; break;
        case 'R': result.plants[0] = RADISHES; break;
        case 'V': result.plants[0] = VIOLETS; break;
    }

    switch (diagram[student_offset + 1]) {
        case 'C': result.plants[1] = CLOVER; break;
        case 'G': result.plants[1] = GRASS; break;
        case 'R': result.plants[1] = RADISHES; break;
        case 'V': result.plants[1] = VIOLETS; break;
    }

    switch (second_row[student_offset]) {
        case 'C': result.plants[2] = CLOVER; break;
        case 'G': result.plants[2] = GRASS; break;
        case 'R': result.plants[2] = RADISHES; break;
        case 'V': result.plants[2] = VIOLETS; break;
    }

    switch (second_row[student_offset + 1]) {
        case 'C': result.plants[3] = CLOVER; break;
        case 'G': result.plants[3] = GRASS; break;
        case 'R': result.plants[3] = RADISHES; break;
        case 'V': result.plants[3] = VIOLETS; break;
    }

    return result;
}