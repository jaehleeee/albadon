# Albadon

## Branch 전략
1. Github 이슈 Create
2. Branch 이름은 {component}-#{이슈번호}
3. 해당 이슈에 대한 개발 완료
4. dev 브랜치로 merge
5. 이후 배포 계획에 따라 release 브랜치 생성
6. release 브랜치는 release-{compoenent}-{버전(v0.0.1)}

## 모듈명
* API 서버: albadon-api
* 프론트 서버: albadon-front
* Infra 관련: albadon-infra
