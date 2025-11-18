➗ Matemanía (Cognitiles)

Donde las letras se convierten en números y el ingenio matemático es tu mejor jugada.

Matemanía es un juego educativo interactivo basado en la web que combina la mecánica clásica de estilo Scrabble con desafíos matemáticos. Los jugadores arrastran fichas a una cuadrícula de 11x11 para formar ecuaciones válidas (ej. 3 + 5 = 8) en lugar de palabras, ganando puntos basados en la complejidad y el valor de las fichas.

🚀 Características y Modos de Juego

El juego cuenta con cuatro modos distintos diseñados para diferentes niveles de habilidad y tipos de aprendizaje:

Modo

Descripción

Características Clave

Matemático

Operaciones clásicas

Operadores básicos: +, -, *, /

Científico

Operaciones avanzadas

Funciones trigonométricas (sin, cos, tan), sqrt, log

Visual

Matemáticas visuales

Reconocimiento de patrones y representaciones gráficas

Sonoro

Desafíos auditivos

Reconocimiento de patrones basados en sonido

🛠️ Stack Tecnológico

El proyecto utiliza una arquitectura moderna y performante, utilizando las últimas versiones de las librerías principales.

Frontend (Cliente)

Core: React 19.1.1, TypeScript 5.8.3

Build Tool: Vite 7.1.2

Estilos: Tailwind CSS 4.1.12

Routing: React Router 7.8.1 (Client-side routing)

Estado: Zustand 5.0.8 (con persistencia en localStorage)

Animaciones: Framer Motion 12.23.12

Interacción: @dnd-kit 6.3.1 (Drag & Drop system)

Audio: Howler.js 2.2.4

HTTP Client: Axios

Backend & Infraestructura

API: Django REST Framework (Python)

Base de Datos: PostgreSQL

Auth: JWT (Access/Refresh tokens) + Google OAuth

Servidor: Nginx (Reverse Proxy & SSL Termination con Let's Encrypt)

Containerización: Docker & Docker Compose

🏗️ Arquitectura del Sistema

El proyecto sigue una Arquitectura Dividida (Split Architecture):

Frontend Layer (Vercel):

Single Page Application (SPA).

vercel.json maneja los rewrites para redirigir todo el tráfico a /index.html.

Assets estáticos servidos vía CDN global.

Backend Layer (Self-Hosted):

Hospedado en VPS (IP: 138.201.186.199).

Nginx actúa como puerta de entrada (Puerto 443) manejando certificados SSL.

Django (Puerto 8000) gestiona la lógica de negocio, perfiles de usuario y validación.

Gestión de Estado (Híbrida):

Estado de Usuario (Zustand + Persist): user, access_token y refresh_token se guardan en localStorage para mantener la sesión activa (lógica "Anti-Zombie").

Estado del Juego (React Local State): El estado del tablero y las fichas es efímero y vive en memoria durante la partida.

📂 Estructura del Proyecto

src/
├── components/       # Componentes UI reutilizables (Board, Tile, PlayerRack)
├── constants/        # Reglas del juego (TILES, OPERATORS, PUNTAJES)
├── layout/           # Componentes estructurales (Navbar, Footer)
├── menus/            # Menús de navegación interna (GameMenu)
├── pages/            # Vistas principales
│   ├── HomePage/     # Bienvenida y Tour guiado (Shepherd.js)
│   ├── LoginPage/    # Autenticación y selección de Avatar
│   ├── GamePage/     # Lógica principal del juego y orquestación
│   ├── ProfilePage/  # Estadísticas del usuario
│   └── ...
├── services/         # Comunicación con API (authService.ts)
├── store/            # Gestión de estado global (useUserStore.ts)
└── utils/            # Helpers (animaciones, sonidos, validaciones)


💻 Instalación y Desarrollo

Prerrequisitos

Node.js (v18 o superior)

npm o yarn

Pasos

Clonar el repositorio

git clone [https://github.com/PabloVasquezC/cognitiles.git](https://github.com/PabloVasquezC/cognitiles.git)
cd cognitiles


Instalar dependencias

npm install


Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto:

# URL del Backend (Local o Producción)
VITE_API_URL=http://localhost:8000


Ejecutar en desarrollo

npm run dev
