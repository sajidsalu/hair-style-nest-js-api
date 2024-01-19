// cors.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Set the allowed headers in the Access-Control-Allow-Headers header
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );

    // Add other CORS headers as needed (e.g., Access-Control-Allow-Methods)
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    );

    // Allow credentials (if needed)
    res.header('Access-Control-Allow-Credentials', 'true');

    // Continue with the request
    next();
  }
}
