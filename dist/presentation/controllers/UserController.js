"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const CreateUserUseCase_1 = require("@application/useCases/CreateUserUseCase");
const GetAllUsersUseCase_1 = require("@application/useCases/GetAllUsersUseCase");
const UserRepository_1 = require("infrasctructure/repositories/UserRepository");
class UserController {
    constructor() {
        const userRepository = new UserRepository_1.UserRepository();
        this.createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(userRepository);
        this.getAllUsersUsecase = new GetAllUsersUseCase_1.GetAllUsersUseCase(userRepository);
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email } = req.body;
                const user = yield this.createUserUseCase.execute(name, email);
                return res.status(201).json(user);
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.getAllUsersUsecase.execute();
                if (!users) {
                    return res.status(404);
                }
                return res.status(200).json(users);
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.UserController = UserController;
