async function fetchProperty() {
    try {
        const response = await fetch('http://localhost:3000/api/properties');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const properties = await response.json();

        const propertyTable = document.getElementById('propertyTable');
        const propertyTableBody = propertyTable.querySelector('tbody');

        // Clear existing table rows
        propertyTableBody.innerHTML = '';

        properties.forEach(property => {
            const row = propertyTableBody.insertRow();
            row.insertCell(0).textContent = property.id;
            row.insertCell(1).textContent = property.nomePropietario;
            row.insertCell(2).textContent = property.endereco;
            row.insertCell(3).textContent = property.tipoImovel;
            row.insertCell(4).textContent = property.area;
            row.insertCell(5).textContent = property.valorImovel;
            row.insertCell(6).textContent = property.aliquota;
            row.insertCell(7).textContent = property.dataRegistro;
        });
    } catch (error) {
        console.error('Fetch error:', error);
        const propertyTable = document.getElementById('propertyTable');
        const propertyTableBody = propertyTable.querySelector('tbody');

        // Clear existing table rows
        propertyTableBody.innerHTML = '';

        const row = propertyTableBody.insertRow();
        row.insertCell(0).textContent = 'Error';
        row.insertCell(1).textContent = '';
        row.insertCell(2).textContent = '';
        row.insertCell(3).textContent = '';
        row.insertCell(4).textContent = '';
        row.insertCell(5).textContent = '';
        row.insertCell(6).textContent = '';
        row.insertCell(7).textContent = '';
    }
}



async function registrar() {

    const nomePropietario = document.getElementById("nomePropietario").value;
    const endereco = document.getElementById("endereco").value;
    const tipoImovel = document.getElementById("tipoImovel").value;
    const area = document.getElementById("area").value;
    const valorImovel = document.getElementById("valorImovel").value;
    const aliquota = document.getElementById("aliquota").value;
    const dataRegistro = document.getElementById("dataRegistro").value;


    const response = await fetch('http://localhost:3000/api/properties/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nomePropietario, endereco, tipoImovel, area, valorImovel, aliquota, dataRegistro })
    });
    if (response.ok) {
        alert("Registro salvo com sucesso!");
    } else {
        alert("Erro ao salvar o registro. Tente novamente.");
    }



}

async function remover() {
    const propertyId = document.getElementById('propertyId').value;

    try {
        const response = await fetch(`http://localhost:3000/api/properties/${propertyId}`, {
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

