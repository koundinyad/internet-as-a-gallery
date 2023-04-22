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

// Sizes
let h = window.innerHeight - 100;
let w = window.innerWidth - 100;

const images = document.querySelectorAll("img");
const data = [];
images.forEach((image) => {
  if (image.width > 100) {
    data.push({
      url: image.src,
      caption: image.alt,
    });
  }
});

document.querySelector("body").innerHTML = "";

// Data
// const data = [
//   {
//     url: "./images/0.png",
//     caption: "Alt text 0",
//   },
//   {
//     url: "./images/1.png",
//     caption: "Alt text 1",
//   },
//   {
//     url: "./images/2.png",
//     caption: "Alt text 2",
//   },
//   {
//     url: "./images/3.png",
//     caption: "Alt text 3",
//   },
// ];

let topSizes = "";

for (let i = 0; i < data.length; i++) {
  const top = Math.random() * h * 0.7 + 100;
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

// const top = Math.random() * h * 0.7 + 100;

//   Adding styles to head
const style = document.createElement("style");
style.innerHTML = topSizes;
document.head.appendChild(style);

// import noise from "../utils/noise";
let imageURLs = [
  "./images/0.png",
  "./images/1.png",
  "./images/2.png",
  "./images/3.png",
];

let zCount = 0;

let caption = "Alt text";

const body = document.querySelector("body");

data.forEach((img, index) => {
  // Create elements
  const imgContainer = document.createElement("div");
  const imgBox = document.createElement("img");
  imgBox.src = img.url;
  imgBox.alt = caption;

  imgContainer.append(imgBox);
  body.append(imgContainer);

  const p = document.createElement("p");
  p.innerText = img.caption;
  imgContainer.append(p);
  p.style.opacity = "0";

  //   Drag context
  imgBox.setAttribute("draggable", "false");
  makeElementDraggable(imgContainer);

  //   Styles
  imgBox.style.width = "200px";
  imgContainer.style.position = "absolute";
  //   imgContainer.style.transform = "scale(0.7)";
  //   imgContainer.style.transition = "all 0.3s ease-in-out";

  //   imgContainer.style.animation = `rotate${index} 1s infinite`;

  //   Random position
  imgContainer.style.top = `${Math.random() * h * 0.7 + 100}px`;
  imgContainer.style.left = `${Math.random() * w * 0.7 + 100}px`;

  //   Events

  //   Increase z-index on click
  imgContainer.addEventListener("mousedown", () => {
    imgContainer.style.zIndex = zCount++;
  });

  //   Add caption on mouseenter
  imgContainer.addEventListener("mouseenter", () => {
    p.style.opacity = "1";
    // imgContainer.style.transform = "scale(1.2)";
  });

  //   Remove caption on mouseleave

  imgContainer.addEventListener("mouseleave", () => {
    p.style.opacity = "0";
    // imgContainer.style.transform = "scale(1)";
  });

  //   Event styles
  imgContainer.style.zIndex = zCount;
  imgContainer.style.animation = `float${index} 5s infinite`;

  //   Animation
});
