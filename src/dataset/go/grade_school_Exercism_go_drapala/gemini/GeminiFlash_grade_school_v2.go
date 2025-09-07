package school

import (
	"sort"
)

type School struct {
	grades map[int][]string
}

// Create and return a new, empty school
func New() *School {
	school := School{make(map[int][]string)}
	return &school
}

// Add student to a Grade - whether or not the Grade exists is handled
func (s *School) Add(student string, grade int) {
	s.grades[grade] = append(s.grades[grade], student)
}

// Return the students in a Grade
func (s *School) Grade(grade int) []string {
	students, ok := s.grades[grade]
	if !ok {
		return []string{}
	}
	result := make([]string, len(students))
	copy(result, students)
	return result
}

// Return grade enrollments, sorted in place
func (s *School) Enrollment() []Grade {
	var grades []int
	for grade := range s.grades {
		grades = append(grades, grade)
	}
	sort.Ints(grades)

	result := make([]Grade, 0, len(grades))
	for _, grade := range grades {
		students := s.Grade(grade)
		sort.Strings(students)
		result = append(result, Grade{grade: grade, students: students})
	}

	return result
}

type Grade struct {
	grade    int
	students []string
}