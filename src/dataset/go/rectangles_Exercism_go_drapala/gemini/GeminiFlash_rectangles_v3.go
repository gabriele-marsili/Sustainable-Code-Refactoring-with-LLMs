package rectangles

import (
	"sort"
)

type board struct {
	width, height int
	points        map[coord]string
}

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

type coord struct {
	x, y int
}

type coordslice []coord

type rectangle struct {
	x [2]int
	y [2]int
}

func (c coordslice) Len() int { return len(c) }

func (c coordslice) Less(i, j int) bool {
	if c[i].x != c[j].x {
		return c[i].x < c[j].x
	}
	return c[i].y < c[j].y
}

func (c coordslice) Swap(i, j int) {
	c[i], c[j] = c[j], c[i]
}

func intersection(s1, s2 []int) []int {
	inter := make([]int, 0)
	set := make(map[int]bool)

	for _, val := range s1 {
		set[val] = true
	}

	for _, val := range s2 {
		if set[val] {
			inter = append(inter, val)
			set[val] = false // Prevent duplicates in the result
		}
	}

	return inter
}

func traverseX(x1, x2, y int, points map[coord]string) bool {
	for x := x1 + 1; x < x2; x++ {
		p := points[coord{x, y}]
		if p != "-" && p != "+" {
			return false
		}
	}
	return true
}

func traverseY(x, y1, y2 int, points map[coord]string) bool {
	for y := y1 + 1; y < y2; y++ {
		p := points[coord{x, y}]
		if p != "|" && p != "+" {
			return false
		}
	}
	return true
}

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
	for x1 := 0; x1 < width; x1++ {
		y1s, ok1 := groupByX[x1]
		if !ok1 || len(y1s) < 1 {
			continue
		}
		for x2 := x1 + 1; x2 < width; x2++ {
			y2s, ok2 := groupByX[x2]
			if !ok2 || len(y2s) < 1 {
				continue
			}

			intersections := intersection(y1s, y2s)
			if len(intersections) < 2 {
				continue
			}

			for i := 0; i < len(intersections); i++ {
				for j := i + 1; j < len(intersections); j++ {
					y1, y2 := intersections[i], intersections[j]
					if y1 > y2 {
						y1, y2 = y2, y1
					}

					if traverseX(x1, x2, y1, points) && traverseX(x1, x2, y2, points) && traverseY(x1, y1, y2, points) && traverseY(x2, y1, y2, points) {
						validRectangles++
					}
				}
			}
		}
	}

	return validRectangles
}