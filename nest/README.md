# TypeORM



Nest에서 TypeORM을 연결해서 사용을 시도하였었다.

하지만 npm script에 자동으로 생성되는 npm run start:dev로 실행을 하자 아래와 같은 에러가 발생되었다.

```shell
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

^^^^^^
```

`typeorm syntaxerror: cannot use import statement outside a module`

기본적으로 typescript가 정상적으로 컨버트가 안되는것이 원인으로 생각이 되었고, 해법을 찾아야 했다.

먼저, 위의 에러로 검색을 해보니 똑같은 증상을 가지고 있는 stackoverflow의 글을 찾을수 있었다.

https://stackoverflow.com/questions/59435293/typeorm-entity-in-nestjs-cannot-use-import-statement-outside-a-module

위의 링크에서 소개하고 있는 가장 추천이 높은 해법은 아래와 같다

> My assumption is that you have a `TypeormModule` configuration with an `entities` property that looks like this:
>
> ```
> entities: ['src/**/*.entity.{ts,js}']
> ```
>
> or like
>
> ```
> entities: ['../**/*.entity.{ts,js}']
> ```
>
> The error you are getting is because you are attempting to import a `ts` file in a `js` context. So long as you aren't using webpack you can use this instead so that you get the correct files
>
> ```
> entities: [join(__dirname, '**', '*.entity.{ts,js}')]
> ```

하지만, 위의 3가지 방법 모두 시도해보았지만 실패하였다.

하지만, 그러던와중 두번째 답변에서 눈에 띄는것이 있었다

```
typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js" 
```

위에서 tsconfig-paths/register 라는 모듈을 발견을 하게 되었고, 참고하고 있는 example소스에서도 사용하고 

있다는것을 할게 되었다.

https://www.npmjs.com/package/tsconfig-paths

따라서  nodemon과 함께 사용하기로 했다.

```json
{
  "watch": ["src"],
  "ext": "ts",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "ts-node -r tsconfig-paths/register src/main.ts"
}
```

위와 같이 실행 코드를 적용하고, script에는 `"start:dev": "nodemon"`으로 바꿔 놓았다.



위와 같이 적용하니 정상적으로 import되어서 만들어 놓은 entity에 따라 DB가 구성되었다!



----

# Nest-MS

[참고 유튜브 강의 링크](https://www.youtube.com/watch?v=IsubcKdZPyE&list=PLYnmjTxyfjZrV-N2Qcg4HrDIOvgT81h6G&index=2&t=136s)

`nest new admin -g` 를 하게되면 -g 옵션 때문에 git repository가 생성이 안된다.



## Product 생성

`nest g mo product` 과 `nest g co product` 명령어로 product module과 controller를생성해주자

이후,

```javascript
@Module({
  controllers: [ProductController],
})
```

위와 같이 module에 controller를 import해주고,

app.module에 ProductModule을 다음과 같이 import 해주자

```javascript
@Module({
  imports: [ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
```

그리고 테스트를 위해서 Product controller에 간단한 Get api를 만들어서 확인을 해보면 잘 접속이 된다는걸 알수있다

```javascript
import { Controller, Get } from '@nestjs/common';

@Controller('product')
export class ProductController {
  @Get()
  all() {
    return 'hello';
  }
}
```

`localhost:3000/product` 를 브라우저에 입력하면 확인할수있다.



## TypeORM

```
mysql.server start
mysql -uroot -p   
```

위의 명령어로 설치한 mysql을 local에서 실행시킨다음 로그인할수있다.

`$ npm install --save @nestjs/typeorm typeorm mysql2` cli를 통해서

Typeorm을 먼저 설치하여주자.

```javascript

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '****',
      database: '****',
      autoLoadEntities: true, //It's only for devleopment
      synchronize: true,
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

위와 같이 TypeORM모듈을 app.module에 import해준다.

자세한 내용은 [Nest.js 공식문서를 참고하자](https://docs.nestjs.com/techniques/database)

주의할점이 있는데 `autoLoadEntities: true` 옵션이 true면, entity에 따라서 DB구조가 자동으로 변경이 되니 반드시 **Development 환경에서만 사용하도록하자**

이제 Mysql과 연결이 되었다면 이제, Entity를 만들어 보자

```javascript
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  image: string;
  @Column({ default: 0 })
  likes: number;
}

```

> product.entity.ts

위에서 `@Entity()` 데코레이터를 이용하여 Product 테이블을 만들어줬다.

`  @PrimaryGeneratedColumn()` 는 PK 컴럼 이라는 뜻이고,

`@Column({ default: 0 })` 이와같이 컴럼의 default값도 지정해 줄수 있다.

그리고 만들어진 entity를 product module에 import 해주도록 하자

```javascript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

```

> product.module.ts

`TypeOrmModule.forFeature([Product])` 위와 같은 명령어로 import해서 entity를 import하였고, 이제 서버를 실행시키게 되면 테이블이 mysql내에 생성이 되는것을 알수있다

이제, `nest g s product` 를 이용해서 service를 생성하도록 하자

## CRUD

```javascript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async create(data): Promise<Product> {
    return this.productRepository.save(data);
  }
}
```

위와 같이 product를 가져오는 `all(), create(data)` 를 만들고,

typeorm을 이용해서 db에 붙어서 사용하자

```javascript
import { Body, Post } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  all() {
    return this.productService.all();
  }
  @Post()
  creat(@Body('title') title: string, @Body('image') image: string) {
    return this.productService.create({ title, image });
  }
}
```

위에서 만들어 놓은 service를 controller에 사용한다.

나머지 CRUD를 구현하자면 아래와 같다

```javascript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async create(data): Promise<Product> {
    return this.productRepository.save(data);
  }

  async get(id: string): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  async update(id, data): Promise<any> {
    return this.productRepository.update(id, data);
  }
  async delete(id): Promise<any> {
    return this.productRepository.delete(id);
  }
}

```

**Product.controller.ts**

```javascript
import { Body, Delete, Param, Post } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async all() {
    return this.productService.all();
  }
  @Post()
  async create(@Body('title') title: string, @Body('image') image: string) {
    return this.productService.create({ title, image });
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.productService.get(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('image') image: string,
  ) {
    return this.productService.update(id, { title, image });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}

```

**Product.service.ts**

```javascript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  //api/product ...
  app.enableCors({
    origin: 'http://localhost:4200',
  });
  await app.listen(8000);
}
```

**app.module.ts**

에서 `setGlobalPrefix`로 URL에 고정 문자를 추가해 주고

`app.enableCors({
    origin: 'http://localhost:4200',
  });` 옵션을 써서 cors설정을 열어 놓자



### Main 생성

`nest new main -g` 명령어로 app을 만든다.

`nest g co product`, `nest g mo product`, `nest g s product`

로 Product에 대한 요소를 만들자.



### MongoDB 추가

[Nest mongodb document Link](https://docs.nestjs.kr/techniques/mongodb)

` npm install --save @nestjs/mongoose mongoose`



```javascript
@Module({
  imports: [
  MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest_main', {
      autoCreate: true,
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
```

**app.module.ts**



```javascript
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop()
  id: number;
  @Prop()
  title: string;
  @Prop()
  image: string;
  @Prop()
  likes: string;
}
```

























