package parsinglogfiles

import (
	"fmt"
	"regexp"
	"strings"
)

var (
	validLineRegex          = regexp.MustCompile(`^\[(TRC|DBG|INF|WRN|ERR|FTL)\]`)
	splitLogLineRegex       = regexp.MustCompile(`\<[(*=~\-)]*\>`)
	quotedPasswordsRegex    = regexp.MustCompile(`"(.*password.*)"`)
	removeEndOfLineTextRegex = regexp.MustCompile(`end-of-line\d+`)
	tagWithUserNameRegex    = regexp.MustCompile(`(?:User\s+([A-z0-9]+))`)
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
		if strings.Contains(line, "password") {
			matches := quotedPasswordsRegex.FindStringSubmatch(line)
			count += len(matches)
		}
	}
	return count
}

func RemoveEndOfLineText(text string) string {
	return removeEndOfLineTextRegex.ReplaceAllString(text, "")
}

func TagWithUserName(lines []string) []string {
	for index, line := range lines {
		match := tagWithUserNameRegex.FindStringSubmatch(line)
		if len(match) > 0 {
			lines[index] = fmt.Sprintf("[USR] %s %s", match[1], line)
		}
	}
	return lines
}