#include "grade_school.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

void init_roster(roster_t *new_roster)
{
    if(new_roster == NULL) return;
    new_roster->count = 0;
}

roster_t get_grade(roster_t *roster, uint8_t desiredGrade)
{
    roster_t new_roster;
    new_roster.count = 0;
    
    for(size_t i = 0; i < roster->count; ++i)
    {
        if(roster->students[i].grade == desiredGrade)
        {   
            new_roster.students[new_roster.count] = roster->students[i];
            new_roster.count++;
        }
    }
    return new_roster;
}

bool add_student(roster_t *roster, char* name, uint8_t grade)
{
    if(roster == NULL || *name == '\0') return false;
    
    size_t name_len = strlen(name);
    
    // Find insertion position and check for duplicates in single pass
    size_t pos = 0;
    while(pos < roster->count)
    {
        student_t* tempStudent = &roster->students[pos];
        
        int name_cmp = strcmp(name, tempStudent->name);
        if(name_cmp == 0) return false; // duplicate found
        
        if(grade < tempStudent->grade || 
           (tempStudent->grade == grade && name_cmp < 0))
            break;
        pos++;
    }
    
    // Use memmove for efficient shifting
    if(pos < roster->count) {
        memmove(&roster->students[pos + 1], &roster->students[pos], 
                (roster->count - pos) * sizeof(student_t));
    }
    
    // Direct assignment instead of creating temporary
    roster->students[pos].grade = grade;
    memcpy(roster->students[pos].name, name, name_len + 1);
    
    roster->count++;
    return true;
}