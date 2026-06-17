const figuras = [
 {pos:"A1", emoji:"⚽"},
 {pos:"B1", emoji:"🍎"},
 {pos:"C1", emoji:"🍩"},
 {pos:"A2", emoji:"🚗"},
 {pos:"B2", emoji:"🐶"},
 {pos:"C2", emoji:"🐱"},
 {pos:"A3", emoji:"🌟"},
 {pos:"B3", emoji:"🐝"},
 {pos:"C3", emoji:"🎈"},
 {pos:"A4", emoji:"🚀"},
 {pos:"B4", emoji:"🌸"},
 {pos:"C4", emoji:"🐟"}
];

const cores = [
 {nome:"Vermelho", valor:"red"},
 {nome:"Azul", valor:"blue"},
 {nome:"Verde", valor:"green"},
 {nome:"Laranja", valor:"orange"},
 {nome:"Roxo", valor:"purple"}
];

let rodada = 0;
let pontos = 0;
let corSelecionada = null;
let desafios = [];


function gerar(){
    let copia = [...figuras].sort(()=>Math.random()-0.5);
    desafios = copia.slice(0,5);
}


function montar(){
    let html = "";

    for(let l=1;l<=4;l++){
        html += "<tr>";
        html += `<th>${l}</th>`;

        ["A","B","C"].forEach(c=>{
            let id = c+l;
            let f = figuras.find(x=>x.pos===id);

            html += `
            <td id="${id}" onclick="clicar(this)">
                ${f ? f.emoji : ""}
            </td>`;
        });

        html += "</tr>";
    }

    document.getElementById("grade").innerHTML = html;
}

function montarCores(){
    let html = "";

    cores.forEach(c=>{
        html += `
        <div class="cor"
             title="${c.nome}"
             style="background:${c.valor}"
             onclick="selecionar(this,'${c.valor}')">
        </div>`;
    });

    document.getElementById("cores").innerHTML = html;
}


function selecionar(el, cor){
    document.querySelectorAll(".cor")
    .forEach(c=>c.classList.remove("ativa"));

    el.classList.add("ativa");
    corSelecionada = cor;
}


function iniciar(){
    rodada = 0;
    pontos = 0;
    corSelecionada = null;

    gerar();
    montar();
    montarCores();
    mostrar();

    document.getElementById("final").classList.add("hidden");
}


function mostrar(){
    let d = desafios[rodada];

    document.getElementById("desafio").innerHTML =
    `🎯 Pinte a posição <b>${d.pos}</b>`;

    document.getElementById("pontos").innerText = pontos;
    document.getElementById("rodada").innerText = `${rodada+1}/5`;
}


function feedback(msg, tipo){
    let f = document.getElementById("feedback");
    f.innerText = msg;
    f.className = "feedback " + tipo;
}


function clicar(el){
    let d = desafios[rodada];

    if(!corSelecionada){
        feedback("👉 Escolha uma cor primeiro!", "erro");
        return;
    }

    if(el.id === d.pos){

        el.style.background = corSelecionada;

        pontos += 10;

        feedback("✔ Acertou! Muito bem 🎉", "acerto");

        rodada++;

        setTimeout(()=>{
            if(rodada >= 5){
                finalizar();
            } else {
                mostrar();
            }
        },900);

    } else {

        pontos -= 2;

        feedback("❌ Errou! Tente novamente 😢", "erro");

        el.classList.add("shake");

        setTimeout(()=>el.classList.remove("shake"),300);
    }

    document.getElementById("pontos").innerText = pontos;
}


function finalizar(){

    document.querySelector(".grade").style.display = "none";
    document.querySelector(".paleta").style.display = "none";
    document.getElementById("desafio").style.display = "none";
    document.getElementById("feedback").style.display = "none";

    let final = document.getElementById("final");
    final.classList.remove("hidden");

    document.getElementById("tituloFinal").innerText =
    pontos >= 40 ? "🏆 Você venceu!" : "💪 Quase lá!";

    document.getElementById("textoFinal").innerText =
    `Você fez ${pontos} pontos no total.`;
}


function reiniciarJogo(){

    document.querySelector(".grade").style.display = "table";
    document.querySelector(".paleta").style.display = "flex";
    document.getElementById("desafio").style.display = "block";
    document.getElementById("feedback").style.display = "block";

    iniciar();
}

iniciar();