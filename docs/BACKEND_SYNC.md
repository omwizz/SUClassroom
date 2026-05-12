# Sincronizacion de backend externo

Se reviso el backend externo ubicado en `C:\Users\mena_\Downloads\backend\backend`.

Ese backend era una app Express separada con rutas para auth, usuarios, cursos,
inscripciones y proyectos. No se copio tal cual porque no coincide con la
arquitectura actual de SUClassroom:

- Usa una tabla `users`, pero SUClassroom usa Supabase Auth + `profiles`.
- Verifica JWT con una clave hardcodeada, pero SUClassroom usa tokens reales de
  Supabase y cookies SSR.
- Usa tablas `enrollments` y `projects`, pero SUClassroom actualmente modela
  `student_projects`, entregables y asignaciones de mentor.
- Requiere otro servidor en puerto 4000, mientras el proyecto vive en Next.js
  App Router.

## Rutas API sincronizadas

Las rutas equivalentes viven bajo `/api/*`:

| Backend externo | SUClassroom |
| --- | --- |
| `POST /auth/register` | `POST /api/auth/register` |
| `POST /auth/login` | `POST /api/auth/login` |
| `GET /users` | `GET /api/users` |
| `GET /courses` | `GET /api/courses` |
| `POST /courses` | `POST /api/courses` |
| `GET /projects/my` | `GET /api/projects/my` |
| `POST /courses/:courseId/enroll` | `POST /api/courses/:courseId/enroll` con respuesta `501` hasta tener inscripciones |
| `GET /courses/:courseId/projects` | `GET /api/courses/:courseId/projects` con respuesta `501` porque proyectos no dependen directamente de cursos |
| `POST /courses/:courseId/projects` | `POST /api/courses/:courseId/projects` con respuesta `501`; usar `POST /api/projects` |

## Autenticacion API

Las rutas protegidas aceptan:

- Sesion cookie normal de la app.
- Header `Authorization: Bearer <access_token_de_Supabase>`.

No se usa `jsonwebtoken`, no se usa clave hardcodeada y no se expone ninguna
service role key al cliente.

## Pendiente

Para reemplazar totalmente las rutas de inscripcion del backend externo hace
falta una fase de modelo de datos para inscripciones/cohortes o cursos asignados.
La arquitectura del proyecto ya contempla instituciones/cohortes en fases
posteriores, asi que no se agrego una tabla improvisada.
