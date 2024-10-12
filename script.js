const messages = [
    "Profumo Victoria's Secret",       // bello
    "Collare per Teo",                 // brutto
    "Ciabatte Usate da Me",            // brutto
    "Cena/Pranzo Sushi",               // bello
    "Vetrino già rotto per telefono",   // brutto
    "Calendario Avvento Sephora",      // bello
    "Cover Telefono",                  // brutto
    "Patente",                         // bello
    "Calze a tema natalizio",          // brutto
    "Felpa senza una manica",          // brutto
    "60 Euro Shein",                   // bello
    "100.000 Euro",                    // bello
    "50 Euro Douglas",                 // bello
    "Un paio di scarpe a scelta",      // bello
    "Un Bel Kebab"                     // brutto
];

let openedBoxes = 0;

const boxContainer = document.getElementById('box-container');

// Crea le scatole
messages.forEach((message, index) => {
    const box = document.createElement('div');
    box.classList.add('box');
    
    // Creazione dei front e back
    const front = document.createElement('div');
    front.classList.add('front');
    front.innerHTML = `${index + 1}`;
    
    const back = document.createElement('div');
    back.classList.add('back');
    back.innerHTML = `<div class="message">${message}</div>`;
    
    box.appendChild(front);
    box.appendChild(back);
    
    box.addEventListener('click', () => openBox(box));
    
    boxContainer.appendChild(box);
});

// Crea coriandoli
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        // Posizionamento casuale dei coriandoli
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        
        // Imposta un tempo di animazione casuale
        const duration = Math.random() * 2 + 3; // Tra 3 e 5 secondi
        confetti.style.animationDuration = `${duration}s`;

        confettiContainer.appendChild(confetti);

        // Rimuovi i coriandoli dal DOM dopo l'animazione
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
}

function openBox(box) {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(b => {
        if (b !== box) {
            b.style.display = 'none';
        }
    });

    if (boxes.length === 1) {
        setTimeout(() => {
            slowlyOpenBox(box);
        }, 2000);
    } else {
        box.classList.add('center-box');
        
        setTimeout(() => {
            box.classList.add('rotate');
            const messageElement = box.querySelector('.message');
            messageElement.style.display = 'block'; // Mostra il messaggio
            
            setTimeout(() => {
                messageElement.style.display = 'none';
                box.remove(); // Rimuove la scatola dal DOM

                boxes.forEach(b => {
                    if (b !== box) {
                        b.style.display = 'flex';
                    }
                });

                openedBoxes++;
            }, 5000);
        }, 600);
    }
}

function slowlyOpenBox(box) {
    box.classList.add('center-box');

    setTimeout(() => {
        box.classList.add('rotate');
        const messageElement = box.querySelector('.message');
        messageElement.style.display = 'block'; // Mostra il messaggio

        createConfetti();
        addBalloons();

        // Aggiungi il messaggio di compleanno
        const birthdayMessage = document.createElement('div');
        birthdayMessage.id = 'birthday-message';
        birthdayMessage.innerText = 'Buon Compleanno Amore!';
        document.body.appendChild(birthdayMessage);
    }, 600);
}

function addBalloons() {
    const balloonColors = ['#ff6b6b', '#ffcc6b', '#6bff6b', '#6bb3ff', '#ff6bff'];
    setInterval(() => {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.backgroundColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.left = `${Math.random() * 100}vw`;
        balloon.style.animationDuration = `${Math.random() * 3 + 3}s`;

        document.getElementById('balloon-container').appendChild(balloon);

        balloon.addEventListener('animationend', () => {
            balloon.remove();
        });
    }, 500);

    // Esegui i coriandoli ogni 2 secondi
    setInterval(createConfetti, 2000);
}
