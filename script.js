const messages = [
    "Profumo Victoria's Secret",       // bello
    "Collare per Teo",            // brutto
    "Ciabatte Usate da Me",       // brutto
    "Cena/Pranzo Sushi",              // bello
    "Vetrino gia rotto per telefono",           // brutto
    "Calendario Avvento Sephora",               // bello
    "Cover Telefono",      // brutto
    "Patente",     // bello
    "Calze a tema natalizio", // brutto
    "Felpa senza una manica",             // brutto
    "60 Euro Shein", // bello
    "100.000 Euro", // bello
    "50 euro Douglas",   // bello
    "Un paio di scarpe a scelta",          // bello
    "Un Bel Kebab"         // brutto
];

let openedBoxes = 0;

const boxContainer = document.getElementById('box-container');
const heading = document.querySelector('h1');
const balloonContainer = document.getElementById('balloon-container');

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
    // Nascondi il messaggio "Apri una scatola!"
    heading.style.opacity = '0'; // Scompare il messaggio

    // Nascondi tutte le altre scatole
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(b => {
        if (b !== box) {
            b.style.display = 'none';
        }
    });

    // Se è l'ultima scatola, aggiungi suspense
    if (boxes.length === 1) {
        setTimeout(() => {
            slowlyOpenBox(box);
        }, 2000); // Aspetta 2 secondi per aggiungere suspense
    } else {
        box.classList.add('center-box');
        
        // Ruota la scatola mostrando il retro
        setTimeout(() => {
            box.classList.add('rotate');
            const messageElement = box.querySelector('.message');
            messageElement.style.display = 'block'; // Mostra il messaggio
            
            // Lascia il messaggio visibile per 5 secondi
            setTimeout(() => {
                // Nascondi il messaggio e rimuovi la scatola completamente
                messageElement.style.display = 'none';
                box.remove(); // Rimuove la scatola dal DOM

                // Riporta le altre scatole
                boxes.forEach(b => {
                    if (b !== box) {
                        b.style.display = 'flex';
                    }
                });

                // Rendi visibile di nuovo il messaggio "Apri una scatola!"
                heading.style.opacity = '1'; // Riappare il messaggio

                openedBoxes++;
            }, 5000);
        }, 600);
    }
}

function slowlyOpenBox(box) {
    // Posiziona la scatola cliccata al centro dello schermo e ingrandiscila lentamente
    box.classList.add('center-box');

    // Ruota la scatola mostrando il retro lentamente
    setTimeout(() => {
        box.classList.add('rotate');
        const messageElement = box.querySelector('.message');
        messageElement.style.display = 'block'; // Mostra il messaggio

        // Aggiungi effetto coriandoli
        createConfetti();

        // La scatola rimane aperta per sempre
        // Non rimuoviamo la scatola dal DOM

        // Aggiungi palloncini
        addBalloons();

        // Rendi visibile di nuovo il messaggio "Apri una scatola!"
        heading.style.opacity = '1'; // Riappare il messaggio
    }, 600);
}

function addBalloons() {
    heading.style.opacity = '0'; // Scompare il messaggio
    const balloonColors = ['#ff6b6b', '#ffcc6b', '#6bff6b', '#6bb3ff', '#ff6bff'];
    setInterval(() => {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.backgroundColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.left = `${Math.random() * 100}vw`;
        balloon.style.animationDuration = `${Math.random() * 3 + 3}s`; // Tra 3 e 6 secondi

        balloonContainer.appendChild(balloon);

        // Rimuovi il palloncino dal DOM dopo l'animazione
        balloon.addEventListener('animationend', () => {
            balloon.remove();
        });
    }, 500); // Nuovo palloncino ogni mezzo secondo

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
    
    // Esegui i coriandoli ogni 2 secondi
    setInterval(createConfetti, 2000);
    

    // Aggiungi il messaggio di compleanno
    const birthdayMessage = document.createElement('div');
    birthdayMessage.id = 'birthday-message';
    birthdayMessage.innerText = 'Buon Compleanno Amore!';
    document.body.appendChild(birthdayMessage);
}
