document.addEventListener('DOMContentLoaded', function () {
    const cvTitle = document.getElementById('cvTitle');
    const headerUserName = document.getElementById('headerUserName');
    const nextButton = document.getElementById('nextButton');

    console.log('DOM carregado, iniciando verificação do fullName');

    // Recuperar o nome do localStorage
    const fullName = localStorage.getItem('userFullName');
    console.log('Valor de fullName no localStorage:', fullName);

    if (fullName) {
        cvTitle.textContent = `CV - ${fullName}`;
        headerUserName.textContent = fullName;
        console.log('Nome atualizado para:', fullName);
    } else {
        cvTitle.textContent = 'CV - Nome não encontrado';
        headerUserName.textContent = 'Nome não encontrado';
        console.log('Nenhum fullName encontrado no localStorage');
    }

    let mediaRecorder;
    let audioChunks = [];
    let audioURL = null;
    let stream = null;
    let audioUploaded = false; // Controle do estado do upload do áudio

    const btnGravar = document.getElementById("btnGravar");
    const btnRegravar = document.getElementById("btnRegravar");
    const btnOuvir = document.getElementById("btnOuvir");
    const btnEnviar = document.getElementById("btnEnviar");
    const statusGravacao = document.getElementById("statusGravacao");
    const modal = new bootstrap.Modal(document.getElementById("modalGravacaoAudio"));
    const audioPlayer = document.getElementById("audioPlayer");
    const audioDisplay = document.getElementById("audioDisplay");
    const audioStatus = document.getElementById("audioStatus");

    // Função para verificar e atualizar o estado do botão Próximo
    function checkAudioUploaded() {
        const isAudioUploaded = !!audioUploaded && !!audioURL; // Verifica se o áudio foi enviado e URL existe
        nextButton.disabled = !isAudioUploaded;
        console.log('Estado do botão Próximo após check:', {
            disabled: nextButton.disabled,
            href: nextButton.getAttribute('href'),
            audioUploaded: audioUploaded,
            audioURL: audioURL
        });
    }

    // Desabilita o botão Próximo explicitamente no carregamento
    nextButton.disabled = true;

    // Função para parar a gravação manualmente
    function pararGravacao() {
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                stream = null;
            }
        }
        btnGravar.disabled = false;
        btnGravar.textContent = "🎙️ Gravar áudio";
        btnGravar.classList.remove("btn-outline-danger");
        btnGravar.classList.add("btn-outline-primary");
    }

    btnGravar.addEventListener("click", async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("Gravação de áudio não suportada no seu navegador.");
            return;
        }

        console.log("Tentando acessar o microfone...");

        try {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log("Acesso ao microfone concedido! Stream:", stream);
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstart = () => {
                statusGravacao.textContent = "Gravando... diga: 'Eu concordo'";
                btnGravar.textContent = "⏹️ Parar gravação";
                btnGravar.classList.remove("btn-outline-primary");
                btnGravar.classList.add("btn-outline-danger");
                btnGravar.disabled = false;
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
                audioURL = URL.createObjectURL(audioBlob);

                btnEnviar.classList.remove("d-none");
                btnRegravar.classList.remove("d-none");
                btnOuvir.classList.remove("d-none");
                statusGravacao.textContent = "Gravação concluída. Pronto para enviar.";
            };

            mediaRecorder.start();
            console.log("Gravação iniciada!");
            setTimeout(() => {
                if (mediaRecorder && mediaRecorder.state !== "inactive") {
                    pararGravacao();
                }
            }, 5000);

        } catch (error) {
            console.error("Erro ao acessar microfone:", error);
            if (error.name === "NotAllowedError") {
                statusGravacao.textContent = "Permissão para o microfone foi negada. Por favor, permita o acesso nas configurações do navegador.";
            } else if (error.name === "NotFoundError") {
                statusGravacao.textContent = "Nenhum microfone encontrado. Verifique se há um microfone conectado.";
            } else {
                statusGravacao.textContent = "Erro ao acessar o microfone: " + error.message;
            }
            btnGravar.disabled = false;
        }
    });

    btnRegravar.addEventListener("click", () => {
        audioChunks = [];
        audioURL = null; // Reseta a URL ao regravar
        audioUploaded = false; // Reseta o estado ao regravar
        checkAudioUploaded();
        btnRegravar.classList.add("d-none");
        btnOuvir.classList.add("d-none");
        btnEnviar.classList.add("d-none");
        statusGravacao.textContent = "";
        btnGravar.disabled = false;
        btnGravar.click();
    });

    btnOuvir.addEventListener("click", () => {
        if (audioURL) {
            const audio = new Audio(audioURL);
            audio.play();
            statusGravacao.textContent = "Reproduzindo áudio...";
            audio.onended = () => {
                statusGravacao.textContent = "Gravação concluída. Pronto para enviar.";
            };
        }
    });

    btnEnviar.addEventListener("click", () => {
        if (audioURL) {
            audioPlayer.src = audioURL;
            audioDisplay.style.display = "block";
            audioStatus.style.display = "block";
            modal.hide();
            statusGravacao.textContent = "Áudio enviado com sucesso!";
            audioUploaded = true; // Marca o áudio como enviado
            checkAudioUploaded(); // Atualiza o estado do botão Próximo
            btnRegravar.classList.add("d-none");
            btnOuvir.classList.add("d-none");
            btnEnviar.classList.add("d-none");
            console.log('Após enviar: botão Próximo deve estar habilitado.');
        }
    });

    document.getElementById("modalGravacaoAudio").addEventListener("hidden.bs.modal", () => {
        pararGravacao();
        audioChunks = [];
        audioURL = null;
        audioUploaded = false; // Reseta o estado ao fechar o modal
        checkAudioUploaded();
        statusGravacao.textContent = "";
        btnRegravar.classList.add("d-none");
        btnOuvir.classList.add("d-none");
        btnEnviar.classList.add("d-none");
        btnGravar.textContent = "🎙️ Gravar áudio";
        btnGravar.classList.remove("btn-outline-danger");
        btnGravar.classList.add("btn-outline-primary");
        btnGravar.disabled = false;
    });

    // Chama a função de verificação inicial
    checkAudioUploaded();
});