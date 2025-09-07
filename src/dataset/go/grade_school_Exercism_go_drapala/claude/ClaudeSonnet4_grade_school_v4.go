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
	if len(s.grades) == 0 {
		return []Grade{}
	}
	
	gradeNums := make([]int, 0, len(s.grades))
	for gradeNum := range s.grades {
		gradeNums = append(gradeNums, gradeNum)
	}
	sort.Ints(gradeNums)
	
	result := make([]Grade, 0, len(s.grades))
	for _, gradeNum := range gradeNums {
		grade := s.grades[gradeNum]
		sortedStudents := make([]string, len(grade.students))
		copy(sortedStudents, grade.students)
		sort.Strings(sortedStudents)
		result = append(result, Grade{grade: gradeNum, students: sortedStudents})
	}
	
	return result
}

func (s *School) HasGrade(grade int) bool {
	_, exists := s.grades[grade]
	return exists
}