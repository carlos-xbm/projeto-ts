import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';
import { TableService } from './table.service';

@ApiTags('table')
@Controller('table')
export class TableController {
    constructor(private readonly tableService: TableService) {}

    @Get()
    @ApiOperation({
        summary: 'Listar todas as mesas',
    })
    findAll(): Promise<Table[]> {
        return this.tableService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Visualizar mesa',
    })
    findOne(@Param('id') id: string): Promise<Table> {
        return this.tableService.findOne(id);
    }

    @Post()
    @ApiOperation({
        summary: 'Criar mesa',
    })
    create(@Body() dto: CreateTableDto): Promise<Table> {
        return this.tableService.create(dto);
    }

    @Put()
    @ApiOperation({
        summary: 'Editar uma mesa pelo ID',
    })
    @Patch('id')
    update(@Param('id') id: string, @Body() dto: UpdateTableDto): Promise<Table> {
        return this.tableService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Remover uma mesa pelo ID',
    })
    delete(@Param('id') id: string) {
        this.tableService.delete(id);
    }
}
