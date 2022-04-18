import {
	IsDefined,
	IsString,
	IsNotEmpty,
	IsNumber,
	IsDateString,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateGameDto {
	_id: mongoose.Schema.Types.ObjectId;

	@IsDefined()
	@IsNotEmpty()
	@IsString()
	title: string;

	@IsDefined()
	@IsNotEmpty()
	@IsNumber()
	price: number;

	@IsDefined()
	@IsNotEmpty()
	@IsString()
	publisher: any;

	@IsDefined()
	@IsString({ each: true })
	tags: string[];

	@IsDefined()
	@IsNotEmpty()
	@IsDateString()
	releaseDate: string;
}

export class UpdateGameDto extends CreateGameDto {
	@IsDefined()
	@IsNotEmpty()
	@IsString()
	id: string;
}
