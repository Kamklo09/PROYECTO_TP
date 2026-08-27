// Variable global en window para controlar las instancias de Chart
window.misGraficos = window.misGraficos || {};

// Función de limpieza al salir de la vista (para evitar fugas de memoria)
window.destruirAnaliticas = function () {
    if (window.misGraficos.torta) {
        window.misGraficos.torta.destroy();
        window.misGraficos.torta = null;
    }
    if (window.misGraficos.linea) {
        window.misGraficos.linea.destroy();
        window.misGraficos.linea = null;
    }
};

window.inicializarAnaliticas = function () {
    // 1. Destruir gráficos anteriores si existían (evita el bloqueo del Canvas)
    window.destruirAnaliticas();

    // 2. Datos de los cursos (dentro de la función para evitar SyntaxError al recargar)
    const cursos = {
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

    const canvasTorta = document.getElementById("torta");
    const canvasLinea = document.getElementById("linea");

    if (!canvasTorta || !canvasLinea) return;

    // 3. Crear instancias nuevas asociándolas a window.misGraficos
    window.misGraficos.torta = new Chart(canvasTorta, {
        type: "pie",
        data: {
            labels: cursos.A.nombres,
            datasets: [
                {
                    data: cursos.A.inasistencias,
                    backgroundColor: [
                        "#323232",
                        "#646464",
                        "#969696",
                        "#c0c0c0",
                        "#dddddd",
                        "#f5f5f5",
                    ],
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });

    window.misGraficos.linea = new Chart(canvasLinea, {
        type: "line",
        data: {
            labels: cursos.A.nombres,
            datasets: [
                {
                    label: "Inasistencias",
                    data: cursos.A.inasistencias,
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

    // 4. Exponer la función cambiarCurso a window para poder llamarla desde los botones HTML (onclick)
    window.cambiarCurso = function (letra) {
        let curso = cursos[letra];
        if (!curso) return;

        const torta = window.misGraficos.torta;
        const linea = window.misGraficos.linea;

        if (torta) {
            torta.data.labels = curso.nombres;
            torta.data.datasets[0].data = curso.inasistencias;
            torta.update();
        }

        if (linea) {
            linea.data.labels = curso.nombres;
            linea.data.datasets[0].data = curso.inasistencias;
            linea.update();
        }

        let tabla = document.getElementById("tabla");
        if (tabla) {
            tabla.innerHTML = "";
            for (let i = 0; i < curso.nombres.length; i++) {
                tabla.innerHTML += `
                    <tr>
                        <td>${curso.nombres[i]}</td>
                        <td>${curso.asistentes[i]}</td>
                        <td>${curso.retiros[i]}</td>
                        <td>${curso.atrasos[i]}</td>
                        <td>${curso.inasistencias[i]}</td>
                    </tr>
                `;
            }
        }

        ["A", "B", "C"].forEach((btnId) => {
            const btn = document.getElementById(btnId);
            if (btn) btn.classList.remove("activo");
        });

        const btnActivo = document.getElementById(letra);
        if (btnActivo) btnActivo.classList.add("activo");
    };

    // 5. Carga inicial de datos (Curso A)
    window.cambiarCurso("A");
};