import winston from 'winston';

export const logger = winston.createLogger({
	transports: [
		new winston.transports.Console({
			format: winston.format.simple(),
		}),
		new winston.transports.File({ filename: 'app.logs' }),
	],
});
