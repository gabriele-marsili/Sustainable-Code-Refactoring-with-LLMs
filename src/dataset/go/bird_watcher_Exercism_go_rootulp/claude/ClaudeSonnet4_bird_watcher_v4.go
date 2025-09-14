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
	startDay := (week - 1) * 7
	endDay := startDay + 7
	if endDay > len(birdsPerDay) {
		endDay = len(birdsPerDay)
	}
	if startDay >= len(birdsPerDay) || startDay < 0 {
		return 0
	}
	
	for i := startDay; i < endDay; i++ {
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