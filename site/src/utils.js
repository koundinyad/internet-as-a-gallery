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

export function makeElementDraggable(element) {
	let pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	element.onmousedown = dragMouseDown;

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;

		element.style.top = element.offsetTop - pos2 + 'px';
		element.style.left = element.offsetLeft - pos1 + 'px';
	}

	function closeDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;
	}
}
