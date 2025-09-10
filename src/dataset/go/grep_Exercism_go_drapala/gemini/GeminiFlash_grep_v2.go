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
	invert := contains(flags, "-v")
	onlyFiles := contains(flags, "-l")
	printLine := contains(flags, "-n")
	insensitive := contains(flags, "-i")
	wholeLine := contains(flags, "-x")

	if onlyFiles {
		seen := make(map[string]bool)
		for _, file := range files {
			matches := matchPattern(pattern, file, fileMap[file], printFileName, printLine, insensitive, wholeLine, invert)
			if len(matches) > 0 && !seen[file] {
				result = append(result, file)
				seen[file] = true
			}
		}
		return result
	}

	for _, file := range files {
		result = append(result, matchPattern(pattern, file, fileMap[file], printFileName, printLine, insensitive, wholeLine, invert)...)
	}
	return result
}

// Check if a string is in a slice
func contains(slice []string, s string) bool {
	for _, item := range slice {
		if item == s {
			return true
		}
	}
	return false
}

// If the pattern is found in the file, append that line to the result
func matchPattern(pattern, fileName string, content []string, printFileName, printLine, insensitive, wholeLine, invert bool) []string {
	result := []string{}
	var re *regexp.Regexp
	if !wholeLine {
		re = regexp.MustCompile(pattern)
	}

	for i, line := range content {
		originalLine := line
		if insensitive {
			line = strings.ToLower(line)
			pattern = strings.ToLower(pattern)
		}

		addLine := false
		if wholeLine {
			addLine = pattern == line
		} else {
			addLine = re.FindStringIndex(line) != nil
		}

		if invert {
			addLine = !addLine
		}

		if addLine {
			formattedLine := originalLine
			if printFileName {
				if printLine {
					formattedLine = fmt.Sprintf("%s:%d:%s", fileName, i+1, originalLine)
				} else {
					formattedLine = fmt.Sprintf("%s:%s", fileName, originalLine)
				}
			} else {
				if printLine {
					formattedLine = fmt.Sprintf("%d:%s", i+1, originalLine)
				}
			}
			result = append(result, formattedLine)
		}
	}
	return result
}

// Returns a key of slices containing the file contents, where:
// 1. The leading and trailing whitespaces removed
// 2. Beautifying characters removed
func Files(fileContentData []string) map[string][]string {
	result := make(map[string][]string)
	var key string
	for _, line := range fileContentData {
		line = strings.TrimSpace(line)

		if strings.HasSuffix(line, ".txt") {
			key = line
		} else if strings.Contains(line, "------") {
			continue
		} else if len(strings.TrimSpace(line)) == 0 {
			continue
		} else {
			line = strings.ReplaceAll(line, "|", "")
			line = strings.TrimSpace(line)
			result[key] = append(result[key], line)
		}
	}
	return result
}