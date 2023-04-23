function popitup(img, url, windowName) {
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

function makeElementDraggable(element) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  element.addEventListener("mousedown", dragMouseDown);
  element.addEventListener("touchstart", dragMouseDown);

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX || e.touches[0].clientX;
    pos4 = e.clientY || e.touches[0].clientY;
    document.addEventListener("mouseup", closeDragElement);
    document.addEventListener("touchend", closeDragElement);
    document.addEventListener("mousemove", elementDrag);
    document.addEventListener("touchmove", elementDrag);
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - (e.clientX || e.touches[0].clientX);
    pos2 = pos4 - (e.clientY || e.touches[0].clientY);
    pos3 = e.clientX || e.touches[0].clientX;
    pos4 = e.clientY || e.touches[0].clientY;

    element.style.top = element.offsetTop - pos2 + "px";
    element.style.left = element.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.removeEventListener("mouseup", closeDragElement);
    document.removeEventListener("touchend", closeDragElement);
    document.removeEventListener("mousemove", elementDrag);
    document.removeEventListener("touchmove", elementDrag);
  }
}

// Get required data from the page
const images = document.querySelectorAll("img");

const data = [];

images.forEach((image) => {
  if (image.width > 100 && image.height > 100) {
    data.push({
      url: image.src,
      caption: image.alt,
    });
  }
});

document.head.innerText = "";

document.querySelector("body").style.height = "250vh";
document.querySelector(
  "body"
).style.backgroundImage = `url(${browser.runtime.getURL("/clouds.gif")})`;
document.querySelector("body").style.backgroundSize = "cover";
document.querySelector("body").style.backgroundPosition = "center";
document.querySelector("body").style.backgroundRepeat = "no-repeat";
document.querySelector("body").style.backgroundAttachment = "fixed";
document.querySelector("body").style.animation = "fadeInOpacity 3s ease-in-out";

document.querySelector("body").innerHTML = "";

let h =
  document.height !== undefined
    ? document.height - 100
    : document.body.offsetHeight - 100;
let w =
  document.width !== undefined
    ? document.width - 100
    : document.body.offsetWidth - 100;

let custom_styles = "";

const keyframes = `@keyframes float {
    0% { 
      transform: translateY(-10px)
    }
    50%  { 
      transform: translateY(10px)
    }
    100%   {
      transform: translateY(-10px)
    }   
}
@keyframes fadeInOpacity {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
`;
custom_styles += " ";
custom_styles += keyframes;

const style = document.createElement("style");

style.innerHTML = custom_styles;
document.head.appendChild(style);

const button = document.createElement("button");
button.innerText = "close";
button.addEventListener("click", () => {
  location.reload();
});

const about = document.createElement("button");
about.innerText = "about";
about.addEventListener("click", () => {
  window.open("https://internet-as-a-gallery.space");
});
about.style.position = "fixed";
about.style.border = "none";
about.style.padding = "5px 10px 5px 10px";
about.style.bottom = "20px";
about.style.left = "20px";
about.style.backgroundColor = "black";
about.style.color = "white";
about.style.fontFamily = "monospace";

document.body.append(about);

document.body.append(button);
button.style.position = "fixed";
button.style.border = "none";
button.style.padding = "5px 10px 5px 10px";
button.style.bottom = "20px";
button.style.right = "20px";
button.style.backgroundColor = "black";
button.style.color = "white";
button.style.fontFamily = "monospace";

let zCount = 0;

const body = document.querySelector("body");

if (data.length === 0) {
  const notFoundText = "No images found on this page :(";
  const p = document.createElement("p");
  p.innerText = notFoundText;
  p.style.fontSize = "2em";
  p.style.color = "#2111fd";
  p.style.textAlign = "center";
  p.style.fontFamily = "Times";
  p.style.display = "grid";
  p.style.alignContent = "center";
  p.style.height = "100vh";
  body.append(p);
} else {
  data.forEach((img, index) => {
    // Create elements
    const imgContainer = document.createElement("div");
    const imgBox = document.createElement("img");
    imgBox.src = img.url;
    imgBox.alt = img.caption;
    imgBox.style.boxShadow = "#2111fd 10px 0px 100px 10px";

    imgContainer.style.cursor = "move";
    imgContainer.style.display = "flex";
    imgContainer.style.flexDirection = "column";
    imgContainer.style.justifyContent = "center";
    imgContainer.style.alignItems = "center";
    imgContainer.style.width = "200px";

    imgContainer.append(imgBox);
    body.append(imgContainer);

    const p = document.createElement("p");
    p.innerText = img.caption;
    p.style.textAlign = "center";
    imgContainer.append(p);
    p.style.opacity = "0";
    p.style.color = "rgb(33, 17, 253)";
    p.style.fontSize = "1.5em";

    imgBox.addEventListener("dblclick", () => {
      newwindow = window.open(
        imgBox.src,
        imgBox.alt,
        `height=${Math.max(imgBox.height * 1.5 || 600)},width=${Math.max(
          imgBox.width * 1.5 || 600
        )},toolbar=no,menubar=no,location=no,resizable=no,status=no`
      );
    });

    p.addEventListener("click", () => {
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
    imgBox.setAttribute("draggable", "false");
    makeElementDraggable(imgContainer);

    //   Styles
    imgBox.style.width = "200px";
    imgContainer.style.position = "absolute";

    //   Random position
    imgContainer.style.top = `${Math.random() * h * 0.7 + 100}px`;
    imgContainer.style.left = `${Math.random() * w * 0.7 + 100}px`;

    //   Events

    //   Increase z-index on click
    imgContainer.addEventListener("mousedown", () => {
      imgContainer.style.zIndex = zCount++;
    });

    //   Add caption on mouseenter
    imgContainer.addEventListener("mousedown", () => {
      p.style.opacity = "1";
    });

    //   Remove caption on mouseleave

    imgContainer.addEventListener("mouseup", () => {
      p.style.opacity = "0";
    });

    //   Event styles
    imgContainer.style.zIndex = zCount;
    imgContainer.style.animation = `float 5s infinite`;
    imgContainer.style.animationDelay = `${index * 300}ms`;

    //   Animation
  });
}
