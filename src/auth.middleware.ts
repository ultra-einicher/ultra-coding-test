import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthMiddleware {
	use(req, res, next) {
		if (
			typeof req.headers.token == 'undefined' ||
			req.headers.token !=
				'eqIu4PrX8FkxflTLLZc04Box3L6alNYKf4aITNHX9xEs6318UdSbCRQd68KDxszS'
		) {
			throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
		}
		next();
	}
}
