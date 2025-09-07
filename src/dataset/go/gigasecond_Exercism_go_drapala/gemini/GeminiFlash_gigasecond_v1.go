package gigasecond

import (
	"time"
)

const gigasecond = time.Second * 1e9

func AddGigasecond(t time.Time) time.Time {
	return t.Add(gigasecond)
}