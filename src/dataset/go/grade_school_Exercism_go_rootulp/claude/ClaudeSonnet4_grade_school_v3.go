package school

import "sort"

type School struct {
	grades map[int][]string
}

type Grade struct {
	level    int
	students []string
}

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
	return &School{make(map[int][]string)}
}

func (s *School) Add(student string, level int) {
	students := s.grades[level]
	
	insertPos := sort.SearchStrings(students, student)
	students = append(students, "")
	copy(students[insertPos+1:], students[insertPos:])
	students[insertPos] = student
	
	s.grades[level] = students
}

func (s *School) Grade(level int) []string {
	students := s.grades[level]
	if len(students) == 0 {
		return []string{}
	}
	result := make([]string, len(students))
	copy(result, students)
	return result
}

func (s *School) Enrollment() []Grade {
	if len(s.grades) == 0 {
		return []Grade{}
	}
	
	result := make([]Grade, 0, len(s.grades))
	for level, students := range s.grades {
		studentsCopy := make([]string, len(students))
		copy(studentsCopy, students)
		result = append(result, Grade{level, studentsCopy})
	}
	
	sort.Sort(ByLevel(result))
	return result
}