#### github action은 3개의 단계가 있다.

1. workflow
2. job
3. task

## 환경변수

- 일종의 file에 저장이 된다

### 환경변수 스코핑

- workflow레벨에서 있는 환경변수는 모두 접근 가능하다.
- 하지만 다른 계층에 있는 스텝 혹은 잡에서는 접근이 불가능하다

```
JOB 1: this value comes from the job level 1
JOB 2:
STEP_LEVEL_11: this value comes from the step level 11
STEP_LEVEL_12:
STEP_LEVEL_21:
STEP_LEVEL_22:
```

```
JOB 1: this value comes from the job level 2
JOB 2:
STEP_LEVEL_11:
STEP_LEVEL_12:
STEP_LEVEL_21:
STEP_LEVEL_22: this value comes from the step level 22
```

- 즉, 환경변수는 `스코핑이 있다.`

### 런타임 환경변수 셋업

_bash_

```
echo "STEPSET_VALUE_1=$var_1" >> $GITHUB_ENV
```

_power shell_

```
echo "STEPSET_VALUE_2=$var_2" | Out-File -FilePath $env:GITHUB_ENV -Encoding utf-8 -Append

```

위의 코드는 환경변수를 $GITHUB_ENV 하는 파일로 저장하라는 의미다.
git action이 동작하며 저 파일에 접근이 가능해진다.

각자의 스텝에서 처리한 환경변수를 어디서든 접근 가능해진다.

```
name: "SWM GitHub Actions Basic"

on: push

env:
  PRESET_VALUE: 'This is PRESET_VALUE'

jobs:
  first-job:
    name: "First Job"

    runs-on: ubuntu-latest

    steps:
      - name: "Set enviorment variable 1"
        shell: bash
        run: |
          var_1='This is the value 1 in the step 1'

          echo "STEPSET_VALUE_1=$var_1" >> $GITHUB_ENV

      - name: "say Hello world 12"
        shell: pwsh
        env:
          STEP_LEVEL_12: 'this value comes from the step level 12'
        run: |
          var_2='This is the value 2 in the step 2"

          echo "STEPSET_VALUE_2=$var_2" | Out-File -FilePath $env:GITHUB_ENV -Encoding utf-8 -Append

      - name: 'CHeck environment variables'
        shell: bash
        run: |
          echo "preset value: ${{env.PRESET_VALUE}}"
          echo "stepset value 1: ${{env.PRESET_VALUE_1}}"
          echo "stepset value 2: ${{env.PRESET_VALUE_2}}"
```

### 스텝간에 환경변수 넘겨주기

:: -> '현재 스텝에 아웃풋 값을 지정을 해라'라는 뜻이다.

```
name: "SWM GitHub Actions Basic"

on: push

env:
  PRESET_VALUE: 'This is PRESET_VALUE'

jobs:
  first-job:
    name: "First Job"

    runs-on: ubuntu-latest

    steps:
      - name: "Set output value"
        id: first
        shell: bash
        run: |
          var_1="This is the value 1 in the step 1"

          echo "::set-output name=first_value::$var_1"

      - name: "Output output value"
        shell: pwsh
        run: |
          echo "${{ steps.first.outputs.first_value}}"

```

### 민감한 정보 숨기기

```
echo "::add-mask::$var_1"
```

아래와 같이 변수가 마스킹 된다

```
Run echo "***"
***
```

### 시크릿 사용하기

```
echo "${{ scerets.HELLO}}"
```

### matrix

- 모든 OS에서 loop 해주고 싶다.
- matrix를 사용하면 반복적인 작업을 줄여줄수 있다.

```
name: "SWM GitHub Actions Basic"

on: ['push']

env:
  PRESET_VALUE: 'This is PRESET_VALUE'

jobs:
  first-job:
    name: "First Job"

    strategy:
      matrix:
        os: ['ubuntu-latest', 'macos-latest', 'windows-latest']
        message: ['HEELO WORLD','LOREM IPSUM']

    runs-on: ${{matrix.os}}

    steps:
      - name: "Set output value"
        id: first
        shell: bash
        run: |
          var_1="This is the value: ${{ matrix.message}}"
          echo "::set-output name=first_value::$var_1"

      - name: "Output output value on ${{ matrix.os}}"
        shell: pwsh
        run: |
          echo "${{ steps.first.outputs.first_value}}"

```

### condition

```
if: github.event_name == 'pull_request'
```

```
name: "SWM GitHub Actions Basic"

on: ['push', 'pull_request']

env:
  PRESET_VALUE: 'This is PRESET_VALUE'

jobs:
  first-job:
    name: "First Job"
    strategy:
      matrix:
        os: ['ubuntu-latest', 'macos-latest', 'windows-latest']

    runs-on: ${{matrix.os}}

    steps:
      - name: "Set output value"
        id: first
        shell: bash
        run: |
          var_1="This is the value: hello world"
          echo "::set-output name=first_value::$var_1"

      - name: "Output output value on ${{ matrix.os}}"
        if: matrix.os == 'ubuntu-latest'
        shell: pwsh
        run: |
          echo "${{ steps.first.outputs.first_value}}"

```

if는 workflow레벨에서는 안되지만, job이나 task레벨에서 적용가능하다

### git aciton의 event

1. tag
2. api 호출했을때
3. push
4. pull request

더 세분화해서 조정가능하다

```
name: "SWM GitHub Actions Basic"

on:
  push:
    branches:
      - main
    tags:
      - 'v*'
  pull_request:
    branches:
      - main

env:
  PRESET_VALUE: 'This is PRESET_VALUE'

jobs:
  first-job:
    name: "First Job"
    strategy:
      matrix:
        os: ['ubuntu-latest', 'macos-latest', 'windows-latest']

    runs-on: ${{matrix.os}}

    steps:
      - name: "Set output value"
        id: first
        shell: bash
        run: |
          var_1="This is the value: hello world"
          echo "::set-output name=first_value::$var_1"

      - name: "Output output value on ${{ matrix.os}}"
        if: matrix.os == 'ubuntu-latest'
        shell: pwsh
        run: |
          echo "${{ steps.first.outputs.first_value}}"

```

### 순서대로 실행하기

Job은 순서대로가 아니라 뭐가 먼제 실행되는지 모른다.
따라서, 순서대로 하려면 `needs` 키워드가 필요하다
이것을 이용하여 의존성이 생기게 된다.

```
name: "SWM GitHub Actions Basic"

on:
  push
env:
  PRESET_VALUE: 'This is PRESET_VALUE'

jobs:
  first-job:
    name: "First Job"

    runs-on: ubuntu-latest

    steps:
      - name: "Say hello"
        if: matrix.os == 'ubuntu-latest'
        shell: pwsh
        run: |
          echo "hello world from first job"

  second-job:
    name: "second Job"
    needs: first-job
    runs-on: ubuntu-latest

    steps:
      - name: "Say hello 2"
        if: matrix.os == 'ubuntu-latest'
        shell: pwsh
        run: |
          echo "hello world from second job"

```

이렇게 하면 같이 실행되고,

```
  second-job:
    name: "second Job"
    needs: first-job
    runs-on: ubuntu-latest

    steps:
      - name: "Say hello 2"
        if: matrix.os == 'ubuntu-latest'
        shell: pwsh
        run: |
          echo "hello world from second job"

  third-job:
    name: "Third Job"
    needs: first-job
    runs-on: ubuntu-latest

    steps:
      - name: "Say hello 3"
        if: matrix.os == 'ubuntu-latest'
        shell: pwsh
        run: |
          echo "hello world from third job"
```

이렇게 하면 순서대로 실행된다,

```
  second-job:
    name: "second Job"
    needs: first-job
    runs-on: ubuntu-latest

    steps:
      - name: "Say hello 2"
        if: matrix.os == 'ubuntu-latest'
        shell: pwsh
        run: |
          echo "hello world from second job"

  third-job:
    name: "Third Job"
    needs: second-job
    runs-on: ubuntu-latest

    steps:
      - name: "Say hello 3"
        if: matrix.os == 'ubuntu-latest'
        shell: pwsh
        run: |
          echo "hello world from third job"
```

### webbex bot 만들기

준비물은

1. room id
2. API Key
3. markdown value
4. text

https://developer.webex.com/docs/api/v1/messages/create-a-message
API를 참고하고, roomId와 token을 사용해서 api통신을 해서 bot 을 만들수 있다.

```
name: "SWM GitHub Actions Basic"

on:
  push
env:
  PRESET_VALUE: 'This is PRESET_VALUE'

jobs:
  first-job:
    name: "First Job"

    runs-on: ubuntu-latest

    steps:
      - name: "Send message bot"
        shell: bash
        run: |
          curl -X POST \
          'https://webexapis.com/v1/messages' \
          -H "authorization: Bearer ${{ secrets.WEBEX_TOKEN}}" \
          -H "cache-control: no-cache" \
          -H "content-type: application/json" \
          -H "postman-token: 98054c42-ffbd-e5da-29a1-68151df7c26a" \
          -d '{
            "roomId": "${{ secrets.WEBEX_ROOM_ID}}",
            "markdown": "Message end by from github action from ${{ github.repository }}",
            "text": "12"
          }'
```

### custom github action

타입스크립트로 만들면 꽤나 복잡하다.

- 하지만 만들어놓으면 매우 빠름

따라서 우리는 docker를 만들어 보도록한다.

- 만드는 속도가 빠름
- 다만 action이 될떄마다 docker가 매번 build가 되기 때문에 속도가 느리다

3가지를 만들어야한다

1. dockerfile
2. entrypoint
3. action.yml - 이 action이 무엇인지 정의를 해준다.

`chmod +x ./entrypoint.sh`로 실행이 가능하도록 권한을 준다

./entrypoint.sh -k $apiKey -r $roomId -t $bodyText -m $bodyMarkdown

```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   703    0   531  100   172    726    235 --:--:-- --:--:-- --:--:--   960
::set-output name=response::{"id":"Y2lzY29zcGFyazovL3VybjpURUFNOnVzLXdlc3QtMl9yL01FU1NBR0UvMDI2NGE5YTAtYmZiNS0xMWVjLTllZWUtMTNlYTQ4NzEzZDU5","roomId":"Y2lzY29zcGFyazovL3VybjpURUFNOnVzLXdlc3QtMl9yL1JPT00vNzcxZTI4ZDAtYmZhZi0xMWVjLThiNGQtM2ZiNTM2NmI4ZGQ2","roomType":"direct","text":"Hello Mark console","personId":"Y2lzY29zcGFyazovL3VzL1BFT1BMRS81ZWM5NThlMy1lYTgzLTQ5YTctOGNkMS1hZWFiZmJhMTZlM2E","personEmail":"Minjun.Kim.MJ@webex.bot","markdown":"**Hell**o Mark console","html":"<p><strong>Hell</strong>o Mark console</p>","created":"2022-04-19T07:47:49.178Z"}
```

shell은 정상 작동 한다는것을 알수 있다

### action

https://haya14busa.github.io/github-action-brandings/

위의 링크를 참고해보면 어떤 아이콘등이 있는지 알수있다.

#### docker

`docker build . -t swm-gha`로 docker를 빌드해준다.

`docker run -it swm-gha -k $apiKey -r $roomId -t $bodyText -m $bodyMarkdown`

를 확인해보면 docker 내부적으로 잘 작동한다.
