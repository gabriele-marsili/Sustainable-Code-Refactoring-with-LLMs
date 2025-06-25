//
// This is only a SKELETON file for the 'Pascals Triangle' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const rows = (n) => {
  let triangle = [];
  if (n == 0) {
    return triangle
  }
  let row = 0;
  for (let r = 1; r <= n; r++) {
    triangle.push([])
    if (r == 1) {      
      triangle[row].push(r);
    } else {
      for (let x = 0; x < r; x++) {
        if (x == 0) {
          triangle[row].push(triangle[row-1][0]);
        } else if (row == 1) {
          triangle[row].push(triangle[row-1][0]);
        } else {
          if (x < row) {
            triangle[row].push(triangle[row-1][x-1]+triangle[row-1][x]);
          } else {
            triangle[row].push(triangle[row-1][x-1])
          }
        }
      }
    }
    // console.log(triangle)
    row++
  }
  return triangle
};
