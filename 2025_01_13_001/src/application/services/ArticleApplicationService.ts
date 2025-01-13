import { Article } from "../../domain/models/article/Article";
import { IArticleRepository } from "../../domain/repositories/IArticleRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { CreateArticleCommand } from "../commands/CreateArticleCommand";
import { NotFoundError } from "../errors/NotFoundError";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";

export class ArticleApplicationService {
  constructor(
    private readonly articleRepository: IArticleRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async createArticle(command: CreateArticleCommand): Promise<Article> {
    const user = await this.userRepository.findById(command.userId);
    if (!user) {
      throw new NotFoundError("User", command.userId);
    }

    const article = new Article(null, command.title, command.content, command.userId);
    return await this.articleRepository.save(article);
  }

  async getArticle(id: number): Promise<Article | null> {
    return await this.articleRepository.findById(id);
  }

  async getUserArticles(userId: number): Promise<Article[]> {
    return await this.articleRepository.findByUserId(userId);
  }

  async deleteArticle(id: number, userId: number): Promise<void> {
    const article = await this.articleRepository.findById(id);
    if (!article) {
      throw new NotFoundError("Article", id);
    }
    if (article.getUserId() !== userId) {
      throw new NotAuthorizedError("User is not authorized to delete this article");
    }

    await this.articleRepository.delete(id);
  }
}
