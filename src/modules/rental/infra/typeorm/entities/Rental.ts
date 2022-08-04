import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "@modules/account/infra/typeorm/entities/User";
import { Car } from "@modules/car/infra/typeorm/entities/Car";

@Entity("rental")
class Rental {
  @PrimaryColumn()
  id!: string;

  @Column({ name: "car_id" })
  carId!: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: "car_id" })
  car?: Car;

  @Column({ name: "user_id" })
  userId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user?: User;

  @Column({ name: "start_date", default: () => "now()" })
  startDate!: Date;

  @Column({ name: "end_date", nullable: true })
  endDate?: Date;

  @Column({ name: "expected_return_date" })
  expectedReturnDate!: Date;

  @Column({ nullable: true })
  total?: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}

export { Rental };
