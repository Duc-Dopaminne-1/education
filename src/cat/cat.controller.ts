import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
  UsePipes
} from "@nestjs/common";
import { CatsService } from './cat.service';
import { CreateCatDto } from './create-cat.dto';
import { Cat, CatDocument } from "./cat.schema";
import { UpdateCatDto } from './update-cat.dto';
import { CACHE_MANAGER, CacheInterceptor, CacheTTL, Cache } from "@nestjs/cache-manager";

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    const cat = await this.catsService.create(createCatDto);
    await this.cacheService.set(cat.id, cat, { ttl: 120 });
    return cat;
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CatDocument> {
    const cacheData = await this.cacheService.get<CatDocument>(id);
    if (cacheData) {
      return cacheData;
    } else {
      const cat = await this.catsService.findOne(id);
      await this.cacheService.set(id, cat, { ttl: 10 });
      return cat;
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.cacheService.del(id);
    return this.catsService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    await this.catsService.update(id, updateCatDto);
  }
}
