
document.addEventListener('DOMContentLoaded', function() {

    const headerUserName = document.getElementById('headerUserName');

    const fullName = localStorage.getItem('userFullName');
if (fullName) {
    headerUserName.textContent = fullName;
} else {
    headerUserName.textContent = 'Nome não encontrado';
}

    
    const backButton = document.getElementById('backButton');
    const nextButton = document.getElementById('nextButton');

    if (backButton) {
        backButton.addEventListener('click', function(event) {
            console.log('Botão Voltar clicado');
            window.location.href = '../audio_aceite/audioAceite.html';
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function(event) {
            console.log('Botão Próximo passo clicado');
            window.location.href = '../processo_finalizado/processoFinalizado.html';
        });
    }
    const sucessoTexto = document.querySelector('.sucess');
    if (sucessoTexto) {
      sucessoTexto.textContent = 'A sua assinatura foi concluída com sucesso e salva!';
     }
});