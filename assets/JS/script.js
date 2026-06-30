// Estos son los servicios que ofrezco a los clientes.
const catalogoServicios = [
    {
        id: "01",
        nombre: "Desarrollo Web",
        precio: 1800
    },
    {
        id: "02",
        nombre: "Mantenimiento PC",
        precio: 800
    },
    {
        id: "03",
        nombre: "Optimizacion de Sistema Operativo(Windows)",
        precio: 600
    }
]
// Creada con JQuery
const $select =  $('#servicio');


catalogoServicios.forEach(
    function(servicio) {
    $select.append(
        $('<option></option>')
            .val(`${servicio.id}`)
            .text(`${servicio.nombre}`)
    );
});
// Function para el resultado

function calcularTotal() {
    const servicioSeleccionado = $('#servicio').val();
    const cantidad = parseInt($('#cantidad').val()) || 1;
    const detalles=$('#detalles').val();
    const servicio = catalogoServicios.find(s => s.id === servicioSeleccionado);
    
    if (servicio) {
        $('#precio-servicio').text(`C$ ${servicio.precio}`);
        const total = servicio.precio * cantidad;
        $('#total-estimado').text(`C$ ${total}`);
    } else {
        $('#precio-servicio').text('C$ 0');
        $('#total-estimado').text('C$ 0');
    }
}
$('#servicio, #cantidad').on('change input', function() {
    calcularTotal();
});

// Function para el boton de envio del FORM.
$('#FormCotizador').on('submit', function(event) {
    event.preventDefault(); 

    
    const nombre = $('#nombre').val();
    const email = $('#email').val();
    const telefono = $('#telefono').val();
    const detalles = $('#detalles').val();
    const servicioSeleccionado = $('#servicio').val();
    const cantidad = $('#cantidad').val();

    //  VALIDACIONES

    // Tamaño minimo para el nombre es de 4 caracteres.
    if (nombre.length < 4) {
        alert("El nombre debe tener al menos 4 caracteres.");
        return;
    }

    // Regex para validar el número de teléfono (exactamente 8 dígitos)
    const telefonoRegex = /^\d{8}$/;
    if (!telefonoRegex.test(telefono)) {
        alert("Por favor, ingresá un número de teléfono válido de 8 dígitos.");
        return;
    }

    
    // Regex para validar el correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, ingresá un correo electrónico válido.");
        return;
    }

    // Tamaño minimo para los detalles es de 20 caracteres.
    if (detalles.length < 20) {
        alert("Las observaciones adicionales deben tener al menos 20 caracteres.");
        return;
    }

    // Proceder con el envio.
    alert("¡Validación exitosa! Enviando cotización...");

    const datosCotizacion = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        servicioId: servicioSeleccionado,
        cantidad: parseInt(cantidad),
        detalles: detalles
    };
    
    console.log("=== 🗿🗿SIMULANDO ENVÍO AL BACKEND 🗿🗿===");
    
    
    alert("¡Validación exitosa! Tu cotización ha sido procesada correctamente.");
    
    
    console.log(`Nombre:${datosCotizacion.nombre}, Email:${datosCotizacion.email}, Telefono:${datosCotizacion.servicioId},Servicio:${datosCotizacion.servicioId}, Cantidad:${datosCotizacion.cantidad},
    Detalles:${datosCotizacion.detalles}`)
    
});

