// const display = document.querySelector('.display');
// const boutons = document.querySelectorAll('button');
// const egal = document.querySelector('.egal');

// boutons.forEach(bouton => {
//   bouton.addEventListener('click', () => {
//     if (bouton.textContent === 'C') {
//       display.value = '';
//     } else if (bouton.textContent === '=') {
//       try {
//         display.value = eval(display.value);
//       } catch (e) {
//         display.value = 'Erreur';
//       }
//     } else {
//       display.value += bouton.textContent;
//     }
//   });
// });

// egal.addEventListener('click', () => {
//   try {
//     display.value = eval(display.value);
//   } catch (e) {
//     display.value = 'Erreur';
//   }
// });



const display = document.querySelector('.display');
const boutons = document.querySelectorAll('button');
const egal = document.querySelector('.egal');

function appuiBouton(valeur) {
  if (valeur === 'C') {
    display.value = '';
  } else if (valeur === '=') {
    try {
      display.value = eval(display.value);
    } catch (e) {
      display.value = 'Erreur';
    }
  } else {
    display.value += valeur;
  }
}

boutons.forEach(bouton => {
  bouton.addEventListener('click', () => {
    appuiBouton(bouton.textContent);
  });
});

egal.addEventListener('click', () => {
  appuiBouton('=');
});

document.addEventListener('keydown', (e) => {
  const touchesAutorisees = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', 'Enter', 'Backspace'];
  const touche = e.key;

  if (touchesAutorisees.includes(touche)) {
    if (touche === 'Enter') {
      appuiBouton('=');
    } else if (touche === 'Backspace') {
      appuiBouton('C');
    } else {
      appuiBouton(touche);
    }
  }
});
