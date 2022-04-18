import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Publisher } from './publisher.schema';

export type GameDocument = Game & Document;

@Schema()
export class Game {
	_id?: Types.ObjectId;

	@Prop()
	title: string;

	@Prop()
	price: number;

	@Prop({ type: Types.ObjectId, ref: 'Publisher' })
	publisher: Publisher;

	@Prop([String])
	tags: string[];

	@Prop()
	releaseDate: Date;
}

export const GameSchema = SchemaFactory.createForClass(Game);
