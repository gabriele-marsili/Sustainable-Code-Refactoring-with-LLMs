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

func Tally(reader io.Reader, writer io.Writer) error {
	tally := make(map[string]*teamScore)
	scanner := bufio.NewScanner(reader)
	
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		
		// Skip comments and empty lines
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		
		// Split into data points
		parts := strings.Split(line, ";")
		if len(parts) != 3 {
			return errors.New("Each line must contain three semicolon-separated values")
		}
		
		team := parts[0]
		opponent := parts[1]
		outcome := parts[2]
		
		// Validate outcome
		if outcome != "win" && outcome != "loss" && outcome != "draw" {
			return errors.New("Invalid input")
		}
		
		// Get or create team structs
		teamStruct := tally[team]
		if teamStruct == nil {
			teamStruct = &teamScore{name: team}
			tally[team] = teamStruct
		}
		
		opponentStruct := tally[opponent]
		if opponentStruct == nil {
			opponentStruct = &teamScore{name: opponent}
			tally[opponent] = opponentStruct
		}
		
		// Update matches played
		teamStruct.mp++
		opponentStruct.mp++
		
		// Update wins, draws, losses, and points
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
	
	if err := scanner.Err(); err != nil {
		return err
	}
	
	// Convert map to slice
	teams := make([]teamScore, 0, len(tally))
	for _, team := range tally {
		teams = append(teams, *team)
	}
	
	// Sort by points (descending), then by name (ascending)
	sort.Slice(teams, func(i, j int) bool {
		if teams[i].p == teams[j].p {
			return teams[i].name < teams[j].name
		}
		return teams[i].p > teams[j].p
	})
	
	// Write output
	fmt.Fprint(writer, "Team                           | MP |  W |  D |  L |  P")
	for _, team := range teams {
		fmt.Fprintf(writer, "\n%-31s| %2d | %2d | %2d | %2d | %2d",
			team.name, team.mp, team.w, team.d, team.l, team.p)
	}
	fmt.Fprint(writer, "\n")
	
	return nil
}