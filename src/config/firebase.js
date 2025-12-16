import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';
// Importa el módulo 'path'
import path from 'path'; 

dotenv.config();

// --- SOLUCIÓN: Usar process.cwd() para obtener la raíz del proyecto ---

// 1. Obtener la ruta del directorio de trabajo actual (la raíz del proyecto)
const projectRoot = process.cwd();

// 2. Construir la ruta absoluta al archivo JSON
const serviceAccountPath = path.join(projectRoot, 'firebase-admin-key.json');

// Leer las credenciales del archivo JSON usando la RUTA ABSOLUTA
const serviceAccount = JSON.parse(
  readFileSync(serviceAccountPath, 'utf8') // <--- ¡Ruta absoluta corregida!
);

// Inicializar Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID
});

// Obtener instancia de Firestore
const db = admin.firestore();

export { db, admin };