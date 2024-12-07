import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DatabaseService } from 'src/database/database.service';
import { GetCategoriesList } from './dto/get-categories-list.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class CategoriesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const categoryExists = await this.databaseService.categories.findMany({
      where: {
        userId: createCategoryDto.userId,
        name: createCategoryDto.name,
      },
    });
    if (categoryExists?.length > 0) {
      throw new ConflictException('Category already exists with the same name');
    }
    return await this.databaseService.categories.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.databaseService.categories.update({
        where: {
          id: id,
        },
        data: updateCategoryDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        console.error('Error: No record found to update.');
        throw new NotFoundException('No category found to update');
      } else {
        console.error('An unexpected error occurred:', error);
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  async remove(id: number) {
    const removedCategory = await this.databaseService.categories.update({
      where: {
        id,
      },
      data: {
        deletedAt: dayjs().toDate(),
      },
    });
    if (!removedCategory)
      throw new NotFoundException('Category not found for this ID');
    return removedCategory;
  }

  //service for category listing
  async getCategoriesList(categoryList: GetCategoriesList) {
    return await this.databaseService.categories.findMany({
      where: {
        userId: categoryList?.userId,
        isDefault: false,
        ...(categoryList?.search && {
          name: {
            contains: categoryList.search,
            mode: 'insensitive',
          },
        }),
      },
    });
  }

  //Service for fetching default and user categories
  async getCategoriesForTransaction(userId: number) {
    return await this.databaseService.categories.findMany({
      where: {
        deletedAt: null,
        OR: [
          {
            userId,
          },
          {
            userId: null,
          },
        ],
      },
    });
  }

  async undoCategoryDelete(id: number) {
    return await this.databaseService.categories.update({
      where: {
        id,
      },
      data: {
        deletedAt: null,
      },
    });
  }
}
