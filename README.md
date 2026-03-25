## ☕ Grids & Circles
* 카페 메뉴 관리 서비스
--- 

## 🥤 프로젝트 소개
* 작은 로컬 카페 'Grids & Circles'의 원두 주문을 소비자 친화적으로 하기 위한 온라인 주문 관리 시스템 서비스입니다.

---

## 📚 프로젝트 개요
* 이 서비스는 24시간 언제 어디서나 고객이 편하게 원두를 주문할 수 있는 온라인 접점을 마련하는데 목적이 있습니다.
* 고객들은 온라인 웹사이트를 통해 커피 원두 패키지를 주문합니다.
* 판매자는 매일 전날 오후 2시부터 당일 오후 2시까지의 주문을 모아서 처리합니다 별도의 회원 가입은 없으며, 주문 시 이메일 주소를 받아 고객을 구분합니다.
* 한 고객이 하루에 여러 번 주문하더라도, 하나의 주문으로 합쳐 다음 날 배송합니다.

---
## 🎉 설치 방법
1단계 : 먼저 리포지토리를 클론합니다.

```bash
git clone https://github.com/prgrms-be-devcourse/NBE9-11-1-Team07
```
---
2단계: Backend 폴더를 IDE로 서버를 실행 시킵니다.
```bash
cd Backend
```
---
3단계 : Frontend 폴더를 가시고 패키지를 설치합니다.
```bash
npm install
```
---
4단계 : Frontend 폴더 안에 `.env`파일 설정
* 프로젝트 루트에 `.env` 파일을 만들고 아래처럼 **NEXT_PUBLIC_API_BASE_URL** 값을 입력해 주세요
```plaintext
NEXT_PUBLIC_API_BASE_URL="http://localhost:8080"
```
---
5단계 : Frontend 폴더를 실행 시킵니다.
```bash
npm run dev
```
이제 웹 브라우저에서 `http://localhost:3000`에 접속해 보세요!

---
## 📂 프로젝트 구조

```text
Backend/
├─ src/
│  ├─ main/
│  │  ├─ java/com/decaf/
│  │  │  ├─ DecafApplication.java            
│  │  │  ├─ domain/
│  │  │  │  ├─ admin/                          
│  │  │  │  │  ├─ controller/
│  │  │  │  │  ├─ dto/
│  │  │  │  │  ├─ entity/
│  │  │  │  │  ├─ repository/
│  │  │  │  │  └─ service/
│  │  │  │  ├─ user/                           
│  │  │  │  │  ├─ controller/
│  │  │  │  │  ├─ dto/request/
│  │  │  │  │  ├─ dto/response/
│  │  │  │  │  ├─ entity/
│  │  │  │  │  ├─ repository/
│  │  │  │  │  └─ service/
│  │  │  │  ├─ product/                        
│  │  │  │  │  ├─ controller/
│  │  │  │  │  ├─ dto/
│  │  │  │  │  ├─ entity/
│  │  │  │  │  ├─ repository/
│  │  │  │  │  └─ service/
│  │  │  │  ├─ order/                          
│  │  │  │  │  ├─ controller/
│  │  │  │  │  ├─ dto/
│  │  │  │  │  ├─ entity/
│  │  │  │  │  ├─ repository/
│  │  │  │  │  └─ service/
│  │  │  │  ├─ orderItem/                
│  │  │  │  │  ├─ dto/
│  │  │  │  │  ├─ entity/
│  │  │  │  │  ├─ repository/
│  │  │  │  │  └─ service/
│  │  │  │  └─ file/                          
│  │  │  │     └─ FileService.java
│  │  │  └─ global/
│  │  │     ├─ config/                   
│  │  │     ├─ entity/                      
│  │  │     ├─ exception/                    
│  │  │     ├─ initData/                    
│  │  │     ├─ rs/                          
│  │  │     ├─ springDoc/                     
│  │  │     └─ webMvc/                        
│  │  └─ resources/
│  │     ├─ application.yml                  
│  │     ├─ application-dev.yml        
│  │     └─ application-test.yml              
│  └─ test/
│     └─ java/com/decaf/
│        └─ DecafApplicationTests.java         
├─ gradle/                               
├─ uploads/                                  
├─ build/                                   
├─ db_dev.mv.db                              
├─ build.gradle.kts                            
├─ settings.gradle.kts                         
├─ gradlew
└─ gradlew.bat
```

## 🎬 프로젝트 기능 구현 영상
**주요기능**
* 상품 고르고 주문페이지에서 이메일,주소,우편번호에 알맞게 주문
* 이메일에 알맞는 주문목록 확인
* 관리자 로그인 및 개별 회원 주문 확인
* 관리자 상품 등록,수정,삭제

---
💳 **상품주문**

![bandicam2026-03-2416-46-07-238-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/6a04f969-cdbc-4f66-a4cd-e7aa27326a79)

---
📋 **주문 조회**

![bandicam2026-03-2416-46-34-969-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/26f5fb01-1b87-4595-a11c-2515231f8ebd)

---
🔐 **관리자 로그인 및 관리**

![bandicam2026-03-2417-02-18-525-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/9ccd014c-c08e-4cbb-9f9d-d75e214bc12f)

---
🏷️ **관리자 상품 등록**

![bandicam2026-03-2417-03-20-081-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/b5154960-21db-4abd-8842-0eb98b91643f)

---
## API 문서
* API 문서: [Swagger](http://localhost:8080/swagger-ui/index.html)
* 회원 API
  <img width="1306" height="318" alt="image" src="https://github.com/user-attachments/assets/8d22fa0e-dae6-41a3-9360-a294417785b5" />
* 상품 API
  <img width="1310" height="339" alt="image" src="https://github.com/user-attachments/assets/0df8be26-7cf0-4307-b95d-dad746b8ffa0" />
* auth API
  <img width="1297" height="213" alt="image" src="https://github.com/user-attachments/assets/951493ed-90eb-4513-b72f-6d08b56d6c82" />
* 주문 API
  <img width="1308" height="487" alt="image" src="https://github.com/user-attachments/assets/6c20c2c2-67fb-4998-8380-2b91a1ec15d7" />
---
## 와이어프레임
* 와어어프레임 : [피그마](https://www.figma.com/design/TtM6g37kWCzLnPd7pZ78h5/%EB%8B%A4%EC%B9%B4%ED%8E%98%EC%9D%B8_%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?node-id=0-1&t=PooysCdHUwZzXQ15-1)


---

### commit message 
|type|description|
|:-:|---|
|feat|새로운 기능 추가|
|fix|버그 수정|
|docs|문서 수정 (README.md 등)|
|style|코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)|
|refactor|코드 리팩토링 |
|test|테스트 코드 추가 및 수정|
|chore|빌드 업무 수정, 패키지 매니저 설정 등 (기타 작업)|





