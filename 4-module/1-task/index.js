function makeFriendsList(friends) {
  if (friends.length > 0)
  { 
    let ul = document.createElement('UL');
    for (let friend of friends) {
      //method 1
      ul.insertAdjacentHTML('beforeEnd', `<li>${friend.firstName} ${friend.lastName}</li>`);
      //method 2
      //ul.appendChild(document.createElement('LI'))
      //  .appendChild(document.createTextNode(friend.firstName + friend.lastName));
      //method 3
      //ul.appendChild(document.createElement('LI'))
      //  .innerHTML = friend.firstName + friend.lastName;
    }
    return ul;
  }
  return null;
}
