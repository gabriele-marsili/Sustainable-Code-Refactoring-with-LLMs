package parsinglogfiles

import (
	"fmt"
	"regexp"
)

var (
	validLineRegex       = regexp.MustCompile(`^\[(TRC|DBG|INF|WRN|ERR|FTL)\]`)
	splitLogLineRegex    = regexp.MustCompile(`\<[(*=~\-)]*\>`)
	quotedPasswordRegex  = regexp.MustCompile(`"(?i:.*password.*)"`)
	endOfLineTextRegex   = regexp.MustCompile(`end-of-line\d+`)
	tagWithUserNameRegex = regexp.MustCompile(`User\s+([A-Za-z0-9]+)`)
)

func IsValidLine(text string) bool {
	return validLineRegex.MatchString(text)
}

func SplitLogLine(text string) []string {
	return splitLogLineRegex.Split(text, -1)
}

func CountQuotedPasswords(lines []string) int {
	count := 0
	for _, line := range lines {
		if quotedPasswordRegex.MatchString(line) {
			count++
		}
	}
	return count
}

func RemoveEndOfLineText(text string) string {
	return endOfLineTextRegex.ReplaceAllString(text, "")
}

func TagWithUserName(lines []string) []string {
	for index, line := range lines {
		if matches := tagWithUserNameRegex.FindStringSubmatch(line); matches != nil {
			lines[index] = fmt.Sprintf("[USR] %s %s", matches[1], line)
		}
	}
	return lines
}