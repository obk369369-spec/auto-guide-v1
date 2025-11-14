const runLoopBtn = document.getElementById("run-loop");
const logOutput = document.getElementById("log-output");
const reportOutput = document.getElementById("report-output");
const downloadBtn = document.getElementById("download-docx");

function appendLog(line) {
  const now = new Date().toISOString().slice(11, 19);
  logOutput.textContent += `\n[${now}] ${line}`;
}

runLoopBtn?.addEventListener("click", async () => {
  logOutput.textContent = "[자동화 루프 시작] 최소 동작 버전 테스트 중...";
  reportOutput.value = "";

  appendLog("1단계: 기록 기반 사용자 의도 읽기 (샘플 데이터).");
  appendLog("2단계: 도구 상태 점검 및 조건 정리.");
  appendLog("3단계: 안내용 텍스트 보고서 자동 생성.");

  // 아직 엑셀/온라인 연결 전이므로 예시 텍스트만 채운다.
  const sampleReport = [
    "◆ WIC 자동화 안내서 (1번 도구) 실행 보고",
    "",
    `- 실행 시각: ${new Date().toISOString()}`,
    "- 루프 상태: 정상 종료",
    "- 적용 로직: Trigger → Observe → Lock-in → Propagate → Sync",
    "- 주의 조건: 1번 도구만 유지, 나머지 129개 도구는 실제 화면에서 보이지 않게 유지",
    "",
    "※ 다음 단계에서 고객 엑셀·온라인 연구비 데이터를 연결하여",
    "   고객별 맞춤 워드 안내서 내용을 자동으로 채워 넣을 예정."
  ].join("\n");

  reportOutput.value = sampleReport;
  appendLog("보고서 텍스트 자동 채움 완료.");
});

downloadBtn?.addEventListener("click", async () => {
  appendLog("잠금 워드 안내서 다운로드 요청.");

  const res = await fetch("/api/guide-template");
  if (!res.ok) {
    appendLog(`다운로드 실패: HTTP ${res.status}`);
    return;
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "WIC_자동화_안내서_템플릿.docx";
  a.click();
  URL.revokeObjectURL(url);

  appendLog("잠금 워드 안내서 템플릿 다운로드 완료.");
});
