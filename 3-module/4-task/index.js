function showSalary(users, age) {
  let users_list = '';
  users.forEach(item => {
    if (item.age <= age)
    {
      if (users_list !== '')
        users_list += '\n';
      users_list += item.name + ', ' + item.balance;
    }
  });
  return users_list;
}