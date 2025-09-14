package birdwatcher

// TotalBirdCount return the total bird count by summing
// the individual day's counts.
func TotalBirdCount(birdsPerDay []int) int {
	total := 0
	for _, count := range birdsPerDay {
		total += count
	}
	return total
}

// BirdsInWeek returns the total bird count by summing
// only the items belonging to the given week.
func BirdsInWeek(birdsPerDay []int, week int) int {
	startindex := (week - 1) * 7
	endindex := startindex + 7
	
	// Bounds check to prevent panic
	if startindex >= len(birdsPerDay) {
		return 0
	}
	if endindex > len(birdsPerDay) {
		endindex = len(birdsPerDay)
	}
	
	// Calculate sum directly without creating slice or function call
	total := 0
	for i := startindex; i < endindex; i++ {
		total += birdsPerDay[i]
	}
	return total
}

// FixBirdCountLog returns the bird counts after correcting
// the bird counts for alternate days.
func FixBirdCountLog(birdsPerDay []int) []int {
	for i := 0; i < len(birdsPerDay); i += 2 {
		birdsPerDay[i]++
	}
	return birdsPerDay
}