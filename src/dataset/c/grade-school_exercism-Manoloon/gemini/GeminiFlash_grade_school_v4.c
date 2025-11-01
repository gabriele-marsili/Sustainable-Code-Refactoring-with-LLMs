#include "grade_school.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

void init_roster(roster_t *new_roster) {
    if (new_roster) {
        new_roster->count = 0;
    }
}

roster_t get_grade(roster_t *roster, uint8_t desiredGrade) {
    roster_t new_roster;
    new_roster.count = 0;

    for (size_t i = 0; i < roster->count; ++i) {
        if (roster->students[i].grade == desiredGrade) {
            if (new_roster.count < MAX_STUDENTS) {
                new_roster.students[new_roster.count] = roster->students[i];
                new_roster.count++;
            } else {
                // Handle the case where the new roster is full.  Could return an error,
                // truncate the list, or reallocate.  For now, we truncate.
                break;
            }
        }
    }
    return new_roster;
}


bool add_student(roster_t *roster, char *name, uint8_t grade) {
    if (!roster || !name || name[0] == '\0') return false;

    if (roster->count >= MAX_STUDENTS) return false;

    for (size_t i = 0; i < roster->count; ++i) {
        if (strcmp(roster->students[i].name, name) == 0) return false;
    }

    size_t pos = 0;
    while (pos < roster->count) {
        if (grade < roster->students[pos].grade ||
            (grade == roster->students[pos].grade && strcmp(name, roster->students[pos].name) < 0)) {
            break;
        }
        pos++;
    }

    // Shift elements to make space for the new student.  Use memmove to handle potential overlap.
    memmove(&roster->students[pos + 1], &roster->students[pos],
            (roster->count - pos) * sizeof(student_t));

    roster->students[pos].grade = grade;
    strcpy(roster->students[pos].name, name);
    roster->count++;

    return true;
}