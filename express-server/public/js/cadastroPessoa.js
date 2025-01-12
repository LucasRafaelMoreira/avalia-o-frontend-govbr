async function fetchClient() {
    const clientId = document.getElementById('clientId').value;
    const response = await fetch(`http://localhost:3000/api/clients/${clientId}`);
    const client = await response.json();

    const clientInfoDiv = document.getElementById('clientInfo');
    if (response.ok) {
        clientInfoDiv.innerHTML = `<p>ID: ${client.id}</p><p>Name: ${client.name}</p><p>Email: ${client.email}</p>`;
    } else {
        clientInfoDiv.innerHTML = `<p>${client.message}</p>`;
    }
}

async function registrar() {
    
    const nome = document.getElementById("nome").value;
    const nascimento = document.getElementById("nascimento").value;
    const cpf = document.getElementById("cpf").value;
    const telefone = document.getElementById("telefone").value;
    const endereco = document.getElementById("endereco").value;

    if (!nome || !cpf || !nascimento || !telefone || !endereco) {
        alert('Todos os campos (nome, cpf, nascimento, telefone, endereço) são obrigatórios!');
    } else {
          const response = await fetch('http://localhost:3000/api/clients', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({nome, nascimento, cpf, telefone, endereco })
          });
      }


}