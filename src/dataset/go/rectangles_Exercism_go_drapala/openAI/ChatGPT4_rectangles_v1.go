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
	filtered := make(coordslice, 0, len(b.points))
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
	hash := make(map[int]struct{}, len(s1))
	for _, e := range s1 {
		hash[e] = struct{}{}
	}
	inter := make([]int, 0, len(s2))
	for _, e := range s2 {
		if _, found := hash[e]; found {
			inter = append(inter, e)
		}
	}
	return inter
}

// Traverses the X axis and checks for valid characters
func traverseX(x1, x2, y int, points map[coord]string) bool {
	for x := x1 + 1; x < x2; x++ {
		if char := points[coord{x, y}]; char != "-" && char != "+" {
			return false
		}
	}
	return true
}

// Traverses the Y axis and checks for valid characters
func traverseY(x, y1, y2 int, points map[coord]string) bool {
	for y := y1 + 1; y < y2; y++ {
		if char := points[coord{x, y}]; char != "|" && char != "+" {
			return false
		}
	}
	return true
}

// Counts the number of valid rectangles as per the rules of drawing
func Count(diagram []string) int {
	height := len(diagram)
	width := 0
	points := make(map[coord]string, height*len(diagram[0]))

	for y, line := range diagram {
		if len(line) > width {
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

	groupByX := make(map[int][]int)
	for _, point := range myBoard.filter("+") {
		groupByX[point.x] = append(groupByX[point.x], point.y)
	}

	validRectangles := 0
	for x1 := 0; x1 < width; x1++ {
		for x2 := x1 + 1; x2 < width; x2++ {
			y1List, y2List := groupByX[x1], groupByX[x2]
			if y1List == nil || y2List == nil {
				continue
			}
			intersections := intersection(y1List, y2List)
			if len(intersections) < 2 {
				continue
			}
			for i := 0; i < len(intersections)-1; i++ {
				for j := i + 1; j < len(intersections); j++ {
					y1, y2 := intersections[i], intersections[j]
					if traverseX(x1, x2, y1, points) && traverseX(x1, x2, y2, points) &&
						traverseY(x1, y1, y2, points) && traverseY(x2, y1, y2, points) {
						validRectangles++
					}
				}
			}
		}
	}
	return validRectangles
}