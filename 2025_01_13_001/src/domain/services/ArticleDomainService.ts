import { IArticleRepository } from "../repositories/IArticleRepository";
import { IUserRepository } from "../repositories/IUserRepository";
import { Article } from "../models/article/Article";
import { User } from "../models/user/User";

export class ArticleDomainService {
  constructor(
    private readonly articleRepository: IArticleRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async createArticleWithUser(article: Article, user: User): Promise<Article> {
    await this.userRepository.save(user);
    return await this.articleRepository.save(article);
  }
}
