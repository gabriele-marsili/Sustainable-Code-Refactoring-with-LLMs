#include "grade_school.h"
#include <string.h>

void init_roster(roster_t *roster) {
    if (roster == NULL) return;
    roster->count = 0;
}

bool add_student(roster_t *roster, const char *name, uint8_t grade) {
    if (roster == NULL || strlen(name) >= MAX_NAME_LENGTH) return false;

    size_t target_idx = 0;
    while (target_idx < roster->count) {
        int cmp = strcmp(name, roster->students[target_idx].name);
        if (cmp == 0) return false; // Duplicate name
        if (grade < roster->students[target_idx].grade || 
           (grade == roster->students[target_idx].grade && cmp < 0)) break;
        target_idx++;
    }

    if (roster->count >= MAX_STUDENTS) return false; // Prevent overflow

    for (size_t idx = roster->count; idx > target_idx; idx--) {
        roster->students[idx] = roster->students[idx - 1];
    }

    roster->students[target_idx].grade = grade;
    strncpy(roster->students[target_idx].name, name, MAX_NAME_LENGTH - 1);
    roster->students[target_idx].name[MAX_NAME_LENGTH - 1] = '\0'; // Ensure null-termination
    roster->count++;
    return true;
}

roster_t get_grade(const roster_t *roster, uint8_t target) {
    roster_t result;
    init_roster(&result);

    if (roster == NULL) return result;

    for (size_t idx = 0; idx < roster->count; idx++) {
        if (roster->students[idx].grade == target) {
            if (result.count >= MAX_STUDENTS) break; // Prevent overflow
            strncpy(result.students[result.count].name, roster->students[idx].name, MAX_NAME_LENGTH - 1);
            result.students[result.count].name[MAX_NAME_LENGTH - 1] = '\0'; // Ensure null-termination
            result.students[result.count++].grade = target;
        }
    }
    return result;
}