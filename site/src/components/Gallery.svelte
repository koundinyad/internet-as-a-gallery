<script>
	import '../globals.css';
	import { onMount } from 'svelte';

	let newwindow;

	function makeElementDraggable(element) {
		let pos1 = 0,
			pos2 = 0,
			pos3 = 0,
			pos4 = 0;
		element.addEventListener('mousedown', dragMouseDown);
		element.addEventListener('touchstart', dragMouseDown);

		function dragMouseDown(e) {
			e = e || window.event;
			e.preventDefault();
			pos3 = e.clientX || e.touches[0].clientX;
			pos4 = e.clientY || e.touches[0].clientY;
			document.addEventListener('mouseup', closeDragElement);
			document.addEventListener('touchend', closeDragElement);
			document.addEventListener('mousemove', elementDrag);
			document.addEventListener('touchmove', elementDrag);
		}

		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();
			pos1 = pos3 - (e.clientX || e.touches[0].clientX);
			pos2 = pos4 - (e.clientY || e.touches[0].clientY);
			pos3 = e.clientX || e.touches[0].clientX;
			pos4 = e.clientY || e.touches[0].clientY;

			element.style.top = element.offsetTop - pos2 + 'px';
			element.style.left = element.offsetLeft - pos1 + 'px';
		}

		function closeDragElement() {
			document.removeEventListener('mouseup', closeDragElement);
			document.removeEventListener('touchend', closeDragElement);
			document.removeEventListener('mousemove', elementDrag);
			document.removeEventListener('touchmove', elementDrag);
		}
	}

	export let contents;

	onMount(() => {
		let doc_body = document.body,
			doc_html = document.documentElement;

		let h = Math.max(
			doc_body.scrollHeight,
			doc_body.offsetHeight,
			doc_html.clientHeight,
			doc_html.scrollHeight,
			doc_html.offsetHeight
		);
		// let h = window.innerHeight - 100;

		h = h - 200;
		let w = window.innerWidth - 50;

		const data = [];
		if (contents) {
			contents.forEach((item) => {
				data.push({
					url: item.image.square.url,
					caption: item.generated_title ? item.generated_title : 'Unknown'
				});
			});
		}

		let topSizes = '';

		const style = document.createElement('style');

		const bg = `body {
  background-position: fixed;
  background-size: cover;
}`;
		topSizes += bg;

		style.innerHTML = topSizes;
		document.head.appendChild(style);

		let zCount = 0;

		const body = document.querySelector('body');

		data.forEach((img, index) => {
			// Create elements
			const imgContainer = document.createElement('div');
			const imgBox = document.createElement('img');

			imgBox.src = img.url;
			imgBox.alt = img.caption;
			imgBox.classList.add('img-gallery');

			imgContainer.style.cursor = 'move';
			imgContainer.style.display = 'flex';
			imgContainer.style.flexDirection = 'column';
			imgContainer.style.justifyContent = 'center';
			imgContainer.style.alignItems = 'center';
			imgContainer.style.width = '200px';

			imgContainer.append(imgBox);
			body.append(imgContainer);

			const p = document.createElement('p');
			p.classList.add('gallery-caption');
			p.innerText = img.caption;

			imgContainer.append(p);

			p.style.opacity = '0';

			imgBox.addEventListener('dblclick', () => {
				newwindow = window.open(
					imgBox.src,
					imgBox.alt,
					`height=${Math.max(imgBox.height * 1.5 || 600)},width=${Math.max(
						imgBox.width * 1.5 || 600
					)},toolbar=no,menubar=no,location=no,resizable=no,status=no`
				);
			});

			//

			//   Drag context
			imgBox.setAttribute('draggable', 'false');
			makeElementDraggable(imgContainer);

			//   Styles

			imgBox.style.animationDelay = `${index * 300}ms`;

			// imgBox.style.transitionDelay = `${index}s`;

			imgContainer.style.position = 'absolute';

			//   Random position
			imgContainer.style.top = `${Math.random() * h * 0.7 + 100}px`;
			imgContainer.style.left = `${Math.random() * w * 0.7 + 100}px`;

			//   Events

			//   Increase z-index on click
			imgContainer.addEventListener('mousedown', () => {
				imgContainer.style.zIndex = zCount++;
			});

			imgContainer.addEventListener('touchstart', () => {
				imgContainer.style.zIndex = zCount++;
			});

			//   Add caption on mouseenter
			imgContainer.addEventListener('mousedown', () => {
				p.style.opacity = '1';
				imgContainer.style.transform = 'scale(1.2)';
			});

			imgContainer.addEventListener('touchstart', () => {
				p.style.opacity = '1';
				imgContainer.style.transform = 'scale(1.2)';
			});

			//   Remove caption on mouseleave

			imgContainer.addEventListener('mouseup', () => {
				p.style.opacity = '0';
			});

			imgContainer.addEventListener('touchend', () => {
				p.style.opacity = '0';
			});

			const duration = Math.max(Math.floor(Math.random() * 10), 3);

			//   Event styles
			imgContainer.style.zIndex = zCount;
			imgContainer.style.animation = `float ${duration}s infinite ease-in-out`;

			//   Animation
		});
	});
</script>
