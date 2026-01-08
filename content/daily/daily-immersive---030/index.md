---
title: Daily Immersive - 030
summary: ""
tags: ["unity", "metasdk", "dailyimmersive"]
date: 2025-12-23
cover:
  image: "d-251223.jpeg"
  alt: ""
fmContentType: daily_post
---
## Work Structure

1. 1초에 한 번씩 머리쪽에 머리 오브젝트 생성
2. 처음에는 메쉬로 생성
3. 3초 뒤에는 파티클화 되어 날아가는 효과로 사라지도록 하기

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기 

- 디테일 정리
  1. Center Eye Anchor를 추적
  2. 1초마다 프리팹을 해당 위치에 생성
  3. 생성되는 즉시 3초 카운트 다운 진행
  4. 3초가 되면, Mesh를 끄고 VFX 실행
  5. VFX 끝나면 메쉬 및 VFX 삭제

---

## Result

---

## One Line Summary