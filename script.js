const display = document.querySelector('.display');
const boutons = document.querySelectorAll('button');
const egal = document.querySelector('.egal');
const copieBtn = document.getElementById('copie_btn');
const copied = document.getElementById("copied")
const animationDuration = parseFloat(
    getComputedStyle(copied).getPropertyValue("animation-duration")
);
const touchesAutorisees = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '(', ')', '*', '/', 'Enter', 'Backspace', 'Delete'];
const initialFontSize = parseFloat(getComputedStyle(display).getPropertyValue('font-size'));
const historique_p = document.getElementById("historique").querySelector("p");
const historique = document.getElementById("historique")
const deleteHistorique = document.getElementById("historique_delete")
const historique_btn = document.getElementById("historique_btn")

copied.style.display = "none";

copieBtn.addEventListener("click", () => {
  if (display.value != "") {
    display.select();
    document.execCommand("copy"); 

    copied.style.display = "flex";
    copied.classList.add("copied-in");
    setTimeout(() => {
      copied.classList.add("copied-out");
      copied.classList.remove("copied-in");
      setTimeout(() => {
          copied.classList.remove("copied-out");
          copied.style.display = "none";
      }, animationDuration * 1000);
    }, animationDuration * 1000 + 3000);
  }
});

historique_btn.addEventListener("click", () => {
  if (historique.classList.contains("show")){
    historique.classList.add("show-out");
    historique_btn.classList.remove("return")
    historique.classList.remove("show");
    setTimeout(() => {
      historique.style.display = "none"
      historique.classList.remove("show-out");
    }, animationDuration * 1000);
  } else {
    historique_btn.classList.add("return")
    historique.style.display = "flex"
    setTimeout(() => {
      historique.classList.add("show");
    }, 100);
  }
});

historique_btn.addEventListener("keydown", function(event) {
  if (event.key === "Enter" && myButton === document.activeElement) {
    event.preventDefault();
  }
});




deleteHistorique.addEventListener("click",()=>{
  historique_p.textContent = ""
})


function appuiBouton(valeur) {
  if (valeur === 'C' || valeur === "Delete") {
    display.value = '';
    display.style.fontSize = `${initialFontSize}px`;
  }
  else if (valeur === '=') {
    console.log(display.value)
    try {
      if (display.value.includes("*") | display.value.includes("/") | display.value.includes("-") | display.value.includes("+")) {
        const calcul = document.createElement('span');
        const resultat = document.createElement('span');
        resultat.classList.add("resultat_historique")
        calcul.textContent = display.value;
        resultat.textContent = parseFloat(eval(display.value).toFixed(2));
        display.value = resultat.textContent
        historique_p.appendChild(resultat);
        historique_p.appendChild(calcul);
      }
    } catch (e) {
      display.value = 'Erreur';
    }
    display.style.fontSize = `${initialFontSize}px`;
  }
  else {
    if (display.value=='Erreur'){
        display.value = '';
    }
    display.value += valeur;
  }
  historiqueVide()
  updateFontSize(); // Déplacer l'appel à updateFontSize() ici
}

boutons.forEach(bouton => {
  bouton.addEventListener('click', () => {
    appuiBouton(bouton.textContent);
  });
});

egal.addEventListener('click', () => {
  appuiBouton('=');
});

function toggleActiveButton(key, activate) {
  boutons.forEach(bouton => {
    if (bouton.textContent === key) {
      if (activate) {
        bouton.classList.add('active');
      } else {
        bouton.classList.remove('active');
      }
    }

  });
}

document.addEventListener('keydown', (e) => {
  const touche = e.key;

  if (touchesAutorisees.includes(touche)) {
    if (touche === 'Enter') {
      appuiBouton('=');
      toggleActiveButton('=', true);
    } else if (touche === 'Backspace') {
      appuiBouton('C');
      toggleActiveButton('C', true);
    } else {
      appuiBouton(touche);
      toggleActiveButton(touche, true);
    }
  }
});

document.addEventListener('keyup', (e) => {
  const touche = e.key;

  if (touchesAutorisees.includes(touche)) {
    if (touche === 'Enter') {
      toggleActiveButton('=', false);
    } else if (touche === 'Backspace') {
      toggleActiveButton('C', false);
    } else {
      toggleActiveButton(touche, false);
    }
  }
});

function updateFontSize() {
  const maxWidth = display.clientWidth;
  const maxHeight = display.clientHeight;
  let currentFontSize = parseFloat(getComputedStyle(display).getPropertyValue('font-size'));

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = `${currentFontSize}px ${getComputedStyle(display).getPropertyValue('font-family')}`;

  const lines = display.value.split("\n");
  let longestLineWidth = 0;
  lines.forEach(line => {
    const lineWidth = ctx.measureText(line).width;
    if (lineWidth > longestLineWidth) {
      longestLineWidth = lineWidth;
    }
  });

  // Ajuster la taille de la police en fonction de la largeur
  if (longestLineWidth > maxWidth) {
    currentFontSize = Math.floor(currentFontSize * maxWidth / longestLineWidth * 0.85); // Ajouter un facteur de réduction supplémentaire de 0.95
  }

  // Ajuster la taille de la police en fonction de la hauteur
  let lineHeight = currentFontSize + 2; // 2px de marge pour éviter le débordement
  let totalHeight = lineHeight * lines.length;
  if (totalHeight > maxHeight) {
    currentFontSize = Math.floor(currentFontSize * maxHeight / totalHeight * 0.85); // Ajouter un facteur de réduction supplémentaire de 0.95
  }

  display.style.fontSize = `${currentFontSize}px`;
}

updateFontSize();

historiqueVide();

function historiqueVide(){
  if (historique_p.textContent.trim() === "" && historique_p.querySelectorAll('span').length == 0){
    historique.classList.add("vide")
  } else {
    historique.classList.remove("vide")
  }
}


// function updateFontSize() {
//   const maxWidth = display.clientWidth;
//   const maxHeight = display.clientHeight;
//   const initialFontSize = parseFloat(getComputedStyle(display).getPropertyValue('font-size'));
//   const textWidth = display.scrollWidth;
//   const textHeight = display.scrollHeight;

//   if (textWidth > maxWidth || textHeight > maxHeight) {
//     const newFontSize = Math.min(initialFontSize * maxWidth / textWidth, initialFontSize * maxHeight / textHeight);
//     display.style.fontSize = `${newFontSize}px`;
//   } else {
//     display.style.fontSize = 'inherit';
//   }
// }

// // Mettre à jour la taille de la police au chargement initial
// updateFontSize();
