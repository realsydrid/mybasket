# 🛒 쿠팡 장바구니 프로젝트


## [프로젝트 소개]


- 로그인 된 유저의 정보를 확인하고, 해당 유저의 고객정보 페이지와 장바구니 페이지를 구현  
- AJAX를 활용한 데이터 통신과 HTML의 이동만을 사용해 구현 시도  
- 실제 쿠팡의 장바구니 홈페이지의 스타일을 가져와서 구현  


## [사용기술]


- HTML5  
- CSS3  
- JavaScript  
- JSON  


## [화면구성]


- 로그인 페이지  
- 사용자 정보 페이지  
- 장바구니 페이지  


## [페이지별 주요 기능]


### 1. 로그인 페이지  



- 사용자 인증 시스템  
    - 아이디 존재 여부 확인 (없는 아이디 입력 시 alert)  
    - 비밀번호 일치 여부 확인 (틀린 비밀번호 입력 시 alert)  
    - 로그인 성공 시 해당 사용자의 정보 페이지로 자동 이동  
- 테스트 계정  
    - User1 = { ID : isy , PW : i123}  
    - User2 = { ID : karina , PW : k123}
    - 로그인페이지 링크 :  
    <https://realsydrid.github.io/mybasket/login.html>  


### 2. 사용자 정보 페이지


- 개인 정보 표시  
    - 해당 아이디에 맞는 JSON을 불러와 개인 정보 데이터 출력  
- 장바구니 페이지 연동  
    - 해당 아이디에 맞는 장바구니 페이지로 이동  


### 3. 장바구니 페이지


- 상품 관리 기능  
    - 상품 수량 조절  
        - +,- 버튼으로 수량 조절  
        - 직접 입력으로 수량 조절 (최대 개수 999개 제한, 숫자 이외 입력 방지, 0 입력 시 1로 변환)  
        - 수량 변경 시 상품 금액 실시간 반영  
    - 상품 선택 기능  
        - 개별 상품 선택/해제  
        - 전체 선택/해제  
        - 선택된 상품 개수 실시간 표시  
    - 상품 삭제 기능  
        - 개별 상품 삭제  
        - 선택된 상품 일괄 삭제  
- 주문 관리 기능  
    - 주문 금액 계산  
        - 선택된 상품의 총 금액 실시간 계산  
    - 배송 정보  
        - 내일 도착 예정(날짜) 표시  
- 추천 상품 기능  
    - 추천 상품 목록 표시  


## [프로젝트 구현 도메인]


### 🔗 https://realsydrid.github.io/mybasket/login.html



## [이 프로젝트를 진행하며 학습한 점]


- JavaScript 비동기 처리  
    - async/await 활용  
    - 여러 JSON 파일의 비동기 로딩 처리  
    - Promise.all을 활용한 동시 요청 처리  
- 이벤트 처리  
    - 동적으로 생성된 요소들의 이벤트 처리 방법  
        - 일일이 이벤트 리스너를 추가하지 않고 장바구니 컨테이너에 이벤트를 위임  
- 디버깅 문제 해결  
    - 개발자 도구 활용  
        - Console을 통한 디버깅 방법  
    - 에러 처리 방법  
        - try-catch를 활용해 에러 핸들링  
- JSON 데이터 활용  
    - JSON을 활용해 데이터를 사용하는 방법  