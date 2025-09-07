package school

import "sort"

// Define the Grade and School types here.
type School struct {
	grades map[int][]string
}

type Grade struct {
	level    int
	students []string
}

// ByLevel implements sort.Interface based on level field.
type ByLevel []Grade

func (grades ByLevel) Len() int {
	return len(grades)
}
func (grades ByLevel) Less(i, j int) bool {
	return grades[i].level < grades[j].level
}
func (grades ByLevel) Swap(i, j int) {
	grades[i], grades[j] = grades[j], grades[i]
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

func (s *School) Enrollment() (result []Grade) {
	levels := make([]int, 0, len(s.grades))
	for level := range s.grades {
		levels = append(levels, level)
	}
	sort.Ints(levels)

	for _, level := range levels {
		result = append(result, Grade{level: level, students: s.grades[level]})
	}
	return result
}