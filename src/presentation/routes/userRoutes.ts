import { Router } from "express";
import { UserController } from "@presentation/controllers/UserController";
import { validateDTO } from "@presentation/controllers/middlewares/validateDTO";
import { UserDTO } from "@presentation/dtos/UserDTO";
import { authenticateJWT } from '@infrasctructure/middlewares/authenticateJWT';


const router = Router();
const userController = new UserController();

// router.get("/users", (req, res) => { res.send("User rotes") });

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post("/users",validateDTO(UserDTO), async(req, res, next) => {
    try {
        await userController.createUser(req, res);
    } catch (error) {
        next(error);
    }
} );

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []   # <- Aqui diz ao Swagger que essa rota precisa de autenticação
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *       401:
 *         description: Token ausente ou inválido
 */
router.get("/users", authenticateJWT as any, async(req, res, next) => {
    try {
        await userController.getAllUsers(req, res);
    } catch (error) {
        next(error);
    }
} );

router.get('/users/:email', authenticateJWT as any, async (req, res, next) => {
    try {
        await userController.getUserByEmail(req, res);
    } catch (error) {
        next(error);
    }
} );

export default router;