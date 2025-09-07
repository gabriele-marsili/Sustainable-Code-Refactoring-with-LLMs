package school

import "sort"

// Grade lists students in a class
type Grade struct {
	class    int
	students []string
}

// School is a grade school of students
type School map[int][]string

/*New constructs a new School.*/
func New() *School {
	s := make(School)
	return &s
}

/*Add puts a student in a grade.*/
func (s School) Add(student string, grade int) {
	s[grade] = append(s[grade], student)
}

/*Enrollment gets the class of students from all grades*/
func (s School) Enrollment() []Grade {
	enrollment := make([]Grade, 0, len(s))
	grades := make([]int, 0, len(s))

	for grade := range s {
		grades = append(grades, grade)
	}

	sort.Ints(grades)

	for _, grade := range grades {
		students := s[grade]
		sort.Strings(students)
		enrollment = append(enrollment, Grade{grade, students})
	}

	return enrollment
}

/*Grade gets the students in class.*/
func (s School) Grade(grade int) []string {
	class, ok := s[grade]
	if !ok {
		return []string{}
	}

	result := make([]string, len(class))
	copy(result, class)
	return result
}