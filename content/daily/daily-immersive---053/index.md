---
title: Daily Immersive - 053
summary: ""
tags: ["visionos", "dailyimmersive", "arkit"]
date: 2026-01-15T02:41:14.303Z
cover:
  image: "d-260115.jpeg"
  alt: ""
fmContentType: daily_post
---
## Work Structure

1. 공간에 핀치하기
2. 핀치한 공간에서 텍스트 생성
3. 1-3초 대기 후 낙하
4. 낙하 하면서 일정한 간격을 두고 텍스트 자취 생성
5. 인식된 바닥에 닿으면 충돌

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기 

- ECS 패턴 구현
  - 엔티티 자체는 로직이 없음
    - 컴포넌트를 묶어주는 역할만 함
  - 컴포넌트는 상태 관리를 위해 구현
    - 순수 데이터만 저장
  - 실질적인 로직은 System에서 구현

- OOP와의 비교
  - OOP : 객체가 자신의 데이터 + 로직을 소유
    - 객체가 자신을 업데이트 함
      - Unity Monobehaviour의 `update()` 로직
  - ECS : 데이터(컴포넌트)와 로직(System) 분리
    - 컴포넌트는 데이터만 갖고 있고, System이 한 번에 처리함

```
oop
class FallingText {
    var position: SIMD3<Float>
    var isFalling: Bool = false
    var elapsedTime: Float = 0

    // 자기 자신이 로직을 가짐
    func update(deltaTime: Float) {
        elapsedTime += deltaTime
        if elapsedTime > waitTime {
            isFalling = true
            fall()
        }
    }

    func fall() {
        position.y -= 0.1
    }
}

// 사용
let textA = FallingText()
let textB = FallingText()
textA.update(deltaTime: 0.016)  // A가 자기 자신을 업데이트
textB.update(deltaTime: 0.016)  // B가 자기 자신을 업데이트

---
ECS
// Component: 데이터만
struct TextTrailComponent: Component {
    var isFalling: Bool = false
    var elapsedTime: Float = 0
}

// System: 로직만
class FallingTextSystem: System {
    func update(context: SceneUpdateContext) {
        // 모든 엔티티를 시스템이 일괄 처리
        for entity in context.entities(matching: query, ...) {
            var component = entity.components[TextTrailComponent.self]!
            component.elapsedTime += deltaTime
            // ...
            entity.components[TextTrailComponent.self] = component
        }
    }
}

```

- 효율
  - OOP의 경우에는 객체가 메모리에 흩어져있음
  - ECS의 경우에는 같은 타입 Component가 연속 메모리에 배치 (캐시 효율)

---

## Result

[Daily Immersive - 053, Falling Texts](https://youtu.be/l1uPzxiQEgg)

---

## One Line Summary

코드를 이해하는 것도 중요하지만 시스템 설계 철학에 조금 더 가까이 다가가보는 것도 좋음