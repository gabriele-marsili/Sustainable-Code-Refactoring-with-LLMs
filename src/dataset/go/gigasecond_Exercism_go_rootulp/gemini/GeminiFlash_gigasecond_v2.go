package gigasecond

import (
	"time"
)

const gigasecond = time.Duration(1e9) * time.Second

// AddGigasecond returns the time provided plus one gigasecond.
func AddGigasecond(t time.Time) time.Time {
	return t.Add(gigasecond)
}