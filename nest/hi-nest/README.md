



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



