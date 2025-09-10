package birdwatcher

func TotalBirdCount(birdsPerDay []int) int {
	total := 0
	for _, count := range birdsPerDay {
		total += count
	}
	return total
}

func BirdsInWeek(birdsPerDay []int, week int) int {
	startIndex := (week - 1) * 7
	endIndex := startIndex + 7
	return TotalBirdCount(birdsPerDay[startIndex:endIndex])
}

func FixBirdCountLog(birdsPerDay []int) []int {
	for i := 0; i < len(birdsPerDay); i += 2 {
		birdsPerDay[i]++
	}
	return birdsPerDay
}