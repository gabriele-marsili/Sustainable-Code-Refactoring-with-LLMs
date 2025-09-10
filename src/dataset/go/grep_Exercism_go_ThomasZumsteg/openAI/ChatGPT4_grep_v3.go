package grep

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func Search(pattern string, flags []string, files []string) []string {
	var result []string
	argsMap := make(map[string]bool, len(flags))
	multiFile := len(files) > 1

	for _, flag := range flags {
		argsMap[flag] = true
	}

	ignoreCase := argsMap["-i"]
	matchWholeLine := argsMap["-x"]
	invertMatch := argsMap["-v"]
	showLineNumbers := argsMap["-n"]
	showFileNames := argsMap["-l"]

	if ignoreCase {
		pattern = strings.ToLower(pattern)
	}

	for _, fileName := range files {
		file, err := os.Open(fileName)
		if err != nil {
			panic("Could not open file")
		}

		scanner := bufio.NewScanner(file)
		var fileMatched bool

		for lineNumber := 1; scanner.Scan(); lineNumber++ {
			line := scanner.Text()
			processedLine := line

			if ignoreCase {
				processedLine = strings.ToLower(line)
			}

			match := strings.Contains(processedLine, pattern)
			if matchWholeLine {
				match = processedLine == pattern
			}

			if invertMatch {
				match = !match
			}

			if match {
				if showFileNames {
					result = append(result, fileName)
					fileMatched = true
					break
				}

				if showLineNumbers {
					line = fmt.Sprintf("%d:%s", lineNumber, line)
				}

				if multiFile {
					line = fmt.Sprintf("%s:%s", fileName, line)
				}

				result = append(result, line)
			}
		}

		file.Close()

		if showFileNames && fileMatched {
			continue
		}
	}

	return result
}