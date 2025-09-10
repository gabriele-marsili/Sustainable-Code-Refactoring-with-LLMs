package grep

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func Search(pattern string, flags []string, files []string) []string {
	var result []string
	argsMap := make(map[string]struct{}, len(flags))
	multiFile := len(files) > 1

	for _, flag := range flags {
		argsMap[flag] = struct{}{}
	}

	ignoreCase := _, hasI := argsMap["-i"]
	matchWhole := _, hasX := argsMap["-x"]
	invertMatch := _, hasV := argsMap["-v"]
	showLineNum := _, hasN := argsMap["-n"]
	showFileName := _, hasL := argsMap["-l"]

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
			if matchWhole {
				match = matchedLine == pattern
			}

			if invertMatch {
				match = !match
			}

			if match {
				if showFileName {
					result = append(result, fileName)
					fileMatched = true
					break
				}

				if showLineNum {
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

		if fileMatched {
			continue
		}
	}

	return result
}