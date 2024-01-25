// auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ message: 'Unauthorized - Access token missing or invalid.' });
    }

    const accessToken = authorizationHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(accessToken);
      req['user'] = decoded; // Attach the user information to the request
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: 'Unauthorized - Invalid access token.' });
    }
  }
}
