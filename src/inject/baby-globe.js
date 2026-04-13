const $extend = (a, b) => { for (k in b) a[k]=b[k]; return a; }

const $make = (type, o) => {
	let t = document.createElement(type);
	return $extend(t, o);
};

const $sample = (a) => a[Math.floor(Math.random() * a.length)];

const $urlOrNull = (u) => {
	if (u == null) return null;

	// Use a random query parameter to make sure the gif resets every time.
	return browser.runtime.getURL('img/babyglobe/' + u + '.gif') + '?r=' + Math.random();
}

function BabyGlobe(idle, click, animation) {
	this.idle = idle;
	this.click = click;
	this.animation = animation;
}

BabyGlobe.prototype = {
	bind: function(root) {
		const element = $make('div', {
			className: 'babyglobe-ext',
		});

		const image = $make('img', {
			src: $urlOrNull(this.idle),
			className: 'babyglobe-image',
		});
		// Indicate that this Baby Globe is clickable.
		if (this.click) {
			image.classList.add('babyglobe-clickable');
		}
		element.appendChild(image);

		image.addEventListener('animationend', evt => {
			// Reset animation after it ends.
			image.src = $urlOrNull(this.idle);
			image.style.animation = '';
		});

		image.addEventListener('click', evt => {
			// If click is null, do nothing.
			if (!this.click) return;

			// If already clicked, do nothing.
			if (image.style.animation != '') return;

			image.src = $urlOrNull(this.click);
			// Use the CSS animation to time the gif.
			image.style.animation = this.click + ' ' + this.animation;
		});

		const message = $make('div', {
			textContent: '',
			className: 'babyglobe-message',
		});
		element.appendChild(message);

		root.appendChild(element);
	},
}

const BABY_GLOBES = [
	new BabyGlobe('baby_globe_book', null, null),
	new BabyGlobe('baby_globe_camera', 'baby_globe_camera_click', 'ease-in 1000ms'),
	new BabyGlobe('baby_globe_celebration', null, null),
	// TODO: Re-crop confetti, add balloons
	// new BabyGlobe('baby_globe_celebration', 'baby_globe_celebration_confetti', 'ease-in 2350ms'),
	new BabyGlobe('baby_globe_headphones', 'baby_globe_headphones_click', 'ease-in 2700ms'),
	new BabyGlobe('baby_globe_laptop', null, null),
	new BabyGlobe('baby_globe_newspaper', null, null),
	new BabyGlobe('baby_globe_phone', null, null),
	new BabyGlobe('baby_globe_synthesizer', 'baby_globe_synthesizer_click', 'ease-in 4900ms'),
];

$sample(BABY_GLOBES).bind(document.body);
