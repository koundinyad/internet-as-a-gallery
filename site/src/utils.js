export function popitup(img, url, windowName) {
	newwindow = window.open(
		url,
		windowName,
		`height=${Math.max(img.height * 1.5 || 600)},width=${Math.max(
			img.width * 1.5 || 600
		)},toolbar=no,menubar=no,location=no,resizable=no,status=no`
	);
	if (window.focus) {
		newwindow.focus();
	}
	return false;
}

export function draggable(element) {
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