// Footer linkleri oluştur
var backhtml = "";
backhtml = '<li><a href="' + wxLangInternalHref('') + '">@home@</a></li>';

for (var iterator of webmakerdata["page"].data) {
  if (iterator.status == "play") {
    var pageName = iterator.name[json.lang] || iterator.name.tr || iterator.path;
    backhtml += '<li><a href="' + wxLangInternalHref(iterator.path) + '">' + pageName + '</a></li>';
  }
}

html = html.replace(new RegExp("{{html}}", "g"), backhtml);

// Copyright yılı
html = html.replace(new RegExp("{{year}}", "g"), new Date().getFullYear());

/* Sosyal liste: yalnız dolu hesaplar, ikon satır içi svg; hesap yoksa kabuk hiç basılmaz (services/webmaker/sosyalBar.js). CF dinamik render'da wmSocialBar yok → boş. */
var f8Sosyal = typeof wmSocialBar === "function" ? wmSocialBar({ kap: "div", liste: "modulex-footer-social", baglanti: "modulex-footer-social-link" }) : "";
html = html.replace(new RegExp("{{socialbar}}", "g"), function () { return f8Sosyal; });
