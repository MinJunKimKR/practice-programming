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
