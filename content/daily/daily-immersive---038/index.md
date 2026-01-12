---
title: Daily Immersive - 038
summary: ""
tags: ["dailyimmersive", "unity", "metaSDK"]
date: 2025-12-31T11:22:07.691Z
cover:
  image: "d-251231.jpeg"
  alt: ""
fmContentType: daily_post
---
## Work Structure

1. 커스텀 랜더패스 구현하기
2. 열화상 카메라 효과 만들기
   1. 패스스루를 활용한 효과 제작

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기

- 커스텀 랜더 사용 방식

Unity 씬
    ↓
[URP Asset] - 전역 렌더링 설정
    ↓
[Renderer Asset] - 실제 렌더링 방식 정의
    ↓
[Renderer Features] - 커스텀 렌더 패스들
    ↓
[Render Passes] - 개별 렌더링 단계
    ↓
최종 화면

- Scriptable Renderer Feature
	- 커스텀 렌더 패스를 파이프라인에 등록하도록 함

- Scriptable Render Pass
	- 실제 랜더링 로직을 담당

- 패스스루 효과를 사용해보기
	- 간단하게 극대화된 효과를 만들 수 있음

---

## Result

---

## One Line Summary

패스스루 단계에서 줄 수 있는 효과들을 먼저 주고 그 뒤에 커스텀 랜더 패스로 넘어가도 괜찮음