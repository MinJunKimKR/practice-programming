



# HELM?

https://helm.sh/docs/intro/using_helm/

https://pkg.go.dev/text/template

GO template을 사용한다

# 3가지 큰 컨셉

## 차트

- helm의 package이다.
- 동작하는데 필요한 클러스터내의 리소스들을 정의한다
  - 어플리케이션
  - 툴
  - 사비스
- homebrew formuka, Apt dpkg 와 같음



## 레포지토리

- 차트가 수집되고 공유되는 곳이다.
- 마치 쿠버네티스를 위한 펄에서 CPAN 아카이브나 페도라pacakge Database같은거다



## 릴리즈

- 클러스터 내의 동작하는 차트의 인스턴스다
- 클러스터에 2개의 데이터베이스를 실행하는데 MYSQL chart를 사용하면 2번 install 된다
- 이때 각각의 릴리스에는 고유한 릴리스이름이 존재한다



**즉, 헬름은 차트릴 쿠버네스티스에 인스톨하는데 매번 설치시 마다 새로운 릴리즈를 만든다**

**또한 헬름 레포지토리에서 새로운 차트를찾을수 있다.**















