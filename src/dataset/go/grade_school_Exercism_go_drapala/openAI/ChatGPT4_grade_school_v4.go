package school

import (
	"sort"
)

type School struct {
	grades map[int]Grade
	order  []int
}

type Grade struct {
	grade    int
	students []string
}

// Create and return a new, empty school
func New() *School {
	return &School{
		grades: make(map[int]Grade),
		order:  []int{},
	}
}

// Add student to a Grade - whether or not the Grade exists is handled
func (s *School) Add(student string, g int) {
	if _, exists := s.grades[g]; !exists {
		s.grades[g] = Grade{grade: g, students: []string{student}}
		s.order = append(s.order, g)
	} else {
		grade := s.grades[g]
		grade.students = append(grade.students, student)
		s.grades[g] = grade
	}
}

// Return the students in a Grade
func (s *School) Grade(level int) []string {
	if grade, exists := s.grades[level]; exists {
		return grade.students
	}
	return nil
}

// Return grade enrollments, sorted in place
func (s *School) Enrollment() []Grade {
	sort.Ints(s.order)
	enrollment := make([]Grade, 0, len(s.order))
	for _, g := range s.order {
		grade := s.grades[g]
		sort.Strings(grade.students)
		enrollment = append(enrollment, grade)
	}
	return enrollment
}

// Whether or not school has students in a Grade enrolled
func (s *School) HasGrade(grade int) bool {
	_, exists := s.grades[grade]
	return exists
}