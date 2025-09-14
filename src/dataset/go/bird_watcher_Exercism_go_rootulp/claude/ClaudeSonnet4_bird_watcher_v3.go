package birdwatcher

// TotalBirdCount return the total bird count by summing
// the individual day's counts.
func TotalBirdCount(birdsPerDay []int) (sum int) {
	for _, birds := range birdsPerDay {
		sum += birds
	}
	return sum
}

// BirdsInWeek returns the total bird count by summing
// only the items belonging to the given week.
func BirdsInWeek(birdsPerDay []int, week int) (birdsInWeek int) {
	startIdx := (week - 1) * 7
	endIdx := startIdx + 7
	
	if startIdx >= len(birdsPerDay) {
		return 0
	}
	
	if endIdx > len(birdsPerDay) {
		endIdx = len(birdsPerDay)
	}
	
	for i := startIdx; i < endIdx; i++ {
		birdsInWeek += birdsPerDay[i]
	}
	return birdsInWeek
}

// FixBirdCountLog returns the bird counts after correcting
// the bird counts for alternate days.
func FixBirdCountLog(birdsPerDay []int) []int {
	for day := 0; day < len(birdsPerDay); day += 2 {
		birdsPerDay[day]++
	}
	return birdsPerDay
}