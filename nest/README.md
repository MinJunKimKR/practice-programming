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





























