package school

import "sort"

// Define the Grade and School types here.
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
	// Use binary search to insert student in sorted order
	idx := sort.SearchStrings(grade.students, student)
	if idx < len(grade.students) && grade.students[idx] == student {
		return // Avoid duplicates
	}
	grade.students = append(grade.students[:idx], append([]string{student}, grade.students[idx:]...)...)
}

func (s *School) Grade(level int) []string {
	if grade, exists := s.grades[level]; exists {
		return append([]string{}, grade.students...) // Return a copy to avoid mutation
	}
	return []string{}
}

func (s *School) Enrollment() []Grade {
	result := make([]Grade, 0, len(s.grades))
	for _, grade := range s.grades {
		result = append(result, Grade{level: grade.level, students: append([]string{}, grade.students...)})
	}
	sort.Slice(result, func(i, j int) bool {
		return result[i].level < result[j].level
	})
	return result
}