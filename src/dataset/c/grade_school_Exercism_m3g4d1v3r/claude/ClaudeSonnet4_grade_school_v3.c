#include "grade_school.h"

void init_roster(roster_t *roster) {
    if (roster == NULL) return;
    roster->count = 0;
    memset(roster->students, 0, sizeof(roster->students));
}

bool add_student(roster_t *roster, const char *name, uint8_t grade) {
    if (roster == NULL || roster->count >= MAX_STUDENTS) return false;
    
    size_t name_len = strlen(name);
    if (name_len >= MAX_NAME_LENGTH - 1) return false;
    
    size_t target_idx = 0;
    while (target_idx < roster->count) {
        int cmp = strcmp(name, roster->students[target_idx].name);
        if (cmp == 0) return false;
        
        uint8_t curr_grade = roster->students[target_idx].grade;
        if (grade < curr_grade || (grade == curr_grade && cmp < 0)) break;
        target_idx++;
    }
    
    if (target_idx < roster->count) {
        memmove(&roster->students[target_idx + 1], 
                &roster->students[target_idx], 
                (roster->count - target_idx) * sizeof(student_t));
    }
    
    roster->students[target_idx].grade = grade;
    memcpy(roster->students[target_idx].name, name, name_len + 1);
    roster->count++;
    
    return true;
}

roster_t get_grade(roster_t *roster, uint8_t target) {
    roster_t result = {0};
    
    if (roster == NULL) return result;
    
    for (size_t idx = 0; idx < roster->count && result.count < MAX_STUDENTS; idx++) {
        if (roster->students[idx].grade == target) {
            result.students[result.count] = roster->students[idx];
            result.count++;
        }
    }
    
    return result;
}