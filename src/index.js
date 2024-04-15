const { getFirestore, collection, getDocs } = require('firebase/firestore');
const firebaseConfig = require('./firebaseConfig');

const { fromEvent } = require('rxjs');
const { scan, filter } = require('rxjs/operators');

const db = getFirestore();
const colRef = collection(db, 'dishes');

const template = require('./handlebars/index.hbs');
const dishes = [];

getDocs(colRef).then((snapshot) => {

	snapshot.docs.forEach((doc) => {
		dishes.push({...doc.data(), id: doc.id });
	});
	console.log(dishes);
	console.log(dishes[0].name);
	
	const data = {clickCount: dishes[1].name};
	const compiledTemplate = template(data);
	document.getElementById('test').innerHTML = compiledTemplate;
})

const button = document.getElementById('myButton');
const clicks$ = fromEvent(button, 'click');

clicks$.pipe(
	scan(num => num + 1, 0)
).subscribe(count => {
	console.log(count);
	//const data = {clickCount: count};
	//const compiledTemplate = template(data);
	//document.getElementById('test').innerHTML = compiledTemplate;
});

