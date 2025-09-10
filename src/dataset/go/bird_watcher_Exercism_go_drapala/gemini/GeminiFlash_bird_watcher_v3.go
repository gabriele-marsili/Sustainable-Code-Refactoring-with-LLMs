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

	if startindex >= len(birdsPerDay) {
		return 0
	}

	if endindex > len(birdsPerDay) {
		endindex = len(birdsPerDay)
	}

	weekList := birdsPerDay[startindex:endindex]
	return TotalBirdCount(weekList)
}

// FixBirdCountLog returns the bird counts after correcting
// the bird counts for alternate days.
func FixBirdCountLog(birdsPerDay []int) []int {
	for i := 0; i < len(birdsPerDay); i += 2 {
		birdsPerDay[i]++
	}
	return birdsPerDay
}