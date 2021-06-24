



데코레이터는 클래스를 위해서 움직인다.

App module 은 root module과 같음



인증을 담당하는 어플리케이션이 있다면 user모듈인것이다



Controller: URL을 가져오고 함수를 실행함(마치 express의 라우터 처럼)

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





















