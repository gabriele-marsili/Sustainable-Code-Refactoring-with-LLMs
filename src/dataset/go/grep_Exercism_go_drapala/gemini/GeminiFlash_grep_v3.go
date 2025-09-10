package grep

import (
	"fmt"
	"regexp"
	"strings"
	"sync"
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

	if contains(flags, "-l") {
		var mu sync.Mutex
		var wg sync.WaitGroup
		resultsChan := make(chan string, len(files))

		for _, file := range files {
			wg.Add(1)
			go func(file string) {
				defer wg.Done()
				if matchPatternOptimized(pattern, file, fileMap[file], printFileName, contains(flags, "-n"), contains(flags, "-i"), contains(flags, "-x"), contains(flags, "-v")) {
					mu.Lock()
					resultsChan <- file
					mu.Unlock()
				}
			}(file)
		}

		wg.Wait()
		close(resultsChan)

		for file := range resultsChan {
			result = append(result, file)
		}
		return result
	}

	for _, file := range files {
		result = append(result, matchPatternToStringSlice(pattern, file, fileMap[file], printFileName, contains(flags, "-n"), contains(flags, "-i"), contains(flags, "-x"), contains(flags, "-v"))...)
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

func matchPatternOptimized(pattern, fileName string, content []string, printFileName, printLine, insensitive, wholeLine, invert bool) bool {
	var re *regexp.Regexp
	if !wholeLine {
		re = regexp.MustCompile(pattern)
	}

	for i, line := range content {
		processedLine := line
		processedPattern := pattern

		if insensitive {
			processedLine = strings.ToLower(processedLine)
			processedPattern = strings.ToLower(processedPattern)
		}

		match := false
		if wholeLine {
			match = processedPattern == processedLine
		} else {
			match = re.MatchString(processedLine)
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

func matchPatternToStringSlice(pattern, fileName string, content []string, printFileName, printLine, insensitive, wholeLine, invert bool) []string {
	result := []string{}
	var re *regexp.Regexp
	if !wholeLine {
		re = regexp.MustCompile(pattern)
	}

	for i, line := range content {
		processedLine := line
		processedPattern := pattern

		if insensitive {
			processedLine = strings.ToLower(processedLine)
			processedPattern = strings.ToLower(processedPattern)
		}

		match := false
		if wholeLine {
			match = processedPattern == processedLine
		} else {
			match = re.MatchString(processedLine)
		}

		if invert {
			match = !match
		}

		if match {
			formattedLine := line
			if printLine {
				formattedLine = fmt.Sprintf("%d:%s", i+1, line)
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