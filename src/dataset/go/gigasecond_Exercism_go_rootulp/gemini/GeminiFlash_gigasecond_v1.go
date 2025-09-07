package gigasecond

import (
	"time"
)

const gigasecond = 1_000_000_000

// AddGigasecond returns the time provided plus one gigasecond.
func AddGigasecond(t time.Time) time.Time {
	return t.Add(time.Second * gigasecond)
}