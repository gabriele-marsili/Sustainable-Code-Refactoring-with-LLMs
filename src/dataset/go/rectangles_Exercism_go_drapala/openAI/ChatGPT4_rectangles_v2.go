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

// Find the intersection of two sorted lists
func intersection(s1, s2 []int) []int {
	inter := make([]int, 0, len(s1))
	i, j := 0, 0
	for i < len(s1) && j < len(s2) {
		if s1[i] == s2[j] {
			inter = append(inter, s1[i])
			i++
			j++
		} else if s1[i] < s2[j] {
			i++
		} else {
			j++
		}
	}
	return inter
}

// Traverses the X axis and checks for valid characters
func traverseX(x1, x2, y int, points map[coord]string) bool {
	for x := x1 + 1; x < x2; x++ {
		if points[coord{x, y}] != "-" && points[coord{x, y}] != "+" {
			return false
		}
	}
	return true
}

// Traverses the Y axis and checks for valid characters
func traverseY(x, y1, y2 int, points map[coord]string) bool {
	for y := y1 + 1; y < y2; y++ {
		if points[coord{x, y}] != "|" && points[coord{x, y}] != "+" {
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

	for _, ys := range groupByX {
		sort.Ints(ys)
	}

	validRectangles := 0
	for x1 := 0; x1 < width; x1++ {
		for x2 := x1 + 1; x2 < width; x2++ {
			if groupByX[x1] != nil && groupByX[x2] != nil {
				intersections := intersection(groupByX[x1], groupByX[x2])
				for left := 0; left < len(intersections); left++ {
					for right := left + 1; right < len(intersections); right++ {
						y1, y2 := intersections[left], intersections[right]
						if traverseX(x1, x2, y1, points) && traverseX(x1, x2, y2, points) &&
							traverseY(x1, y1, y2, points) && traverseY(x2, y1, y2, points) {
							validRectangles++
						}
					}
				}
			}
		}
	}
	return validRectangles
}