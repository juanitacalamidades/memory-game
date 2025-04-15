//Crear grid dinámico: valora las dimensaiones del viewport para generar las celdas necesarias hasta cubrir ancho y alto.
const tileSize = 25;
const background = document.querySelector(".background-grid");


const createGrid = () => {
  background.innerHTML = ""; // Limpiar grid anterior

  const cols = Math.ceil(window.innerWidth / tileSize);
  const rows = Math.ceil(window.innerHeight / tileSize);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = document.createElement("div");
      cell.className = "grid-cell";
      cell.style.left = `${x * tileSize}px`;
      cell.style.top = `${y * tileSize}px`;
      background.appendChild(cell);
    }
  }
}
createGrid();
window.addEventListener("resize", createGrid);

//Celda en relieve
const randomPop = () => {
  const randomIndex = Math.floor(Math.random() * cells.length);
  const selected = cells[randomIndex];

  selected.classList.add("pop-forward");

  setTimeout(() => {
    selected.classList.remove('pop-forward')
  }, 1000);
};


//Invocar la función cada cierto tiempo
setInterval(randomPop, 1000);


// Generar color de fondo aleatorio
const setRandomBackground = (element, colors = ['#FD5D78','#FDDD5D','#5DFDCB','#5F1A37','#FF220C']) => {
  if (!element) return;
  
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  
  element.style.backgroundColor = randomColor;
};

background.addEventListener("click", (e) => {
  if (e.target.classList.contains("grid-cell")) {
    const cell = e.target;
    cell.classList.add("pop-forward");

    setTimeout(() => {
      setRandomBackground(cell);
    }, 100);

    setTimeout(() => {
      cell.classList.remove("pop-forward");
    }, 800);
  }
});

// "Levantar" la celda
// const cells = document.querySelectorAll('.grid-cell');
// cells.forEach((item) => {
//   item.addEventListener('click', () => {
//     item.classList.add('pop-forward');
//     setTimeout(() => {
//       setRandomBackground(item);

//     }, 100)

//     setTimeout(() => {
//       item.classList.remove('pop-forward');
//     }, 800); // o el tiempo que dure la animación

//   });

// });

// Efecto máquina de escribir
const article = "Test your habilities";
const target = document.querySelector(".subtitle");
let speed = 100; 
let i = 0;
const typeEffect = () => {
    if(i < article.length) {
        target.textContent += article.charAt(i);
        i++;
        setTimeout(typeEffect, speed)
    }
};
typeEffect();

// Crear footer

const createFooter = () => {
  const body = document.querySelector("body");
  const footer = document.createElement("footer");
  const text = document.createElement("p");
  const heart = document.createElement("span");

  text.textContent = "Powered by Yoanna Rodionova"
  heart.classList.add("heart");
  body.appendChild(footer);
  footer.appendChild(text);
  footer.appendChild(heart);
}
//Retrasar la ejecución hasta que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", createFooter);
