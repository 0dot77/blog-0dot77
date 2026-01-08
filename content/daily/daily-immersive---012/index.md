---
title: Daily Immersive - 012
summary: ""
tags: ["unity", "dailyimmersive"]
date: 2025-12-05
cover:
  image: "d-251205.jpeg"
  alt: ""
fmContentType: daily_post
---
## Work Structure

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기 

- XR Hands Example을 활용해 개발
- Meta SDK의 Hand도 XR Hand로 전환이 이루어져 데이터를 받는 것까지 성공
- XR Hands의 Hand Gesture 씬에서는 데이터가 정상적으로 들어옴 + 제스쳐 인식까지 안정적임
    - 이상하게 Meta의 Hand를 사용하면 데이터는 들어오지만 Gesture가 인식 불능
- static gesture
    - 스와이프 같은 움직임 제스쳐는 XR Hand에서 인식 불가능
        - Meta SDK의 것을 사용하기
- 커스텀 제스쳐 디자인 시 고려 사항
    - 시각적 단서 제공
    - 툴팁 (빠르게 재생해서 익힐 수 있도록 제공)
    - 인식 가능한 제스쳐 사용
        - 일상에서 사용 가능한 제스쳐
    - 기억하기 쉬운 규칙 설계
    - UI 요소를 제스쳐와 결합할 때는 배치를 고려하기
        - 관절이 겹치면 트래킹 손상 가능
- Gesture Building Blocks

- 메타의 커스텀 Hand Pose로 다시 진행
    - Pose Debugger
    - PoseHand 쪽 Example을 찾아보면 손쉽게 커스텀 포즈를 만들 수 있음

- 오브젝트 풀링 시의 문제
    - 오브젝트를 꺼놨다가 키는 방식이다보니, 생성 위치가 달라져야 할 때 갑자기 앞에서 무언가 켜지는 느낌이 듦
    - 위치를 먼저 옮겨주고 키는 방식으로 해결 가능

---

## Result

[Daily Immersive - 012](https://youtu.be/jMF_D4COrQg?si=q58G5RrKGWCNpLzV)

---

## One Line Summary