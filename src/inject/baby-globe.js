const $extend = (a, b) => { for (k in b) a[k]=b[k]; return a; }

const $make = (type, o) => {
	let t = document.createElement(type);
	return $extend(t, o);
};

const $sample = (a) => a[Math.floor(Math.random() * a.length)];

const BABY_GLOBES = [
	browser.runtime.getURL("img/babyglobe/baby_globe_book.gif"),
	browser.runtime.getURL("img/babyglobe/baby_globe_laptop.gif"),
	browser.runtime.getURL("img/babyglobe/baby_globe_newspaper.gif"),
];

const BabyGlobe = (function BabyGlobe() {
	let element = $make('div', {
		className: "babyglobe ext",
	});

	let image = $make('img', {
		src: $sample(BABY_GLOBES),
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
