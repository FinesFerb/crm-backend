import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  text!: string;

  @IsNumber()
  idDeal!: number;
}
