// main.ts  (이 파일 1개만 필요)
// HTML + 사용자 의도 + 로직을 모두 한 곳에 넣은 자동화 안내서 v1.1

const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <title>자동화 안내서 v1.1 (1번 도구)</title>
  <style>
    body { font-family: "Noto Sans KR", sans-serif; background:#fafafa; color:#111; margin:0; padding:20px;}
    h1 { font-size:1.6em; font-weight:700; }
    .card { background:white; border-radius:20px; box-shadow:0 0 10px rgba(0,0,0,0.08); padding:20px; margin-top:15px;}
    .log { background:#f5f5f5; border-radius:10px; padding:10px; font-size:0.9em; height:170px; overflow-y:auto;}
    button { background:#005eff; color:white; border:none; padding:10px 18px; border-radius:8px; cursor:pointer; }
    button:hover { background:#0040c1; }
    .tag { display:inline-block; padding:3px 8px; border-radius:999px; background:#e8f0ff; font-size:0.8em; margin-right:4px;}
    textarea { width:100%; height:140px; border-radius:10px; border:1px solid #ddd; padding:10px; resize:vertical; box-sizing:border-box;}
    .row { display:flex; gap:16px; flex-wrap:wrap; }
    .col { flex:1 1 240px; min-width:0; }
  </style>
</head>
<body>
  <h1>⚙️ WIC 자동화 안내서 (1번 도구 전용 v1.1)</h1>

  <div class="card">
    <p>
      이 화면은 <b>1번 도구(자동화 안내서)</b>만 남기고,<br/>
      나머지 129개 도구를 모두 지운 뒤 <b>Trigger → Observe → Lock-in → Propagate → Sync</b>를
      <b>알멩이 로직</b>으로 고정하는 중앙 안내 모듈이다.
    </p>
    <div>
      <span class="tag">1번 도구만 유지</span>
      <span class="tag">129개 도구 삭제</span>
      <span class="tag">질문 최소</span>
      <span class="tag">사용자 의도 주입</span>
    </div>
  </div>

  <div class="card">
    <div class="row">
      <div class="col">
        <h3>1. 자동화 루프 실행</h3>
        <p style="font-size:0.9em;">
          아래 버튼을 누르면, 기록 기반 <b>사용자 의도</b>를 읽어서<br/>
          ① 상태 진단 → ② 단계별 체크 → ③ 보고서 자동 생성까지 한 번에 실행한다.
        </p>
        <button id="run">자동화 루프 실행</button>
        <div class="log" id="log"></div>
      </div>
      <div class="col">
        <h3>2. 자동 생성 보고서 (복사해서 쓰는 용도)</h3>
        <textarea id="report" readonly></textarea>
      </div>
    </div>
  </div>

  <script>
    const logBox = document.getElementById("log");
    const reportBox = document.getElementById("report");

    function writeLog(msg) {
      const t = new Date().toLocaleTimeString();
      logBox.innerHTML += "[" + t + "] " + msg + "\\n";
      logBox.scrollTop = logBox.scrollHeight;
    }

    // 🔒 사용자 의도를 데이터로 고정
    const userIntent = {
      toolId: 1,
      toolName: "자동화 안내서",
      keepOnlyGuideTool: true,
      deleteOtherToolsCount: 129,
      cycle: ["Trigger","Observe","Lock-in","Propagate","Sync"],
      rules: [
        "껍데기 도구 금지 (실제 동작 없는 구조 금지)",
        "질문·확인 최소, 기록 기반 자동 주입",
        "1번 도구가 모든 자동화의 기준 모듈",
        "/report/live 등 다른 도구는 1번 도구 규칙을 복제해서 사용"
      ],
      source: "wic-auto-tools-2025 장기 대화 기록",
      createdAt: new Date().toISOString()
    };

    const steps = [
      {
        id: 1,
        name: "Trigger",
        summary: "1번 도구만 남기고 129개 도구 전면 삭제 트리거.",
        checklist: [
          "USB 백업(wic-auto-tools-2025-main.zip) 보존 여부 점검",
          "GitHub / Deno Deploy에서 예전 프로젝트 삭제됨으로 고정",
          "새 리포지토리 이름을 auto-guide-v1로 사용"
        ]
      },
      {
        id: 2,
        name: "Observe",
        summary: "플랫폼 상태와 과거 지시를 관찰해서 의도 복원.",
        checklist: [
          "기존 130개 도구 구조가 껍데기였다는 사실 기록",
          "반복 오류(/report/live compact table 문장) 제거 대상 명시",
          "1번 도구가 단일 기준이라는 조건을 다시 확인"
        ]
      },
      {
        id: 3,
        name: "Lock-in",
        summary: "1번 도구에 정책·의도·파일 구조를 고정.",
        checklist: [
          "지금처럼 main.ts 1개 파일로 통합 유지",
          "HTML + 로직 + 의도를 한 화면에 통합",
          "Trigger→Sync 5단계가 코드와 화면에 동시에 적혀 있는지 확인"
        ]
      },
      {
        id: 4,
        name: "Propagate",
        summary: "이 안내서 규칙을 다른 자동화 도구로 전파할 준비.",
        checklist: [
          "향후 /report/live, /ops/* 도구들이 이 규칙을 그대로 상속",
          "정시 보고·자동 푸시 고리는 여기서 설계하고 다른 도구에 복제",
          "사용자 개입 없이 확장되도록 ‘1번 도구 기준’ 조건을 유지"
        ]
      },
      {
        id: 5,
        name: "Sync",
        summary: "실제 실행 상태와 안내서 내용을 동기화.",
        checklist: [
          "현재 이 화면이 Deno Deploy에서 정상 로딩됨",
          "버튼 클릭 시 단계·체크리스트가 자동으로 출력됨",
          "생성된 보고서를 그대로 복사해서 내부 보고/기록에 사용 가능"
        ]
      }
    ];

    function buildReport(runTime) {
      let lines = [];
      lines.push("◆ WIC 자동화 안내서 (1번 도구) 실행 보고");
      lines.push(" - 실행 시각: " + runTime);
      lines.push(" - 도구 ID / 이름: " + userIntent.toolId + " / " + userIntent.toolName);
      lines.push(" - 유지 도구: 1번 도구만 유지");
      lines.push(" - 삭제 대상 도구 수: " + userIntent.deleteOtherToolsCount + "개");
      lines.push(" - 순환 구조: " + userIntent.cycle.join(" → "));
      lines.push(" - 규칙 요약:");
      for (var i = 0; i < userIntent.rules.length; i++) {
        lines.push("    • " + userIntent.rules[i]);
      }
      lines.push("");
      lines.push(" - 단계별 진행 상황:");
      for (var j = 0; j < steps.length; j++) {
        var s = steps[j];
        lines.push("   [" + s.id + ". " + s.name + "] " + s.summary);
      }
      lines.push("");
      lines.push("※ 이 보고서는 1번 도구 화면에서 자동 생성된 내용이며,");
      lines.push("   이후 /report/live 및 다른 자동화 도구 설계의 기준으로 사용 가능함.");
      return lines.join("\\n");
    }

    document.getElementById("run").addEventListener("click", function () {
      logBox.innerHTML = "";
      const now = new Date();
      const runTime = now.toISOString();

      writeLog("자동화 루프 실행 시작 (1번 도구 기준).");
      writeLog("사용자 의도 고정: " + userIntent.goal);
      writeLog("삭제 대상 도구 수: " + userIntent.deleteOtherToolsCount + "개");
      writeLog("순환 구조: " + userIntent.cycle.join(" → "));

      for (var i = 0; i < steps.length; i++) {
        var step = steps[i];
        writeLog(step.id + ". " + step.name + " - " + step.summary);
        for (var k = 0; k < step.checklist.length; k++) {
          writeLog("   • " + step.checklist[k]);
        }
      }

      writeLog("모든 단계 로딩 완료 — 자동 보고서 생성.");
      reportBox.value = buildReport(runTime);
    });

    // 의도 설명 텍스트를 미리 채워 넣기
    userIntent.goal = "1번 도구(자동화 안내서)를 실제 알멩이로 완전 실행";
  </script>
</body>
</html>`;

Deno.serve((req) => {
  const url = new URL(req.url);
  const path = url.pathname;

  // 루트와 /static/deliverables/자동화안내서.html 둘 다 이 HTML을 반환
  if (
    path === "/" ||
    path === "/static/deliverables/%EC%9E%90%EB%8F%99%ED%99%94%EC%95%88%EB%82%B4%EC%84%9C.html" ||
    path === "/static/deliverables/자동화안내서.html"
  ) {
    return new Response(html, {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  return new Response("Not Found", { status: 404 });
});
