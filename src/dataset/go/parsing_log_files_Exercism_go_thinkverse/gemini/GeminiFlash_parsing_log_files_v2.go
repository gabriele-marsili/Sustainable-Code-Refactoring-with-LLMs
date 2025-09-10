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
	endOfLineTextRegex      = regexp.MustCompile(`end-of-line\d+`)
	userExtractionRegex     = regexp.MustCompile(`(?:User\s+([A-z0-9]+))`)
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
		if strings.Contains(line, "password") { // Quick check before regex
			if quotedPasswordsRegex.MatchString(line) {
				count++ // Increment only if a match is found
			}
		}
	}
	return count
}

func RemoveEndOfLineText(text string) string {
	return endOfLineTextRegex.ReplaceAllString(text, "")
}

func TagWithUserName(lines []string) []string {
	for i, line := range lines {
		match := userExtractionRegex.FindStringSubmatch(line)
		if len(match) > 1 {
			lines[i] = fmt.Sprintf("[USR] %s %s", match[1], line)
		}
	}
	return lines
}