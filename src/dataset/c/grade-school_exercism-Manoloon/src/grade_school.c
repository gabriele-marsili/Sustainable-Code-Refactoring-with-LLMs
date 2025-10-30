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
    student_t new_student;
    for(size_t i = 0; i < roster->count;++i)
    {
        if(roster->students[i].grade == desiredGrade)
        {   
            new_student.grade = roster->students[i].grade;
            strcpy(new_student.name,roster->students[i].name);
            new_roster.students[new_roster.count++] = new_student;
        }
    }
    return new_roster;
}

bool add_student(roster_t *roster, char* name, uint8_t grade)
{
    if(roster == NULL || *name == '\0') return false;
    
    for(size_t i = 0 ; i < roster->count;++i)
    {
        if(strcmp(roster->students[i].name,name) == 0) 
            return false;
    }
    size_t pos = 0;
    while(pos < roster->count)
    {
        student_t* tempStudent = &roster->students[pos];
    
        // sort by grade
        if(grade < tempStudent->grade)
            break;
        // sort by name
        if((tempStudent->grade == grade) && strcmp(name,tempStudent->name) < 0)
            break;
        pos++;
    }
    // shift
    for(size_t i = roster->count; i > pos; i--)
    {
        roster->students[i] = roster->students[i - 1];
    }
    student_t new_student;
    new_student.grade = grade;
    strcpy (new_student.name,name);

    roster->students[pos] = new_student;
    roster->count++;
    return true;
}
