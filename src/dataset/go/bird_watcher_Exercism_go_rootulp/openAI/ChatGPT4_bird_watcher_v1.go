package birdwatcher

// TotalBirdCount returns the total bird count by summing
// the individual day's counts.
func TotalBirdCount(birdsPerDay []int) int {
	sum := 0
	for _, birds := range birdsPerDay {
		sum += birds
	}
	return sum
}

// BirdsInWeek returns the total bird count by summing
// only the items belonging to the given week.
func BirdsInWeek(birdsPerDay []int, week int) int {
	start := (week - 1) * 7
	end := start + 7
	if end > len(birdsPerDay) {
		end = len(birdsPerDay)
	}
	sum := 0
	for _, birds := range birdsPerDay[start:end] {
		sum += birds
	}
	return sum
}

// FixBirdCountLog returns the bird counts after correcting
// the bird counts for alternate days.
func FixBirdCountLog(birdsPerDay []int) []int {
	for day := 0; day < len(birdsPerDay); day += 2 {
		birdsPerDay[day]++
	}
	return birdsPerDay
}