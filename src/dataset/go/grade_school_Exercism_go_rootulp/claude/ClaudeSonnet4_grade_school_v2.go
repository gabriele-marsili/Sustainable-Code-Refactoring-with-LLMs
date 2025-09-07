package school

import "sort"

// Define the Grade and School types here.
type School struct {
	grades map[int]Grade
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
	return &School{make(map[int]Grade)}
}

func (s *School) Add(student string, level int) {
	grade, ok := s.grades[level]
	if !ok {
		s.grades[level] = Grade{level, []string{student}}
	} else {
		// Insert student in sorted position to avoid full sort
		students := grade.students
		pos := sort.SearchStrings(students, student)
		students = append(students, "")
		copy(students[pos+1:], students[pos:])
		students[pos] = student
		grade.students = students
		s.grades[level] = grade
	}
}

func (s *School) Grade(level int) []string {
	if grade, ok := s.grades[level]; ok {
		return grade.students
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