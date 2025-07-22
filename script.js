// Elementos DOM
const contenedorLogin = document.getElementById('contenedor-login');
const aplicacionPrincipal = document.getElementById('aplicacion-principal');
const mensajeBienvenida = document.getElementById('mensaje-bienvenida');
const entradaNombre = document.getElementById('entrada-nombre');
const botonLogin = document.getElementById('boton-login');
const errorLogin = document.getElementById('error-login');
const botonLogout = document.getElementById('boton-logout');
const contenedorLibros = document.getElementById('contenedor-libros');
const listaLibros = document.getElementById('lista-libros');
const tituloGenero = document.getElementById('titulo-genero');
const volverMenu = document.getElementById('volver-menu');
const contenedorCalificacion = document.getElementById('contenedor-calificacion');
const libroACalificar = document.getElementById('libro-a-calificar');
const entradaComentario = document.getElementById('entrada-comentario');
const enviarCalificacion = document.getElementById('enviar-calificacion');
const cancelarCalificacion = document.getElementById('cancelar-calificacion');
const contenedorLibroAleatorio = document.getElementById('contenedor-libro-aleatorio');
const infoLibroAleatorio = document.getElementById('info-libro-aleatorio');
const calificarLibroAleatorio = document.getElementById('calificar-libro-aleatorio');
const volverAleatorio = document.getElementById('volver-aleatorio');
const contenedorMensaje = document.getElementById('contenedor-mensaje');
const textoMensaje = document.getElementById('texto-mensaje');
const cerrarMensaje = document.getElementById('cerrar-mensaje');

// VARIABLES
let conectado = false;
let nombre = null;
let libroActual = null;
let generoActual = null;
let calificacionActual = 0;
let libros = []; 
const estrellas = document.querySelectorAll('.estrella');

// CONFIGURACION DE ENDPOINTS
const URL_JSON_LIBROS = './data/libros.json';
const URL_API_CALIFICACIONES = 'https://tu-api.com/calificaciones';

// ARRAY DE LIBROS POR SI FALLA EL JSON 
const librosRespaldo = [

    // GENERO POLICIALES
    { 
        id: 1,
        titulo: "La comunidad", 
        autor: "Helene Flood",
        imagen: "assets/books/la-comunidad--helene-flood.webp",
        genero: "Policiales",
        ratings: [],
        comentarios: []
    },
    { 
        id: 2,
        titulo: "La historia del loco", 
        autor: "John Katzenbach",
        imagen: "assets/books/john-katzenbach--la-historia-del-loco.webp",
        genero: "Policiales",
        ratings: [],
        comentarios: []
    },
    { 
        id: 3,
        titulo: "Leviatán",
        autor: "Paul Auster",
        imagen: "assets/books/paul-auster--leviatan.webp",
        genero: "Policiales",
        ratings: [],
        comentarios: []
    },
    { 
        id: 4,
        titulo: "La apariencia de las cosas",
        autor: "Elizabeth Brundage",
        imagen: "assets/books/elizabeth-brundage--la-apariencia-de-las-cosas.webp",
        genero: "Policiales"
    },

    // GENERO TERROR
    { 
        id: 5,
        titulo: "Los juegos de Gerald", 
        autor: "Stephen King",
        imagen: "assets/books/geralds-game-stephen-king.webp",
        genero: "Terror",
        ratings: [],
        comentarios: []
    },
    {
        id: 6,
        titulo: "El Perfume",
        autor: "Patrick Süskind",
        imagen: "assets/books/patrick-suskind--el-perfume.webp",
        genero: "Terror",
        ratings: [],
        comentarios: []
    },
    {
        id: 7,
        titulo: "Backwater I",
        autor: "Michael McDowell",
        imagen: "assets/books/michael-mcdowell--blackwater-1.webp",
        genero: "Terror",
        ratings: [],
        comentarios: []
    },
    {
        id: 8,
        titulo: "Backwater II",
        autor: "Michael McDowell",
        imagen: "assets/books/michael-mcdowell--blackwater-2.webp",
        genero: "Terror",
        ratings: [],
        comentarios: []
    },
    {
        id: 9,
        titulo: "Backwater III",
        autor: "Michael McDowell",
        imagen: "assets/books/michael-mcdowell--blackwater-3.webp",
        genero: "Terror",
        ratings: [],
        comentarios: []
    },
    {
        id: 10,
        titulo: "Backwater IV",
        autor: "Michael McDowell",
        imagen: "assets/books/michael-mcdowell--blackwater-4.webp",
        genero: "Terror",
        ratings: [],
        comentarios: []
    },
    {
        id: 11,
        titulo: "Backwater V",
        autor: "Michael McDowell",
        imagen: "assets/books/michael-mcdowell--blackwater-5.webp",
        genero: "Terror",
        ratings: [],
        comentarios: []
    },
    {
        id: 12,
        titulo: "Backwater VI",
        autor: "Michael McDowell",
        imagen: "assets/books/michael-mcdowell--blackwater-6.webp",
        genero: "Terror",
        ratings: [],
        comentarios: []
    },
    { 
        id: 13,
        titulo: "Carrie", 
        autor: "Stephen King",
        imagen: "assets/books/stephen-king--carrie.webp",
        genero: "Terror",
        ratings: [],
        comentarios: []
    },
    { 
        id: 14,
        titulo: "IT", 
        autor: "Stephen King",
        genero: "Terror",
        imagen: "assets/books/stephen-king--it.webp",
        ratings: [],
        comentarios: []
    },
    { 
        id: 15,
        titulo: "Todo Oscuro, sin estrellas", 
        autor: "Stephen King",
        imagen: "assets/books/stephen-king--todo-oscuro-sin-estrellas.webp",
        genero: "Terror",
        ratings: [],
        comentarios: []
    },
    { 
        id: 16,
        titulo: "Katie", 
        autor: "Michael McDowell",
        imagen: "assets/books/michael-mcdowell--katie.webp",
        genero: "Terror",
        ratings: [],
        comentarios: []
    },
    { 
        id: 17,
        titulo: "Agujas Doradas", 
        autor: "Michael McDowell",
        imagen: "assets/books/michael-mcdowell--agujas-doradas.webp",
        genero: "Terror",
        ratings: [],
        comentarios: []
    },
    { 
        id: 18,
        titulo: "Los Elementales", 
        autor: "Michael McDowell",
        imagen: "assets/books/michael-mcdowell--los-elementales.webp",
        genero: "Terror",
        ratings: [],
        comentarios: []
    },
    { 
        id: 19,
        titulo: "Colección de cuentos de los Hermanos Grimm", 
        autor: "Hermanos Grimm",
        imagen: "assets/books/hermanos-Grimm--cuentos-de-los-hermanos-Grimm.webp",
        genero: "Terror",
        ratings: [],
        comentarios: []
    },
    { 
        id: 20,
        titulo: "La casa de los suicidios", 
        autor: "Charlie Donlea",
        imagen: "assets/books/charlie-donlea--la-casa-de-los-suicidios.webp",
        genero: "Terror",
        ratings: [],
        comentarios: []
    },
    
    // GENERO AVENTURA
    { 
        id: 21,
        titulo: "Los juegos del hambre", 
        autor: "Suzanne Collins",
        imagen: "assets/books/suzanne-collins-los-juegos-del-hambre.webp",
        genero: "Aventura",
        ratings: [],
        comentarios: []
    },
    { 
        id: 22,
        titulo: "En llamas", 
        autor: "Suzanne Collins",
        imagen: "assets/books/suzanne-collins--en-llamas.webp",
        genero: "Aventura",
        ratings: [],
        comentarios: []
    },
    { 
        id: 23,
        titulo: "Sinsajo", 
        autor: "Suzanne Collins",
        imagen: "assets/books/suzanne-collins--sinsajo.webp",
        genero: "Aventura",
        ratings: [],
        comentarios: []
    },
    { 
        id: 24,
        titulo: "Balada de pájaros cantores y serpientes", 
        autor: "Suzanne Collins",
        imagen: "assets/books/suzanne-collins--balada.webp",
        genero: "Aventura",
        ratings: [],
        comentarios: []
    },
    { 
        id: 25,
        titulo: "Amanecer en la cosecha", 
        autor: "Suzanne Collins",
        imagen: "assets/books/suzanne-collins--amanecer-en-la-cosecha.webp",
        genero: "Aventura",
        ratings: [],
        comentarios: []
    },
    { 
        id: 26,
        titulo: "El Bucle", 
        autor: "F. F. Alberti",
        imagen: "assets/books/ff-alberti--el-bucle.webp",
        genero: "Aventura",
        ratings: [],
        comentarios: []
    },

    // GENERO COYUNTURA
    { 
        id: 27,
        titulo: "El segundo sexo", 
        autor: "Simone de Beauvoir",
        imagen: "assets/books/simone-de-beauvoir--el-segundo-sexo.webp",
        genero: "Coyuntura",
        ratings: [],
        comentarios: []
    },
    { 
        id: 28,
        titulo: "Las caras del monstruo", 
        autor: "Julia Mengolini",
        imagen: "assets/books/julia-mengolini--las-caras-del-monstruo.webp",
        genero: "Coyuntura",
        ratings: [],
        comentarios: []
    },
    { 
        id: 29,
        titulo: "Brujas, caza de brujas y mujeres", 
        autor: "Silvia Federici",
        imagen: "assets/books/silvia-federici--brujas-caza-de-brujas-y-mujeres.webp",
        genero: "Coyuntura",
        ratings: [],
        comentarios: []
    },
    { 
        id: 30,
        titulo: "La revolución de las hijas", 
        autor: "Luciana Peker",
        imagen: "assets/books/luciana-peker--la-revolucion-de-las-hijas.webp",
        genero: "Coyuntura",
        ratings: [],
        comentarios: []
    },
    { 
        id: 31,
        titulo: "Enojate hermana",
        autor: "Malena Pichot",
        imagen: "assets/books/malena-pichot--enojate-hermana.webp",
        genero: "Coyuntura",
        ratings: [],
        comentarios: []
    },

    // GENERO CIENCIA FICCION
    { 
        id: 32,
        titulo: "Un mundo feliz", 
        autor: "Aldous Huxley",
        genero: "Ciencia ficción",
        imagen: "assets/books/aldous-huxley--un-mundo-feliz.webp",
        ratings: [],
        comentarios: []
    },
    { 
        id: 33,
        titulo: "El Eternauta", 
        autor: "Héctor Germán Oesterheld",
        imagen: "assets/books/el-eternauta--hector-german-oesterheld.webp",
        genero: "Ciencia ficción",
        ratings: [],
        comentarios: []
    },

    // GENERO ROMANCE
    { 
        id: 34,
        titulo: "Orgullo y prejuicio", 
        autor: "Jane Austen",
        genero: "romance",
        imagen: "assets/books/jane-austen--pride-and-prejudice.webp",
        ratings: [],
        comentarios: []
    },
    { 
        id: 35,
        titulo: "Cumbres Borrascosas", 
        autor: "Emily Brontë",
        genero: "romance",
        imagen: "assets/books/emily-bronte--cumbres-borrascosas.webp",
        ratings: [],
        comentarios: []
    },
    { 
        id: 36,
        titulo: "Lo que dicen tus ojos", 
        autor: "Florencia Bonelli",
        genero: "romance",
        imagen: "assets/books/florencia-bonelli--lo-que-dicen-tus-ojos.webp",
        ratings: [],
        comentarios: []
    },
    { 
        id: 37,
        titulo: "Caballo de fuego - París", 
        autor: "Florencia Bonelli",
        genero: "romance",
        imagen: "assets/books/florencia-bonelli--caballo-de-fuego-paris.webp",
        ratings: [],
        comentarios: []
    },
    { 
        id: 38,
        titulo: "Caballo de fuego - Congo", 
        autor: "Florencia Bonelli",
        genero: "romance",
        imagen: "assets/books/florencia-bonelli--caballo-de-fuego-congo.webp",
        ratings: [],
        comentarios: []
    },
    { 
        id: 39,
        titulo: "Caballo de fuego - Gaza", 
        autor: "Florencia Bonelli",
        genero: "romance",
        imagen: "assets/books/florencia-bonelli--caballo-de-fuego-gaza.webp",
        ratings: [],
        comentarios: []
    },
    { 
        id: 40,
        titulo: "Los siete maridos de Evelyn Hugo", 
        autor: "Taylor Jenkins Reid",
        genero: "romance",
        imagen: "assets/books/taylor-jenkins-reid--los-7-maridos-de-evelyn-hugo.webp",
        ratings: [],
        comentarios: []
    },
    { 
        id: 41,
        titulo: "Crepúsculo", 
        autor: "Stephenie Meyer",
        imagen: "assets/books/stephenie-meyer--twilight.webp",
        genero: "romance",
        ratings: [],
        comentarios: []
    },
    { 
        id: 42,
        titulo: "Luna nueva", 
        autor: "Stephenie Meyer",
        imagen: "assets/books/stephenie-meyer--new-moon.webp",
        genero: "romance",
        ratings: [],
        comentarios: []
    },
    { 
        id: 43,
        titulo: "Eclipse", 
        autor: "Stephenie Meyer",
        imagen: "assets/books/stephenie-meyer--eclipse.webp",
        genero: "romance",
        ratings: [],
        comentarios: []
    },
    { 
        id: 44,
        titulo: "Amanecer", 
        autor: "Stephenie Meyer",
        imagen: "assets/books/stephenie-meyer--breaking-dawn.webp",
        genero: "romance",
        ratings: [],
        comentarios: []
    }
    // OTROS
    ,
    {
        id: 45, 
        titulo: "Rebelión en la granja", 
        autor: "George Orwell",
        imagen: "assets/books/george-orwell--rebelion-en-la-granja.webp",
        genero: "otros",
        ratings: [],
        comentarios: []
    }

]

// EVENT LISTENERS
botonLogin.addEventListener('click', manejarLogin);

entradaNombre.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') manejarLogin();
});

botonLogout.addEventListener('click', manejarLogout);

volverMenu.addEventListener('click', () => {
    mostrarLibrosPorGenero('todos');
});

document.querySelectorAll('.boton-menu[data-genero]').forEach(boton => {
    boton.addEventListener('click', (e) => {
        const genero = e.target.dataset.genero;
        if (genero === 'aleatorio') {
            document.getElementById('contenedor-menu').classList.add('oculto');
            mostrarLibroAleatorio();
        } else {
            mostrarLibrosPorGenero(genero);
        }
    });
});

estrellas.forEach(estrella => {
    estrella.addEventListener('click', manejarClickEstrella);
});

enviarCalificacion.addEventListener('click', enviarCalificacionLibro);

cancelarCalificacion.addEventListener('click', () => {
    if (generoActual === 'aleatorio') {
        alternarVista('aleatorio');
    } else {
        alternarVista('libros');
    }
});

calificarLibroAleatorio.addEventListener('click', () => {
    mostrarFormularioCalificacion(libroActual);
});

volverAleatorio.addEventListener('click', () => {
    alternarVista('menu');
    // Explicitly show menu when returning
    document.getElementById('contenedor-menu').classList.remove('oculto');
});

cerrarMensaje.addEventListener('click', () => contenedorMensaje.classList.add('oculto'));

// FUNCIONES:
    // CARGAR LIBROS DESDE EL JSON LOCAL
    async function cargarLibrosDesdeJSON() {
        try {
            mostrarMensaje("Cargando catálogo...");
            const response = await fetch(URL_JSON_LIBROS);
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            const data = await response.json();
            return data.libros || [];
        } catch (error) {
            console.error("Error cargando JSON:", error);
            mostrarMensaje("Error cargando catálogo. Usando datos locales...", 3000);
            return librosRespaldo;
        }
    }

    // ENVIAR CALIFICACIONES AL SERVIDOR
    async function enviarCalificacionAServidor(libroId, calificacion, comentario) {
        try {
            const response = await fetch(URL_API_CALIFICACIONES, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    libroId,
                    usuario: nombre,
                    calificacion,
                    comentario,
                    fecha: new Date().toISOString(),
                    dispositivo: 'web' 
                })
            });
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            // ACTUALIZACIÓN DE CALIFICACIONES DESDE EL SERVIDOR
            const data = await response.json();
            return data.actualizado;
        } catch (error) {
            console.error("Error sending rating:", error);
            mostrarMensaje("No se pudo conectar con el servidor. Guardando los datos localmente.", 3000);
            return false;
        }
    }

    // SINCRONIZAR CALIFICACIONES
    async function sincronizarCalificaciones() {
        try {
            const response = await fetch(`${URL_API_CALIFICACIONES}?ultimaSync=${localStorage.getItem('ultimaSync') || ''}`);
            if (!response.ok) throw new Error("Sync failed");
            
            const data = await response.json();
            
            data.calificaciones.forEach(calificacion => {
                const libro = libros.find(l => l.id === calificacion.libroId);
                if (libro) {
                    if (!libro.calificaciones) libro.calificaciones = [];
                    if (!libro.comentarios) libro.comentarios = [];
                    
                    if (!libro.calificaciones.includes(calificacion.calificacion)) {
                        libro.calificaciones.push(calificacion.calificacion);
                    }
                    
                    const comentarioExistente = libro.comentarios.find(c => 
                        c.usuario === calificacion.usuario && 
                        c.fecha === calificacion.fecha
                    );
                    
                    if (!comentarioExistente && calificacion.comentario) {
                        libro.comentarios.push({
                            usuario: calificacion.usuario,
                            texto: calificacion.comentario,
                            fecha: calificacion.fecha
                        });
                    }
                }
            });
            
            localStorage.setItem('ultimaSync', new Date().toISOString());
            guardarDatosBiblioteca();
            
        } catch (error) {
            console.error("Sync error:", error);
        }
    }

    // FUNCIÓN PARA MANEJAR EL LOGIN
    async function manejarLogin() {
        const nombreIngresado = entradaNombre.value.trim();
        const esValido = /^\p{L}+$/u.test(nombreIngresado);
        
        if (!nombreIngresado) {
            mostrarError("Por favor ingresa tu nombre");
            return;
        }
        
        if (!esValido) {
            mostrarError("Nombre inválido. Solo letras por favor.");
            return;
        }
        
        nombre = nombreIngresado.charAt(0).toUpperCase() + nombreIngresado.slice(1).toLowerCase();
        conectado = true;
        
        // Carga libros si no están cargados
        if (libros.length === 0) {
            libros = await cargarLibrosDesdeJSON();
        }
        
        // UI
        mensajeBienvenida.textContent = `¡Hola ${nombre}! 👋`;
        contenedorLogin.classList.add('oculto');
        aplicacionPrincipal.classList.remove('oculto');
        document.getElementById('contenedor-menu').classList.remove('oculto');
        await mostrarLibrosPorGenero('todos');
    }

    // FUNCIÓN PARA ENVIAR CALIFICACIONES
    async function enviarCalificacionLibro() {
        if (calificacionActual === 0) {
            mostrarMensaje("Please select a rating");
            return;
        }

        const comentario = entradaComentario.value.trim();
        const exitoServidor = await enviarCalificacionAServidor(
            libroActual.id,
            calificacionActual,
            comentario
        );

        if (exitoServidor) {
            // Update local data with server response
            Object.assign(libroActual, exitoServidor);
        } else {
            // Local fallback
            if (!libroActual.calificaciones) libroActual.calificaciones = [];
            libroActual.calificaciones.push(calificacionActual);
            
            if (comentario) {
                if (!libroActual.comentarios) libroActual.comentarios = [];
                libroActual.comentarios.push({
                    usuario: nombre,
                    texto: comentario,
                    fecha: new Date().toISOString()
                });
            }
        }
        
        await guardarDatosBiblioteca();
        mostrarMensaje(`¡Gracias por tu calificación, ${nombre}!`);
        
        if (generoActual === 'aleatorio') {
            alternarVista('aleatorio');
        } else {
            await mostrarLibrosPorGenero(generoActual);
        }
    }

    // FUNCIÓN PARA MANEJAR EL CIERRE DE SESIÓN
    function manejarLogout() {
        conectado = false;
        entradaNombre.value = '';
        aplicacionPrincipal.classList.add('oculto');
        contenedorLogin.classList.remove('oculto');
        mostrarMensaje(`¡Nos vemos la próxima, ${nombre}!`);
    }

    // FUNCIÓN PARA MANEJAR ERRORES
    function mostrarError(mensaje) {
        errorLogin.textContent = mensaje;
        errorLogin.classList.add('activo');
        setTimeout(() => {
            errorLogin.classList.remove('activo');
        }, 3000);
    }

    // FUNCIÓN PARA FILTRAR LIBROS POR GENERO
    async function mostrarLibrosPorGenero(genero) {
        generoActual = genero;
        const mapaGeneros = {
            'romance': 'Romance',
            'terror': 'Terror',
            'aventura': 'Aventura',
            'coyuntura': 'Coyuntura',
            'policiales': 'Policiales',
            'ciencia ficción': 'Ciencia ficción',
            'otros': 'Otros',
            'todos': 'Todos los libros'
        };
        
        const librosGenero = genero === 'todos' 
            ? libros 
            : libros.filter(libro => libro.genero.trim().toLowerCase() === genero.toLowerCase());

        if (librosGenero.length === 0) {
            mostrarMensaje(`No hay libros disponibles en el género ${mapaGeneros[genero] || genero}`);
            return;
        }
        
        tituloGenero.textContent = genero === 'todos' 
            ? 'Todos los libros disponibles' 
            : `Libros de ${mapaGeneros[genero] || genero}`;
        
        await renderizarLibros(librosGenero);
        
        contenedorLibros.classList.remove('oculto');
        document.getElementById('contenedor-menu').classList.remove('oculto');
    }

    // FUNCIÓN INTERFAZ DE LIBROS
    async function renderizarLibros(librosGenero) {
      listaLibros.innerHTML = '';
      
      const fragment = document.createDocumentFragment();
      
      for (const [indice, libro] of librosGenero.entries()) {
          const elementoLibro = document.createElement('div');
          elementoLibro.className = 'elemento-libro';
          
          const imagenHTML = libro.imagen 
              ? `<div class="contenedor-imagen-libro">
                  <img src="${libro.imagen}" alt="${libro.titulo}" class="imagen-libro" loading="lazy" onerror="this.onerror=null;this.src='src/assets/libro-default.jpg'">
                  </div>`
              : '<div class="marcador-imagen-libro">No hay imagen disponible.</div>';
          
          const tieneComentarios = libro.comentarios && libro.comentarios.length > 0;
          
          elementoLibro.innerHTML = `
              ${imagenHTML}
              <div class="info-libro">
                  <h4>${libro.titulo}</h4>
                  <p>Autor: ${libro.autor}</p>
                  ${libro.calificaciones && libro.calificaciones.length > 0 ? 
                      `<p>${calcularPromedioCalificaciones(libro.calificaciones).toFixed(1)} ★ 
                      (${libro.calificaciones.length} calificaciones)</p>` : 
                      '<p>Sin calificaciones aún</p>'}
                  ${tieneComentarios ? `
                  <div class="contenedor-comentarios">
                      <button class="boton-ver-comentarios" data-indice="${indice}">
                          Ver comentarios (${libro.comentarios.length})
                      </button>
                      <div class="comentarios-libro oculto">
                          ${libro.comentarios.map(com => `
                              <div class="comentario">
                                  <strong>${com.usuario || 'Anónimo'}:</strong>
                                  <p>${com.texto}</p>
                                  <small>${com.fecha ? new Date(com.fecha).toLocaleDateString() : ''}</small>
                              </div>
                          `).join('')}
                      </div>
                  </div>` : ''}
                  <button class="boton-calificar-libro" data-indice="${indice}">Calificar</button>
              </div>
          `;
          
          fragment.appendChild(elementoLibro);
      }
      
      listaLibros.appendChild(fragment);
      
      // Botones de calificación
      document.querySelectorAll('.boton-calificar-libro').forEach(boton => {
          boton.addEventListener('click', (e) => {
              const indice = e.target.dataset.indice;
              mostrarFormularioCalificacion(librosGenero[indice]);
          });
      });
      
      // Botones de comentarios (con animación)
      document.querySelectorAll('.boton-ver-comentarios').forEach(boton => {
          boton.addEventListener('click', (e) => {
              const contenedorComentarios = e.target.nextElementSibling;
              const libro = librosGenero[e.target.dataset.indice];
              
              if (contenedorComentarios.classList.contains('oculto')) {
                  // Abrir comentarios
                  contenedorComentarios.style.maxHeight = '0';
                  contenedorComentarios.classList.remove('oculto');
                  const alturaReal = contenedorComentarios.scrollHeight;
                  contenedorComentarios.style.maxHeight = `${alturaReal}px`;
                  
                  setTimeout(() => {
                      contenedorComentarios.style.maxHeight = 'none';
                  }, 300);
                  
                  e.target.textContent = 'Ocultar comentarios';
              } else {
                  // Cerrar comentarios
                  const alturaReal = contenedorComentarios.scrollHeight;
                  contenedorComentarios.style.maxHeight = `${alturaReal}px`;
                  
                  setTimeout(() => {
                      contenedorComentarios.style.maxHeight = '0';
                  }, 10);
                  
                  setTimeout(() => {
                      contenedorComentarios.classList.add('oculto');
                  }, 310);
                  
                  e.target.textContent = `Ver comentarios (${libro.comentarios.length})`;
              }
          });
      });
  }

    // FUNCIÓN PARA MOSTRAR UN LIBRO ALEATORIO
    function mostrarLibroAleatorio() {
        const libroAleatorio = libros[Math.floor(Math.random() * libros.length)];
        libroActual = libroAleatorio;
        generoActual = 'aleatorio';
        
        infoLibroAleatorio.innerHTML = '';
        
        const imagenHTML = libroAleatorio.imagen 
            ? `<div class="imagen-libro-aleatorio">
                <img src="${libroAleatorio.imagen}" alt="${libroAleatorio.titulo}" loading="lazy">
            </div>`
            : '<div class="marcador-imagen-libro">No hay imagen disponible</div>';
        
        infoLibroAleatorio.innerHTML = `
            ${imagenHTML}
            <div class="detalles-libro-aleatorio">
                <h4>${libroAleatorio.titulo}</h4>
                <p><strong>Autor:</strong> ${libroAleatorio.autor}</p>
                <p><strong>Género:</strong> ${libroAleatorio.genero}</p>
                ${libroAleatorio.calificaciones?.length > 0 ? 
                    `<p><strong>Calificación promedio:</strong> ${calcularPromedioCalificaciones(libroAleatorio.calificaciones).toFixed(1)} ★</p>` : 
                    '<p><strong>Sin calificaciones aún</strong></p>'}
            </div>
        `;
        
        contenedorLibros.classList.add('oculto');
        contenedorLibroAleatorio.classList.remove('oculto');
    }

    // FUNCIÓN PARA FORMULARIO DE CALIFICACIONES
    function mostrarFormularioCalificacion(libro) {
        libroActual = libro;
        libroACalificar.innerHTML = `¿Qué te pareció <strong>"${libro.titulo}"</strong>?`;
        entradaComentario.value = '';
        calificacionActual = 0;
        actualizarEstrellas();
        alternarVista('calificacion');
    }

        // FUNCIÓN PARA CLICKEAR ESTRELLAS
    function manejarClickEstrella(e) {
        calificacionActual = parseInt(e.target.dataset.calificacion);
        actualizarEstrellas();
    }

    // FUNCIÓN PARA ACTUALIZAR ESTRELLAS
    function actualizarEstrellas() {
        estrellas.forEach(estrella => {
            const calificacion = parseInt(estrella.dataset.calificacion);
            estrella.style.color = calificacion <= calificacionActual ? '#ffd700' : '#ccc';
        });
    }

    // FUNCIÓN PARA LAS VISTAS DE LA APP
    function alternarVista(vista) {
        document.querySelectorAll('#aplicacion-principal > div').forEach(div => {
            if (div.id !== 'contenedor-menu') {
                div.classList.add('oculto');
            }
        });
        
        if (vista === 'menu') {
            document.getElementById('contenedor-menu').classList.remove('oculto');
        } else if (vista === 'libros') {
            contenedorLibros.classList.remove('oculto');
        } else if (vista === 'calificacion') {
            contenedorCalificacion.classList.remove('oculto');
        } else if (vista === 'aleatorio') {
            contenedorLibroAleatorio.classList.remove('oculto');
        }
    }

    // FUNCIÓN PARA MOSTRAR MENSAJES DE LA APP
    function mostrarMensaje(mensaje, esError = false) {
        Toastify({
            text: mensaje,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            style: {
                background: esError ? "#e74c3c" : "#00ab66",
                color: "#fff",
                "border-radius": "8px",
                "box-shadow": "0 4px 12px rgba(0,0,0,0.15)"
            }
        }).showToast();
    }

    // FUNCIÓN PARA PROMEDIAR CALIFICACIONES
    function calcularPromedioCalificaciones(calificaciones) {
        if (!calificaciones || calificaciones.length === 0) return 0;
        const suma = calificaciones.reduce((total, calificacion) => total + calificacion, 0);
        return suma / calificaciones.length;
    }

    // FUNCIONES QUE MANEJAN EL ALMACENAMIENTO DE DATOS
    const CLAVE_ALMACENAMIENTO = "datosBibliotecaLibros";

    async function guardarDatosBiblioteca() {
        const datosAGuardar = {
            libros: libros,
            ultimaActualizacion: new Date().toISOString()
        };
        localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(datosAGuardar));
    }

    async function cargarDatosBiblioteca() {
        const datosGuardados = localStorage.getItem(CLAVE_ALMACENAMIENTO);
        if (datosGuardados) {
            try {
                const datosParseados = JSON.parse(datosGuardados);
                
                libros.forEach(libro => {
                    const libroGuardado = datosParseados.libros.find(
                        l => l.titulo === libro.titulo && l.autor === libro.autor
                    );
                    
                    if (libroGuardado) {
                        if (libroGuardado.calificaciones) {
                            libro.calificaciones = libroGuardado.calificaciones;
                        }
                        if (libroGuardado.comentarios) {
                            libro.comentarios = libroGuardado.comentarios;
                        }
                    }
                });
            } catch (e) {
                console.error("Error al analizar datos guardados", e);
            }
        }
    }

// INICIALIZACIÓN DE LA APP
document.addEventListener('DOMContentLoaded', async () => {
    libros = await cargarLibrosDesdeJSON();
    await cargarDatosBiblioteca();
    
    if (conectado) {
        await sincronizarCalificaciones();
        setInterval(sincronizarCalificaciones, 300000);
    }
});