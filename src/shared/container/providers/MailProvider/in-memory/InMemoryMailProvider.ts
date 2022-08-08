import { IMailProvider } from "../IMailProvider";

class InMemoryMailProvider implements IMailProvider {
  private messages: any[] = [];

  async sendMail(to: string, subject: string, variables: any, path: string) {
    this.messages.push({
      to,
      subject,
      variables,
      path,
    });
  }
}

export { InMemoryMailProvider };
