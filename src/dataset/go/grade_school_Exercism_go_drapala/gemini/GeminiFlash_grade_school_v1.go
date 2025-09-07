package school

import (
	"sort"
)

type School struct {
	grades map[int][]string
}

// New creates and returns a new, empty school.
func New() *School {
	return &School{
		grades: make(map[int][]string),
	}
}

// Add adds a student to the specified grade.
func (s *School) Add(student string, grade int) {
	s.grades[grade] = append(s.grades[grade], student)
}

// Grade returns the students in the specified grade.
func (s *School) Grade(grade int) []string {
	students, ok := s.grades[grade]
	if !ok {
		return []string{}
	}
	sort.Strings(students)
	return students
}

// Enrollment returns the grade enrollments sorted by grade.
func (s *School) Enrollment() []Grade {
	var result []Grade
	var grades []int
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

// HasGrade checks if the school has students in the specified grade.
func (s *School) HasGrade(grade int) bool {
	_, ok := s.grades[grade]
	return ok
}

type Grade struct {
	grade    int
	students []string
}