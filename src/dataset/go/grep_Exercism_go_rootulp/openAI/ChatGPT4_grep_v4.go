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

func NewConfiguration(flags []string, files []string) configuration {
	config := configuration{}
	flagSet := map[string]bool{}
	for _, flag := range flags {
		flagSet[flag] = true
	}

	config.prefixLineNumbers = flagSet["-n"]
	config.printFileNames = flagSet["-l"]
	config.matchCaseInsensitive = flagSet["-i"]
	config.invertMatch = flagSet["-v"]
	config.matchEntireLine = flagSet["-x"]
	config.prefixFileName = len(files) > 1

	return config
}

func Search(pattern string, flags, files []string) []string {
	lines := readFiles(files)
	config := NewConfiguration(flags, files)
	matches := search(pattern, config, lines)
	return format(matches, config)
}

func search(pattern string, config configuration, lines []line) []line {
	matches := make([]line, 0, len(lines))
	for _, line := range lines {
		if isMatch(pattern, config, line) {
			matches = append(matches, line)
		}
	}
	return matches
}

func isMatch(pattern string, config configuration, line line) bool {
	content := line.contents
	if config.matchCaseInsensitive {
		content = strings.ToLower(content)
		pattern = strings.ToLower(pattern)
	}

	match := false
	if config.matchEntireLine {
		match = content == pattern
	} else {
		match = strings.Contains(content, pattern)
	}

	if config.invertMatch {
		return !match
	}
	return match
}

func format(matches []line, config configuration) []string {
	if config.printFileNames {
		fileSet := make(map[string]struct{})
		for _, match := range matches {
			fileSet[match.filename] = struct{}{}
		}
		result := make([]string, 0, len(fileSet))
		for filename := range fileSet {
			result = append(result, filename)
		}
		return result
	}

	result := make([]string, len(matches))
	for i, match := range matches {
		result[i] = formatMatch(match, config)
	}
	return result
}

func formatMatch(match line, config configuration) string {
	switch {
	case config.printFileNames:
		return match.filename
	case config.prefixFileName && config.prefixLineNumbers:
		return fmt.Sprintf("%s:%d:%s", match.filename, match.number, match.contents)
	case config.prefixFileName:
		return fmt.Sprintf("%s:%s", match.filename, match.contents)
	case config.prefixLineNumbers:
		return fmt.Sprintf("%d:%s", match.number, match.contents)
	default:
		return match.contents
	}
}

func readFiles(files []string) []line {
	var lines []line
	for _, file := range files {
		lines = append(lines, readLines(file)...)
	}
	return lines
}

func readLines(filename string) []line {
	file, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	var lines []line
	scanner := bufio.NewScanner(file)
	for lineNumber := 1; scanner.Scan(); lineNumber++ {
		lines = append(lines, line{lineNumber, scanner.Text(), filename})
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	return lines
}