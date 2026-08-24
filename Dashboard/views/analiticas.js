let miTorta = null;
let miLinea = null;

// Objeto de datos accesible globalmente
window.cursos = {
    A: {
        nombres: ["7°A", "8°A", "1°A", "2°A", "3°A", "4°A"],
        asistentes: [35, 36, 37, 38, 39, 40],
        retiros: [2, 2, 2, 1, 1, 2],
        atrasos: [10, 15, 8, 12, 18, 9],
        inasistencias: [4, 6, 3, 5, 6, 3],
    },
    B: {
        nombres: ["7°B", "8°B", "1°B", "2°B", "3°B", "4°B"],
        asistentes: [32, 33, 34, 35, 36, 37],
        retiros: [3, 2, 3, 2, 2, 1],
        atrasos: [7, 12, 10, 15, 9, 14],
        inasistencias: [5, 5, 6, 7, 5, 5],
    },
    C: {
        nombres: ["7°C", "8°C", "1°C", "2°C", "3°C", "4°C"],
        asistentes: [34, 35, 36, 37, 38, 39],
        retiros: [1, 1, 2, 2, 1, 2],
        atrasos: [5, 9, 13, 8, 11, 6],
        inasistencias: [3, 4, 4, 4, 4, 3],
    },
};

// Función para cambiar de curso (actualiza gráficos y tabla)
window.cambiarCurso = function (letra) {
    let curso = window.cursos[letra];
    if (!curso) return;

    // Actualizar gráfico de torta
    if (miTorta) {
        miTorta.data.labels = curso.nombres;
        miTorta.data.datasets[0].data = curso.inasistencias;
        miTorta.update();
    }

    // Actualizar gráfico de línea
    if (miLinea) {
        miLinea.data.labels = curso.nombres;
        miLinea.data.datasets[0].data = curso.inasistencias;
        miLinea.update();
    }

    // Actualizar tabla con transición
    let tabla = document.getElementById("tabla");
    if (tabla) {
        tabla.classList.add("oculto");

        setTimeout(function () {
            tabla.innerHTML = "";

            for (let i = 0; i < curso.nombres.length; i++) {
                tabla.innerHTML +=
                    "<tr>" +
                    "<td>" +
                    curso.nombres[i] +
                    "</td>" +
                    "<td>" +
                    curso.asistentes[i] +
                    "</td>" +
                    "<td>" +
                    curso.retiros[i] +
                    "</td>" +
                    "<td>" +
                    curso.atrasos[i] +
                    "</td>" +
                    "<td>" +
                    curso.inasistencias[i] +
                    "</td>" +
                    "</tr>";
            }

            tabla.classList.remove("oculto");
        }, 300);
    }
};

// Función principal ejecutada al cargar o volver a entrar a la vista
window.inicializarAnaliticas = function () {
    // 1. Destruir gráficos previos si existían para no duplicar instancias sobre nuevos <canvas>
    if (miTorta) {
        miTorta.destroy();
        miTorta = null;
    }
    if (miLinea) {
        miLinea.destroy();
        miLinea = null;
    }

    const canvasTorta = document.getElementById("torta");
    const canvasLinea = document.getElementById("linea");

    if (!canvasTorta || !canvasLinea) return;

    let tortaCtx = canvasTorta.getContext("2d");
    let lineaCtx = canvasLinea.getContext("2d");

    // 2. Crear nueva instancia del gráfico de Torta
    miTorta = new Chart(tortaCtx, {
        type: "pie",
        data: {
            labels: window.cursos.A.nombres,
            datasets: [
                {
                    label: "Inasistencias",
                    data: window.cursos.A.inasistencias,
                    backgroundColor: ["#323232", "#646464", "#969696", "#c0c0c0", "#dddddd", "#f5f5f5"],
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });

    // 3. Crear nueva instancia del gráfico de Línea
    miLinea = new Chart(lineaCtx, {
        type: "line",
        data: {
            labels: window.cursos.A.nombres,
            datasets: [
                {
                    label: "Inasistencias",
                    data: window.cursos.A.inasistencias,
                    borderColor: "#323232",
                    backgroundColor: "#dddddd",
                    fill: true,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });

    // 4. Cargar datos del curso "A" por defecto
    window.cambiarCurso("A");
};
