import { Test, TestingModule } from '@nestjs/testing';
import { AccounttypeService } from './accounttype.service';

describe('AccounttypeService', () => {
  let service: AccounttypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccounttypeService],
    }).compile();

    service = module.get<AccounttypeService>(AccounttypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
