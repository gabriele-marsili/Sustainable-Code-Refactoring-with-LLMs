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
	userNameRegex         = regexp.MustCompile(`User\s+(\w+)`)
)

func IsValidLine(text string) bool {
	// Check for valid prefixes using a map for O(1) lookup
	for prefix := range validPrefixes {
		if strings.HasPrefix(text, prefix) {
			return true
		}
	}
	return false
}

func SplitLogLine(text string) []string {
	// Use precompiled regex for efficiency
	tabSeparated := logLineRegex.ReplaceAllString(text, "\t")
	return strings.Split(tabSeparated, "\t")
}

func CountQuotedPasswords(lines []string) (count int) {
	// Use precompiled regex and avoid unnecessary allocations
	for _, line := range lines {
		if quotedPasswordRegex.MatchString(line) {
			count++
		}
	}
	return count
}

func RemoveEndOfLineText(text string) string {
	// Use precompiled regex for efficiency
	return endOfLineRegex.ReplaceAllString(text, "")
}

func TagWithUserName(lines []string) (result []string) {
	// Use precompiled regex and optimize string concatenation
	for _, line := range lines {
		if match := userNameRegex.FindStringSubmatch(line); match != nil {
			user := match[1]
			result = append(result, fmt.Sprintf(`[USR] %s %s`, user, line))
		} else {
			result = append(result, line)
		}
	}
	return result
}