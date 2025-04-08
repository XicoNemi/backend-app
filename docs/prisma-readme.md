# 📌 Comandos esenciales de Prisma

## 🛠️ Inicializar Prisma
```sh
npx prisma init
```
> Crea la estructura de Prisma en el proyecto (`prisma/schema.prisma` y `.env`).

## 🔄 Generar el cliente de Prisma
```sh
npx prisma generate
```
> Genera el cliente de Prisma basado en el esquema actual. Se debe ejecutar después de cada cambio en `schema.prisma`.

---

# 🔄 Migraciones

## 📌 Crear una nueva migración
```sh
npx prisma migrate dev --name nombre_migracion
```
> Crea y aplica una nueva migración en un entorno de desarrollo, generando los archivos SQL correspondientes.

## 🚀 Aplicar migraciones en producción
```sh
npx prisma migrate deploy
```
> Aplica todas las migraciones pendientes en la base de datos en producción.

## ⚡ Sincronizar esquema sin borrar datos (`push`)
```sh
npx prisma db push
```
> Aplica cambios al esquema de la base de datos sin crear migraciones y sin borrar datos. Útil para entornos de desarrollo rápidos.

---

# 📦 Manejo de la base de datos

## 🔍 Ver el estado actual de la base de datos
```sh
npx prisma migrate status
```
> Muestra el estado de las migraciones aplicadas en la base de datos.

## 🗑️ Resetear la base de datos (⚠️ Borra los datos)
```sh
npx prisma migrate reset
```
> Borra la base de datos, vuelve a ejecutar migraciones y repuebla los datos.

---

# 🔍 Inspección y gestión de datos

## 📌 Ver los cambios en la base de datos
```sh
npx prisma db pull
```
> Sincroniza `schema.prisma` con la base de datos existente sin modificar datos.

## 🖥️ Abrir el Prisma Studio (interfaz visual para ver y modificar datos)
```sh
npx prisma studio
```
> Abre una UI para visualizar y editar los datos en la base de datos.

---

# 🚀 Otros comandos útiles

## 📌 Ejecutar scripts con Prisma
```sh
npx prisma execute --file script.sql
```
> Permite ejecutar archivos SQL directamente en la base de datos.

## 📊 Consultar datos desde CLI
```sh
npx prisma db seed
```
> Ejecuta un script para poblar la base de datos con datos iniciales.

# 📘 Diccionario de Datos – Prisma Schema

---

## 🔹 Enum Types

### CategoryType
| Valores |
|---------|
| Hospedaje |
| Gastronomia |
| Eventos |
| Turismo |
| Itinerarios |
| Cine |
| Otro |

### TypeUser
| Valores |
|---------|
| Common |
| BusinessOwner |
| SuperAdmin |

### Gender
| Valores |
|---------|
| Masculino |
| Femenino |
| Otro |

### TypeEvent
| Valores |
|---------|
| General |
| Cultural |
| Gastronomico |
| Aventura |
| Relax |
| Familiar |
| Otro |

---

## 🔹 Tabla: Users
| Campo           | Tipo          | PK  | FK  | Nulo | Descripción                     |
|------------------|---------------|-----|-----|------|---------------------------------|
| id              | String (UUID) | ✅  |     | ❌   | Identificador único del usuario |
| subscriptionId  | String        |     | ✅  | ✅   | ID de suscripción               |
| facebookId      | String        |     | ✅  | ✅   | ID de Facebook                  |
| name            | String        |     |     | ❌   | Nombre del usuario              |
| lastname        | String        |     |     | ❌   | Apellido del usuario            |
| email           | String        |     |     | ❌   | Correo electrónico (único)      |
| password        | String        |     |     | ❌   | Contraseña cifrada              |
| tel             | String        |     |     | ❌   | Teléfono del usuario            |
| birthday        | Int           |     |     | ❌   | Año de nacimiento               |
| gender          | Gender        |     | ✅  | ✅   | Género del usuario              |
| url_image       | String        |     |     | ✅   | Imagen de perfil                |
| type            | TypeUser      |     |     | ❌   | Tipo de usuario                 |
| status          | Boolean       |     |     | ❌   | Estado activo/inactivo          |
| token           | String        |     |     | ✅   | Token para recuperación o login |

### Relaciones:
- Tiene muchas rutas (Routes)
- Tiene muchos itinerarios (Itineraries)
- Tiene muchos negocios (Businesses)
- Tiene muchas suscripciones (Subscriptions)
- Tiene muchas reseñas (Reviews)
- Participa en muchas rutas (userHasRoute)

---

## 🔹 Tabla: Events
| Campo       | Tipo   | PK  | FK  | Nulo | Descripción                     |
|-------------|--------|-----|-----|------|---------------------------------|
| id          | String | ✅  |     | ❌   | ID único del evento             |
| userId      | String |     | ✅  | ❌   | ID del usuario que lo creó      |
| name        | String |     |     | ❌   | Nombre del evento               |
| description | String |     |     | ❌   | Descripción del evento          |
| url_image   | String |     |     | ✅   | Imagen representativa           |
| startDate   | Int    |     |     | ❌   | Fecha de inicio (timestamp)     |
| endDate     | Int    |     |     | ❌   | Fecha de finalización (timestamp) |
| status      | Boolean|     |     | ❌   | Estado del evento               |
| type        | TypeEvent |  |     | ❌   | Tipo de evento                  |

### Relaciones:
- Tiene puntos de interés
- Tiene reseñas
- Relación con itinerarios (itineraryHasEvent)
- Relación con negocios (businessHasEvent)

---

## 🔹 Tabla: Businesses
| Campo          | Tipo         | PK  | FK  | Nulo | Descripción           |
|-----------------|--------------|-----|-----|------|-----------------------|
| id             | String       | ✅  |     | ❌   | ID del negocio        |
| ownerId        | String       |     | ✅  | ❌   | Usuario propietario   |
| name           | String       |     |     | ❌   | Nombre del negocio    |
| description    | String       |     |     | ❌   | Descripción           |
| url_image      | String       |     |     | ✅   | Imagen                |
| category       | CategoryType |     |     | ❌   | Tipo de negocio       |
| address        | String       |     |     | ❌   | Dirección física      |
| tel            | String       |     |     | ❌   | Teléfono              |
| web_site       | String       |     |     | ✅   | Página web            |
| social_networks| Json         |     |     | ✅   | Redes sociales        |
| status         | Boolean      |     |     | ❌   | Activo o no           |

---

## 🔹 Tabla: Reviews
| Campo       | Tipo         | PK  | FK  | Nulo | Descripción                     |
|-------------|--------------|-----|-----|------|---------------------------------|
| id          | String       | ✅  |     | ❌   | ID de la reseña                 |
| userId      | String       |     | ✅  | ❌   | Usuario que la escribió         |
| businessId  | String       |     | ✅  | ✅   | Negocio reseñado                |
| eventId     | String       |     | ✅  | ✅   | Evento reseñado                 |
| rating      | Decimal(2,1) |     |     | ❌   | Calificación del 0.0 al 9.9     |
| comment     | String       |     |     | ✅   | Comentario                      |

---

## 🔹 Tabla: Subscriptions
| Campo       | Tipo   | PK  | FK  | Nulo | Descripción                     |
|-------------|--------|-----|-----|------|---------------------------------|
| id          | String | ✅  |     | ❌   | ID de la suscripción            |
| userId      | String |     | ✅  | ❌   | Usuario suscrito                |
| planId      | String |     | ✅  | ❌   | Plan al que se suscribe         |
| startDate   | Int    |     |     | ❌   | Fecha de inicio                 |
| endDate     | Int    |     |     | ❌   | Fecha de fin                    |
| status      | Boolean|     |     | ❌   | Activa o no                     |

---

## 🔹 Tabla: PointsOfInterest
| Campo       | Tipo   | PK  | FK  | Nulo | Descripción                     |
|-------------|--------|-----|-----|------|---------------------------------|
| id          | String | ✅  |     | ❌   | ID único del punto              |
| name        | String |     |     | ❌   | Nombre del lugar                |
| description | String |     |     | ❌   | Descripción del punto           |
| url_image   | String |     |     | ✅   | Imagen                          |
| locationId  | String |     | ✅  | ❌   | ID de la ubicación              |
| eventId     | String |     | ✅  | ✅   | Relación con un evento          |
| businessId  | String |     | ✅  | ✅   | Relación con un negocio         |
| status      | Boolean|     |     | ❌   | Estado del punto                |

---

## 🔹 Tabla: Plans
| Campo       | Tipo   | PK  | FK  | Nulo | Descripción                     |
|-------------|--------|-----|-----|------|---------------------------------|
| id          | String | ✅  |     | ❌   | ID del plan                     |
| name        | String |     |     | ❌   | Nombre del plan                 |
| price       | Float  |     |     | ❌   | Costo del plan                  |
| features    | String |     |     | ❌   | Características incluidas       |
| status      | Boolean|     |     | ❌   | Activo o no                     |

---



## 🔹 Tablas Relacionales

### ItineraryHasEvent
| Campo       | Tipo   | PK  | FK  | Nulo | Descripción                     |
|-------------|--------|-----|-----|------|---------------------------------|
| id          | String | ✅  |     | ❌   | ID único de la relación         |
| itineraryId | String |     | ✅  | ❌   | ID del itinerario               |
| eventId     | String |     | ✅  | ❌   | ID del evento                   |
| status      | Boolean|     |     | ❌   | Estado de la relación           |

---

### UserHasRoute
| Campo       | Tipo   | PK  | FK  | Nulo | Descripción                     |
|-------------|--------|-----|-----|------|---------------------------------|
| id          | String | ✅  |     | ❌   | ID único de la relación         |
| userId      | String |     | ✅  | ❌   | ID del usuario                  |
| routeId     | String |     | ✅  | ❌   | ID de la ruta                   |
| status      | Boolean|     |     | ❌   | Estado de la relación           |

---

### RouteHasPoint
| Campo       | Tipo   | PK  | FK  | Nulo | Descripción                     |
|-------------|--------|-----|-----|------|---------------------------------|
| id          | String | ✅  |     | ❌   | ID único de la relación         |
| routeId     | String |     | ✅  | ❌   | ID de la ruta                   |
| pointId     | String |     | ✅  | ❌   | ID del punto de interés         |
| status      | Boolean|     |     | ❌   | Estado de la relación           |

---

### BusinessHasEvent
| Campo       | Tipo   | PK  | FK  | Nulo | Descripción                     |
|-------------|--------|-----|-----|------|---------------------------------|
| id          | String | ✅  |     | ❌   | ID único de la relación         |
| businessId  | String |     | ✅  | ❌   | ID del negocio                  |
| eventId     | String |     | ✅  | ❌   | ID del evento                   |
| status      | Boolean|     |     | ❌   | Estado de la relación           |

---
