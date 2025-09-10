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

	if argsMap["-i"] {
		pattern = strings.ToLower(pattern)
	}

	for _, fileName := range files {
		file, err := os.Open(fileName)
		if err != nil {
			panic("Could not open file")
		}

		scanner := bufio.NewScanner(file)
		linePrefix := ""
		if multiFile {
			linePrefix = fileName + ":"
		}

		for n := 1; scanner.Scan(); n++ {
			line := scanner.Text()
			matchedLine := line
			if argsMap["-i"] {
				matchedLine = strings.ToLower(line)
			}

			match := strings.Contains(matchedLine, pattern)
			if argsMap["-x"] {
				match = matchedLine == pattern
			}

			if (match && !argsMap["-v"]) || (!match && argsMap["-v"]) {
				if argsMap["-l"] {
					result = append(result, fileName)
					break
				}

				if argsMap["-n"] {
					line = fmt.Sprintf("%d:%s", n, line)
				}

				result = append(result, linePrefix+line)
			}
		}

		file.Close()
	}

	return result
}