
//Memory Game Lógica

const section = document.querySelector(".container");
const playerLivesCount = document.querySelector("span");
let playerLives = 6;

//Link text
playerLivesCount.textContent = playerLives;

//Generar las cards
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

//Randomize cards
const randomize = () => {
    const cardData = getData();
    cardData.sort(()=> Math.random() - 0.5);
    return cardData;
};

//Card Generator Function
const cardGenerator = () => {
    const cardData = randomize();
    //Generate the HTML
    cardData.forEach(item => {

        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement('div');
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        //Attach info to cards
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);
        //Attach the cards to the screen
        section.appendChild(card);
        card.appendChild (face);
        card.appendChild (back);

        card.addEventListener("click", e => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        })
    });

};
//Check cards
const checkCards = (e) => {
    const clickedCard = e.target;
    
    // Evita clics múltiples sobre la misma carta o cartas ya deshabilitadas
    if (
        clickedCard.classList.contains("flipped") ||
        clickedCard.style.pointerEvents === "none"
    ) return;

    clickedCard.classList.add("flipped");

    const flippedCards = document.querySelectorAll(".flipped");

    if (flippedCards.length === 2) {
        const isMatch =
            flippedCards[0].getAttribute('name') ===
            flippedCards[1].getAttribute('name');

        if (isMatch) {
            console.log("match");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
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
            playerLivesCount.textContent = playerLives;
        }
    }
};

cardGenerator();