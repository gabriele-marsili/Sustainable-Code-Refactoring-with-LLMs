package school

import "sort"

type School struct {
	grades map[int]*Grade
}

type Grade struct {
	level    int
	students []string
}

type ByLevel []*Grade

func (grades ByLevel) Len() int           { return len(grades) }
func (grades ByLevel) Less(i, j int) bool { return grades[i].level < grades[j].level }
func (grades ByLevel) Swap(i, j int)      { grades[i], grades[j] = grades[j], grades[i] }

func New() *School {
	return &School{grades: make(map[int]*Grade)}
}

func (s *School) Add(student string, level int) {
	grade, exists := s.grades[level]
	if !exists {
		grade = &Grade{level: level, students: []string{}}
		s.grades[level] = grade
	}
	idx := sort.SearchStrings(grade.students, student)
	if idx == len(grade.students) || grade.students[idx] != student {
		grade.students = append(grade.students, "")
		copy(grade.students[idx+1:], grade.students[idx:])
		grade.students[idx] = student
	}
}

func (s *School) Grade(level int) []string {
	if grade, exists := s.grades[level]; exists {
		return append([]string{}, grade.students...)
	}
	return nil
}

func (s *School) Enrollment() []Grade {
	result := make([]Grade, 0, len(s.grades))
	for _, grade := range s.grades {
		result = append(result, Grade{level: grade.level, students: append([]string{}, grade.students...)})
	}
	sort.Sort(ByLevel(result))
	return result
}