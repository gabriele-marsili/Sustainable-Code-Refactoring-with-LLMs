#include "grade_school.h"

void init_roster(roster_t *roster) {
    if (roster == NULL) return;
    roster->count = 0;
    for (size_t idx; idx < MAX_STUDENTS; idx++) {
        strcpy(roster->students[idx].name, "");
        roster->students[idx].grade = 0;
    }
}

bool add_student(roster_t *roster, const char *name, uint8_t grade) {
    size_t name_len;
    size_t target_idx;

    if (roster == NULL) return (false);
    name_len = strlen(name) + 1;
    if (name_len >= MAX_NAME_LENGTH) return (false);
    for (target_idx = 0; target_idx < roster->count; target_idx++) {
        int8_t cmp = strcmp(name, roster->students[target_idx].name);
        uint8_t curr_grade = roster->students[target_idx].grade;
        if (cmp == 0) return (false);
        if (grade < curr_grade || (grade == curr_grade && cmp < 0)) break;
    }
    roster->count++;
    for (size_t idx = roster->count - 1; idx > target_idx; idx--) {
        roster->students[idx] = roster->students[idx - 1];
    }
    roster->students[target_idx].grade = grade;
    strncpy(roster->students[target_idx].name, name, name_len);
    return (true);
}

roster_t get_grade(roster_t *roster, uint8_t target) {
    roster_t result;

    init_roster(&result);
    for (size_t idx = 0; idx < roster->count; idx++) {
        if (roster->students[idx].grade == target) {
            strcpy(result.students[result.count].name,
                   roster->students[idx].name);
            result.students[result.count++].grade = target;
        }
    }
    return (result);
}
