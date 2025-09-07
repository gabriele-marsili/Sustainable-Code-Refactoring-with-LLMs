package school

import "sort"

type School struct {
	grades map[int]*Grade
}

type Grade struct {
	level    int
	students []string
}

func New() *School {
	return &School{grades: make(map[int]*Grade)}
}

func (s *School) Add(student string, level int) {
	grade, exists := s.grades[level]
	if !exists {
		s.grades[level] = &Grade{level: level, students: []string{student}}
		return
	}
	idx := sort.SearchStrings(grade.students, student)
	if idx < len(grade.students) && grade.students[idx] == student {
		return
	}
	grade.students = append(grade.students, "")
	copy(grade.students[idx+1:], grade.students[idx:])
	grade.students[idx] = student
}

func (s *School) Grade(level int) []string {
	if grade, exists := s.grades[level]; exists {
		return append([]string(nil), grade.students...)
	}
	return nil
}

func (s *School) Enrollment() []Grade {
	result := make([]Grade, 0, len(s.grades))
	for _, grade := range s.grades {
		result = append(result, Grade{level: grade.level, students: append([]string(nil), grade.students...)})
	}
	sort.Slice(result, func(i, j int) bool {
		return result[i].level < result[j].level
	})
	return result
}