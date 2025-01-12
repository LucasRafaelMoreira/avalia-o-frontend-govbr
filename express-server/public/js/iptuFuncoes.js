async function fetchProperty() {
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