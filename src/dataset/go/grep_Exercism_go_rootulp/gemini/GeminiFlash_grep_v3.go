package grep

import (
	"bufio"
	"fmt"
	"io"
	"log"
	"os"
	"strings"
	"sync"
)

type line struct {
	number   int
	contents string
	filename string
}

type configuration struct {
	prefixLineNumbers    bool
	printFileNames       bool
	matchCaseInsensitive bool
	invertMatch          bool
	matchEntireLine      bool
	prefixFileName       bool
}

func NewConfiguration(flags []string, files []string) (c configuration) {
	c = configuration{
		prefixLineNumbers:    false,
		printFileNames:       false,
		matchCaseInsensitive: false,
		invertMatch:          false,
		matchEntireLine:      false,
		prefixFileName:       false,
	}

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

func Search(pattern string, flags, files []string) (result []string) {
	config := NewConfiguration(flags, files)

	resultChan := make(chan string)
	var wg sync.WaitGroup

	for _, file := range files {
		wg.Add(1)
		go func(file string) {
			defer wg.Done()
			processFile(file, pattern, config, resultChan)
		}(file)
	}

	go func() {
		wg.Wait()
		close(resultChan)
	}()

	resultSet := make(map[string]bool)
	for res := range resultChan {
		if config.printFileNames {
			resultSet[res] = true
		} else {
			resultSet[res] = true
		}
	}

	finalResult := make([]string, 0, len(resultSet))
	for res := range resultSet {
		finalResult = append(finalResult, res)
	}

	fmt.Printf("result %v\n", finalResult)
	return finalResult
}

func processFile(filename string, pattern string, config configuration, resultChan chan<- string) {
	file, err := os.Open(filename)
	if err != nil {
		log.Println(err) // Log the error and continue with other files
		return
	}
	defer file.Close()

	reader := bufio.NewReader(file)
	lineNumber := 1

	for {
		lineContents, err := reader.ReadString('\n')
		if err != nil {
			if err != io.EOF {
				log.Println(err) // Log the error
			}
			break // Exit loop on error or EOF
		}
		lineContents = strings.TrimSuffix(lineContents, "\n")

		line := line{lineNumber, lineContents, filename}

		if isMatch(pattern, config, line) {
			resultChan <- formatMatch(line, config)
			if config.printFileNames {
				return // If only filenames are needed, stop processing the file after the first match
			}
		}

		lineNumber++
	}
}

func isMatch(pattern string, config configuration, line line) bool {
	contents := line.contents
	if config.matchCaseInsensitive {
		pattern = strings.ToLower(pattern)
		contents = strings.ToLower(contents)
	}

	if config.matchEntireLine {
		if config.invertMatch {
			return pattern != contents
		}
		return pattern == contents
	}

	if config.invertMatch {
		return !strings.Contains(contents, pattern)
	}

	return strings.Contains(contents, pattern)
}

func formatMatch(match line, config configuration) string {
	if config.printFileNames {
		return match.filename
	}

	var sb strings.Builder

	if config.prefixFileName {
		sb.WriteString(match.filename)
		sb.WriteString(":")
	}

	if config.prefixLineNumbers {
		sb.WriteString(fmt.Sprintf("%d:", match.number))
	}

	sb.WriteString(match.contents)

	return sb.String()
}