const ERRORS = [
    // 🧾 Errores de Validación y Usuario
    { code: "USR001", type: "user", status: 400, message: "Faltan campos obligatorios para el registro" },
    { code: "USR002", type: "user", status: 409, message: "El correo ya está registrado" },
    { code: "USR003", type: "user", status: 404, message: "Usuario no encontrado" },
    { code: "USR004", type: "auth", status: 401, message: "Credenciales inválidas" },
    { code: "USR005", type: "auth", status: 403, message: "Acceso denegado" },
  
    // 🔐 JWT / Autenticación
    { code: "AUTH001", type: "auth", status: 401, message: "Token inválido o expirado" },
    { code: "AUTH002", type: "auth", status: 403, message: "No autorizado para realizar esta acción" },
  
    // 🔧 Servicios
    { code: "SRV001", type: "service", status: 404, message: "Servicio no encontrado" },
    { code: "SRV002", type: "service", status: 400, message: "No se puede crear el servicio. Datos incompletos" },
    { code: "SRV003", type: "service", status: 409, message: "Ya existe un servicio similar en esta categoría" },
  
    // 💬 Chat
    { code: "CHAT001", type: "chat", status: 500, message: "Error al conectar con el chat GPT" },
    { code: "CHAT002", type: "chat", status: 404, message: "Conversación no encontrada" },
  
    // 💸 Pagos
    { code: "PAY001", type: "payment", status: 400, message: "Error al procesar el pago" },
    { code: "PAY002", type: "payment", status: 402, message: "Pago requerido" },
    { code: "PAY003", type: "payment", status: 409, message: "Ya se ha procesado este pago anteriormente" },
  
    // 🗃️ Administración
    { code: "ADM001", type: "admin", status: 403, message: "Solo los administradores pueden acceder a esta ruta" },
  
    // 🛠️ Errores de Base de Datos (PostgreSQL comunes)
    { code: "23502", type: "db", status: 400, message: "Campo obligatorio no puede estar vacío" },
    { code: "23505", type: "db", status: 409, message: "Valor duplicado en la base de datos" },
    { code: "22P02", type: "db", status: 400, message: "Tipo de dato incorrecto" },
    { code: "23503", type: "db", status: 400, message: "Violación de clave foránea" },
  
    // ⚠️ Otros
    { code: "404", type: "not_found", status: 404, message: "Recurso no encontrado" },
    { code: "500", type: "server", status: 500, message: "Error interno del servidor" }
  ];
  
  export default ERRORS;
  