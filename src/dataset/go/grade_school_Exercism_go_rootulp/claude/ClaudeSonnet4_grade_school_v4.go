package school

import "sort"

type School struct {
	grades map[int]Grade
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
	return &School{make(map[int]Grade)}
}

func (s *School) Add(student string, level int) {
	grade, ok := s.grades[level]
	if !ok {
		s.grades[level] = Grade{level, []string{student}}
	} else {
		students := make([]string, len(grade.students)+1)
		copy(students, grade.students)
		students[len(grade.students)] = student
		sort.Strings(students)
		s.grades[level] = Grade{level, students}
	}
}

func (s *School) Grade(level int) []string {
	if grade, ok := s.grades[level]; ok {
		result := make([]string, len(grade.students))
		copy(result, grade.students)
		return result
	}
	return []string{}
}

func (s *School) Enrollment() []Grade {
	if len(s.grades) == 0 {
		return []Grade{}
	}
	
	result := make([]Grade, 0, len(s.grades))
	for _, grade := range s.grades {
		result = append(result, grade)
	}
	sort.Sort(ByLevel(result))
	return result
}