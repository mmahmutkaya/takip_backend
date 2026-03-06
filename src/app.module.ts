import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { MembersModule } from './members/members.module';
import { CasesModule } from './cases/cases.module';
import { CaseUpdatesModule } from './case-updates/case-updates.module';
import { MeetingsModule } from './meetings/meetings.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProjectsModule,
    MembersModule,
    CasesModule,
    CaseUpdatesModule,
    MeetingsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
