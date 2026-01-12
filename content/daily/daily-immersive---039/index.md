---
title: Daily Immersive - 039
summary: ""
tags: ["visionos", "swiftui", "dailyimmersive"]
date: 2026-01-01T07:58:31.409Z
cover:
    image: "d-260101.jpeg"
    alt: ""
fmContentType: daily_post
---
## Work Structure
1. 블랜더로 HAPPY NEWYEAR 풍선 같은 효과를 가진 3D 글씨 만들기
2. 글자를 View 공간에 올리기
3. 공간에 올라간 글자를 하나씩 핀치하기
4. 핀치하면 붉은 말로 오브젝트 변화시키기

변경

1. HAPPY 글씨 만들기 (Geometry Node 사용)
2. 텍스쳐링 해서 usdz로 아웃풋 뽑기
3. RCP (Realiy Composer Pro) 에서 오브젝트 및 텍스쳐 임포트
4. 시간에 의해서 노이지하게 움직임 만들어보기

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기

### 블랜더에서 풍선 효과 오브젝트 만들기

- edit mode -> select sharp edge
  - data tap에서 Group으로 묶어서 사용 가능 

- 옷이 부풀어 오르는 효과 만들기
  - 간단하게는 Sculp Mode에서 가능
  - Modifier 쪽에서 Cloth를 사용해서도 가능함

- 적용한 모디파이어 등을 그대로 놔두고 텍스트만 바꾸고 싶을 때
  - Geometry Node 사용하기
    - 비파괴 형식으로 작업할 수 있어서 엄청나게 유용함

- Geometry Node로 만든 작업물 익스포트하기
  - VisionOS는 .usdz 파일을 받음
  - Geometry Node도 Modifier와 같이 변경 사항을 적용해야 함

- Export 색깔 차이 보정하기
  - Blender에서 작업 후 usdz 로 내보낼 때 Texture의 색감차이가 심함
    - 블랜더에서 작업을 마치기보다는, 색감 조정이 필요하면 RCP에서 Shader를 쓰는게 더 나은 듯


### RCP Shader

- RCP Shader Graph에서 작업할 때는 항상 인스펙터를 신경써야 함
  - 타입을 자동으로 인지해서 캐스팅을 해주지 않기 때문에 현재로서는 Multiply 같은 기능을 작업할 때 항상 인풋의 값 개수를 잡아주어야 함

- Unity Shader 그래프처럼 RCP Shader 그래프에서도 충분히 움직임 작업이 가능함.
  - Positon, Normal, Time을 적절히 섞어서 작업


## Result

[Daily Immersive - 039, HAPPY](https://youtu.be/rU7IfguZc8c)

---

## One Line Summary

- Blender의 Geometry Node는 Touchdesigner 만큼이나 흥미로움
  - 외부 장치들과 연계해서 작업할 수 있는 방법도 찾아보면 좋을 것 같음
  - 파이썬을 바로 받을 수 있다는 것이 큰 장점인 것 같음