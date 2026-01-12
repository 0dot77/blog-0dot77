---
title: Daily Immersive - 029
summary: ""
tags: ["visionos", "arkit", "dailyimmersive"]
date: 2025-12-22
cover:
  image: "d-251222.jpeg"
  alt: ""
fmContentType: daily_post
---
## Work Structure

1. 엔티티 (물체)를 바라본다.
2. 3초간 혹은 Hover Effect를 사용해서 일정 조건을 걸기
3. 조건이 만족되면 내 오브젝트가 됨
4. 그때부터 내 눈의 위치를 따라옴

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기

- UX 적인 측면에서 바로 Immersive View로 진입하는 것을 추천하지 않는 것 같음

- `Entity.generateCollisionShapes(recursive: false)` 
    - false는 해당 엔티티 자신에게만 충돌 형태를 생성
    - true로 하면 재귀적으로 Entity의 자식들까지 충돌체를 형성함

- ECS
    - Entity / Component / System
        - Entity 객체의 정체성만 가짐 (매우 가벼움)
        - Component 엔티티에 부착되는 데이터
        - System 특정 컴포넌트 집합을 가진 엔티티들을 순회하며 업데이트 로직을 수행

- `Task { try? await session.run([worldInfo])}` 
    - try? 는 오류가 발생해도 크래시를 내지 않고 결과를 nil로 변환하여 무시
    - UI 를 그리는 메인 스레드를 막지 않기 위해서 try? await 구문을 사용함

---

## Result

[Daily Immersive - 029](https://youtu.be/3M96af_MCCY?si=sLCzpk_PaGptaNco)

---

## One Line Summary