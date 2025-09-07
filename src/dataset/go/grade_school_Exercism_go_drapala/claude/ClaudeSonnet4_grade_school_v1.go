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

// ###################################################
// For implementing Sort - we need interfaces
// See Page 187 in book PDF
// School
func (s School) Len() int { return len(s.grades) }
func (s School) Less(i, j int) bool { 
	return s.grades[i].grade < s.grades[j].grade 
}
func (s School) Swap(i, j int) { s.grades[i], s.grades[j] = s.grades[j], s.grades[i]}
// Grade
type GradeSlice []string
func (g GradeSlice) Len() int {return len(g)}
func (g GradeSlice) Less(i, j int) bool { 
	return g[i] < g[j] // Use full string comparison instead of just first character
}
func (g GradeSlice) Swap(i, j int) { g[i], g[j] = g[j], g[i]}
// ###################################################

// Create and return a new, empty school
func New() *School {
	return &School{grades: make(map[int]GradeSlice)}
}

// Add student to a Grade - whether or not the Grade exists is handled
func (s *School) Add(student string, g int) {
	s.grades[g] = append(s.grades[g], student)
}

// For an existing Grade in the school, append student to it
func (s *School) AppendStudentToGrade(level int, student string) {
	s.grades[level] = append(s.grades[level], student)
}

// Return the students in a Grade
func (s *School) Grade(level int) []string {
	if students, exists := s.grades[level]; exists {
		return students
	}
	return []string{}
}

// Return grade enrollments, sorted in place
func (s *School) Enrollment() []Grade {
	if len(s.grades) == 0 {
		return []Grade{}
	}
	
	// Convert map to slice for sorting
	grades := make([]Grade, 0, len(s.grades))
	for level, students := range s.grades {
		sort.Sort(students)
		grades = append(grades, Grade{grade: level, students: students})
	}
	
	// Sort grades by level
	sort.Slice(grades, func(i, j int) bool {
		return grades[i].grade < grades[j].grade
	})
	
	return grades
}

// Whether or not school has students in a Grade enrolled
func (s *School) HasGrade(grade int) bool {
	_, exists := s.grades[grade]
	return exists
}