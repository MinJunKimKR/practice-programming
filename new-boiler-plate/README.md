```json
{
  "name": "@ateam/boiler-plate",
  "version": "1.0.0",
  "private": true, //workspace는 private에서만 가능함
  "description": "",
  "main": "index.js",
  "directories": {
    "test": "test"
  },
  "workspaces": { //yarn monorepo
    "packages": [
      "backend", //workspace지정
      "devops"
    ]
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "run:registry": "docker-compose --env-file .env -f ./devops/docker-compose.registry.yaml up -d",
    "build:backend": "yarn workspace @ateam/backend image:build" //workspace를 해주면 하위의 명령을 root에서 내려줄수 있음
  },
  "author": "",
  "license": "ISC"
}

```





# k3d & K3s



- K3S : k8s의 경량화된 버전. minikube랑 다른점은 minikube는 VM위에서 돌아가지만 K3S는 Docker 내부에서 돌아간다

- k3d : Docker에서 k3s를 쉽게 실행하도록 설계된 유틸리티로, 0 ~ n 개의 작업자 노드가있는 완전한 규정 준수 Kubernetes 클러스터를 생성, 실행, 삭제하는 간단한 CLI를 제공합니다.

  즉, 도커 컨테이너에 K3S가 설치가 되어있어서 쿠버네티스를 구축하는 형태입니다. 따라서  docker가 반드시 필요하다





# Linkerd

**Service Mesh Architecture**

MSA(MicroService Architecture)와 더불어 최근 들어 많이 언급이 되고 있다.

1. MSA를 적용한 시스템의 내부 통신이 Mesh 네트워크 형태를 띄는것에 빗대어 Service Mesh로 명명
2. Service Mesh는 서비스간 통신을 **추상화**하여 안정하거 빠르고 신뢰할수 있게 만드는 전용 InfraStructure Layer 입니다.
3. Service Mesh는 URL경로, 호스트 헤더, API버전 또는 응용프로그램 수준 규칙을 기반으로 하는 7계층 네트워크 Layer입니다.

**서비스 간 통신**

Monolitic Architecture에서 프로세스나 쓰레드 간 메모리 공유 등 서비스 Instance 내부에서 처리하던 기능들이 서비스 간 통신을 통해 처리됩니다.

보통 사람들은 네트워크를 레이턴시가 없고 무한대 대역폭에 항상 안정적인 idle 상태로 생각하지만, 현실은 그렇지 않습니다. 안정적이지 않은 내부 네트워크는 시스템의 신뢰성, 안정성을 보장할 수 없습니다.

동적으로 수많은 Instance가 뜨고/지고, 서비스 간 통신이 유발하는 이런 복잡한 상황에서 내부 네트워크를 안정적으로 다루기 위해 **새로운 기능(또는 요구사항, 관리 point)들이 필요**합니다.

# Service Mesh 구현

Service Mesh Architecture의 구현은 보통 서비스의 앞단에 **경량화 프록시를 사이드카 패턴으로 배치**하여 서비스 간 통신을 제어하는 방법으로 구현합니다.

서비스 간 통신은 사이드카로 배치된 경량화 Proxy를 통해서 동작합니다. 이 경량화 Proxy에 Routing rules, retry, timeout 등을 설정하고 로직을 작성하여 공통 기능을 기본 어플리케이션에서 분리시킬 수 있습니다.







장애해결 - 

https://waspro.tistory.com/563



helm -

https://tommypagy.tistory.com/187









.