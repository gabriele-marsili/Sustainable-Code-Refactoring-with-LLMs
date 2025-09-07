package school

import "sort"

// Define the Grade and School types here.
type School struct {
	grades map[int][]string
}

// Define the Grade and School types here.
type Grade struct {
	level    int
	students []string
}

func New() *School {
	return &School{grades: make(map[int][]string)}
}

func (s *School) Add(student string, level int) {
	if _, ok := s.grades[level]; !ok {
		s.grades[level] = []string{student}
		return
	}
	s.grades[level] = append(s.grades[level], student)
	sort.Strings(s.grades[level])
}

func (s *School) Grade(level int) []string {
	students, ok := s.grades[level]
	if !ok {
		return []string{}
	}
	result := make([]string, len(students))
	copy(result, students)
	return result
}

func (s *School) Enrollment() []Grade {
	levels := make([]int, 0, len(s.grades))
	for level := range s.grades {
		levels = append(levels, level)
	}
	sort.Ints(levels)

	result := make([]Grade, 0, len(levels))
	for _, level := range levels {
		result = append(result, Grade{level: level, students: s.grades[level]})
	}
	return result
}