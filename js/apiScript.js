// Variables para controlar la visibilidad
let dataVisible = false;

document.getElementById('fetchDataButton').addEventListener('click', function() {
    const container = document.getElementById('apiDataContainer');
    const hideButton = document.getElementById('hideDataButton');
    
    if (!dataVisible) {
        // Si los datos no son visibles, los obtenemos y los mostramos
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                console.log('Datos obtenidos de la API:', data);
                displayData(data);
                dataVisible = true;  // Cambiamos el estado de la visibilidad
                hideButton.style.display = 'inline'; // Mostrar botón de ocultar
            })
            .catch(error => {
                console.error('Error al obtener datos de la API:', error);
            });
    }
});

document.getElementById('hideDataButton').addEventListener('click', function() {
    const container = document.getElementById('apiDataContainer');
    const hideButton = document.getElementById('hideDataButton');
    
    if (dataVisible) {
        // Si los datos son visibles, los ocultamos
        container.innerHTML = '';  // Limpiamos el contenedor
        dataVisible = false;  // Cambiamos el estado de la visibilidad
        hideButton.style.display = 'none'; // Ocultar botón de ocultar
    }
});

function displayData(data) {
    const container = document.getElementById('apiDataContainer');
    container.innerHTML = ''; // Limpia contenedor

    // Suponiendo que data es una lista de objetos
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'data-item';
        div.innerHTML = `
            <h2>ID: ${item.id}</h2>
            <p><strong>Título:</strong> ${item.title}</p>
            <p><strong>Descripción:</strong> ${item.body}</p>
            <p><strong>User ID:</strong> ${item.userId}</p>
        `;
        container.appendChild(div);
    });
}
