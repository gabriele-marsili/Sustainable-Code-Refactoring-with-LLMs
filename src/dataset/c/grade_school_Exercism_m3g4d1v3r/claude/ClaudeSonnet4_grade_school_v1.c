#include "grade_school.h"

void init_roster(roster_t *roster) {
    if (roster == NULL) return;
    roster->count = 0;
    // Remove unnecessary loop - only initialize when needed
}

bool add_student(roster_t *roster, const char *name, uint8_t grade) {
    size_t name_len;
    size_t target_idx;

    if (roster == NULL || roster->count >= MAX_STUDENTS) return false;
    name_len = strlen(name);
    if (name_len >= MAX_NAME_LENGTH - 1) return false;
    
    // Find insertion point and check for duplicates in single pass
    for (target_idx = 0; target_idx < roster->count; target_idx++) {
        int8_t cmp = strcmp(name, roster->students[target_idx].name);
        uint8_t curr_grade = roster->students[target_idx].grade;
        if (cmp == 0) return false;
        if (grade < curr_grade || (grade == curr_grade && cmp < 0)) break;
    }
    
    // Use memmove for efficient bulk copy
    if (target_idx < roster->count) {
        memmove(&roster->students[target_idx + 1], 
                &roster->students[target_idx],
                (roster->count - target_idx) * sizeof(student_t));
    }
    
    roster->students[target_idx].grade = grade;
    strcpy(roster->students[target_idx].name, name);
    roster->count++;
    return true;
}

roster_t get_grade(roster_t *roster, uint8_t target) {
    roster_t result;
    
    result.count = 0;
    if (roster == NULL) return result;
    
    for (size_t idx = 0; idx < roster->count; idx++) {
        if (roster->students[idx].grade == target) {
            result.students[result.count] = roster->students[idx];
            result.count++;
        }
    }
    return result;
}