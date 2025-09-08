var Triangle = function (nRows) {
  this.rows = [];
  let row = [1];
  for (let i = 0; i < nRows; i++) {
    this.rows.push(row);
    this.lastRow = row;
    row = next_row(row);
  }
};

function next_row(current_row) {
  const row = new Array(current_row.length + 1);
  row[0] = 1;
  row[row.length - 1] = 1;
  for (let j = 1; j < current_row.length; j++) {
    row[j] = current_row[j - 1] + current_row[j];
  }
  return row;
}

export default Triangle;