---
title: Daily Immersive - 006
summary: ""
tags: ["unity", "metasdk", "dailyimmersive"]
date: 2025-11-21
cover:
  image: "d-251121.jpeg"
  alt: ""
fmContentType: daily_post
---
## Work Structure

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기 

- GPU Event를 활용한 작업 진행
- Single Burst
    - LifeTime 조합을 사용해서 허공에 이펙트를 지속해서 존재시킬 수 있음
- Trigger Event
[Events | Visual Effect Graph | 7.1.8](https://docs.unity3d.com/Packages/com.unity.visualeffectgraph@7.1/manual/Events.html)
- GPU Event
    - 다른 입자를 기반으로 파티클 스폰을 가능케 함
        - Trigger Event On Die
            - 입자가 죽으면 다른 시스템 N 개의 입자가 생성
        - Trigger Event Rate
            - 시스템에서 입자를 기준으로 초당 N개의 입자
        - Trigger Event Always
            - 매 프레임마다 N개의 입자 생성
        - Over Time
          - 시간 기반 모드
          - Rate 값을 활용해서 초 당 몇 번 이벤트가 발생할지 제어
        - Over Distance
          - 파티클이 일정 거리를 이동할 때마다 이펙트 발생

---

## Result

[Daily Immersive - 006](https://youtu.be/wwS6L4Jfvos?si=HHfTt1HL3oRxdSok)

---

## One Line Summary