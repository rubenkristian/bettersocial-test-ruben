import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class RegistrationDTO {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: "only alphanumeric"
  })
  username: string;
  
  @IsOptional()
  picture: Express.Multer.File;
}
