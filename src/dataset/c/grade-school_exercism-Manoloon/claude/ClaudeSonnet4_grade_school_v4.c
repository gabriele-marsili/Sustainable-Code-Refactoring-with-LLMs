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
    
    for(size_t i = 0; i < roster->count; ++i)
    {
        if(roster->students[i].name[0] == name[0] && 
           strcmp(roster->students[i].name, name) == 0) 
            return false;
    }
    
    size_t pos = 0;
    while(pos < roster->count)
    {
        const student_t* tempStudent = &roster->students[pos];
        
        if(grade < tempStudent->grade)
            break;
        if(tempStudent->grade == grade && strcmp(name, tempStudent->name) < 0)
            break;
        pos++;
    }
    
    if(pos < roster->count)
    {
        memmove(&roster->students[pos + 1], &roster->students[pos], 
                (roster->count - pos) * sizeof(student_t));
    }
    
    roster->students[pos].grade = grade;
    strcpy(roster->students[pos].name, name);
    roster->count++;
    return true;
}