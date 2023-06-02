function truncate(str, maxlength) {
  if (str.length <= maxlength)
    return str;
  let str_tr = '';
  for (i = 0; i < maxlength - 1; i++)
    str_tr = str_tr + str[i];
  str_tr = str_tr + '…';
  return str_tr;
}
