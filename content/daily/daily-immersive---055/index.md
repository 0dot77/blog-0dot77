---
title: Daily Immersive - 055
summary: ""
tags: ["visionos", "dailyimmersive", "swiftui"]
date: 2026-01-17T16:28:48.408Z
cover:
  image: "d-260117.jpeg"
  alt: ""
fmContentType: daily_post
---
## Work Structure

1. 핀치 진행
2. 핀치된 위치 검출
3. 한글 음절 생성
4. 음절이 랜덤한 방향, 속도로 움직임
5. 움직일 때 일정한 거리로 음절 계속 생성
6. 움직이는 텍스트, 맨 먼저 간 텍스트가 Scene Mesh에 부딪힘
7. 부딪혔을 때 모든 텍스트 바닥으로 떨어짐
8. 바닥에 콜라이더 있어서 전체 텍스트가 바닥에 유지됨

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기 

- .task
  - 각 테스크는 독립적인 비동기 컨텍스트
  - 뷰가 사라지면 자동 취소됨

- `Observable` 매크로
  - Swift 5.9의 관찰 패턴
  - 세밀한 업데이트 추적 가능

- `@ObseravtionIgnored`
  - 불필요한 UI 업데이트 방지

- 디바운싱 debouncing
  - 의도치 않은 중복 입력 방지

---

## Result

[Daily Immersive - 055, Fire Texts and Collision](https://youtu.be/ADpiOF7nMAM)

---

## One Line Summary

실제 작업에서는 역시 디바운싱 같은 디테일 작업이 중요한 것 같음. 그리고 비동기 작업이 어떻게 이루어지는 지 지속적으로 학습 필요