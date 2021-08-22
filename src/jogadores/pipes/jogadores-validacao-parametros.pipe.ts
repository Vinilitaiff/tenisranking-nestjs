import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class JogadoresValidacaoParametrosPipes implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(
        `O valor do ${metadata.data} deve ser informado`,
      );
    }

    return value;
  }
}
