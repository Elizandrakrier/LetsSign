document.addEventListener('DOMContentLoaded', function () {
    const tokenInput = document.getElementById('text-token');
    const nextButton = document.getElementById('nextButton');
    const emailDisplay = document.getElementById('emailDisplay');
    const headerUserName = document.getElementById('headerUserName');
    const cvTitle = document.getElementById('cvTitle');
    const tokenMessage = document.getElementById('tokenMessage');
    const resendTokenLink = document.getElementById('resendToken');
    const emailPreview = document.getElementById('emailPreview');
    const tokenDisplay = document.getElementById('tokenDisplay');

    // Gerar token randomizado (6 dígitos)
    let generatedToken = Math.floor(100000 + Math.random() * 900000).toString();
    let isTokenValid = false;

    // Exibir o nome armazenado
    const fullName = localStorage.getItem('userFullName');
    if (fullName) {
        cvTitle.textContent = `CV - ${fullName}`;
        headerUserName.textContent = fullName;
    } else {
        cvTitle.textContent = 'CV - Nome não encontrado';
        headerUserName.textContent = 'Nome não encontrado';
    }

    // Exibir o e-mail armazenado
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
        emailDisplay.textContent = storedEmail;
    } else {
        emailDisplay.textContent = 'E-mail não encontrado';
    }

    // Função para mostrar mensagem de envio e token
    function showTokenMessage() {
        tokenMessage.classList.remove('hide');
        tokenDisplay.textContent = generatedToken; // Exibe o token
        emailPreview.classList.remove('hide');
        setTimeout(() => {
            tokenMessage.classList.add('hide');
            emailPreview.classList.add('hide'); // Oculta a prévia após 10 segundos
        }, 10000); // 10 segundos
    }

    // Exibir mensagem inicial
    console.log('Token gerado:', generatedToken);
    showTokenMessage();

    function validateToken() {
        const userToken = tokenInput.value.trim();
        isTokenValid = userToken === generatedToken;
        nextButton.disabled = !isTokenValid;
        console.log('Validação - Token inserido:', userToken, 'Token gerado:', generatedToken, 'Válido:', isTokenValid);
        return isTokenValid;
    }

    tokenInput.addEventListener('input', validateToken);

    // Reenviar token
    resendTokenLink.addEventListener('click', function (e) {
        e.preventDefault();
        generatedToken = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('Novo token gerado:', generatedToken);
        showTokenMessage();
        tokenInput.value = ''; // Limpa o campo
        nextButton.disabled = true;
        validateToken();
    });

    window.goBack = function () {
        console.log('Clicou em Voltar - Etapa 3');
        window.location.href = '../cadastro_assinatura/cadastroAssinatura.html';
    };

    window.goNext = function () {
        console.log('Clicou em Próximo passo - Etapa 3');
        if (validateToken()) {
            console.log('Token válido, redirecionando para Etapa 4');
            window.location.href = '../registro_facial/registroFacial.html';
        } else {
            alert('Token incorreto! Tente novamente ou clique em "Reenviar" para um novo token.');
            console.log('Token inválido, não redirecionando');
        }
    };

    validateToken();
});