export const MAX_TITLE_LENGTH = 100;

export class Article {
  constructor(
    private readonly id: number | null,
    private title: string,
    private content: string,
    private readonly userId: number,
    private readonly createdAt: Date = new Date(),
  ) {
    this.validateTitle(title);
    this.validateContent(content);
  }

  private validateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error("Title cannot be empty");
    }
    if (title.length > MAX_TITLE_LENGTH) {
      throw new Error(`Title cannot be longer than ${MAX_TITLE_LENGTH} characters`);
    }
  }

  private validateContent(content: string): void {
    if (!content || content.trim().length === 0) {
      throw new Error("Content cannot be empty");
    }
  }

  getId(): number | null {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getUserId(): number {
    return this.userId;
  }

  getContent(): string {
    return this.content;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  updateTitle(newTitle: string): void {
    this.validateTitle(newTitle);
    this.title = newTitle;
  }

  updateContent(newContent: string): void {
    this.validateContent(newContent);
    this.content = newContent;
  }
}
