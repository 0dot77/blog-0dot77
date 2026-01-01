---
title: Daily Immersive - 037
summary: ""
tags: ["dailyimmersive", "visionos", "swfitUI"]
date: 2025-12-30
cover:
    image: "d-1230.jpeg"
    alt: ""
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

- 메인 View에서 제스쳐, 혹은 호버링 참조에 엔티티 필요 시
    - 바라봤을 때의 호버링 이벤트는 Apple 측에서 막아둠

- 같은 오브젝트를 다중으로 쓰거나, 다른 방식으로 사용할 때 Component로 태그를 만들어서 관리
  - 같은 도메인 파일로 묶어서 Set 해서 사용하기
  
```swift
// HeartTags.swift

import RealityKit

struct HeartMainTagComponent: Component {}
struct SmallHeartTagComponet: Component {}

```
- 위의 태그 컴포넌트 묶음의 경우에는 데이터가 존재하는 컴포넌트나 시스템처럼 Register 해줄 필욘 없음
  - 태그는 컴포넌트이긴 하지만, 엔진 타입 테이블에 올릴 타입은 아님

- actor
  - 자기 안에 있는 데이터를 동시에 두 군데에서 접근하지 못하도록 막아줌
  - 호출 순서의 보장이 필요하기 때문에 `async` 를 사용해야 함

- 오브젝트 구조
  - 오브젝트의 컴포넌트의 구조에서 어떤 오브젝트에 컴포넌트를 붙이느냐에 따라 같은 계층 구조 내부라도 결과가 너무 달라짐
  - 계층 구조를 항상 염두하며 구성해야함

---

## Result

[Youtube - Daily Immersive 037 ECS with Hearts](https://youtu.be/Hvq3MyAzvo0)

---

## One Line Summary

- ECS 시스템에 적응할 때까지 시간이 좀 걸릴 것 같음
  - 유니티 같은 게임 엔진이 아니기 때문에 생각보다 수작업으로 해주어야 하는 일들이 많음
  - 하지만 재밌음