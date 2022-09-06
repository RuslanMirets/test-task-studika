export function isWebp() {
	function testWebP(callback) {
		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src =
			'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
	}

	testWebP(function (support) {
		// if (support == true) {
		// 	document.querySelector('body').classList.add('webp');
		// } else {
		// 	document.querySelector('body').classList.add('no-webp');
		// }
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}

export function search() {
	// var search = document.getElementById('search');
	// var close = document.getElementById('close');
	// var resultSearch = document.getElementById('result-search');

	// search.addEventListener('input', (event) => {
	// 	if (event.target.value.length > 0) {
	// 		close.classList.add('active');
	// 	} else {
	// 		close.classList.remove('active');
	// 	}
	// });
	// close.addEventListener('click', (event) => {
	// 	search.value = '';
	// 	close.classList.remove('active');
	// });
	// search.addEventListener('focus', (event) => {
	// 	resultSearch.classList.add('active');
	// });
	// search.addEventListener('blur', (event) => {
	// 	resultSearch.classList.remove('active');
	// });

	// Fetch search data
	// fetch('../../files/data-search.json')
	// 	.then((response) => {
	// 		return response.json();
	// 	})
	// 	.then((data) => {
	// 		appendData(data);
	// 	})
	// 	.catch((error) => {
	// 		console.log('Error: ' + error);
	// 	});

	// const appendData = (data) => {
	// 	data.sort((a, b) => parseFloat(b.views) - parseFloat(a.views));

	// 	var mainContainer = document.getElementById('result-list');
	// 	for (var i = 0; i < 4; i++) {
	// 		var li = document.createElement('li');
	// 		li.setAttribute('class', 'result-search__list-item');

	// 		var link = document.createElement('a');
	// 		link.setAttribute('href', data[i].href);
	// 		link.setAttribute('class', 'result-search__list-link');

	// 		var title = document.createElement('span');
	// 		title.setAttribute('class', 'result-search__list-link-title');
	// 		title.innerHTML = data[i].title;

	// 		var category = document.createElement('span');
	// 		category.setAttribute('class', 'result-search__list-link-category');
	// 		category.innerHTML = data[i].category;

	// 		if (data[i].check === true) {
	// 			var checkIcon = document.createElement('img');
	// 			checkIcon.setAttribute('src', '@images/check.svg');
	// 			checkIcon.setAttribute('alt', 'Check');
	// 			title.appendChild(checkIcon);
	// 		}

	// 		if (data[i].error === true) {
	// 			var errorIcon = document.createElement('img');
	// 			errorIcon.setAttribute('src', '@images/error.svg');
	// 			errorIcon.setAttribute('alt', 'Error');
	// 			title.appendChild(errorIcon);
	// 		}

	// 		link.appendChild(title);
	// 		link.appendChild(category);
	// 		li.appendChild(link);
	// 		mainContainer.appendChild(li);
	// 	}
	// };

	// New fetch search data
	const resultItemTemplate = document.querySelector('[data-result-template]');
	const resultItemContainer = document.querySelector('[data-result-container]');
	const searchInput = document.querySelector('[data-search]');

	let results = [];

	searchInput.addEventListener('input', (e) => {
		const value = e.target.value.toLowerCase();
		if (value != '') {
			results.forEach((result) => {
				// const isVisible = result.title.toLowerCase().includes(value);
				// result.element.classList.toggle('hide', !isVisible);
				let titleValue = result.title.toLowerCase().search(value);
				if (titleValue == -1) {
					result.element.classList.add('hide');
					result.titleElem.innerHTML = result.titleElem.innerText;
				} else {
					result.element.classList.remove('hide');
					let str = result.title;
					result.titleElem.innerHTML = insertMark(
						str,
						titleValue,
						value.length,
					);
				}
			});
		} else {
			results.forEach((result) => {
				result.element.classList.remove('hide');
				result.titleElem.innerHTML = result.title;
			});
		}
	});

	fetch('../../files/data-search.json')
		.then((response) => response.json())
		.then((data) => {
			results = data.map((result) => {
				const item = resultItemTemplate.content.cloneNode(true).children[0];
				const title = item.querySelector('[data-title]');
				const category = item.querySelector('[data-category]');
				const image = item.querySelector('[data-image]');

				title.textContent = result.title;
				category.textContent = result.category;
				if (result.check === true) {
					image.setAttribute('src', '@images/check.svg');
					image.setAttribute('alt', 'Check');
				}
				if (result.error === true) {
					image.setAttribute('src', '@images/error.svg');
					image.setAttribute('alt', 'Error');
				}
				resultItemContainer.append(item);

				return { title: result.title, element: item, titleElem: title };
			});
		});

	const insertMark = (string, position, length) => {
		return (
			string.slice(0, position) +
			'<mark>' +
			string.slice(position, position + length) +
			'</mark>' +
			string.slice(position + length)
		);
	};
}
