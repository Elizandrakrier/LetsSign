document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('backButton');
    const nextButton = document.getElementById('nextButton');
    const signatureForm = document.getElementById('signatureForm');
    const headerUserName = document.getElementById('headerUserName');

    const fullName = localStorage.getItem('userFullName');
if (fullName) {
    headerUserName.textContent = fullName;
} else {
    headerUserName.textContent = 'Nome não encontrado';
}

    if (backButton) {
        backButton.addEventListener('click', function(event) {
            console.log('Botão Voltar clicado');
            window.location.href = '../perguntas_validacao1/perguntasValidacao1.html';
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function(event) {

            // Validação do formulário :
            if (signatureForm.checkValidity()) {
                console.log('Formulário válido. Próximo passo.');

                const fullNameDog = document.getElementById('fullnamedog').value;
                const firstJob = document.getElementById('firstjob').value;
                const liveCity = document.getElementById('livecity').value;

                console.log('Nome do cachorro:', fullNameDog);
                console.log('Primeira empresa:', firstJob);
                console.log('Cidade natal:', liveCity);

                sessionStorage.setItem('resposta1', fullNameDog);
                sessionStorage.setItem('resposta2', firstJob);
                sessionStorage.setItem('resposta3', liveCity);

               window.location.href = '../perguntas_validacao3/perguntasValidacao3.html';


            } else {
                console.log('Formulário inválido. Por favor, preencha todos os campos.');
                signatureForm.reportValidity();
            }
        });
    }
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