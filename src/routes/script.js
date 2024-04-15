const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function drawCircle(x, y, size) {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.fill();
}

const handleKeyPress = (e) => {
  const { key } = e;
  const allowedKeys = ["w", "a", "s", "d"];
  if (!allowedKeys.includes(key)) {
    console.log("bad key", key);
    return;
  }

  let currentX = x;
  let currentY = y;

  switch (key) {
    case "w":
      currentX += 50;
      break;
    case "a":
      currentY -= 50;
      break;
    case "s":
      currentX -= 50;
      break;
    case "d":
      currentY += 50;
      break;

    default:
      break;
  }
  x = currentX;
  y = currentY;
  drawCircle(currentX, currentY, size);
};

window.addEventListener("keypress", handleKeyPress);

let x = 50;
let y = 50;
const size = 30;

drawCircle(x, y, size);

// Add your code here
