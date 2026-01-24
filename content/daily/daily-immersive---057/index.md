---
title: Daily Immersive - 057
summary: ""
tags: ["visionos", "swiftui", "dailyimmersive"]
date: 2026-01-19
cover:
  image: ""
  alt: ""
fmContentType: daily_post
---
## Work Structure

1. 두 손 인식
2. 두 손의 핀치 인식 및 위치 추적
3. 핀치 동작 시, 텍스트 생성
4. 텍스트가 바닥으로 떨어짐
5. Scene Reconstruction으로 메시 생성
6. 생성된 메시위로 텍스트가 쌓임
7. 텍스트는 Emission 처리

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기 

- `.preferredSurroundingsEffect(.dark)`
  - 패스스루를 어둡게 처리해줌

- 텍스트 발사 시 약간의 모션 적용
  - `PhysicsMotionComponent.linearVelocity` 로 설정


- Mixed Reality Material 선택

| Material | 용도 | 특징 |
|----------|------|------|
| `OcclusionMaterial` | 가상 객체가 실제 물체 뒤로 숨김 | 투명하지만 depth 기록 |
| `PhysicallyBasedMaterial` | 발광, 반사 효과 | `emissiveColor` 지원 |
| `UnlitMaterial` | 조명 영향 없는 색상 | 단순 색상 표시 |
| **No Material** | 물리 충돌만 필요 | `CollisionComponent`만 사용 |

- 떨어지는 객체와 가만히 존재하는 객체의 콜라이더 구성
  - 떨어지는 객체는 `PhysicsBodyComponent` 부분의 모드를 `.dynamic`으로 처리

---

## Result

---

## One Line Summary

하나의 인터랙션에서도 다양한 이펙트나 작업을 만들어낼 수 있음. 리소스를 가장 적게 사용하면서도 임펙트가 있는, 짧은 시간 안에 경험을 만들어낼 수 있는 방법을 꾸준히 고안해야함