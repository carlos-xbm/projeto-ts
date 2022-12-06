import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { handleError } from '../utils/handle-error.util';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService) {}

    create(createOrderDto: CreateOrderDto) {
        const data: Prisma.OrderCreateInput = {
            user: {
                connect: {
                    id: createOrderDto.userId,
                },
            },
            table: {
                connect: {
                    number: createOrderDto.tableNumber,
                },
            },
            products: {
                createMany: {
                    data: createOrderDto.products.map((createOrderProductDto) => ({
                        productId: createOrderProductDto.productId,
                        quantity: createOrderProductDto.quantity,
                        description: createOrderProductDto.description,
                    })),
                },
            },
        };

        return this.prisma.order
            .create({
                data,
                select: {
                    id: true,
                    table: {
                        select: {
                            number: true,
                        },
                    },
                    user: {
                        select: {
                            name: true,
                        },
                    },
                    products: {
                        select: {
                            quantity: true,
                            description: true,
                            products: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            })
            .catch(handleError);
    }

    findAll() {
        return this.prisma.order.findMany({
            select: {
                id: true,
                table: {
                    select: {
                        number: true,
                    },
                },
                user: {
                    select: {
                        name: true,
                    },
                },
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
        });
    }

    findOne(id: string) {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
                table: {
                    select: {
                        number: true,
                    },
                },
                products: {
                    select: {
                        products: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                image: true,
                                description: true,
                            },
                        },
                    },
                },
            },
        });
    }
}
