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
	exactMatch := false

	for _, arg := range flags {
		argsMap[arg] = true
		switch arg {
		case "-v":
			invert = true
		case "-n":
			lineNumber = true
		case "-l":
			fileNameOnly = true
		case "-i":
			ignoreCase = true
			pattern = strings.ToLower(pattern)
		case "-x":
			exactMatch = true
		}
	}

	for _, fileName := range files {
		file, err := os.Open(fileName)
		if err != nil {
			panic("Could not open file")
		}
		defer file.Close()

		scanner := bufio.NewScanner(file)
		n := 1
		for scanner.Scan() {
			line := scanner.Text()
			matchedLine := line

			if ignoreCase {
				matchedLine = strings.ToLower(line)
			}

			match := strings.Contains(matchedLine, pattern)
			if exactMatch {
				match = matchedLine == pattern
			}

			if (invert && !match) || (!invert && match) {
				outputLine := line

				if lineNumber {
					outputLine = fmt.Sprintf("%d:%s", n, outputLine)
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
			n++
		}
	}
	return result
}