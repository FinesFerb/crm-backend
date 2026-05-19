import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DealService } from './deal.service';
import { Prisma } from '@/generated/prisma/client';
import type { CreateDealDto } from './dto/create-deal.dto';

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
    return this.dealService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dealService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDealDto: Prisma.DealUpdateInput,
  ) {
    return this.dealService.update({
      where: { id: Number(id) },
      data: updateDealDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dealService.remove({ id: Number(id) });
  }
}
