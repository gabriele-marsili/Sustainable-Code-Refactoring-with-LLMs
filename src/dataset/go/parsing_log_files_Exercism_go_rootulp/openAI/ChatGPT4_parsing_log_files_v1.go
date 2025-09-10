package parsinglogfiles

import (
	"fmt"
	"regexp"
	"strings"
)

var (
	validPrefixes = map[string]struct{}{
		"[TRC]": {},
		"[DBG]": {},
		"[INF]": {},
		"[WRN]": {},
		"[ERR]": {},
		"[FTL]": {},
	}
	logLineRegex          = regexp.MustCompile(`<[-*~=]*>`)
	quotedPasswordRegex   = regexp.MustCompile(`(?i)".*password.*"`)
	endOfLineRegex        = regexp.MustCompile(`end-of-line\d*`)
	userNameRegex         = regexp.MustCompile(`User\s+(\w*)`)
)

func IsValidLine(text string) bool {
	_, exists := validPrefixes[text[:5]]
	return exists
}

func SplitLogLine(text string) []string {
	return strings.Split(logLineRegex.ReplaceAllString(text, "\t"), "\t")
}

func CountQuotedPasswords(lines []string) (count int) {
	for _, line := range lines {
		if quotedPasswordRegex.MatchString(line) {
			count++
		}
	}
	return count
}

func RemoveEndOfLineText(text string) string {
	return endOfLineRegex.ReplaceAllString(text, "")
}

func TagWithUserName(lines []string) (result []string) {
	for _, line := range lines {
		if match := userNameRegex.FindStringSubmatch(line); match != nil {
			line = fmt.Sprintf(`[USR] %s %s`, match[1], line)
		}
		result = append(result, line)
	}
	return result
}