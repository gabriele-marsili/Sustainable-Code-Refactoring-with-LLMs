package grep

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func Search(pattern string, flags []string, files []string) []string {
	result := make([]string, 0, len(files)*10)
	
	flagInvert := false
	flagIgnoreCase := false
	flagExactMatch := false
	flagLineNumbers := false
	flagFilesOnly := false
	
	for _, flag := range flags {
		switch flag {
		case "-v":
			flagInvert = true
		case "-i":
			flagIgnoreCase = true
		case "-x":
			flagExactMatch = true
		case "-n":
			flagLineNumbers = true
		case "-l":
			flagFilesOnly = true
		}
	}
	
	searchPattern := pattern
	if flagIgnoreCase {
		searchPattern = strings.ToLower(pattern)
	}
	
	multiFile := len(files) > 1
	
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
			
			testLine := line
			if flagIgnoreCase {
				testLine = strings.ToLower(line)
			}
			
			var match bool
			if flagExactMatch {
				match = testLine == searchPattern
			} else {
				match = strings.Contains(testLine, searchPattern)
			}
			
			if flagInvert {
				match = !match
			}
			
			if match {
				if flagFilesOnly {
					if !fileMatched {
						result = append(result, fileName)
						fileMatched = true
					}
					break
				}
				
				outputLine := line
				if flagLineNumbers {
					outputLine = fmt.Sprintf("%d:%s", lineNum, line)
				}
				if multiFile {
					outputLine = fmt.Sprintf("%s:%s", fileName, outputLine)
				}
				
				result = append(result, outputLine)
			}
			
			lineNum++
		}
		
		file.Close()
	}
	
	return result
}