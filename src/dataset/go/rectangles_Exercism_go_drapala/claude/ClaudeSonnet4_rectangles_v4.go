package rectangles

import (
	"sort"
)

type board struct {
	width, height int
	points        map[coord]string
}

func (b *board) filter(c string) coordslice {
	filtered := make(coordslice, 0, len(b.points)/4)
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
func (c coordslice) Swap(i, j int) { c[i], c[j] = c[j], c[i] }

func intersection(s1, s2 []int) []int {
	if len(s1) == 0 || len(s2) == 0 {
		return nil
	}
	
	var shorter, longer []int
	if len(s1) <= len(s2) {
		shorter, longer = s1, s2
	} else {
		shorter, longer = s2, s1
	}
	
	hash := make(map[int]bool, len(shorter))
	for _, e := range shorter {
		hash[e] = true
	}
	
	seen := make(map[int]bool)
	inter := make([]int, 0, len(shorter))
	for _, e := range longer {
		if hash[e] && !seen[e] {
			inter = append(inter, e)
			seen[e] = true
		}
	}
	return inter
}

func removeDups(elements []int) []int {
	if len(elements) <= 1 {
		return elements
	}
	
	encountered := make(map[int]bool, len(elements))
	nodups := make([]int, 0, len(elements))
	for _, element := range elements {
		if !encountered[element] {
			nodups = append(nodups, element)
			encountered[element] = true
		}
	}
	return nodups
}

func traverseX(x1, x2, y int, points map[coord]string) bool {
	for x := x1 + 1; x < x2; x++ {
		char := points[coord{x, y}]
		if char != "-" && char != "+" {
			return false
		}
	}
	return true
}

func traverseY(x, y1, y2 int, points map[coord]string) bool {
	for y := y1 + 1; y < y2; y++ {
		char := points[coord{x, y}]
		if char != "|" && char != "+" {
			return false
		}
	}
	return true
}

func Count(diagram []string) int {
	if len(diagram) == 0 {
		return 0
	}
	
	height := len(diagram)
	width := 0
	for _, line := range diagram {
		if len(line) > width {
			width = len(line)
		}
	}
	
	if width == 0 {
		return 0
	}
	
	points := make(map[coord]string, height*width)
	groupByX := make(map[int][]int)
	
	for y, line := range diagram {
		for x, char := range line {
			c := coord{x, y}
			charStr := string(char)
			points[c] = charStr
			if charStr == "+" {
				groupByX[x] = append(groupByX[x], y)
			}
		}
	}
	
	validRectangles := 0
	
	for x1 := 0; x1 < width-1; x1++ {
		ys1 := groupByX[x1]
		if len(ys1) < 2 {
			continue
		}
		
		for x2 := x1 + 1; x2 < width; x2++ {
			ys2 := groupByX[x2]
			if len(ys2) < 2 {
				continue
			}
			
			intersections := intersection(ys1, ys2)
			if len(intersections) < 2 {
				continue
			}
			
			for i := 0; i < len(intersections)-1; i++ {
				y1 := intersections[i]
				for j := i + 1; j < len(intersections); j++ {
					y2 := intersections[j]
					
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
	
	return validRectangles
}