package grep

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func Search(pattern string, flags []string, files []string) []string {
	if len(files) == 0 {
		return nil
	}
	
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
	
	if flagI {
		pattern = strings.ToLower(pattern)
	}
	
	multiFile := len(files) > 1
	result := make([]string, 0, 64)
	
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
					break
				}
				
				output := line
				if flagN {
					output = fmt.Sprintf("%d:%s", lineNum, line)
				}
				if multiFile {
					output = fmt.Sprintf("%s:%s", fileName, output)
				}
				result = append(result, output)
			}
			lineNum++
		}
		
		file.Close()
	}
	
	return result
}