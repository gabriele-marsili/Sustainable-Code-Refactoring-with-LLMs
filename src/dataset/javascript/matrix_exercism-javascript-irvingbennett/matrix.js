//
// This is only a SKELETON file for the 'Matrix' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

import { Number } from "core-js"

export class Matrix {
  matrix_ = []
  constructor(m) {
    // console.log(m, typeof m)
    let rows = m.split("\n")
    // console.log(rows, typeof rows)
    for (let n in rows) {
      let cols = rows[n].split(" ")
      // console.log(cols, typeof cols)
      let row = []
      for (let m in cols) {
        // console.log(m, typeof m)
        row.push(parseInt(cols[m]))
      }
      this.matrix_.push(row)
    }
    // console.log(this.matrix_)
  }

  get rows() {
    let rows_ = []
    for (let n in this.matrix_) {
      rows_.push(this.matrix_[n])
    }
    return rows_
  }

  get columns() {
    return this.matrix_[0].map((_, c) => this.matrix_.map(r => r[c]));
  }
}
