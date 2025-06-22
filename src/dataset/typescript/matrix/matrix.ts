export class Matrix {

  classRows: number[][];
  classColumns: number[][];
  
  constructor(strMatrix: string) {
    let rowsStr = strMatrix.split('\n');
    this.classRows = [];
    this.classColumns = [];
    
    rowsStr.forEach(rs => {
      this.classRows.push(rs.split(' ').map(c => Number(c)));
    })
    this.classRows.forEach((row, row_idx) => {
      row.forEach((col, col_idx) => {
        let colum = this.classColumns[col_idx] ? this.classColumns[col_idx].slice() : []; 
        colum.push(col);
        this.classColumns[col_idx] = colum;
      })
    })
  }

  get rows(): number[][] {
    return this.classRows;
  }

  get columns(): number[][] {
    return this.classColumns;
  }
}
