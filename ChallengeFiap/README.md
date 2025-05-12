# ChallengeFiap

## LetsSign – Transformando a Validação de Documentos Digitais 🚀

## 📌 Sobre o Projeto
**LetsSign** é uma plataforma inovadora que revoluciona a assinatura digital e eletrônica de documentos. Nossa solução combina tecnologia de validação multifatorial com usabilidade intuitiva, garantindo segurança, conformidade legal e eficiência no processo de assinatura.

## 🔍 Funcionalidades
- **Triangulação de Dados**:
  - Captura do **IP** para verificação de origem.
  - **Geolocalização** para validar a localização do signatário.
  - **Validação de e-mail** para evitar fraudes.

- **Reconhecimento Facial**:
  - Confirmação visual automática do signatário com base em documentos oficiais.

- **Perguntas Personalíssimas**:
  - Geração de perguntas aleatórias para autenticação adicional de usuários recorrentes.

- **Áudio de Aceite**:
  - Registro em áudio do consentimento do usuário para reforçar a validade jurídica.

- **Assinatura Digital Segura**:
  - Uso de **criptografia** e **certificação digital** para garantir a integridade do documento.

## 🔐 Segurança & Conformidade
O LetsSign segue os padrões de segurança exigidos pela legislação brasileira, incluindo:
- **Lei Geral de Proteção de Dados (LGPD)**
- **Marco Civil da Internet**
- **Normas internacionais de segurança de dados**

## ⚙️ Como Funciona?
1. **Registro e Autenticação**:
   - Cadastro do usuário com validação de identidade via reconhecimento facial e documentos oficiais.

2. **Processo de Assinatura**:
   - Triangulação de dados (IP, geolocalização e e-mail).
   - Perguntas personalíssimas para autenticação adicional.
   - Registro de **áudio de aceite**.

3. **Finalização & Armazenamento**:
   - O documento é **criptografado**, armazenado com um certificado digital e anexado a um relatório de auditoria para validade jurídica.

## 🎨 Protótipo das Telas
Acesse o design do projeto no **Figma**:
🔗 [Protótipo no Figma](https://www.figma.com/design/qfsCB8Yl94w9bp0t9XoTZg/Challenge-Fiap?node-id=0-1&node-type=canvas&t=rhfHYiHioTG8Y8pf-0)

## 🚀 Diferenciais da Solução
✅ **Alta segurança** com autenticação multifatorial.  
✅ **Facilidade de uso** para qualquer tipo de usuário.  
✅ **Cumprimento das exigências legais** para validade jurídica.  
✅ **Prevenção contra fraudes** com análises em tempo real.  

## 💡 Benefícios do LetsSign
🔹 **Maior confiabilidade** na autenticação de signatários.  
🔹 **Redução de riscos** de falsificação e uso indevido.  
🔹 **Automação do processo de assinatura**, reduzindo burocracia.  
🔹 **Facilidade de implementação** em diversas plataformas.  

## 🛠️ Tecnologias Utilizadas
- Java / Kotlin (Back-end)
- React / React Native (Front-end)
- Firebase / AWS (Armazenamento & Autenticação)
- OpenCV (Reconhecimento Facial)
- API REST para integração com sistemas externos

## 📌 Padrão para Nome das Branches
A estrutura das branches pode seguir o formato: tipo/nome-da-feature

🔹 Tipos de Branches

- feature/ -->	Para desenvolvimento de novas funcionalidades	--> feature/autenticacao-usuario
- fix/	--> 	Para correção de bugs	-->	fix/corrigir-erro-login
- hotfix/	--> 	Para correções críticas em produção	--> 	hotfix/ajuste-token-expirado
- refactor/	--> 	Para refatoração de código	--> 	refactor/melhorar-arquitetura
- docs/	--> 	Para atualização de documentação	--> 	docs/atualizar-readme
- test/	--> 	Para implementação ou correção de testes	--> 	test/cobertura-api
- chore/	--> 	Para pequenas melhorias, como ajustes de config	--> 	chore/config-eslint

## 📌 Padrão para Commits
Os commits devem seguir um formato claro e descritivo: <tipo>: <descrição curta>

🔹 Tipos de Commits

- feat:	--> 		Adiciona uma nova funcionalidade
- fix:	--> 		Corrige um bug
- hotfix:	--> 		Corrige um bug crítico em produção
- refactor:	--> 		Refatora código sem alterar comportamento
- docs:	--> 		Atualiza a documentação
- test:	--> 		Adiciona ou corrige testes
- chore:	--> 		Pequenas melhorias sem impacto direto no código
- style:	--> 		Ajustes de formatação, como indentação e espaçamento
- perf:	--> 		Melhorias de performance

## 📌 Fluxo de Trabalho 

1️⃣ Criar uma branch a partir da main: git checkout -b feature/nome-da-feature.

2️⃣ Fazer commits seguindo o padrão: git commit -m "feat: implementar recuperação de senha".

3️⃣ Enviar para o repositório remoto: git push origin feature/nome-da-feature.

4️⃣ Criar um Pull Request (PR) para a main.	Sempre descrever o que foi feito e marcar alguém do time para revisar.

5️⃣ Após aprovação, fazer merge para a main.

git checkout main
git pull origin main
git merge feature/nome-da-feature
git push origin main

6️⃣ Deletar a branch após o merge.

git branch -d feature/nome-da-feature
git push origin --delete feature/nome-da-feature

OBS: o merge será feito apenas pelo aprovador.





