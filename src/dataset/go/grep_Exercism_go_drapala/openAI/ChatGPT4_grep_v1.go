package grep

import (
	"fmt"
	"regexp"
	"strings"
)

// flags:
// -n Also print the line numbers of each matching line.
// -l Print only the names of files that contain at least one matching line.
// -i Match line using a case-insensitive comparison.
// -v Invert the program -- collect all lines that fail to match the pattern.
// -x Only match entire lines, instead of lines that contain a match.
func Search(pattern string, flags, files []string) []string {
	printFileName := len(files) > 1
	fileMap := Files(fileContentData)
	result := []string{}

	isFlagSet := func(flag string) bool {
		for _, f := range flags {
			if f == flag {
				return true
			}
		}
		return false
	}

	if isFlagSet("-i") {
		pattern = strings.ToLower(pattern)
	}

	regex := regexp.MustCompile(pattern)
	for _, file := range files {
		matches := matchPattern(pattern, file, fileMap[file], printFileName, isFlagSet("-n"), isFlagSet("-i"), isFlagSet("-x"), isFlagSet("-v"), regex)
		if isFlagSet("-l") {
			if len(matches) > 0 {
				result = append(result, file)
			}
		} else {
			result = append(result, matches...)
		}
	}
	return result
}

func matchPattern(pattern, fileName string, content []string, printFileName, printLine, insensitive, wholeLine, invert bool, regex *regexp.Regexp) []string {
	result := []string{}
	for i, line := range content {
		originalLine := line
		if insensitive {
			line = strings.ToLower(line)
		}

		matched := (wholeLine && line == pattern) || (!wholeLine && regex.MatchString(line))
		if invert {
			matched = !matched
		}

		if matched {
			if printFileName {
				if printLine {
					result = append(result, fmt.Sprintf("%s:%d:%s", fileName, i+1, originalLine))
				} else {
					result = append(result, fmt.Sprintf("%s:%s", fileName, originalLine))
				}
			} else {
				if printLine {
					result = append(result, fmt.Sprintf("%d:%s", i+1, originalLine))
				} else {
					result = append(result, originalLine)
				}
			}
		}
	}
	return result
}

func Files(fileContentData []string) map[string][]string {
	result := make(map[string][]string)
	var key string
	for _, line := range fileContentData {
		line = strings.TrimSpace(line)
		switch {
		case strings.HasSuffix(line, ".txt"):
			key = line
		case line == "" || strings.Contains(line, "------"):
			continue
		default:
			line = strings.ReplaceAll(line, "|", "")
			line = strings.TrimSpace(line)
			result[key] = append(result[key], line)
		}
	}
	return result
}