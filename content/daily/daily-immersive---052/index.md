---
title: Daily Immersive - 052
summary: ""
tags: ["unity", "dailyimmersive"]
date: 2026-01-14T01:47:47.762Z
cover:
  image: "d-260114.jpeg"
  alt: ""
fmContentType: daily_post
---
## Work Structure

1. 커스텀 렌더 패스 사용하기
2. 눈에 보여지는 것들을 아스키화 해보기
3. 패스스루와 분리된 화면을 만들어낼 수 있는가?

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기 

- `RenderPassEvent.BeforeRenderingPostProcessing`
  - URP에서 커스텀 렌더 패스가 실행될 시점을 결정하는 설정값
  - 내장 포스트 프로세싱 단계가 시작되기 전에 해당 효과를 실행함

- `ConfigureInput(ScriptableRenderPassIInput.Depth)`
  - 깊이 텍스쳐 요청

- `RecordRenderGraph()`
  - 렌더 그래프 시스템에서 하나 이상의 렌더 패스를 추가하고 구성하는 데 사용됨
  - Unity는 해당 메서드를 렌더 그래프 구성 단계 동안 매 프레임마다 호출함

- `Blit`
  - Bit Block Transfer
  - 한 이미지나 텍스쳐의 픽셀 데이터를 다른 이미지나 텍스쳐로 복사하는 작업을 의미함
    - 기본적으로 메모리의 한 영역에서 다른 영역으로 그래픽 데이터를 전송함
  - `Graphics.Blit`
    - 렌더 텍스쳐를 복사하고 스케일을 조정하는 데에 사용함
    - 셰이더를 사용하면서 복사할 수 있어서 포스트 프로세싱에 유용함
  - `Blit.BlitTexture`
    - CommandBuffer를 통해 GPU에 랜더링 명령을 전달함
  - CPU 개입 없이 GPU로 효율적으로 처리함

- `UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(input);`
  - 유니티 VR에서 양안 렌더링에 필수적인 메서드

---

## Result

[Daily Immersive - 052 ASCII Custom Rendering](https://youtu.be/2dazEHMlCmo?si=BdzJ43hQ_LMrV3bP)

---

## One Line Summary