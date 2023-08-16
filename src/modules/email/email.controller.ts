import { Body, Controller, Post, Req, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { SendEmailDto } from 'src/dtos/SendEmail.dto';
import {Request,Response} from 'express'
import { EmailService } from 'src/services/email.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOkResponse,ApiBody,ApiConsumes } from '@nestjs/swagger';
import { ISendEmail } from 'src/interfaces/SendEmail.interface';

@Controller('api/email')
export class EmailController {
    constructor(private readonly emailService:EmailService){}

    @Post('/sendEmail')
    @ApiOkResponse({
        type:ISendEmail
    })
    async sendEmail(@Req() req:Request,@Res() res:Response,@Body() body:SendEmailDto){
        try{
            if(!body.to || body.to.length==0){
                return res.status(400).json({
                    success:false,
                    error:"Please provide recepients list."
                })
            }else{
                const resp = await this.emailService.sendEmail(body)
                if(resp.success){
                    return res.status(200).json({
                        success:true,
                        message:"Mail sent on : "+body.to + ","+body.cc
                    })
                }else{
                    return res.status(500).json({
                        success:false,
                        error:resp.error
                    })
                }
            }
        }catch(error:any){
            return res.status(500).json({
                success:false,
                error:error.message
            })
        }
    }

    
    @Post('/sendEmailWithAttachment')
    @ApiOkResponse({
        type:ISendEmail
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            to: { type: 'array' },
            cc: { type: 'array' },
            subject: { type: 'string' },
            html: { type: 'string' },
            isBcc: { type: 'boolean' },
            file: {
              type: 'array',
              items:{
                type : "string",
                format : "binary"
              }
            },
          },
        },
      })
    @UseInterceptors(AnyFilesInterceptor())
    async sendEmailWithAttachment(@Req() req:Request,@Res() res:Response,@Body() body:SendEmailDto,@UploadedFiles() files:any){
        try{
            console.log("files->",files)
            if(!body.to || body.to.length==0){
                return res.status(400).json({
                    success:false,
                    error:"Please provide recepients list."
                })
            }else{
                const resp = await this.emailService.sendEmailWithAttachment(body,files)
                if(resp.success){
                    return res.status(200).json({
                        success:true,
                        message:"Mail sent on : "+body.to + ","+body.cc
                    })
                }else{
                    return res.status(500).json({
                        success:false,
                        error:resp.error
                    })
                }
            }
        }catch(error:any){
            return res.status(500).json({
                success:false,
                error:error.message
            })
        }
    }

}
