const customerFileInput = document.getElementById("customer-file");
const loadCustomersBtn = document.getElementById("load-customers");
const analysisOutput = document.getElementById("analysis-output");

const generateGuideBtn = document.getElementById("generate-guide");
const reportOutput = document.getElementById("report-output");

const reactionSelect = document.getElementById("reaction-select");
const followupNotes = document.getElementById("followup-notes");
const saveFollowupBtn = document.getElementById("save-followup");

const logOutput = document.getElementById("log-output");

function appendLog(text) {
  if (!logOutput) return;
  const now = new Date().toISOString().slice(11, 19); // HH:MM:SS
  logOutput.textContent += `\n[${now}] ${text}`;
  logOutput.scrollTop = logOutput.scrollHeight;
}

// 1단계: 고객 데이터 불러오기 (파일명 + 준비 상태 기록)
loadCustomersBtn?.addEventListener("click", () => {
  const file = customerFileInput?.files?.[0];
  if (!file) {
    appendLog("⚠ 고객 엑셀 파일이 선택되지 않았습니다.");
    return;
  }

  appendLog(`📂 고객 데이터 파일 선택됨: ${file.name}`);
  appendLog("※ 현재는 파일명을 기준으로만 준비 상태를 기록합니다.");

  if (analysisOutput && !analysisOutput.value.trim()) {
    analysisOutput.value =
      "예시 기준:\n" +
      "- 국책연·공공연: 기본 연구비 O로 분류\n" +
      "- 최근 1~2년 내 문의/구매 고객 우선\n" +
      "- 관심분야=접착제·반도체·전자소재·글래스 기판 등 위주 우선 정리\n";
  }
});

// 3단계: 안내서 초안 자동 생성
generateGuideBtn?.addEventListener("click", () => {
  const now = new Date().toISOString().replace("T", " ").slice(0, 19);
  const analysisText = analysisOutput?.value.trim() || "(분석 메모 없음)";

  const guideText = [
    "◆ WIC 자동화 안내서 – 고객용 안내서 초안",
    "",
    `발행 시각: ${now}`,
    "",
    "1. 고객 분석 요약",
    analysisText,
    "",
    "2. 제공 예정 자료",
    "- 해외 영문 시장보고서: 고객 연구분야·연구비 기준으로 우선 추천",
    "- 필요 시 국내 시장보고서 / 영문 공학 도서 / 일본어 공학 도서 / 일본어 세미나 자료로 분기",
    "",
    "3. 안내 목적",
    "- 현재 연구 주제와 가장 밀접한 시장·기술 동향 정보를 신속하게 제공",
    "- 향후 과제 제안·연구 방향 설정에 참고 자료로 활용 가능",
    "",
    "4. 다음 단계",
    "- 안내서 확인 후, 필요하신 세부 주제(시장·기술·기업 등)를 알려주시면",
    "  추가 자료 및 맞춤형 보고서를 다시 정리하여 보내드립니다.",
  ].join("\n");

  if (reportOutput) {
    reportOutput.value = guideText;
  }

  appendLog("📝 안내서 초안이 자동 생성되었습니다.");
});

// 4단계: 고객 반응 · 후속조치 기록
saveFollowupBtn?.addEventListener("click", () => {
  const reaction = reactionSelect?.value;
  const notes = followupNotes?.value.trim();

  if (!reaction) {
    appendLog("⚠ 고객 반응이 선택되지 않았습니다.");
    return;
  }

  let reactionLabel = "";
  switch (reaction) {
    case "opened":
      reactionLabel = "안내서 열람";
      break;
    case "replied":
      reactionLabel = "메일/전화 회신";
      break;
    case "no-response":
      reactionLabel = "무응답";
      break;
    case "request-quote":
      reactionLabel = "견적/입찰 요청";
      break;
    default:
      reactionLabel = reaction;
  }

  appendLog(
    `📌 고객 반응 기록: ${reactionLabel}${
      notes ? ` / 메모: ${notes}` : ""
    }`
  );

  // 나중에 여기서: 서버 전송 / CSV 다운로드 등으로 확장 가능
});
