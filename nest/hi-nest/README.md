



데코레이터는 클래스를 위해서 움직인다.

App module 은 root module과 같음



인증을 담당하는 어플리케이션이 있다면 user모듈인것이다



Controller: URL을 가져오고 함수를 실행함(마치 express의 라우터 처럼)

즉, URL를 매핑하고, 리퀘스트를 받고, Query를 넘기거나 Body등을 넘김

Provider : 



Nest는 콘트롤러를 비지닉스 로직이랑 구분을 짓는다

컨트롤러는 URL을 가져오고 function을 reuturn 부분이다

하지만 서비스에서 실제로 돌아가는 비지니스 로직을 구현한다



App module에서는 모든 모듈을 import할것이다.



```javascript
@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'movies';
  }
  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `one movie id: ${movieId}`;
  }
  @Post()
  create() {
    return 'This will create a movie';
  }
  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `this will delete a movie with the id : ${movieId}`;
  }
  @Patch('/:id')
  path(@Param('id') movieId: string) {
    return `this will patch a movie with the id : ${movieId}`;
  }
}

```



@Param('') : controller에서 :/id 와 같이 parameter를 받아서 funciton에서 사용할때 쓰이는 decorator



@Body(): 바디로 넘어온 값을 사용할때 쓰이는 decorator

```
  path(@Param('id') movieId: string, @Body() updateData) {
```

위와같이 Decorator를 중복으로 사용할수도 있다.

@Param() : 쿼리스트링을 사용할수 있다.



### Single-responsibility principle

하나의 module, class 혹은 function이 하나의 기능은 꼭 책임져야한다.





```javascript
export class Movie {
  id: number;
  title: string;
  year: number;
  genres: string[];
}

```



여기서 interface 나 type이 아닌 class를 사용한 이유는 컴파일을 거치게 되면 어차피 class가 되기 때문에 바로 class로 써서 사용한것이다.



`throw new NotFoundException(`Movie with Id : ${id} not found`);`

nest에는 이미 만들어둔 error exception handler가 존재한다.

```javascript
    this.movies.push({ ...movie, ...updateData }); //2개의 배열을 1개의 배열로 만들어서 push 하는 소스 

```



### DTO

Data Transfer Object(데이터 전송 객체)

타입등을 부여하기 위해 만들어 줘야한다

하지만 DTO를 만든다음 타입으로 사용을 해준다고 해서  곧바로 validation까지 해주지는 않는다.

그렇다면 DTO는 왜 사용을 하는것일까?

정답은 바로 프로그래머로서 코드를 더 간결하게 만들수 있게 해주기 때문이다.

또한. NestJS가 Validation을 해줄수 있게 만들어 줄수도 있다.



```javaj
import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsString({ each: true })
  readonly genres: string[];
}

```

Class-validator를 사용해주면 DTO에 validation 기능도 추가해 줄수 있다.

또한  Array의 경우 each를 사용해주면 각 요소가 string인지를 확인을 해줄수 있는 옵션도 제공을 해주고 있다.



### Entity와 DTO차이

**Entity와 DTO를 분리해서 관리해야 하는 이유**는 **DB Layer와 View Layer 사이의 역할을 분리 하기 위해서**다.

**Entity 클래스**는 **실제 테이블과 매핑**되어 만일 **변경되게 되면 여러 다른 클래스에 영향**을 끼치고, **DTO 클래스**는 **View와 통신하며 자주 변경**되므로 **분리 해주어야** 한다.

결국 DTO는 Domain Model 객체를 그대로 두고, 복사하여 다양한 Presentation Logic을 추가한 정도로 사용하며 **Domain Model 객체는 Persistent만을 위해서 사용**해야한다.

**즉, Entity는 DB와 1:1매칭이 되는 Class이지만, DTO의 경우 통신간의 Data의 형태를 정의한것임으로 Entity와는 다르게 수시로 변경이 될수 있다. 이것을 위해서 2개를 서로 분리한것이다.**

---



`app.useGlobalPipes(new ValidationPipe());`

main.ts에 사용할시에 몇가지 좋은 옵션을 사용할수 있다.

 `whitelist: true, forbidNonWhitelisted: true`

두가지 옵션을 적용해주면 데코레이터가 없다면 문제가 있다는 내용을 알려준다,

`transform: true,` 옵션은 URL등에 ID가 만일에 123일경우 String 123이 되는데, 이것을 자동으로 Number로 바꿔주는 역할을 한다.

 (실제 타입)



이러한 부분이 express로 쓰는것보다 nest와 같은 프레임워크를 썼을때 얻을수 있는 이득이다



```javascript
export class UpdateMovieDto {
  @IsString()
  readonly title?: string;
  @IsNumber()
  readonly year?: number;
  @IsString({ each: true })
  readonly genres?: string[];
}

```

기존에 CreateDto를 기준으로 복사해서 쓰는것 대신에 

Nest의 부분타입을 쓸것이다 (Partial Type)

`npm i @nestjs/mapped-types`

Mapped-types는 탕비을 변환시키고 사용할수 있게하는 패키지 인데, nest에서 제공해주는 패키지이다

https://www.npmjs.com/package/@nestjs/mapped-types

이건 DTO를 변환하는것을 도와줌



```javascript
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}

```

UpdateMoviceDto는 CreateMovieDto와 동일함. 단, 전부 필수사항이 아니라는것이 다름



module들은 controller와 service만을 가지고 있어야함.

그렇기 떄문에 현재 app.module에 있는 controllers와 providers를 

movies.module로 옮겨줄것임

```javascript
import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [MoviesModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class AppModule {}

```

현재는 `nest g mo ` 를 사용해서 movies모듈을 만들어져 있는 상태.

- [ ] ```javascript
  import { Module } from '@nestjs/common';
  import { MoviesModule } from './movies/movies.module';
  
  @Module({
    imports: [MoviesModule],
    controllers: [],
    providers: [],
  })
  export class AppModule {}
  
  ```



```javascript
import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}

```



이처럼 app.module에 전부다 import하는 것이 아닌 각각의 module에 import한다음에 app.module에는 각각의 module만 import하는

방식으로 개발을 한다. 그렇다면 app.module에는 언제 povider와 controller를 import하는걸까?

App의 기본적인 페이지를 보여주고자 할때(루트위치) 추가해준다.



Dependency injhection 이라는 개념이 있다.

Controller에서는 Service에서 구현한 비지니스 로직은 constructor로 가져온다음에 this.00.00() 의 방식으로 가져와서 쓰는데, 이것은 타입을 지정해준것이다.

즉, import를 안쓰고 쓰고 있다는 것인데, 여기서는 Class만 impoert해서 사용하고 있다.

즉, 차입을 추가하는것만으로도 작동하게 해준다.

이것을 Depenency inject라고 한다.

한마디로, 개발자가 직접 하나씩 import해주는것이 아닌 nest가 

알아서 import해주는것을 의존성 주입이라고 한다 





nest는 express위에서 돌아가기 때문에 원한다면

controller에서 response나 request객체를 사용할수있다.

```javascript
@Get()
  getAll(@Req() req, @Res() res): Movie[] {
    return this.movieService.getAll();
  }
```

이렇게 express로 바로 접근하는건 별로 좋진않다.

하지만 nest에서는 express말고도 fastify위에서 돌아가는데 

그렇기에 fastify 같은 다른 라이브러리와 호환이 된다.

fastify는 express와 비슷하게 존재하는데 2배빠름



또한, Nest에서 쓰이는 방식으로 사용한다면 추후에 express에서 fastify로 전환을 해도 문제가 생기지 않겠지만, 만일에 위에 나와있는것 처럼

express방식을 사용을하게 된다면 나중에 fastify방식으로 전환한다면 에러가 발생할것이다.



Nest에서 제공하는 test

```json
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
```



watch 로 실행하게 되면 새로운 테스트를 만들어 낼때마다

그 테스트가 실행이 된다



Jest



`spec.ts` 가 붙은 파일들이 있다.

이것은 테스트를 포함하고 있다.



nest에서는 jest가 .spec.ts파일들을 찾아볼수 있도록 설정되어있다.



유닛테스팅 : 모든 function을 따로 테스트 하는것

서비스에서 분리된 유닛을 테스트 하는것

-> getAll()과 같은 function을 검사하는것

E2e : 모든 시스템을 검사하는것

-> 어떤페이지로 가면 특정페이지가 나와야 하는 경우 사용한다.

사용자 관점에서 보는 사용자 스토리와 같음

사용자가 취할만한 액션들을 처음부터 검사하는것을 말한다.



```javascript
describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

describe : 테스트를 설명해 주는것\

afterEach : 

 beforeEach : 테스트를 실행하기 전에 실행되는것

afterAll : 안에는 데이터베이스를 깨끗하게 정리해주는(모두 지우는) function을 넣을수있다

beforeAll : 

It : 테스트 할 요소를 정의한다.

expect : 테스트해서 나와야할 값을 정의하여 테스트한다.





Nest의 장점 떄문에 movie service 에 접근할수있음



즉, describe에서 테스트할 요소의 큰부분(함수)를 정의하고

해당 함수에 해당하는 하위 항목 테스트를 it로 정의하며,

해당하는 it대하여 예상되는 값들은 expect함수로 예상하여

테스트 케이스를 생성한다



E2E

Spec.ts 파일같은 경우는 모두 해당파일의 유닛 테스트를 위한것이다.

어떨떄는 1개를 테스트 해야하고 가끔은 2개를 테스트 해야하는 비밀번호 생성, 저장 funciton과 같은 경우에는 유닛 테스트가 다소 어려울수 있다

여기서 e2e가 등장함





```javascript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});

```



`supertest` 라는 라이브러리가 들어가 있다는점이 유닛테스트와는 다소 다르다

/Get으로 요청을 보내고, 응답을 받는다.

따라서 controll, service등을 전부다 아우르는 내용이다.

```javascript
  it('/movies (GET)', () => {
    return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
  });
```

위와 같은 내용으로 /movies의 url에 요청을 받을수가 있는데,

`app.getHttpServer()` 라고 되어있는 부분은 localhost:3000과 같은 부분을 대체하여준다

```javascript
  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });
  });
```

위와 같은 내용으로 리펙토링을 할수있다

또한 post 와 delete를 넣어서 다음과 같이 하나의 큰 흐름의 e2e테스트를 만들어 볼수 있다.

```javascript
  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });
    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['action'],
        })
        .expect(201);
    });
    it('DELECT', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });
});
```





```javascript
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
```

테스트를 할때 매번 새로운 app applicaiton을 만든다.

여기서 만드는 app application은 test를 위한것이다.

즉, 브라우저로 들어갈수있는 실제 application과는 다르다.

```javascript
  describe('/movies/:id', () => {
    it.todo('GET');
    it.todo('POST');
    it.todo('PETCH');
  });
```

또한 jest에서는 todo라는 기능을 제공하는데, 앞으로 작성해야하는 test들을 미리 만들어 놓을수있다.



`beforeAll` 는 `beforeEach` 와는 다르게 모든 각각의 테스트 이전에 실행되는것이 아니다.

무슨말이냐면, 특정 데이터 베이스를 테스트중에 만든다고 한다면,

baforeEach는 각테스트마다 생성하기 떄문에 항상 비어있게되지만, beforeAll같은 경우에는 1번만 실행되므로, 데이터 베이스를 유지한상태 즉, app application을 매번 초기화 하지않도 테스트를 진행할수있다.



하지만, 여기서 문제가 발생을 한다.

테스트에서 Movie객체를 create한다음 get을 해도,  만들어진 객체를 찾을수 없다라고 나온다.



이유는 main.ts 에서

```javascript
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
```

위와 같이 transform을 사용해서 string인 url에 들어가는 id를 number로 변경해주기 때문이다.

하지만 e2e test에서는 어떠한가? 

```javascript
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
```

위에서 보는바와 같이 어떤 pipe도 태우지 않았다.

이점이 test를 할때 가장 주의해야하는 점중에 하나다.

바로, 실제 어플리케이션 환경을 그대로 적용시켜주어야지 제대로된 테스트 결과를 받을수 있다는 것이다.











































