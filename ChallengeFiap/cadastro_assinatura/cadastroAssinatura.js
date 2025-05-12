document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    const btnLimpar = document.getElementById('btnLimpar');
    const btnSalvarAssinatura = document.getElementById('btnSalvarAssinatura');
    const statusDesenho = document.getElementById('statusDesenho');
    const assinaturaImagem = document.getElementById('assinaturaImagem');
    const placeholderAssinatura = document.getElementById('placeholderAssinatura');
    const nextButton = document.getElementById('nextButton');
    const cvTitle = document.getElementById('cvTitle');
    const headerUserName = document.getElementById('headerUserName');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let isSignatureSaved = false;

    // Exibir o nome do usuário no título e no cabeçalho
    const fullName = localStorage.getItem('userFullName');
    if (fullName) {
        cvTitle.textContent = `CV - ${fullName}`;
        headerUserName.textContent = fullName;
    } else {
        cvTitle.textContent = 'CV - Nome não encontrado';
        headerUserName.textContent = 'Nome não encontrado';
    }

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    function getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        if (evt.touches) {
            return { x: evt.touches[0].clientX - rect.left, y: evt.touches[0].clientY - rect.top };
        }
        return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
    }

    function startDrawing(e) {
        isDrawing = true;
        const pos = getMousePos(canvas, e);
        lastX = pos.x;
        lastY = pos.y;
        statusDesenho.textContent = 'Desenhando...';
    }

    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        const pos = getMousePos(canvas, e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        lastX = pos.x;
        lastY = pos.y;
    }

    function stopDrawing() {
        isDrawing = false;
        statusDesenho.textContent = 'Assinatura desenhada. Salve ou limpe para ajustar.';
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    btnLimpar.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        statusDesenho.textContent = 'Canvas limpo. Desenhe sua assinatura.';
        isSignatureSaved = false;
        nextButton.disabled = true;
        assinaturaImagem.style.display = 'none';
        placeholderAssinatura.style.display = 'block';
        console.log('Assinatura limpa, isSignatureSaved:', isSignatureSaved, 'Botão desativado:', nextButton.disabled);
    });

    btnSalvarAssinatura.addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png');
        assinaturaImagem.src = dataURL;
        assinaturaImagem.style.display = 'block';
        placeholderAssinatura.style.display = 'none';
        statusDesenho.textContent = 'Assinatura salva com sucesso!';
        isSignatureSaved = true;
        nextButton.disabled = false;
        console.log('Assinatura salva, isSignatureSaved:', isSignatureSaved, 'Botão ativado:', !nextButton.disabled);
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalDesenharAssinatura'));
        modal.hide();
    });

    window.goBack = function () {
        console.log('Clicou em Voltar - Etapa 2');
        window.location.href = '../dados_pessoais/dadosPessoais.html';
    };

    window.goNext = function () {
        console.log('Clicou em Próximo passo - Etapa 2');
        if (isSignatureSaved) {
            console.log('Assinatura salva, redirecionando para Etapa 3');
            window.location.href = '../tela_token/token.html';
        } else {
            console.log('Assinatura não salva, não redirecionando');
        }
    };

    nextButton.disabled = true;
    console.log('Inicialização - Botão desativado:', nextButton.disabled);
});