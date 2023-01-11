// create a variable for the section and players lives count
const section = document.querySelector("section");
const playersLivesCount = document.querySelector("span");
let playerLives = 8;
 
// link the text to the variable
playersLivesCount.textContent = playerLives;
 
// generate the data we are going to use for cards
// each image is saved in the images folder
const getData = () => [
  {
    name: "earth",
    img: "images/earth.jpg",
  },
  {
    name: "earth",
    img: "images/earth.jpg",
  },
  {
    name: "Jupiter",
    img: "images/Jupiter.jpg",
  },
  {
    name: "Jupiter",
    img: "images/Jupiter.jpg",
  },
  {
    name: "Mercury",
    img: "images/Mercury.jpg",
  },
  {
    name: "Mercury",
    img: "images/Mercury.jpg",
  },
  {
    name: "Uranus",
    img: "images/Uranus.jpg",
  },
  {
    name: "Uranus",
    img: "images/Uranus.jpg",
  },
  {
    name: "Venus",
    img: "images/Venus.jpg",
  },
  {
    name: "Venus",
    img: "images/Venus.jpg",
  },
  {
    name: "Saturn",
    img: "images/Saturn_during_Equinox.jpg",
  },
  {
    name: "Saturn",
    img: "images/Saturn_during_Equinox.jpg",
  },
  {
    name: "Mars",
    img: "images/Mars.png",
  },
  {
    name: "Mars",
    img: "images/Mars.png",
  },
  {
    name: "Neptune",
    img: "images/Neptune.webp",
  },
  {
    name: "Neptune",
    img: "images/Neptune.webp",
  },
];
 
// function to randomize cards
// using the sort + math random to get random card posistions
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};
 
// Card Generator Function
// this runs the randomize function giving us a random array of cards.
const cardGenerator = () => {
  const cardData = randomize();
  // generate html
  // creating a div to hold everything in , a img, and another div that will be the back of the image.
  // then adding the classes that I can style them with in css
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = " face";
    back.classList = "back";
    // attach the images to the cards
    // taking the images and putting them on the card- also putting the name on the card so we can compare cards
    face.src = item.img;
    card.setAttribute("name", item.name);
 
    // attach the cards to the section
    // first append card to section- then the image of the card to the card element and then the back of the card.
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);
    // adding a toggle class that will flip the cards on click. Style of flip done in css
    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};
 
// function to check the cards
const checkCards = (e) => {
  console.log(e);
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
 
  //   the logic to see if the cards are a match
  //   everytime we pick an element we add the flipped class to it
  // then we checked to see if their are two cards with that flipped class
  // if their are- then we compare the name class between the two
  //   the clicked cards are being compared by their 'e.target' which will give us back the name we assigned
  // if they are equal - match! if not , unflipp card and start again.
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      console.log("match");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      console.log("wrong");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      playerLives--;
      playersLivesCount.textContent = playerLives;
      if (playerLives === 0) {
        restart("GAME OVER, TRY AGAIN!");
      }
    }
  }
 
  //   run a check to see if we won the game
  if (toggleCard.length === 16) {
    restart("YOU WON!!!!!!!!!");
  }
};
 
// function to restart the game
const restart = function (text) {
  // randomizing the cars - creating the cards- removing the card from being flipped
  // removing the pointer event so while the game is restarting you cant click on cards
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");
    // giving the restart a 1 second delay so the User can see that they lost on the last card played.
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.img;
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
    }, 1000);
  });
 
  //   resetting the player lives counts to 8, and allowing an alert to be played that signals a loss
  playerLives = 8;
  playersLivesCount.innerText = playerLives;
  setTimeout(() => window.alert(text), 100);
};
 
// Making a restart button that on the click runs the restart() function
const button = document.querySelector("button");
 
button.addEventListener("click", function () {
  restart("Game Restarted");
});
 
cardGenerator();
