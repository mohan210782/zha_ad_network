import { Test, TestingModule } from '@nestjs/testing';
import { AccounttypeController } from './accounttype.controller';

describe('AccounttypeController', () => {
  let controller: AccounttypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccounttypeController],
    }).compile();

    controller = module.get<AccounttypeController>(AccounttypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
