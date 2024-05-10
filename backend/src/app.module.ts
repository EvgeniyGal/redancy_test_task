import { Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskListsModule } from './task-lists/task-lists.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.entity';
import { TaskList } from './task-lists/task-list.entity';
import { Task } from './tasks/task.entity';
import { APP_PIPE } from '@nestjs/core';
import { IsUniqueConstraint } from './shared/validation/is-unique';
@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, TaskList, Task],
      synchronize: true,
    }),
    UsersModule,
    TasksModule,
    TaskListsModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    IsUniqueConstraint,
  ],
})
export class AppModule {}
