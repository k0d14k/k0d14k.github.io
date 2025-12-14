const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// JAPANESE + RUSSIAN + GRECE
const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюяΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω';
const fontSize = 17;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if(this.getAttribute('href')[0] == "#"){
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }       
    });
});


function elementBuilder(text, size, type){
    // date is like to Gen 1 00:00
    let date = document.getElementById("time").innerText;
    let h3 = document.createElement("h3");
    let init = "";

    type == "dir" ? init = "drwxr-xr-x" : init = "-rw-r--r--";
    h3.innerHTML = init + " k0d14k k0d14k   "+size+" "+date+" "+text;
    return h3;
}

function clickableElementBuilder(text, size, type){
    let a = document.createElement("a");
    text == ".." ? a.href = "/" : a.href = "#"+text;
    a.classList = ["link"];
    a.appendChild(elementBuilder("<span class=\"item\">"+text+"</span></h3>", size, type));
    return a;
}

function lister() {
    // Is used to list the index into an article page
    let list = document.getElementsByClassName("project")[0];
    list.appendChild(elementBuilder(".", 4096,"dir"));
    list.appendChild(elementBuilder("..", 4096,"dir"));

    let sections = document.getElementsByTagName("section");
    for (let i in sections){
        if (sections[i].id != "index" && sections[i].id != undefined){
            list.appendChild(clickableElementBuilder(sections[i].id, sections[i].innerHTML.length));
        }
    }
}

const btn = document.getElementById("backToTop");

btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});