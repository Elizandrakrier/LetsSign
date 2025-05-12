document.addEventListener('DOMContentLoaded', function () {
    let stream = null;
    const nextButton = document.getElementById('nextButton');
    const cvTitle = document.getElementById('cvTitle');
    const headerUserName = document.getElementById('headerUserName');
    const confirmeIdentidadeInput = document.getElementById('confirme-identidade');
    let selfieUploaded = false;
    let selfieRgCnhUploaded = false;
    let docUploaded = false;
    let frontCaptured = false; // Flag para verificar se a frente foi capturada
    let backCaptured = false;  // Flag para verificar se o verso foi capturado

    // Exibir o nome do usuário do localStorage
    const fullName = localStorage.getItem('userFullName');
    if (fullName) {
        cvTitle.textContent = `CV - ${fullName}`;
        headerUserName.textContent = fullName;
        confirmeIdentidadeInput.value = fullName;
    } else {
        cvTitle.textContent = 'CV - Nome não encontrado';
        headerUserName.textContent = 'Nome não encontrado';
        confirmeIdentidadeInput.value = 'Nome não encontrado';
    }

    // Função para verificar se todas as fotos foram enviadas
    function checkAllUploads() {
        const allUploaded = selfieUploaded && selfieRgCnhUploaded && docUploaded;
        nextButton.disabled = !allUploaded;
        console.log('Verificação de uploads - Selfie:', selfieUploaded, 'Selfie RG/CNH:', selfieRgCnhUploaded, 'Doc:', docUploaded, 'Botão ativado:', !nextButton.disabled);
    }

    // Função para iniciar a câmera
    async function startCamera(videoElement) {
        try {
            if (stream) {
                await stopCamera(null);
            }
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.srcObject = stream;
            await videoElement.play(); // Garante que o vídeo comece a rodar
            console.log('Câmera iniciada para:', videoElement.id, 'Stream:', stream);
        } catch (error) {
            console.error('Erro ao acessar a câmera:', error);
            alert('Não foi possível acessar a câmera. Verifique as permissões.');
        }
    }

    // Função para parar a câmera
    async function stopCamera(videoElement) {
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            stream = null;
            console.log('Câmera parada completamente');
        }
        if (videoElement) {
            videoElement.srcObject = null;
            videoElement.style.display = 'block';
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Função para capturar a foto (Selfie e Selfie com RG/CNH)
    async function captureSinglePhoto(videoElement, canvasElement, previewElement, submitButton, recaptureButton, captureButton) {
        const context = canvasElement.getContext('2d');
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

        await stopCamera(videoElement);
        videoElement.style.display = 'none';
        previewElement.src = canvasElement.toDataURL('image/png');
        previewElement.style.display = 'block';

        submitButton.classList.remove('d-none');
        recaptureButton.classList.remove('d-none');
        captureButton.classList.add('d-none');
        console.log('Foto capturada para:', videoElement.id);
    }

    // Função para re-tirar a foto (Selfie e Selfie com RG/CNH)
    async function recaptureSinglePhoto(videoElement, previewElement, submitButton, recaptureButton, captureButton) {
        videoElement.style.display = 'block';
        previewElement.style.display = 'none';
        submitButton.classList.add('d-none');
        recaptureButton.classList.add('d-none');
        captureButton.classList.remove('d-none');
        await startCamera(videoElement);
        console.log('Re-tirar foto ativado para:', videoElement.id);
    }

    // Função para capturar a foto (Frente e Verso do RG ou CNH)
    async function captureDoublePhoto(videoElement, canvasElement, previewElement, instructionElement, submitButton, nextCaptureButton, recaptureButton, captureButton, isFront = true) {
        // Limpa o canvas e a pré-visualização antes de capturar
        const context = canvasElement.getContext('2d');
        context.clearRect(0, 0, canvasElement.width, canvasElement.height);
        previewElement.src = ''; // Limpa a imagem de pré-visualização

        // Reinicia a câmera e espera para garantir que ela esteja pronta
        videoElement.style.display = 'block';
        await startCamera(videoElement);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Delay de 1 segundo

        // Verifica se o vídeo está pronto para captura
        if (!videoElement.videoWidth || !videoElement.videoHeight) {
            console.error('Vídeo não está pronto para captura:', videoElement.id, 'videoWidth:', videoElement.videoWidth, 'videoHeight:', videoElement.videoHeight);
            alert('Erro ao capturar a foto. Tente novamente.');
            return;
        }

        canvasElement.width = videoElement.videoWidth || 640; // Valor padrão
        canvasElement.height = videoElement.videoHeight || 480; // Valor padrão
        context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

        // Verifica se a imagem foi desenhada corretamente
        const imageData = context.getImageData(0, 0, canvasElement.width, canvasElement.height);
        if (!imageData.data || imageData.data.length === 0) {
            console.error('Falha ao desenhar a imagem no canvas:', videoElement.id);
            alert('Erro ao capturar a foto. Tente novamente.');
            return;
        }

        await stopCamera(videoElement);
        videoElement.style.display = 'none';
        previewElement.src = canvasElement.toDataURL('image/png');
        previewElement.style.display = 'block';
        document.getElementById('previewContainer').style.display = 'block';

        if (isFront) {
            frontCaptured = true;
            instructionElement.textContent = 'Verifique a foto da frente ou avance para o verso';
            nextCaptureButton.textContent = 'Capturar Verso'; // Renomeia para clareza
            nextCaptureButton.classList.remove('d-none'); // Mostra o botão para capturar o verso
            recaptureButton.classList.remove('d-none'); // Mostra o botão "Re-tirar Foto" após capturar a frente
            captureButton.classList.add('d-none'); // Oculta o botão de captura inicial
            submitButton.classList.add('d-none'); // Garante que "Enviar" não apareça ainda
            document.getElementById('previewFront').style.display = 'block';
            document.getElementById('previewBack').style.display = 'none';
        } else {
            backCaptured = true;
            document.getElementById('previewFront').style.display = 'none';
            document.getElementById('previewBack').style.display = 'block';
            instructionElement.textContent = 'Pré-visualização das fotos';
            submitButton.classList.remove('d-none'); // Mostra "Enviar"
            recaptureButton.classList.remove('d-none'); // Mostra "Re-tirar Foto" após capturar o verso
            nextCaptureButton.classList.add('d-none'); // Oculta "Capturar Verso"
            captureButton.classList.add('d-none'); // Garante que "Capturar" não apareça
        }
        console.log('Foto capturada (frente/verso) para:', videoElement.id, 'isFront:', isFront, 'canvasWidth:', canvasElement.width, 'canvasHeight:', canvasElement.height);
    }

    // Função para preparar a captura do verso
    async function prepareBackCapture(videoElement, previewElement, instructionElement, nextCaptureButton, captureButton) {
        videoElement.style.display = 'block';
        previewElement.style.display = 'none';
        document.getElementById('previewFront').style.display = 'none';
        document.getElementById('previewBack').style.display = 'none';
        document.getElementById('previewContainer').style.display = 'none';
        instructionElement.textContent = 'Ajuste o verso do RG ou CNH e clique em Capturar';
        nextCaptureButton.classList.add('d-none'); // Oculta "Capturar Verso" após o clique
        captureButton.textContent = 'Capturar Verso';
        captureButton.classList.remove('d-none'); // Mostra "Capturar Verso" no botão principal
        await startCamera(videoElement);
        console.log('Preparando captura do verso para:', videoElement.id);
    }

    // Função para re-tirar a foto (Frente e Verso do RG ou CNH)
    async function recaptureDoublePhoto(videoElement, previewElement, instructionElement, submitButton, nextCaptureButton, recaptureButton, captureButton, isFront = true) {
        videoElement.style.display = 'block';
        previewElement.style.display = 'none';
        document.getElementById('previewContainer').style.display = 'none';
        if (isFront) {
            frontCaptured = false;
            document.getElementById('previewFront').style.display = 'none';
            instructionElement.textContent = 'Capturar frente do RG ou CNH';
            captureButton.textContent = 'Capturar Frente';
        } else {
            backCaptured = false;
            document.getElementById('previewBack').style.display = 'none';
            instructionElement.textContent = 'Ajuste o verso do RG ou CNH e clique em Capturar';
            captureButton.textContent = 'Capturar Verso';
        }
        submitButton.classList.add('d-none');
        nextCaptureButton.classList.add('d-none');
        recaptureButton.classList.add('d-none');
        captureButton.classList.remove('d-none');
        await startCamera(videoElement);
        console.log('Re-tirar foto (frente/verso) ativado para:', videoElement.id, 'isFront:', isFront);
    }

    // Função para enviar as fotos (Frente e Verso do RG ou CNH)
    async function submitDoublePhoto(canvasElement, modal, frontImageElement, backImageElement, displayElement, frontPreview, backPreview) {
        if (!frontCaptured || !backCaptured) {
            alert('Por favor, capture tanto a frente quanto o verso antes de enviar.');
            return;
        }

        const frontImageData = frontPreview.src || canvasElement.toDataURL('image/png');
        const backImageData = backPreview.src || canvasElement.toDataURL('image/png');

        if (!frontImageData || !backImageData) {
            alert('Erro: Uma ou ambas as imagens não foram capturadas corretamente. Tente novamente.');
            return;
        }

        displayElement.innerHTML = '';

        const frontContainer = document.createElement('div');
        const frontLabel = document.createElement('small');
        frontLabel.textContent = 'Frente';
        frontLabel.style.display = 'block';
        frontLabel.style.marginBottom = '5px';
        const frontImg = document.createElement('img');
        frontImg.src = frontImageData;
        frontImg.alt = 'Frente do RG ou CNH';
        frontImg.classList.add('img-fluid');
        frontImg.style.maxWidth = '100px';
        frontContainer.appendChild(frontLabel);
        frontContainer.appendChild(frontImg);

        const backContainer = document.createElement('div');
        const backLabel = document.createElement('small');
        backLabel.textContent = 'Verso';
        backLabel.style.display = 'block';
        backLabel.style.marginBottom = '5px';
        const backImg = document.createElement('img');
        backImg.src = backImageData;
        backImg.alt = 'Verso do RG ou CNH';
        backImg.classList.add('img-fluid');
        backImg.style.maxWidth = '100px';
        backImg.style.marginTop = '10px';
        backContainer.appendChild(backLabel);
        backContainer.appendChild(backImg);

        const confirmationMessage = document.createElement('p');
        confirmationMessage.classList.add('text-success', 'mt-2');
        confirmationMessage.innerHTML = '<i class="fas fa-check-circle"></i> Documento enviado!';

        displayElement.appendChild(frontContainer);
        displayElement.appendChild(backContainer);
        displayElement.appendChild(confirmationMessage);
        displayElement.style.display = 'block';

        await stopCamera(null);
        modal.hide();
        docUploaded = true;
        checkAllUploads();
        console.log('Fotos (frente e verso) enviadas para:', displayElement.id);
        document.querySelectorAll('[data-bs-target]').forEach(button => {
            button.disabled = false;
            button.classList.remove('disabled');
        });
        document.body.classList.remove('modal-open');
        document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());
    }

    // Função para enviar a foto (Selfie e Selfie com RG/CNH)
    async function submitSinglePhoto(canvasElement, modal, imageElement, displayElement, uploadType) {
        const imageData = canvasElement.toDataURL('image/png');
        localStorage.setItem('userSelfie', imageData);
        imageElement.src = imageData;
        displayElement.style.display = 'block';
        await stopCamera(null);
        modal.hide();
        if (uploadType === 'selfie') selfieUploaded = true;
        else if (uploadType === 'selfieRgCnh') selfieRgCnhUploaded = true;
        checkAllUploads();
        console.log('Foto enviada para:', displayElement.id);
        document.querySelectorAll('[data-bs-target]').forEach(button => {
            button.disabled = false;
            button.classList.remove('disabled');
        });
        document.body.classList.remove('modal-open');
        document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());
    }

    // Modal 1: Selfie
    const modal1 = new bootstrap.Modal(document.getElementById('modalUpload1'));
    const video1 = document.getElementById('video1');
    const canvas1 = document.getElementById('canvas1');
    const preview1 = document.getElementById('preview1');
    const capture1 = document.getElementById('capture1');
    const recapture1 = document.getElementById('recapture1');
    const submit1 = document.getElementById('submit1');
    const selfieImage = document.getElementById('selfieImage');
    const selfieDisplay = document.getElementById('selfieDisplay');

    document.getElementById('modalUpload1').addEventListener('shown.bs.modal', async () => {
        await startCamera(video1);
    });

    document.getElementById('modalUpload1').addEventListener('hidden.bs.modal', async () => {
        await stopCamera(video1);
        video1.style.display = 'block';
        preview1.style.display = 'none';
        submit1.classList.add('d-none');
        recapture1.classList.add('d-none');
        capture1.classList.remove('d-none');
        document.querySelectorAll('[data-bs-target]').forEach(button => {
            button.disabled = false;
            button.classList.remove('disabled');
        });
        document.body.classList.remove('modal-open');
        document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());
        console.log('Modal 1 fechado, botões reativados, interface limpa');
    });

    capture1.addEventListener('click', async () => {
        await captureSinglePhoto(video1, canvas1, preview1, submit1, recapture1, capture1);
    });

    recapture1.addEventListener('click', async () => {
        await recaptureSinglePhoto(video1, preview1, submit1, recapture1, capture1);
    });

    submit1.addEventListener('click', async () => {
        await submitSinglePhoto(canvas1, modal1, selfieImage, selfieDisplay, 'selfie');
    });

    // Modal 2: Selfie com RG ou CNH
    const modal2 = new bootstrap.Modal(document.getElementById('modalUpload2'));
    const video2 = document.getElementById('video2');
    const canvas2 = document.getElementById('canvas2');
    const preview2 = document.getElementById('preview2');
    const capture2 = document.getElementById('capture2');
    const recapture2 = document.getElementById('recapture2');
    const submit2 = document.getElementById('submit2');
    const selfieRgCnhImage = document.getElementById('selfieRgCnhImage');
    const selfieRgCnhDisplay = document.getElementById('selfieRgCnhDisplay');

    document.getElementById('modalUpload2').addEventListener('shown.bs.modal', async () => {
        await startCamera(video2);
    });

    document.getElementById('modalUpload2').addEventListener('hidden.bs.modal', async () => {
        await stopCamera(video2);
        video2.style.display = 'block';
        preview2.style.display = 'none';
        submit2.classList.add('d-none');
        recapture2.classList.add('d-none');
        capture2.classList.remove('d-none');
        document.querySelectorAll('[data-bs-target]').forEach(button => {
            button.disabled = false;
            button.classList.remove('disabled');
        });
        document.body.classList.remove('modal-open');
        document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());
        console.log('Modal 2 fechado, botões reativados, interface limpa');
    });

    capture2.addEventListener('click', async () => {
        await captureSinglePhoto(video2, canvas2, preview2, submit2, recapture2, capture2);
    });

    recapture2.addEventListener('click', async () => {
        await recaptureSinglePhoto(video2, preview2, submit2, recapture2, capture2);
    });

    submit2.addEventListener('click', async () => {
        await submitSinglePhoto(canvas2, modal2, selfieRgCnhImage, selfieRgCnhDisplay, 'selfieRgCnh');
    });

    // Modal 3: Frente e verso do RG ou CNH
    const modal3 = new bootstrap.Modal(document.getElementById('modalUpload3'));
    const video3 = document.getElementById('video3');
    const canvas3 = document.getElementById('canvas3');
    const previewFront = document.getElementById('previewFront');
    const previewBack = document.getElementById('previewBack');
    const captureInstruction = document.getElementById('captureInstruction');
    const capture3 = document.getElementById('capture3');
    const recapture3 = document.getElementById('recapture3');
    const nextCapture3 = document.getElementById('nextCapture3');
    const submit3 = document.getElementById('submit3');
    const docDisplay = document.getElementById('docDisplay');

    document.getElementById('modalUpload3').addEventListener('shown.bs.modal', async () => {
        await startCamera(video3);
        captureInstruction.textContent = 'Capturar frente do RG ou CNH';
        capture3.textContent = 'Capturar Frente';
        capture3.classList.remove('d-none');
        nextCapture3.classList.add('d-none');
        recapture3.classList.add('d-none');
        submit3.classList.add('d-none');
        frontCaptured = false;
        backCaptured = false;
    });

    document.getElementById('modalUpload3').addEventListener('hidden.bs.modal', async () => {
        await stopCamera(video3);
        video3.style.display = 'block';
        previewFront.style.display = 'none';
        previewBack.style.display = 'none';
        document.getElementById('previewContainer').style.display = 'none';
        submit3.classList.add('d-none');
        nextCapture3.classList.add('d-none');
        recapture3.classList.add('d-none');
        capture3.classList.remove('d-none');
        captureInstruction.textContent = 'Capturar frente do RG ou CNH';
        capture3.textContent = 'Capturar Frente';
        frontCaptured = false;
        backCaptured = false;
        document.querySelectorAll('[data-bs-target]').forEach(button => {
            button.disabled = false;
            button.classList.remove('disabled');
        });
        document.body.classList.remove('modal-open');
        document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove());
        console.log('Modal 3 fechado, botões reativados, interface limpa');
    });

    capture3.addEventListener('click', async () => {
        if (frontCaptured && !backCaptured) {
            // Captura o verso
            await captureDoublePhoto(video3, canvas3, previewBack, captureInstruction, submit3, nextCapture3, recapture3, capture3, false);
        } else {
            // Captura a frente
            await captureDoublePhoto(video3, canvas3, previewFront, captureInstruction, submit3, nextCapture3, recapture3, capture3, true);
        }
    });

    nextCapture3.addEventListener('click', async () => {
        if (!frontCaptured) {
            alert('Por favor, capture a frente primeiro.');
            return;
        }
        await prepareBackCapture(video3, previewBack, captureInstruction, nextCapture3, capture3);
    });

    recapture3.addEventListener('click', async () => {
        const isFront = !backCaptured;
        await recaptureDoublePhoto(video3, isFront ? previewFront : previewBack, captureInstruction, submit3, nextCapture3, recapture3, capture3, isFront);
    });

    submit3.addEventListener('click', async () => {
        await submitDoublePhoto(canvas3, modal3, previewFront, previewBack, docDisplay, previewFront, previewBack);
    });

    window.goBack = function () {
        console.log('Clicou em Voltar - Etapa 4');
        window.location.href = '../tela_token/token.html';
    };

    window.goNext = function () {
        console.log('Clicou em Próximo passo - Etapa 4');
        if (!nextButton.disabled) {
            console.log('Todos os uploads concluídos, redirecionando para Etapa 5');
            window.location.href = '../audio_aceite/audioAceite.html';
        } else {
            console.log('Uploads pendentes, não redirecionando');
        }
    };

    checkAllUploads();
});

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const geoString = `${latitude}, ${longitude}`;
            localStorage.setItem('userGeo', geoString);
            console.log('Geolocalização salva:', geoString);
        },
        (error) => {
            console.error('Erro ao obter geolocalização:', error);
            localStorage.setItem('userGeo', 'Geo não informada');
        }
    );
} else {
    console.log('Geolocalização não suportada no navegador.');
    localStorage.setItem('userGeo', 'Geo não suportada');
}

