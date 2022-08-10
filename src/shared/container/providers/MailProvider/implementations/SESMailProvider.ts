import { SES } from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IMailProvider } from "../IMailProvider";

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
      }),
    });
  }

  async sendMail(to: string, subject: string, variables: any, path: string) {
    const templateFile = fs.readFileSync(path).toString("utf-8");

    const handlebarsTemplate = handlebars.compile(templateFile);

    const htmlTemplate = handlebarsTemplate(variables);

    await this.client.sendMail({
      to,
      from: "Rentx <verified@email.com>",
      subject,
      text: htmlTemplate,
    });
  }
}

export { SESMailProvider };
