package school

import (
	"sort"
)

type School struct {
	gradesMap map[int]*Grade
}

type Grade struct {
	grade    int
	students []string
}

// Create and return a new, empty school
func New() *School {
	return &School{gradesMap: make(map[int]*Grade)}
}

// Add student to a Grade - whether or not the Grade exists is handled
func (s *School) Add(student string, g int) {
	if grade, exists := s.gradesMap[g]; exists {
		grade.students = append(grade.students, student)
	} else {
		s.gradesMap[g] = &Grade{grade: g, students: []string{student}}
	}
}

// For an existing Grade in the school, append student to it
func (s *School) AppendStudentToGrade(level int, student string) {
	if grade, exists := s.gradesMap[level]; exists {
		grade.students = append(grade.students, student)
	}
}

// Return the students in a Grade
func (s *School) Grade(level int) []string {
	if grade, exists := s.gradesMap[level]; exists {
		return grade.students
	}
	return []string{}
}

// Return grade enrollments, sorted in place
func (s *School) Enrollment() []Grade {
	grades := make([]Grade, 0, len(s.gradesMap))
	for _, grade := range s.gradesMap {
		sort.Strings(grade.students)
		grades = append(grades, *grade)
	}
	sort.Slice(grades, func(i, j int) bool {
		return grades[i].grade < grades[j].grade
	})
	return grades
}

// Whether or not school has students in a Grade enrolled
func (s *School) HasGrade(grade int) bool {
	_, exists := s.gradesMap[grade]
	return exists
}