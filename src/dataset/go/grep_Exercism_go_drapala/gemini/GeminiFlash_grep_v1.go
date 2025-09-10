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
	printLine := contains(flags, "-n")
	insensitive := contains(flags, "-i")
	wholeLine := contains(flags, "-x")
	listOnly := contains(flags, "-l")

	if insensitive {
		pattern = strings.ToLower(pattern)
	}

	if listOnly {
		for _, file := range files {
			if matchPattern(pattern, file, fileMap[file], printFileName, printLine, insensitive, wholeLine, invert) {
				result = append(result, file)
			}
		}
		return result
	}

	for _, file := range files {
		for _, line := range matchPatternLines(pattern, file, fileMap[file], printFileName, printLine, insensitive, wholeLine, invert) {
			result = append(result, line)
		}
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

// If the pattern is found in the file, return true, otherwise false
func matchPattern(pattern, fileName string, content []string, printFileName, printLine, insensitive, wholeLine, invert bool) bool {
	for i, line := range content {
		processedLine := line
		if insensitive {
			processedLine = strings.ToLower(processedLine)
		}

		match := false
		if wholeLine {
			match = pattern == processedLine
		} else {
			match = strings.Contains(processedLine, pattern)
		}

		if invert {
			match = !match
		}

		if match {
			return true
		}
	}
	return false
}

// If the pattern is found in the file, append that line to the result
func matchPatternLines(pattern, fileName string, content []string, printFileName, printLine, insensitive, wholeLine, invert bool) []string {
	result := []string{}
	for i, line := range content {
		processedLine := line
		if insensitive {
			processedLine = strings.ToLower(processedLine)
		}

		match := false
		if wholeLine {
			match = pattern == processedLine
		} else {
			match = strings.Contains(processedLine, pattern)
		}

		if invert {
			match = !match
		}

		if match {
			formattedLine := line
			if printFileName {
				if printLine {
					formattedLine = fmt.Sprintf("%s:%d:%s", fileName, i+1, line)
				} else {
					formattedLine = fmt.Sprintf("%s:%s", fileName, line)
				}
			} else {
				if printLine {
					formattedLine = fmt.Sprintf("%d:%s", i+1, line)
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
	reTxt := regexp.MustCompile(`.txt`)
	reDivider := regexp.MustCompile(`------`)
	reEmptyLine := regexp.MustCompile(`^\s*$`)

	for _, line := range fileContentData {
		line = strings.TrimSpace(line)

		if reTxt.MatchString(line) {
			key = line
		} else if reDivider.MatchString(line) || reEmptyLine.MatchString(line) {
			continue
		} else {
			line = strings.ReplaceAll(line, "|", "")
			line = strings.TrimSpace(line)
			result[key] = append(result[key], line)
		}
	}
	return result
}