import { ApiProperty } from '@nestjs/swagger';

export class PageDto<T> {
  @ApiProperty({ isArray: true })
  readonly results: T[];

  @ApiProperty()
  totalCount: number;

  @ApiProperty()
  totalPages: number;

  constructor(results: T[], totalCount: number, totalPages: number) {
    this.results = results;
    this.totalCount = totalCount;
    this.totalPages = totalPages;
  }
}
