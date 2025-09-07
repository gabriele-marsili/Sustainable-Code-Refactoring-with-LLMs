package school

import (
	"sort"
)

type School struct {
	grades map[int]GradeSlice
}

type Grade struct {
	grade    int
	students GradeSlice
}

type GradeSlice []string

func (g GradeSlice) Len() int           { return len(g) }
func (g GradeSlice) Less(i, j int) bool { return g[i] < g[j] }
func (g GradeSlice) Swap(i, j int)      { g[i], g[j] = g[j], g[i] }

func New() *School {
	return &School{grades: make(map[int]GradeSlice)}
}

func (s *School) Add(student string, g int) {
	s.grades[g] = append(s.grades[g], student)
}

func (s *School) AppendStudentToGrade(level int, student string) {
	s.grades[level] = append(s.grades[level], student)
}

func (s *School) Grade(level int) []string {
	students := s.grades[level]
	if students == nil {
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
	
	grades := make([]int, 0, len(s.grades))
	for grade := range s.grades {
		grades = append(grades, grade)
	}
	sort.Ints(grades)
	
	result := make([]Grade, 0, len(grades))
	for _, grade := range grades {
		students := make(GradeSlice, len(s.grades[grade]))
		copy(students, s.grades[grade])
		sort.Sort(students)
		result = append(result, Grade{grade: grade, students: students})
	}
	
	return result
}

func (s *School) HasGrade(grade int) bool {
	_, exists := s.grades[grade]
	return exists
}