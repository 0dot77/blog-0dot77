---
title: Daily Immersive - 037
summary: ""
tags: ["dailyimmersive", "visionos", "swfitUI"]
date: 2025-12-30
cover.image: ""
cover.alt: ""
fmContentType: daily_post
---
## Work Structure

1. 블랜더에서 하트 오브젝트 만들기
2. 쉐이더 변경해보기
3. vision os 프로젝트로 옮기기
4. 공간 가운데에 하트를 놓기
5. 바라보면 하트가 변화하도록 (색, 크기 등?)
6. 바라보고 핀치하면 하트가 바닥으로 떨어짐
   - 떨어질 때는 바닥을 인식해야하니까 Scene Reconstruction 필요

---

## Just DO IT

- 데이터 흐름 설계
  - 앱 시작 -> openImmersiveSpace(id:) 호출 -> ARKit 구동 -> 하트 생성 -> 핀치 인터랙션

- 모델 불러오고 사용하기 (ECS 시스템으로)
  - RealityKit : Unity 의 게임 오브젝트
  - Component : Entity에 붙여서 동작/데이터 추가
  - System : 씬에 등록되어 "특정 컴포넌트를 가진 엔티티 집합"을 매 프레임 업데이트
    - *중요 포인트는 System이 컴포넌트를 쿼리해서 갱신*

- 유니티와 비교해보기
  - Prefab 씬 배치, Add Component, Update
  - Asset Load/Clone + Components.set + System.update

- ECS 컴포넌스 시스템 이해하기
  - RCP(Reality Composer Pro) 에서 바로 존재하는 컴포넌트를 붙일 수도 있고, System 차원에서 제작한 뒤에 붙여줄 수 있음
  - 주로 System 폴더에 저장하는 것 같음
    - Component를 컴포넌트 프로토콜을 상속 받아 껍데기를 제작
      - 여기에는 실제 데이터가 들어간다고 생각하기
    - 그 뒤에, 시스템에서 해당 컴포넌트를 구현하는 방식
      - 데이터를 받아서 실제로 굴리는 역할

- ECS 시스템 참고 자료
  - [My First ECS](https://github.com/daniloc/MyFirstECS/tree/main)
---

## Result

---

## One Line Summary