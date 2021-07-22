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











