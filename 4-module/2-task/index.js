function makeDiagonalRed(table) {
  let make_red_idx = 0;
  for (let row of table.rows)
  {
    if (make_red_idx < row.cells.length)
     row.cells[make_red_idx++].style.backgroundColor = 'red';
    else
    {
     alert("Mailformed table!");
     break;
    } 
  }
}
