async function fetchClient() {
    try {
        const response = await fetch('http://localhost:3000/api/clients');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const clients = await response.json();

        const clientTable = document.getElementById('clientTable');
        const clientTableBody = clientTable.querySelector('tbody');

        // Clear existing table rows
        clientTableBody.innerHTML = '';

        clients.forEach(client => {

        const row = clientTableBody.insertRow();
        row.insertCell(0).textContent = client.id;
        row.insertCell(1).textContent = client.nome;
        row.insertCell(2).textContent = client.nascimento;
        row.insertCell(3).textContent = client.cpf;
        row.insertCell(4).textContent = client.telefone;
        row.insertCell(5).textContent = client.endereco;
        });
    } catch (error) {
        console.error('Fetch error:', error);
        const clientTable = document.getElementById('clientTable');
        const clientTableBody = clientTable.querySelector('tbody');

        // Clear existing table rows
        clientTableBody.innerHTML = '';

        const row = clientTableBody.insertRow();
        row.insertCell(0).textContent = 'Error';
        row.insertCell(1).textContent = '';
        row.insertCell(2).textContent = '';
        row.insertCell(3).textContent = '';
        row.insertCell(4).textContent = '';
        row.insertCell(5).textContent = '';
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

async function remover() {
    const clientId = document.getElementById('clientId').value;

    try {
        const response = await fetch(`http://localhost:3000/api/clients/${clientId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Registro removido com sucesso!");
        } else {
            alert("Erro ao remover o registro. Tente novamente.");
        }
    } catch (error) {
        console.error('Fetch error:', error);
        alert("Erro ao remover o registro. Tente novamente.");
    }
}