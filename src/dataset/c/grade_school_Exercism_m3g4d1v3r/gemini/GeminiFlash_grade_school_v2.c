#include "grade_school.h"
#include <string.h>

void init_roster(roster_t *roster) {
    if (roster == NULL) return;
    roster->count = 0;
    for (size_t idx = 0; idx < MAX_STUDENTS; idx++) {
        roster->students[idx].name[0] = '\0';
        roster->students[idx].grade = 0;
    }
}

bool add_student(roster_t *roster, const char *name, uint8_t grade) {
    if (roster == NULL) return false;

    size_t name_len = strlen(name);
    if (name_len >= MAX_NAME_LENGTH) return false;

    if (roster->count >= MAX_STUDENTS) return false;

    size_t target_idx = 0;
    while (target_idx < roster->count) {
        int8_t cmp = strcmp(name, roster->students[target_idx].name);
        if (cmp == 0) return false;
        if (grade < roster->students[target_idx].grade ||
            (grade == roster->students[target_idx].grade && cmp < 0)) {
            break;
        }
        target_idx++;
    }

    // Shift elements to make space for the new student
    for (size_t idx = roster->count; idx > target_idx; idx--) {
        roster->students[idx] = roster->students[idx - 1];
    }

    roster->students[target_idx].grade = grade;
    strncpy(roster->students[target_idx].name, name, MAX_NAME_LENGTH);
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
            if (result.count < MAX_STUDENTS) {
                strncpy(result.students[result.count].name,
                        roster->students[idx].name, MAX_NAME_LENGTH);
                result.students[result.count].name[MAX_NAME_LENGTH - 1] = '\0';
                result.students[result.count].grade = target;
                result.count++;
            }
        }
    }
    return result;
}