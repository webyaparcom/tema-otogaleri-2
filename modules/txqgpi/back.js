// Footer-5 modülü back.js
var backhtml = "";

function f5Pick(obj) {
  if (!obj) return "";
  if (typeof obj === "object") {
    return obj[json.lang] || obj.tr || "";
  }
  return String(obj);
}

try {
  var logo = json.desing.logo || "logo.png";
  html = html.replace(new RegExp("{{logo}}", "g"), logo);

  var webName = f5Pick(json.desing.web_name);
  html = html.replace(new RegExp("{{web-name}}", "g"), webName);

  var description = f5Pick(json.desing.description);
  html = html.replace(new RegExp("{{description}}", "g"), description);

  var corporateTitle = f5Pick(json.desing.corporate_title);
  html = html.replace(new RegExp("{{corporate-title}}", "g"), corporateTitle);

  // Corporate links placeholder - dinamik veri işleme
  var corporateLinks =
    json.data && json.data.corporate_links
      ? json.data.corporate_links
          .map(function(link) {
            var linkName = f5Pick(link.name);
            if (!linkName && link.name) linkName = String(link.name);
            return `<li><a href="${link.url || "#"}">${linkName}</a></li>`;
          })
          .join("")
      : "";
  html = html.replace(new RegExp("{{corporate-links}}", "g"), corporateLinks);

  var categoriesTitle = f5Pick(json.desing.categories_title);
  html = html.replace(new RegExp("{{categories-title}}", "g"), categoriesTitle);

  // Category links placeholder - dinamik veri işleme
  var categoryLinks =
    json.data && json.data.category_links
      ? json.data.category_links
          .map(function(link) {
            var linkName = f5Pick(link.name);
            if (!linkName && link.name) linkName = String(link.name);
            return `<li><a href="${link.url || "#"}">${linkName}</a></li>`;
          })
          .join("")
      : "";
  html = html.replace(new RegExp("{{category-links}}", "g"), categoryLinks);

  var contactTitle = f5Pick(json.desing.contact_title);
  html = html.replace(new RegExp("{{contact-title}}", "g"), contactTitle);

  var workingHours = f5Pick(json.desing.working_hours);
  html = html.replace(new RegExp("{{working-hours}}", "g"), workingHours);

  // Phone number placeholder
  var phoneNumber = json.desing.phone_number || "444 2 102";
  html = html.replace(new RegExp("{{phone-number}}", "g"), phoneNumber);

  // Email address placeholder
  var emailAddress = json.desing.email_address || "destek@example.com";
  html = html.replace(new RegExp("{{email-address}}", "g"), emailAddress);

  var followUs = f5Pick(json.desing.follow_us);
  html = html.replace(new RegExp("{{follow-us}}", "g"), followUs);

  // Social media links placeholder - SVG ikonlar ile
  var socialMediaLinks =
    json.data && json.data.social_media_links
      ? json.data.social_media_links
          .map(function(social) {
            var iconSvg = "";
            var iconType = social.icon || "default";

            switch (iconType) {
              case "facebook":
                iconSvg =
                  '<svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>';
                break;
              case "twitter":
                iconSvg =
                  '<svg viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>';
                break;
              case "instagram":
                iconSvg =
                  '<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>';
                break;
              case "linkedin":
                iconSvg =
                  '<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>';
                break;
              case "youtube":
                iconSvg =
                  '<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>';
                break;
              default:
                iconSvg =
                  '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>';
            }

            var socialName = f5Pick(social.name);
            if (!socialName && social.name) socialName = String(social.name);

            return `<a href="${
              social.url || "#"
            }" target="_blank" title="${socialName}">${iconSvg}</a>`;
          })
          .join("")
      : "";
  html = html.replace(
    new RegExp("{{social-media-links}}", "g"),
    socialMediaLinks,
  );

  var copyright = f5Pick(json.desing.copyright);
  html = html.replace(new RegExp("{{copyright}}", "g"), copyright);

  var jetkurText = f5Pick(json.desing.jetkur_text);
  html = html.replace(new RegExp("{{jetkur-text}}", "g"), jetkurText);

  var sslText = f5Pick(json.desing.ssl_text);
  html = html.replace(new RegExp("{{ssl-text}}", "g"), sslText);
} catch (error) {
  console.error("Footer-5 modülü back.js hatası:", error);
  // Hata durumunda varsayılan değerler kullan
  html = html;
}

/* --- mobil uygulama kuralı (12 Kas 2026): mobilde sabit ALT BAR Ara · E-posta · Dil + dil için alttan açılan sayfa (footer-9 kalıbı).
   Veri yoksa o düğme yok (uydurma kanal yok): telefon/e-posta desing.phone/email → setting.phone/email; dil düğmesi yalnız >1 dil + showlang açıkken.
   Hiç düğme yoksa bar basılmaz, sayfa altına boşluk ayrılmaz. Masaüstünde (>768px) görünmez; CF Worker (strict) uyumlu, yalnız var/function. */
var f5Dict = {
  tr: { ara: "Ara", mail: "E-posta", dil: "Dil", hizli: "Hızlı erişim", kapat: "Kapat" },
  en: { ara: "Call", mail: "Email", dil: "Language", hizli: "Quick access", kapat: "Close" },
  de: { ara: "Anrufen", mail: "E-Mail", dil: "Sprache", hizli: "Schnellzugriff", kapat: "Schließen" },
  es: { ara: "Llamar", mail: "Correo", dil: "Idioma", hizli: "Acceso rápido", kapat: "Cerrar" },
  fr: { ara: "Appeler", mail: "E-mail", dil: "Langue", hizli: "Accès rapide", kapat: "Fermer" },
  ru: { ara: "Звонок", mail: "Почта", dil: "Язык", hizli: "Быстрый доступ", kapat: "Закрыть" },
  ar: { ara: "اتصال", mail: "بريد", dil: "اللغة", hizli: "وصول سريع", kapat: "إغلاق" }
};
var f5T = f5Dict[json.lang] || f5Dict.en;
function f5Esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function f5Tx(v) {
  if (v == null) return "";
  if (typeof v !== "object") return String(v);
  return v[json.lang] != null ? String(v[json.lang]) : (v.tr != null ? String(v.tr) : (v.en != null ? String(v.en) : ""));
}
var f5Ayar = (webmakerdata && webmakerdata.setting) || {};
var f5Tel = (f5Tx(json.desing && json.desing.phone).trim()) || (typeof f5Ayar.phone === "string" ? f5Ayar.phone.trim() : "");
var f5Mail = (f5Tx(json.desing && json.desing.email).trim()) || (typeof f5Ayar.email === "string" ? f5Ayar.email.trim() : "");
/* footer-5 kendi alanlarını gösterir: phone_number / email_address; modül varsayılan yer tutucusu (example.*) bara girmez */
if (!f5Tel && typeof json.desing.phone_number === "string") f5Tel = json.desing.phone_number.trim();
if (!f5Mail && typeof json.desing.email_address === "string" && !/@example\./i.test(json.desing.email_address)) f5Mail = json.desing.email_address.trim();
/* örnek/yer tutucu adres (example.*) gerçek kanal değildir: bara girmez */
if (/@example\./i.test(f5Mail)) f5Mail = "";
var f5DilSayi = 0;
if (f5Ayar.langs && typeof f5Ayar.langs === "object") { for (var f5Lk in f5Ayar.langs) { if (f5Ayar.langs[f5Lk]) f5DilSayi++; } }
var f5LangLi = "";
if (typeof wmLangHtml === "function") { try { f5LangLi = wmLangHtml({ style: "text" }) || ""; f5DilSayi = f5LangLi ? 2 : 0; } catch (e) { /* sayım yedeği */ } }
var f5DilAcik = f5DilSayi > 1 && !(json.desing && (json.desing.showlang === false || json.desing.showlang === "false"));
var f5Dugme = "";
if (f5Tel) f5Dugme += '<a href="tel:' + f5Tel.replace(/[^+\d]/g, "") + '" dir="ltr"><span class="material-symbols-outlined" aria-hidden="true">call</span>' + f5Esc(f5T.ara) + "</a>";
if (f5Mail) f5Dugme += '<a href="mailto:' + f5Esc(f5Mail) + '"><span class="material-symbols-outlined" aria-hidden="true">mail</span>' + f5Esc(f5T.mail) + "</a>";
if (f5DilAcik) f5Dugme += '<button type="button" class="modulex-f5__bar-dil" aria-haspopup="dialog" aria-expanded="false"><span class="material-symbols-outlined" aria-hidden="true">language</span>' + f5Esc(f5T.dil) + " · " + f5Esc(String(json.lang || "").toUpperCase()) + "</button>";
if (f5Dugme) {
  html += '<nav class="modulex-f5__bar" aria-label="' + f5Esc(f5T.hizli) + '">' + f5Dugme + "</nav>" +
    (f5DilAcik ? '<div class="modulex-f5__sheet" hidden><div class="modulex-f5__sheet-ic" role="dialog" aria-modal="true" aria-label="' + f5Esc(f5T.dil) + '"><div class="modulex-f5__sheet-ust"><strong>' + f5Esc(f5T.dil) + '</strong><button type="button" class="modulex-f5__sheet-kapat" aria-label="' + f5Esc(f5T.kapat) + '"><span class="material-symbols-outlined" aria-hidden="true">close</span></button></div><div class="modulex-f5__sheet-liste">' + (f5LangLi ? "<ul>" + f5LangLi + "</ul>" : "") + '</div></div></div>' : "") +
    '<style>' +
    '.modulex-f5__bar,.modulex-f5__sheet{display:none}' +
    '@media (max-width:768px){' +
    ':root{--mx-altbar-h:56px}' +
    'body{padding-bottom:calc(56px + env(safe-area-inset-bottom,0px))}' +
    '.modulex-f5__bar{display:flex;position:fixed;inset-inline:0;bottom:0;z-index:9990;background:--footer_bg--;border-top:1px solid color-mix(in srgb,--footer_text-- 35%,transparent);box-shadow:0 -6px 20px rgba(0,0,0,.22);padding-bottom:env(safe-area-inset-bottom,0)}' +
    '.modulex-f5__bar a,.modulex-f5__bar-dil{flex:1 1 0;min-width:0;min-height:56px;display:inline-flex;align-items:center;justify-content:center;gap:8px;color:--footer_text--;text-decoration:none;font:inherit;font-weight:600;font-size:15px;border:0;background:transparent;cursor:pointer;padding:0 8px}' +
    '.modulex-f5__bar>*+*{border-inline-start:1px solid color-mix(in srgb,--footer_text-- 25%,transparent)}' +
    '.modulex-f5__bar .material-symbols-outlined,.modulex-f5__sheet .material-symbols-outlined{font-size:22px;line-height:1}' +
    '.modulex-f5__bar a:focus-visible,.modulex-f5__bar-dil:focus-visible,.modulex-f5__sheet-kapat:focus-visible,.modulex-f5__sheet a:focus-visible{outline:2px solid currentColor;outline-offset:-4px}' +
    '.modulex-f5__sheet:not([hidden]){display:flex;position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,.55);align-items:flex-end}' +
    '.modulex-f5__sheet-ic{width:100%;max-height:70vh;overflow-y:auto;background:--footer_bg--;color:--footer_text--;border-radius:18px 18px 0 0;padding:8px 16px calc(16px + env(safe-area-inset-bottom,0px))}' +
    '.modulex-f5__sheet-ust{display:flex;align-items:center;justify-content:space-between;min-height:48px;margin-bottom:8px;font-size:16px}' +
    '.modulex-f5__sheet-kapat{width:48px;height:48px;display:inline-flex;align-items:center;justify-content:center;border:0;background:transparent;color:inherit;cursor:pointer;border-radius:50%}' +
    '.modulex-f5__sheet-liste{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.modulex-f5__sheet-liste ul{display:contents}' +
    '.modulex-f5__sheet-liste a{display:flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:48px;min-height:48px;padding:0 10px;border:1px solid color-mix(in srgb,--footer_text-- 40%,transparent);border-radius:12px;font-weight:600;color:--footer_text--;text-decoration:none;background:transparent}' +
    '.modulex-f5__sheet-liste li.wm-lang-active a,.modulex-f5__sheet-liste a[aria-current]{background:--footer_text--;color:--footer_bg--;border-color:--footer_text--}' +
    '.modulex-f5__sheet-liste li{list-style:none;margin:0;padding:0;display:contents}' +
    '}' +
    '@media (prefers-reduced-motion:reduce){.modulex-f5__bar,.modulex-f5__sheet{transition:none!important;animation:none!important}}' +
    '</style>' +
    (f5DilAcik ? '<script>(function(){var b=document.querySelector(".modulex-f5__bar-dil"),sh=document.querySelector(".modulex-f5__sheet");if(!b||!sh){return;}' +
      'function kapa(){sh.hidden=true;b.setAttribute("aria-expanded","false");b.focus();}' +
      'b.addEventListener("click",function(){var ic=sh.querySelector(".modulex-f5__sheet-liste");' +
      'if(ic&&!ic.firstChild){var kaynak=document.querySelector(".wm-langbar ul")||document.querySelector("[class*=langs]");' +
      'if(kaynak){var kopya=kaynak.cloneNode(true);ic.appendChild(kopya);}else{var linkler=document.querySelectorAll("a[hreflang]");var ul=document.createElement("ul");for(var i=0;i<linkler.length;i++){if(sh.contains(linkler[i])){continue;}var li=document.createElement("li");li.appendChild(linkler[i].cloneNode(true));ul.appendChild(li);}if(ul.firstChild){ic.appendChild(ul);}else{b.hidden=true;return;}}}' +
      'var ac=sh.hidden;sh.hidden=!ac;b.setAttribute("aria-expanded",ac?"true":"false");if(ac){var k=sh.querySelector(".modulex-f5__sheet-kapat");if(k){k.focus();}}});' +
      'sh.addEventListener("click",function(e){if(e.target===sh||(e.target.closest&&e.target.closest(".modulex-f5__sheet-kapat"))){kapa();}});' +
      'document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!sh.hidden){kapa();}});})();<\/script>' : "");
}
