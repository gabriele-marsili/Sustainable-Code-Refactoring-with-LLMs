package parsinglogfiles

import (
	"fmt"
	"regexp"
	"strings"
)

var validPrefixes = []string{
	"[TRC]",
	"[DBG]",
	"[INF]",
	"[WRN]",
	"[ERR]",
	"[FTL]",
}

func IsValidLine(text string) bool {
	for _, prefix := range validPrefixes {
		if strings.HasPrefix(text, prefix) {
			return true
		}
	}
	return false
}

var splitRegex = regexp.MustCompile(`<[-*~=]*>`)

func SplitLogLine(text string) []string {
	tabSeparated := splitRegex.ReplaceAllString(text, "\t")
	return strings.Split(tabSeparated, "\t")
}

func CountQuotedPasswords(lines []string) (count int) {
	passwordRegex := regexp.MustCompile(`".*password.*"`)
	for _, line := range lines {
		if passwordRegex.MatchString(strings.ToLower(line)) {
			count++
		}
	}
	return count
}

var endOfLineRegex = regexp.MustCompile(`end-of-line\d*`)

func RemoveEndOfLineText(text string) string {
	return endOfLineRegex.ReplaceAllString(text, "")
}

func TagWithUserName(lines []string) (result []string) {
	userRegex := regexp.MustCompile(`User\s+(\w*)`)

	for _, line := range lines {
		match := userRegex.FindStringSubmatch(line)
		if len(match) > 1 {
			user := match[1]
			prefix := fmt.Sprintf(`[USR] %s`, user)
			line = prefix + " " + line
		}
		result = append(result, line)
	}
	return result
}