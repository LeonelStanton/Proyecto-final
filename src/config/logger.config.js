import winston from 'winston';

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
      },
      colors: {
        fatal: "red",
        error: "magenta",
        warning: "yellow",
        info: "green",
        http: "blue",
        debug: "cyan"
      },
    };

export const loggerProd = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({ //aca me va a guardar en archivo estos otros logs
        level: "error", 
        filename: "errors.log",
        format: winston.format.combine(
            winston.format.timestamp(),  //aca me pone fecha y hora
            winston.format.prettyPrint() //y aca cambia la estructura el mensaje del archivo
        )
    })
    // new winston.transports.File({ filename: './error.log', level: 'warn' }),
  ],
});
export const loggerDev = winston.createLogger({
levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevelsOptions.colors }),
          winston.format.simple(),
        ),
      }),
     
  ],
});

