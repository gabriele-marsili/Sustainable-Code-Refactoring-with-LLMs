package school

import (
	"sort"
)

type School struct {
	grades map[int]Grade
}

type Grade struct {
	grade    int
	students []string
}

// Create and return a new, empty school
func New() *School {
	return &School{grades: make(map[int]Grade)}
}

// Add student to a Grade - whether or not the Grade exists is handled
func (s *School) Add(student string, g int) {
	grade, exists := s.grades[g]
	if !exists {
		s.grades[g] = Grade{grade: g, students: []string{student}}
	} else {
		grade.students = append(grade.students, student)
		s.grades[g] = grade
	}
}

// Return the students in a Grade
func (s *School) Grade(level int) []string {
	if grade, exists := s.grades[level]; exists {
		return grade.students
	}
	return []string{}
}

// Return grade enrollments, sorted in place
func (s *School) Enrollment() []Grade {
	enrollment := make([]Grade, 0, len(s.grades))
	for _, grade := range s.grades {
		sort.Strings(grade.students)
		enrollment = append(enrollment, grade)
	}
	sort.Slice(enrollment, func(i, j int) bool {
		return enrollment[i].grade < enrollment[j].grade
	})
	return enrollment
}

// Whether or not school has students in a Grade enrolled
func (s *School) HasGrade(grade int) bool {
	_, exists := s.grades[grade]
	return exists
}