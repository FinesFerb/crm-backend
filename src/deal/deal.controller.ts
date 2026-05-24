import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { DealService } from './deal.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';

@Controller('deal')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Post()
  create(@Body() createDealDto: CreateDealDto) {
    const { name, price, status, customer } = createDealDto;
    return this.dealService.create({
      name,
      price,
      status,
      customer: {
        connectOrCreate: {
          where: { email: customer.email },
          create: { name: customer.name, email: customer.email },
        },
      },
    });
  }

  @Get()
  findAll() {
    return this.dealService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDealDto: UpdateDealDto,
  ) {
    return this.dealService.update({
      where: { id },
      data: updateDealDto,
    });
  }
}
