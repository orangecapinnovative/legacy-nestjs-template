import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const DB_FEATURES = [

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
