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
	grades := make([]Grade, 0, len(s))
	for grade, students := range s {
		if len(students) > 0 {
			sort.Strings(students)
			grades = append(grades, Grade{class: grade, students: students})
		}
	}

	sort.Slice(grades, func(i, j int) bool {
		return grades[i].class < grades[j].class
	})

	return grades
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