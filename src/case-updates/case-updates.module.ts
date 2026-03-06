import { Module } from '@nestjs/common';
import { CaseUpdatesService } from './case-updates.service';
import { CaseUpdatesController } from './case-updates.controller';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  controllers: [CaseUpdatesController],
  providers: [CaseUpdatesService],
})
export class CaseUpdatesModule {}
