/* arac-ilan-filtre — Araç İlan Filtre — sol filtre paneli, araç kart ızgarası, hızlı bakış çekmecesi (16 Kas 2026 · mcp:webmaker/20261116-113510-tlwf · D17).
   Solda yapışkan filtre paneli: kayıtların `marka` (seçim kutusu), `yakit` ve `vites` (radyo çipleri) değerlerinden ve `fiyat` aralığından (azami fiyat sürgüsü) türeyen süzgeçler + sıfırla. Sağda araç kartları (görsel, yıl rozeti, marka, model, yakıt · vites · km, fiyat), «n / t» sayacı ve «sonuç yok» durumu. Kartın «hızlı bakış» düğmesi aracı yandan kayan <dialog> çekmecesinde, iletişim düğmeleriyle açar. JS yokken panel ve düğmeler gizli, tüm kartlar görünür.
   Üretici: scripts/modul-fabrika (aile module) — elle düzenleme yerine tanımı değiştirip yeniden üret.
   Veri: desing: ust · baslik · metin · img · img2 · cta_ad/cta_url · cta2_ad/cta2_url; data (maddeler): [{ ikon?, baslik, metin?, url? }] — metinler dil sözlüğü. */
const P = "modulex-arac-ilan-filtre";
const IMG_KOK = `/img/${json.id}/`;
/* --- ortak ön ek (scripts/modul-fabrika/on-ek.js) — dil · güvenlik · sayı yardımcıları --- */
const pick = (v) => {
  if (v == null) return "";
  if (typeof v !== "object") return String(v);
  if (typeof wmPickLang === "function") { try { return wmPickLang(v, json.lang) || ""; } catch (e) { /* alt satır */ } }
  return String(v[json.lang] ?? Object.values(v)[0] ?? "");
};
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const medyaUrl = (v) => {
  const s = String(v ?? "").trim();
  if (!s || /^\s*(javascript|vbscript|file):/i.test(s)) return "";
  if (/^data:/i.test(s)) return /^data:(image|video|audio)\//i.test(s) ? s : "";
  if (s.startsWith("/") || /^https?:\/\//i.test(s)) return s;
  return `${IMG_KOK}${s}`;
};
const href = (v) => {
  const s = String(v ?? "").trim();
  if (!s || /^\s*(javascript|vbscript|data):/i.test(s)) return "";
  if (/^(https?:)?\/\//i.test(s) || /^(mailto:|tel:|#)/i.test(s)) return s;
  return wxLangInternalHref(s);
};
const dogru = (v, d) => (v === undefined || v === null || v === "") ? d : !(v === false || v === "false" || v === 0 || v === "0");
const ikonAd = (v) => String(v ?? "").trim().replace(/[^a-z0-9_]/gi, "");
const satirlar = (s) => esc(s).replace(/\r?\n/g, "<br />");
/* ilk dolu alan: yeni ad önce, eski kuşak şablonun adı yedek (G6 yalnız path değiştirerek takas eder) */
const ilk = (o, ks) => {
  for (const k of ks) {
    const v = o == null ? undefined : o[k];
    if (v == null || v === "") continue;
    if (typeof v === "object" && !Array.isArray(v) && !Object.keys(v).length) continue;
    return v;
  }
  return "";
};
const metinAl = (o, ks) => pick(ilk(o, ks)).trim();
const { desing: des = {} } = json;
const setting = webmakerdata?.setting ?? {};
const veri = Array.isArray(json.data) ? json.data : [];
const dil = String(json.lang || "");
const sayiBicim = (v, ondalik) => {
  try { return new Intl.NumberFormat(dil || undefined, { minimumFractionDigits: ondalik, maximumFractionDigits: ondalik }).format(v); } catch (e) { return String(v); }
};
const ikonH = (ad, sinif) => (ad ? `<span class="${sinif} material-symbols-outlined" aria-hidden="true">${ad}</span>` : "");
const no = (i) => String(i + 1).padStart(2, "0");
const ctaHtml = () => {
  const a1 = metinAl(des, ["cta_ad", "button"]); const u1 = href(ilk(des, ["cta_url", "buttonurl", "url"]));
  const a2 = metinAl(des, ["cta2_ad"]); const u2 = href(ilk(des, ["cta2_url"]));
  const d = (a, u, ek) => (a && u ? `<a class="${P}-dugme${ek}" href="${esc(u)}">${esc(a)}<span class="material-symbols-outlined mx-flip" aria-hidden="true">arrow_forward</span></a>` : "");
  const ic = d(a1, u1, "") + d(a2, u2, ` ${P}-dugme--ikincil`);
  return ic ? `<div class="${P}-cta">${ic}</div>` : "";
};
const basHtml = (B, ek) => {
  if (!B.ust && !B.baslik && !B.metin && !ek) return "";
  return `<header class="${P}-bas">`
    + (B.ust ? `<p class="${P}-ust">${esc(B.ust)}</p>` : "")
    + (B.baslik ? `<h2 class="${P}-baslik" id="${P}-{{id}}-b">${esc(B.baslik)}</h2>` : "")
    + (B.metin ? `<p class="${P}-metin">${satirlar(B.metin)}</p>` : "")
    + (ek || "")
    + "</header>";
};
/* --- aile: module --- */
const yeniMadde = veri.map((o) => ({
  ikon: ikonAd(ilk(o, ["ikon", "icon"])), baslik: metinAl(o, ["baslik", "name", "title"]),
  metin: metinAl(o, ["metin", "text", "description", "spot"]), url: href(ilk(o, ["url", "link"])),
})).filter((k) => k.baslik);
/* module-1 eski şeması: name2/spot2/icon2 … name4 → madde */
const eskiMadde = [2, 3, 4].map((n) => ({ ikon: ikonAd(des["icon" + n]), baslik: metinAl(des, ["name" + n]), metin: metinAl(des, ["spot" + n]), url: "" })).filter((k) => k.baslik);
const kayitlar = yeniMadde.length ? yeniMadde : eskiMadde;
const G1 = medyaUrl(ilk(des, ["img", "image"]));
const G2 = medyaUrl(ilk(des, ["img2", "image2"]));
const gH = (src, s, w, h) => (src ? `<img class="${P}-${s}" src="${esc(src)}" alt="" width="${w || 1200}" height="${h || 900}" loading="lazy" decoding="async" />` : "");
const ustH = (B) => (B.ust ? `<p class="${P}-ust">${esc(B.ust)}</p>` : "");
const basH = (B) => (B.baslik ? `<h2 class="${P}-baslik" id="${P}-{{id}}-b">${esc(B.baslik)}</h2>` : "");
const metH = (B) => (B.metin ? `<p class="${P}-metin">${satirlar(B.metin)}</p>` : "");
const listeH = (ic) => (ic ? `<ul class="${P}-maddeler" role="list">${ic}</ul>` : "");
const maddeVar = (k, i) => `<li class="${P}-madde">${ikonH(k.ikon || "check_circle", `${P}-mikon`)}<div class="${P}-myazi"><h3 class="${P}-mbaslik">${k.url ? `<a class="${P}-bag" href="${esc(k.url)}">${esc(k.baslik)}</a>` : esc(k.baslik)}</h3>${k.metin ? `<p class="${P}-mmetin">${satirlar(k.metin)}</p>` : ""}</div></li>`;
/* --- modül: arac-ilan-filtre --- */
const kart = () => "";
const sar = (ic, A, B) => {
    const R = yeniMadde.length ? veri.filter((o) => metinAl(o, ["baslik", "name", "title"])) : [];
    const x = (i, ks) => metinAl(R[i] || {}, ks);
    const sy = (i, ks) => {
      const v = ilk(R[i] || {}, ks);
      if (typeof v === "number") return v;
      let t = pick(v).replace(/[^\d.,]/g, "");
      t = /,\d{1,2}$/.test(t) ? t.replace(/\./g, "").replace(",", ".") : t.replace(/[.,](?=\d{3}(\D|$))/g, "").replace(",", ".");
      const n = t ? Number(t) : NaN;
      return Number.isFinite(n) ? n : NaN;
    };
    const PB = /^[A-Za-z]{3}$/.test(metinAl(des, ["paraBirimi"])) ? metinAl(des, ["paraBirimi"]).toUpperCase() : "";
    const para = (v) => { try { return new Intl.NumberFormat(dil || undefined, PB ? { style: "currency", currency: PB, maximumFractionDigits: 0 } : { maximumFractionDigits: 0 }).format(v); } catch (e) { return String(v); } };
    const AL = (k, y) => metinAl(des, [k]) || y;
    const D = A.map((k, i) => ({ k, marka: x(i, ["marka", "brand"]), yakit: x(i, ["yakit", "fuel"]), vites: x(i, ["vites", "gear", "transmission"]), yil: x(i, ["yil", "year"]), km: sy(i, ["km", "kilometre"]), f: sy(i, ["fiyat", "price"]), fs: x(i, ["fiyat", "price"]), g: medyaUrl(R[i] ? ilk(R[i], ["img", "image", "gorsel"]) : "") }));
    const tek = (L) => [...new Set(L.filter(Boolean))];
    const MR = tek(D.map((d) => d.marka));
    const YK = tek(D.map((d) => d.yakit));
    const VT = tek(D.map((d) => d.vites));
    const FS = D.map((d) => d.f).filter(Number.isFinite);
    const fmin = FS.length ? Math.min(...FS) : 0;
    const fmax = FS.length ? Math.max(...FS) : 0;
    const adim = Math.max(1, Math.pow(10, Math.max(0, String(Math.round((fmax - fmin) / 20)).length - 1)));
    /* sürgü değeri min'den adım katlarına oturur → en pahalı araç süzülmesin diye alt sınır fmax'tan geriye adım katı */
    const fAlt = fmax - Math.ceil((fmax - fmin) / adim) * adim;
    const HB = AL("hizliBakisAd", "@cookie-details@");
    const grup = (ad, et, L) => (L.length > 1 ? `<fieldset class="${P}-grup"><legend class="${P}-aetiket">${esc(et || "@category@")}</legend><div class="${P}-cipler"><label class="${P}-cip"><input class="${P}-radyo" type="radio" name="${ad}" value="" checked /><span>@all@</span></label>${L.map((v) => `<label class="${P}-cip"><input class="${P}-radyo" type="radio" name="${ad}" value="${esc(v)}" /><span>${esc(v)}</span></label>`).join("")}</div></fieldset>` : "");
    const alanlar = (MR.length > 1 ? `<label class="${P}-alan"><span class="${P}-aetiket">${esc(AL("markaAd", "@category@"))}</span><select class="${P}-secici" name="marka"><option value="">@all@</option>${MR.map((m) => `<option value="${esc(m)}">${esc(m)}</option>`).join("")}</select></label>` : "")
      + grup("yakit", AL("yakitAd", ""), YK) + grup("vites", AL("vitesAd", ""), VT)
      + (FS.length > 1 && fmax > fmin ? `<label class="${P}-alan"><span class="${P}-aetiket">${esc(AL("fiyatAd", "@total@"))}</span><input class="${P}-kaydir" type="range" name="fiyat" min="${fAlt}" max="${fmax}" step="${adim}" value="${fmax}" /><output class="${P}-cikti" data-cikti>${esc(para(fmax))}</output></label>` : "");
    const panel = alanlar ? `<aside class="${P}-panel" data-panel hidden><form class="${P}-form" data-filtre data-para="${PB}"><p class="${P}-pbaslik"><span class="material-symbols-outlined" aria-hidden="true">tune</span>${esc(AL("filtreAd", "@category@"))}</p>${alanlar}<button type="reset" class="${P}-sifirla"><span class="material-symbols-outlined" aria-hidden="true">restart_alt</span>${esc(AL("sifirlaAd", "@all@"))}</button></form></aside>` : "";
    const kart = (d) => {
      const fm = Number.isFinite(d.f) ? para(d.f) : d.fs;
      const oz = [["local_gas_station", d.yakit], ["settings", d.vites], ["speed", Number.isFinite(d.km) ? `${sayiBicim(d.km, 0)} km` : ""]].filter((z) => z[1]);
      return `<li class="${P}-arac" data-arac data-marka="${esc(d.marka)}" data-yakit="${esc(d.yakit)}" data-vites="${esc(d.vites)}"${Number.isFinite(d.f) ? ` data-fiyat="${d.f}"` : ""}><article class="${P}-akart" data-govde><div class="${P}-amedya">${d.g ? `<img class="${P}-agorsel" src="${esc(d.g)}" alt="" width="960" height="640" loading="lazy" decoding="async" />` : `<span class="${P}-ayer">${ikonH(d.k.ikon || "directions_car", "")}</span>`}${d.yil ? `<span class="${P}-ayil"><bdi>${esc(d.yil)}</bdi></span>` : ""}</div><div class="${P}-agovde">${d.marka ? `<p class="${P}-amarka">${esc(d.marka)}</p>` : ""}<h3 class="${P}-amodel">${esc(d.k.baslik)}</h3>${oz.length ? `<ul class="${P}-aozel" role="list">${oz.map((z) => `<li>${ikonH(z[0], `${P}-oikon`)}<span>${esc(z[1])}</span></li>`).join("")}</ul>` : ""}${d.k.metin ? `<p class="${P}-aacik">${satirlar(d.k.metin)}</p>` : ""}${fm || d.k.url ? `<div class="${P}-aalt">${fm ? `<strong class="${P}-afiyat"><bdi>${esc(fm)}</bdi></strong>` : ""}${d.k.url ? `<a class="${P}-adetay" href="${esc(d.k.url)}">@read-more@</a>` : ""}</div>` : ""}</div></article><button type="button" class="${P}-hizli" data-hizli aria-haspopup="dialog" aria-label="${esc(HB)} · ${esc(d.k.baslik)}" hidden><span class="material-symbols-outlined" aria-hidden="true">visibility</span>${esc(HB)}</button></li>`;
    };
    const cekmece = `<dialog class="${P}-cekmece" data-cekmece aria-label="${esc(HB)}"><div class="${P}-cbas"><p class="${P}-cbaslik">${esc(HB)}</p><button type="button" class="${P}-ckapat" data-kapat aria-label="${esc(AL("kapatAd", "@menu-close@"))}"><span class="material-symbols-outlined" aria-hidden="true">close</span></button></div><div class="${P}-cic" data-cic></div>${ctaHtml()}</dialog>`;
    return `<div class="${P}-giris">${ustH(B)}${basH(B)}${metH(B)}</div><div class="${P}-galeri${panel ? ` ${P}-galeri--filtreli` : ""}">${panel}<div class="${P}-sonuc"><p class="${P}-sayac" data-sayac aria-live="polite" hidden></p><ul class="${P}-araclar" role="list">${D.map(kart).join("")}</ul><p class="${P}-yok" data-yok hidden><span class="material-symbols-outlined" aria-hidden="true">search_off</span>${esc(AL("sonucYokAd", "@no-results@"))}</p></div></div>${cekmece}`;
  };
const B = { ust: metinAl(des, ["ust","title","badge"]), baslik: metinAl(des, ["baslik","name"]), metin: metinAl(des, ["metin","description"]) };
/* veri yoksa gövde hiç kurulmaz (sarmalayıcı boş listeye dokunmaz) */
const BOS = !B.baslik && !B.metin;
const govde = BOS ? "" : sar(kayitlar.map((k, i) => kart(k, i, kayitlar.length, kayitlar)).join(""), kayitlar, B);
const bas = "";
const sinif = (bas || B.ust || B.baslik || B.metin ? "" : ` ${P}--bassiz`);
html = html
  .replaceAll("{{fbsinif}}", () => sinif)
  .replaceAll("{{fbetiket}}", () => (B.baslik ? `aria-labelledby="${P}-{{id}}-b"` : ""))
  .replaceAll("{{fbbas}}", () => bas)
  .replaceAll("{{fbgovde}}", () => govde);
if (BOS) html = "";
