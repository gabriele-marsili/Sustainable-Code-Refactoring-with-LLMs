package gigasecond

import "time"

// GIGASECOND is a large number of seconds
const GIGASECOND = 1e9 * time.Second

// AddGigasecond adds one gigasecond (1E9 seconds) to the date.
func AddGigasecond(today time.Time) time.Time {
	return today.Add(GIGASECOND)
}

// Birthday is my birthday and is used to compute a giga-versery.
var Birthday = time.Date(1941, time.December, 7, 0, 0, 0, 0, time.UTC)