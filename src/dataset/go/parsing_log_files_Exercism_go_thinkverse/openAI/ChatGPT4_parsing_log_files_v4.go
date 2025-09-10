package parsinglogfiles

import (
	"fmt"
	"regexp"
	"sync"
)

var (
	isValidLineRegex       = regexp.MustCompile(`^\[(TRC|DBG|INF|WRN|ERR|FTL)\]`)
	splitLogLineRegex      = regexp.MustCompile(`\<[(*=~\-)]*\>`)
	countQuotedPasswordsRe = regexp.MustCompile(`"(.*password.*)"`)
	removeEndOfLineRegex   = regexp.MustCompile(`end-of-line\d+`)
	tagWithUserNameRegex   = regexp.MustCompile(`(?:User\s+([A-z0-9]+))`)
)

func IsValidLine(text string) bool {
	return isValidLineRegex.MatchString(text)
}

func SplitLogLine(text string) []string {
	return splitLogLineRegex.Split(text, -1)
}

func CountQuotedPasswords(lines []string) int {
	count := 0
	for _, line := range lines {
		if countQuotedPasswordsRe.MatchString(line) {
			count++
		}
	}
	return count
}

func RemoveEndOfLineText(text string) string {
	return removeEndOfLineRegex.ReplaceAllString(text, "")
}

func TagWithUserName(lines []string) []string {
	var wg sync.WaitGroup
	mu := sync.Mutex{}
	results := make([]string, len(lines))

	wg.Add(len(lines))
	for i, line := range lines {
		go func(index int, line string) {
			defer wg.Done()
			if tagWithUserNameRegex.MatchString(line) {
				submatch := tagWithUserNameRegex.FindStringSubmatch(line)
				mu.Lock()
				results[index] = fmt.Sprintf("[USR] %s %s", submatch[1], line)
				mu.Unlock()
			} else {
				mu.Lock()
				results[index] = line
				mu.Unlock()
			}
		}(i, line)
	}
	wg.Wait()
	return results
}