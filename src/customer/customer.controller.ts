import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Prisma } from 'src/generated/prisma/client';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: Prisma.CustomerCreateInput) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: Prisma.CustomerCreateInput,
  ) {
    return this.customerService.update({
      where: { id: +id },
      data: updateCustomerDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove({ id: +id });
  }
}
