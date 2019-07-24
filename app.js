
// event handeler for add todo; creates the obj todo and saves it to firebase
  form.addEventListener('submit', e => {
    e.preventDefault();
    const time = new Date();
    const item = {
      title: e.target.elements.recepie.value,
      body: '',
      created_at: firebase.firestore.Timestamp.fromDate(time),
      updated_at: firebase.firestore.Timestamp.fromDate(time)
    };
    e.target.elements.recepie.value = '';
    db.collection('test').add(item)
     .then(() => {
       console.log('item added');
     })
     .catch(err => {
       console.log(err)
     });
  }); 

  // event handeler to delete todo. takes the id from data-id attribute of li. 
  list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
      console.log(e.target.parentElement)
      const id = e.target.parentElement.getAttribute('data-id')
      db.collection('test').doc(id).delete()
       .then(() => {
         console.log('item deleted');
       })
       .catch(err => {
         console.log(err)
       });
    }
  });

  // event handeler foring a todo. takes data from data-id attribute from li and then calls location assign with the has id; 
  list.addEventListener('click', e => {
    if (e.target.classList.contains('modify')) {
      console.log(e.target.parentElement)
      const id = e.target.parentElement.getAttribute('data-id')
     console.log(id)
     location.assign(`/modify.html#${id}`)
    }
  });

  