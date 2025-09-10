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
	lFlag := contains(flags, "-l")

	for _, file := range files {
		matches := matchPattern(pattern, file, fileMap[file], printFileName, contains(flags, "-n"), contains(flags, "-i"), contains(flags, "-x"), contains(flags, "-v"))
		if lFlag {
			if len(matches) > 0 {
				result = append(result, file)
			}
		} else {
			result = append(result, matches...)
		}
	}

	return result
}

func contains(slice []string, s string) bool {
	for _, item := range slice {
		if item == s {
			return true
		}
	}
	return false
}

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

		match := false
		if wholeLine {
			match = pattern == line
		} else {
			match = re.FindStringIndex(line) != nil
		}

		if invert {
			match = !match
		}

		if match {
			formattedLine := originalLine
			if printLine {
				formattedLine = fmt.Sprintf("%d:%s", i+1, originalLine)
			}

			if printFileName {
				formattedLine = fmt.Sprintf("%s:%s", fileName, formattedLine)
			}

			result = append(result, formattedLine)
		}
	}
	return result
}

func Files(fileContentData []string) map[string][]string {
	result := make(map[string][]string)
	var key string
	reTxt := regexp.MustCompile(`.txt`)
	reDivider := regexp.MustCompile(`------`)
	reEmptyLine := regexp.MustCompile(`^\s*$`)

	for _, line := range fileContentData {
		line = strings.TrimSpace(line)

		if reTxt.FindStringIndex(line) != nil {
			key = line
		} else if reDivider.FindStringIndex(line) != nil {
			continue
		} else if reEmptyLine.FindStringIndex(line) != nil {
			continue
		} else {
			line = strings.ReplaceAll(line, "|", "")
			line = strings.TrimSpace(line)
			result[key] = append(result[key], line)
		}
	}
	return result
}