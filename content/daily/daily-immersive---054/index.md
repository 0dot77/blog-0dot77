---
title: Daily Immersive - 054
summary: ""
tags: ["unity", "dailyimmersive", "metasdk", "diffusion-algorithm"]
date: 2026-01-16T13:55:36.693Z
cover:
  image: "d-260116.jpeg"
  alt: ""
fmContentType: daily_post
---
## Work Structure

1. 허공에 핀치 진행
2. 핀치된 위치 검출
3. 해당 위치부터 라인 생성
4. 핀치가 끝나면 라인에서부터 나무처럼 가지 생성

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기 

- DLA 알고리즘 (Diffusion Limited Aggregation)
  - 프렉탈 성장 모델
  - 번개, 나무 가지, 산호, 눈송이 결정 등을 시뮬레이션 할 수 있음

- 공간 해싱 (SpatialHash3D)
  - 3D 공간을 균일한 격자로 분할
  - 각 셀에 해당 영역의 포인트 인덱스 저장
  - 쿼리 시에 해당 셀과 인접한 셀만 검색
    - 공간 해싱을 사용하면 O(1)으로 일정한 성능 유지 가능

- Bias (편향)
  - 성장 시스템에는 편향 수치가 붙음
  - 해당 편향 수치를 사용하면 프로시주얼한 객체, 즉 다양한 생장이 가능하도록 만듦

---

## Result

[Daily Immersive - 054, DLA Tree](https://youtu.be/yJRod1i6HTY?si=o0bqTpCizVrTvqRo)

---

## One Line Summary

DLA 알고리즘을 사용해봄. AI의 도움으로 각종 생물학, 물리학에서 사용하는 알고리즘을 쉽게 VR에 도입할 수 있게 된 것 같음. 여러 가지 실험이 중요한 때.