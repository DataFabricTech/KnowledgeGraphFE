# Data Fabric 지식그래프 시각화 프론트엔드

> ## 저장소 상태
>
> 본 저장소는 아래 과제의 **1단계(2023~2024)** 지식그래프 구성요소입니다.
> 관계 데이터 간 유사 속성 분석 기능은 2단계에서 Recommender 저장소의
> 유사 속성 탐지 모듈로 계승되었습니다.
>
> - 과제명: 분산된 데이터에 대한 논리적 데이터 통합과 복합분석을 지원하는 데이터 패브릭 기술개발
> - 과제번호: RS-2023-00222191
> - 개발 기간: 2023년 12월 ~ 2024년 12월
> - 계승 저장소: https://github.com/DataFabricTech/Recommender

## 개요

데이터 패브릭 플랫폼에서 데이터 간 관계를 그래프로 탐색하기 위한 프론트엔드 저장소입니다.
그래프 렌더링 라이브러리와, 그 라이브러리를 사용하는 데모 애플리케이션으로 구성됩니다.

## 저장소 구성

| 디렉터리 | 설명 | 기술 스택 |
|---|---|---|
| `knowledge-graph-canvas` | 그래프 렌더링 라이브러리입니다. 네트워크 다이어그램과 카테고리 그래프 두 가지 뷰를 제공합니다. | TypeScript, ELK.js, RBush, Rollup |
| `knowledge-graph-canvas-example` | 위 라이브러리의 사용 예제입니다. | TypeScript, Webpack |
| `demo-app` | 다양한 데이터를 그래프로 탐색하는 방안을 검토하기 위한 데모 애플리케이션입니다. | Next.js 13, React 18, Cytoscape, D3 |
| `feature-demo` | 시각화 그래프의 개별 기능을 시연하기 위한 애플리케이션입니다. | Next.js 13, React 18, Cytoscape |
| `klayjs-demo` | 그래프 자동 배치(layout) 알고리즘을 비교 검토한 데모입니다. | Next.js 14, React 18 |

## 빌드 및 실행

### 요구 사항

- Node.js 18 이상
- npm

### 렌더링 라이브러리

```bash
cd knowledge-graph-canvas
npm install
npm run build
```

빌드 결과는 `dist/`에 생성됩니다. CommonJS(`index.js`)와 ES Module(`index.esm.js`) 두 형식을 함께 제공합니다.

### 데모 애플리케이션

`demo-app`, `feature-demo`, `klayjs-demo`는 모두 동일한 방식으로 실행합니다.

```bash
cd demo-app
npm install
npm run dev
```

기본 포트는 3000번입니다.

## 라이선스

Apache License 2.0을 따릅니다. 자세한 내용은 [LICENSE](LICENSE)를 참고하십시오.
