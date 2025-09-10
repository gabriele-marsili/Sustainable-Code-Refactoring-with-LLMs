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
	c = configuration{}

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

	c.prefixFileName = len(files) > 1
	return c
}

func Search(pattern string, flags, files []string) (result []string) {
	lines := readFiles(files)
	config := NewConfiguration(flags, files)
	matches := search(pattern, config, lines)
	return format(matches, config)
}

func search(pattern string, config configuration, lines []line) (matches []line) {
	if config.matchCaseInsensitive {
		pattern = strings.ToLower(pattern)
	}

	for _, line := range lines {
		content := line.contents
		if config.matchCaseInsensitive {
			content = strings.ToLower(content)
		}

		match := false
		if config.matchEntireLine {
			match = content == pattern
		} else {
			match = strings.Contains(content, pattern)
		}

		if config.invertMatch {
			match = !match
		}

		if match {
			matches = append(matches, line)
		}
	}
	return matches
}

func format(matches []line, config configuration) (result []string) {
	seen := make(map[string]struct{})
	for _, match := range matches {
		formatted := formatMatch(match, config)
		if config.printFileNames {
			if _, exists := seen[formatted]; !exists {
				seen[formatted] = struct{}{}
				result = append(result, formatted)
			}
		} else {
			result = append(result, formatted)
		}
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

func readFiles(files []string) (lines []line) {
	for _, file := range files {
		lines = append(lines, readLines(file)...)
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
	lineNumber := 1
	for scanner.Scan() {
		lines = append(lines, line{lineNumber, scanner.Text(), filename})
		lineNumber++
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	return lines
}