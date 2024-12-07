import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetCategoriesList } from './dto/get-categories-list.dto';
// import { Public } from 'src/auth/SkipAuth';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }

  //get all categories for a user created by user
  @Post('user')
  getCategoriesList(@Body() categoryBody: GetCategoriesList) {
    return this.categoriesService.getCategoriesList(categoryBody);
  }

  //get default categories and the categories created by the user

  @Get('transaction/:userId')
  getCategoriesForTransaction(@Param('userId') userId: string) {
    return this.categoriesService.getCategoriesForTransaction(+userId);
  }

  @Patch('/undoDelete/:id')
  undoCategoryDelete(@Param('id') id: string) {
    return this.categoriesService.undoCategoryDelete(+id);
  }
}
