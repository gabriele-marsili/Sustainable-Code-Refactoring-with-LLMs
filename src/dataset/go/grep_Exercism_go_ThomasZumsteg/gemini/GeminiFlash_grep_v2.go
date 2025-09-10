package grep

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func Search(pattern string, flags []string, files []string) []string {
	result := []string{}
	invert := false
	ignoreCase := false
	wholeLine := false
	lineNumber := false
	listFiles := false
	multiFile := len(files) > 1

	for _, flag := range flags {
		switch flag {
		case "-i":
			ignoreCase = true
		case "-v":
			invert = true
		case "-x":
			wholeLine = true
		case "-n":
			lineNumber = true
		case "-l":
			listFiles = true
		}
	}

	if ignoreCase {
		pattern = strings.ToLower(pattern)
	}

	for _, fileName := range files {
		file, err := os.Open(fileName)
		if err != nil {
			panic("Could not open file")
		}
		defer file.Close()

		scanner := bufio.NewScanner(file)
		lineNum := 1
		fileMatched := false // Track if the file has matched when listFiles is true

		for scanner.Scan() {
			line := scanner.Text()
			matchedLine := line

			if ignoreCase {
				matchedLine = strings.ToLower(line)
			}

			match := strings.Contains(matchedLine, pattern)
			if wholeLine {
				match = matchedLine == pattern
			}

			if (invert && !match) || (!invert && match) {
				if listFiles {
					result = append(result, fileName)
					fileMatched = true
					break // Only add the filename once
				}

				formattedLine := line
				if lineNumber {
					formattedLine = fmt.Sprintf("%d:%s", lineNum, formattedLine)
				}
				if multiFile {
					formattedLine = fmt.Sprintf("%s:%s", fileName, formattedLine)
				}
				result = append(result, formattedLine)
			}
			lineNum++
		}
		if listFiles && fileMatched {
			continue // Skip to the next file if already matched
		}
	}

	return result
}