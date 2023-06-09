window.addEventListener('load', function(e) {
	console.log('document loaded');
	categoryList();
	run()
});

let run = function() {

	document.categoryForm.addCategory.addEventListener('click', function(e) {
		e.preventDefault();
		let category = document.categoryForm;
		addCategory(category);
	})

}

let getConventionForCategory = function(categoryId) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/categories/' + categoryId + '/conventions', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.responseText);
				displayConventionList(data)
			} else {
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}
	xhr.send();
}

let displayConventionList = function(data) {
	let body = document.getElementById('body');
	body.textContent = '';
		data.forEach(function(value) {
			let tr = document.createElement('tr');
			let td = document.createElement('td');
			td.textContent = `${value.name}`;
			tr.appendChild(td)
			td = document.createElement('td');
			td.textContent = `${value.description}`
			tr.appendChild(td)
			td = document.createElement('td');
			td.textContent = `${value.date}`
			tr.appendChild(td)
			td = document.createElement('td');
			td.textContent = `${value.time}`
			tr.appendChild(td)
			td = document.createElement('td');
			value.locations.forEach(function(value) {
				let td = document.createElement('td');
				td = document.createElement('td');
				td.textContent = `${value.state}`
				tr.appendChild(td);
				td = document.createElement('td');
				td.textContent = `${value.city}`
				tr.appendChild(td);
				td = document.createElement('td');
				td.textContent = `${value.address}`
				tr.appendChild(td);
			})
			tr.appendChild(td)
			body.appendChild(tr);
		})
}

let categoryList = function() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/categories', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.responseText);
				displayCategoryList(data)

			} else {
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}
	xhr.send();
}

let displayCategoryList = function(categoryList) {
	let body = document.getElementById('body');
	categoryList.forEach(function(value, index, array) {
		let tr = document.createElement('tr');
		let td = document.createElement('td');
		let tD = document.createElement('td')
		let viewTD = document.createElement('td');
		let a = document.createElement('button');
		let editTD = document.createElement('td')
		let editA = document.createElement('button')
		tD.textContent = index + 1
		tr.appendChild(tD)
		td.textContent = `${value.name}` + ' id:' + `${value.id}`
		tr.appendChild(td);
		a.addEventListener('click', function(e) {
			e.preventDefault();
			let categoryId = value.id;
			if (!isNaN(categoryId) && categoryId > 0) {
				getConventionForCategory(categoryId);
			}
		})
		a.textContent = 'View';
		viewTD.appendChild(a);
		editA.addEventListener('click', function(e) {
			e.preventDefault();
			let categoryId = value.id;
			if (!isNaN(categoryId) && categoryId > 0) {
				editForm(categoryId)
			}
		})
		editA.textContent = 'Edit';
		editTD.appendChild(editA);
		editTD.appendChild(editA);
		tr.appendChild(editTD)
		tr.appendChild(viewTD);
		body.appendChild(tr);

	})
}

let addCategory = function(category) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/categories', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.responseText)
				displayCategoryList(data);
			} else {
				console.error("POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}
	category = {
		name: document.categoryForm.name.value,
	};

	let userObjectJson = JSON.stringify(category);
	xhr.send(userObjectJson);
}

let editCategory = function(e) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/categories/' + e.target.id, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.responseText)
					displayCategoryList(data);
			} else {
				console.error("PUT request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}
let category = {
		name: document.getElementById('editInput').value
	};

	let userObjectJson = JSON.stringify(category);
	xhr.send(userObjectJson);
}

let editForm = function(categoryId){
	let div = document.getElementById('editCon');
	let form = document.createElement('form');
	form.name='editCategory'
	let input = document.createElement('input')
	input.type ='text';
	input.id ='editInput';
	input.setAttribute('placeholder', 'Fix this Categories name')
	form.appendChild(input);
	let btn = document.createElement('button');
	btn.id = categoryId;
	btn.name='updateCategory'
	btn.textContent='Update'
	btn.addEventListener('click', editCategory);
	form.appendChild(btn)
	div.appendChild(form)
}