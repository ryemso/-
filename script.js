// 게임 상태 변수들
let sequence = []
let userInput = []
let currentLevel = 1
let currentScore = 0
let gameState = "waiting" // waiting, showing, input, result

// 게임 설정
const GAME_CONFIG = {
  baseSequenceLength: 3,
  showDuration: 800,
  hideDuration: 300,
  pointsPerLevel: 10,
  maxNumber: 9,
}

/**
 * 지정된 길이의 랜덤 숫자 시퀀스 생성
 * @param {number} length - 시퀀스 길이
 * @returns {Array} 숫자 배열
 */
function generateSequence(length) {
  const newSequence = []
  for (let i = 0; i < length; i++) {
    newSequence.push(Math.floor(Math.random() * GAME_CONFIG.maxNumber) + 1)
  }
  return newSequence
}

/**
 * 통계 정보 업데이트
 */
function updateStats() {
  document.getElementById("level").textContent = currentLevel
  document.getElementById("score").textContent = currentScore
}

/**
 * 화면 전환
 * @param {string} screenName - 표시할 화면 ID
 */
function showScreen(screenName) {
  const screens = ["waiting-screen", "showing-screen", "input-screen", "result-screen"]
  screens.forEach((screen) => {
    document.getElementById(screen).classList.add("hidden")
  })
  document.getElementById(screenName).classList.remove("hidden")
}

/**
 * 게임 시작
 */
function startGame() {
  const sequenceLength = GAME_CONFIG.baseSequenceLength + currentLevel - 1
  sequence = generateSequence(sequenceLength)
  userInput = []
  gameState = "showing"
  showScreen("showing-screen")
  showSequence()
}

/**
 * 숫자 시퀀스를 순차적으로 표시
 */
async function showSequence() {
  const displayCard = document.getElementById("display-card")

  for (let i = 0; i < sequence.length; i++) {
    // 숫자 표시
    displayCard.textContent = sequence[i]
    displayCard.classList.add("showing")

    // 표시 시간 대기
    await sleep(GAME_CONFIG.showDuration)

    // 숫자 숨기기
    displayCard.textContent = ""
    displayCard.classList.remove("showing")

    // 숨김 시간 대기 (마지막 숫자가 아닌 경우에만)
    if (i < sequence.length - 1) {
      await sleep(GAME_CONFIG.hideDuration)
    }
  }

  // 입력 화면으로 전환
  gameState = "input"
  showScreen("input-screen")
  updateUserInputDisplay()
}

/**
 * Promise 기반 sleep 함수
 * @param {number} ms - 대기 시간 (밀리초)
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 사용자 입력 상태 표시 업데이트
 */
function updateUserInputDisplay() {
  const container = document.getElementById("user-input")
  container.innerHTML = ""

  // 입력된 숫자들 표시
  userInput.forEach((num) => {
    const div = document.createElement("div")
    div.className = "input-number"
    div.textContent = num
    container.appendChild(div)
  })

  // 남은 자리 표시
  for (let i = userInput.length; i < sequence.length; i++) {
    const div = document.createElement("div")
    div.className = "input-number input-placeholder"
    div.textContent = "_"
    container.appendChild(div)
  }

  // 입력 메시지 업데이트
  const messageEl = document.getElementById("input-message")
  messageEl.textContent = `순서대로 숫자를 클릭하세요 (${userInput.length}/${sequence.length})`
}

/**
 * 숫자 선택 처리
 * @param {number} number - 선택된 숫자
 */
function selectNumber(number) {
  if (gameState !== "input") return

  userInput.push(number)
  updateUserInputDisplay()

  // 모든 숫자를 입력했으면 정답 확인
  if (userInput.length === sequence.length) {
    setTimeout(checkAnswer, 500) // 약간의 지연 후 확인
  }
}

/**
 * 정답 확인 및 결과 처리
 */
function checkAnswer() {
  const isCorrect = userInput.every((num, index) => num === sequence[index])
  const messageEl = document.getElementById("result-message")

  if (isCorrect) {
    // 정답 처리
    const earnedPoints = currentLevel * GAME_CONFIG.pointsPerLevel
    currentScore += earnedPoints
    currentLevel++

    messageEl.textContent = `🎉 정답입니다! +${earnedPoints}점 획득!`
    messageEl.className = "message success"

    // 자동으로 다음 레벨 시작
    setTimeout(() => {
      startGame()
    }, 2000)
  } else {
    // 오답 처리
    messageEl.innerHTML = `
            ❌ 틀렸습니다.<br>
            정답: ${sequence.join(" → ")}<br>
            입력: ${userInput.join(" → ")}
        `
    messageEl.className = "message error"
  }

  updateStats()
  gameState = "result"
  showScreen("result-screen")
}

/**
 * 게임 초기화
 */
function resetGame() {
  currentLevel = 1
  currentScore = 0
  sequence = []
  userInput = []
  gameState = "waiting"
  updateStats()
  showScreen("waiting-screen")
}

/**
 * 키보드 이벤트 처리
 */
function handleKeyPress(event) {
  if (gameState === "input") {
    const key = event.key
    if (key >= "1" && key <= "9") {
      selectNumber(Number.parseInt(key))
    }
  } else if (gameState === "waiting" || gameState === "result") {
    if (event.key === "Enter" || event.key === " ") {
      startGame()
    }
  }
}

/**
 * 게임 초기화 및 이벤트 리스너 등록
 */
function initGame() {
  updateStats()

  // 키보드 이벤트 리스너 등록
  document.addEventListener("keydown", handleKeyPress)

  // 게임 시작 버튼에 포커스
  const startBtn = document.querySelector(".start-btn")
  if (startBtn) {
    startBtn.focus()
  }

  console.log("🧠 숫자 순서 기억 게임이 준비되었습니다!")
  console.log("키보드 1-9 키로도 숫자를 선택할 수 있습니다.")
}

// 페이지 로드 완료 시 게임 초기화
document.addEventListener("DOMContentLoaded", initGame)

// 게임 통계 추적 (선택사항)
const gameStats = {
  gamesPlayed: 0,
  totalScore: 0,
  bestLevel: 1,

  updateStats() {
    this.gamesPlayed++
    this.totalScore += currentScore
    this.bestLevel = Math.max(this.bestLevel, currentLevel)

    // 로컬 스토리지에 저장
    localStorage.setItem("numberGameStats", JSON.stringify(this))
  },

  loadStats() {
    const saved = localStorage.getItem("numberGameStats")
    if (saved) {
      Object.assign(this, JSON.parse(saved))
    }
  },
}

// 통계 로드
gameStats.loadStats()
