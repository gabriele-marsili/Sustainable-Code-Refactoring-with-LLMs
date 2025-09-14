package birdwatcher

// TotalBirdCount return the total bird count by summing
// the individual day's counts.
func TotalBirdCount(birdsPerDay []int) (sum int) {
	for i := 0; i < len(birdsPerDay); i++ {
		sum += birdsPerDay[i]
	}
	return sum
}

// BirdsInWeek returns the total bird count by summing
// only the items belonging to the given week.
func BirdsInWeek(birdsPerDay []int, week int) (birdsInWeek int) {
	start := (week - 1) * 7
	end := start + 7
	if end > len(birdsPerDay) {
		end = len(birdsPerDay)
	}
	if start >= len(birdsPerDay) {
		return 0
	}
	
	for i := start; i < end; i++ {
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