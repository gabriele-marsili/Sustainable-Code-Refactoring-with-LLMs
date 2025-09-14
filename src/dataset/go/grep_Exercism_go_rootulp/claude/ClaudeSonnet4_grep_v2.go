package grep

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

type line struct {
	number   int
	contents string
	filename string
}

type configuration struct {
	// -n Print the line numbers of each matching line.
	prefixLineNumbers bool
	// -l Print only the names of files that contain at least one matching line.
	printFileNames bool
	// -i Match line using a case-insensitive comparison.
	matchCaseInsensitive bool
	// -v Invert the program -- collect all lines that fail to match the pattern.
	invertMatch bool
	// -x Only match entire lines, instead of lines that contain a match.
	matchEntireLine bool
	// No flag exists for this option. Prefix each matching line with the filename it was found in.
	prefixFileName bool
}

func NewConfiguration(flags []string, files []string) configuration {
	c := configuration{}

	for _, flag := range flags {
		switch flag {
		case "-n":
			c.prefixLineNumbers = true
		case "-l":
			c.printFileNames = true
		case "-i":
			c.matchCaseInsensitive = true
		case "-v":
			c.invertMatch = true
		case "-x":
			c.matchEntireLine = true
		default:
			log.Fatalf("unrecognized flag %v", flag)
		}
	}

	if len(files) > 1 {
		c.prefixFileName = true
	}

	return c
}

func Search(pattern string, flags, files []string) []string {
	config := NewConfiguration(flags, files)
	
	var lowerPattern string
	if config.matchCaseInsensitive {
		lowerPattern = strings.ToLower(pattern)
	}

	var result []string
	seen := make(map[string]bool)

	for _, filename := range files {
		file, err := os.Open(filename)
		if err != nil {
			log.Fatal(err)
		}

		scanner := bufio.NewScanner(file)
		lineNumber := 1
		
		for scanner.Scan() {
			contents := scanner.Text()
			
			var matched bool
			if config.matchCaseInsensitive {
				lowerContents := strings.ToLower(contents)
				matched = strings.Contains(lowerContents, lowerPattern)
			} else if config.matchEntireLine {
				matched = pattern == contents
			} else {
				matched = strings.Contains(contents, pattern)
			}
			
			if config.invertMatch {
				matched = !matched
			}
			
			if matched {
				var formatted string
				if config.printFileNames {
					formatted = filename
					if !seen[formatted] {
						result = append(result, formatted)
						seen[formatted] = true
					}
				} else {
					if config.prefixFileName && config.prefixLineNumbers {
						formatted = fmt.Sprintf("%s:%d:%s", filename, lineNumber, contents)
					} else if config.prefixFileName {
						formatted = fmt.Sprintf("%s:%s", filename, contents)
					} else if config.prefixLineNumbers {
						formatted = fmt.Sprintf("%d:%s", lineNumber, contents)
					} else {
						formatted = contents
					}
					result = append(result, formatted)
				}
			}
			lineNumber++
		}

		if err := scanner.Err(); err != nil {
			log.Fatal(err)
		}
		file.Close()
	}

	return result
}