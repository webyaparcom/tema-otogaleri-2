// Find the page with `modulestatus.page` set to true
var pagesettingjson = webmakerdata.pagesetting.data.find(
  function(item) { return item.modulestatus && item.modulestatus.page; },
);

var backhtml = `<div class="modulex-menu-item">
  <a class="modulex-menu-link" href="${wxLangInternalHref('')}">@home@</a>
</div>`;

if (pagesettingjson) {
  for (var iterator of webmakerdata[pagesettingjson.path].data) {
    if (iterator.status === "play" && iterator.category === "") {
      var iteratorName =
        iterator.name[json.lang] || iterator.name.tr || iterator.name.en || "";
      /* sinif adlari index.html CSS/JS secicileriyle ayni (modulex-menu-*) */
      var itemClass = "modulex-menu-item";
      if (page.path === iterator.path) {
        itemClass += " modulex-menu-item-active";
      }
      var dropdownHtml = pagecategory(iterator.id);
      var caretHtml = "";
      if (dropdownHtml !== "") {
        itemClass += " modulex-menu-item-has-dropdown";
        caretHtml =
          '<span class="material-symbols-outlined modulex-menu-caret">expand_more</span>';
      }

      backhtml += `<div class="${itemClass}">
  <a class="modulex-menu-link" href="${wxLangInternalHref(
    iterator.pathnext || iterator.path,
  )}">
    ${iteratorName}
    ${caretHtml}
  </a>
  ${dropdownHtml}
</div>`;
    }
  }
}

html = html.replace(new RegExp("{{html}}", "g"), backhtml);

var contactcards = "";
for (var key of (json.data || [])) {
  var itemTitle = (key.name && typeof key.name === "object")
    ? (key.name[json.lang] || key.name.tr || key.name.en || "")
    : (key.name || "");
  var href = key.externalUrl || key.url || "#";
  if (href && href.indexOf("@") !== -1 && href.indexOf("mailto:") !== 0) {
    href = `mailto:${href}`;
  }
  if (href === "#" && key.icon === "phone" && key.spot) {
    href = `tel:${key.spot.replace(/\s+/g, "")}`;
  }
  if (href === "#" && key.icon === "mail" && key.spot) {
    href = `mailto:${key.spot}`;
  }
  var targetAttr = "";
  if (href.startsWith("http")) {
    targetAttr = ` target="_blank" rel="noopener noreferrer"`;
  }
  var itemSpot = (key.spot && typeof key.spot === "object")
    ? (key.spot[json.lang] || key.spot.tr || "")
    : (key.spot || "");
  var iconColor = key.iconcolor || "";
  var titleColor = key.titlecolor || "";
  var spotColor = key.spotcolor || "";
  var iconStyle = iconColor ? ` style="color:${iconColor};"` : "";
  var titleStyle = titleColor ? ` style="color:${titleColor};"` : "";
  var spotStyle = spotColor ? ` style="color:${spotColor};"` : "";

  contactcards += `
  <a href="${href}" class="modulex-contact-card"${targetAttr}>
    <span class="material-symbols-outlined modulex-contact-icon"${iconStyle}>${key.icon}</span>
    <span class="modulex-contact-text">
      <span class="modulex-contact-title"${titleStyle}>${itemTitle}</span>
      <span class="modulex-contact-spot"${spotStyle}>${itemSpot}</span>
    </span>
  </a>`;
}

html = html.replace(new RegExp("{{contactcards}}", "g"), contactcards);

// Dil linkleri: bulunulan sayfada kalsın (ana sayfa değilse aynı path ile dil değişsin)
var langhtml = "";
var langcount = 0;
var currentPagePath = (page && typeof page === "object" && page.path !== undefined) ? page.path : "";
for (var key in webmakerdata.setting.langs) {
  if (webmakerdata.setting.langs[key] === true) {
    langcount++;
    var langUrl = wxLangHref(key, currentPagePath || "");
    /* G1: tek üretici (hreflang + aria-current; png yoksa kod) — wmLangLi yoksa eski biçim */
langhtml += typeof wmLangLi === "function" ? wmLangLi(key, langUrl, { style: "flag" }) : `<li><a href="${langUrl}"><img height="25" src="/src/lang/${key}.png" alt="${key}" loading="lazy"></a></li>`;
  }
}

var langclass = "";
if (langcount <= 1) {
  langhtml = "";
  langclass = "lang-hidden";
}

html = html.replace(new RegExp("{{langhtml}}", "g"), langhtml);
html = html.replace(new RegExp("{{langclass}}", "g"), langclass);

var identityblock = "";
if (json.desing && json.desing.identity) {
  var identity = json.desing.identity;
  var identityTitle = "";
  var identityText = "";
  if (identity.title) {
    if (typeof identity.title === "object") {
      identityTitle =
        identity.title[json.lang] ||
        identity.title.tr ||
        identity.title.en ||
        "";
    } else {
      identityTitle = identity.title;
    }
  }
  if (identity.text) {
    if (typeof identity.text === "object") {
      identityText =
        identity.text[json.lang] ||
        identity.text.tr ||
        identity.text.en ||
        "";
    } else {
      identityText = identity.text;
    }
  }
  if (identityTitle !== "" || identityText !== "") {
    var titleHtml =
      identityTitle !== ""
        ? `<span class="modulex-identity-title">${identityTitle}</span>`
        : "";
    var textHtml =
      identityText !== ""
        ? `<p class="modulex-identity-text">${identityText}</p>`
        : "";
    identityblock = `<div class="modulex-identity">
  ${titleHtml}
  ${textHtml}
</div>`;
  }
}

var ctaarea = "";
if (json.desing && json.desing.cta) {
  var cta = json.desing.cta;
  var buttons = [];
  if (cta.primary) {
    var primary = cta.primary;
    var text = "";
    if (primary.text) {
      text =
        typeof primary.text === "object"
          ? primary.text[json.lang] || primary.text.tr || primary.text.en || ""
          : primary.text;
    }
    var url = primary.url || "";
    if (url && url.indexOf("{{lang}}") !== -1) {
      url = url.replace(new RegExp("{{lang}}", "g"), json.lang);
    }
    if (text !== "" && url !== "") {
      var target = "";
      if (url.indexOf("http") === 0) {
        target = ` target="_blank" rel="noopener noreferrer"`;
      }
      var iconHtml = "";
      if (primary.icon) {
        iconHtml = `<span class="material-symbols-outlined">${primary.icon}</span>`;
      }
      buttons.push(`<a class="modulex-cta-primary" href="${url}"${target}>
  <span>${text}</span>
  ${iconHtml}
</a>`);
    }
  }
  if (cta.secondary) {
    var secondary = cta.secondary;
    var text = "";
    if (secondary.text) {
      text =
        typeof secondary.text === "object"
          ? secondary.text[json.lang] ||
            secondary.text.tr ||
            secondary.text.en ||
            ""
          : secondary.text;
    }
    var url = secondary.url || "";
    if (url && url.indexOf("{{lang}}") !== -1) {
      url = url.replace(new RegExp("{{lang}}", "g"), json.lang);
    }
    if (text !== "" && url !== "") {
      var target = "";
      if (url.indexOf("http") === 0) {
        target = ` target="_blank" rel="noopener noreferrer"`;
      }
      var iconHtml = "";
      if (secondary.icon) {
        iconHtml = `<span class="material-symbols-outlined">${secondary.icon}</span>`;
      }
      buttons.push(`<a class="modulex-cta-secondary" href="${url}"${target}>
  <span>${text}</span>
  ${iconHtml}
</a>`);
    }
  }
  if (buttons.length > 0) {
    ctaarea = buttons.join("\n");
  }
}

var statsblock = "";
if (json.desing && Array.isArray(json.desing.stats) && json.desing.stats.length > 0) {
  var statsHtml = "";
  for (var stat of json.desing.stats) {
    var value = stat.value || "";
    var label = "";
    if (stat.label) {
      label =
        typeof stat.label === "object"
          ? stat.label[json.lang] || stat.label.tr || stat.label.en || ""
          : stat.label;
    }
    var icon = stat.icon
      ? `<span class="material-symbols-outlined modulex-stat-icon">${stat.icon}</span>`
      : "";
    if (value !== "" || label !== "") {
      statsHtml += `<div class="modulex-stat-card">
  ${icon}
  <span class="modulex-stat-value">${value}</span>
  <span class="modulex-stat-label">${label}</span>
</div>`;
    }
  }
  if (statsHtml !== "") {
    statsblock = `<div class="modulex-stats">
  ${statsHtml}
</div>`;
  }
}

var paletteAttr = "";
if (json.desing && json.desing.palette) {
  var palette = json.desing.palette;
  var paletteParts = [];
  if (palette.primary) {
    paletteParts.push(`--modulex-primary:${palette.primary}`);
  }
  if (palette.accent) {
    paletteParts.push(`--modulex-accent:${palette.accent}`);
  }
  if (palette.surface) {
    paletteParts.push(`--modulex-surface:${palette.surface}`);
  }
  if (palette.muted) {
    paletteParts.push(`--modulex-muted:${palette.muted}`);
  }
  if (paletteParts.length > 0) {
    paletteAttr = `style="${paletteParts.join(";")}"`;
  }
}

html = html.replace(new RegExp("{{identityblock}}", "g"), identityblock);
html = html.replace(new RegExp("{{ctaarea}}", "g"), ctaarea);
html = html.replace(new RegExp("{{statsblock}}", "g"), statsblock);
html = html.replace(new RegExp("{{modulexpalette}}", "g"), paletteAttr);

/* index.html'in gercek placeholder adlari (eski back.js farkli adlara yaziyordu
   ve bu placeholder'lar ciktiya siziyordu):
   menucontactlist=iletisim kartlari, missionblock=kimlik+istatistik, actionbutton=CTA */
html = html.replace(new RegExp("{{menucontactlist}}", "g"), contactcards);
html = html.replace(
  new RegExp("{{missionblock}}", "g"),
  (identityblock || statsblock) ? identityblock + "\n" + statsblock : "",
);
html = html.replace(new RegExp("{{actionbutton}}", "g"), ctaarea);

function pagecategory(path) {
  var backhtml = "";
  if (path !== undefined && path !== "") {
    var pagesettingjson = webmakerdata.pagesetting.data.find(
      function(item) { return item.modulestatus && item.modulestatus.page; },
    );
    if (pagesettingjson) {
      for (var page of webmakerdata[pagesettingjson.path].data) {
        if (page.status === "play" && path === page.category) {
          var pageName =
            page.name[json.lang] || page.name.tr || page.name.en || "";
          backhtml += `<a href="${wxLangInternalHref(page.path)}">
    ${pageName}
  </a>`;
        }
      }
    }

    if (backhtml !== "") {
      backhtml = `<div class="modulex-menu-dropdown">
    ${backhtml}
  </div>`;
    }
  }
  return backhtml;
}
