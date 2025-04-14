
//Memory Game Lógica

const section = document.querySelector(".container");
const playerLivesCount = document.querySelector(".playerLivesCount");
const playerInfo = document.querySelector(".player-info");
const stats = document.querySelector(".stats");
const restartButton = document.createElement("p");
let playerLives = 6;

//Helper
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//Mostrar el botón
const showRestartButton = async () => {
    await wait(500); // espera opcional para animaciones
  
    // Oculta stats
    stats.style.display = "none";
  
    // Crea el botón
    const restartButton = document.createElement("p");
    restartButton.textContent = "Restart";
    playerInfo.classList.add("restart-button", "restart"); // para mantener hover
  
    // Inserta el botón en el mismo lugar
    stats.parentElement.appendChild(restartButton);
  
    // Evento de reinicio
    restartButton.addEventListener("click", () => {
    restartButton.remove();
    playerInfo.classList.remove("restart-button", "restart");
      
    restart();
    });
};

//Mostrar vidas
const renderLives = () => {
    playerLivesCount.innerHTML = '';
    for (let i = 0; i < playerLives; i++) {
      const heart = document.createElement("span");
      heart.classList.add("heart");
      playerLivesCount.appendChild(heart);
    }
};

//Generar las cartas
// 10 cards en total
const getData = () => [
    {imgSrc: './img/Cubo.png', name: "cubo"},
    {imgSrc: './img/Tetraedro.png', name: "tetraedro"},
    {imgSrc: './img/Octaedro.png', name: "octaedro"},
    {imgSrc: './img/Dodecaedro.png', name: "dodecaedro"},
    {imgSrc: './img/Icosaedro.png', name: "icosaedro"},
    {imgSrc: './img/Esfera.png', name: "esfera"},
    {imgSrc: './img/Cubo.png', name: "cubo"},
    {imgSrc: './img/Tetraedro.png', name: "tetraedro"},
    {imgSrc: './img/Octaedro.png', name: "octaedro"},
    {imgSrc: './img/Dodecaedro.png', name: "dodecaedro"},
    {imgSrc: './img/Icosaedro.png', name: "icosaedro"},
    {imgSrc: './img/Esfera.png', name: "esfera"}
];

// Barajar las cartas
const randomize = () => {
    const cardData = getData();
    cardData.sort(()=> Math.random() - 0.5);
    return cardData;
};

//Generar cartas en el DOM
const cardGenerator = () => {
    renderLives();
    const cardData = randomize();
    //Generate the HTML
    cardData.forEach(item => {

        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement('div');
        card.classList.add('card');
        face.classList.add('face');
        back.classList.add('back');

        //Adjuntar imagen y nombre a las cartas
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);

        //Adjuntar cartas al DOM 
        section.appendChild(card);
        card.appendChild (face);
        card.appendChild (back);

        card.addEventListener("click", e => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        })
    });

};

//Comprobar cartas iguales
const checkCards = async (e) => {
    const clickedCard = e.target;
    
    // Evita clics múltiples sobre la misma carta o cartas ya deshabilitadas
    if (
        clickedCard.classList.contains("flipped") ||
        clickedCard.style.pointerEvents === "none"
    ) return;

    clickedCard.classList.add("flipped");

    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCards = document.querySelectorAll(".toggleCard");

    if(flippedCards.length === 2) {
        const isMatch =
            flippedCards[0].getAttribute('name') ===
            flippedCards[1].getAttribute('name');

        if(isMatch) {
            console.log("match");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.classList.add("toggleCard");
                card.style.pointerEvents = "none";
            });
        } else {
            console.log("wrong");
            setTimeout(() => {
                flippedCards.forEach((card) => {
                    card.classList.remove("flipped");
                    card.classList.remove("toggleCard");
                });
            }, 600);
            playerLives--;
            renderLives();
    
            if(playerLives === 0) {
                await wait(600); // espera a que setTimeout de las cartas fallidas termine

                const allCards = document.querySelectorAll(".card");
              
                allCards.forEach(card => {
                  card.classList.add("toggleCard");
                  card.classList.remove("flipped");
                  card.style.pointerEvents = "none";
                });

                // Espera un poco para que se vea el efecto
                await wait(600);
                await showRestartButton();
            }
          
        }
    }
    checkWin();
};
//Comprobar si hemos ganado
const checkWin = () => {
    const matchedCards = document.querySelectorAll(".toggleCard");
    if (matchedCards.length === 10) {
        console.log("has ganado");
        
    }
};
//Reiniciar
const restart = () => {
    stats.style.display = "flex";
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    stats.style.display = "flex";
    section.style.pointerEvents = "all";
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggleCard");
        //Adjuntar la info a las cartas para la nueva distribución
        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.name);
            section.style.pointerEvents = "all";
        }, 1000)
    });
    playerLives = 6;
    renderLives();
}

cardGenerator();