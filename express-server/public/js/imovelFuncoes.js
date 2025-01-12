async function fetchProperty() {
    const propertyId = document.getElementById('propertyId').value;
    const response = await fetch(`http://localhost:3000/api/clients/${propertyId}`);
    const property = await response.json();
    return property;
     }

async function registrar() {
    
    const nomePropietario = document.getElementById("nomePropietario").value;
    const endereco = document.getElementById("endereco").value;
    const tipoImovel = document.getElementById("tipoImovel").value;
    const area = document.getElementById("area").value;
    const valorImovel = document.getElementById("valorImovel").value;
    const dataRegistro = document.getElementById("dataRegistro").value;

    if (!nomePropietario || !tipoImovel || !area || !valorImovel || !endereco || !dataRegistro) {
        alert('Todos os campos (nome, cpf, nascimento, telefone, endereço) são obrigatórios!');
    } else {
          const response = await fetch('http://localhost:3000/api/clients/registroImovel', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({nomePropietario, endereco, tipoImovel, area, valorImovel, dataRegistro })
          });
      }


}