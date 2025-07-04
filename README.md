# 🧠 숫자 순서 기억 게임

치매 예방을 위한 순차적 기억력과 집중력 훈련 게임입니다.

## 📁 파일 구조

\`\`\`
number-sequence-game/
├── index.html          # 메인 HTML 파일
├── style.css           # 스타일시트
├── script.js           # 게임 로직
├── README.md           # 프로젝트 설명
└── package.json        # 프로젝트 설정
\`\`\`

## 🎮 게임 방법

1. **시작**: "게임 시작하기" 버튼 클릭 또는 Enter/Space 키
2. **기억**: 화면에 순서대로 나타나는 숫자들을 기억
3. **입력**: 기억한 순서대로 숫자 버튼 클릭 (키보드 1-9 키 사용 가능)
4. **진행**: 정답을 맞히면 다음 레벨로 자동 진행

## ✨ 주요 기능

- 📈 **레벨 시스템**: 성공할 때마다 난이도 증가 (숫자 개수 +1)
- 🏆 **점수 계산**: 레벨 × 10점 획득
- ⌨️ **키보드 지원**: 1-9 키로 숫자 선택 가능
- 📱 **반응형 디자인**: 모바일/태블릿/데스크톱 모두 지원
- 🎨 **부드러운 애니메이션**: 시각적 피드백과 전환 효과
- 💾 **통계 저장**: 로컬 스토리지에 게임 기록 저장

## 🚀 실행 방법

### 1. 간단한 방법
\`\`\`bash
# 파일을 다운로드하고 index.html을 브라우저에서 열기
open index.html
\`\`\`

### 2. 로컬 서버 실행
\`\`\`bash
# Python 3
python -m http.server 8000

# Node.js (http-server 설치 필요)
npx http-server .

# 브라우저에서 http://localhost:8000 접속
\`\`\`

### 3. GitHub Pages 배포
1. GitHub 저장소 생성
2. 파일들 업로드
3. Settings → Pages → Source: "Deploy from a branch"
4. Branch: "main" 선택
5. 배포된 URL로 접속

## 🎯 게임 효과

- **작업 기억력** 향상
- **순차적 처리 능력** 강화  
- **집중력** 증진
- **인지 유연성** 개발
- **시각적 주의력** 훈련

## 📊 난이도 설정

| 레벨 | 숫자 개수 | 획득 점수 |
|------|-----------|-----------|
| 1    | 3개       | 10점      |
| 2    | 4개       | 20점      |
| 3    | 5개       | 30점      |
| N    | (N+2)개   | N×10점    |

## 🛠️ 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: 
  - Flexbox & Grid 레이아웃
  - CSS 애니메이션 & 전환
  - 반응형 미디어 쿼리
- **Vanilla JavaScript**:
  - ES6+ 문법
  - Promise & async/await
  - 로컬 스토리지
  - 이벤트 처리

## 🎨 커스터마이징

### 색상 변경
`style.css`에서 CSS 변수 수정:
\`\`\`css
:root {
  --primary-color: #4f46e5;
  --success-color: #10b981;
  --error-color: #ef4444;
}
\`\`\`

### 게임 설정 변경
`script.js`의 `GAME_CONFIG` 객체 수정:
\`\`\`javascript
const GAME_CONFIG = {
    baseSequenceLength: 3,    // 시작 숫자 개수
    showDuration: 800,        // 숫자 표시 시간 (ms)
    hideDuration: 300,        // 숫자 숨김 시간 (ms)
    pointsPerLevel: 10,       // 레벨당 점수
    maxNumber: 9              // 최대 숫자
};
\`\`\`

## 📱 모바일 최적화

- 터치 친화적 버튼 크기
- 반응형 그리드 레이아웃
- 모바일 뷰포트 최적화
- 터치 제스처 지원

## 🔧 개발자 도구

브라우저 콘솔에서 다음 명령어 사용 가능:
\`\`\`javascript
// 현재 시퀀스 확인
console.log(sequence);

// 게임 통계 확인
console.log(gameStats);

// 레벨 강제 변경
currentLevel = 5;
updateStats();
\`\`\`

## 📈 향후 개선 사항

- [ ] 사운드 효과 추가
- [ ] 다양한 테마 색상
- [ ] 온라인 랭킹 시스템
- [ ] 게임 기록 그래프
- [ ] PWA (Progressive Web App) 지원
- [ ] 다국어 지원

## 🤝 기여하기

1. Fork the Project
2. Create Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit Changes (`git commit -m 'Add AmazingFeature'`)
4. Push to Branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

---

**🧠 매일 5분씩 플레이하여 두뇌 건강을 지키세요!**

**🎯 목표: 레벨 10 달성하기!**
