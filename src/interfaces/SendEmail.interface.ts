import { ApiProperty } from "@nestjs/swagger"
export class ISendEmail{
    @ApiProperty({example:"true"})
    success : boolean
    @ApiProperty({example:"Otp sent on : example@gmail.com"})
    message : string
}