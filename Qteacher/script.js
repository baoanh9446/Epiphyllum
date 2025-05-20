const nameImageMap = {
  N: "https://raw.githubusercontent.com/baoanh9446/Epiphyllum/refs/heads/main/1/1/g1.png",
  DA: "https://raw.githubusercontent.com/baoanh9446/Epiphyllum/refs/heads/main/1/1/g2.png",
  HA: "https://raw.githubusercontent.com/baoanh9446/Epiphyllum/refs/heads/main/1/1/b1.png",
  K: "https://raw.githubusercontent.com/baoanh9446/Epiphyllum/refs/heads/main/1/1/b2.png",
  NT: "https://raw.githubusercontent.com/baoanh9446/Epiphyllum/refs/heads/main/1/1/g3.png",
  P: "https://raw.githubusercontent.com/baoanh9446/Epiphyllum/refs/heads/main/1/1/b3.png",
};

const flowerCounts = {
  N: 0,
  DA: 2,
  HA: 2,
  K: 3,
  NT: 0,
  P: 2
};

const flowerColors = ['#FF69B4', '#FFD700', '#ADFF2F', '#00CED1', '#9370DB'];

function createFlowerSVG(color, label = "", scale = 1) {
  const flower = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  flower.setAttribute("viewBox", "0 0 100 100");
  flower.setAttribute("class", "flower");
  flower.style.width = 60 * scale + "px";
  flower.style.height = 60 * scale + "px";

  for (let i = 0; i < 5; i++) {
    const petal = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    petal.setAttribute("cx", 50);
    petal.setAttribute("cy", 30);
    petal.setAttribute("rx", 20);
    petal.setAttribute("ry", 30);
    petal.setAttribute("fill", color);
    petal.setAttribute("transform", `rotate(${i * 72} 50 50)`);
    flower.appendChild(petal);
  }

  const center = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  center.setAttribute("cx", 50);
  center.setAttribute("cy", 50);
  center.setAttribute("r", 7 * scale);
  center.setAttribute("fill", "#FFCCFF");
  flower.appendChild(center);

  if (label) {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", 50);
    text.setAttribute("y", 55);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", 6 * scale);
    text.setAttribute("fill", "white");
    text.setAttribute("font-family", "Arial, sans-serif");
    text.textContent = label.charAt(0).toUpperCase() + label.slice(1);
    flower.appendChild(text);
  }

  return flower;
}

const select = document.getElementById('nameSelect');
const img = document.getElementById('nameImage');
const cArea = document.getElementById('cArea');

const bAreas = {
  N: document.getElementById('b-N'),
  DA: document.getElementById('b-DA'),
  HA: document.getElementById('b-HA'),
  K: document.getElementById('b-K'),
  NT: document.getElementById('b-NT'),
  P: document.getElementById('b-P'),
};

Object.entries(flowerCounts).forEach(([name, count], index) => {
  const bArea = document.getElementById(`b-${name}`);
  for (let i = 0; i < count; i++) {
    const color = flowerColors[(i + index) % flowerColors.length];
    bArea.appendChild(createFlowerSVG(color, "", 0.8));
  }
});

let bouncingFlowers = [];

function updateCFlowers(count, label) {
  bouncingFlowers.forEach(f => f.elem.remove());
  bouncingFlowers = [];

  const cBounds = cArea.getBoundingClientRect();
  const flowerSize = 180;

  for (let i = 0; i < count; i++) {
    const color = flowerColors[i % flowerColors.length];
    const wrapper = document.createElement("div");
    wrapper.className = "moving-flower";
    wrapper.style.left = Math.random() * (cBounds.width - flowerSize) + "px";
    wrapper.style.top = Math.random() * (cBounds.height - flowerSize) + "px";

    const dx = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? -1 : 1);
    const dy = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? -1 : 1);

    wrapper.appendChild(createFlowerSVG(color, label, 3));
    cArea.appendChild(wrapper);

    bouncingFlowers.push({ elem: wrapper, dx, dy });
  }
}

function animateFlowers() {
  const cBounds = cArea.getBoundingClientRect();
  const size = 180;

  bouncingFlowers.forEach(f => {
    let x = parseFloat(f.elem.style.left);
    let y = parseFloat(f.elem.style.top);

    x += f.dx;
    y += f.dy;

    if (x <= 0 || x >= cBounds.width - size) f.dx *= -1;
    if (y <= 0 || y >= cBounds.height - size) f.dy *= -1;

    f.elem.style.left = x + "px";
    f.elem.style.top = y + "px";
  });

  requestAnimationFrame(animateFlowers);
}

select.addEventListener('change', function () {
  const selected = this.value;
  const selectedText = this.options[this.selectedIndex].text;

  img.src = nameImageMap[selected] || "https://via.placeholder.com/150";
  img.alt = `${selectedText} Image`;

  Object.entries(bAreas).forEach(([name, el]) => {
    el.classList.toggle('active', name === selected);
  });

  const activeB = bAreas[selected];
  const flowerCount = activeB.children.length;
  updateCFlowers(flowerCount, selectedText);
});

animateFlowers();
