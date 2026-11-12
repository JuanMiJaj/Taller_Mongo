# Tienda GCO — conectada a MongoDB

Tienda online (index.html) que muestra las prendas desde una base de datos
MongoDB a través de un backend en Node.js + Express.

## Cómo funciona

```
Navegador (index.html)
        │  fetch("/api/prendas")
        ▼
Backend Express (server.js)  ──►  MongoDB (base de datos AtuendoDBx)
```

El HTML **no se conecta directamente a MongoDB** (no es posible ni seguro
desde el navegador). En su lugar pide los datos al backend, que sí habla con
la base de datos y devuelve las prendas en formato JSON.

## Inicio rápido (si acabas de clonar el repositorio)

```bash
# 1. Instalar todas las dependencias (lee package.json)
npm install

# 2. Crear tu archivo de configuración a partir de la plantilla
copy .env.example .env      # Windows
# cp .env.example .env      # Linux / Mac

# 3. Edita .env y pon tu cadena de conexión a MongoDB (ver Paso 1)

# 4. Importar los datos a la base de datos
npm run seed

# 5. Arrancar el servidor
npm start
```

Luego abre **http://localhost:3000**. Los pasos detallados están más abajo.

## Requisitos

- Node.js (ya instalado: v24.15.0)
- Una base de datos MongoDB. Elige **UNA** de las dos opciones de abajo.

## Paso 1 — Configurar la base de datos

Edita el archivo `.env` y pon tu cadena de conexión en `MONGODB_URI`.

### Opción A — MongoDB Atlas (nube, recomendado, no instalas nada)

1. Crea una cuenta gratis en https://www.mongodb.com/cloud/atlas
2. Crea un cluster gratuito (M0).
3. En **Database Access** crea un usuario con contraseña.
4. En **Network Access** añade tu IP (o `0.0.0.0/0` para permitir todas).
5. Pulsa **Connect → Drivers** y copia la cadena, que se ve así:
   ```
   mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/AtuendoDBx
   ```
6. Pégala en `.env`:
   ```
   MONGODB_URI=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/AtuendoDBx
   ```

### Opción B — MongoDB local (instalar en tu PC)

1. Descarga **MongoDB Community Server** desde
   https://www.mongodb.com/try/download/community
2. Instálalo (deja marcado "Install as a Service" para que arranque solo).
3. Deja en `.env` la línea local:
   ```
   MONGODB_URI=mongodb://127.0.0.1:27017/AtuendoDBx
   ```

## Paso 2 — Instalar dependencias 

```
npm install
```

## Paso 3 — Importar los datos a MongoDB

Esto carga las marcas y prendas de los archivos JSON a tu base de datos:

```
npm run seed
```

Debe mostrar algo como:
`✅ Importadas 5 marcas y 5 prendas.`

## Paso 4 — Arrancar el servidor

```
npm start
```

Verás:
`🚀 Servidor en http://localhost:3000`

Abre en el navegador: **http://localhost:3000**

La sección "PRODUCTOS DESTACADOS" se llenará con las prendas de la base de
datos (nombre, marca, categoría, color y talla).

## Endpoints de la API

| Método | Ruta                | Descripción                         |
|--------|---------------------|-------------------------------------|
| GET    | `/api/prendas`      | Todas las prendas con su marca      |
| GET    | `/api/prendas/:id`  | Una prenda por su id                |
| GET    | `/api/marcas`       | Todas las marcas                    |

## Estructura del proyecto

```
C/
├── index.html          Frontend de la tienda (consume la API)
├── server.js           Servidor Express + conexión a MongoDB
├── seed.js             Importa los JSON a MongoDB
├── models/
│   ├── Prenda.js       Modelo Mongoose de prendas
│   └── Marca.js        Modelo Mongoose de marcas
├── Atuendodbx/          Datos JSON que carga el seed
├── .env.example        Plantilla de configuración (SÍ se sube al repo)
├── .env                Tu configuración real (NO se sube, está en .gitignore)
└── package.json        Dependencias del proyecto (npm install)
```

## Nota importante

Debes abrir la página desde **http://localhost:3000** (servida por el
backend), NO abriendo el archivo `index.html` con doble clic. Si lo abres
directo (`file://...`) el `fetch` a `/api/prendas` no funcionará.
