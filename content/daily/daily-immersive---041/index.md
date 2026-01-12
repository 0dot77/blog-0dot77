---
title: Daily Immersive - 041
summary: ""
tags: ["visionos", "ai", "dailyimmersive"]
date: 2026-01-03
cover:
  image: "d-260103.jpeg"
  alt: ""
fmContentType: daily_post
---
## Work Structure

1. Gemini -> Tripo3D를 사용해서 오브젝트 생성하기
2. 달걀 오브젝트를 공간에 올리기
3. 오브젝트를 탭하면 닭으로 변하기

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기 

### 이머시브 뷰 진입점 관리

```swift

import SwiftUI

@main
struct DailyImmersive_260103App: App {
    var body: some Scene {
        ImmersiveSpace(id:"immersiveSpace") {
            ImmersiveView()
        }
    }
}

```
- 바로 이머시브 뷰로 접근 가능


### 블랜더에서 메탈릭한 알 만들어보기 
  - Matcap
    - Matcap 이미지를 한 장 다운로드 받기
    - Blender 의 Shader 탭
      - Texture Coordinate (Normal) -> Vector Transform (World, Camera) -> Mapping -> Image(vector) -> BSDF(Emission Color)
        - Transform Coordinate (Normal)
          - 면이 바라보고 있는 각도 정보
        - Vector Transform
          - World -> Camera : 물체의 하이라이트(반광)이 항상 카메라쪽을 바라보게 됌
          - 하이라이트 위치는 조명 쪽에 고정되어있는 현상을 흉내냄
        - Mapping
          - Normal 벡터 좌표의 수치 범위와 이미지 텍스쳐의 수치 범위를 맞춰주는 과정

### 내부 엔티티 접근해서 작업하기

- Scene으로 접근해서 .findEntity(named:"")로 엔티티 찾기

- `.update {}`
  - Reality View의 상태가 변경될 때마다 호출되는 공간
  - 초기 `RealityView { content in }` 의 경우에는 한 번 수행

- `.gesture()` 모디파이어
  - 모디파이어의 경우에는 해당 모디파이어 안으로 쭉 메서드를 연결시킬 수 있음
  - 구조에 익숙하지 않으면 헷갈릴 수 있을 것 같음
  - 모디파이어 내부로 타입을 선택하고, 그 타입에 맞는 값들을 쭉 선택하고 기능을 추가하는 방식

```swift
.gesture(
    // 1️⃣ 제스처 타입 선택
    SpatialTapGesture()
    
        // 2️⃣ 제스처 설정
        .targetedToAnyEntity()  // 어떤 엔티티든 탭 가능
    
        // 3️⃣ 제스처 완료 시 실행할 코드 (클로저)
        .onEnded { value in
            // 이 부분이 클로저!
            // 제스처가 끝나면 이 코드가 실행됨
            let entity = value.entity
        }
)
```

- 메서드와 클로저
  - 간단하게 비유하면 당장 실행 vs 나중 실행

```swift
괄호 () vs 중괄호 {}:
   • () = 함수 호출 (지금 실행)
   • {} = 클로저 전달 (나중에 실행)
```

- `entity.position(relativeTo:nil)`
  - 여기에서의 realitveTo: 는 위치를 계산할 기준이 되는 엔티티를 지정할 수 있게 함
  - nil, parent, entity 를 사용할 수 있음

---

## Result

[Daily Immersive - 041, Egg and Chick](https://youtu.be/G3075zNFBPM)

---

## One Line Summary

기존에 다루던 시스템과 달라서 이것 저것 신경써야할 것들이 많지만, 생각보다 RCP는 직관적임