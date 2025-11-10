let herkku = document.querySelector('.herkku-hinta');
let parsedHerkku = parseFloat(herkku.innerHTML);

let ruokahinta = document.querySelector('.ruoka-hinta');
let parsedruokahinta = parseFloat(ruokahinta.innerHTML);
let ruokalevel = document.querySelector('.ruoka-level');

let leluhinta = document.querySelector('.lelu-hinta');
let parsedleluhinta = parseFloat(leluhinta.innerHTML);
let lelulevel = document.querySelector('.lelu-level');


let gpc = 1;  // Herkut per klikkaus
let gps = 0;  // Herkut per sekunti

// Kuvaa klikkaamalla lisätään herkkua
function incrementHerkku() {
    parsedHerkku += gpc;
    herkku.innerHTML = Math.round(parsedHerkku);
}

// Märkäruuan osto
function ostaRuoka() {
    if (parsedHerkku >= parsedruokahinta) {
        parsedHerkku -= parsedruokahinta;
        herkku.innerHTML = Math.round(parsedHerkku);

        ruokalevel.innerHTML = parseInt(ruokalevel.innerHTML) + 1;

        parsedruokahinta *= 1.18;
        ruokahinta.innerHTML = Math.round(parsedruokahinta);

        gpc += 1;
    }
}

// Lelun osto
function ostaLelu() {
    if (parsedHerkku >= parsedleluhinta) {
        parsedHerkku -= parsedleluhinta;
        herkku.innerHTML = Math.round(parsedHerkku);

        lelulevel.innerHTML = parseInt(lelulevel.innerHTML) + 1;

        parsedleluhinta *= 1.18;
        leluhinta.innerHTML = Math.round(parsedleluhinta);

        gps += 2;
    }
}

//automaattisesti herkut gps:n mukaan
setInterval(() => {
    parsedHerkku += gps / 10
    herkku.innerHTML = Math.round(parsedHerkku);
}, 100)

// Info box
const infoBox = document.getElementById('infoBox');

function showInfo(nimi, vaikutus) {
    infoBox.style.display = 'block';
    infoBox.innerHTML = `<strong>${nimi}</strong><br>${vaikutus}`;
}

function hideInfo() {
    infoBox.style.display = 'none';
}

// infoboksi hiiren mukana
document.addEventListener('mousemove', (e) => {
    infoBox.style.left = e.pageX + 20 + 'px';
    infoBox.style.top = e.pageY - 10 + 'px';
});