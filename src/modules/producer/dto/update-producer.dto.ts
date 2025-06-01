import { PartialType } from '@nestjs/mapped-types';
import { CreateProducerDto } from './create-producer.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProducerDto extends PartialType(CreateProducerDto) {
    @ApiProperty({ description: 'The name of the producer' })
    name: string;
}
