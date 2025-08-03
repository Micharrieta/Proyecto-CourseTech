# Proyecto-CourseTech
Plataforma web de capacitación en habilidades digitales a través de cursos, evaluaciones y tutorías.
Esta plataforma está diseñada para facilitar la capacitación en habilidades digitales. Permite a los usuarios registrarse, realizar evaluaciones, acceder a foros de discusión, solicitar tutorías y recibir asistencia personalizada. El sistema incluye un panel de administración y tutorías para gestionar usuarios, cursos, evaluaciones y contenidos, todo integrado en una arquitectura web con frontend y backend conectados a una base de datos MySQL.

<br>

## Proyecto construido con: 

- HTML5
- TailwindCSS
- JavaScript
- Node.js
- Express
- MySQL

<br>

## Ejecutar el proyecto de forma local

### Paso 1: Clonar el repositorio o descargar las carpetas del front-end, backend y archivo SQL

```
git clone https://github.com/Micharrieta/Proyecto-CourseTech.git
```

### Paso 2: Crear una base de datos MySQL e importar el archivo "CourseTech.sql"

### Paso 3: Crear un archivo .env

Se debe crear un archivo .env dentro del directorio "Api-Backend"

- El archivo .env contendrá las credenciales para la conexion a la base de datos, se sugiere la estructura presente en el archivo .env.example

```
DB_HOST=localhost           
DB_PORT=3306               
DB_USER=your_db_user        
DB_PASSWORD=your_db_password  
DB_NAME=your_db_name       

EMAIL_SERVICE=your_email_service     
EMAIL_USER=your_email@example.com   
EMAIL_PASS=your_email_password   

JWT_TOKEN=your_jwt_secret_key
```

### Paso 4: Instalar dependencias

Se debe contar con Node.js en el sistema para posteriormente instalar las siguientes dependencias dentro del directorio "Api-Backend"

```
npm install

npm install dotenv

npm install nodemailer
```

### Paso 5: Ejecutar Back-end y Front-end

Para correr el backend ejecuta los siguientes comandos.

```
cd Api-Backend
node index.js
```

Por defecto empezara a correr en el puerto 5000

<br>

Para ejecutar el front-end simplemente abre live server en el archivo 'index.html'.

## ADICIONAL

Si deseas crear usuarios de tipo administrador o tutor, puedes ejecutar los archivos 'crearAdmin.js' y 'crearTutor.js'con los siguientes comandos.

```
node crearAdmin.js

node crearTutor.js
```

Estos archivos insertan en la base de datos usuarios del tipo admin o tutor con unas credenciales por defecto que puedes cambiar a tu gusto.


