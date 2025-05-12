document.addEventListener('DOMContentLoaded', function () {
  const fullNameInput = document.getElementById('fullname');
  const birthDateInput = document.getElementById('birthDate');
  const emailInput = document.getElementById('email');
  const nextButton = document.getElementById('nextButton');
  const headerUserName = document.getElementById('headerUserName');

  // Exibir o nome no cabeçalho, se já existir no localStorage
  const fullName = localStorage.getItem('fullName');
  if (fullName) {
    headerUserName.textContent = fullName;
  } else {
    headerUserName.textContent = 'Nome não encontrado';
  }

  function validateForm() {
    const nameValid = fullNameInput.value.trim() !== '';
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    const dateValid = dateRegex.test(birthDateInput.value.trim());
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValid = emailRegex.test(emailInput.value.trim());

    console.log('Validação - Nome:', nameValid, 'Data:', dateValid, 'E-mail:', emailValid);
    console.log('Valores - Nome:', fullNameInput.value, 'Data:', birthDateInput.value, 'E-mail:', emailInput.value);

    const isValid = nameValid && dateValid && emailValid;

    if (!nameValid) fullNameInput.classList.add('is-invalid');
    else fullNameInput.classList.remove('is-invalid');

    if (!dateValid) birthDateInput.classList.add('is-invalid');
    else birthDateInput.classList.remove('is-invalid');

    if (!emailValid) emailInput.classList.add('is-invalid');
    else emailInput.classList.remove('is-invalid');

    nextButton.disabled = !isValid;
    console.log('Botão "Próximo passo" ativado:', !nextButton.disabled);
    return isValid;
  }

  birthDateInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 4) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4);
    } else if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    e.target.value = value;
    validateForm();
  });

  fullNameInput.addEventListener('input', validateForm);
  emailInput.addEventListener('input', validateForm);

  window.goBack = function () {
    console.log('Clicou em Voltar - Etapa 1');
    window.location.href = '../cadastro_assinatura/cadastroAssinatura.html';
  };

  window.goNext = function () {
    console.log('Clicou em Próximo passo - Etapa 1');
    if (validateForm()) {
      localStorage.setItem('userFullName', fullNameInput.value.trim()); // Salva nome
      localStorage.setItem('userBirthDate', birthDateInput.value.trim()); // Salva data de nascimento
      localStorage.setItem('userEmail', emailInput.value.trim()); // Salva e-mail
    
      console.log('Dados salvos: Nome:', fullNameInput.value, 'Data:', birthDateInput.value, 'Email:', emailInput.value);
    
      window.location.href = '../cadastro_assinatura/cadastroAssinatura.html';
    }
    
    else {
      console.log('Validação falhou, não redirecionando');
    }
  };

  validateForm();
});