import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Publisher, PublisherSchema } from './schemas/publisher.schema';
import { Game, GameSchema } from './schemas/game.schema';
import { AuthMiddleware } from './auth.middleware';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://mongodb/games'),
		MongooseModule.forFeature([
			{ name: Game.name, schema: GameSchema },
			{ name: Publisher.name, schema: PublisherSchema },
		]),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes({
			path: '*',
			method: RequestMethod.ALL,
		});
	}
}
