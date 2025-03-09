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
