#include "grade_school.h"
#include <string.h>

void init_roster(roster_t *roster) {
    if (!roster) return;
    roster->count = 0;
}

bool add_student(roster_t *roster, const char *name, uint8_t grade) {
    if (!roster || strlen(name) >= MAX_NAME_LENGTH || roster->count >= MAX_STUDENTS) return false;

    size_t target_idx = 0;
    while (target_idx < roster->count) {
        int cmp = strcmp(name, roster->students[target_idx].name);
        if (cmp == 0) return false;
        if (grade < roster->students[target_idx].grade || 
           (grade == roster->students[target_idx].grade && cmp < 0)) break;
        target_idx++;
    }

    for (size_t idx = roster->count; idx > target_idx; idx--) {
        roster->students[idx] = roster->students[idx - 1];
    }

    roster->students[target_idx].grade = grade;
    strncpy(roster->students[target_idx].name, name, MAX_NAME_LENGTH - 1);
    roster->students[target_idx].name[MAX_NAME_LENGTH - 1] = '\0';
    roster->count++;
    return true;
}

roster_t get_grade(roster_t *roster, uint8_t target) {
    roster_t result;
    init_roster(&result);

    if (!roster) return result;

    for (size_t idx = 0; idx < roster->count; idx++) {
        if (roster->students[idx].grade == target) {
            result.students[result.count] = roster->students[idx];
            result.count++;
        }
    }
    return result;
}