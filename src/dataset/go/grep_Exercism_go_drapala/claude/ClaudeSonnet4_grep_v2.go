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
	
	// Create flag map for O(1) lookups
	flagMap := make(map[string]bool, len(flags))
	for _, flag := range flags {
		flagMap[flag] = true
	}
	
	// Generate the map of files
	fileMap := Files(fileContentData)
	
	// Pre-compile regex if needed
	var compiledRegex *regexp.Regexp
	if !flagMap["-x"] {
		compiledRegex = regexp.MustCompile(pattern)
	}
	
	// Prepare pattern for case-insensitive matching
	var lowerPattern string
	if flagMap["-i"] {
		lowerPattern = strings.ToLower(pattern)
	}
	
	// Result slice
	result := []string{}
	
	// -l: Check if matches and return filenames
	if flagMap["-l"] {
		for _, file := range files {
			if hasMatch(lowerPattern, file, fileMap[file], flagMap["-i"], flagMap["-x"], flagMap["-v"], compiledRegex) {
				result = append(result, file)
			}
		}
		return result
	}
	
	// Loop over files we're interested in and append to result
	for _, file := range files {
		matches := matchPattern(lowerPattern, file, fileMap[file], printFileName, flagMap["-n"], flagMap["-i"], flagMap["-x"], flagMap["-v"], compiledRegex)
		result = append(result, matches...)
	}
	return result
}

// Check if file has any matches (optimized for -l flag)
func hasMatch(pattern, fileName string, content []string, insensitive, wholeLine, invert bool, compiledRegex *regexp.Regexp) bool {
	for _, line := range content {
		var addLine bool
		if insensitive {
			line = strings.ToLower(line)
		}
		if wholeLine {
			addLine = pattern == line
		} else {
			addLine = compiledRegex.MatchString(line)
		}
		if invert {
			addLine = !addLine
		}
		if addLine {
			return true
		}
	}
	return false
}

// If the pattern is found in the file, append that line to the result
func matchPattern(pattern, fileName string, content []string, printFileName, printLine, insensitive, wholeLine, invert bool, compiledRegex *regexp.Regexp) []string {
	result := make([]string, 0, len(content)) // Pre-allocate with capacity
	
	for i, line := range content {
		var addLine bool
		originalLine := line
		
		if insensitive {
			line = strings.ToLower(line)
		}
		
		if wholeLine {
			addLine = pattern == line
		} else {
			addLine = compiledRegex.MatchString(line)
		}
		
		if invert {
			addLine = !addLine
		}
		
		if addLine {
			var formattedLine string
			if printFileName {
				if printLine {
					formattedLine = fmt.Sprintf("%s:%d:%s", fileName, i+1, originalLine)
				} else {
					formattedLine = fmt.Sprintf("%s:%s", fileName, originalLine)
				}
			} else {
				if printLine {
					formattedLine = fmt.Sprintf("%d:%s", i+1, originalLine)
				} else {
					formattedLine = originalLine
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
	
	// Pre-compile regexes
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
		} else {
			// Content line
			line = strings.ReplaceAll(line, "|", "")
			line = strings.TrimSpace(line)
			result[key] = append(result[key], line)
		}
	}
	return result
}