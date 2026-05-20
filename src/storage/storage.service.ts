import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  private readonly s3Client: S3Client;

  constructor(private configService: ConfigService) {
    const accessKeyId = configService.get<string>('R2_ACCESS_KEY_ID');
    const secretAccessKey = configService.get<string>('R2_SECRET_ACCESS_KEY');
    const region = configService.get<string>('R2_REGION');
    const endpoint = configService.get<string>('R2_ENDPOINT');

    if (!accessKeyId || !secretAccessKey) {
      throw new InternalServerErrorException(
        'S3 credentials are not configured',
      );
    }

    this.s3Client = new S3Client({
      region,
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async upload(file: Express.Multer.File, userEmail?: string) {
    // Генерация уникального имени файла
    const fileExtension = path.extname(file.originalname);
    const fileBaseName = path.basename(file.originalname, fileExtension);
    const uniqueId = uuidv4();
    const fileName = `${fileBaseName}-${uniqueId}${fileExtension}`;
    const key = `crm/${fileName}`;
    try {
      // Загрузка в S3/R2
      const command = new PutObjectCommand({
        Bucket: this.configService.get<string>('R2_BUCKET_NAME'),
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        Metadata: {
          originalName: file.originalname,
          uploadedBy: userEmail || 'anonymous',
        },
      });
      await this.s3Client.send(command);
      const url = `${this.configService.get<string>('R2_PUBLIC_URL')}${key}`;
      return url;
    } catch (error) {
      console.error('Ошибка загрузки файла:', error);
      throw new InternalServerErrorException('Не удалось загрузить файл');
    }
  }
}
