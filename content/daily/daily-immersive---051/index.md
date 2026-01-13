---
title: Daily Immersive - 051
summary: ""
tags: ["visionos", "dailyimmersive"]
date: 2026-01-13T04:31:14.429Z
cover:
  image: "d-260113.jpeg"
  alt: ""
fmContentType: daily_post
---
## Work Structure

1. ARKit을 활용해 핀치 인터랙션 잡기
2. 위치 추출하여 해당 위치에 랜덤한 텍스트 팝업

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기 

- Bilboard 기능
  - 텍스트를 사용할 때 항상 따라오는 기능
  - 카메라를 기준으로 텍스트나 UI가 항상 카메라를 바라보도록 함

```swift
private let handUpdatesContinuation: AsyncStream<HandUpdate>.Continuation
let handUpdates: AsyncStream<HandUpdate>
```
- AsyncStream
  - 비동기 데이터를 순차적으로 전달하는 스트림
  - `for await`로 데이터를 받을 수 있음

- Continuation?
  - 스트림에 데이터를 넣는 쪽의 인터페이스
  - `yield()` 로 새 값을 스트림에 밀어넣음

- `extension` 키워드
  - 기존의 타입에 새로운 기능을 추가하는 swift 기능
  - 원본 소스 코드 없이 확장 가능

- `extension`의 용도
```swift
// 1. 계산 프로퍼티 추가
extension String {
    var isValidEmail: Bool { ... }
}

// 2. 메서드 추가
extension Int {
    func squared() -> Int { self * self }
}

// 3. 프로토콜 채택
extension MyType: Codable { }
```

---

## Result

[Daily Immersive - 051, Texts Trailing](https://youtu.be/W4ZIFaZnGhk)

---

## One Line Summary

코드 수준에서는 모르는 문법, 사용법들에 집중하고, 전반적인 설계를 신경쓰기