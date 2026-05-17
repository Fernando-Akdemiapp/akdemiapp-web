---
title: "Cómo configurar mensajes de WhatsApp"
description: "Personaliza las plantillas de recordatorios automáticos de pago, inasistencia y cumpleaños."
module: "Comunicaciones"
order: 1
date: 2026-05-01
---

AKDEMIApp puede enviar mensajes de WhatsApp automáticos a padres y alumnos sin que tengas que hacerlo manualmente. Tú defines el mensaje, el sistema lo envía en el momento correcto.

## Cómo acceder

Ve a **Configuración → Mensajes WhatsApp**.

## Plantillas disponibles

Puedes personalizar mensajes para estos eventos:

- **Recordatorio de pago** — se envía X días antes del vencimiento
- **Cobro vencido** — se envía cuando un cobro llega a su fecha límite sin pagarse
- **Saldo pendiente** — recordatorio de abono parcial
- **Inasistencia** — cuando un alumno falta a clase
- **Inasistencias consecutivas** — alerta Centinela de 2 o más faltas seguidas
- **Cumpleaños** — saludo automático el día del cumpleaños del alumno
- **Bienvenida** — mensaje al inscribirse un alumno nuevo

## Pasos para configurar una plantilla

**1. Selecciona la plantilla que quieres editar**

Haz clic en el nombre del mensaje. Se abre el editor de plantilla.

**2. Escribe el mensaje**

Usa el texto libre y las variables disponibles:

| Variable | Se reemplaza por |
|----------|-----------------|
| `{{nombre_alumno}}` | Nombre del alumno |
| `{{nombre_padre}}` | Nombre del padre o tutor |
| `{{monto}}` | Monto del cobro |
| `{{fecha_vencimiento}}` | Fecha límite de pago |
| `{{academia}}` | Nombre de tu academia |

Ejemplo de mensaje de recordatorio:
> Hola {{nombre_padre}}, te recordamos que el cobro de {{nombre_alumno}} por ${{monto}} vence el {{fecha_vencimiento}}. Gracias — {{academia}}.

**3. Define cuándo se envía**

Para recordatorios de pago, elige con cuántos días de anticipación: 3, 5, o 7 días antes del vencimiento.

**4. Activa o desactiva el mensaje**

Usa el interruptor para activar o pausar cada plantilla individualmente. Puedes desactivar, por ejemplo, el mensaje de cumpleaños si prefieres hacerlo manualmente.

**5. Guarda**

Haz clic en **Guardar plantilla**. Los cambios se aplican de inmediato.

## ¿Cuándo se envían los mensajes?

El sistema revisa los eventos cada mañana y envía los mensajes pendientes. Los mensajes de inasistencia se envían dentro de las 2 horas siguientes al registro de la asistencia.

## Consejo

Mantén los mensajes cortos y amigables. Los padres responden mejor a mensajes directos de 2-3 líneas que a textos largos. Incluye siempre el nombre del alumno para que sea personal.
