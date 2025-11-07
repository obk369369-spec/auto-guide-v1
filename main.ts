// main.ts  (리포지토리 루트에 1개 파일만 두면 됨)

const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <title>자동화 안내서 v1.0 (1번 도구)</title>
  <style>
    body { font-family: "Noto Sans KR", sans-serif; background:#fafafa; color:#111; margin:0; padding:20px;}
    h1 { font-size:1.6em; font-weight:700; }
    .card { background:white; border-radius:20px; box-shadow:0 0 10px rgba(0,0,0,0.08); padding:20px; margin-top:15px;}
    .log { background:#f5f5f5; border-radius:10px; padding:10px; font-size:0.9em; height:220px; overflow-y:auto;}
    button { background:#005eff; color:white; border:none; padding:10px 18px; border-radius:8px; cursor:pointer; }
    button:hover { background:#0040c1; }
    .tag { display:inline-block; padding:3px 8px; border-radius:999px; background:#e8f0ff; font-size:0.8em; margin-right:4px;}
  </style>
</head>
<body>
  <h1>⚙️ WIC 자동화 안내서 (1번 도구 전용)</h1>

  <div class="card">
    <p>
      이 화면은 <b>1번 도구(자동화 안내서)</b>만 남기고<br/>
      나머지 129개 도구를 모두 지운 뒤, <b>Trigger → Observe → Lock-in → Propagate → Sync</b>를
      알맹이로 고정하는 안내 도구다.
    </p>
    <div>
      <span class="tag">1번 도구만 유지</span>
      <span class="tag">129개 도구 삭제</span>
      <span class="tag">질문 최소</span>
      <span class="tag">사용자 의도 주입</span>
    </div>
    <br/>
    <button id="start">자동화 루프 실행</button>
    <div class="log" id="log"></div>
  </div>

  <script>
    const logBox = document.getElementById("log");

    const writeLog = (msg) => {
      const t = new Date().toLocaleTimeString();
      logBox.innerHTML += "[" + t + "] " + msg + "<br>";
      logBox.scrollTop = logBox.scrollHeight;
    };

    // 사용자의 핵심 의도(기록 기반)를 알맹이 데이터로 고정
    const userIntent = {
      goal: "1번 도구(자동화 안내서)를 실제 알맹이로 완전 실행",
      keepOnlyGuideTool: true,
      deleteOtherTools: 129,
      cycle: ["Trigger","Observe","Lock-in","Propagate","Sync"],
      rules: [
        "껍데기 도구 금지",
        "사용자 기록 기반 로직 주입",
        "질문·확인 최소화",
        "보고와 화면은 실제 클릭·실행 기준"
      ],
      source: "wic-auto-tools-2025 대화 기록",
      createdAt: new Date().toISOString()
    };

    const steps = [
      {
        id: 1,
        name: "Trigger",
        summary: "1번 도구만 남기고 나머지 129개 도구 전면 삭제 트리거.",
        checklist: [
          "USB 백업(wic-auto-tools-2025-main.zip) 보존",
          "GitHub / Deno Deploy 기존 프로젝트 삭제 완료 확인",
          "새 리포지토리 이름을 auto-guide-v1로 고정"
        ]
      },
      {
        id: 2,
        name: "Observe",
        summary: "플랫폼 상태와 사용자 지시를 관찰하고 기록에서 의도 복원.",
        checklist: [
          "기존 130개 도구 구조가 껍데기였다는 점 명시",
          "반복 오류(/report/live compact table 문장) 제거 대상 표시",
          "1번 도구가 모든 자동화의 기준 모듈이라는 점 고정"
        ]
      },
      {
        id: 3,
        name: "Lock-in",
        summary: "1번 도구에 정책·의도·파일 구조를 고정(잠금).",
        checklist: [
          "파일 구조를 main.ts 단일 파일로 간소화",
          "HTML, 로직, 의도를 한 화면에 통합",
          "Trigger→Sync 5단계를 안내서에 직접 표기"
        ]
      },
      {
        id: 4,
        name: "Propagate",
        summary: "이 안내서를 기준으로 다른 자동화 도구로 확장할 준비.",
        checklist: [
          "추후 /report/live 등에서 재사용할 규칙을 이 화면에서 먼저 정의",
          "정시 보고 / 자동 푸시 고리를 1번 도구에서 설계 시작",
          "다른 도구도 1번 도구의 의도를 복제하도록 설계"
        ]
      },
      {
        id: 5,
        name: "Sync",
        summary: "실제 실행 상태와 안내서 내용을 동기화.",
        checklist: [
          "Deno Deploy에서 /static/deliverables/자동화안내서.html 로딩 확인",
          "버튼 클릭 시 각 단계 로그가 순서대로 출력되는지 확인",
          "사용자 개입 없이도 같은 결과가 반복되는지 점검"
        ]
      }
    ];

    document.getElementById("start").addEventListener("click", () => {
      logBox.innerHTML = "";
      writeLog("자동화 안내 루프 시작 (1번 도구 전용).");
      writeLog("사용자 의도 고정: " + userIntent.goal);
      writeLog("삭제 대상 도구 수: " + userIntent.deleteOtherTools + "개");
      writeLog("순환 구조: " + userIntent.cycle.join(" → "));

      for (const step of steps) {
        writeLog(step.id + ". " + step.name + " - " + step.summary);
        for (const item of step.checklist) {
          writeLog("   • " + item);
        }
      }

      writeLog("모든 단계 로딩 완료 — 이제 이 안내서를 기준으로 다른 도구를 확장하면 된다.");
    });
  </script>
</body>
</html>`;

Deno.serve((req) => {
  const url = new URL(req.url);
  const path = url.pathname;

  // 루트 또는 /static/deliverables/자동화안내서.html 둘 다 이 HTML을 반환
  if (path === "/" || path === "/static/deliverables/%EC%9E%90%EB%8F%99%ED%99%94%EC%95%88%EB%82%B4%EC%84%9C.html" || path === "/static/deliverables/자동화안내서.html") {
    return new Response(html, {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  return new Response("Not Found", { status: 404 });
});
