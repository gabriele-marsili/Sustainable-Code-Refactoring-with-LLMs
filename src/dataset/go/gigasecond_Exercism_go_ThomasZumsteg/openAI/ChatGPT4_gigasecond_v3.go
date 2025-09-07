package gigasecond

import "time"

const (
	TestVersion = 2
	GIGASECOND  = 1e9 * time.Second
)

func AddGigasecond(today time.Time) time.Time {
	return today.Add(GIGASECOND)
}

var Birthday = time.Date(1941, time.December, 7, 0, 0, 0, 0, time.UTC)