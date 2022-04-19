# sql 1씩 증가하는 컬럼

DB: MriaDB

이번에 sql에 새로운 컬럼을 추가해야 하는데, 특정한값을 기준으로 1부터 증가하는 값이 존재하는 컬럼을 만들어야 했다.
바로 컨텐츠의 에피소드의 챕터숫자를 추가해야한다.

1. 컨텐츠는 여러개의 에피소드를 가지고 있다.
2. 에피소드는 여러개의 챕터를 가지고있고, 1부터 시작한다.

위와 같은 조건으로 increase가 되는 값을 입력을 해야하는데 문제점은 이미 insert되어있는 데이터에 추가를 하는것이기에 쉽지가 않았다.

결론적으로는 아래와 같은 sql문으로 해결했다.

```
update episode as e,(
    select ROW_NUMBER() OVER(PARTITION BY content_id ORDER BY created_at) as chapter, id
    from episode
    order by content_id, created_at
    )as r
set e.chapter=r.chapter
where e.id = r.id;
```

이제 1개씩 뜯어보도록 해보자.

```
ROW_NUMBER() OVER(PARTITION BY content_id ORDER BY created_at)
```

- `ROW_NUMBER()`는 데이터의 row를 세기위한 함수다.
- `partition by`는 row를 세는 기준을 뜻한다.
  - 이번 sql문에서는 `content_id`를 기준으로 row를 센다. 즉, content_id를 기준으로 1개씩 카운팅이 가능해졌다.
  - `ORDER BY`를 `created_at`로 추가함으로서 순서를 매기는 기준을 시간순으로 해주었다.

```
    select ROW_NUMBER() OVER(PARTITION BY content_id ORDER BY created_at) as chapter, id
    from episode
    order by content_id, created_at
    )as r
```

이렇게 순위가 매겨진 데이터를 subquery로 사용하고, `r`이라고 명명한다.

이때, 기준이 되는 table과 연결해주어야 하기 때문에 id값도 select해온다

```
update episode as e,(
    select ROW_NUMBER() OVER(PARTITION BY content_id ORDER BY created_at) as chapter, id
    from episode
    order by content_id, created_at
    )as r
set e.chapter=r.chapter
where e.id = r.id;
```

이제 처음에 원했던대로 기존의 데이터에 챕터수를 update해준다.

위와 같은 방법으로 `특정한 기준`으로 `1부터 증가하는 수`를 update해주었다.
