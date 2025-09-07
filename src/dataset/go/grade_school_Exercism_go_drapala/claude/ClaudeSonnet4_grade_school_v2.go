package school

import (
	"sort"
)

type School struct {
	grades map[int][]string
}

// Create and return a new, empty school
func New() *School {
	return &School{grades: make(map[int][]string)}
}

// Add student to a Grade - whether or not the Grade exists is handled
func (s *School) Add(student string, g int) {
	s.grades[g] = append(s.grades[g], student)
}

// Return the students in a Grade
func (s *School) Grade(level int) []string {
	students := s.grades[level]
	if students == nil {
		return []string{}
	}
	result := make([]string, len(students))
	copy(result, students)
	return result
}

// Return grade enrollments, sorted in place
func (s *School) Enrollment() []Grade {
	if len(s.grades) == 0 {
		return []Grade{}
	}
	
	grades := make([]int, 0, len(s.grades))
	for grade := range s.grades {
		grades = append(grades, grade)
	}
	sort.Ints(grades)
	
	result := make([]Grade, len(grades))
	for i, grade := range grades {
		students := make([]string, len(s.grades[grade]))
		copy(students, s.grades[grade])
		sort.Strings(students)
		result[i] = Grade{grade: grade, students: students}
	}
	
	return result
}

// Whether or not school has students in a Grade enrolled
func (s *School) HasGrade(grade int) bool {
	_, exists := s.grades[grade]
	return exists
}

type Grade struct {
	grade    int
	students []string
}