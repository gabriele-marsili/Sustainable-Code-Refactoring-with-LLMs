#include "grade_school.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

void init_roster(roster_t *new_roster)
{
    if (!new_roster) return;
    new_roster->count = 0;
}

roster_t get_grade(roster_t *roster, uint8_t desiredGrade)
{
    roster_t new_roster = { .count = 0 };
    for (size_t i = 0; i < roster->count; ++i)
    {
        if (roster->students[i].grade == desiredGrade)
        {
            new_roster.students[new_roster.count++] = roster->students[i];
        }
    }
    return new_roster;
}

bool add_student(roster_t *roster, char* name, uint8_t grade)
{
    if (!roster || !name || *name == '\0') return false;

    for (size_t i = 0; i < roster->count; ++i)
    {
        if (strcmp(roster->students[i].name, name) == 0)
            return false;
    }

    size_t pos = 0;
    while (pos < roster->count && 
           (roster->students[pos].grade < grade || 
           (roster->students[pos].grade == grade && strcmp(roster->students[pos].name, name) < 0)))
    {
        pos++;
    }

    if (roster->count < MAX_STUDENTS)
    {
        memmove(&roster->students[pos + 1], &roster->students[pos], (roster->count - pos) * sizeof(student_t));
        roster->students[pos] = (student_t){ .grade = grade };
        strncpy(roster->students[pos].name, name, MAX_NAME_LENGTH - 1);
        roster->students[pos].name[MAX_NAME_LENGTH - 1] = '\0';
        roster->count++;
        return true;
    }

    return false;
}