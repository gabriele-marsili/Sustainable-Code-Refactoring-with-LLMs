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
	tabSeperated := splitRegex.ReplaceAllString(text, "\t")
	return strings.Split(tabSeperated, "\t")
}

var passwordRegex = regexp.MustCompile(`".*password.*"`)

func CountQuotedPasswords(lines []string) (count int) {
	for _, line := range lines {
		lowercase := strings.ToLower(line)
		if passwordRegex.MatchString(lowercase) {
			count++
		}
	}
	return count
}

var endOfLineRegex = regexp.MustCompile(`end-of-line\d*`)

func RemoveEndOfLineText(text string) string {
	return endOfLineRegex.ReplaceAllString(text, "")
}

var userRegex = regexp.MustCompile(`User\s+(\w*)`)

func TagWithUserName(lines []string) (result []string) {
	result = make([]string, len(lines))
	for i, line := range lines {
		match := userRegex.FindStringSubmatch(line)
		if len(match) > 1 {
			user := match[1]
			prefix := fmt.Sprintf(`[USR] %s`, user)
			result[i] = prefix + " " + line
		} else {
			result[i] = line
		}
	}
	return result
}