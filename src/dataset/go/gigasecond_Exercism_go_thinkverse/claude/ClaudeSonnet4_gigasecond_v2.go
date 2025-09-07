package gigasecond

import "time"

const gigasecond = time.Second * 1e9

// AddGigasecond returns the time t+gigasecond.
func AddGigasecond(t time.Time) time.Time {
	return t.Add(gigasecond)
}