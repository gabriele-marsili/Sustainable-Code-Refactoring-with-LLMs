package parsinglogfiles

import (
	"fmt"
	"regexp"
	"strings"
)

var (
	validLineRe       = regexp.MustCompile(`^\[(TRC|DBG|INF|WRN|ERR|FTL)\]`)
	splitLogRe        = regexp.MustCompile(`\<[(*=~\-)]*\>`)
	quotedPasswordRe  = regexp.MustCompile(`".*password.*"`)
	endOfLineRe       = regexp.MustCompile(`end-of-line\d+`)
	userNameRe        = regexp.MustCompile(`User\s+([A-Za-z0-9]+)`)
)

func IsValidLine(text string) bool {
	return validLineRe.MatchString(text)
}

func SplitLogLine(text string) []string {
	return splitLogRe.Split(text, -1)
}

func CountQuotedPasswords(lines []string) int {
	count := 0
	for _, line := range lines {
		if strings.Contains(line, "password") && strings.Contains(line, `"`) {
			matches := quotedPasswordRe.FindAllString(line, -1)
			count += len(matches)
		}
	}
	return count
}

func RemoveEndOfLineText(text string) string {
	return endOfLineRe.ReplaceAllString(text, "")
}

func TagWithUserName(lines []string) []string {
	for index, line := range lines {
		if strings.Contains(line, "User ") {
			if match := userNameRe.FindStringSubmatch(line); match != nil {
				lines[index] = fmt.Sprintf("[USR] %s %s", match[1], line)
			}
		}
	}
	return lines
}