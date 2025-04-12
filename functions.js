
//Crear grid dinámico: valora las dimensaiones del viewport para generar las celdas necesarias hasta cubrir ancho y alto.

const tileSize = 25;
const background = document.querySelector(".background-grid");


function createGrid() {
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

