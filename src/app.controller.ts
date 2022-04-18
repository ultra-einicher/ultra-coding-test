import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Param,
	Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateGameDto, UpdateGameDto } from './dtos/game.dtos';
import { Game } from './schemas/game.schema';
import { ObjectId } from 'mongodb';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Post()
	createGame(@Body() createGameDto: CreateGameDto): Promise<Game> {
		return this.appService.create(createGameDto);
	}

	@Get()
	getGames(): Promise<Game[]> {
		return this.appService.getMany();
	}

	@Get('cleanup')
	cleanup(): Promise<object> {
		return this.appService.removeOrDiscountOlderGames();
	}

	@Get(':id')
	getGame(@Param('id') id: string): Promise<Game> {
		return this.appService.getOne(new ObjectId(id));
	}

	@Get('get-publisher/:name')
	getPublisherIdByGameName(@Param('name') name: string): Promise<string> {
		return this.appService.getPublisherIdByGameName(name);
	}

	@Put()
	updateGame(@Body() updateGameDto: UpdateGameDto): Promise<Game> {
		return this.appService.update(updateGameDto);
	}

	@Delete(':id')
	deleteGame(@Param('id') id: number): object {
		return this.appService.delete(new ObjectId(id));
	}
}
