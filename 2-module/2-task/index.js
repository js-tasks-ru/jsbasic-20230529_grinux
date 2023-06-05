function isEmpty(obj) {
  let prop_num = 0;
  for (let key in obj)
    prop_num++;
  return (prop_num == 0);
}
