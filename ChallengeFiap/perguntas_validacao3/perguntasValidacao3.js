document.addEventListener('DOMContentLoaded', function () {

    const headerUserName = document.getElementById('headerUserName');

    const fullName = localStorage.getItem('userFullName');
if (fullName) {
    headerUserName.textContent = fullName;
} else {
    headerUserName.textContent = 'Nome não encontrado';
}

    const resposta1 = sessionStorage.getItem('resposta1') || '[não informado]';
    const resposta2 = sessionStorage.getItem('resposta2') || '[não informado]';
    const resposta3 = sessionStorage.getItem('resposta3') || '[não informado]';

    document.getElementById('resposta1').textContent = resposta1;
    document.getElementById('resposta2').textContent = resposta2;
    document.getElementById('resposta3').textContent = resposta3;
});
