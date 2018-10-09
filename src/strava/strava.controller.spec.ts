import { Test, TestingModule } from '@nestjs/testing';
import { StravaController } from './strava.controller';

describe('Strava Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [StravaController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: StravaController = module.get<StravaController>(StravaController);
    expect(controller).toBeDefined();
  });
});
