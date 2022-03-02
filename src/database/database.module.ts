import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

const DB_FEATURES: ModelDefinition[] = [
  { name: User.name, schema: UserSchema },
];

@Module({
  imports: [
    MongooseModule.forFeature(DB_FEATURES),
  ],
  exports: [
    MongooseModule.forFeature(DB_FEATURES),
  ],
})
export class DatabaseModule {}
