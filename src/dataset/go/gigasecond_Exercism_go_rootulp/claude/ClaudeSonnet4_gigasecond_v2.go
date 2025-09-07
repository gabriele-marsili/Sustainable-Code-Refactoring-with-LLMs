package gigasecond

import (
	"time"
)

const gigasecondNanos = 1e18

// AddGigasecond returns the time provided plus one gigasecond.
func AddGigasecond(t time.Time) time.Time {
	return time.Unix(t.Unix()+1e9, t.Nanosecond())
}