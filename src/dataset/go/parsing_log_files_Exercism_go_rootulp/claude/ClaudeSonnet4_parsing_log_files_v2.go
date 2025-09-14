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

var (
	splitRegex    = regexp.MustCompile(`<[-*~=]*>`)
	passwordRegex = regexp.MustCompile(`".*password.*"`)
	eolRegex      = regexp.MustCompile(`end-of-line\d*`)
	userRegex     = regexp.MustCompile(`User\s+(\w*)`)
)

func IsValidLine(text string) bool {
	if len(text) < 5 {
		return false
	}
	prefix := text[:5]
	for _, validPrefix := range validPrefixes {
		if prefix == validPrefix {
			return true
		}
	}
	return false
}

func SplitLogLine(text string) []string {
	tabSeparated := splitRegex.ReplaceAllString(text, "\t")
	return strings.Split(tabSeparated, "\t")
}

func CountQuotedPasswords(lines []string) (count int) {
	for _, line := range lines {
		if strings.Contains(line, "password") || strings.Contains(line, "PASSWORD") || strings.Contains(line, "Password") {
			lowercase := strings.ToLower(line)
			if passwordRegex.MatchString(lowercase) {
				count++
			}
		}
	}
	return count
}

func RemoveEndOfLineText(text string) string {
	return eolRegex.ReplaceAllString(text, "")
}

func TagWithUserName(lines []string) []string {
	result := make([]string, 0, len(lines))
	
	for _, line := range lines {
		if strings.Contains(line, "User") && userRegex.MatchString(line) {
			match := userRegex.FindStringSubmatch(line)
			user := match[1]
			line = fmt.Sprintf("[USR] %s %s", user, line)
		}
		result = append(result, line)
	}
	return result
}