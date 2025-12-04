# Matriz de Cobertura de Pruebas - Matemanía

## Propósito

Vista de alto nivel para gestión y trazabilidad  
Responde: "¿Qué estamos probando y cuánto hemos cubierto?"

## Características

✅ Mapea requisitos (HU) con casos de prueba  
✅ Muestra tipos y técnicas de testing utilizadas  
✅ Enfoque en cobertura y estado general  
✅ Ideal para reportes a stakeholders y gestión  
✅ Vista consolidada y estratégica

---

## Matriz de Cobertura

| ID | Historia de Usuario (HU) | Caso de Prueba | Tipo de Prueba | Técnica de Casos de Prueba | Estado |
|---|---|---|---|---|---|
| **TC-001** | **HU-015:** Como usuario, quiero tener la facultad de editar mi perfil | Validar navegación al módulo de perfil | Funcional | Caja negra - Navegación | ✅ Aprobado |
| **TC-001-A** | **HU-015:** Como usuario, quiero tener la facultad de editar mi perfil | Verificar visualización de información del usuario | Funcional | Caja negra - Validación de datos | ✅ Aprobado |
| **TC-001-B** | **HU-015:** Como usuario, quiero tener la facultad de editar mi perfil | Validar existencia de botón "Editar Perfil" | Funcional | Caja negra - Validación de UI | ❌ Fallido |
| **TC-001-C** | **HU-015:** Como usuario, quiero tener la facultad de editar mi perfil | Verificar campos editables de perfil (username) | Funcional | Partición de equivalencia - Clase inválida | ❌ Fallido |
| **TC-001-D** | **HU-015:** Como usuario, quiero tener la facultad de editar mi perfil | Validar funcionalidad de cambio de avatar | Funcional | Caja negra - Validación de carga de archivos | ❌ Fallido |
| **TC-001-E** | **HU-015:** Como usuario, quiero tener la facultad de editar mi perfil | Verificar botón "Guardar cambios" | Funcional | Caja negra - Validación de UI | ❌ Fallido |
| **TC-002** | **HU-018:** Como usuario, quiero ingresar a mi cuenta mediante mi nombre de usuario y contraseña | Validar inicio de sesión exitoso con credenciales válidas | Funcional | Caja negra - Flujo positivo | ✅ Aprobado |
| **TC-002-A** | **HU-018:** Como usuario, quiero ingresar a mi cuenta mediante mi nombre de usuario y contraseña | Verificar rechazo de inicio de sesión con credenciales inválidas | Funcional | Partición de equivalencia - Clase inválida | ✅ Aprobado |
| **TC-002-B** | **HU-018:** Como usuario, quiero ingresar a mi cuenta mediante mi nombre de usuario y contraseña | Validar prevención de login con campos vacíos | Funcional | Análisis de valores límite | ✅ Aprobado |
| **TC-002-C** | **HU-018:** Como usuario, quiero ingresar a mi cuenta mediante mi nombre de usuario y contraseña | Verificar redirección a HomePage tras login exitoso | Integración | End-to-end - Flujo completo | ✅ Aprobado |
| **TC-003** | **HU-015:** Como administrador, quiero enviar correo de bienvenida a la plataforma tras la creación de un perfil | Validar envío automático de email de bienvenida | Integración | Caja negra - Prueba de backend | 🔄 Pendiente |
| **TC-004** | **HU-015:** Como administrador, necesito que todas las contraseñas de los usuarios sean cifradas a la hora de ser almacenadas en DB | Verificar cifrado de contraseñas en base de datos | Seguridad | Caja blanca - Análisis de código y BD | ✅ Aprobado |
| **TC-004-A** | **HU-015:** Como administrador, necesito que todas las contraseñas de los usuarios sean cifradas a la hora de ser almacenadas en DB | Validar uso de algoritmo de hash seguro (PBKDF2-SHA256) | Seguridad | Caja blanca - Análisis estático | ✅ Aprobado |
| **TC-004-B** | **HU-015:** Como administrador, necesito que todas las contraseñas de los usuarios sean cifradas a la hora de ser almacenadas en DB | Verificar que contraseñas no se almacenan en texto plano | Seguridad | Prueba de penetración - Inspección de BD | ✅ Aprobado |
| **TC-005** | **HU-015:** Como usuario, necesito que se me oriente de buena manera el funcionamiento de la aplicación | Validar aparición automática del tour en primera visita | Funcional | Caja negra - Flujo de usuario | ✅ Aprobado |
| **TC-005-A** | **HU-015:** Como usuario, necesito que se me oriente de buena manera el funcionamiento de la aplicación | Verificar navegación entre pasos del tour con "Siguiente" | Funcional | Caja negra - Navegación secuencial | ✅ Aprobado |
| **TC-005-B** | **HU-015:** Como usuario, necesito que se me oriente de buena manera el funcionamiento de la aplicación | Validar funcionalidad de omitir tour con botón "Omitir" | Funcional | Caja negra - Flujo alternativo | ✅ Aprobado |
| **TC-005-C** | **HU-015:** Como usuario, necesito que se me oriente de buena manera el funcionamiento de la aplicación | Verificar finalización completa del tour | Funcional | End-to-end - Flujo completo | ✅ Aprobado |
| **TC-005-D** | **HU-015:** Como usuario, necesito que se me oriente de buena manera el funcionamiento de la aplicación | Validar que tour no aparece en visitas subsecuentes | Funcional | Caja negra - Persistencia de estado | ✅ Aprobado |
| **TC-005-E** | **HU-015:** Como usuario, necesito que se me oriente de buena manera el funcionamiento de la aplicación | Verificar navegación hacia atrás con botón "Anterior" | Funcional | Caja negra - Navegación bidireccional | ✅ Aprobado |
| **TC-005-F** | **HU-015:** Como usuario, necesito que se me oriente de buena manera el funcionamiento de la aplicación | Validar integración con localStorage | Integración | Caja blanca - Prueba de almacenamiento | ✅ Aprobado |

---

## Leyenda de Estados

| Estado | Descripción |
|--------|-------------|
| ✅ **Aprobado** | Caso de prueba ejecutado exitosamente |
| ❌ **Fallido** | Caso de prueba con defectos identificados (esperado - funcionalidad no implementada) |
| ⚠ **En ejecución** | Caso de prueba en proceso |
| 🔄 **Pendiente** | Caso de prueba no iniciado (requiere prueba de backend) |
| ⏸ **Bloqueado** | Caso de prueba con dependencias pendientes |

---

## Resumen de Cobertura

| Métrica | Valor |
|---------|-------|
| **Total de HU** | 2 (HU-015, HU-018) |
| **Total de Casos de Prueba** | 21 |
| **Cobertura de HU** | 100% (2/2) |
| **Casos Aprobados** | 16 (76.2%) |
| **Casos Fallidos** | 4 (19.0%) |
| **Casos Pendientes** | 1 (4.8%) |
| **Casos En Progreso** | 0 (0%) |

---

## Distribución por Tipo de Prueba

| Tipo de Prueba | Cantidad | Porcentaje |
|----------------|----------|------------|
| **Funcional** | 15 | 71.4% |
| **Seguridad** | 3 | 14.3% |
| **Integración** | 3 | 14.3% |
| **Rendimiento** | 0 | 0% |

---

## Distribución por Técnica de Prueba

| Técnica | Cantidad | Porcentaje |
|---------|----------|------------|
| **Caja negra** | 13 | 61.9% |
| **Caja blanca** | 3 | 14.3% |
| **Partición de equivalencia** | 2 | 9.5% |
| **Análisis de valores límite** | 1 | 4.8% |
| **End-to-end** | 2 | 9.5% |

---

## Análisis de Cobertura por Historia de Usuario

### HU-015: Gestión de Perfil y Onboarding

| Aspecto | Casos de Prueba | Estado |
|---------|-----------------|--------|
| Edición de perfil | 6 | ❌ 4 Fallidos, ✅ 2 Aprobados |
| Email de bienvenida | 1 | 🔄 Pendiente (backend) |
| Cifrado de contraseñas | 3 | ✅ 3 Aprobados |
| Tour de orientación | 7 | ✅ 7 Aprobados |
| **Total HU-015** | **17** | **10 Aprobados, 4 Fallidos, 1 Pendiente** |

### HU-018: Autenticación de Usuario

| Aspecto | Casos de Prueba | Estado |
|---------|-----------------|--------|
| Login exitoso | 1 | ✅ Aprobado |
| Validación de credenciales | 1 | ✅ Aprobado |
| Validación de campos | 1 | ✅ Aprobado |
| Redirección post-login | 1 | ✅ Aprobado |
| **Total HU-018** | **4** | **4 Aprobados** |

---

## Defectos Identificados

| ID Defecto | Caso de Prueba | Severidad | Descripción | Acción Requerida |
|------------|----------------|-----------|-------------|------------------|
| **DEF-001** | TC-001-B | Media | Botón "Editar Perfil" no existe en módulo de perfil | Implementar funcionalidad de edición de perfil |
| **DEF-002** | TC-001-C | Media | Campos de perfil no son editables | Implementar campos editables en perfil |
| **DEF-003** | TC-001-D | Media | Funcionalidad de cambio de avatar no disponible | Implementar carga y cambio de avatar |
| **DEF-004** | TC-001-E | Media | Botón "Guardar cambios" no existe | Implementar botón de guardado de cambios |
| **DEF-005** | TC-003 | Baja | Email de bienvenida no se envía tras registro | Implementar servicio de email en backend |

---

## Recomendaciones

### Prioridad Alta
1. **Implementar funcionalidad de edición de perfil** (DEF-001 a DEF-004)
   - Impacta 4 casos de prueba
   - Severidad: Media
   - Funcionalidad esperada por usuarios

### Prioridad Media
2. **Configurar servicio de email** (DEF-005)
   - Impacta 1 caso de prueba
   - Severidad: Baja
   - Mejora experiencia de usuario

### Cobertura Completa
3. **Mantener cobertura actual**
   - 100% de HU cubiertas
   - 76.2% de casos aprobados
   - Buena distribución de técnicas de prueba

---

## Notas Técnicas

### Pruebas Automatizadas E2E
- Framework: Playwright
- Navegadores: Chromium, Firefox, WebKit
- Ubicación: `/tests/e2e/`
- Helpers: `auth.helper.ts`, `tour.helper.ts`

### Pruebas Backend (Pendientes)
- TC-003: Requiere prueba de servicio de email
- TC-004: Requiere inspección de base de datos

### Documentación
- Casos de prueba detallados: `/tests/e2e/tc-*.spec.ts`
- README: `/tests/e2e/README.md`
- Configuración: `/tests/e2e/TEST_USER_SETUP.md`

---

## Historial de Actualizaciones

| Fecha | Versión | Cambios |
|-------|---------|---------|
| 2025-11-27 | 1.0 | Creación inicial de matriz de cobertura |

---

**Preparado por:** Equipo de QA - Matemanía  
**Última actualización:** 2025-11-27  
**Próxima revisión:** Tras implementación de edición de perfil
