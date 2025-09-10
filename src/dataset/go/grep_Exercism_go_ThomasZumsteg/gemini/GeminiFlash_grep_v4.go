package grep

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func Search(pattern string, flags []string, files []string) []string {
	result := []string{}
	argsMap := make(map[string]bool)
	multiFile := len(files) > 1
	invert := false
	lineNumber := false
	fileNameOnly := false
	ignoreCase := false
	wholeLine := false

	for _, arg := range flags {
		argsMap[arg] = true
		switch arg {
		case "-i":
			ignoreCase = true
		case "-n":
			lineNumber = true
		case "-l":
			fileNameOnly = true
		case "-v":
			invert = true
		case "-x":
			wholeLine = true
		}
	}

	for _, fileName := range files {
		file, err := os.Open(fileName)
		if err != nil {
			panic("Could not open file")
		}
		defer file.Close()

		scanner := bufio.NewScanner(file)
		lineNumberCounter := 1
		fileMatched := false

		for scanner.Scan() {
			line := scanner.Text()
			matchedLine := line

			if ignoreCase {
				matchedLine = strings.ToLower(line)
				pattern = strings.ToLower(pattern)
			}

			match := strings.Contains(matchedLine, pattern)

			if wholeLine {
				match = matchedLine == pattern
			}

			if (invert && !match) || (!invert && match) {
				fileMatched = true
				outputLine := line

				if lineNumber {
					outputLine = fmt.Sprintf("%d:%s", lineNumberCounter, outputLine)
				}

				if multiFile {
					outputLine = fmt.Sprintf("%s:%s", fileName, outputLine)
				}

				if fileNameOnly {
					result = append(result, fileName)
					break
				}

				result = append(result, outputLine)
			}
			lineNumberCounter++
		}
		if fileNameOnly && !fileMatched {
			continue
		}
	}

	return result
}