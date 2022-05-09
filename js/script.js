
function cadastrar(){

    let nome = document.getElementsByTagName("input")[0];
    let email = document.getElementsByTagName("input")[1];
    let telefone = document.getElementsByTagName("input")[2];
    fetch("http://localhost:5000/api/cliente/cadastrar", {
        method: "POST", 
        headers: {
            accept: "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            nome:nome.value,
            email:email.value,
            telefone:telefone.value,
        })
    })
    .then((resultado) => resultado.json())
    .then((dados) => {
        console.log(dados)
        alert(`${dados.output}\n${dados.payload}`)
        // limpar o formulario
        nome.value = "";
        email.value = "";
        telefone.value = "";
    })
    .catch((err) => console.error(err));
    
}

function calcular(){
    var shape = document.getElementById("selectshape").value;
    var truck = document.getElementById("selecttruck").value;
    var lixa = document.getElementById("selectlixa").value;
    var roda = document.getElementById("selectroda").value;
    var rolamento = document.getElementById("selectrolamento").value;
    console.log(`${shape}   ${truck}   ${lixa}   ${roda}   ${rolamento}`)

    if(shape == "selecione")
    shape = 0

    if(truck == "selecione")
    truck = 0

    if(lixa == "selecione")
    lixa = 0

    if(roda == "selecione")
    roda = 0

    if(rolamento == "selecione")
    rolamento = 0

    var soma = parseFloat(shape) + parseFloat(truck) + parseFloat(lixa) + parseFloat(roda) + parseFloat(rolamento);
    alert(`O valor total dos produtos é = R$ ${soma}`)
}