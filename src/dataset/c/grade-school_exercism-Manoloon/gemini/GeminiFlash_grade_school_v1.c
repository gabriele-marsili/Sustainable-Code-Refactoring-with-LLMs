#include "grade_school.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

void init_roster(roster_t *new_roster) {
    if (new_roster != NULL) {
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
                // Handle the case where the new roster is full.  This could involve
                // reallocating memory, returning an error, or truncating the list.
                // For now, we'll just break out of the loop to prevent writing
                // beyond the bounds of the array. A more robust solution would be
                // preferred in a production environment.
                break;
            }
        }
    }
    return new_roster;
}


bool add_student(roster_t *roster, char *name, uint8_t grade) {
    if (roster == NULL || name == NULL || *name == '\0' || roster->count >= MAX_STUDENTS) {
        return false;
    }

    // Check for duplicate name
    for (size_t i = 0; i < roster->count; ++i) {
        if (strcmp(roster->students[i].name, name) == 0) {
            return false;
        }
    }

    // Find insertion point
    size_t pos = 0;
    while (pos < roster->count) {
        if (grade < roster->students[pos].grade ||
            (grade == roster->students[pos].grade && strcmp(name, roster->students[pos].name) < 0)) {
            break;
        }
        pos++;
    }

    // Shift elements to make space for the new student.  Start from the end.
    for (size_t i = roster->count; i > pos; --i) {
        roster->students[i] = roster->students[i - 1];
    }

    // Insert the new student
    roster->students[pos].grade = grade;
    strcpy(roster->students[pos].name, name);
    roster->count++;

    return true;
}