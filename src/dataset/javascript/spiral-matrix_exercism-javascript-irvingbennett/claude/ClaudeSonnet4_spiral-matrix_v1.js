export class SpiralMatrix {
  static ofSize(n) {
    if (n === 0) {
      return []
    }
    
    const matrix = Array(n).fill().map(() => Array(n))
    
    let top = 0, bottom = n - 1, left = 0, right = n - 1
    let num = 1
    
    while (top <= bottom && left <= right) {
      // Fill top row
      for (let col = left; col <= right; col++) {
        matrix[top][col] = num++
      }
      top++
      
      // Fill right column
      for (let row = top; row <= bottom; row++) {
        matrix[row][right] = num++
      }
      right--
      
      // Fill bottom row
      if (top <= bottom) {
        for (let col = right; col >= left; col--) {
          matrix[bottom][col] = num++
        }
        bottom--
      }
      
      // Fill left column
      if (left <= right) {
        for (let row = bottom; row >= top; row--) {
          matrix[row][left] = num++
        }
        left++
      }
    }
    
    return matrix
  }
}