package grep

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

type line struct {
	number   int
	contents string
	filename string
}

type configuration struct {
	prefixLineNumbers    bool
	printFileNames       bool
	matchCaseInsensitive bool
	invertMatch          bool
	matchEntireLine      bool
	prefixFileName       bool
}

func NewConfiguration(flags []string, files []string) (c configuration) {
	for _, flag := range flags {
		switch flag {
		case "-n":
			c.prefixLineNumbers = true
		case "-l":
			c.printFileNames = true
		case "-i":
			c.matchCaseInsensitive = true
		case "-v":
			c.invertMatch = true
		case "-x":
			c.matchEntireLine = true
		default:
			log.Fatalf("unrecognized flag %v", flag)
		}
	}

	if len(files) > 1 {
		c.prefixFileName = true
	}

	return c
}

func Search(pattern string, flags, files []string) (result []string) {
	lines := readFiles(files)
	config := NewConfiguration(flags, files)
	matches := search(pattern, config, lines)

	temp := format(matches, config)
	fmt.Printf("result %v\n", temp)
	return temp
}

func search(pattern string, config configuration, lines []line) (matches []line) {
	var lowerPattern string
	if config.matchCaseInsensitive {
		lowerPattern = strings.ToLower(pattern)
	}

	matches = make([]line, 0, len(lines)/4)
	
	for _, line := range lines {
		if isMatch(pattern, lowerPattern, config, line) {
			matches = append(matches, line)
		}
	}
	return matches
}

func isMatch(pattern, lowerPattern string, config configuration, line line) bool {
	if config.matchCaseInsensitive {
		return strings.Contains(strings.ToLower(line.contents), lowerPattern)
	}
	
	if config.matchEntireLine {
		match := pattern == line.contents
		if config.invertMatch {
			return !match
		}
		return match
	}
	
	match := strings.Contains(line.contents, pattern)
	if config.invertMatch {
		return !match
	}
	return match
}

func format(matches []line, config configuration) (result []string) {
	if config.printFileNames {
		seen := make(map[string]bool, len(matches))
		result = make([]string, 0, len(matches))
		for _, match := range matches {
			if !seen[match.filename] {
				seen[match.filename] = true
				result = append(result, match.filename)
			}
		}
		return result
	}

	result = make([]string, 0, len(matches))
	for _, match := range matches {
		result = append(result, formatMatch(match, config))
	}
	return result
}

func formatMatch(match line, config configuration) string {
	if config.printFileNames {
		return match.filename
	}
	
	var builder strings.Builder
	if config.prefixFileName {
		builder.WriteString(match.filename)
		builder.WriteByte(':')
	}
	if config.prefixLineNumbers {
		builder.WriteString(fmt.Sprintf("%d:", match.number))
	}
	builder.WriteString(match.contents)
	return builder.String()
}

func readFiles(files []string) (lines []line) {
	var totalLines int
	for _, file := range files {
		if info, err := os.Stat(file); err == nil {
			totalLines += int(info.Size() / 50)
		}
	}
	lines = make([]line, 0, totalLines)
	
	for _, file := range files {
		fileLines := readLines(file)
		lines = append(lines, fileLines...)
	}
	return lines
}

func readLines(filename string) (lines []line) {
	file, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	lines = make([]line, 0, 100)
	lineNumber := 1
	
	for scanner.Scan() {
		contents := scanner.Text()
		lines = append(lines, line{lineNumber, contents, filename})
		lineNumber++
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	return lines
}

func uniq(items []string) (result []string) {
	seen := make(map[string]bool, len(items))
	result = make([]string, 0, len(items))
	
	for _, item := range items {
		if !seen[item] {
			seen[item] = true
			result = append(result, item)
		}
	}
	return result
}

func contains(list []string, value string) bool {
	for _, item := range list {
		if item == value {
			return true
		}
	}
	return false
}