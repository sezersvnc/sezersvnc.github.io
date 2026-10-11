(() => {
  const t0 = performance.now();
  const C = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const fullname = `${C.name} ${C.surname}`.trim();
  const range = (a, b) => [a, b].filter(Boolean).join(" — ") || "—";

  /* ── JSON vurgulama ────────────────────────────────────── */
  const P = (s) => `<span class="j-p">${s}</span>`;
  const hl = (v, d = 0) => {
    const pad = "  ".repeat(d + 1), end = "  ".repeat(d);
    if (Array.isArray(v)) {
      if (!v.length) return P("[]");
      if (v.every((x) => typeof x !== "object" || x === null) && JSON.stringify(v).length < 56)
        return P("[") + v.map((x) => hl(x, d)).join(P(", ")) + P("]");
      return `${P("[")}\n${v.map((x) => pad + hl(x, d + 1)).join(`${P(",")}\n`)}\n${end}${P("]")}`;
    }
    if (v && typeof v === "object") {
      const keys = Object.keys(v);
      if (!keys.length) return P("{}");
      return `${P("{")}\n${keys
        .map((k) => `${pad}<span class="j-k">"${esc(k)}"</span>${P(":")} ${hl(v[k], d + 1)}`)
        .join(`${P(",")}\n`)}\n${end}${P("}")}`;
    }
    if (typeof v === "string") return `<span class="j-s">"${esc(v)}"</span>`;
    if (typeof v === "number") return `<span class="j-n">${v}</span>`;
    if (typeof v === "boolean" || v === null) return `<span class="j-b">${v}</span>`;
    return esc(v);
  };

  const panels = {};
  $$("[data-json]").forEach((el) => {
    el.innerHTML = `
      <div class="code__bar"><span class="tag"></span><span class="meta"></span>
        <button class="code__copy" type="button">kopyala</button></div>
      <pre><code></code></pre>`;
    const panel = { el, data: null };
    panel.set = (data, tag, meta, flash) => {
      panel.data = data;
      $(".tag", el).innerHTML = tag;
      $(".meta", el).innerHTML = meta;
      $("code", el).innerHTML = hl(data);
      if (flash) {
        const pre = $("pre", el);
        pre.classList.remove("flash"); void pre.offsetWidth; pre.classList.add("flash");
      }
    };
    $(".code__copy", el).addEventListener("click", (e) => {
      copy(JSON.stringify(panel.data, null, 2), e.currentTarget);
    });
    panels[el.dataset.json] = panel;
  });

  const copy = async (text, btn, label = btn.textContent) => {
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = "kopyalandı ✓";
    } catch {
      btn.textContent = "kopyalanamadı";
    }
    setTimeout(() => (btn.textContent = label), 1400);
  };

  /* ── Basit alanlar ─────────────────────────────────────── */
  const binds = { fullname, role: C.role, location: C.location, intro: C.intro, email: C.email, availability: C.availability };
  $$("[data-bind]").forEach((el) => (el.textContent = binds[el.dataset.bind] ?? ""));
  document.title = `${fullname} — ${C.role}`;
  if (!C.available) document.body.classList.add("is-busy");
  $("#year").textContent = new Date().getFullYear();

  const linksObj = Object.fromEntries(C.socials.map((s) => [s.key, s.url]));
  const typeOf = (v) => (Array.isArray(v) ? "string[]" : typeof v);
  const show = (v) => (Array.isArray(v) ? v.join(", ") : v);

  /* ── GET /me ───────────────────────────────────────────── */
  $("#about").innerHTML = C.about.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#facts").innerHTML = [
    { key: "role", value: C.role },
    ...C.facts,
    { key: "available", value: C.available, label: C.available ? "Evet — " + C.availability : "Şu an değil" },
  ]
    .map(
      (f) => `<div class="field">
        <span class="field__key">${esc(f.key)}<span class="field__type">${typeOf(f.value)}</span></span>
        <span class="field__val">${esc(typeof f.value === "boolean" ? f.label : show(f.value))}</span>
      </div>`
    )
    .join("");

  const me = {
    name: fullname,
    role: C.role,
    ...Object.fromEntries(C.facts.map((f) => [f.key, f.value])),
    email: C.email,
    available: C.available,
    links: linksObj,
  };

  /* ── GET /skills ───────────────────────────────────────── */
  $("#skillList").innerHTML = C.skills
    .map((g) => `<div><h3>${esc(g.group)} <code>${esc(g.key)}</code></h3><ul>${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`)
    .join("");
  panels.skills.set(Object.fromEntries(C.skills.map((g) => [g.key, g.items])), `<span class="ok">200</span>`, "application/json");

  /* ── GET /projects ─────────────────────────────────────── */
  const table = $("#projectTable");
  const statusClass = (s) => (s === "geliştiriliyor" ? "is-live" : s === "tamamlandı" ? "is-done" : "");
  table.innerHTML =
    `<div class="row row--head" aria-hidden="true"><span class="row__id">id</span><span>Proje</span><span>Durum</span></div>` +
    C.projects
      .map(
        (p, i) => `<button class="row" type="button" role="option" aria-selected="false" data-i="${i}">
          <span class="row__id">${esc(p.id)}</span>
          <span class="row__name">${esc(p.title)}<span class="row__stack">${esc(p.tags.join(" · "))}</span></span>
          <span class="row__status ${statusClass(p.status)}">${esc(p.status || "—")}</span>
        </button>`
      )
      .join("");

  const detail = $("#projectDetail");
  const projectJson = (p) => ({
    id: p.id,
    name: p.title,
    status: p.status || null,
    year: p.year || null,
    stack: p.tags,
    description: p.description,
    links: Object.fromEntries((p.links || []).map((l) => [l.label.toLowerCase(), l.url])),
  });
  const listPanel = () =>
    panels.project.set(
      C.projects.map((p) => ({ id: p.id, name: p.title, status: p.status || null, stack: p.tags })),
      `<span class="ok">200</span>`,
      `${C.projects.length} kayıt`
    );

  const selectProject = (i, flash = true) => {
    const p = C.projects[i];
    $$(".row[data-i]", table).forEach((r) => r.setAttribute("aria-selected", String(r.dataset.i == i)));
    $("#projectPath").textContent = `/v1/projects/${p.id}`;
    detail.innerHTML = `
      <div class="detail__media">${
        p.image
          ? `<img src="${esc(p.image)}" alt="${esc(p.title)} ekran görüntüsü" loading="lazy">`
          : `<div class="detail__empty">// görsel yakında</div>`
      }</div>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.description)}</p>
      ${
        p.links?.length
          ? `<div class="detail__links">${p.links.map((l) => `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("")}</div>`
          : ""
      }`;
    panels.project.set(projectJson(p), `<span class="ok">200</span>`, `/projects/${esc(p.id)}`, flash);
  };
  table.addEventListener("click", (e) => {
    const row = e.target.closest(".row[data-i]");
    if (row) selectProject(+row.dataset.i);
  });
  table.addEventListener("keydown", (e) => {
    if (!["ArrowDown", "ArrowUp"].includes(e.key)) return;
    const rows = $$(".row[data-i]", table);
    const cur = rows.indexOf(document.activeElement);
    if (cur < 0) return;
    e.preventDefault();
    const next = rows[(cur + (e.key === "ArrowDown" ? 1 : -1) + rows.length) % rows.length];
    next.focus();
    selectProject(+next.dataset.i);
  });
  if (C.projects.length) selectProject(0, false);
  else listPanel();

  /* ── GET /experience ───────────────────────────────────── */
  $("#log").innerHTML = C.experience
    .map(
      (j) => `<li>
        <span class="log__time">${esc(range(j.start, j.end))}</span>${j.type ? `<span class="log__type">${esc(j.type)}</span>` : ""}
        <h3>${esc(j.role)}</h3>
        <span class="log__company">${esc(j.company)}</span>
        <p>${esc(j.description)}</p>
      </li>`
    )
    .join("");
  panels.experience.set(
    C.experience.map((j) => ({ role: j.role, company: j.company, type: j.type, start: j.start || null, end: j.end || null })),
    `<span class="ok">200</span>`,
    `${C.experience.length} kayıt`
  );

  /* ── Alt bilgi & kopyalama ─────────────────────────────── */
  $("#footLinks").innerHTML = [...C.socials.map((s) => ({ label: s.label, url: s.url })), { label: "E-posta", url: `mailto:${C.email}` }]
    .map((s) => `<a href="${esc(s.url)}"${s.url.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${esc(s.label)} ↗</a>`)
    .join("");
  const hint = $("#copyHint");
  $("#copyEmail").addEventListener("click", () => copy(C.email, hint));

  /* ── Saat & tema ───────────────────────────────────────── */
  const clock = $("#clock");
  const fmt = new Intl.DateTimeFormat("tr-TR", { hour: "2-digit", minute: "2-digit", timeZone: C.timezone });
  const tick = () => (clock.textContent = `${C.location.split(",")[0]} · ${fmt.format(new Date())}`);
  tick();
  setInterval(tick, 15000);

  $("#themeToggle").addEventListener("click", () => {
    const root = document.documentElement;
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });

  /* ── Aktif endpoint ────────────────────────────────────── */
  const navLinks = $$(".endpoints a");
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => {
          const on = a.hash === `#${e.target.id}`;
          on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current");
          if (on && innerWidth <= 860) a.scrollIntoView({ block: "nearest", inline: "nearest" });
        });
      }),
    { rootMargin: "-40% 0px -55% 0px" }
  );
  $$(".ep").forEach((s) => io.observe(s));

  /* ── POST /contact ─────────────────────────────────────── */
  const form = $("#mailForm");
  const status = $("#mailStatus");
  const f = { name: $("#f-name"), email: $("#f-email"), subject: $("#f-subject"), message: $("#f-message") };
  const chips = $$(".chips button");
  const sendBtn = $("#sendBtn");

  const body = () => Object.fromEntries(Object.entries(f).map(([k, el]) => [k, el.value.trim()]));
  const showRequest = () => panels.contact.set(body(), `<span class="tag">Request body</span>`, "taslak");
  showRequest();

  form.addEventListener("input", (e) => {
    if (e.target.checkValidity?.() && e.target.value.trim()) e.target.removeAttribute("aria-invalid");
    status.textContent = "";
    status.classList.remove("is-ok");
    if (e.target.name === "subject") chips.forEach((c) => c.classList.toggle("is-active", c.dataset.subject === f.subject.value));
    showRequest();
  });
  chips.forEach((chip) =>
    chip.addEventListener("click", () => {
      f.subject.value = chip.dataset.subject;
      chips.forEach((c) => c.classList.toggle("is-active", c === chip));
      f.subject.removeAttribute("aria-invalid");
      showRequest();
      f.message.focus();
    })
  );
  form.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); form.requestSubmit(); }
  });

  const respond = (code, text, data) =>
    panels.contact.set(data, `<span class="${code < 300 ? "ok" : "req__status"}">${code} ${text}</span>`, "yanıt", true);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (form._gotcha.value) return;

    const fields = Object.values(f);
    const invalid = fields.filter((el) => !el.value.trim() || !el.checkValidity());
    fields.forEach((el) => (invalid.includes(el) ? el.setAttribute("aria-invalid", "true") : el.removeAttribute("aria-invalid")));
    if (invalid.length) {
      const errors = Object.fromEntries(
        Object.entries(f)
          .filter(([, el]) => invalid.includes(el))
          .map(([k, el]) => [k, el.value.trim() ? "geçersiz format" : "zorunlu alan"])
      );
      respond(422, "Unprocessable", { error: "validation_failed", fields: errors });
      status.textContent = "Eksik ya da hatalı alanlar var.";
      invalid[0].focus();
      return;
    }

    const data = body();

    if (!C.formEndpoint) {
      const text = `${data.message}\n\n— ${data.name} (${data.email})`;
      location.href = `mailto:${C.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(text)}`;
      respond(202, "Accepted", { status: "e-posta uygulaması açıldı", next: "Gönder'e basman yeterli." });
      status.textContent = "E-posta uygulaman açıldı — orada gönder.";
      status.classList.add("is-ok");
      return;
    }

    sendBtn.disabled = true;
    status.textContent = "Gönderiliyor…";
    try {
      const res = await fetch(C.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...C.formExtra, ...data, _replyto: data.email }),
      });
      if (!res.ok) throw new Error(res.status);
      respond(201, "Created", { status: "gönderildi", to: fullname, replyTo: data.email });
      status.textContent = `Teşekkürler ${data.name.split(" ")[0]}, mesajın ulaştı.`;
      status.classList.add("is-ok");
      form.reset();
      chips.forEach((c) => c.classList.remove("is-active"));
    } catch (err) {
      respond(502, "Bad Gateway", { error: "gönderilemedi", fallback: C.email });
      status.textContent = "Gönderilemedi. Doğrudan e-posta atabilirsin.";
    } finally {
      sendBtn.disabled = false;
    }
  });

  /* ── /me yanıtı + gerçek render süresi ─────────────────── */
  const ms = Math.max(1, Math.round(performance.now() - t0));
  $("#latency").textContent = `${ms} ms`;
  panels.me.set(me, `<span class="ok">200 OK</span>`, `${ms} ms`);
})();
