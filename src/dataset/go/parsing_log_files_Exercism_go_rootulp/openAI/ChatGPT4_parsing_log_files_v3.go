package parsinglogfiles

import (
	"fmt"
	"regexp"
	"strings"
)

var validPrefixes = map[string]struct{}{
	"[TRC]": {},
	"[DBG]": {},
	"[INF]": {},
	"[WRN]": {},
	"[ERR]": {},
	"[FTL]": {},
}

func IsValidLine(text string) bool {
	if len(text) < 5 {
		return false
	}
	_, exists := validPrefixes[text[:5]]
	return exists
}

func SplitLogLine(text string) []string {
	return regexp.MustCompile(`<[-*~=]*>`).Split(text, -1)
}

func CountQuotedPasswords(lines []string) (count int) {
	regex := regexp.MustCompile(`".*password.*"`)
	for _, line := range lines {
		if regex.MatchString(strings.ToLower(line)) {
			count++
		}
	}
	return count
}

func RemoveEndOfLineText(text string) string {
	return regexp.MustCompile(`end-of-line\d*`).ReplaceAllString(text, "")
}

func TagWithUserName(lines []string) (result []string) {
	regex := regexp.MustCompile(`User\s+(\w+)`)
	for _, line := range lines {
		if match := regex.FindStringSubmatch(line); match != nil {
			line = fmt.Sprintf(`[USR] %s %s`, match[1], line)
		}
		result = append(result, line)
	}
	return result
}