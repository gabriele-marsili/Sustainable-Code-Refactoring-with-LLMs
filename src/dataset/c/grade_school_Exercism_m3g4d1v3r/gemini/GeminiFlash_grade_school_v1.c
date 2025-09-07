#include "grade_school.h"
#include <string.h>

void init_roster(roster_t *roster) {
    if (roster == NULL) return;
    roster->count = 0;
    // No need to initialize names and grades, as count is 0 and will be overwritten on add
}

bool add_student(roster_t *roster, const char *name, uint8_t grade) {
    if (roster == NULL) return false;

    size_t name_len = strlen(name);
    if (name_len >= MAX_NAME_LENGTH) return false;

    if (name_len == 0) return false; // Avoid adding empty names

    size_t target_idx = 0;
    while (target_idx < roster->count) {
        int8_t cmp = strcmp(name, roster->students[target_idx].name);
        if (cmp == 0) return false; // Student already exists

        if (grade < roster->students[target_idx].grade ||
            (grade == roster->students[target_idx].grade && cmp < 0)) {
            break; // Found insertion point
        }
        target_idx++;
    }

    if (roster->count >= MAX_STUDENTS) return false; // Roster is full

    // Shift elements to make space for the new student
    for (size_t idx = roster->count; idx > target_idx; idx--) {
        roster->students[idx] = roster->students[idx - 1];
    }

    roster->students[target_idx].grade = grade;
    strncpy(roster->students[target_idx].name, name, MAX_NAME_LENGTH - 1);
    roster->students[target_idx].name[MAX_NAME_LENGTH - 1] = '\0'; // Ensure null termination
    roster->count++;

    return true;
}


roster_t get_grade(roster_t *roster, uint8_t target) {
    roster_t result;
    result.count = 0;

    if (roster == NULL) return result;

    for (size_t idx = 0; idx < roster->count; idx++) {
        if (roster->students[idx].grade == target) {
            if (result.count < MAX_STUDENTS) { // Check for overflow
                strncpy(result.students[result.count].name, roster->students[idx].name, MAX_NAME_LENGTH - 1);
                result.students[result.count].name[MAX_NAME_LENGTH - 1] = '\0'; // Ensure null termination
                result.students[result.count].grade = target;
                result.count++;
            } else {
                // Handle overflow, e.g., log an error or return early
                break;
            }
        }
    }
    return result;
}