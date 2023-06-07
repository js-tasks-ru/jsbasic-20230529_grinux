// function getMinMax(str) {
//   let arr = str.split(' ');
//   let num_arr = arr.filter(item => {
//     return isFinite(item) && !isNaN(item);
//   });
//   num_arr.sort((a, b) => {
//     return a - b;
//   });
//   return {min: +num_arr[0], max: +num_arr[num_arr.length - 1]}
// }

//вверху выглядит более читаемо, но кажется в js принято делать так, как внизу?

function getMinMax(str) {
 let num_arr = str.split(' ').filter(item => {
    return isFinite(item) && !isNaN(item);
  }).sort((a, b) => {
    return a - b;
  });
  return {min: +num_arr[0], max: +num_arr[num_arr.length - 1]}
}