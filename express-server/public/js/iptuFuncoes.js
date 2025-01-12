async function calcularIPTU() {
    const propertyId = document.getElementById('propertyId').value;
    const response = await fetch(`http://localhost:3000/api/properties/${propertyId}`);
    const property = await response.json();

    if (response.ok) {

        porcent = property.aliquota/100;

        IPTU = (property.area * property.valorImovel) * porcent;

        document.getElementById("valorIptu").innerHTML = "Valor do IPTU: R$ " + IPTU;

    } else {
        document.getElementById("valorIptu").innerHTML = "Erro ao calcular o IPTU. Tente novamente.";
    }
}

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