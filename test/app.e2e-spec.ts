import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/registration (POST)', () => {
    return request(app.getHttpServer())
      .post('/registration')
      .set('Accept', "multipart/form-data")
      .field('username', 'kristian ruben')
      .expect({
        'message': 'register done',
      });
  });

  // it('/registration (POST) duplicate error', () => {
  //   return request(app.getHttpServer())
  //     .post('/registration')
  //     .set('Accept', "multipart/form-data")
  //     .field('username', 'kristian ruben')
  //     .expect({
  //       "statusCode": 409,
  //       "message": "Username already in use",
  //       "error": "Conflict"
  //     });
  // });
});
