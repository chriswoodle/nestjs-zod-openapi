import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { patchNestjsSwagger } from '@anatine/zod-nestjs';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('App')
        .setDescription('The API')
        .setVersion('1.0')
        .build();

    patchNestjsSwagger()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    console.log('api on port 3000 at /api: http://localhost:3000/api')
    await app.listen(3000);
}
bootstrap();
