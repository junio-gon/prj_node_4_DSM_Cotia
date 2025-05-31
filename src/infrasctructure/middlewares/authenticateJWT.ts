import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@utils/jwt';

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers?.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // Attach decoded token to request object
        next();
    } catch (error) {
        console.error('JWT Middleware Error:', error);
        return res.status(403).json({ error: 'Forbidden' });
    }
};