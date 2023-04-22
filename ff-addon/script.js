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

    element.style.top = element.offsetTop - pos2 + "px";
    element.style.left = element.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

let h = window.innerHeight - 100;
let w = window.innerWidth - 100;

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

document.querySelector("body").style.height = "100vh";
document.querySelector("body").innerHTML = "";

let topSizes = "";

for (let i = 0; i < data.length; i++) {
  const keyframes = `@keyframes float${i} {
    0% { 
      transform: ${`translateY(-10px)`} 
    }
    50%  { 
      transform: ${`translateY(10px)`} 
    }
    100%   {
      transform: ${`translateY(-10px)`}
    }   
}`;
  topSizes += " ";
  topSizes += keyframes;

  const rotate = `@keyframes rotate${i}} {
    0% { transform: rotateY(0deg) }
    50%  { transform: rotateY(${Math.random() * 30}deg) }
    100%   { transform: rotateY(0deg) }
    }`;
  topSizes += " ";
  topSizes += rotate;
}

const style = document.createElement("style");
const clouds = browser.runtime.getURL("clouds.gif");
const bg = `body {
  background: url('${clouds}'); 
  background-position: fixed;
  background-size: cover;
}`;
topSizes += bg;
console.log(topSizes);
style.innerHTML = topSizes;
document.head.appendChild(style);

let video = document.createElement("video");
// display webcam feed on video element

video.autoplay = true;
video.muted = true;
video.loop = true;
video.style.position = "fixed";
video.style.top = 0;
video.style.width = "100%";
document.body.appendChild(video);

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (error) {
      console.log("Something went wrong!");
    });
}

video.style.opacity = 0.3;

const button = document.createElement("button");
button.innerText = "Close";
button.style.boxShadow = "0 0 0 1px #fff,0 0 0 2px #df5fff,0 0 0 3px #ff44f6";
button.addEventListener("click", () => {
  location.reload();
});

document.body.append(button);
button.style.position = "fixed";
button.style.border = "none";
button.style.padding = "5px 10px 5px 10px";
button.style.top = "20px";
button.style.right = "20px";
button.style.backgroundColor = "black";
button.style.color = "white";
button.style.fontFamily = "cursive";

let zCount = 0;

const body = document.querySelector("body");

if (data.length === 0) {
  const notFoundText = "No images found on this page :(";
  const p = document.createElement("p");
  p.innerText = notFoundText;
  p.style.fontSize = "2em";
  p.style.color = "black";
  p.style.textAlign = "center";
  p.style.textShadow = "0 0 .05em #fff,0 0 .1em #df5fff,0 0 .4em #ff44f6";
  p.style.fontFamily = "cursive";
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
    p.style.cursor = "pointer";
    imgContainer.style.textShadow =
      "0 0 .05em #fff,0 0 .1em #df5fff,0 0 .4em #ff44f6";

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
      p.style.textShadow = "0 0 .05em #fff,0 0 .1em #df5fff,0 0 .4em #ff44f6";
      p.style.opacity = "1";

      imgContainer.style.transform = "scale(1.2)";
    });

    //   Remove caption on mouseleave

    imgContainer.addEventListener("mouseup", () => {
      p.style.opacity = "0";
      p.style.textShadow = "0 0 .05em #fff,0 0 .1em #df5fff,0 0 .4em #ff44f6";
    });

    //   Event styles
    imgContainer.style.zIndex = zCount;
    imgContainer.style.animation = `float${index} 5s infinite`;

    //   Animation
  });
}
