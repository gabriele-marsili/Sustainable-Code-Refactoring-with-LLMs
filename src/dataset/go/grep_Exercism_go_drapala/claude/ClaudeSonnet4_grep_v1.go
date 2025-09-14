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
	// Flag related
	printFileName := len(files) > 1
	
	// Parse flags once
	flagL := contains(flags, "-l")
	flagN := contains(flags, "-n")
	flagI := contains(flags, "-i")
	flagX := contains(flags, "-x")
	flagV := contains(flags, "-v")
	
	// Generate the map of files
	fileMap := Files(fileContentData)
	
	// Pre-allocate result slice with estimated capacity
	result := make([]string, 0, len(files)*10)
	
	// -l: Check if matches and return filenames
	if flagL {
		for _, file := range files {
			matches := matchPattern(pattern, file, fileMap[file], printFileName, flagN, flagI, flagX, flagV)
			if len(matches) > 0 {
				result = append(result, file)
			}
		}
		return result
	}
	
	// Loop over files we're interested in and append to result
	for _, file := range files {
		matches := matchPattern(pattern, file, fileMap[file], printFileName, flagN, flagI, flagX, flagV)
		result = append(result, matches...)
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
	if len(content) == 0 {
		return nil
	}
	
	result := make([]string, 0, len(content)/4) // Estimate 25% match rate
	
	// Pre-process pattern for case insensitive matching
	searchPattern := pattern
	if insensitive {
		searchPattern = strings.ToLower(pattern)
	}
	
	// Compile regex once if needed
	var regexPattern *regexp.Regexp
	if !wholeLine {
		regexPattern = regexp.MustCompile(searchPattern)
	}
	
	for i, line := range content {
		searchLine := line
		if insensitive {
			searchLine = strings.ToLower(line)
		}
		
		var addLine bool
		if wholeLine {
			addLine = searchPattern == searchLine
		} else {
			addLine = regexPattern.MatchString(searchLine)
		}
		
		if invert {
			addLine = !addLine
		}
		
		if addLine {
			var lineResult string
			if printFileName {
				if printLine {
					lineResult = fmt.Sprintf("%s:%d:%s", fileName, i+1, line)
				} else {
					lineResult = fmt.Sprintf("%s:%s", fileName, line)
				}
			} else {
				if printLine {
					lineResult = fmt.Sprintf("%d:%s", i+1, line)
				} else {
					lineResult = line
				}
			}
			result = append(result, lineResult)
		}
	}
	return result
}

// Returns a key of slices containing the file contents, where:
// 1. The leading and trailing whitespaces removed
// 2. Beautifying characters removed
func Files(fileContentData []string) map[string][]string {
	result := make(map[string][]string, 10) // Pre-allocate with estimated capacity
	var key string
	
	// Compile regexes once
	txtRegex := regexp.MustCompile(`.txt`)
	dividerRegex := regexp.MustCompile(`------`)
	emptyRegex := regexp.MustCompile(`^\s*$`)
	
	for _, line := range fileContentData {
		line = strings.TrimSpace(line)
		
		if txtRegex.MatchString(line) {
			key = line
		} else if dividerRegex.MatchString(line) || emptyRegex.MatchString(line) {
			// Skip dividers and empty lines
			continue
		} else if key != "" {
			// Replace "|" with empty string and trim
			line = strings.ReplaceAll(line, "|", "")
			line = strings.TrimSpace(line)
			result[key] = append(result[key], line)
		}
	}
	return result
}