document.getElementById('fetchDataButton').addEventListener('click', function() {
  fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
          console.log('Datos obtenidos de la API:', data);
          displayData(data);
      })
      .catch(error => {
          console.error('Error al obtener datos de la API:', error);
      });
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
