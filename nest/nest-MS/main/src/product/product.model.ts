import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop()
  id: number;
  @Prop()
  title: string;
  @Prop()
  image: string;
  @Prop()
  likes: string;
}

export const productSchema = SchemaFactory.createForClass(Product);
