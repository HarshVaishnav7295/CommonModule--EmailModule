import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import {ConfigModule,ConfigService} from '@nestjs/config'
import { EmailService } from 'src/services/email.service';
@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath : `.env`
    }),
    MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
          port : 587,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          },
        },
    })
  ],
  controllers: [EmailController],
  providers : [EmailService]
})
export class EmailModule {}
