document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCotizador');
    const resultadoDiv = document.getElementById('resultadoCotizacion');
    const resumenTexto = document.getElementById('resumenTexto');
    const detalleCuotas = document.getElementById('detalleCuotas');

  
    const botones = form.querySelectorAll('button');
    let btnCalcular = botones[0]; // El primer botón: "Calcular Presupuesto"
    let btnEnviar = botones[2];   // El tercer botón: "Enviar"

    // Variable de control
    let presupuestoCalculado = false;
    let totalGlobalParaBackend = 0;

    // Limpiar el DOM al presionar "Limpiar"
    form.addEventListener('reset', () => {
        resultadoDiv.style.display = 'none';
        resumenTexto.innerHTML = "";
        detalleCuotas.innerHTML = "";
        presupuestoCalculado = false;
        totalGlobalParaBackend = 0;
    });

    // Cambiamos el comportamiento del primer botón para que SOLO calcule y NO recargue la página
    btnCalcular.addEventListener('click', (e) => {
        e.preventDefault(); // Evita que el botón submit por defecto recargue la web

        // Obtener datos del formulario a través  del DOM
        const nombre = document.getElementById('nombre').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const servicio = document.getElementById('servicio').value;
        const numCuotas = parseInt(document.getElementById('cuotas').value);

        // Validaciones básicas requeridas
        if (nombre === "") {
            alert("Por favor, ingrese su nombre completo.");
            return;
        }
        if (telefono.length > 0 && telefono.length < 8) {
            alert("El número de teléfono debe tener al menos 8 dígitos.");
            return;
        }

        let precioBase = 0;
        let cargoExtra = 0;
        let ajuste = 0; 
        let textoAjuste = "";

        // Asignación de precios base en Córdobas
        if (servicio === "desarrolloWeb") {
            precioBase = 1800;
        } else if (servicio === "mantenimiento") {
            precioBase = 800;
        } else { 
            precioBase = 600; 
            cargoExtra = 150; // Cargo por optimización de utilidades
        }

        // Reglas de negocio (Descuento de contado vs Recargo por cuotas)
        if (numCuotas === 1) {
            ajuste = -0.10; // 10% Descuento
            textoAjuste = " (10% descuento de contado aplicado)";
        } 
        else if (numCuotas > 1) {
            ajuste = 0.05;  // 5% Recargo
            textoAjuste = " (5% recargo por financiamiento incluido)";
        }

        const subtotal = (precioBase + cargoExtra) * (1 + ajuste);
        const totalConIva = subtotal * 1.15; // 15% 
        const valorCuota = totalConIva / numCuotas;

        // Guardamos estados para el botón enviar
        totalGlobalParaBackend = totalConIva;
        presupuestoCalculado = true;

        // Renderizado en la interfaz (Mostramos el div con el DOM)
        resultadoDiv.style.display = 'block';
        resumenTexto.innerHTML = `
            <strong>Cliente:</strong> ${nombre}<br>
            <strong>Servicio:</strong> ${servicio.toUpperCase()}${textoAjuste}<br>
            <strong>Total Neto:</strong> C$ ${(precioBase + cargoExtra).toFixed(2)}<br>
            <strong>Total a pagar (con 15% IVA):</strong> C$ ${totalConIva.toFixed(2)}
        `;

        // Bucle para generar la lista de cuotas dinámicamente
        detalleCuotas.innerHTML = "<h4>Plan de Pagos:</h4>";
        const lista = document.createElement('ul');
        
        for (let i = 1; i <= numCuotas; i++) {
            const li = document.createElement('li');
            li.textContent = `Cuota #${i}: C$ ${valorCuota.toFixed(2)}`;
            lista.appendChild(li);
        }
        detalleCuotas.appendChild(lista);
    });

    // 3. Control del botón Enviar 
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita recargar la pagina

        if (!presupuestoCalculado) {
            alert("Error: Primero debe hacer clic en 'Calcular Presupuesto' para procesar los montos.");
            return;
        }

        // Captura de datos con FormData
        const formData = new FormData(form);
        const datosEnvio = Object.fromEntries(formData.entries());

        // Metemos el total al objeto que simulará ir al backend
        datosEnvio.totalFinalCordobas = totalGlobalParaBackend.toFixed(2);

        // Imprimimos en consola de manera limpia 
        console.log("=== ENVIANDO DATOS SIMULADOS AL BACKEND ===");
        console.table(datosEnvio);

        alert(`¡Solicitud Procesada! Los datos de ${datosEnvio.nombre} por un total de C$ ${datosEnvio.totalFinalCordobas} están listos en la consola.`);
    });
});