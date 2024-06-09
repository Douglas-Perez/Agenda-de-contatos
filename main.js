const form = document.getElementById('formulario');
const numero = [];
const contato = [];
let linhas = '';

function formatarTelefone(numer) {
    let phoneNumber = numer.replace(/\D/g, '');

    if (phoneNumber.length === 13) {
        return `+${phoneNumber.substring(0, 2)} ${phoneNumber.substring(2, 4)} ${phoneNumber.substring(4, 9)}-${phoneNumber.substring(9)}`;
    } else if (phoneNumber.length === 11) {
        return `+55 ${phoneNumber.substring(0, 2)} ${phoneNumber.substring(2, 7)}-${phoneNumber.substring(7)}`;
    } else if (phoneNumber.length === 9) {
        let codigoArea = prompt("Digite o código de área:");
        if (codigoArea !== null && codigoArea !== "" && codigoArea.length < 3) {
            return `+55 ${codigoArea} ${phoneNumber.substring(0, 5)}-${phoneNumber.substring(5)}`;
        } else {
            alert("Por favor, digite o código de área.");
            return null;
        }
    } else {
        alert("O número de telefone deve ter 9, 11 ou 13 dígitos.");
        return null;
    }
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    adicionarLinha();
    atualizaTabela();
});

function adicionarLinha() {
    const inputNome = document.getElementById('form-nome');
    const inputTel = document.getElementById('form-tel');

    let telefoneFormatado = formatarTelefone(inputTel.value);

    if (telefoneFormatado !== null) {
        if ((contato.includes(inputNome.value)) || (numero.includes(telefoneFormatado))) {
            alert('O Contato ou Telefone já está registrado');
        } else {
            contato.push(inputNome.value);
            numero.push(telefoneFormatado);

            let linha = '<tr>';
            linha += `<th class="nome">${inputNome.value}</th>`;
            linha += `<th class="telefone">${telefoneFormatado}</th>`;
            linha += '</tr>';
            linhas += linha;

            inputNome.value = '';
            inputTel.value = '';
        }
    }
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}