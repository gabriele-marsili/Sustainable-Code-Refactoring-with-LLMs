package school

import (
	"sort"
)

type School struct {
	grades map[int][]string
}

// New creates and returns a new, empty school
func New() *School {
	school := School{make(map[int][]string)}
	return &school
}

// Add student to a Grade - whether or not the Grade exists is handled
func (s *School) Add(student string, grade int) {
	if _, ok := s.grades[grade]; !ok {
		s.grades[grade] = []string{student}
	} else {
		s.grades[grade] = append(s.grades[grade], student)
	}
}

// Grade returns the students in a Grade
func (s *School) Grade(grade int) []string {
	students, ok := s.grades[grade]
	if !ok {
		return []string{}
	}
	return students
}

// Enrollment returns grade enrollments, sorted by grade and student name
func (s *School) Enrollment() []Grade {
	var result []Grade
	grades := make([]int, 0, len(s.grades))
	for grade := range s.grades {
		grades = append(grades, grade)
	}
	sort.Ints(grades)

	for _, grade := range grades {
		students := s.grades[grade]
		sort.Strings(students)
		result = append(result, Grade{grade: grade, students: students})
	}
	return result
}

// HasGrade returns whether or not school has students in a Grade enrolled
func (s *School) HasGrade(grade int) bool {
	_, ok := s.grades[grade]
	return ok
}

type Grade struct {
	grade    int
	students []string
}