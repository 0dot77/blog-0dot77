---
title: Daily Immersive - 058
summary: ""
tags: ["unity", "dailyimmersive", "metasdk"]
date: 2026-01-20
cover:
  image: "d-260120.jpeg"
  alt: ""
fmContentType: daily_post
---
## Work Structure

1. 핀치 후 텍스트 생성
2. 핀치를 유지하며 일정한 간격으로 랜덤한 음절 생성
3. 핀치를 내려 놓으면 첫 음절과 끝 음절이 고정됨
4. 나머지 중간의 음절들은 중력의 영향을 받아 떨어짐

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기 

- 사용된 시뮬레이션
  - Verlete Integration (AI 추천)
    - 속도 변수 불필요
    - 자연스러운 감쇠
    - 안정적인 제약 조건
  - 위의 시뮬레이션에서는 시뮬레이션 속도를 명시적으로 저장하지 않아도 `Poisition - PreviousPosition` 으로 계산이 가능함
    - 데이터 구조가 단순화됨
    - 외부 힘 이용이 직관적
    - 감쇠가 자연스럽게 작용함

- 상태 머신 패턴 사용
```csharp
public enum RopeState
{
    Idle,
    Drawing,
    Trasitioning,
    Simulating
}
```

- 결국 인터랙티브는 상태의 예술인 것 같음
  - 어떤 상태에 있느냐를 명확하게 파악하는 것이 중요 (관객의 관람 상태)
  - 특정 상태에 대한 지속적이고 다양한 피드백을 건네면 건낼 수록 자연스럽게 머무는 시간이 증가함

---

## Result

[Daily Immersive - 058, Pinch Texts and apply gravitiy](https://youtu.be/-ylJUjOf_iI)

---

## One Line Summary

물리 시뮬레이션을 AI를 활용해서 구현이 쉬워졌으니, 어떤 종류가 있는지 파악해보기