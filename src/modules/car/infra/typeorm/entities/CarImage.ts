import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("car_image")
class CarImage {
  @PrimaryColumn()
  id!: string;

  @Column({ name: "car_id" })
  carId!: string;

  @Column({ name: "image_name" })
  imageName!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}

export { CarImage };
