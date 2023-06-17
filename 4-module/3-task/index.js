function highlight(table) 
{
  //optional indexes calculations
  let age_idx, gender_idx, status_idx;
  let thead = table.tHead.children[0].children;

  for (let idx = 0; idx < thead.length; idx++) {
    if (thead[idx].innerHTML === 'Age')
      age_idx = idx;
    else if (thead[idx].innerHTML === 'Gender')
      gender_idx = idx;
    else if (thead[idx].innerHTML === 'Status')
      status_idx = idx;
  }
  if (age_idx && gender_idx && status_idx) 
  { //we can access cells directly e.g. item.children[1] etc
    //but using indexes we save integrity if table schema is changed
    for (let item of table.tBodies[0].children) {
      if (+item.children[age_idx].innerHTML < 18)
        item.style.cssText = "text-decoration: line-through";
      else
        item.classList.add('female');
      if (item.children[gender_idx].innerHTML == 'm')
        item.classList.add('male');
      else
        item.classList.add('female');
      if (item.children[status_idx].hasAttribute("data-available")) {
        if (item.children[status_idx].getAttribute("data-available") == 'true')
          item.classList.add('available');
        else
          item.classList.add('unavailable');
      }
      else
        item.hidden = true;
    }
  }
  else
    alert('Mailformed table!');
}
