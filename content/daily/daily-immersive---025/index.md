---
title: Daily Immersive - 025
summary: ""
tags: ["visionos", "dailyimmersive"]
date: 2025-12-18
cover:
  image: "d-251218.jpeg"
  alt: ""
fmContentType: daily_post
---
## Work Structure

1. 오브젝트를 바라보고 핀치하기
2. 오브젝트가 사라지면서 파티클 발산

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기 

- 제스쳐 관련
    - TapGesture()
    - SpatialGesture()
    - MagnificationGesture()
    - 등등 여러가지가 있음 한 번 조사할 필요 있음

- Input Trigger
    - 인풋을 받는 컴포넌트가 있어야 제스쳐 입력을 받음
    - 콜라이더 하나만으로는 제스쳐 입력 받을 수 없음
        - 이것도 쫌 헤맴

- Particle Timing
    - visionOS의 파티클 컴포넌트의 시간은 글로벌 시간을 따름
    - 유니티의 개발 방식과는 완전 딴판이라 많이 헤맴
        - 생각에 컴포넌트를 런타임에 추가하고 삭제하는 것이 비용이 많이 들 것이라고 생각했는데 ECS 시스템은 구조체를 삭제하고 추가하는 방식이라 아니라고 함 (클래스가 아니라서)
    - 심지어 파티클을 객체마다 따로 분리해서 생성해주었는데도 동일한 시간의 흐름에 갇혀있음
        - (처음에는 참조 떄문에 하나 동작하면 다른 것들이 동작하지 않는다고 생각했음) 참조가 끊어졌는데도 함께 시간을 공유함

---

## Result

[Daily Immersive - 025](https://youtu.be/eiHB2IiX2Bg?si=PYlDxyxxP2eNWT9u)

---

## One Line Summary