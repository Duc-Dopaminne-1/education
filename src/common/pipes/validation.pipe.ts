import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('ValidationPipe');
    if (typeof value !== 'string') {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
