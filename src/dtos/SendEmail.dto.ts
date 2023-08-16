import { ApiProperty } from "@nestjs/swagger"
import { IsArray,IsBoolean,IsString } from "class-validator"

export class SendEmailDto{

    @IsArray()
    @ApiProperty({example:[
        "abc@gmail.com",
        "bcd@gmail.com"
    ]})
    to : string[]

    @IsBoolean()
    @ApiProperty({example:"false"})
    isBcc:boolean
    
    @IsArray()
    @ApiProperty({example:[
        "abc@gmail.com",
        "bcd@gmail.com"
    ]})
    cc : string[]

    @IsString()
    @ApiProperty({example:"Testing"})
    subject : string

    @IsString()
    @ApiProperty({example:"<h2>Hello,testing</h2>"})
    html : string
}