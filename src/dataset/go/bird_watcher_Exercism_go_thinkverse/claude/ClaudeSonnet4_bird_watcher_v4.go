package birdwatcher

// TotalBirdCount return the total bird count by summing
// the individual day's counts.
func TotalBirdCount(birdsPerDay []int) int {
	var sum int

	for _, day := range birdsPerDay {
		sum += day
	}

	return sum
}

// BirdsInWeek returns the total bird count by summing
// only the items belonging to the given week.
func BirdsInWeek(birdsPerDay []int, week int) int {
	start := (week - 1) * 7
	end := week * 7
	
	if start < 0 || start >= len(birdsPerDay) {
		return 0
	}
	if end > len(birdsPerDay) {
		end = len(birdsPerDay)
	}
	
	var sum int
	for i := start; i < end; i++ {
		sum += birdsPerDay[i]
	}
	
	return sum
}

// FixBirdCountLog returns the bird counts after correcting
// the bird counts for alternate days.
func FixBirdCountLog(birdsPerDay []int) []int {
	result := make([]int, len(birdsPerDay))
	
	for i, count := range birdsPerDay {
		if i&1 == 0 {
			result[i] = count + 1
		} else {
			result[i] = count
		}
	}

	return result
}