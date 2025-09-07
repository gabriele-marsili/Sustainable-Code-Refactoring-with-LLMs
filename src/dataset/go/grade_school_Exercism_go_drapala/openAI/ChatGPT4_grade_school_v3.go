package school

import (
	"sort"
)

type School struct {
	grades map[int]*Grade
}

type Grade struct {
	grade    int
	students []string
}

type GradeSlice []string

func (g GradeSlice) Len() int           { return len(g) }
func (g GradeSlice) Less(i, j int) bool { return g[i] < g[j] }
func (g GradeSlice) Swap(i, j int)      { g[i], g[j] = g[j], g[i] }

func New() *School {
	return &School{grades: make(map[int]*Grade)}
}

func (s *School) Add(student string, g int) {
	if grade, exists := s.grades[g]; exists {
		grade.students = append(grade.students, student)
	} else {
		s.grades[g] = &Grade{grade: g, students: []string{student}}
	}
}

func (s *School) AppendStudentToGrade(level int, student string) {
	if grade, exists := s.grades[level]; exists {
		grade.students = append(grade.students, student)
	}
}

func (s *School) Grade(level int) []string {
	if grade, exists := s.grades[level]; exists {
		return grade.students
	}
	return []string{}
}

func (s *School) Enrollment() []Grade {
	grades := make([]Grade, 0, len(s.grades))
	for _, grade := range s.grades {
		sort.Sort(GradeSlice(grade.students))
		grades = append(grades, *grade)
	}
	sort.Slice(grades, func(i, j int) bool {
		return grades[i].grade < grades[j].grade
	})
	return grades
}

func (s *School) HasGrade(grade int) bool {
	_, exists := s.grades[grade]
	return exists
}