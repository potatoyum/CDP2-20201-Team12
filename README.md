# :chart_with_upwards_trend: PECA(PEople Counting & Analysis, 피카)		
 라즈베리파이3 카메라 모듈로 분석한 유동인구를 웹 페이지에서 실시간으로 그래프로 시각화하여 나타내는 시스템.
 	
### :movie_camera: 데모 영상 - https://www.youtube.com/watch?v=ZDeJ9r8GLT4&feature=youtu.be
### :raising_hand: 수행 배경 및 기대 효과
  * 빅데이터 시장에서 유동인구 수요 증가
  * 저렴한 하드웨어(라즈베리파이)를 사용해 실제적인 측정 정보 획득 가능
  * 카메라 모듈에서 촬영한 영상이 아닌, 계산해낸 유동인구 값을 전송하므로 전송 부담 적음
  * 분석된 유동인구는 상권 분석, 마케팅, 교통 흐름 제어 등에 활용 가능
### :computer: 시스템 구조 및 흐름
  <img src="https://user-images.githubusercontent.com/44567793/86610613-8f8e3180-bfe8-11ea-9000-3d08f88ab855.JPG" width="830" height="380">
  <br/>
  :one:  각각 다른 장소에 있는 3대의 라즈베리 파이 카메라 모듈이 객체 탐지 알고리즘(Yolo-Tiny)을 통해 유동 인구를 측정한다.<br/>
  :two:   라즈베리 파이모듈에서 측정된 유동인구 수는 소켓 통신을 통해 서버에 전달된다. <br/>
  :three:   서버에선 전달 받은 데이터를 통계 내어 DB에 저장한다. <br/>
  :four:   서버는 웹 클라이언트의 요청이 있을 때마다 RESTful API를 통해 데이터를 전송한다. <br/>
  :five:   웹 클라이언트는 서버에서 전달받은 데이터를 이용하여 그래프를 렌더링하여 게시한다. <br/>
  
  ### :camera: 객체 탐지 결과
  * 81%의 높은 정확도를 보여줌<br/>
      <img src="https://user-images.githubusercontent.com/44567793/86614262-af742400-bfed-11ea-925b-27cb826e1f39.png" width="830" height="470"><br/>
  
  ###  :globe_with_meridians: 웹 페이지
  * 실시간 유동인구 및 당일 유동인구 추이 
        <img src="https://user-images.githubusercontent.com/44567793/86615236-2362fc00-bfef-11ea-9006-333aad05c035.png" width="600" height="430"><br/>

  * 날짜 / 구역별 유동인구 <br/>
          <img src="https://user-images.githubusercontent.com/44567793/86615632-af752380-bfef-11ea-8f64-998bfa04844c.png" width="600" height="360"><br/>
