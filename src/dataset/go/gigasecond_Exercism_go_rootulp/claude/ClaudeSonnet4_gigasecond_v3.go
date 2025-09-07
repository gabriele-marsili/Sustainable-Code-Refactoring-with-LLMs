package gigasecond

import (
	"time"
)

const gigasecond = 1000000000

// AddGigasecond returns the time provided plus one gigasecond.
func AddGigasecond(t time.Time) time.Time {
	return t.Add(gigasecond * time.Second)
}