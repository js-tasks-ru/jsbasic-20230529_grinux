/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */

//mapping array can be changed at user side
const thead_map = {
   name:   'Имя', 
   age:    'Возраст',
   salary: 'Зарплата',  
   city:   'Город' 
};

// without getter
//export default class UserTable {
export class UserTable1 {  
  constructor(rows) {
    if (!rows.length)
      return;
    this.elem = document.createElement('table');
    let thead = this.elem.appendChild(document.createElement('thead'));
    let tbody = this.elem.appendChild(document.createElement('tbody'));
    let tr = thead.appendChild(document.createElement('tr'));

    for (let row_name of Object.getOwnPropertyNames(rows[0]))
    {//make row names
      if (thead_map[row_name])
       row_name = thead_map[row_name];
      tr.insertAdjacentHTML('beforeEnd', `<th>${row_name}</th>`);
    }
    tr.insertAdjacentHTML('beforeEnd', `<th></th>`); //trailing empty cell
    for (let item of rows)
    {
      tr = tbody.appendChild(document.createElement('tr'));
      for (let prop in item)
        tr.insertAdjacentHTML('beforeEnd', `<td>${item[prop]}</td>`);
      tr.insertAdjacentHTML('beforeEnd', `<td><button>X</button></td>`);
    }
    tbody.addEventListener('click', event => {
      tr = event.target.closest('button');
      if (tr) 
      {
        tr = tr.closest('tr');
        if (tr) 
        {
          tr.innerHTML = '';
          tr.remove();
        }
      }
    });
  }
}

//using getter for elem
export default class UserTable {
  constructor(rows) {
    if (!rows.length)
      return;
    this._elem = document.createElement('table');
    let thead = this.elem.appendChild(document.createElement('thead'));
    let tbody = this.elem.appendChild(document.createElement('tbody'));
    let tr = thead.appendChild(document.createElement('tr'));

    for (let row_name of Object.getOwnPropertyNames(rows[0]))
    {//make row names
      if (thead_map[row_name])
       row_name = thead_map[row_name];
      tr.insertAdjacentHTML('beforeEnd', `<th>${row_name}</th>`);
    }
    tr.insertAdjacentHTML('beforeEnd', `<th></th>`); //trailing empty cell
    for (let item of rows)
    {
      tr = tbody.appendChild(document.createElement('tr'));
      for (let prop in item)
        tr.insertAdjacentHTML('beforeEnd', `<td>${item[prop]}</td>`);
      tr.insertAdjacentHTML('beforeEnd', `<td><button>X</button></td>`);
    }
    tbody.addEventListener('click', event => {
      tr = event.target.closest('button');
      if (tr) 
      {
        tr = tr.closest('tr');
        if (tr) 
        {
          tr.innerHTML = '';
          tr.remove();
        }
      }
    });
  }
  get elem()
  {
    return this._elem;
  }
}
