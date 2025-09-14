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
	// -n Print the line numbers of each matching line.
	prefixLineNumbers bool
	// -l Print only the names of files that contain at least one matching line.
	printFileNames bool
	// -i Match line using a case-insensitive comparison.
	matchCaseInsensitive bool
	// -v Invert the program -- collect all lines that fail to match the pattern.
	invertMatch bool
	// -x Only match entire lines, instead of lines that contain a match.
	matchEntireLine bool
	// No flag exists for this option. Prefix each matching line with the filename it was found in.
	prefixFileName bool
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
	
	matches = make([]line, 0, len(lines)/4) // Pre-allocate with estimated capacity
	
	for _, line := range lines {
		if isMatch(pattern, lowerPattern, config, line) {
			matches = append(matches, line)
		}
	}
	return matches
}

func isMatch(pattern, lowerPattern string, config configuration, line line) bool {
	if config.matchCaseInsensitive {
		lowerContents := strings.ToLower(line.contents)
		return strings.Contains(lowerContents, lowerPattern)
	} else if config.matchEntireLine && config.invertMatch {
		return pattern != line.contents
	} else if config.matchEntireLine {
		return pattern == line.contents
	} else if config.invertMatch {
		return !strings.Contains(line.contents, pattern)
	}
	return strings.Contains(line.contents, pattern)
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
	} else if config.prefixFileName && config.prefixLineNumbers {
		return fmt.Sprintf("%s:%d:%s", match.filename, match.number, match.contents)
	} else if config.prefixFileName {
		return fmt.Sprintf("%s:%s", match.filename, match.contents)
	} else if config.prefixLineNumbers {
		return fmt.Sprintf("%d:%s", match.number, match.contents)
	}
	return match.contents
}

func readFiles(files []string) (lines []line) {
	lines = make([]line, 0, len(files)*100) // Pre-allocate with estimated capacity
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
	lines = make([]line, 0, 100) // Pre-allocate with estimated capacity
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