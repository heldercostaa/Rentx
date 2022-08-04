import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { CarImage } from "./CarImage";
import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("car")
class Car {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({ name: "daily_rate" })
  dailyRate!: number;

  @Column({ default: true, type: "boolean" })
  available = true;

  @Column({ name: "license_plate" })
  licensePlate!: string;

  @Column({ name: "fine_amount" })
  fineAmount!: number;

  @Column()
  brand!: string;

  @Column({ name: "category_id" })
  categoryId!: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category?: Category;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "car_specification",
    joinColumn: { name: "car_id" },
    inverseJoinColumn: { name: "specification_id" },
  })
  specifications?: Specification[];

  @OneToMany(() => CarImage, (carImage) => carImage.car)
  carImages?: CarImage[];

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Car };
