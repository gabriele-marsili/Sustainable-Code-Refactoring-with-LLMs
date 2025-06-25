export class SpiralMatrix {
  static ofSize(n) {
    const spiral = []
    if (n == 0) {
      return spiral
    }
  
    let numbers = []
    for (let x = 1; x <= n*n; x++) {
      numbers.push(x)
    }
    let z = 0
    let s = []
    for (let x = 0; x < n; x++) {
      s = []
      for (let y = 0; y < n; y++) {
        s.push(numbers[0])
        z++
      }
      spiral.push(s)
    }
    // console.log(spiral)
    let matrix = spiral
    let a = 0, b = 0
    let direction = "right"
    let r = n, btm =n, t = 0, lft = 0
    for (let y = 1; y <= n*n; y++) {
      
      matrix[a][b] = y
  
      if (direction == "right" && b < r) {
        b++
        if (b == r) {
          b = r - 1
  
          direction = "down"
        }
      }
      if (direction == "down" && a < btm) {
        a++
        if (a == btm) {
          a = btm - 1
          direction = "left"
        }
      }
      if (direction == "left" && b >= lft) {
        b--
        if (b < lft) {
          b = lft
          direction = "up"
          btm--
        }
      }
  
      if (b == lft && direction == "up") {
        a--
        if (a == t) {
          t++
          a = t
          r--
  
          b++
          direction = "right"
          lft++
        }
      }
    }
    return matrix
  }
  }
