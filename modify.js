
// all the dom selectors here. modify.js is called before app.js so all thsi variables are avialble in app.js also;
const list = document.querySelector('ul');
const form = document.querySelector('#additem');
const modifyTitle = document.getElementById('mod1');
const modifyBody = document.querySelector('#mod2');
const buttonMod = document.querySelector('#buttonMod');
const buttonAdd = document.querySelector('#add');

// grab the id from the hash and cut the # out with substring method
const id = location.hash.substring(1);


//  get the data object from fairebase and print the title to the modify html page. set the title and body input fileds to the data arrived from firebase. 
db.collection('test').get()
.then(snapshot => {
snapshot.forEach(element => {
  
  if (element.id === id) {
  const div = document.querySelector('p');
  const h2 = document.createElement('h2');
  h2.textContent = element.data().title;
  div.appendChild(h2)
  modifyTitle.value = element.data().title;
  modifyBody.value = element.data().body;
  }
  
});
})
.catch(err => {
 console.log(err)
});


// add event listener to modify data, taked from input value and save it to the obj proriety title over the firbase object
modifyTitle.addEventListener('input', function (e) {
    e.preventDefault;
    console.log(e.target.value)

    const timestamp = new Date();

    console.log(timestamp)
    db.collection('test').doc(id).update({
      title: e.target.value,
      updated_at: firebase.firestore.Timestamp.fromDate(timestamp)
    });
    document.querySelector('h2').textContent = e.target.value;
})


// add event listener to modify data, taked from input value and save it to the obj proriety body over the firbase object
modifyBody.addEventListener('input', function (e) {
    e.preventDefault;
    console.log(e)
    const timestamp = new Date();

    db.collection('test').doc(id).update({
    body: e.target.value,
    updated_at: firebase.firestore.Timestamp.fromDate(timestamp)
    });
   
});

// this is to return to index html only. the data is anyway saved because of inputy event - see here up. 
buttonMod.addEventListener('click', (e) => {
  console.log(e)
  location.assign('/index.html')
})

