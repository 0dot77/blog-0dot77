---
title: Daily Immersive - 005
summary: ""
tags: []
date: 2025-11-20
cover:
  image: "d-251120.jpeg"
  alt: ""
fmContentType: daily_post
---
## Work Structure

1. 다중 볼륨 사용해보기

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기 

- @Environment
    - Swift의 프로퍼티 레퍼 Property Wrapper 중 하나
        - 시스템이나 부모 뷰에서 제공하는 환경 값에 접근 할 수 있게 해줌

```swift
App
 └─ WindowGroup
     └─ ContentView ← 여기서 @Environment로 값을 읽을 수 있음
         └─ ChildView ← 여기서도 같은 환경 값에 접근 가능
```

- App 수준에서 `WindowGroup` 을 사용하고 있기 때문에 해당 프로퍼티 레퍼를 사용할 수 있는 것임

---

## Result

[Daily Immersive - 005](https://youtu.be/mf9MDjzS9k8?si=6bcAFBwkxMCEf2Y8)

---

## One Line Summary