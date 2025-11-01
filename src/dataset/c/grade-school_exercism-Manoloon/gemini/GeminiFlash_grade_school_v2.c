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
                // Handle the case where the new roster is full.  This could involve
                // reallocating memory, returning an error, or truncating the list.
                // For now, we'll just stop adding students.  A more robust
                // implementation would handle this more gracefully.
                break;
            }
        }
    }
    return new_roster;
}


bool add_student(roster_t *roster, char *name, uint8_t grade) {
    if (!roster || !name || name[0] == '\0' || roster->count >= MAX_STUDENTS) {
        return false;
    }

    // Check for duplicate name
    for (size_t i = 0; i < roster->count; ++i) {
        if (strcmp(roster->students[i].name, name) == 0) {
            return false;
        }
    }

    // Find insertion point using binary search
    size_t low = 0;
    size_t high = roster->count;
    size_t pos;

    while (low < high) {
        pos = (low + high) / 2;
        if (grade < roster->students[pos].grade) {
            high = pos;
        } else if (grade > roster->students[pos].grade) {
            low = pos + 1;
        } else {
            // Grades are equal, compare names
            int cmp = strcmp(name, roster->students[pos].name);
            if (cmp < 0) {
                high = pos;
            } else if (cmp > 0) {
                low = pos + 1;
            } else {
                // Should not happen, as we already checked for duplicates
                return false;
            }
        }
    }
    pos = low;

    // Shift elements to make space for the new student
    memmove(&roster->students[pos + 1], &roster->students[pos],
            (roster->count - pos) * sizeof(student_t));

    // Insert the new student
    roster->students[pos].grade = grade;
    strcpy(roster->students[pos].name, name);
    roster->count++;

    return true;
}