package birdwatcher

func TotalBirdCount(birdsPerDay []int) int {
	sum := 0
	for i := 0; i < len(birdsPerDay); i++ {
		sum += birdsPerDay[i]
	}
	return sum
}

func BirdsInWeek(birdsPerDay []int, week int) int {
	start := (week - 1) * 7
	end := start + 7
	sum := 0
	for i := start; i < end && i < len(birdsPerDay); i++ {
		sum += birdsPerDay[i]
	}
	return sum
}

func FixBirdCountLog(birdsPerDay []int) []int {
	for i := 0; i < len(birdsPerDay); i += 2 {
		birdsPerDay[i]++
	}
	return birdsPerDay
}