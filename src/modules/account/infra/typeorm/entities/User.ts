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

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
