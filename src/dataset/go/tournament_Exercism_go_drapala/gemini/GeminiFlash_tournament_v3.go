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
	output := make([]string, 0, len(lines))
	for _, line := range lines {
		line = strings.TrimSpace(line)
		if !strings.HasPrefix(line, "#") && line != "" {
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
	tally := make(map[string]*teamScore)

	for _, line := range cleaned {
		parts := strings.Split(line, ";")
		team := parts[0]
		opponent := parts[1]
		outcome := parts[2]

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
	if len(s) >= 31 {
		return s
	}
	var sb strings.Builder
	sb.WriteString(s)
	for i := len(s); i < 31; i++ {
		sb.WriteByte(' ')
	}
	return sb.String()
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
		if tally[i].p == tally[j].p {
			return tally[i].name < tally[j].name
		}
		return tally[i].p > tally[j].p
	})
	return tally
}

func Tally(reader io.Reader, writer io.Writer) error {
	scanner := bufio.NewScanner(reader)
	var cleaned []string

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if !strings.HasPrefix(line, "#") && line != "" {
			parts := strings.Split(line, ";")
			if len(parts) != 3 {
				return errors.New("Each line must contain three semicolon-separated values")
			}
			if parts[2] != "win" && parts[2] != "loss" && parts[2] != "draw" {
				return errors.New("Invalid input")
			}
			cleaned = append(cleaned, line)
		}
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	tally := generateScore(cleaned)
	tally = sortTally(tally)

	_, err := fmt.Fprint(writer, returnScore(tally))
	return err
}