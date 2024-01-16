import passport from "passport";

export const authMiddleware = (strategy, roles) => (req, res, next) => {
    passport.authenticate(strategy, function (error, payload, info) {
      if (error) {
        return next(error);
      }
  
      if (!payload) {
        return res
          .status(401)
          .json({ message: info.message ? info.message : info.toString() });
      }
      if (roles && !roles.includes(payload.role)) {
        // El usuario no tiene el rol necesario para acceder al recurso
        return res.status(403).json({ message: "Acceso no autorizado." });
      }
      req.user = payload;
  
      next();
    })(req, res, next);
  };