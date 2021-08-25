
interface ErrorInterface {
  code: string;
  message: string;
}

export const errorCodes = {
  nombre: {
    typeError: {
      code: "name/not-string",
      message: "El nombre debe ser de tipo string.",
    },
    min: {
      code: "name/too-short",
      message: "El nombre debe contener al menos 4 caracteres.",
    },
    max: {
      code: "name/too-long",
      message: "El nombre debe contener menos de 255 caracteres.",
    },
    required: {
      code: "name/required",
      message: "El nombre es requerido.",
    },
  },
  email: {
    typeError: {
      code: "email/not-string",
      message: "El email debe ser de tipo string.",
    },
    email: {
      code: "email/invalid",
      message: "El email es invalido",
    },
    required: {
      code: "email/required",
      message: "El email es requerido.",
    },
  },
  password: {
    typeError: {
      code: "password/not-string",
      message: "La contraseña debe ser de tipo string.",
    },
    min: {
      code: "password/too-short",
      message: "La contraseña debe contener al menos 6 caracteres.",
    },
    max: {
      code: "password/too-long",
      message: "La contraseña debe contener menos de 18 caracteres.",
    },
    required: {
      code: "password/required",
      message: "La contraseña es requerida.",
    },
  },
};

export const getErrors = (errorCode: string): ErrorInterface => {
  let errorObject: ErrorInterface;
  switch (errorCode) {
    case errorCodes.nombre.typeError.code: {
      errorObject = {
        code: errorCodes.nombre.typeError.code,
        message: errorCodes.nombre.typeError.message,
      };
      break;
    }
    case errorCodes.nombre.min.code: {
      errorObject = {
        code: errorCodes.nombre.min.code,
        message: errorCodes.nombre.min.message,
      };
      break;
    }
    case errorCodes.nombre.max.code: {
      errorObject = {
        code: errorCodes.nombre.max.code,
        message: errorCodes.nombre.max.message,
      };
      break;
    }
    case errorCodes.nombre.required.code: {
      errorObject = {
        code: errorCodes.nombre.required.code,
        message: errorCodes.nombre.required.message,
      };
      break;
    }
    case errorCodes.email.typeError.code: {
      errorObject = {
        code: errorCodes.email.typeError.code,
        message: errorCodes.email.typeError.message,
      };
      break;
    }
    case errorCodes.email.email.code: {
      errorObject = {
        code: errorCodes.email.email.code,
        message: errorCodes.email.email.message,
      };
      break;
    }
    case errorCodes.email.required.code: {
      errorObject = {
        code: errorCodes.email.required.code,
        message: errorCodes.email.required.message,
      };
      break;
    }
    case errorCodes.password.typeError.code: {
      errorObject = {
        code: errorCodes.password.typeError.code,
        message: errorCodes.password.typeError.message,
      };
      break;
    }
    case errorCodes.password.min.code: {
      errorObject = {
        code: errorCodes.password.min.code,
        message: errorCodes.password.min.message,
      };
      break;
    }
    case errorCodes.password.max.code: {
      errorObject = {
        code: errorCodes.password.max.code,
        message: errorCodes.password.max.message,
      };
      break;
    }
    case errorCodes.password.required.code: {
      errorObject = {
        code: errorCodes.password.required.code,
        message: errorCodes.password.required.message,
      };
      break;
    }
    default: {
      errorObject = {
        code: "error/unknown",
        message: "Ha ocurrido un error desconocido.",
      };
    }
  }
  return errorObject
}