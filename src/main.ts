import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './db/db-connection';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
        .listen(3000)
        .then(() => console.log('server connected to port 3000'))
        .catch((err) => console.log('error occured in server connection'));

  // AppDataSource.initialize()
  //   .then(() => {
  //     console.log('db connection ok');
  //     app
  //       .listen(3000)
  //       .then(() => console.log('server connected to port 3000'))
  //       .catch((err) => console.log('error occured in server connection'));
  //   })
  //   .catch((error) => console.log(error));
}
bootstrap();
