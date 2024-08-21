document.getElementById('cotizadorForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtener los valores del formulario
  const tipoPropiedad = document.getElementById('tipoPropiedad').value;
  const ubicacion = document.getElementById('ubicacion').value;
  const tipoConstruccion = document.getElementById('tipoConstruccion').value;
  let metrosCuadrados = parseFloat(document.getElementById('metrosCuadrados').value);
  let valorPropiedad = parseFloat(document.getElementById('valorPropiedad').value);
  let antiguedad = parseInt(document.getElementById('antiguedad').value, 10);
  const seguroIncendio = document.getElementById('seguroIncendio').checked;
  const seguroRobo = document.getElementById('seguroRobo').checked;
  const seguroDesastresNaturales = document.getElementById('seguroDesastresNaturales').checked;
  const plomeria = document.getElementById('plomeria').checked;
  const gasista = document.getElementById('gasista').checked;
  const cerrajeria = document.getElementById('cerrajeria').checked;
  const nombre = document.getElementById('nombre').value;
  const numeroDocumento = document.getElementById('numeroDocumento').value;

  // Validar que los valores numéricos no sean negativos
  if (metrosCuadrados < 0 || valorPropiedad < 0 || antiguedad < 0) {
    alert('Por favor, ingresa valores mayores o iguales a cero en los campos numéricos.');
    return;
  }

  // Validar que el nombre solo contenga letras (y espacios si es necesario)
  const nombreValido = /^[a-zA-Z\s]+$/.test(nombre);
  if (!nombreValido) {
    alert('Por favor, ingresa un nombre válido que solo contenga letras y espacios.');
    return;
  }

  // Generar un ID único para la cotización
  const cotizacionId = new Date().getTime();

  // Lógica para calcular la póliza
  let costoBase = valorPropiedad * 0.001; // 0.1% del valor de la propiedad

  // Ajuste por ubicación
  switch(ubicacion) {
    case 'urbana':
      costoBase *= 1.2; // Incrementa un 20% si es urbana
      break;
    case 'suburbana':
      costoBase *= 1.1; // Incrementa un 10% si es suburbana
      break;
    case 'rural':
      costoBase *= 0.9; // Disminuye un 10% si es rural
      break;
  }

  // Ajuste por tipo de propiedad
  if (tipoPropiedad === 'comercio') {
    costoBase *= 1.5; // Incrementa un 50% si es comercio
  }

  // Ajuste por tipo de construcción
  switch(tipoConstruccion) {
    case 'ladrillo':
      costoBase *= 1.0; // Sin cambio si es de ladrillo
      break;
    case 'madera':
      costoBase *= 1.3; // Incrementa un 30% si es de madera
      break;
    case 'mixta':
      costoBase *= 1.15; // Incrementa un 15% si es mixta
      break;
  }

  // Ajuste por antigüedad
  if (antiguedad <= 5) {
    costoBase *= 0.95; // Disminuye un 5% si la propiedad tiene 5 años o menos
  } else if (antiguedad > 30) {
    costoBase *= 1.1; // Incrementa un 10% si la propiedad tiene más de 30 años
  }

  // Ajuste por seguros adicionales
  if (seguroIncendio) {
    costoBase += 200; // Costo  por seguro contra incendios
  }
  
  if (seguroRobo) {
    costoBase += 150; // Costo  por seguro contra robo
  }

  if (seguroDesastresNaturales) {
    costoBase += 250; // Costo por seguro contra desastres naturales
  }

  // Ajuste por coberturas adicionales
  if (plomeria) {
    costoBase += 100; // Costo cobertura de plomería
  }
  
  if (gasista) {
    costoBase += 120; // Costocobertura de gasista
  }

  if (cerrajeria) {
    costoBase += 80; // Costo cobertura de cerrajería
  }

  // Cálculo del costo final basado en metros cuadrados
  const costoFinal = costoBase * metrosCuadrados;

  // Muestra el resultado del formulario
  document.getElementById('resultadoCotizacion').innerHTML = `
    <h2>Resultado de la Cotización</h2>
    <p>El costo estimado de la póliza es: <strong>USD ${costoFinal.toFixed(2)}</strong></p>
    <p>ID de Cotización: <strong>${cotizacionId}</strong></p>
  `;

  // Creo un array con los datos del formulario
  const datosFormulario = [
    { campo: 'ID de Cotización', valor: cotizacionId },
    { campo: 'Nombre', valor: nombre },
    { campo: 'Número de Documento', valor: numeroDocumento },
    { campo: 'Tipo de Propiedad', valor: tipoPropiedad },
    { campo: 'Ubicación', valor: ubicacion },
    { campo: 'Tipo de Construcción', valor: tipoConstruccion },
    { campo: 'Metros Cuadrados', valor: metrosCuadrados },
    { campo: 'Valor de la Propiedad (USD)', valor: valorPropiedad.toFixed(2) },
    { campo: 'Antigüedad (años)', valor: antiguedad },
    { campo: 'Seguro Contra Incendios', valor: seguroIncendio ? 'Sí' : 'No' },
    { campo: 'Seguro Contra Robo', valor: seguroRobo ? 'Sí' : 'No' },
    { campo: 'Seguro Contra Desastres Naturales', valor: seguroDesastresNaturales ? 'Sí' : 'No' },
    { campo: 'Cobertura de Plomería', valor: plomeria ? 'Sí' : 'No' },
    { campo: 'Cobertura de Gasista', valor: gasista ? 'Sí' : 'No' },
    { campo: 'Cobertura de Cerrajería', valor: cerrajeria ? 'Sí' : 'No' },
    { campo: 'Costo Final Estimado de la Póliza (USD)', valor: costoFinal.toFixed(2) }
  ];

  
  console.log('Datos del Formulario:', datosFormulario);
});
