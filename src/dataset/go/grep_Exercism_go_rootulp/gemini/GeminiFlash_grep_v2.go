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
	c := configuration{}

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

func Search(pattern string, flags, files []string) []string {
	config := NewConfiguration(flags, files)
	matches := search(pattern, config, files)

	temp := format(matches, config)
	fmt.Printf("result %v\n", temp)
	return temp
}

func search(pattern string, config configuration, files []string) []line {
	matches := []line{}
	for _, file := range files {
		fileMatches := searchFile(pattern, config, file)
		matches = append(matches, fileMatches...)
	}
	return matches
}

func searchFile(pattern string, config configuration, filename string) []line {
	file, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	lineNumber := 1
	matches := []line{}

	for scanner.Scan() {
		contents := scanner.Text()
		line := line{lineNumber: lineNumber, contents: contents, filename: filename}

		if isMatch(pattern, config, line) {
			matches = append(matches, line)
		}
		lineNumber++
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	return matches
}

func isMatch(pattern string, config configuration, line line) bool {
	contents := line.contents
	if config.matchCaseInsensitive {
		pattern = strings.ToLower(pattern)
		contents = strings.ToLower(contents)
	}

	if config.matchEntireLine {
		if config.invertMatch {
			return pattern != contents
		}
		return pattern == contents
	}

	if config.invertMatch {
		return !strings.Contains(contents, pattern)
	}

	return strings.Contains(contents, pattern)
}

func format(matches []line, config configuration) []string {
	result := make([]string, 0, len(matches))
	if config.printFileNames {
		fileNames := make(map[string]bool)
		for _, match := range matches {
			if !fileNames[match.filename] {
				result = append(result, match.filename)
				fileNames[match.filename] = true
			}
		}
		return result
	}

	for _, match := range matches {
		result = append(result, formatMatch(match, config))
	}
	return result
}

func formatMatch(match line, config configuration) string {
	if config.prefixFileName && config.prefixLineNumbers {
		return fmt.Sprintf("%s:%d:%s", match.filename, match.number, match.contents)
	}
	if config.prefixFileName {
		return fmt.Sprintf("%s:%s", match.filename, match.contents)
	}
	if config.prefixLineNumbers {
		return fmt.Sprintf("%d:%s", match.number, match.contents)
	}
	return match.contents
}