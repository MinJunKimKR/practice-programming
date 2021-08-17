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

`nest g mo product` 과 `nest g co product` 명령어로 product module과 controller를 생성해주자

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



이제 설치한 mysql을 코드에서 사용하기 위하여 TypeORM을 설치한다.

`$ npm install --save @nestjs/typeorm typeorm mysql2` 

위의 명령어로 cli를 통해서 Typeorm을 먼저 설치하여주자.

> 이때, Mysql이 이미 설치가 되어있다는것을 전제로 한다.



이제 Mysql 사용을 위해서 아래와 같이 방금 설치한 TypeORM모듈을 app.module에 import해준다.

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

TypeORM의 자세한 내용은 [Nest.js 공식문서를 참고하자](https://docs.nestjs.com/techniques/database)



여기서 주의할점이 있는데 `autoLoadEntities: true` 옵션이 true면, entity에 따라서 DB구조가 자동으로 변경이 되니 반드시 **Development 환경에서만 사용하도록하자**



이제 Mysql과 연결이 되었다면 이제, Entity를 아래와 같이 만들어 보자

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



## Mysql CRUD

먼저 방금 cli로 gen 한 `ProductService` 에 필요한 Product를 Inject해주고,

typeORM을 사용하여 `find, save` 등의 function을 구현한다.

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



이제 직접적으로 Database에 접근하는 Service의 구현이 끝났으니,

Routing역할을 하는 controller에 service에서 구현한 비지니스 로직을 붙여주자

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

보면, `this.productService.all();` 혹은 `this.productService.create({ title, image });`

 와 같은 비지니스 로직은 이미 구현한 Service의 function인것을 확인할수 있다.



나머지 CRUD를 구현하는 요령도 똑같다.

항상 DB와 비지니스 로직을 구현하는 Service에 TypeORM을 사용하여서 기능을 구현한뒤에,

Routing을 해주는 Controller에 Service에서 구현한 function을 사용해주면 된다.



**Product.service.ts**

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

**app.module.ts**

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

여기서  `setGlobalPrefix` 을 사용하면  URL에 고정 문자를 추가해 줄수있다.

무슨말이냐면, 위와같이 `api`  라는 글자를 prefix로 사용했기 때문에,

controller의 `/product/:id` 와 같은 경로를 사용하면, 실제 접근하는 경로는 

`/api/product/:id` 가 됩니다.

또한, `app.enableCors` 옵션을 사용해서 추후에 만들 **Main 서비스 혹은 Rabbit MQ** 에서 접근할때 문제가 없도록 해준다.



----



## Main 서비스 생성

이제 CRUD로 Admin 서비스를 만들었으니 이제, 사용자가 접근할 Main 서비스를 만들어서 사용하도록 하자.



`nest new main -g` 명령어로 Main service를 생성한다.



그리고 아래의 3개의 cli 명령어를 사용하여서 필요한 요소를 생성한다.

`nest g co product`, `nest g mo product`, `nest g s product`



그리고 main.ts 파일에 admin과 같이 설정을 해준다

**main.ts**

```javascript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:4200',
  });
  await app.listen(8001);
}

bootstrap();

```





### MongoDB 추가

[Nest mongodb document Link](https://docs.nestjs.kr/techniques/mongodb)



Main Service에서는 Admin에서는 Mysql을 TypeORM으로 쓴것과는 다르게,

MongoBD를 Mongoose로 사용해 보도록한다.



이부분이 MSA(Micro Service Architecture)의 강점이다.



모놀리틱의 경우 보통 1개의 기술 스택을 사용하는데 반해서

마이크로 서비스의 경우 각각의 서비스별로 유리한 스택을 선택하여 활용할수 있다는 강점이 있다.



이제, MongoDB를 사용하기 위하여 mongoose를 설치해보자. 

` npm install --save @nestjs/mongoose mongoose`

> 이때, MongoDB는 사전에 설치되어 있다는것을 전제로 한다.



이제, Mongoose를 사용해서 아래와 같이 mongodb와 connection을 시켜준다.

**app.module.ts**

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

**product.module.ts**

```javascript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { Product, productSchema } from './product.model';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Products', schema: productSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

```



이제, TypeORM과 같이 Schema를 생성해 줄수 있는 Model을 추가해준다.

**product.model.ts**

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



이제 mongoDB를 사용할 service를 만들어 주도록 한다

**product.service.ts**

```javascript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}
}


```

위와 같이 `ProductService`에 mongodb model을 inject 해준다.

`Product.name` 에서 보는것과 같이 'Product' 라고 직접 string으로 입력하는것이 아닌 **Model의 name속성을 사용한다.**



Product.module.ts파일의 `name : 'Products'` 라고 되어있던 소스도 위와 같이 활용해서 변경해준다.

**Product.module.ts**

```javascript
.
.
.
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: productSchema }]),
  ],
  .
  .


```





### Mongoose CRUD

[Model find( ) documentation Link](https://mongoosejs.com/docs/api.html#model_Model.find)

이제 mongoose를 이용해서 비지니스 로직을 service에 구현해봅시다.



**Product.service.ts**

```javascript
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}
  async all() {
    return this.productModel.find().exec();
  }
}

```

`@InjectModel(Product.name)
    private readonly productModel: Model<Product>`

위의 코드를 이용해서 아까 정의해 놓은 mongo model을 inject해서 service에서 사용할수 있도록 한다.



`this.productModel.find().exec();` 의 코드를 사용해서 위에서 inject했던 Product Model을 사용해서 find와 exec를 사용해서 mongoDB의 데이터를 가져올수 있다.



이제 controller에 방금 service에서 만든 function을 적용해보자,

**product.controller.ts**

```javascript
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async all() {
    return this.productService.all();
  }
}
```



이제 실행을해서 `http://localhost:8001/api/product` 에 Get 요청을

날려보면, MongoDB내의 데이터를 얻을수있다.

![실행결과](https://github.com/MinJunKimKR/photo_repo/blob/master/photos/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-08-18%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2012.04.58.png?raw=true)

> 이때 필자는 미리 mongoDB내에 테스트용 데이터를 넣었기에 데이터가 나온다.
>
> 원래라면 [] 라고 나오는것이 정상이다.



----



## MicroService

[NestJS Microservice documentation](https://docs.nestjs.com/microservices/basics)



이제, Rabbit MQ를 사용해서 MicroService를 구현을 할것이다.

따라서 상단의 nestJS MIcroservice 공식문서에서 RabbitMQ 탭으로 들어가서 제공해주는 소스를 이용해서 방금 우리가 만들어 놨던 Main service의 main.ts를 수정해 줘야한다.

**main.ts**

```javascript
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          'URL',
        ],
        queue: 'cats_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  app.listen();
}

bootstrap();

```



### RabbitMQ

이제, RabbitMQ를 사용해볼건데 그 이전에 MQ의 뜻은 Message Queue라는 뜻이다.

이번 예제에서는 마이크로 서비스간 통신을 Queue를 통해서 할것이기에 RabbitMQ가 채택되었다.

좀더 자세한 내용은 좋은 블로그 글을 대신해서 첨부한다.

[RabbitMQ에 대해](https://nesoy.github.io/articles/2019-02/RabbitMQ)



이제, [Cloudamqp](https://www.cloudamqp.com/) 을 사용해서 RabbitMQ를 사용해볼것이다.

회원가입을 한뒤에 cluster를 만들어 주도록 하자.

> 자세한 가입및 생성 절차는 원본 유튜브 강의 영상을 참고해 주기를 바랍니다.



이제 생성된 rabbitMQ의 url을 소스에서 사용해주도록 하자



**main.ts**

```javascript
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqps://???:????@dingo.rmq.cloudamqp.com/??',
        ],
        queue: 'main_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
}
```

위와같이 cloudamqp에서 생성된 URL을 사용해서 Listening할수 있도록 만들어 주었다.

이제, 다른곳에서 Message를 Publish하게되면 방금 만든 코드를 통하여 **rabbitMQ를 거쳐서 Main service로 message가 오게 됩니다.**



이제, Main service에 rabbitMQ를 적용했으니 admin service에도 적용을 시키자



### admin service

아까 main service에서 현재 listening을 하고 있기 때문에, message를 MQ를 통해서 publish할수 있도록 Module에 추가해 줘야한다.



**product.module.ts**

```javascript
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
          'amqps://???:????@dingo.rmq.cloudamqp.com/??',
          ],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

```

 만들어 놓은 queue에 메세지를 보낼수 있도록 module을 등록해 줍니다.



이제, Controller에 기존 service에 message가 잘 전송되는지를 확인하기 위하여 간단한 기능을 추가해 줍니다.



**product.controller.ts**

```javascript
.
.
.
import { ProductService } from './product.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject('PRODUCT_SERVICE') private client: ClientProxy,
  ) {}

  @Get()
  async all() {
    this.client.emit('hello', 'Hello from Rabbit MQ');
    return this.productService.all();
  }

.
.
.

```

`    @Inject('PRODUCT_SERVICE') private client: ClientProxy,
  ) {}` 소스를 사용해서, queue에 메세지 전달이 가능하도록 **PRODUCT_SERVICE** 를 inject합니다.

이때 PRODUCT_SERVICE라는 이름은 product.module.ts에서 name에 입력한 그 이름입니다.

`this.client.emit('hello', 'Hello from Rabbit MQ');`

위와 같은 코드를 추가해서 Get요청을 보내면, Client로 등록되어있는 queue에 'Hello from Rabbit MQ' 라는 메세지를 보내는 코드를 추가했습니다.



이제, **admin service에서** /api/product로 get요청을 보내게 되면 queue를 통해서 아까 만들어 놓은 **main service** 로 메세지가 전달될 것입니다.

그러면 이제, main service로 가서 정말 메세지가 잘 전달 되었는지 console에 출력해보는 코드를 추가하겠습니다.



**product.controller.ts**

```javascript
import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async all() {
    return this.productService.all();
  }
  @EventPattern('hello')
  async hello(data: string) {
    console.log(data);
  }
}

```

`@EventPattern('hello')` 을 통해서 어떤 pattern의 메세지를 받을지 지정할수 있습니다.

위에서, 패턴은 hello로 되어있었음으로 동일하게 지정합니다.

이후 들어온 data를 그대로 출력하는 코드를 추가합니다.



이제 admin과 main양쪽 서버를 run한 다음에

main 에서 정말로 admin에서 보낸 message가 잘 출려되는지 get요청을 보내보겠습니다.



성공했습니다!





















































잊ㅔ
