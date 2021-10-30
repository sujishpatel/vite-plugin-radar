// src/google-analytics.ts
var GTagSource = "https://www.googletagmanager.com";
var GTagBase = (source) => `${source}/gtag/js`;
function injectTag(options) {
  const tags = [];
  const properties = [];
  if (Array.isArray(options)) {
    properties.push(...options);
  } else {
    properties.push(options);
  }
  if (!properties.length)
    return tags;
  const mainProperty = properties.shift();
  if (!mainProperty)
    return tags;
  let template = "";
  if (mainProperty.disable)
    template += `window['ga-disable-${mainProperty.id}'] = true;
`;
  for (const property of properties) {
    if (property.disable)
      template += `window['ga-disable-${property.id}'] = true;
`;
  }
  template += "window.dataLayer = window.dataLayer || [];\n";
  template += "function gtag(){dataLayer.push(arguments);}\n";
  template += "gtag('js', new Date());\n";
  for (const property of [mainProperty, ...properties]) {
    if (property.config || property.persistentValues) {
      const config = Object.assign({}, property.persistentValues, property.config);
      template += `gtag('config', '${property.id}', ${JSON.stringify(config)});
`;
    } else {
      template += `gtag('config', '${property.id}');
`;
    }
  }
  tags.push({
    tag: "script",
    attrs: {
      src: `${GTagBase((mainProperty == null ? void 0 : mainProperty.source) || GTagSource)}?id=${mainProperty.id}`,
      async: true
    }
  });
  tags.push({
    tag: "script",
    children: template
  });
  return tags;
}
var google_analytics_default = injectTag;

// src/google-tag-manager.ts
var GTMBase = "https://www.googletagmanager.com/gtm.js";
var NSBase = "https://www.googletagmanager.com/ns.html";
function injectTag2(options) {
  const tags = [];
  const properties = [];
  if (Array.isArray(options)) {
    properties.push(...options);
  } else {
    properties.push(options);
  }
  if (!properties.length)
    return tags;
  let template = "";
  template += "window.dataLayer = window.dataLayer || [];\n";
  template += "window.dataLayer.push({";
  template += "'gtm.start': new Date().getTime(),";
  template += "event:'gtm.js'";
  template += "});\n";
  tags.push({
    tag: "script",
    children: template
  });
  for (const property of properties) {
    tags.push({
      tag: "script",
      attrs: {
        src: `${GTMBase}?id=${property.id}`,
        async: true
      }
    });
    tags.push({
      tag: "noscript",
      injectTo: "body-prepend",
      children: `<iframe src="${NSBase}?id=${property.id}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
    });
  }
  return tags;
}
var google_tag_manager_default = injectTag2;

// src/facebook-pixel.ts
var PixelBase = "https://connect.facebook.net/en_US/fbevents.js";
var NoScriptBase = "https://www.facebook.com/tr";
function injectTag3(options) {
  const tags = [];
  const properties = [];
  if (Array.isArray(options)) {
    properties.push(...options);
  } else {
    properties.push(options);
  }
  if (!properties.length)
    return tags;
  let template = "";
  let noscriptTemplate = "";
  template += "!function(f,b,e,v,n,t,s)";
  template += "{if(f.fbq)return;n=f.fbq=function(){n.callMethod?";
  template += "n.callMethod.apply(n,arguments):n.queue.push(arguments)};";
  template += "if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';";
  template += "n.queue=[];t=b.createElement(e);t.async=!0;";
  template += "t.src=v;s=b.getElementsByTagName(e)[0];";
  template += "s.parentNode.insertBefore(t,s)}(window, document,'script',";
  template += `'${PixelBase}');`;
  for (const property of properties) {
    template += `fbq('init', '${property.id}');`;
    noscriptTemplate += `<img height="1" width="1" style="display:none" src="${NoScriptBase}?id=${property.id}&ev=PageView&noscript=1"/>
`;
  }
  template += "fbq('track', 'PageView');";
  tags.push({
    tag: "script",
    children: template
  });
  tags.push({
    tag: "noscript",
    injectTo: "body-prepend",
    children: noscriptTemplate
  });
  return tags;
}
var facebook_pixel_default = injectTag3;

// src/linkedin-insight.ts
var InsightBase = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
var NoScriptBase2 = "https://px.ads.linkedin.com/collect/";
function injectTag4(options) {
  const tags = [];
  const properties = [];
  if (Array.isArray(options)) {
    properties.push(...options);
  } else {
    properties.push(options);
  }
  if (!properties.length)
    return tags;
  let template = "";
  let noscriptTemplate = "";
  template += "window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];\n";
  for (const property of properties) {
    template += `window._linkedin_data_partner_ids.push(${property.id});
`;
    noscriptTemplate += `<img height="1" width="1" style="display:none;" alt="" src="${NoScriptBase2}?pid=${property.id}&fmt=gif" />`;
  }
  tags.push({
    tag: "script",
    children: template
  });
  tags.push({
    tag: "script",
    attrs: {
      src: `${InsightBase}`,
      async: true
    }
  });
  tags.push({
    tag: "noscript",
    injectTo: "body-prepend",
    children: noscriptTemplate
  });
  return tags;
}
var linkedin_insight_default = injectTag4;

// src/baidu-tongji.ts
var TongjiBase = "https://hm.baidu.com/hm.js";
function injectTag5(options) {
  const tags = [];
  const properties = [];
  if (Array.isArray(options)) {
    properties.push(...options);
  } else {
    properties.push(options);
  }
  if (!properties.length)
    return tags;
  let template = "";
  template += "var _hmt = _hmt || [];\n";
  template += "_hmt.push(['_setAutoPageview', true]);\n";
  for (const property of properties)
    template += `_hmt.push(['_setAccount', '${property.id}']);
`;
  tags.push({
    tag: "script",
    children: template
  });
  for (const property of properties) {
    tags.push({
      tag: "script",
      attrs: {
        src: `${TongjiBase}?${property.id}`,
        async: true
      }
    });
  }
  return tags;
}
var baidu_tongji_default = injectTag5;

// src/yandex-metrica.ts
var MetricaBase = "https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js";
var NoScriptBase3 = "https://mc.yandex.ru/watch/";
function injectTag6(options) {
  const tags = [];
  const properties = [];
  if (Array.isArray(options)) {
    properties.push(...options);
  } else {
    properties.push(options);
  }
  if (!properties.length)
    return tags;
  let template = "";
  let noscriptTemplate = "";
  template += "(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};";
  template += "m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})";
  template += `(window, document, "script", "${MetricaBase}", "ym");`;
  for (const property of properties) {
    if (property.config)
      template += `ym(${property.id}, ${JSON.stringify(property.config)});
`;
    else
      template += `ym(${property.id}});
`;
    noscriptTemplate += `<img src="${NoScriptBase3}${property.id}" style="position:absolute;left:-9999px;" alt="" />`;
  }
  tags.push({
    tag: "script",
    children: template
  });
  tags.push({
    tag: "noscript",
    injectTo: "body-prepend",
    children: `<div>${noscriptTemplate}</div>`
  });
  return tags;
}
var yandex_metrica_default = injectTag6;

// src/microsoft-advertising.ts
var UetBase = "//bat.bing.com/bat.js";
function injectTag7(property) {
  const tags = [];
  if (!property.id)
    return tags;
  let template = "";
  template += "(function (w, d, t, r, u) {";
  template += `var f, n, i; w[u] = w[u] || [], f = function () { var o = { ti: "${property.id}" };`;
  template += 'o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad") }, n = d.createElement(t), ';
  template += "n.src = r, n.async = 1, n.onload = n.onreadystatechange = function () { ";
  template += 'var s = this.readyState; s && s !== "loaded" && s !== "complete" || (f(), ';
  template += "n.onload = n.onreadystatechange = null) }, i = d.getElementsByTagName(t)[0], ";
  template += "i.parentNode.insertBefore(n, i) })";
  template += `(window, document, "script", "${UetBase}", "uetq");`;
  tags.push({
    tag: "script",
    children: template
  });
  return tags;
}
var microsoft_advertising_default = injectTag7;

// src/index.ts
function VitePluginRadar({
  enableDev = false,
  analytics,
  gtm,
  pixel,
  linkedin,
  tongji,
  metrica,
  microsoft
}) {
  let viteConfig;
  return {
    name: "vite-plugin-Radar",
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },
    transformIndexHtml() {
      const tags = [];
      if (viteConfig.command === "serve" && !enableDev)
        return tags;
      if (analytics)
        tags.push(...google_analytics_default(analytics));
      if (gtm)
        tags.push(...google_tag_manager_default(gtm));
      if (pixel)
        tags.push(...facebook_pixel_default(pixel));
      if (tongji)
        tags.push(...baidu_tongji_default(tongji));
      if (linkedin)
        tags.push(...linkedin_insight_default(linkedin));
      if (metrica)
        tags.push(...yandex_metrica_default(metrica));
      if (microsoft)
        tags.push(...microsoft_advertising_default(microsoft));
      return tags;
    }
  };
}
var src_default = VitePluginRadar;
export {
  VitePluginRadar,
  src_default as default
};
