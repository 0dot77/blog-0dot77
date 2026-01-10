---
title: Daily Immersive - 047
summary: ""
tags: ["visionos", "dailyimmersive"]
date: 2026-01-09
cover:
  image: "d-260109.jpeg"
  alt: ""
fmContentType: daily_post
---
## Work Structure

1. 오브젝트 하나 만들어서 불러오기
2. UI Silder 제작하기
3. 슬라이더에 맞게 오브젝트가 길어지게 하기

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기 

- Slider 붙이기
  - Immersive 공간에서는 `attachments` 를 사용해서 붙여주어야 함

- RealityKitBundle에서 에셋 불러올 때

```swift
// 1 : if let 사용

lf let model = Enttiy(named:"Cube", in: RealityKitContentBundle) {
    content.add(model)
    // 스코프가 if 안으로 한정됌
}

// 2 : guard let 사용

guard let model = Entity(named:"Cube", in: RealityKitContentBundle) else { return }
// 스코프를 더 넓게 사용할 수 있음

- RCP에서 Z가 Y축

```

---

## Result

---

## One Line Summary

Slider를 사용해서 사용자 UI 시스템도 변하게 만들 수 있음