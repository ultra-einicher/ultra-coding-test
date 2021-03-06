import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type PublisherDocument = Publisher & Document;

@Schema()
export class Publisher {
	_id?: Types.ObjectId;

	@Prop()
	name: string;

	@Prop()
	siret: number;

	@Prop()
	phone: string;
}

export const PublisherSchema = SchemaFactory.createForClass(Publisher);
