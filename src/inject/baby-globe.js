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

function Animation(name, delay) {
	this.name = name;
	this.delay = delay;
}

function BabyGlobe(idle, animations) {
	this.idle = idle;
	this.animations = animations || [];
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
		if (this.animations.length) {
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
			if (this.animations.length == 0) return;

			// If already clicked, do nothing.
			if (image.style.animation != '') return;

			let animation = $sample(this.animations);

			image.src = $urlOrNull(animation.name);
			// Use the CSS animation to time the gif.
			image.style.animation = animation.name + ' ' + animation.delay;
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
	new BabyGlobe('baby_globe_book'),
	new BabyGlobe('baby_globe_camera', [
		new Animation('baby_globe_camera_click', 'ease-in 1000ms'),
	]),
	new BabyGlobe('baby_globe_celebration', [
		new Animation('baby_globe_celebration_balloons', 'ease-in 4900ms'),
		new Animation('baby_globe_celebration_confetti', 'ease-in 2350ms'),
	]),
	new BabyGlobe('baby_globe_dream'),
	new BabyGlobe('baby_globe_headphones', [
		new Animation('baby_globe_headphones_click', 'ease-in 2700ms'),
	]),
	new BabyGlobe('baby_globe_laptop'),
	new BabyGlobe('baby_globe_newspaper'),
	new BabyGlobe('baby_globe_outer_space'),
	new BabyGlobe('baby_globe_phone'),
	new BabyGlobe('baby_globe_synthesizer', [
		new Animation('baby_globe_synthesizer_click', 'ease-in 4900ms'),
	]),
];

$sample(BABY_GLOBES).bind(document.body);
