// enkelt tärningsspel med två spelare

// startvärden
var totalPoäng = [0, 0];              // håller koll på totalpoängen för båda spelarna
var nuvarandePoäng = 0;               // poäng som samlas under en runda
var aktivSpelare = 0;                 // den spelare som spelar just nu (0 eller 1)
var spelar = true;                    // anger om spelet är aktivt

// hämtar element från sidan
var tärning = document.getElementById("dice");    // tärningsrutan
var knappNy = document.querySelector(".btn--new");             // knapp för att starta nytt spel
var knappKasta = document.querySelector(".btn--roll"); // knapp för att kasta tärningen
var knappHåll = document.querySelector(".btn--hold");      // knapp för att spara poängen

var poäng0 = document.getElementById("score--0"); // totalpoäng spelare 0
var poäng1 = document.getElementById("score--1");          // totalpoäng spelare 1
var aktuell0 = document.getElementById("current--0");   // aktuell poäng spelare 0
var aktuell1 = document.getElementById("current--1");         // aktuell poäng spelare 1
var spelare0 = document.querySelector(".player--0"); // spelare 0:s ruta
var spelare1 = document.querySelector(".player--1");        // spelare 1:s ruta

// positioner för prickarna på tärningen beroende på värde
const dotPositions = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

// visar tärningen med rätt prickar
function visaTärning(tal) {
  tärning.innerHTML = "";  // rensar tärningen
  for (let i = 0; i < 9; i++) {  // går igenom alla 9 rutor
    const cell = document.createElement("div");
    if (dotPositions[tal].includes(i)) {
      cell.classList.add("dot");  // lägger till prick om den ska visas där
    }
    tärning.appendChild(cell);  // lägger till rutan i tärningen
  }

  // startar om animationen för att visa kastet
  tärning.classList.remove("roll");
  void tärning.offsetWidth;
  tärning.classList.add("roll");
}

// nollställer allt och startar ett nytt spel
function startaSpel() {
  totalPoäng = [0, 0];
  nuvarandePoäng = 0;
  aktivSpelare = 0;
  spelar = true;

  poäng0.textContent = "0";
  poäng1.textContent = "0";
  aktuell0.textContent = "0";
  aktuell1.textContent = "0";

  tärning.classList.add("hidden");  // gömmer tärningen i början
  spelare0.classList.add("player--active");
  spelare1.classList.remove("player--active");
  spelare0.classList.remove("player--winner");
  spelare1.classList.remove("player--winner");
}

// byter till nästa spelare
function bytSpelare() {
  document.getElementById("current--" + aktivSpelare).textContent = "0";
  nuvarandePoäng = 0;
  aktivSpelare = aktivSpelare === 0 ? 1 : 0;
  spelare0.classList.toggle("player--active");
  spelare1.classList.toggle("player--active");
}

// när man klickar på kasta-knappen
knappKasta.addEventListener("click", function () {
  if (spelar) {
    var tal = Math.floor(Math.random() * 6) + 1; // slumpar ett tal 1–6
    tärning.classList.remove("hidden");          // visar tärningen
    visaTärning(tal);                            // visar rätt utseende

    if (tal !== 1) {
      nuvarandePoäng += tal;                     // lägger till poäng
      document.getElementById("current--" + aktivSpelare).textContent =
        nuvarandePoäng;
    } else {
      bytSpelare();                               // byter spelare om man får 1
    }
  }
});

// när man klickar på håll-knappen
knappHåll.addEventListener("click", function () {
  if (spelar) {
    totalPoäng[aktivSpelare] += nuvarandePoäng;  // sparar poängen till totalen
    document.getElementById("score--" + aktivSpelare).textContent =
      totalPoäng[aktivSpelare];

    if (totalPoäng[aktivSpelare] >= 100) {
      spelar = false;                            // spelet är slut
      tärning.classList.add("hidden");           // gömmer tärningen
      document
        .querySelector(".player--" + aktivSpelare)
        .classList.add("player--winner");        // visar vinnare
      document
        .querySelector(".player--" + aktivSpelare)
        .classList.remove("player--active");
    } else {
      bytSpelare();                               // annars fortsätter spelet
    }
  }
});

// startar om spelet när man klickar på "nytt spel"
knappNy.addEventListener("click", startaSpel);

// startar spelet automatiskt när sidan laddas
startaSpel();
