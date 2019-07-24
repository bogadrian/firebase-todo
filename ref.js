
// create a function which takes in the body of the todo. split the body into an array of words and push every word into a nea array till the limit is reached. then join the array into a string again and return it. if the body length is under the limit return only the body without modification 
const limitWordsBody = function (body, limit = 40) {

  newBody = [];
  if (body.length > limit) {
    body.split(' ').reduce((acc, curr) => {
      if (acc + curr.length <= limit) {
        newBody.push(curr);
      }
      return acc + curr.length;
    }, 0)
      return `${newBody.join(' ')} ...`;
  }
      return body;
};

// ad todo to the index page. create a a tag to be able to click on the todo title and take you to the modify page for that todo. append all html to the list (ul)
const addItem = function (item, id) {
 // let time = item.created_at.toDate();
 const time = moment(item.created_at.toDate()).fromNow();
 const timeUpdated = moment(item.updated_at.toDate()).fromNow();
 //console.log(timeUpdated)
   const html = `
     <li data-id="${id}">
     <a href="/modify.html#${id}">${item.title}</a>
     <div class="body-inserted">${limitWordsBody(item.body)}</div>
     <div>Created: ${time}</diV>
     <div>Updated: ${timeUpdated}</diV>
     <button class="btn btn-danger btn-sm m delete">Delete</button>
     <button class="btn btn-danger btn-sm m modify">Edit Todo</button>
     </br>
     </br>
     </li>
   `;
   list.innerHTML += html;
 };

 // remove todo function, this is only for the dom delete, the firbase was already deleted at thsi point - see where the function is called 
const removeItem = function (id) {
  const element = document.querySelectorAll('li');
  element.forEach(lis => {
    if (lis.getAttribute('data-id') === id) {
      lis.remove();
    }
  })
}


// specific firbase event onSnapshoot; this event takes a "picture" of the database at a specific moment in time and return the data as it is then. then call add item function in order to display the todo list to the dom as it is at one moment in time. tehn call the remove function if the todo was already removed from firebase in order to remove it from the dom. 
db.collection('test')
.orderBy('updated_at')
.onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    const doc = change.doc;
    if (change.type === 'added') {
        addItem(doc.data(), doc.id);   
    }else if (change.type === 'removed') {
        removeItem(doc.id);
    }
  })
})

