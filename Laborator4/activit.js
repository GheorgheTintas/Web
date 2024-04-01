lista= document.getElementsByTagName('p')[0];
var arrayStud = listaStudenti.split("\n");
console.log(arrayStud.length + ' studenti in grupa'); // studenti in grupa
var res = "<table><tr><th>nr</th><th>nume</th><th>L1</th><th>L2</th><th>L3</th></tr>";
arrayStud.forEach(function (student) {
    //console.log(student);
    var st = student.split(". ");
    res += "<tr><td>"+st[0]+"</td>";
    res += "<td><a href='http://192.168.37.37/~stud" + st[0] + "/'>" + st[1] + "</a></td>";
    res += "<td><img src=\"http://192.168.37.37/~stud" + st[0] + "/01/tema.png\"</td>";
    res += "<td><img src=\"http://192.168.37.37/~stud" + st[0] + "/02/tema.png\"</td>";
    res += "<td><img src=\"http://192.168.37.37/~stud" + st[0] + "/03/tema.png\"</td>";
    res += "</tr>";
});
res += "</table>";
console.log(res);
lista.innerHTML = res;