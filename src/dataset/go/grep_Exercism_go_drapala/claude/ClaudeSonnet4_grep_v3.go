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
	
	flagSet := make(map[string]bool, len(flags))
	for _, flag := range flags {
		flagSet[flag] = true
	}
	
	if flagSet["-l"] {
		result := make([]string, 0, len(files))
		for _, file := range files {
			if hasMatch(pattern, fileMap[file], flagSet) {
				result = append(result, file)
			}
		}
		return result
	}
	
	var result []string
	for _, file := range files {
		matches := matchPattern(pattern, file, fileMap[file], printFileName, flagSet)
		result = append(result, matches...)
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

func hasMatch(pattern string, content []string, flagSet map[string]bool) bool {
	var compiledRegex *regexp.Regexp
	var err error
	
	if !flagSet["-x"] {
		if flagSet["-i"] {
			compiledRegex, err = regexp.Compile("(?i)" + pattern)
		} else {
			compiledRegex, err = regexp.Compile(pattern)
		}
		if err != nil {
			return false
		}
	}
	
	for _, line := range content {
		var match bool
		
		if flagSet["-x"] {
			if flagSet["-i"] {
				match = strings.EqualFold(pattern, line)
			} else {
				match = pattern == line
			}
		} else {
			match = compiledRegex.MatchString(line)
		}
		
		if flagSet["-v"] {
			match = !match
		}
		
		if match {
			return true
		}
	}
	return false
}

func matchPattern(pattern, fileName string, content []string, printFileName bool, flagSet map[string]bool) []string {
	result := make([]string, 0, len(content))
	
	var compiledRegex *regexp.Regexp
	var err error
	
	if !flagSet["-x"] {
		if flagSet["-i"] {
			compiledRegex, err = regexp.Compile("(?i)" + pattern)
		} else {
			compiledRegex, err = regexp.Compile(pattern)
		}
		if err != nil {
			return result
		}
	}
	
	for i, line := range content {
		var match bool
		
		if flagSet["-x"] {
			if flagSet["-i"] {
				match = strings.EqualFold(pattern, line)
			} else {
				match = pattern == line
			}
		} else {
			match = compiledRegex.MatchString(line)
		}
		
		if flagSet["-v"] {
			match = !match
		}
		
		if match {
			var output string
			if printFileName {
				if flagSet["-n"] {
					output = fmt.Sprintf("%s:%d:%s", fileName, i+1, line)
				} else {
					output = fmt.Sprintf("%s:%s", fileName, line)
				}
			} else {
				if flagSet["-n"] {
					output = fmt.Sprintf("%d:%s", i+1, line)
				} else {
					output = line
				}
			}
			result = append(result, output)
		}
	}
	return result
}

func Files(fileContentData []string) map[string][]string {
	result := make(map[string][]string)
	var key string
	
	txtRegex := regexp.MustCompile(`\.txt`)
	dividerRegex := regexp.MustCompile(`^-+$`)
	emptyRegex := regexp.MustCompile(`^\s*$`)
	
	for _, line := range fileContentData {
		line = strings.TrimSpace(line)
		
		if txtRegex.MatchString(line) {
			key = line
		} else if dividerRegex.MatchString(line) || emptyRegex.MatchString(line) {
			continue
		} else if key != "" {
			line = strings.ReplaceAll(line, "|", "")
			line = strings.TrimSpace(line)
			result[key] = append(result[key], line)
		}
	}
	return result
}