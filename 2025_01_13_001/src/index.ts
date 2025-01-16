import express from "express";
import { json } from "express";
import { errorHandler } from "./interface/middlewares/errorHandler.js";
import { UserController } from "./interface/controllers/UserController.js";
import { ArticleController } from "./interface/controllers/ArticleController.js";
import { userRouter } from "./interface/routes/userRoutes.js";
import { articleRouter } from "./interface/routes/articleRoutes.js";
import { UserApplicationService } from "./application/services/UserApplicationService.js";
import { ArticleApplicationService } from "./application/services/ArticleApplicationService.js";
import { PrismaUserRepository } from "./infrastructure/repositories/PrismaUserRepository.js";
import { PrismaArticleRepository } from "./infrastructure/repositories/PrismaArticleRepository.js";
import { UserDomainService } from "./domain/services/UserDomainService.js";
import { prisma } from "./infrastructure/prismaClient.js";

async function bootstrap() {
  const app = express();
  app.use(json());

  const userRepository = new PrismaUserRepository();
}
