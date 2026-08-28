# 🚀 API REST - TechLab

API REST para gestión de productos con autenticación JWT y Firebase Firestore.

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Autenticación](#autenticación)
- [Ejemplos con Postman](#ejemplos-con-postman)
- [Manejo de Errores](#manejo-de-errores)
- [Estructura del Proyecto](#estructura-del-proyecto)

---

## ✨ Características

- ✅ CRUD completo de productos
- ✅ Autenticación con JWT (JSON Web Tokens)
- ✅ Protección de rutas sensibles
- ✅ Validación de datos
- ✅ Manejo centralizado de errores
- ✅ Integración con Firebase Firestore
- ✅ Firebase Admin SDK para máxima seguridad
- ✅ Arquitectura en capas (MVC)
- ✅ CORS configurado

---

## 🛠️ Tecnologías

- **Node.js** (v18+)
- **Express.js** - Framework web
- **Firebase Admin SDK** - Base de datos Firestore
- **JWT** - Autenticación y autorización
- **dotenv** - Variables de entorno
- **CORS** - Control de acceso entre orígenes

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior)
- [npm](https://www.npmjs.com/) (viene con Node.js)
- [Postman](https://www.postman.com/) (para probar la API)
- Cuenta en [Firebase](https://firebase.google.com/)

---

## 🔧 Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/tu-usuario/backendnodejsfinal.git
cd backendnodejsfinal
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar Firebase:**
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Crea un proyecto o usa uno existente
   - Habilita **Firestore Database**
   - Ve a **Configuración del Proyecto** → **Cuentas de servicio**
   - Click en **"Generar nueva clave privada"**
   - Guarda el archivo JSON como `firebase-admin-key.json` en la raíz del proyecto

4. **Configurar variables de entorno:**

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=3000
JWT_SECRET=tu_clave_secreta_super_segura

FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=tu_proyecto_id
FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=tu_app_id
```

5. **Configurar reglas de Firestore:**

En Firebase Console → Firestore Database → Reglas, pega esto:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /productos/{productId} {
      allow read, write: if false;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Esto bloquea todo acceso directo. Solo el backend (con Admin SDK) puede acceder.

---

## 🚀 Uso

**Iniciar el servidor:**

```bash
npm start
```

El servidor estará corriendo en `http://localhost:3000`

Verás este mensaje:
```
=================================
🚀 Servidor corriendo en http://localhost:3000
=================================
```

---

## 📍 Endpoints

### **Públicos (sin autenticación)**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products/:id` | Obtener un producto por ID |
| POST | `/auth/login` | Iniciar sesión y obtener token |

### **Protegidos (requieren token JWT)**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/products/create` | Crear un nuevo producto |
| PUT | `/api/products/:id` | Actualizar un producto |
| DELETE | `/api/products/:id` | Eliminar un producto |

---

## 🔐 Autenticación

Esta API usa **JWT (JSON Web Tokens)** para autenticación.

### **Credenciales de prueba:**
- **Email:** `admin@techlab.com`
- **Password:** `admin123`

### **Flujo de autenticación:**

1. Hacer login en `/auth/login`
2. Copiar el token JWT de la respuesta
3. Incluir el token en el header `Authorization` como `Bearer TOKEN`

---

## 🧪 Ejemplos con Postman

### **1️⃣ Obtener todos los productos (GET)**

**URL:** `http://localhost:3000/api/products`  
**Método:** GET  
**Headers:** Ninguno  

**Respuesta esperada:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": "abc123",
      "nombre": "Notebook HP",
      "descripcion": "Laptop 15 pulgadas",
      "precio": 850000,
      "stock": 5,
      "categoria": "notebooks",
      "imagen": "https://ejemplo.com/imagen.jpg"
    }
  ]
}
```

---

### **2️⃣ Iniciar sesión (POST)**

**URL:** `http://localhost:3000/auth/login`  
**Método:** POST  
**Headers:** 
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "admin@techlab.com",
  "password": "admin123"
}
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "email": "admin@techlab.com",
    "role": "admin"
  }
}
```

⚠️ **IMPORTANTE:** Copia el `token` de la respuesta para usarlo en las siguientes peticiones.

---

### **3️⃣ Crear un producto (POST - Requiere token)**

**URL:** `http://localhost:3000/api/products/create`  
**Método:** POST  
**Headers:**
```
Content-Type: application/json
Authorization: Bearer TU_TOKEN_AQUI
```

**Body (raw JSON):**
```json
{
  "nombre": "iPhone 15 Pro",
  "descripcion": "Smartphone Apple con chip A17 Pro",
  "precio": 1200000,
  "stock": 10,
  "categoria": "smartphones",
  "imagen": "https://ejemplo.com/iphone15.jpg"
}
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Producto creado exitosamente",
  "data": {
    "id": "xyz789",
    "nombre": "iPhone 15 Pro",
    "descripcion": "Smartphone Apple con chip A17 Pro",
    "precio": 1200000,
    "stock": 10,
    "categoria": "smartphones",
    "imagen": "https://ejemplo.com/iphone15.jpg",
    "createdAt": "2024-12-10T15:30:00.000Z",
    "updatedAt": "2024-12-10T15:30:00.000Z"
  }
}
```

---

### **4️⃣ Actualizar un producto (PUT - Requiere token)**

**URL:** `http://localhost:3000/api/products/xyz789`  
**Método:** PUT  
**Headers:**
```
Content-Type: application/json
Authorization: Bearer TU_TOKEN_AQUI
```

**Body (raw JSON):**
```json
{
  "precio": 1150000,
  "stock": 8
}
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Producto actualizado exitosamente",
  "data": {
    "id": "xyz789",
    "nombre": "iPhone 15 Pro",
    "precio": 1150000,
    "stock": 8,
    ...
  }
}
```

---

### **5️⃣ Eliminar un producto (DELETE - Requiere token)**

**URL:** `http://localhost:3000/api/products/xyz789`  
**Método:** DELETE  
**Headers:**
```
Authorization: Bearer TU_TOKEN_AQUI
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Producto eliminado exitosamente"
}
```

---

### **6️⃣ Obtener un producto por ID (GET)**

**URL:** `http://localhost:3000/api/products/xyz789`  
**Método:** GET  
**Headers:** Ninguno  

**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "id": "xyz789",
    "nombre": "iPhone 15 Pro",
    "descripcion": "Smartphone Apple con chip A17 Pro",
    "precio": 1200000,
    "stock": 10,
    "categoria": "smartphones"
  }
}
```

---

## ⚠️ Manejo de Errores

La API devuelve los siguientes códigos de estado HTTP:

| Código | Significado | Ejemplo |
|--------|-------------|---------|
| **200** | OK | Operación exitosa |
| **201** | Created | Producto creado |
| **400** | Bad Request | Datos inválidos o faltantes |
| **401** | Unauthorized | Token faltante o inválido |
| **403** | Forbidden | Token expirado |
| **404** | Not Found | Recurso no encontrado |
| **500** | Server Error | Error interno del servidor |

### **Ejemplos de errores:**

**Sin token:**
```json
{
  "error": "No se proporcionó token de autenticación"
}
```

**Token inválido:**
```json
{
  "error": "Token inválido"
}
```

**Validación fallida:**
```json
{
  "success": false,
  "error": "El nombre es obligatorio, El precio debe ser un número positivo"
}
```

**Producto no encontrado:**
```json
{
  "success": false,
  "error": "Producto no encontrado"
}
```

---

## 📁 Estructura del Proyecto

```
backendnodejsfinal/
├── src/
│   ├── config/
│   │   └── firebase.js          # Configuración de Firebase Admin SDK
│   ├── controllers/
│   │   ├── auth.controller.js   # Controlador de autenticación
│   │   └── product.controller.js # Controlador de productos
│   ├── middlewares/
│   │   ├── auth.middleware.js   # Verificación de JWT
│   │   └── error.middleware.js  # Manejo de errores
│   ├── models/
│   │   └── product.model.js     # Modelo y validaciones
│   ├── routes/
│   │   ├── auth.routes.js       # Rutas de autenticación
│   │   └── products.routes.js   # Rutas de productos
│   └── services/
│       ├── auth.service.js      # Lógica de autenticación
│       └── product.service.js   # Lógica de productos (CRUD)
├── .env                          # Variables de entorno
├── .gitignore                    # Archivos ignorados por Git
├── firebase-admin-key.json       # Credenciales de Firebase (NO SUBIR)
├── index.js                      # Punto de entrada
├── package.json                  # Dependencias
└── README.md                     # Este archivo
```

---

## 🔒 Seguridad

- ✅ Las credenciales están en variables de entorno (`.env`)
- ✅ Firebase Admin SDK con permisos de administrador
- ✅ Firestore completamente bloqueado a acceso directo
- ✅ JWT con expiración de 24 horas
- ✅ Validación de datos en el modelo
- ✅ CORS configurado
- ⚠️ **IMPORTANTE:** Nunca subas `firebase-admin-key.json` a Git

---

## 📝 Modelo de Producto

```javascript
{
  "nombre": String (obligatorio),
  "descripcion": String (obligatorio),
  "precio": Number (obligatorio, > 0),
  "stock": Number (obligatorio, >= 0),
  "categoria": String (obligatorio),
  "imagen": String (opcional),
  "createdAt": String (automático),
  "updatedAt": String (automático)
}
```

---

Desarrollado por [Jorge Gastón Murúa](https://jorge-gaston-murua.gtresia.com/) — [portfolio](https://jorge-gaston-murua.gtresia.com/) · [LinkedIn](https://linkedin.com/in/jgastonmurua)
