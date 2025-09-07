package gigasecond

import (
	"time"
)

const gigasecond int64 = 1e9

// AddGigasecond returns the time provided plus one gigasecond.
func AddGigasecond(t time.Time) time.Time {
	return t.Add(time.Second * time.Duration(gigasecond))
}