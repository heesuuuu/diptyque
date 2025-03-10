# SCSS 모듈과 Tailwind CSS 조합 가이드

## 목차

1. [프로젝트 구조](#프로젝트-구조)
2. [전역 SCSS 파일 설정](#전역-scss-파일-설정)
3. [SCSS 모듈 사용법](#scss-모듈-사용법)
4. [Tailwind CSS와 SCSS 함께 사용하기](#tailwind-css와-scss-함께-사용하기)
5. [SCSS 변수 활용 방법](#scss-변수-활용-방법)
6. [믹스인(Mixins) 활용 방법](#믹스인mixins-활용-방법)
7. [팀 컨벤션](#팀-컨벤션)

## 프로젝트 구조

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.jsx
│   │   └── Button.module.scss
│   └── ...
├── styles/
│   ├── _variables.scss    # 전역 변수 정의
│   ├── _mixins.scss       # 믹스인 정의
│   ├── global.scss        # 전역 스타일
│   └── ...
└── ...
```

## 전역 SCSS 파일 설정

### \_variables.scss

이 파일은 프로젝트 전체에서 사용할 변수들을 관리합니다:

```scss
// 색상
$primary-color: #3498db;
$secondary-color: #2ecc71;
$accent-color: #e74c3c;
$text-color: #333333;
$bg-color: #f9f9f9;

// 폰트
$font-family-base: 'Pretendard', sans-serif;
$font-size-base: 16px;
$font-size-sm: 14px;
$font-size-lg: 18px;

// 간격
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;

// 반응형 브레이크포인트
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;

// Z-인덱스 레벨
$z-index-dropdown: 1000;
$z-index-sticky: 1020;
$z-index-modal: 1030;
$z-index-tooltip: 1040;
```

### \_mixins.scss

재사용 가능한 스타일 패턴을 믹스인으로 정의합니다:

```scss
// 반응형 미디어 쿼리 믹스인
@mixin responsive($breakpoint) {
  @if $breakpoint == sm {
    @media (min-width: $breakpoint-sm) {
      @content;
    }
  } @else if $breakpoint == md {
    @media (min-width: $breakpoint-md) {
      @content;
    }
  } @else if $breakpoint == lg {
    @media (min-width: $breakpoint-lg) {
      @content;
    }
  } @else if $breakpoint == xl {
    @media (min-width: $breakpoint-xl) {
      @content;
    }
  }
}

// Flex 레이아웃 믹스인
@mixin flex($direction: row, $justify: flex-start, $align: stretch, $wrap: nowrap) {
  display: flex;
  flex-direction: $direction;
  justify-content: $justify;
  align-items: $align;
  flex-wrap: $wrap;
}

// 그리드 레이아웃 믹스인
@mixin grid($columns: 1fr, $rows: auto, $gap: $spacing-md) {
  display: grid;
  grid-template-columns: $columns;
  grid-template-rows: $rows;
  gap: $gap;
}

// 트랜지션 믹스인
@mixin transition($property: all, $duration: 0.3s, $timing: ease) {
  transition: $property $duration $timing;
}

// 그림자 믹스인
@mixin shadow($level: 1) {
  @if $level == 1 {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  } @else if $level == 2 {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  } @else if $level == 3 {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
}

// 스크롤바 스타일링 믹스인
@mixin custom-scrollbar($width: 8px, $track-color: #f1f1f1, $thumb-color: #888) {
  &::-webkit-scrollbar {
    width: $width;
  }

  &::-webkit-scrollbar-track {
    background: $track-color;
  }

  &::-webkit-scrollbar-thumb {
    background: $thumb-color;
    border-radius: $width / 2;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: darken($thumb-color, 10%);
  }
}

// 말줄임표 믹스인
@mixin ellipsis($lines: 1) {
  @if $lines == 1 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  } @else {
    display: -webkit-box;
    -webkit-line-clamp: $lines;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
```

### global.scss

전역적으로 적용될 스타일을 정의합니다:

```scss
@import './variables';
@import './mixins';

// 리셋 스타일
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: $font-family-base;
  font-size: $font-size-base;
  color: $text-color;
  background-color: $bg-color;
  line-height: 1.5;
}

a {
  text-decoration: none;
  color: $primary-color;

  &:hover {
    text-decoration: underline;
  }
}

// 버튼 기본 스타일
button {
  cursor: pointer;
  border: none;
  background: none;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
}

// 헤딩 스타일
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom: $spacing-md;
  font-weight: 600;
}

// 유틸리티 클래스 (Tailwind CSS와 겹치지 않는 것들)
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 $spacing-md;
}
```

## SCSS 모듈 사용법

SCSS 모듈은 스타일의 범위를 컴포넌트 내부로 한정하여 스타일 충돌을 방지합니다. 일반 SCSS와 달리 클래스명이 고유한 해시값으로 변환되어 전역 스타일 충돌 문제를 해결합니다.

### SCSS 모듈 기본 사용법

#### 1. 파일 생성하기

모듈 SCSS 파일을 생성할 때는 일반 SCSS 파일과 다르게 `.module.scss` 확장자를 사용합니다:

- 일반 SCSS 파일: `Button.scss`
- 모듈 SCSS 파일: `Button.module.scss`

**파일명만 변경하면 됩니다.** 그 외 추가 설정이나 별도의 과정은 필요하지 않습니다.

#### 2. 모듈 내용 작성하기

모듈 내용은 일반 SCSS와 동일하게 작성합니다:

```scss
// Button.module.scss
@import '../../styles/variables';
@import '../../styles/mixins';

.button {
  padding: $spacing-sm $spacing-md;
  border-radius: 4px;

  &:hover {
    background-color: darken($primary-color, 10%);
  }
}

.primary {
  background-color: $primary-color;
  color: white;
}

.large {
  font-size: $font-size-lg;
}
```

#### 3. 컴포넌트에서 모듈 가져오기

React 컴포넌트에서 모듈을 가져올 때는 `import styles from './파일명.module.scss'` 형식을 사용합니다:

```jsx
// Button.jsx
import React from 'react';
import styles from './Button.module.scss';

function Button({ children, variant = 'primary', size }) {
  return (
    <button className={`${styles.button} ${styles[variant]} ${size === 'large' ? styles.large : ''}`}>
      {children}
    </button>
  );
}

export default Button;
```

### 일반 SCSS와 모듈 SCSS의 주요 차이점

| 일반 SCSS                 | 모듈 SCSS                     |
| ------------------------- | ----------------------------- |
| 전역 스코프               | 로컬 스코프 (컴포넌트에 한정) |
| BEM 등의 명명 규칙 필요   | 클래스명 충돌 걱정 없음       |
| `class="button primary"`  | `className={styles.button}`   |
| 모든 컴포넌트에 영향 가능 | 해당 컴포넌트에만 영향        |

### 모듈에서 전역 스타일 사용하기

모듈 내에서 전역 스타일을 정의하려면 `:global` 선택자를 사용합니다:

```scss
// 모듈 스코프 클래스
.card {
  border-radius: 8px;

  // 전역 스코프 클래스
  :global(.icon) {
    margin-right: 8px;
  }
}
```

### classnames/bind 활용하기

여러 클래스를 조건부로 적용할 때는 `classnames` 라이브러리의 `bind` 메소드가 유용합니다:

```jsx
import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Button = ({ children, variant = 'primary', size = 'medium', className, ...props }) => {
  return (
    <button className={cx('button', variant, size, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
```

### 컴포넌트용 SCSS 모듈 예시

`style.module.scss` 파일 전체 예시:

```scss
// src/components/Product/style.module.scss
@import '../../styles/variables';
@import '../../styles/mixins';

.productList {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;

  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }

  @include pc {
    grid-template-columns: repeat(3, 1fr);
  }
}

.productItem {
  border-radius: 8px;
  overflow: hidden;
  background-color: $white;
  @include transition;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .imageContainer {
    position: relative;
    width: 100%;
    padding-top: 100%; // 1:1 비율 유지

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info {
    padding: 16px;

    .title {
      font-size: $font-size-heading3;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .price {
      color: $primary;
      font-weight: 600;
    }

    .badge {
      display: inline-block;
      padding: 4px 8px;
      margin-right: 8px;
      border-radius: 4px;
      font-size: $font-size-body4;

      &.new {
        background-color: $semantic-blue;
        color: $white;
      }

      &.sale {
        background-color: $semantic-red;
        color: $white;
      }

      &.soldOut {
        background-color: $grey-3;
        color: $white;
      }
    }
  }
}
```

## Tailwind CSS와 SCSS 함께 사용하기

Tailwind CSS와 SCSS 모듈을 조합하면 유틸리티 클래스의 편리함과 SCSS의 강력한 기능을 함께 활용할 수 있습니다.

### 기본 접근법

1. 레이아웃과 간단한 스타일링에는 Tailwind CSS 클래스를 사용
2. 복잡한 스타일링이나 재사용 가능한 컴포넌트에는 SCSS 모듈 사용
3. 필요한 경우 두 가지 방식을 혼합하여 사용

### 예시 - Card 컴포넌트

`Card.jsx`:

```jsx
import React from 'react';
import styles from './Card.module.scss';

const Card = ({ title, description, image, className }) => {
  return (
    <div className={`${styles.card} rounded-lg shadow-md transition-shadow hover:shadow-lg`}>
      <div className="relative h-48 w-full overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>
      <div className={`${styles.content} p-4`}>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Card;
```

`Card.module.scss`:

```scss
@import '../../styles/variables';
@import '../../styles/mixins';

.card {
  background-color: white;
  @include transition(transform, 0.2s);

  &:hover {
    transform: translateY(-4px);
  }
}

.content {
  border-top: 3px solid $primary-color;
}
```

## SCSS 변수 활용 방법

SCSS에서는 변수를 다양한 방식으로 활용할 수 있습니다. 일관성 있는 코드 작성을 위해 아래 가이드라인을 따릅니다.

### 기본 변수 사용법 ($변수명)

**기본적으로 모든 경우에 이 방식을 사용합니다:**

```scss
.element {
  color: $primary-color;
  margin: $spacing-md;
  font-size: $font-size-base;
  width: calc(100% - $spacing-lg);
  border: 1px solid $border-color;
}
```

### 보간법 사용 (#{$변수명})

보간법은 다음 특수한 경우에만 제한적으로 사용합니다:

1. **선택자에 변수 사용할 때**

```scss
$component: 'button';
.#{$component} {
  background-color: $primary-color;
}
```

2. **URL이나 경로에 변수 사용할 때**

```scss
$imageDir: '../images';
.background {
  background-image: url('#{$imageDir}/bg.jpg');
}
```

3. **반복문으로 클래스 생성할 때**

```scss
@for $i from 1 through 5 {
  .mt-#{$i} {
    margin-top: $i * 8px;
  }
}
```

4. **매우 드문 경우: 속성명에 변수 사용할 때**

```scss
$property: 'margin';
.element {
  #{$property}: 10px;
}
```

> **참고:** 보간법은 필요한 경우에만 사용합니다. 일반적인 CSS 속성 값 지정에는 기본 변수 사용법($변수명)으로 충분합니다.

### 계산에 변수 사용

```scss
.container {
  max-width: $breakpoint-lg - 32px;
  padding: $spacing-md * 2;
}

.heading {
  font-size: $font-size-base * 1.5;
  line-height: $font-size-base * 1.5 * 1.2;
}
```

## 믹스인(Mixins) 활용 방법

믹스인은 재사용 가능한 스타일 코드 블록을 생성합니다.

### 기본 믹스인 사용법

```scss
.card {
  @include shadow(2);
  @include transition;

  .card-content {
    @include ellipsis(2);
  }
}

.nav-links {
  @include flex(row, space-between, center);

  @include responsive(md) {
    @include flex(row, flex-start, center);
  }
}
```

### 반응형 디자인에 믹스인 활용

```scss
.product-grid {
  @include grid(1fr, auto, $spacing-md);

  @include responsive(sm) {
    @include grid(repeat(2, 1fr), auto, $spacing-md);
  }

  @include responsive(md) {
    @include grid(repeat(3, 1fr), auto, $spacing-md);
  }

  @include responsive(lg) {
    @include grid(repeat(4, 1fr), auto, $spacing-md);
  }
}
```

## 팀 컨벤션

효율적인 협업을 위한 스타일링 컨벤션을 제안합니다:

1. **Tailwind vs SCSS 사용 기준**

   - 간단한 UI 요소나 일회성 스타일: Tailwind CSS
   - 복잡한 컴포넌트나 재사용 패턴: SCSS 모듈

2. **파일명 규칙**

   - 컴포넌트 이름과 동일하게: `Button.jsx`와 `Button.module.scss`
   - 폴더 구조로 연관성 명시: `components/Button/index.jsx`와 `components/Button/styles.module.scss`

3. **클래스명 규칙**

   - 케밥 케이스(kebab-case) 대신 카멜 케이스(camelCase) 사용
   - BEM 방식 지양 (SCSS 중첩 구문과 모듈 사용으로 대체)

4. **변수 네이밍**

   - 목적이 명확한 이름 사용: `$primary-color` (O), `$blue` (X)
   - 접두사로 그룹화: `$spacing-sm`, `$spacing-md`, `$font-size-base`

5. **코드 구성**

   - SCSS 파일 상단에 변수와 임포트 선언
   - 관련 스타일을 함께 그룹화
   - 미디어 쿼리는 관련 선택자 내부에 중첩

6. **주석 작성**
   - 복잡한 스타일 블록에 주석 추가
   - 믹스인 정의 시 사용법 주석 작성
