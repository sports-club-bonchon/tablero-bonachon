const puntuaciones = [0, 0];
const setsGanados = [0, 0];
const maxSets = 2;

// Sumar punto a un jugador
function sumarPunto(jugador) {
    const indice = jugador - 1;
    puntuaciones[indice]++;
    actualizarPuntuacion(jugador);

    // Verificar si gana el set
    if (puntuaciones[indice] >= 11 && (puntuaciones[indice] - puntuaciones[1 - indice]) >= 1) {
        setsGanados[indice]++;
        actualizarSets(jugador);
        reiniciarPuntuaciones();
    }
}

// Restar punto a un jugador
function restarPunto(jugador) {
    const indice = jugador - 1;
    if (puntuaciones[indice] > 0) {
        puntuaciones[indice]--;
        actualizarPuntuacion(jugador);
    }
}

// Actualizar la puntuación en el DOM
function actualizarPuntuacion(jugador) {
    document.getElementById(`puntaje${jugador}`).textContent = puntuaciones[jugador - 1];
}

// Actualizar los sets ganados en el DOM
function actualizarSets(jugador) {
    const cuadros = document.querySelectorAll(`#sets${jugador} .cuadro-set`);
    for (let i = 0; i < cuadros.length; i++) {
        cuadros[i].classList.toggle('set-ganado', i < setsGanados[jugador - 1]);
    }
}

// Reiniciar la puntutación de un jugador
function reiniciarPuntuacion(jugador) {
    puntuaciones[jugador - 1] = 0;
    actualizarPuntuacion(jugador);
}

// Reiniciar las puntuaciones de ambos jugadores
function reiniciarPuntuaciones() {
    puntuaciones[0] = 0;
    puntuaciones[1] = 0;
    actualizarPuntuacion(1);
    actualizarPuntuacion(2);
}

// Reiniciar partido completo
function reiniciarPartido() {
    reiniciarPuntuaciones();
    setsGanados[0] = 0;
    setsGanados[1] = 0;
    actualizarSets(1);
    actualizarSets(2);
}

// Modo parejas
function toggleParejas() {
    const activo = document.getElementById("modoParejas").checked;
    document.querySelectorAll(".nombre-pareja").forEach(el => {
        el.classList.toggle("oculto", !activo);
    });
}

// Rotación automática de publicidad
let indice = 0;
const cambioIntervalo = 20000; // 20 segundos

setInterval(() => {
    const grupos = document.querySelectorAll('.publicidad');
    grupos.forEach(grupo => {
        const items = grupo.querySelectorAll('.publi-item');
        items.forEach(i => i.classList.remove('activo'));

        const activo = items[indice % items.length];
        activo.classList.add('activo');

        // Si es video, reinícialo y reproduce
        if (activo.tagName === 'VIDEO') {
            activo.currentTime = 0;
            activo.play();
        } else {
            // Pausar cualquier video que no esté activo
            items.forEach(i => {
                if (i.tagName === 'VIDEO' && i !== activo) {
                    i.pause();
                }
            });
        }
    });
    indice++;
}, cambioIntervalo);
