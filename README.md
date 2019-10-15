## SSAFY를 위한 사용자 참여형 웹/앱 서비스.... SOL4U



#### 팀장 : **박**준호

##### 팀원 : 김성우, 신승민, 임성우, 지창규



### Frontend Server 실행

```
cd frontend
npm install
npm install -g yarn
npm install -g @vue/cli
npm install vue
npm runserve
```

### 

### Branch 설명

- master : 최종 완료 시 업로드
- release : 테스트완료 된 코드 배포
- develop : 테스트용 코드 배포
- 기타 : 각 기능별 테스트 및 작업용

배포 순서 : 기타 브런치 작업 -> develop 브런치로 merge 후 테스트 사이트에서 확인 및 수정 -> release 브랜치에 merge -> 2주 스프린트 완료 후 master 브랜치로 push

### Git 규칙

- 기능 : 기능추가, 삭제, 변경
- 버그 : 버그 수정
- 리팩토링 : 코드 리팩토링
- 형식 : 코드형식, 정렬, 주석 변경
- 테스트 : 테스트 코드 추가, 삭제, 변경
- 문서 : 문서 추가, 삭제, 변경
- 기타 : 기타 사항들

예시

```
"기능 : K-Means 알고리즘 기능 추가"
"버그 : SearchPage 검색 누락 버그 수정"
"문서 : readMe 파일 수정"
```


