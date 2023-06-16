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
				data.categoryId = categoryId;
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
	let abtn = document.createElement('button')

	data.forEach(function(value) {
		let tr = document.createElement('tr');
		let td = document.createElement('td');
		let exploreTD = document.createElement('td');
		let btn = document.createElement('button')
		td.textContent = `${value.name}`;
		tr.appendChild(td)
		td = document.createElement('td')
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
		btn.addEventListener('click', function(e) {
			e.preventDefault();
			let conventionId = value.id;
			if (!isNaN(conventionId) && conventionId > 0) {
				getconvention(conventionId);
				getImage(conventionId)
				getLocationForConvention(conventionId);
			}
		})
		btn.textContent = 'Explore';
		exploreTD.appendChild(btn);
		tr.appendChild(exploreTD)
		body.appendChild(tr);
	})

	abtn.addEventListener('click', function(e) {
		addForm(data.categoryId);
	})
	abtn.textContent = 'Add Conventions'
	body.appendChild(abtn);
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
	categoryList.forEach(function(value, index) {
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
			console.log(value)
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
			if (xhr.status === 200 || xhr.status === 201) {
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

let editForm = function(categoryId) {
	let div = document.getElementById('editCon');
	let form = document.createElement('form');
	form.name = 'editCategory'
	let input = document.createElement('input')
	input.type = 'text';
	input.id = 'editInput';
	input.setAttribute('placeholder', 'update name')
	form.appendChild(input);
	let btn = document.createElement('button');
	btn.id = categoryId;
	btn.name = 'updateCategory'
	btn.textContent = 'Update'
	btn.addEventListener('click', editCategory);
	form.appendChild(btn)
	div.appendChild(form)
}

let getconvention = function(conventionID) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/conventions/' + conventionID, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.responseText);
				displayConvention(data)
			} else {
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}
	xhr.send();
}

let displayConvention = function(convention) {
	let div = document.getElementById('convention');
	div.textContent = '';
	let h1 = document.createElement('h1');
	let block = document.createElement('blockquote');
	let ul = document.createElement('ul');
	let li = document.createElement('li');
	let btn = document.createElement('button')
	h1.textContent = convention.name
	block.textContent = convention.description
	li.textContent = 'Join us on: ' + convention.date
	ul.appendChild(li);
	li = document.createElement('li');
	li.textContent = 'Starting at: ' + convention.time
	ul.appendChild(li)
	btn.addEventListener('click', function(e) {
		e.preventDefault();
		let conId = convention.id;
		let cateId = convention.category.id
		if (!isNaN(conId) && conId > 0) {
			updateConForm(conId, cateId)
		}
	})
	btn.textContent = 'Update this Convention'

	let locatebtn = document.createElement('button');
	locatebtn.addEventListener('click', function(e) {
		e.preventDefault();
		let conventionId = convention.id
		if (!isNaN(conventionId) && conventionId > 0) {
		} addLocationForm(conventionId)
	})
	locatebtn.textContent = 'Add location'
	let imagebtn = document.createElement('button');
	imagebtn.addEventListener('click', function(e) {
		e.preventDefault();
			let conventionId =  convention.id
		if (!isNaN(conventionId) && conventionId > 0) {
		} imageForm(conventionId)
	})
	imagebtn.textContent = 'Add Image'

	ul.appendChild(li);
	div.appendChild(h1);
	div.appendChild(block);
	div.appendChild(ul);
	div.appendChild(btn);
	div.appendChild(locatebtn);
	div.appendChild(imagebtn)
}

let getImage = function(conventionId) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/images/' + conventionId + '/conventions/', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.responseText);
				displayImages(data)
			} else {
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}
	xhr.send();
}

let displayImages = function(images) {
	let div = document.getElementById('image')
	div.textContent = '';
	images.forEach(function(value) {
		let img = document.createElement('img');
		img.setAttribute('src', value.imageUrl)
		img.textContent = `${value.name}`
		img.setAttribute('width', '200px')
		img.setAttribute('height', '200px')
		div.appendChild(img);
	});
}


let addImage = function(image, conventionId) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/images/' + conventionId + '/conventions', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let data = JSON.parse(xhr.responseText)
				displayImages(data);
			} else {
				console.error("POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}
	image = {
		name: document.addImage.title.value,
		imageUrl: document.addimage.link.value
	};
	let userObjectJson = JSON.stringify(image)
	xhr.send(userObjectJson);
}

let imageForm = function(conventionId) {
	console.log(conventionId)
	let div = document.getElementById('image');
	let form = document.createElement('form');
	form.name = 'addImage'
	let input = document.createElement('input')
	input.type = 'text';
	input.name = 'title'
	input.setAttribute('placeholder', 'add name')
	form.appendChild(input);
	input = document.createElement('input')
	input.type = 'text';
	input.name = 'link'
	input.setAttribute('placeholder', 'link URL')
	form.appendChild(input);
	let btn = document.createElement('button');
	btn.name = 'add'
	btn.textContent = 'Add'
	btn.addEventListener('click', function(e){
		e.preventDefault();
		let image = document.addImage;
		addImage(image, conventionId)
	});
	form.appendChild(btn)
	div.appendChild(form)


}

let addConvention = function(convention, catID) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/conventions/' + catID + '/categories', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let data = JSON.parse(xhr.responseText)
				categoryList();
				displayConvention(data);
			} else {
				console.error("POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}
	convention = {
		name: document.addConvention.convention.value,
		description: document.addConvention.description.value,
		date: document.addConvention.date.value,
		time: document.addConvention.time.value
	};

	let userObjectJson = JSON.stringify(convention);
	xhr.send(userObjectJson);
}

let addForm = function(catID) {
	let div = document.getElementById('convention');
	let fieldset = document.createElement('fieldset');
	div.appendChild(fieldset);
	let legend = document.createElement('legend');
	legend.textContent = 'Add to Our List of Conventions';
	fieldset.appendChild(legend)
	let form = document.createElement('form');
	form.name = 'addConvention'
	let input = document.createElement('input');
	input.type = 'text'
	input.name = 'convention'
	input.setAttribute('placeholder', 'Name of Convention')
	input.setAttribute('requried', '');
	form.appendChild(input)
	input = document.createElement('input');
	input.type = 'text'
	input.name = 'description'
	input.setAttribute('placeholder', 'describe Convention')
	input.setAttribute('requried', '');
	form.appendChild(input)
	input = document.createElement('input');
	input.type = 'text'
	input.name = 'date'
	input.setAttribute('placeholder', 'YYYY-MM-DD')
	form.appendChild(input)
	input = document.createElement('input');
	input.type = 'text'
	input.name = 'time'
	input.setAttribute('placeholder', 'hh:mm:ss')
	form.appendChild(input)
	let btn = document.createElement('button');
	btn.name = 'addCon'
	btn.textContent = 'add'
	btn.addEventListener('click', function(e) {
		e.preventDefault()
		let convention = document.addConvention;
		addConvention(convention, catID);
	})
	form.appendChild(btn)
	fieldset.appendChild(form);
}

let updateConvention = function(convention, conId, cateId) {
	let xhr = new XMLHttpRequest();

	xhr.open('PUT', 'api/conventions/' + conId + '/' + cateId + '/categories', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let data = JSON.parse(xhr.responseText)
				displayConvention(data);
			} else {
				console.error("PUT request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}
	convention = {
		name: document.update.conventionUpdated.value,
		description: document.update.description.value,
		date: document.update.date.value,
		time: document.update.time.value
	};

	let userObjectJson = JSON.stringify(convention);
	xhr.send(userObjectJson);
}

let updateConForm = function(conId, cateId) {
	let div = document.getElementById('convention');
	let fieldset = document.createElement('fieldset');
	div.appendChild(fieldset);
	let legend = document.createElement('legend');
	legend.textContent = 'Update this convention';
	fieldset.appendChild(legend)
	let form = document.createElement('form');
	form.name = 'update'
	let input = document.createElement('input');
	input.type = 'text'
	input.name = 'conventionUpdated'
	input.setAttribute('placeholder', 'Name of Convention')
	input.setAttribute('required', '');
	form.appendChild(input)
	input = document.createElement('input');
	input.type = 'text'
	input.name = 'description'
	input.setAttribute('placeholder', 'describe Convention')
	input.setAttribute('required', '');
	form.appendChild(input)
	input = document.createElement('input');
	input.type = 'text'
	input.name = 'date'
	input.setAttribute('placeholder', 'YYYY-MM-DD')
	form.appendChild(input)
	input = document.createElement('input');
	input.type = 'text'
	input.name = 'time'
	input.setAttribute('placeholder', 'hh:mm:ss')
	form.appendChild(input)
	let btn = document.createElement('button');
	btn.name = 'updateCon'
	btn.textContent = 'update'
	btn.addEventListener('click', function(e) {
		e.preventDefault()
		let updatedCon = document.update;
		updateConvention(updatedCon, conId, cateId)
	});
	form.appendChild(btn)
	fieldset.appendChild(form);
}


let getLocationForConvention = function(conventionId) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/conventions/' + conventionId + '/locations', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.responseText);
				data.conventiondId = conventionId
				displayLocation(data)
			} else {
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}
	xhr.send();
}

let displayLocation = function(location) {
	let div = document.getElementById('location')
	div.textContent = '';
	let ul = document.createElement('ul');
		location.forEach(function(value) {
			let li = document.createElement('li');
			li.textContent = `${value.address}` + ',' + `${value.city}` + ',' + `${value.state}`;
			ul.appendChild(li);
		});
		div.appendChild(ul);
}

let displaySinlgeLocation = function(location) {
	let arr = [];
	arr.push(location)
	displayLocation(arr);
}

let addLocation = function(location, conventionId) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/locations/' + conventionId + '/conventions', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let data = JSON.parse(xhr.responseText)
				data.conventionId = conventionId;
					displayLocation(data)
			} else {
				console.error("POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}
	location = {
		state: document.addLocation.state.value,
		city: document.addLocation.city.value,
		address: document.addLocation.address.value
	};
	let userObjectJson = JSON.stringify(location);
	xhr.send(userObjectJson);
}

let addLocationForm = function(conventionId) {
	let div = document.getElementById('editCon');
	let form = document.createElement('form');
	form.name = 'addLocation'
	let input = document.createElement('input')
	input.type = 'text';
	input.name = 'state';
	input.setAttribute('placeholder', 'add state')
	input.setAttribute('required', '');
	form.appendChild(input);

	input = document.createElement('input')
	input.type = 'text';
	input.name = 'city';
	input.setAttribute('placeholder', 'add city')
	input.setAttribute('required', '');
	form.appendChild(input);

	input = document.createElement('input')
	input.type = 'text';
	input.name = 'address';
	input.setAttribute('placeholder', 'add address')
	form.appendChild(input);

	let btn = document.createElement('button');
	btn.name = 'addLocation'
	btn.textContent = 'Add'
	btn.addEventListener('click', function(e) {
		e.preventDefault();
		let location = document.addLocation;
		addLocation(location, conventionId)
	});
	form.appendChild(btn)
	div.appendChild(form)
}


let updateLocation = function(e) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/locations/' + e.target.id, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.responseText)
				displayConventionList(data);
			} else {
				console.error("PUT request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}
	let location = {
		state: document.getElementById('state').value,
		city: document.getElementById('city').value,
		address: document.getElementById('address').value,
	};

	let userObjectJson = JSON.stringify(location);
	xhr.send(userObjectJson);

}


let updateLocationForm = function(locationId) {
	let div = document.getElementById('editCon');
	let form = document.createElement('form');
	form.name = 'editLocation'
	let input = document.createElement('input')
	input.type = 'text';
	input.id = 'state';
	input.setAttribute('placeholder', 'update state')
	input.setAttribute('required', '');
	form.appendChild(input);

	input = document.createElement('input')
	input.type = 'text';
	input.id = 'city';
	input.setAttribute('placeholder', 'update city')
	input.setAttribute('required', '');
	form.appendChild(input);

	input = document.createElement('input')
	input.type = 'text';
	input.id = 'address';
	input.setAttribute('placeholder', 'update address')
	form.appendChild(input);

	let btn = document.createElement('button');
	btn.id = locationId;
	btn.name = 'updateLocation'
	btn.textContent = 'Update'
	btn.addEventListener('click', updateLocation);
	form.appendChild(btn)
	div.appendChild(form)

}

let deleteLocation = function() {

}


