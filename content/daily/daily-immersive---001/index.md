---
title: Daily Immersive - 001
summary: ""
tags: ["dailyimmersive", "unity", "metasdk"]
date: 2025-11-16
cover:
  image: "d-001.jpeg"
  alt: ""
fmContentType: daily_post
---
## Work Structure

1. 손가락 추적 해보기
2. 추적된 손가락에 VFX 얹어보기

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기 

- 손가락 추적
    - Building Block의 Hand Tracking을 사용했을 때 각 손가락의 위치를 가져오고 싶음
        - OVRSkeleton Script에서 전체 데이터를 쥐고 있음
- OVRBones
    - Bone의 위치를 가져올 때는 `bone.Transform.position` 을 사용해야 함
- Enum 사용
    - 클래스 안에 넣을 때는 해당 클래스 안에서만 의미가 있을 때
    - 클래스 밖으로 뺄 때는 전역으로 사용해야 할 때
- 손가락 데이터 얻어오기 
    - 손가락 데이터는 `OVRSkeleton.BoneId.Hand_ThumbTip` 에 없고, `OVRSkeleton.BoneId.XRHand_ThumbTip` 에 존재
        - 손가락 뼈 데이터는 OpenXR 포멧을 사용함
- Meta SDK v74 부터 Oculus가 아닌 OpenXR 패키지 사용
- Passthrough Recording
    - 공간 인식을 끄면 패스스루 레코딩 불가
    - 공간 제약이 없는 상태에서는 adb를 활용해서 레코딩 하는 방법이 있는 것 같음

---

## Result

[Daily Immersive - 001](https://youtu.be/UyiQe3xTy3A?si=WHPPDuIaolYR8Fa9)

---

## One Line Summary