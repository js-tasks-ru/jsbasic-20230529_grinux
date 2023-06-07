function camelize(str) {
  let arr = str.split('');
  let idx;
  for (;;) {
    idx = arr.indexOf('-');
    if (idx === -1)
      break;
    if (idx + 1 < arr.length) //check for trailing '-'
    {
      arr[idx + 1] = arr[idx + 1].toUpperCase();
      arr.splice(idx, 1);
    }
  }
  return arr.join('');
}