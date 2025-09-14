package parsinglogfiles

import (
	"fmt"
	"regexp"
	"strings"
)

var (
	validLineRe       = regexp.MustCompile(`^\[(TRC|DBG|INF|WRN|ERR|FTL)\]`)
	splitLogLineRe    = regexp.MustCompile(`\<[(*=~\-)]*\>`)
	quotedPasswordRe  = regexp.MustCompile(`".*password.*"`)
	endOfLineRe       = regexp.MustCompile(`end-of-line\d+`)
	userNameRe        = regexp.MustCompile(`User\s+([A-Za-z0-9]+)`)
)

func IsValidLine(text string) bool {
	return validLineRe.MatchString(text)
}

func SplitLogLine(text string) []string {
	return splitLogLineRe.Split(text, -1)
}

func CountQuotedPasswords(lines []string) int {
	count := 0
	for _, line := range lines {
		if strings.Contains(line, "password") && strings.Contains(line, `"`) {
			if quotedPasswordRe.MatchString(line) {
				count++
			}
		}
	}
	return count
}

func RemoveEndOfLineText(text string) string {
	if !strings.Contains(text, "end-of-line") {
		return text
	}
	return endOfLineRe.ReplaceAllString(text, "")
}

func TagWithUserName(lines []string) []string {
	for index, line := range lines {
		if strings.Contains(line, "User ") {
			if submatch := userNameRe.FindStringSubmatch(line); submatch != nil {
				lines[index] = fmt.Sprintf("[USR] %s %s", submatch[1], line)
			}
		}
	}
	return lines
}