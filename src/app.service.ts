import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Game, GameDocument } from './schemas/game.schema';
import { Publisher, PublisherDocument } from './schemas/publisher.schema';
import { CreateGameDto, UpdateGameDto } from './dtos/game.dtos';
import { ObjectId } from 'mongodb';

@Injectable()
export class AppService {
	constructor(
		@InjectModel(Game.name) private gameModel: Model<GameDocument>,
		@InjectModel(Publisher.name)
		private publisherModel: Model<PublisherDocument>,
	) {}

	async create(createGameDto: CreateGameDto): Promise<Game> {
		createGameDto.publisher = await this.getPublisherIdByName(
			createGameDto.publisher,
		);
		delete createGameDto._id;
		const game = new this.gameModel(createGameDto);
		return game.save();
	}

	async update(updateGameDto: UpdateGameDto) {
		const game = await this.gameModel.findOne({
			_id: new ObjectId(updateGameDto.id),
		});
		if (game === null) {
			throw new HttpException(
				'Could not find game with id ' + updateGameDto.id,
				HttpStatus.BAD_REQUEST,
			);
		}
		updateGameDto.publisher = await this.getPublisherIdByName(
			updateGameDto.publisher,
		);
		delete updateGameDto.id;
		delete updateGameDto._id;
		game.set(updateGameDto);
		return game.save();
	}

	async delete(id: ObjectId) {
		return this.gameModel.deleteOne({
			_id: new ObjectId(id),
		});
	}

	async getOne(id: ObjectId): Promise<Game> {
		const game = await this.gameModel.findOne({
			_id: id,
		});
		if (game === null) {
			throw new HttpException(
				'Could not find game with id ' + id,
				HttpStatus.BAD_REQUEST,
			);
		}
		return game;
	}

	async getMany(): Promise<Game[]> {
		return this.gameModel.find();
	}

	async getPublisherIdByName(name: string): Promise<ObjectId> {
		let publisher = await this.publisherModel.findOne({
			name: name,
		});
		if (publisher === null) {
			publisher = new this.publisherModel({
				name: name,
			});
			await publisher.save();
		}
		return publisher._id;
	}

	async getPublisherIdByGameName(name: string): Promise<string> {
		const game = await this.gameModel
			.findOne({ name })
			.populate('publisher');
		return game.publisher._id.toString();
	}

	async removeOrDiscountOlderGames() {
		const monthsAgo18 = new Date();
		monthsAgo18.setMonth(monthsAgo18.getMonth() - 18);
		const monthsAgo12 = new Date();
		monthsAgo12.setMonth(monthsAgo12.getMonth() - 12);

		// delete when older that 18 months
		const deleted = await this.gameModel.deleteMany({
			releaseDate: { $lt: new Date(monthsAgo18) },
		});

		// update and subtract discount when older than 12
		// we already have deleted everything older that 18 months
		console.log(
			monthsAgo12,
			monthsAgo12.toISOString(),
			new Date(monthsAgo12),
		);
		const updated = await this.gameModel.updateMany(
			{ releaseDate: { $lt: new Date(monthsAgo12) } },
			{ $mul: { price: 0.8 } },
		);

		return {
			deleted: deleted.deletedCount,
			updated: updated.modifiedCount,
		};
	}
}
