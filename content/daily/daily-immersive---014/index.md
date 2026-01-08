---
title: Daily Immersive - 014
summary: ""
tags: []
date: 2025-12-07
cover:
  image: "d-251207.jpeg"
  alt: ""
fmContentType: daily_post
---
## Work Structure

1. PLY 파일을 텍스쳐 맵으로 만들기
2. VFX에서 불러와 포인트 클라우드 형태로 만들기
3. 손가락을 활용해서 포인트 클라우드에 변화를 주기

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기 

# 텍스쳐, 컬러맵 베이킹하기

- 유니티 자체적으로는 ply 못받음
    - 간단하게는 포인트 파일을 메쉬 형태로 변환한 뒤에, 텍스쳐 입혀서 PCache 툴을 사용하기

- VFX
  - Texture를 사용할 때의 유의할 점
      - 파티클의 위치를 기준으로 인터랙티브를 만들고자 할 때 트랜스폼이 문제가 될 수 있음
          - VFX의 경우에는 Local을 기준으로 정렬하기 때문에 Scene에서 인터랙티브 할 World 좌표 기준을 가진 오브젝트를 끌고 들어오면 좌표계가 안맞음
          - Initialize Particle 부분에서 그냥 월드로 맞춰주면 좌표 정렬이 손쉽게 됌
              - 단순하게는 처리했지만, 이후에 효과가 들어가면 또 달라질듯 함
    - 우선 로컬 기준으로 작업을 해야 조금 속도가 나는 것 같음
        - 위의 포지션 맵에서 조절할 수 있는 것들을 실제 포인트 클라우드가 위치해야할 위치에 지정하기
    - 인터랙션을 사용한다면 인터랙티브가 될 오브젝트의 위치를 포지션 값으로 받아와서 사용하는 것이 필요함
        - 이때도 VFX 자체가 로컬 값을 사용하기 때문에 `ChangeSpace` 노드를 사용해서 월드 포지션 값을 로컬로 바꾸어서 들어와야 함

---

## Result

[Daily Immersive - 014](https://youtu.be/r18gfGXtIhY?si=riWhUlMgmBvu5MNP)

---

## One Line Summary