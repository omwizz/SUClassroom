# Storage

Documento de referencia para Supabase Storage en Fase 5.

## Bucket

Bucket privado conceptual:

```text
deliverables
```

Puede cambiarse con:

```bash
SUPABASE_DELIVERABLES_BUCKET=deliverables
```

## Estructura de archivos

```text
deliverables/{studentId}/{projectId}/{deliverableId}/{timestamp-fileName}
```

## Configuracion requerida

Variables necesarias:

```bash
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_DELIVERABLES_BUCKET=deliverables
```

`SUPABASE_SERVICE_ROLE_KEY` se usa solo en servidor dentro de `StorageService`. No debe usarse en componentes client-side ni con prefijo `NEXT_PUBLIC`.

## Reglas

- Bucket privado.
- Maximo 10 MB por archivo.
- Maximo 5 archivos por entregable por defecto.
- Tipos permitidos:
  - PDF.
  - DOC/DOCX.
  - PPT/PPTX.
  - XLS/XLSX.
  - JPG/PNG/WEBP.
- La UI recibe signed URLs temporales de 30 minutos.
- Si Storage no esta configurado, la app no rompe build: la accion de carga devuelve un mensaje claro.

## Nota operativa

El bucket se intenta crear bajo demanda desde servidor cuando se adjunta el primer archivo. Si el proyecto Supabase restringe esa operacion, crea manualmente el bucket privado `deliverables` desde el dashboard de Supabase y conserva las mismas variables de entorno.

