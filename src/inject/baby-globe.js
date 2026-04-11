let $extend = (a, b) => { for (k in b) a[k]=b[k]; return a; }

let $make = (type, o) => {
	let t = document.createElement(type);
	return $extend(t, o);
};

const BabyGlobe = (function BabyGlobe() {
	let element = $make('div', {
		className: "babyglobe ext",
	});

	let image = $make('img', {
		src: browser.runtime.getURL("img/babyglobe/baby_globe_laptop.gif"),
		className: "image",
	});
	element.appendChild(image);

	let message = $make('div', {
		textContent: '',
		className: "message",
	});
	element.appendChild(message);

	element.addEventListener('animationend', evt => {
		image.style.animation = '';
	});

	element.addEventListener('click', evt => {
		/* TODO: Animation */
	});

	document.body.appendChild(element);

	return {};
})();
