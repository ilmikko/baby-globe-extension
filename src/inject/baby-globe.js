const $extend = (a, b) => { for (let k in b) a[k]=b[k]; return a; }

const $make = (type, o) => {
	let t = document.createElement(type);
	return $extend(t, o);
};

const $listen = (el, es, fn) => { for (let e of es) { el.addEventListener(e, fn); } };

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
		const extension = $make('div', {
			className: 'babyglobe-ext',
		});

		// This element controls the extra drag offset.
		const offset = $make('div', {});
		extension.appendChild(offset);

		const image = $make('img', {
			src: $urlOrNull(this.idle),
			className: 'babyglobe-image babyglobe-draggable',
		});
		offset.appendChild(image);

		// Indicate that this Baby Globe is clickable.
		if (this.animations.length) {
			image.classList.add('babyglobe-clickable');
		}

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
			image.style.animation = 'babyglobe-interact ease-in ' + animation.delay;
		});

		const message = $make('div', {
			textContent: '',
			className: 'babyglobe-message',
		});
		extension.appendChild(message);

		// Put Baby Globe in the correct corner (anchor).
		extension.style.top = 'unset';
		extension.style.bottom = '0';
		extension.style.left = '0';
		extension.style.right = 'unset';

		// Add dragging functionality.
		(() => {
			let dragStartX, dragStartY;

			image.addEventListener('dragstart', evt => {
				evt.preventDefault();
				evt.stopPropagation();

				dragStartX = evt.pageX;
				dragStartY = evt.pageY;

				image.classList.add('babyglobe-dragging');
			});

			function dragMove(evt) {
				if (dragStartX == null) return;
				if (dragStartY == null) return;

				let x = evt.pageX - dragStartX;
				let y = evt.pageY - dragStartY;

				offset.style.transform = 'translate(' + x + 'px,' + y + 'px)';
			}
			$listen(root, ['touchmove', 'mousemove'], dragMove);

			function dragStop(evt) {
				if (dragStartX == null) return;
				if (dragStartY == null) return;

				dragStartX = null;
				dragStartY = null;

				let rootRect = root.getBoundingClientRect();
				let offsetRect = offset.getBoundingClientRect();
				
				// dragAnchor{X,Y} point to the anchor.

				// 1. Calculate where the new anchor is.
				let anchorX = evt.pageX / rootRect.width;
				let anchorY = evt.pageY / rootRect.height;
				
				// 2. Calculate the offset to that anchor.
				let x = 0, y = 0;
				if (anchorX < 0.5) {
					// left
					x = offsetRect.left - rootRect.left;
					extension.style.left = '0';
					extension.style.right = 'unset';
				} else {
					// right
					x = offsetRect.right - rootRect.right;
					extension.style.right = '0';
					extension.style.left = 'unset';
				}
				if (anchorY < 0.5) {
					// top
					y = offsetRect.top - rootRect.top;
					extension.style.top = '0';
					extension.style.bottom = 'unset';
				} else {
					// bottom
					y = offsetRect.bottom - rootRect.bottom;
					extension.style.bottom = '0';
					extension.style.top = 'unset';
				}

				console.log(x, y);
				extension.style.transform = 'translate(' + x + 'px,' + y + 'px)';
				offset.style.transform = '';
				image.classList.remove('babyglobe-dragging');
			}
			$listen(root, ['touchend', 'mouseleave', 'mouseup'], dragStop);
			$listen(image, ['dragend', 'mouseup'], dragStop);
		})();

		root.appendChild(extension);
	},
}

const BABY_GLOBES = [
	new BabyGlobe('baby_globe_book'),
	new BabyGlobe('baby_globe_camera', [
		new Animation('baby_globe_camera_click', '1000ms'),
	]),
	new BabyGlobe('baby_globe_celebration', [
		new Animation('baby_globe_celebration_balloons', '4900ms'),
		new Animation('baby_globe_celebration_confetti', '2350ms'),
	]),
	new BabyGlobe('baby_globe_dream'),
	new BabyGlobe('baby_globe_headphones', [
		new Animation('baby_globe_headphones_click', '2700ms'),
	]),
	new BabyGlobe('baby_globe_laptop'),
	new BabyGlobe('baby_globe_newspaper'),
	new BabyGlobe('baby_globe_outer_space'),
	new BabyGlobe('baby_globe_phone'),
	new BabyGlobe('baby_globe_synthesizer', [
		new Animation('baby_globe_synthesizer_click', '4900ms'),
	]),
];

$sample(BABY_GLOBES).bind(document.body);
