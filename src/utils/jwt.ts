import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET ?? 'defaultSecretKey';

export const generateToken = (payload: object, expiresIn: string = '1h') => {
    return jwt.sign(payload, secretKey, { expiresIn: expiresIn as jwt.SignOptions['expiresIn'] });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        console.error('Token verification error:', error);
        throw new Error('Invalid or expired token');
    }
};