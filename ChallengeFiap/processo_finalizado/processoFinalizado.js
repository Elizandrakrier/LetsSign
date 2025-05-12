document.addEventListener('DOMContentLoaded', function () {

  const headerUserName = document.getElementById('headerUserName');

  const fullName = localStorage.getItem('userFullName');
if (fullName) {
  headerUserName.textContent = fullName;
} else {
  headerUserName.textContent = 'Nome não encontrado';
}
    const selfie = localStorage.getItem('userSelfie');

    if (selfie) {
        document.getElementById('fotoUsuario').src = selfie;
    } else {
        console.log('Nenhuma selfie encontrada no localStorage');
    }


});



document.addEventListener('DOMContentLoaded', function () {
    const nome = localStorage.getItem('userFullName') || 'Nome não informado';
    const cpf = '123.456.789-00';
    const cargo = 'Desenvolvedor Front-End';
    const email = localStorage.getItem('userEmail') || 'E-mail não informado';
    const dataAssinatura = localStorage.getItem('dataAssinatura') || new Date().toLocaleString();
    const dataVisualizacao = localStorage.getItem('dataVisualizacao') || new Date().toLocaleString();
    const dataLeitura = localStorage.getItem('dataLeitura') || new Date().toLocaleString();
    const ip = '192.168.43.17';
    const ipv6 = '2001:0db8:85a3:0000:8a2e:0370:7334';
    const geo = localStorage.getItem('userGeo') || 'Geo não informada';
  
    document.getElementById('nomeUsuario').textContent = nome;
    document.getElementById('cpfUsuario').textContent = cpf;
    document.getElementById('cargoUsuario').textContent = cargo;
    document.getElementById('emailUsuario').textContent = email;
    document.getElementById('dataAssinatura').textContent = dataAssinatura;
    document.getElementById('dataVisualizacao').textContent = dataVisualizacao;
    document.getElementById('dataLeitura').textContent = dataLeitura;
    document.getElementById('ipUsuario').textContent = ip;
    document.getElementById('ipv6Usuario').textContent = ipv6;
    document.getElementById('geoUsuario').textContent = geo;
  });

const geo = localStorage.getItem('userGeo') || 'Geo não informada';
document.getElementById('geoUsuario').textContent = geo;

document.getElementById('btnDownloadTxt').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;

    const elemento = document.getElementById('conteudoParaPDF');

    html2canvas(elemento, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('assinatura.pdf');
    });
  });

