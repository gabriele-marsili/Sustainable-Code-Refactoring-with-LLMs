package school

import "sort"

type Grade struct {
	class    int
	students []string
}

type School map[int][]string

func New() *School {
	s := make(School)
	return &s
}

func (s School) Add(student string, grade int) {
	s[grade] = append(s[grade], student)
}

func (s School) Enrollment() []Grade {
	if len(s) == 0 {
		return []Grade{}
	}
	
	enrollment := make([]Grade, 0, len(s))
	grades := make([]int, 0, len(s))
	
	for grade := range s {
		grades = append(grades, grade)
	}
	sort.Ints(grades)
	
	for _, grade := range grades {
		students := make([]string, len(s[grade]))
		copy(students, s[grade])
		sort.Strings(students)
		enrollment = append(enrollment, Grade{grade, students})
	}
	
	return enrollment
}

func (s School) Grade(grade int) []string {
	students := s[grade]
	if students == nil {
		return []string{}
	}
	result := make([]string, len(students))
	copy(result, students)
	return result
}

type byLevel []Grade

func (grades byLevel) Len() int           { return len(grades) }
func (grades byLevel) Swap(i, j int)      { grades[i], grades[j] = grades[j], grades[i] }
func (grades byLevel) Less(i, j int) bool { return grades[i].class < grades[j].class }