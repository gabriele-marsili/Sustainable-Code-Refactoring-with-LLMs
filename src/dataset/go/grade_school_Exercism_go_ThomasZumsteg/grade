package school

import "sort"

// Grade lists students in a class
type Grade struct {
	class    int
	students []string
}

// School is a grade school of students
type School map[int][]string

/* New constructs a new School. */
func New() *School {
	return &School{}
}

/* Add puts a student in a grade. */
func (s School) Add(student string, grade int) {
	s[grade] = append(s[grade], student)
}

/* Enrollment gets the class of students from all grades */
func (s School) Enrollment() []Grade {
	enrollment := make([]Grade, 0, len(s))
	for grade, students := range s {
		sort.Strings(students)
		enrollment = append(enrollment, Grade{grade, students})
	}
	sort.Slice(enrollment, func(i, j int) bool {
		return enrollment[i].class < enrollment[j].class
	})
	return enrollment
}

/* Grade gets the students in class. */
func (s School) Grade(grade int) []string {
	return append([]string{}, s[grade]...)
}