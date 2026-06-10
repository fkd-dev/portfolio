/* portfolio-editorial.jsx — 案C "Editorial" (warm light, big type) */

const { useState, useEffect } = React;

const ED_TWEAKS = /*EDITMODE-BEGIN*/{
  "accent": "#2F5FCC",
  "paper": "#FAF9F6"
}/*EDITMODE-END*/;

function useSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 160;
      let cur = ids[0];
      for (const id of ids) { const el = document.getElementById(id); if (el && el.offsetTop <= y) cur = id; }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids.join(",")]);
  return active;
}

function Switcher() {
  return (
    <div className="vswitch">
      <span className="vswitch-label">DESIGN</span>
      {DESIGNS.map((d) => (
        <a key={d.id} href={d.href} className={"vswitch-item" + (d.id === "c" ? " on" : "")} title={d.sub}>{d.label}</a>
      ))}
    </div>
  );
}

function IndBars() {
  return (
    <div className="ed-ind" style={{ marginTop: 28 }}>
      {INDUSTRIES.map((d, i) => {
        const pct = Math.round((d.months / INDUSTRIES[0].months) * 100);
        const yrs = (d.months / 12).toFixed(1);
        return (
          <div className="row" key={i}>
            <div className="meta">
              <span className="rk">{String(i + 1).padStart(2, "0")}</span>
              <span className="nm">{d.name}</span>
              <span className="nt">{d.note}</span>
            </div>
            <div className="track"><i style={{ "--w": pct + "%", animationDelay: (i * 80) + "ms" }}></i></div>
            <div className="val"><b>{yrs}</b><span>年 · {d.count}件</span></div>
          </div>
        );
      })}
    </div>
  );
}

function Head({ n, title, lead }) {
  return (
    <div>
      <div className="head">
        <span className="big-n">{n}</span>
        <h2>{title}</h2>
      </div>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

/* 案Cのセクション順: 実績 → リード経験 → 強み → スキル → 経歴 */
const ED_ORDER = ["projects", "lead", "strengths", "skills", "summary", "industries"];
const ED_NAV = ED_ORDER.map((id) => NAV.find((n) => n.id === id));

function App() {
  const [t, setTweak] = useTweaks(ED_TWEAKS);
  const active = useSpy(ED_NAV.map((n) => n.id));
  const paper = (typeof t.paper === "string" && t.paper.charAt(0) === "#") ? t.paper : "#FAF9F6";
  const rootStyle = { "--accent": t.accent, "--paper": paper };

  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty("--paper", paper);
    r.setProperty("--accent", t.accent);
  }, [paper, t.accent]);

  return (
    <div style={rootStyle}>
      <div className="wrap">
        <header className="topbar">
          <div className="nm"><b>{NAME_EN}</b> &nbsp;/&nbsp; <span style={{ color: "var(--muted)" }}>app engineer</span></div>
          <div className="av">{new Date().getFullYear()} — PORTFOLIO</div>
        </header>

        <section id="top" className="ed-hero reveal">
          <div className="kick">{ROLE}</div>
          <h1>設計からリリース、<br />そして<em>チームの成長</em>まで。</h1>
          <div className="sub">
            <p>Androidネイティブを10年以上、2021年からはFlutterを主軸に、新規アプリの立ち上げからチームのリードまでを担うフリーランスエンジニアです。設計・CI/CD構築から、Claude Codeを用いた仕様書駆動開発まで、事業に伴走します。</p>
            <div className="meta">
              {STATS.map((s, i) => (
                <div className="mrow" key={i}><span className="k">{s.lbl}</span><span className="v">{s.num}{s.unit}</span></div>
              ))}
            </div>
          </div>
        </section>

        <div className="ed-body">
          <nav className="ed-index">
            <ol>
              {ED_NAV.map((nav, i) => (
                <li key={nav.id}>
                  <a href={"#" + nav.id} className={active === nav.id ? "active" : ""}>
                    <span className="n">{String(i + 1).padStart(2, "0")}</span><span>{nav.label}</span>
                  </a>
                </li>
              ))}
              <li><a href="#contact"><span className="n">→</span><span>お問い合わせ</span></a></li>
            </ol>
          </nav>

          <div className="ed-content">
            <section id="projects" className="ed-sec reveal">
              <Head n="01" title="実績・プロジェクト事例" lead="アプリリードエンジニアとして牽引した案件を中心に。新規立ち上げ、フルリプレース、長期参画。" />
              <div className="ed-proj" style={{ marginTop: 28 }}>
                {PROJECTS.map((p, i) => (
                  <div className="pj" key={i}>
                    <div>
                      <div className="pn">{String(i + 1).padStart(2, "0")} / SELECTED WORK</div>
                      <h3>{p.title}</h3>
                      <div className="role">{p.role}</div>
                      <p>{p.body}</p>
                      <div className="mt">{p.meta.map(([k, v]) => <div key={k}><span className="k">{k}</span><span className="v">{v}</span></div>)}</div>
                    </div>
                    <div className="shot">
                      <img src={p.img} alt={p.shot} loading="lazy" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="lead" className="ed-sec reveal">
              <Head n="02" title="リード / マネジメント経験" lead="複数社でチームを率いてきました。設計・レビュー・育成・計画づくりまで。" />
              <div className="ed-lead" style={{ marginTop: 28 }}>
                {LEAD_POINTS.map((l, i) => (
                  <div className="row" key={i}>
                    <div className="rn">{l.mark}</div>
                    <div><h4>{l.h}</h4><p>{l.p}</p></div>
                  </div>
                ))}
              </div>
              <div className="stats">
                {LEAD_STATS.map((s, i) => (
                  <div key={i}><div className="num">{s.num}{s.unit}</div><div className="lbl">{s.lbl}</div></div>
                ))}
              </div>
            </section>

            <section id="strengths" className="ed-sec reveal">
              <Head n="03" title="強み・得意分野" lead="技術の幅と深さ、そしてチームを動かす力。事業を前に進めるための6つの軸。" />
              <div className="ed-str" style={{ marginTop: 28 }}>
                {PILLARS.map((p, i) => (
                  <div className="row" key={i}>
                    <div className="rn">{String(i + 1).padStart(2, "0")}</div>
                    <div>
                      <h3>{p.title}</h3>
                      <p>{p.body}</p>
                      <div className="tags">{p.tags.map((x) => <span className="tag" key={x}>{x}</span>)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="skills" className="ed-sec reveal">
              <Head n="04" title="スキルセット" lead="プラットフォームから言語、バックエンド、開発基盤まで。フルスタックにも対応します。" />
              <div className="ed-skills" style={{ marginTop: 28 }}>
                {SKILL_GROUPS.map((g, gi) => (
                  <div className="grp" key={gi}>
                    <div className="gh"><h4>{g.name}</h4><span className="m">{g.meta}</span></div>
                    {g.items.map((it, i) => (
                      <div className="it" key={i}><span className="nm">{it.name}</span><span className="yr">{it.yrs}</span></div>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            <section id="summary" className="ed-sec reveal">
              <Head n="05" title="経歴サマリー（要点）" lead="時系列ではなく、何ができて、どう関われるかの要点です。" />
              <div className="ed-sum" style={{ marginTop: 28 }}>
                {SUMMARY.map(([k, v], i) => (
                  <div className="row" key={i}><div className="k">{k}</div><div className="v">{v}</div></div>
                ))}
              </div>
            </section>

            <section id="industries" className="ed-sec reveal">
              <Head n="06" title="業種別の経験" lead="15年・全17案件を業種で分類。バーは案件の通算月数（兼務含む）を表します。" />
              <IndBars />
              <div className="ind-foot">
                <span>合計 <b>{INDUSTRIES.length}</b> 業種</span>
                <span>全 <b>17</b> 案件</span>
                <span>モバイル開発 <b>15</b> 年+</span>
              </div>
            </section>
          </div>
        </div>

        <section id="contact" className="ed-contact reveal">
          <div className="kick">Contact</div>
          <h2>プロジェクトの<br />ご相談、どうぞ。</h2>
          <p>新規アプリの立ち上げ、チームの技術支援、フリーランスでのご依頼など。要件の整理段階からご一緒できます。</p>
          <div className="links">
            <a className="p" href="https://docs.google.com/forms/d/e/1FAIpQLSdN3EiLTKuZBQDh2kgfE764C1vAok-guvfz9u-WkOGs6yDang/viewform?usp=header" target="_blank" rel="noopener">お問い合わせフォーム →</a>
            <a href="https://github.com/fkd-dev" target="_blank" rel="noopener">GitHub</a>
            <a href="https://x.com/dev_fukutan" target="_blank" rel="noopener">X (Twitter)</a>
          </div>
        </section>
        <div className="ed-foot">
          <span>© {new Date().getFullYear()} {NAME_EN}</span>
          <span>{NAME_JP} — {ROLE}</span>
        </div>
      </div>

      <TweaksPanel>
        <TweakSection label="テーマ" />
        <TweakColor label="アクセント" value={t.accent}
          options={["#2F5FCC", "#1F6FB2", "#C2410C", "#1F7A4D"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakColor label="紙の色味" value={paper}
          options={["#FDFDFC", "#FAF9F6", "#F6F7F9", "#F4F1EA", "#EEF0F2"]}
          onChange={(v) => setTweak("paper", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
