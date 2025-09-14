package grep

import (
	"fmt"
	"regexp"
	"strings"
)

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
			if len(matchPattern(pattern, file, fileMap[file], printFileName, flagSet["-n"], flagSet["-i"], flagSet["-x"], flagSet["-v"])) > 0 {
				result = append(result, file)
			}
		}
		return result
	}
	
	result := make([]string, 0)
	for _, file := range files {
		result = append(result, matchPattern(pattern, file, fileMap[file], printFileName, flagSet["-n"], flagSet["-i"], flagSet["-x"], flagSet["-v"])...)
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
	result := make([]string, 0)
	
	var compiledRegex *regexp.Regexp
	var err error
	if !wholeLine {
		if insensitive {
			compiledRegex, err = regexp.Compile("(?i)" + pattern)
		} else {
			compiledRegex, err = regexp.Compile(pattern)
		}
		if err != nil {
			return result
		}
	}
	
	searchPattern := pattern
	if insensitive && wholeLine {
		searchPattern = strings.ToLower(pattern)
	}
	
	for i, line := range content {
		var addLine bool
		searchLine := line
		
		if insensitive && wholeLine {
			searchLine = strings.ToLower(line)
		}
		
		if wholeLine {
			addLine = searchPattern == searchLine
		} else {
			addLine = compiledRegex.MatchString(line)
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

func Files(fileContentData []string) map[string][]string {
	result := make(map[string][]string)
	var key string
	
	txtRegex := regexp.MustCompile(`\.txt`)
	dividerRegex := regexp.MustCompile(`------`)
	emptyRegex := regexp.MustCompile(`^\s*$`)
	
	for _, line := range fileContentData {
		line = strings.TrimSpace(line)
		
		if txtRegex.MatchString(line) {
			key = line
		} else if dividerRegex.MatchString(line) || emptyRegex.MatchString(line) {
			continue
		} else {
			line = strings.ReplaceAll(line, "|", "")
			line = strings.TrimSpace(line)
			result[key] = append(result[key], line)
		}
	}
	return result
}