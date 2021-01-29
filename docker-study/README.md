

# Docker

CI/CD를 구축해본 경험이 있지만

docker와 k8s에 대한 깊은 이해는 부족하다는 생각이 들게되어 공부를 시작해 봅니다.



아래의 필기는 docker를 공부하며 기록해 놓은 내용입니다.



# 도커란?

## 기존의 문제점

- 서버의 환경이 AWS,Azure 등으로 바뀌게되거나 centos에서 ubuntu를 쓰거나 할때에 세팅을 다시 해줘야함

- MSA에서 작은 서버를 여러대를 관리해야 하는 어려움이 생김

위와 같은 문제를 해결하기 위하여 도커가 탄생하게 되었다.



## 도커는

컨테이너 기반의 오픈소스 **가상화 플랫폼** 이다.

마치 배에서 물건을 화물선에 컨테이너에 담아 옮기듯이 **프로그램과 실행환경을**컨테이너로 추상화 하고 **동일한 인터페이스** 를 제공해서

**프로그램의 배포 및 관리** 를 단순하게 해줍니다.

그렇기에 **백앤드 프로그램, 데이터베이스 서버** 등 프로그램을 **PC,AWS,AZURE** 등 어디서든 실행할수 있게 만들어 줍니다.

이와 같은 특성 때문에 CI/CD에서 사용됩니다.

# 기본개념 및 용어

## 컨테이너

![가상머신과 도커](https://subicura.com/assets/article_images/2017-01-19-docker-guide-for-beginners-1/vm-vs-docker.png)

기존의 가상머신(VM)의 경우 Host OS위에 하이퍼 바이저(hypervisor)가 존재하여 가상화 방식으로 다수의 OS를 실행 할수 있게 만듭니다.

하지만 이때에 성능의 문제가 생겼기에 **프로세스 격리** 를 하는 방식이 생겼습니다.

이것은 도커는에서는 **컨테이너** 라고 합니다.

프로세스를 격리하기 떄문에 1개의 서버에서 여러개의 컨테이너를 독립적으로 실행하여 마치 여러개의 VM을 사용하는 느낌을 줍니다.



## 이미지

![Docker — Organize everything I know documentation](https://oi.readthedocs.io/en/latest/_images/docker_image.png)

도커에서 중요한 개념인 이미지는 **컨테이너 실행에 필요한 파일과 설정값을 포함하고 있는것**입니다,

이 이미지는 **상태값을 가지고 있지 않습니다**.

무슨말이냐면, **컨테이너는 이미지를 실행한 상태라고 볼수 있습니다** 따라서 추가되거나 변경되는 값은 **이미지가 아닌 컨테이너** 에 저장됩니다.

그렇기에 **같은 이미지로 여러개의 컨테이너를 실행할수 있고, 컨테이너가 변경되거나 삭제되도 이미지는 불변합니다**

즉, 이미지는 **컨테이너를 실행하기 위한 모든 정보를 가지고 있기떄문에 컴파일하거나 설치할 필요가 없습니다**



## 레이어 저장방식

![Docker Layer](https://subicura.com/assets/article_images/2017-01-19-docker-guide-for-beginners-1/image-layer.png)

도커이미지는 컨테이너를 실행하기 위한 정보를 가지고 있기에 용량이 수백MB가 됩니다.

따라서 기존 이미지에 파일을 변경했다는 이유로 다시 이미지를 받는것은 매우 비효율적이 됩니다.

이것을 해결하기 위해 **레이어** 라는 개념을 이용합니다.

이 레이어를 이용하여 새로운 이미지를 다시 다운 받는것이 아닌 바뀐 이미지만 다시 받으면 되기에 매우 효율적입니다.

# 도커 사용하기



도커는 하나의 실행파일이지만 실제로는 서버와 클라이언트 역할을 각각할수 있습니다.

무슨 말이냐면 커멘트를 입력하면 도커 커맨드를 도커 클라이언트가 도커 서버로 전송하고 결과를 받아서 출력을 해줍니다.

# 컨테이너 실행하기

```
docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]
```



먼저 우분투 컨테이너를 생성하고 해당 컨테이너 내부에 들어가 보겠습니다.

```
docker run ubuntu:16.04
```



이 경우 아무런 반응이 없는것 처럼 보입니다.

그것은 실행이 되었지만 해당 컨테이너에 실행을 하라는 **명령어를 전달하지 않았기** 때문에 **생성과 동시에 종료** 됩니다.

여기서 중요한점이 **컨테이너는 결국에 프로세스기 때문에** 실행중인 프로세스가 없다면 **컨테이너는 종료됩니다.**



그럼 이번에는 명령어를 다소 바꿔보겠습니다.

```
docker run --rm -it ubuntu:16.04 /bin/bash
```

`--rm` 옵션으로 프로세스가 종료되면 컨테이너가 자동으로 삭제되도록 합니다

`-it` 옵션은 아래의 2가지가 합쳐져 있다.

- i : Interactive 모드로 표준입력과 표준출력을 키보드와 화면을 통해 가능하도록 하는 옵션이다.
- t: 텍스트 기반의 터미널(TTY)을 애뮬레이션해주는 옵션이다.

즉, i 옵션으로 키보드와 화면을 통해 입출력이 되고, t옵션으로 TTY을 에뮬레이터 해서 우리가 터미널을 통해 입력할수 있도록 만들어 주는것이다.

`/bin/bash` 명령어를 이용해서 우분투 컨테이너를 실행시켜보자



## Redis container 실행해보기

redis는 6379 port로 통신합니다.

detached mode(background mode)을 위해서 -d 옵션을 추가하고 포트 포워딩을 위해 -p옵션을 추가 해보겠습니다

```
docker run -d -p 1234:6379 redis
```

위의 명령어를 통해서 redis 컨테이너가 1234의 포트가 6379포트와 연결이 되었습니다.

백그라운드에서 redis가 정상적으로 실행중인지 확인해봅시다.



-d 옵션으로 backgound 에서 잘 실행이 되고 있는지 `docker ps`를 이용해서 현재 실행중인 redis container를 확인할수 있습니다.

```
# docker ps               

CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS                    NAMES
8715514417ff        redis               "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:1234->6379/tcp   cranky_pasteur

```

이제 redis에 telnet을 이용해서 테스트를 해보겠습니다.

> Mac OS에서 High Sierra이후  telnet이 기본제공되지 않기 떄문에
>
> homebrew를 이용해서  telnet설치하겠습니다.
>
> brew tap theeternalsw0rd/telnet
>
> brew install telnet

```
telnet localhost 1234
```

아까 host의 1234포트를 컨테이너의 6379와 연결( `1234:6379`)  로 연결했기에 local 1234포트로 접속하면 redis를 사용할수 있습니다.

redis에 접속을한다음에 

```
set mykey hello
+OK
get mykey
$5
hello
```

reids 명령어를 실행해보면 잘 실행되는것을 볼수있습니다.

빠져나올때는 quit명령어를 사용하면 redis에서 나올수 있습니다.



호스트의 post만 다르게 해주면 하나의 서버에 여러개의 redis 서버를 띄우는게 가능합니다.



## Mysql container 실행하기

-e 옵션으로 환경변수를 설정하고 --name을 이용해서 컨테이너에 이름을 부여해볼겁니다.

```bash
docker run -d -p 3306:3306 \
  -e MYSQL_ALLOW_EMPTY_PASSWORD=true \
  --name mysql \
  mysql:5.7
```

- -d 로 백그라운드 실행을 해줍니다
- -p 로 host port 중 3306을 컨테이너의 3306과 연결해줍니다
- -e 로 환경설정을 해주는데, MYSQL_ALLOW_EMPTY_PASSWORD는 패스워드 없이 root 계정을 만들어 주기 위해 사용합니다.
- --name 으로 container의 name 을 mysql로 변경해 줍니다.

```
mysql -h127.0.0.1 -uroot
```

위의 명령어로 mysql이 잘 동작하고 있다는것을 알수 있습니다.



## Wordpress container 와 mysql contatiner 연결하기

wordpress container와 위에서 만들어둔 mysql container와 연결을 해보겠습니다

예제에서는 `--link`를 사용했지만 지금은 docker 공식 documation에서 보면 나와있지만 곧 사라질 예정이라 

> **Warning**: The `--link` flag is a legacy feature of Docker. It may eventually be removed. Unless you absolutely need to continue using it, we recommend that you use user-defined networks to facilitate communication between two containers instead of using `--link`. One feature that user-defined networks do not support that you can do with `--link` is sharing environment variables between containers. However, you can use other mechanisms such as volumes to share environment variables between containers in a more controlled way.
>
> See [Differences between user-defined bridges and the default bridge](https://docs.docker.com/network/bridge/#differences-between-user-defined-bridges-and-the-default-bridge) for some alternatives to using `--link`.

docker network를 사용해서 바꿔보는것 까지 해보겠습니다.

`--link` 옵션은 컨테이너의 IP정보를 /etc/host에 자동입력 함으로 워드프레스 컨테이너가 mysql 데이터 베이스의 정보를 알 수 있게됩니다.

```bash
mysql -h127.0.0.1 -uroot
create database wp CHARACTER SET utf8;
grant all privileges on wp.* to wp@'%' identified by 'wp';
flush privileges;
quit
```

먼저 이번 예제에서 사용할 mysql에서 wp database를 생성합니다.



이제 wordpress 를 실행합니다.

```bash
docker run -d -p 8080:80 \
  --link mysql:mysql \
  -e WORDPRESS_DB_HOST=mysql \
  -e WORDPRESS_DB_NAME=wp \
  -e WORDPRESS_DB_USER=wp \
  -e WORDPRESS_DB_PASSWORD=wp \
  wordpress
```

host 의 8080포트를 컨테이너의 80포트와 연결 시켜줍니다.

docker run 명령에서 연결 옵션은 `--link <컨테이너 이름>:<별칭>`  입니다

이후 데이터베이스 정보를 `-e`를 이용해서 환경변수로 입력합니다

이제 브라우저에서 위에서 설정을 해준대로 `http://localhost:8080/` 로 접속해 보면 wordpress가 성공적으로 실행되는것을 확인할수 있습니다

하지만 `--link ` 명령어는 없어지므로 network로 바꿔 보도록 해보곘습니다

## --link 명령어 대신 Network 사용하기

위에와는 다르게 link명령어를 뺴고 다시 만들어 줍니다

> 기존의 run중인 container를 삭제하려면 docker kill 명령어를 사용하면 됩니다.

```bash
docker run --name wordpress -d -p 8080:80 \
  -e WORDPRESS_DB_HOST=mysql \
  -e WORDPRESS_DB_NAME=wp \
  -e WORDPRESS_DB_USER=wp \
  -e WORDPRESS_DB_PASSWORD=wp \
  wordpress 
```



자, --link를 사용하지 않았는데 이럴때는 container 끼리 통신이 불가능할까요?

그것을 알아보기 위해 현재 host docker에 존재하는 network목록을 확인해봅니다

`docker network ls` 명령어를 사용하면 목록을 확인할수 있습니다

```bash
NETWORK ID          NAME                      DRIVER              SCOPE
72d33d071c1b        bridge                    bridge              local
3aa77d89492c        host                      host                local
7f51c9c8c7e4        none                      null                local
1e95f3086a84        redis-net                 bridge              local
```



이제 `docker network inspect bridge`  명령어를 이용해 bridge 네트워크에 자세한 내용을 확인할수 있습니다.

```bash
[
    {
        "Name": "bridge",
        "Id": "72d33d071c1bab03c43a78e7ed494bd85cae168eaffc24a541a885382ef750c4",
        "Created": "2021-01-11T07:43:03.9400497Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
       ...
        "Containers": {
            "289668a74dd0cbce6c02b1483a2f12fbf82c750eeb06e0e1e49e832a084fd3bf": {
                "Name": "wordpress",
                "EndpointID": "b4ffb0164c0cddb9414b0614d41d074200d44ca4a4ae5fb910881694b43de9c4",
                "MacAddress": "02:42:ac:11:00:04",
                "IPv4Address": "172.17.0.4/16",
                "IPv6Address": ""
            },
            "3a40006d302910fccd980e387efcc4494a450b03a3f664c8d87079f8e54c2681": {
                "Name": "mysql",
                "EndpointID": "81189e72a67d60bebb63931dd8d187359015e6e1b97ef51ca69041ac81dd9be0",
                "MacAddress": "02:42:ac:11:00:03",
                "IPv4Address": "172.17.0.3/16",
                "IPv6Address": ""
            },
            "8715514417ff431bfff2373b0b9c1fb49a8aef1c3def0806f6fefea91995417e": {
                "Name": "cranky_pasteur",
                "EndpointID": "8d71a4d31007f4cf55ea1f31be528ba459b4e3aee50520aa11517a4998f12e21",
                "MacAddress": "02:42:ac:11:00:02",
                "IPv4Address": "172.17.0.2/16",
                "IPv6Address": ""
            }
        },
        ...
      }
]
```

위의 내용을 보면 아까 실행한 mysql과 workpress가 보이는 것을 알수 있습니다.

이는 컨테이너를 실행할 때 `--network` 옵션을 명시해주지 않으면, 기본적으로 `bride`라는 이름의 디폴트 네트워크에 붙게 되기 때문입니다.



그럼 찾아낸 ip address와 통신이 되는지 테스트 해보겠습니다.

아까 사용했었던 `docker run -it ubuntu:16.04 /bin/bash` 명령어로 ubuntu 컨테이너를 실행시켜줍니다

우분투에서 바로 ping을 할수 없음으로 아래의 명령어로 ping을 설치해 줍니다

```
apt-get update

apt-get install iputils-ping
```

이제 `ping 172.17.0.4` 을 해보면 정상적으로 ping이 잘 전달된다는것을 알수 있습니다.



이것으로 알수있는것은 **docker container에 별도의 network설정을 안해도 기본 bridge가 연결되어 있어서 컨테이너간 연결을 할수 있다는 것입니다.**



### 문제점

위의 경우 container의 name으로 통신을 할수는 없는데, production에서 사용이 부적합합니다.

이는 여러개의 container가 통신을 하면할수록 관리하기가 점점 어려워 지기 떄문입니다



## User-Defined Bridge Networks

그럼 이제 user-defined bridge networks를 만들어 보도록하자

먼저 기존의 컨테이너를 `docker kill mysql`  `docker kill wordpress` 로 종료시키자.

이제 네트워크를 적용시킨 새로운 mysql 컨테이너와 wordpress를 만들어 주도록 하자

```bash
docker run -d -p 3306:3306 \
  -e MYSQL_ALLOW_EMPTY_PASSWORD=true \
  --name mysql-word \
  --network word-work \
  mysql:5.7
```

--network option을 줘서 만든 network bridge에 추가 해주자.



이제 wordpress도 같은 network에 있어야 통신이 됨으로 같은 network를 지정해주자

```bash
docker run --name wordpress-mysql -d -p 8080:80 \
  -e WORDPRESS_DB_HOST=mysql-word \
  -e WORDPRESS_DB_NAME=wp \
  -e WORDPRESS_DB_USER=wp \
  -e WORDPRESS_DB_PASSWORD=wp \
  --network word-work \
wordpress 
```



여기까지하면 mysql과 wordpress 컨테이너가 같은 network에 존재하게 된다.



`docker network inspect word-work` 로 확인해보면  같은 네트워크내에 있는걸 확인할수 있다

```bash
[
    {
        "Name": "word-work",
     	...
        "Containers": {
            "7bff16964990e90e9ae53089c9cd9787601317408270b0335c6544060c603171": {
                "Name": "wordpress-mysql",
                "EndpointID": "d7495b9e77f7c10548d285fed5cd1536a1dbac3d93249f2697a674f14731dc94",
                "MacAddress": "02:42:ac:14:00:03",
                "IPv4Address": "172.20.0.3/16",
                "IPv6Address": ""
            },
            "dd88ad48a37977e1dee354361f51b43b47a6643e3cedae9ccec0225e6ade71a6": {
                "Name": "mysql-word",
                "EndpointID": "daa0cc58c2ee9eea3eed866dfab9d603cf4884c137a8ef3362c373d7dfdafe15",
                "MacAddress": "02:42:ac:14:00:02",
                "IPv4Address": "172.20.0.2/16",
                "IPv6Address": ""
            }
        },
      ...
    }
]

```

이제 브라우저에서 localhost:8080로 접근해보면 아까 --link 옵션을 썼을떄와 같이 mysql 과 wordpress가 연결이된것을 볼수있다.



















