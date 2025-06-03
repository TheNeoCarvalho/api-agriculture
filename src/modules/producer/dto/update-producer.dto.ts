import { PartialType } from '@nestjs/mapped-types';
import { CreateProducerDto } from './create-producer.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProducerDto extends PartialType(CreateProducerDto) {
    @ApiProperty({ description: 'O nome do produtor' })
    name: string;
}
