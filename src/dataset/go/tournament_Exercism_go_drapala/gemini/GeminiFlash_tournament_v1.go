package tournament

import (
	"bufio"
	"errors"
	"fmt"
	"io"
	"sort"
	"strings"
)

func cleaner(input string) []string {
	lines := strings.Split(input, "\n")
	output := make([]string, 0, len(lines)) // Pre-allocate capacity

	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line != "" && !strings.HasPrefix(line, "#") { // Combined condition
			output = append(output, line)
		}
	}
	return output
}

type teamScore struct {
	name string
	mp   int
	w    int
	d    int
	l    int
	p    int
}

func generateScore(cleaned []string) []teamScore {
	tally := make(map[string]*teamScore) // Use pointers to avoid copying structs
	var team, opponent, outcome string

	for _, line := range cleaned {
		linesplit := strings.Split(line, ";")
		team = linesplit[0]
		opponent = linesplit[1]
		outcome = linesplit[2]

		teamStruct, ok := tally[team]
		if !ok {
			teamStruct = &teamScore{name: team}
			tally[team] = teamStruct
		}

		opponentStruct, ok := tally[opponent]
		if !ok {
			opponentStruct = &teamScore{name: opponent}
			tally[opponent] = opponentStruct
		}

		teamStruct.mp++
		opponentStruct.mp++

		switch outcome {
		case "win":
			teamStruct.w++
			teamStruct.p += 3
			opponentStruct.l++
		case "draw":
			teamStruct.d++
			teamStruct.p++
			opponentStruct.d++
			opponentStruct.p++
		case "loss":
			teamStruct.l++
			opponentStruct.p -= -3 // equivalent to opponentStruct.p += 3
			opponentStruct.w++
		}
	}

	output := make([]teamScore, 0, len(tally)) // Pre-allocate capacity
	for _, team := range tally {
		output = append(output, *team) // Dereference pointer when appending
	}
	return output
}

var spaces = strings.Repeat(" ", 31)

func pad(s string) string {
	if len(s) >= 31 {
		return s
	}
	return s + spaces[:31-len(s)]
}

func returnScore(tally []teamScore) string {
	var sb strings.Builder
	sb.WriteString("Team                           | MP |  W |  D |  L |  P\n")
	for _, team := range tally {
		sb.WriteString(fmt.Sprintf("%s| %2d | %2d | %2d | %2d | %2d\n",
			pad(team.name), team.mp, team.w, team.d, team.l, team.p))
	}
	return sb.String()
}

func sortTally(tally []teamScore) []teamScore {
	sort.Slice(tally, func(i, j int) bool {
		if tally[i].p != tally[j].p {
			return tally[i].p > tally[j].p
		}
		return tally[i].name < tally[j].name
	})
	return tally
}

func Tally(reader io.Reader, writer io.Writer) error {
	scanner := bufio.NewScanner(reader)
	var lines []string

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line != "" && !strings.HasPrefix(line, "#") {
			lines = append(lines, line)
		}
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	for _, line := range lines {
		outcome := strings.Split(line, ";")

		if len(outcome) != 3 {
			return errors.New("Each line must contain three semicolon-separated values")
		}

		if outcome[2] != "win" && outcome[2] != "loss" && outcome[2] != "draw" {
			return errors.New("Invalid input")
		}
	}

	tally := generateScore(lines)
	tally = sortTally(tally)

	_, err := fmt.Fprint(writer, returnScore(tally))
	return err
}