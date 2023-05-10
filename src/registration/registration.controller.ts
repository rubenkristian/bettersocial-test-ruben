import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { RegistrationDTO } from './registration.dto';
import { RegistrationService } from './registration.service';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';

@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
  ) {}

  @Post('/')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
        },
        picture: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @UseInterceptors(FileInterceptor('picture', {
    storage: diskStorage({
      destination: './public/upload',
    })
  }))
  public async registerUser(@Body() registrationDto: RegistrationDTO, @UploadedFile() file: Express.Multer.File) {
    let fileUrl = '';
    
    if (file) {
      const filename = uuidv4();
      const extension = file.originalname.split('.').pop();
      const filePath = join(__dirname, '../../..', '/public/upload', `${filename}.${extension}`);
      const writeStream = createWriteStream(filePath);
      await new Promise(resolve =>
        createReadStream(file.path)
          .pipe(writeStream)
          .on('close', resolve)
      );
      fileUrl = `upload/${filename}.${extension}`;
    }
    
    await this.registrationService.addUser(registrationDto.username, fileUrl);
    return {
      'message': 'register done',
    }
  }
}
