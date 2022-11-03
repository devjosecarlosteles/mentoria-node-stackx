import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from '../../test/mock/mongooseTestMock';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should created a one user', async () => {
    const create = await service.create({
      email: 'test@email.com',
      name: 'Name Teste',
      password: '123',
    });

    expect(create).toHaveProperty('_id');
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
