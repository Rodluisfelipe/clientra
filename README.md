# Clientra - Gestión de Clientes para Restaurantes

Clientra es una aplicación web moderna para la gestión de clientes de restaurantes, enfocada en el manejo de domicilios y datos de contacto. Construida con React, Node.js, y MongoDB.

## Características

- 🔐 Autenticación segura con JWT
- 📱 Diseño responsive y moderno
- 🎨 Interfaz minimalista y futurista
- 🔍 Búsqueda en tiempo real
- 📝 Gestión completa de clientes (CRUD)
- 🚀 API RESTful
- 🎯 Validación de datos
- ⚡ Rendimiento optimizado

## Tecnologías

### Frontend
- React con TypeScript
- Tailwind CSS
- Axios
- JWT para autenticación

### Backend
- Node.js
- Express
- MongoDB con Mongoose
- JWT para autenticación
- Bcrypt para encriptación

## Requisitos Previos

- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/clientra.git
   cd clientra
   ```

2. Instalar dependencias del backend:
   ```bash
   cd backend
   npm install
   ```

3. Instalar dependencias del frontend:
   ```bash
   cd ../frontend
   npm install
   ```

4. Crear archivo .env en la carpeta backend:
   ```
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/clientra
   JWT_SECRET=tu_clave_secreta_aqui
   ```

## Ejecución Local

1. Iniciar el backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Iniciar el frontend:
   ```bash
   cd frontend
   npm start
   ```

La aplicación estará disponible en `http://localhost:3000`

## Despliegue

### Backend (Render)

1. Crear una nueva aplicación web en Render
2. Conectar con el repositorio de GitHub
3. Configurar variables de entorno:
   - `PORT`
   - `MONGODB_URI`
   - `JWT_SECRET`
4. Desplegar

### Frontend

1. Construir la aplicación:
   ```bash
   cd frontend
   npm run build
   ```

2. Desplegar la carpeta `build` en tu servicio de hosting preferido

## Mantenimiento

La aplicación incluye un endpoint `/ping` que puede ser monitoreado con cron-job.org para mantener el servidor activo en Render.

## Estructura del Proyecto

```
clientra/
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    ├── public/
    └── src/
        ├── components/
        └── utils/
```

## Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Contacto

Tu Nombre - [@tu_twitter](https://twitter.com/tu_twitter)

Link del Proyecto: [https://github.com/tu-usuario/clientra](https://github.com/tu-usuario/clientra) 