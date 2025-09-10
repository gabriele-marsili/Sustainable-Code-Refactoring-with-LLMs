package expenses

import "errors"

// Record represents an expense record.
type Record struct {
	Day      int
	Amount   float64
	Category string
}

// DaysPeriod represents a period of days for expenses.
type DaysPeriod struct {
	From int
	To   int
}

// Filter returns the records for which the predicate function returns true.
func Filter(in []Record, predicate func(Record) bool) []Record {
	filtered := make([]Record, 0, len(in)) // Preallocate memory
	for _, record := range in {
		if predicate(record) {
			filtered = append(filtered, record)
		}
	}
	return filtered
}

// ByDaysPeriod returns predicate function that returns true when
// the day of the record is inside the period of day and false otherwise
func ByDaysPeriod(p DaysPeriod) func(Record) bool {
	from, to := p.From, p.To // Avoid repeated struct field access
	return func(r Record) bool {
		return r.Day >= from && r.Day <= to
	}
}

// ByCategory returns predicate function that returns true when
// the category of the record is the same as the provided category
// and false otherwise
func ByCategory(c string) func(Record) bool {
	return func(r Record) bool {
		return r.Category == c
	}
}

// TotalByPeriod returns total amount of expenses for records
// inside the period p
func TotalByPeriod(in []Record, p DaysPeriod) float64 {
	from, to := p.From, p.To // Avoid repeated struct field access
	var total float64
	for _, record := range in {
		if record.Day >= from && record.Day <= to {
			total += record.Amount
		}
	}
	return total
}

// CategoryExpenses returns total amount of expenses for records
// in category c that are also inside the period p.
// An error must be returned only if there are no records in the list that belong
// to the given category, regardless of period of time.
func CategoryExpenses(in []Record, p DaysPeriod, c string) (float64, error) {
	var total float64
	foundCategory := false
	from, to := p.From, p.To // Avoid repeated struct field access

	for _, record := range in {
		if record.Category == c {
			foundCategory = true
			if record.Day >= from && record.Day <= to {
				total += record.Amount
			}
		}
	}

	if !foundCategory {
		return 0, errors.New("unknown category")
	}
	return total, nil
}