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

	for _, arg := range flags {
		argsMap[arg] = true
	}

	ignoreCase := argsMap["-i"]
	matchWholeLine := argsMap["-x"]
	invertMatch := argsMap["-v"]
	includeLineNum := argsMap["-n"]
	listFiles := argsMap["-l"]

	if ignoreCase {
		pattern = strings.ToLower(pattern)
	}

	for _, fileName := range files {
		file, err := os.Open(fileName)
		if err != nil {
			panic("Could not open file")
		}

		scanner := bufio.NewScanner(file)
		lineNum := 1
		fileMatched := false

		for scanner.Scan() {
			line := scanner.Text()
			matchedLine := line

			if ignoreCase {
				matchedLine = strings.ToLower(line)
			}

			match := strings.Contains(matchedLine, pattern)
			if matchWholeLine {
				match = matchedLine == pattern
			}

			if invertMatch {
				match = !match
			}

			if match {
				if listFiles {
					result = append(result, fileName)
					fileMatched = true
					break
				}

				if includeLineNum {
					line = fmt.Sprintf("%d:%s", lineNum, line)
				}
				if multiFile {
					line = fmt.Sprintf("%s:%s", fileName, line)
				}
				result = append(result, line)
			}
			lineNum++
		}

		file.Close()

		if listFiles && fileMatched {
			break
		}
	}

	return result
}