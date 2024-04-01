const titluriCarti = [
    "Carte1",
    "Carte2",
    "Carte3",
    "Carte4",
    "Carte5"
];

function f1() {
    var lista = document.getElementById("ex1");
    titluriCarti.forEach((titlu) => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(" " + titlu));
        lista.appendChild(li);
    });
}
function f2() {
    var lista = document.getElementById("ex2");
    let nrSecunde = 2;
    let miliSec = nrSecunde * 1000;
    titluriCarti.forEach((titlu, i) => {
        setTimeout(() => {
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(" " + titlu));
            lista.appendChild(li);
        }, (i + 1) * miliSec)

    });
}
function f3() {
    var div = document.getElementById("ex3");
    setTimeout(() => {
        div.style.backgroundColor = "#00FF00";
    }, 3000);
}
function changeBackground() {
    var colors = ["red", "orange", "yellow", "green","#FDF4E3", "blue", "purple"];
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    var div = document.getElementById("ex4");
    div.style.backgroundColor = randomColor;
    randomColor = colors[Math.floor(Math.random() * colors.length)];
    div.style.borderColor = randomColor;

}

f1();
f2();
f3();
setInterval(changeBackground, 500);