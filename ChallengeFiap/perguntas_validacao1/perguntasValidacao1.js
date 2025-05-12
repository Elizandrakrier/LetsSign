


document.addEventListener('DOMContentLoaded', function() {
    const headerUserName = document.getElementById('headerUserName');
    const estouProntoButton = document.getElementById('estouPronto');

    if (estouProntoButton) {
        estouProntoButton.addEventListener('click', function(event) {

            console.log('Botão Estou Pronto! clicado');
             window.location.href = '../perguntas_validacao2/perguntasValidacao2.html';
        });
    }
});

const fullName = localStorage.getItem('userFullName');
if (fullName) {
    headerUserName.textContent = fullName;
} else {
    headerUserName.textContent = 'Nome não encontrado';
}