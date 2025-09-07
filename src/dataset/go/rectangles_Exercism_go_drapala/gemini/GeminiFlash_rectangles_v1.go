package rectangles

import (
	"sort"
)

// The game board
type board struct {
	width, height int
	points        map[coord]string
}

// Returns a list of co-ordinates for the desired character
func (b *board) filter(c string) coordslice {
	var filtered coordslice
	for k, v := range b.points {
		if v == c {
			filtered = append(filtered, k)
		}
	}
	sort.Sort(filtered)
	return filtered
}

// Cartesian co-ordinates
type coord struct {
	x, y int
}

// Slice of co-ordinates, used for sorting
type coordslice []coord

// Represents a found rectangle
type rectangle struct {
	x [2]int
	y [2]int
}

// Implement sort on this custom type so that we can sort the co-ordinates
func (c coordslice) Len() int { return len(c) }
func (c coordslice) Less(i, j int) bool {
	if c[i].x != c[j].x {
		return c[i].x < c[j].x
	}
	return c[i].y < c[j].y
}
func (c coordslice) Swap(i, j int) { c[i], c[j] = c[j], c[i] }

// Find the intersection of two lists
func intersection(s1, s2 []int) []int {
	set := make(map[int]bool)
	for _, v := range s1 {
		set[v] = true
	}
	result := make([]int, 0)
	for _, v := range s2 {
		if set[v] {
			result = append(result, v)
		}
	}
	return removeDups(result)
}

// Remove duplicates from slice.
func removeDups(elements []int) []int {
	if len(elements) == 0 {
		return elements
	}
	sort.Ints(elements)
	j := 0
	for i := 1; i < len(elements); i++ {
		if elements[i] != elements[j] {
			j++
			elements[j] = elements[i]
		}
	}
	return elements[:j+1]
}

// Traverses the X axis and checks for valid characters
func traverseX(x1, x2, y int, points map[coord]string) bool {
	for x := x1 + 1; x < x2; x++ {
		p := points[coord{x, y}]
		if p != "-" && p != "+" {
			return false
		}
	}
	return true
}

// Traverses the Y axis and checks for valid characters
func traverseY(x, y1, y2 int, points map[coord]string) bool {
	for y := y1 + 1; y < y2; y++ {
		p := points[coord{x, y}]
		if p != "|" && p != "+" {
			return false
		}
	}
	return true
}

// Counts the number of valid rectangles as per the rules of drawing
func Count(diagram []string) int {
	height := len(diagram)
	if height == 0 {
		return 0
	}
	width := len(diagram[0])
	points := make(map[coord]string)

	for y, line := range diagram {
		if len(line) != width {
			width = len(line)
		}
		for x, char := range line {
			points[coord{x, y}] = string(char)
		}
	}

	myBoard := board{
		width:  width - 1,
		height: height - 1,
		points: points,
	}

	plusCoords := myBoard.filter("+")
	count := 0

	for i := 0; i < len(plusCoords); i++ {
		for j := i + 1; j < len(plusCoords); j++ {
			c1 := plusCoords[i]
			c2 := plusCoords[j]

			if c1.x == c2.x || c1.y == c2.y {
				continue
			}

			c3 := coord{x: c1.x, y: c2.y}
			c4 := coord{x: c2.x, y: c1.y}

			if points[c3] == "+" && points[c4] == "+" {
				if traverseX(c1.x, c2.x, c1.y, points) &&
					traverseX(c1.x, c2.x, c2.y, points) &&
					traverseY(c1.x, c1.y, c2.y, points) &&
					traverseY(c2.x, c1.y, c2.y, points) {
					count++
				}
			}
		}
	}

	return count
}