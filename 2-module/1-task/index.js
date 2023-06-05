function sumSalary(salaries) {
  let sum = 0;
  for (let key in salaries)
    if (isFinite(salaries[key]) && !isNaN(salaries[key]))
      sum += salaries[key];
  return sum;   
}
