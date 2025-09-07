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
	filtered := make(coordslice, 0)
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
	hash := make(map[int]bool, len(s1))
	for _, e := range s1 {
		hash[e] = true
	}
	inter := make([]int, 0)
	for _, e := range s2 {
		if hash[e] {
			inter = append(inter, e)
		}
	}

	if len(inter) > 1 {
		sort.Ints(inter)
		j := 0
		for i := 1; i < len(inter); i++ {
			if inter[i] != inter[j] {
				j++
				inter[j] = inter[i]
			}
		}
		inter = inter[:j+1]
	}

	return inter
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
	points := make(map[coord]string, width*height)

	for y, line := range diagram {
		for x, char := range line {
			points[coord{x, y}] = string(char)
		}
		if len(line) > width {
			width = len(line)
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
	for x1 := 0; x1 < width-1; x1++ {
		yList1 := groupByX[x1]
		if len(yList1) < 2 {
			continue
		}
		for x2 := x1 + 1; x2 < width; x2++ {
			yList2 := groupByX[x2]
			if len(yList2) < 2 {
				continue
			}

			intersections := intersection(yList1, yList2)
			if len(intersections) >= 2 {
				for left := 0; left < len(intersections)-1; left++ {
					y1 := intersections[left]
					for right := left + 1; right < len(intersections); right++ {
						y2 := intersections[right]

						if traverseX(x1, x2, y1, points) &&
							traverseX(x1, x2, y2, points) &&
							traverseY(x1, y1, y2, points) &&
							traverseY(x2, y1, y2, points) {
							validRectangles++
						}
					}
				}
			}
		}
	}

	return validRectangles
}