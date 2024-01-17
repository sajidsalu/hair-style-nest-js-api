import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PageDto {
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  readonly page: number = 1;

  @ApiProperty()
  readonly limit: number;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
