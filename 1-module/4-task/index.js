function checkSpam(str) {
  str_lc = '';
  for (i = 0; i < str.length; i++)
    str_lc = str_lc + str[i].toLowerCase(); 
  return (str_lc.includes('1xbet now') || str_lc.includes('free xxxxx'))
}
