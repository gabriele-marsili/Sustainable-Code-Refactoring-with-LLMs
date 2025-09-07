package tournament

import (
	"bufio"
	"errors"
	"fmt"
	"io"
	"sort"
	"strings"
)

type teamScore struct {
	name string
	mp   int
	w    int
	d    int
	l    int
	p    int
}

func cleaner(input string) []string {
	lines := strings.Split(input, "\n")
	output := make([]string, 0, len(lines))
	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line != "" && !strings.HasPrefix(line, "#") {
			output = append(output, line)
		}
	}
	return output
}

func generateScore(cleaned []string) []teamScore {
	tally := make(map[string]*teamScore)
	for _, line := range cleaned {
		parts := strings.Split(line, ";")
		team, opponent, outcome := parts[0], parts[1], parts[2]

		if _, exists := tally[team]; !exists {
			tally[team] = &teamScore{name: team}
		}
		if _, exists := tally[opponent]; !exists {
			tally[opponent] = &teamScore{name: opponent}
		}

		teamStruct := tally[team]
		opponentStruct := tally[opponent]

		teamStruct.mp++
		opponentStruct.mp++

		switch outcome {
		case "win":
			teamStruct.w++
			teamStruct.p += 3
			opponentStruct.l++
		case "draw":
			teamStruct.d++
			opponentStruct.d++
			teamStruct.p++
			opponentStruct.p++
		case "loss":
			teamStruct.l++
			opponentStruct.w++
			opponentStruct.p += 3
		}
	}

	output := make([]teamScore, 0, len(tally))
	for _, team := range tally {
		output = append(output, *team)
	}
	return output
}

func pad(s string) string {
	return fmt.Sprintf("%-31s", s)
}

func returnScore(tally []teamScore) string {
	var sb strings.Builder
	sb.WriteString("Team                           | MP |  W |  D |  L |  P")
	for _, team := range tally {
		sb.WriteString(fmt.Sprintf("\n%s| %2d | %2d | %2d | %2d | %2d",
			pad(team.name), team.mp, team.w, team.d, team.l, team.p))
	}
	return sb.String()
}

func sortTally(tally []teamScore) []teamScore {
	sort.Slice(tally, func(i, j int) bool {
		if tally[i].p == tally[j].p {
			return tally[i].name < tally[j].name
		}
		return tally[i].p > tally[j].p
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
		parts := strings.Split(line, ";")
		if len(parts) != 3 || (parts[2] != "win" && parts[2] != "loss" && parts[2] != "draw") {
			return errors.New("invalid input")
		}
	}

	tally := generateScore(lines)
	tally = sortTally(tally)
	_, err := writer.Write([]byte(returnScore(tally)))
	return err
}