package grep

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func Search(pattern string, flags []string, files []string) []string {
	result := make([]string, 0, 64) // Pre-allocate with reasonable capacity
	
	// Parse flags once
	flagI := false
	flagX := false
	flagV := false
	flagN := false
	flagL := false
	
	for _, flag := range flags {
		switch flag {
		case "-i":
			flagI = true
		case "-x":
			flagX = true
		case "-v":
			flagV = true
		case "-n":
			flagN = true
		case "-l":
			flagL = true
		}
	}
	
	// Normalize pattern once if case-insensitive
	if flagI {
		pattern = strings.ToLower(pattern)
	}
	
	multiFile := len(files) > 1
	
	for _, fileName := range files {
		file, err := os.Open(fileName)
		if err != nil {
			panic("Could not open file")
		}
		
		scanner := bufio.NewScanner(file)
		lineNum := 1
		
		for scanner.Scan() {
			line := scanner.Text()
			matched := line
			
			if flagI {
				matched = strings.ToLower(line)
			}
			
			var match bool
			if flagX {
				match = matched == pattern
			} else {
				match = strings.Contains(matched, pattern)
			}
			
			if (flagV && !match) || (!flagV && match) {
				if flagL {
					result = append(result, fileName)
					file.Close()
					goto nextFile
				}
				
				outputLine := line
				if flagN {
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
		nextFile:
	}
	
	return result
}