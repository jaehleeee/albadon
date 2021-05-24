# Infra

1. docker

* 환경을 conda로 다 분리할 것이지만 docker는 root 권한으로 설치해놓는 것이 좋다. 유저마다 docker를 쓰는 경우는 거의 없기 때문
* docker 설치 확인
```bash
$ docker --version
Docker version 20.10.5, build 55c4c88
```
* docker-compose 설치 확인
```bash
$ docker-compose --version
docker-compose version 1.29.0, build 07737305
```

2. conda

* 의존성 관리 툴
* 설치 방법은 구글에서
* conda 설치 확인
```bash
$ conda --version
conda 4.8.3
```
* env 생성
  * conda에서 albadon이라는 가상환경을 Python 버전 3.7로 생성
  * --yes는 설치할 거냐고 물어보는 질문에 yes 자동으로 응답
```
conda create -n albadon python=3.7 --yes
```
* conda 기본 사용방법
  * 현재 환경 확인: 터미널 창에 맨 앞 괄호 안에 있는게 현재 가상환경명
  * 가상환경 activate: `conda activate {env_name}`
  * 가상환경 deactivate: `conda deactivate`
  * 가상환경 목록 확인: `conda env list`
  * 나머지는 구글링
* **앞으로 모든 infra 작업은 `albadon` 환경에서 작업**
  * alias로 등록해 놓는 것을 추천
```bash
conda activate albadon
```
