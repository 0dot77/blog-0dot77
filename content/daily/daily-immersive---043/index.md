---
title: Daily Immersive - 043
summary: ""
tags: ["visionos", "dailyimmersive", "audiovisual"]
date: 2026-01-05
cover:
  image: "d-260105.jpeg"
  alt: ""
fmContentType: daily_post
---
## Work Structure

1. 사운드 파일 임포트 하기
2. 데이터화 진행
   1. 음악 재생
   2. 믹서 통과
   3. 1024 샘플마다 tap 발동
   4. buffer에 오디오 데이터 담김
   5. 진폭/주파수 분석
3. 간단한 오디오 리액티브 구현

---

## JUST DO IT 
> 모르거나 헷갈리는 것을 정리하며 나아가기 

- `.update : {content in}`
  - 상태가 바뀔 때마다 한 번씩 호출됌
  - 메인 스레드에서 실행되기 때문에 무거운 작업은 피하는 것이 좋음

- App Bundle
  - 앱을 설치할 때 같이 포장되는 것들

- Audio를 다룰 때 필요한 패키지
  - AVFoundation
  - Accerlate
    - 오디오 연산에 사용

- 오디오 자체를 받아서 오브젝트에 넣어주고, 부드러운 움직임 처리는 따로 해주어야 함

---

## Result

[Daily Immersive - 043, Audio Reactive](https://youtu.be/aeVGrXNCljY)

---

## One Line Summary

구현 자체는 생각보다 어렵지 않지만, 보기 좋게 만들기에는 확실히 시간이 걸림