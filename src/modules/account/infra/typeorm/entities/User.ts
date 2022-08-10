import { Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("user")
class User {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ name: "driver_license" })
  driverLicense!: string;

  @Column({ name: "is_admin", default: false })
  isAdmin!: boolean;

  @Column({ nullable: true })
  avatar?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @Expose({ name: "avatarUrl" })
  avatarUrl(): string {
    switch (process.env.DISK) {
      case "local":
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
      case "s3":
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
