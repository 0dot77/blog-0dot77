---
title: Daily Immersive - 035
summary: ""
tags: []
date: 2025-12-28
cover:
  image: "d-251228.jpeg"
  alt: ""
fmContentType: daily_post
---
## Work Structure

1. 공간을 탭하기
2. 하트 오브젝트 만들기
3. 만든 하트 오브젝트를 공간에 떨어뜨리기

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기 

- 각각의 기능 분리하기

```swift
// Task 1: 초기화 (Initialization)
.task {
    do {
        await model.loadAssets() // [중요] 에셋 프리로딩 (아까 수정한 부분)
        
        // 데이터 프로바이더 지원 여부 확인 후 세션 시작
        if model.dataProvidersAreSupported && model.isReadyToRun {
            try await model.session.run([model.sceneReconstruction, model.handTracking])
        }
    } catch { ... }
}

// Task 2: 손 추적 루프 (Hand Tracking Loop)
.task {
    await model.processHandUpdates()
}

// Task 3: 메쉬 업데이트 루프 (Mesh Reconstruction Loop)
.task(priority: .low) { // [최적화] 낮은 우선순위
    await model.processReconstructionUpdates()
}
```

---

## Result

[Daily Immersive - 035](https://youtu.be/hotgouMC9Lc?si=ZHSdetxH8k_jxmyJ)

---

## One Line Summary