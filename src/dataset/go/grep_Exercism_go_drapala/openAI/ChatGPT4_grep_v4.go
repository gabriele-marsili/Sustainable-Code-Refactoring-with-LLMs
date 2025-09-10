package grep

import (
	"fmt"
	"regexp"
	"strings"
)

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
	if isFlagSet("-l") {
		for _, file := range files {
			if len(matchPattern(pattern, file, fileMap[file], printFileName, isFlagSet("-n"), isFlagSet("-i"), isFlagSet("-x"), isFlagSet("-v"))) > 0 {
				result = append(result, file)
			}
		}
		return result
	}
	for _, file := range files {
		result = append(result, matchPattern(pattern, file, fileMap[file], printFileName, isFlagSet("-n"), isFlagSet("-i"), isFlagSet("-x"), isFlagSet("-v"))...)
	}
	return result
}

func matchPattern(pattern, fileName string, content []string, printFileName, printLine, insensitive, wholeLine, invert bool) []string {
	result := []string{}
	if insensitive {
		pattern = strings.ToLower(pattern)
	}
	re := regexp.MustCompile(pattern)
	for i, line := range content {
		originalLine := line
		if insensitive {
			line = strings.ToLower(line)
		}
		match := (wholeLine && pattern == line) || (!wholeLine && re.MatchString(line))
		if invert {
			match = !match
		}
		if match {
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