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
func (s *School) Add(student string, g int) {
	s.grades[g] = append(s.grades[g], student)
}

// Return the students in a Grade
func (s *School) Grade(level int) []string {
	return s.grades[level]
}

// Return grade enrollments, sorted in place
func (s *School) Enrollment() []Grade {
	keys := make([]int, 0, len(s.grades))
	for k := range s.grades {
		keys = append(keys, k)
	}
	sort.Ints(keys)

	enrollment := make([]Grade, 0, len(keys))
	for _, k := range keys {
		students := s.grades[k]
		sort.Strings(students)
		enrollment = append(enrollment, Grade{grade: k, students: students})
	}
	return enrollment
}

type Grade struct {
	grade    int
	students []string
}