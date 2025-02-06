import{f as l,aN as S,j as F,aO as z,aP as A,aQ as h,a1 as c,aR as B}from"./sanity-91d6aefe.js";import{E as f,H as w,s as q,S as O,o as G,D as p,R as J,t as i,p as m,l as Q}from"./index-fbadb81e.js";var W=e=>{var{theme:t,settings:o={},styles:n=[]}=e,r={".cm-gutters":{}},a={};o.background&&(a.backgroundColor=o.background),o.backgroundImage&&(a.backgroundImage=o.backgroundImage),o.foreground&&(a.color=o.foreground),o.fontSize&&(a.fontSize=o.fontSize),(o.background||o.foreground)&&(r["&"]=a),o.fontFamily&&(r["&.cm-editor .cm-scroller"]={fontFamily:o.fontFamily}),o.gutterBackground&&(r[".cm-gutters"].backgroundColor=o.gutterBackground),o.gutterForeground&&(r[".cm-gutters"].color=o.gutterForeground),o.gutterBorder&&(r[".cm-gutters"].borderRightColor=o.gutterBorder),o.caret&&(r[".cm-content"]={caretColor:o.caret},r[".cm-cursor, .cm-dropCursor"]={borderLeftColor:o.caret});var s={};o.gutterActiveForeground&&(s.color=o.gutterActiveForeground),o.lineHighlight&&(r[".cm-activeLine"]={backgroundColor:o.lineHighlight},s.backgroundColor=o.lineHighlight),r[".cm-activeLineGutter"]=s,o.selection&&(r["&.cm-focused .cm-selectionBackground, & .cm-line::selection, & .cm-selectionLayer .cm-selectionBackground, .cm-content ::selection"]={background:o.selection+" !important"}),o.selectionMatch&&(r["& .cm-selectionMatch"]={backgroundColor:o.selectionMatch});var u=f.theme(r,{dark:t==="dark"}),d=w.define(n),g=[u,q(d)];return g};function K(){const e=A();return l.useMemo(()=>{const{code:t}=e.sanity.fonts,{base:o,card:n,dark:r,syntax:a}=e.sanity.color;return W({theme:r?"dark":"light",settings:{background:n.enabled.bg,foreground:n.enabled.code.fg,lineHighlight:n.enabled.bg,fontFamily:t.family,caret:o.focusRing,selection:h(o.focusRing,.2),selectionMatch:h(o.focusRing,.4),gutterBackground:n.disabled.bg,gutterForeground:n.disabled.code.fg,gutterActiveForeground:n.enabled.fg},styles:[{tag:[i.heading,i.heading2,i.heading3,i.heading4,i.heading5,i.heading6],color:n.enabled.fg},{tag:i.angleBracket,color:n.enabled.code.fg},{tag:i.atom,color:a.keyword},{tag:i.attributeName,color:a.attrName},{tag:i.bool,color:a.boolean},{tag:i.bracket,color:n.enabled.code.fg},{tag:i.className,color:a.className},{tag:i.comment,color:a.comment},{tag:i.definition(i.typeName),color:a.function},{tag:[i.definition(i.variableName),i.function(i.variableName),i.className,i.attributeName],color:a.function},{tag:[i.function(i.propertyName),i.propertyName],color:a.function},{tag:i.keyword,color:a.keyword},{tag:i.null,color:a.number},{tag:i.number,color:a.number},{tag:i.meta,color:n.enabled.code.fg},{tag:i.operator,color:a.operator},{tag:i.propertyName,color:a.property},{tag:[i.string,i.special(i.brace)],color:a.string},{tag:i.tagName,color:a.className},{tag:i.typeName,color:a.keyword}]})},[e])}const U=[{name:"groq",loader:()=>c(()=>import("./index-b5c35332.js"),["static/index-b5c35332.js","static/index-ee47b005.js","static/index-fbadb81e.js","static/sanity-91d6aefe.js"]).then(e=>{let{javascriptLanguage:t}=e;return t})},{name:"javascript",loader:()=>c(()=>import("./index-b5c35332.js"),["static/index-b5c35332.js","static/index-ee47b005.js","static/index-fbadb81e.js","static/sanity-91d6aefe.js"]).then(e=>{let{javascript:t}=e;return t({jsx:!1})})},{name:"jsx",loader:()=>c(()=>import("./index-b5c35332.js"),["static/index-b5c35332.js","static/index-ee47b005.js","static/index-fbadb81e.js","static/sanity-91d6aefe.js"]).then(e=>{let{javascript:t}=e;return t({jsx:!0})})},{name:"typescript",loader:()=>c(()=>import("./index-b5c35332.js"),["static/index-b5c35332.js","static/index-ee47b005.js","static/index-fbadb81e.js","static/sanity-91d6aefe.js"]).then(e=>{let{javascript:t}=e;return t({jsx:!1,typescript:!0})})},{name:"tsx",loader:()=>c(()=>import("./index-b5c35332.js"),["static/index-b5c35332.js","static/index-ee47b005.js","static/index-fbadb81e.js","static/sanity-91d6aefe.js"]).then(e=>{let{javascript:t}=e;return t({jsx:!0,typescript:!0})})},{name:"php",loader:()=>c(()=>import("./index-5cf7eed3.js"),["static/index-5cf7eed3.js","static/index-ee47b005.js","static/index-fbadb81e.js","static/sanity-91d6aefe.js","static/index-fa2086fe.js","static/index-b5c35332.js"]).then(e=>{let{php:t}=e;return t()})},{name:"sql",loader:()=>c(()=>import("./index-2af2c76c.js"),["static/index-2af2c76c.js","static/index-fbadb81e.js","static/sanity-91d6aefe.js","static/index-ee47b005.js"]).then(e=>{let{sql:t}=e;return t()})},{name:"mysql",loader:()=>c(()=>import("./index-2af2c76c.js"),["static/index-2af2c76c.js","static/index-fbadb81e.js","static/sanity-91d6aefe.js","static/index-ee47b005.js"]).then(e=>{let{sql:t,MySQL:o}=e;return t({dialect:o})})},{name:"json",loader:()=>c(()=>import("./index-7f79cb36.js"),["static/index-7f79cb36.js","static/index-ee47b005.js","static/index-fbadb81e.js","static/sanity-91d6aefe.js"]).then(e=>{let{json:t}=e;return t()})},{name:"markdown",loader:()=>c(()=>import("./index-c8f25817.js"),["static/index-c8f25817.js","static/index-fbadb81e.js","static/sanity-91d6aefe.js","static/index-fa2086fe.js","static/index-ee47b005.js","static/index-b5c35332.js"]).then(e=>{let{markdown:t}=e;return t()})},{name:"java",loader:()=>c(()=>import("./index-e19f72ab.js"),["static/index-e19f72ab.js","static/index-ee47b005.js","static/index-fbadb81e.js","static/sanity-91d6aefe.js"]).then(e=>{let{java:t}=e;return t()})},{name:"html",loader:()=>c(()=>import("./index-fa2086fe.js"),["static/index-fa2086fe.js","static/index-ee47b005.js","static/index-fbadb81e.js","static/sanity-91d6aefe.js","static/index-b5c35332.js"]).then(e=>{let{html:t}=e;return t()})},{name:"csharp",loader:()=>c(()=>import("./clike-c6a401fb.js"),[]).then(e=>{let{csharp:t}=e;return m.define(t)})},{name:"sh",loader:()=>c(()=>import("./shell-61e14131.js"),[]).then(e=>{let{shell:t}=e;return m.define(t)})},{name:"css",loader:()=>c(()=>import("./css-ae0ae1d0.js"),[]).then(e=>{let{css:t}=e;return m.define(t)})},{name:"scss",loader:()=>c(()=>import("./css-ae0ae1d0.js"),[]).then(e=>{let{css:t}=e;return m.define(t)})},{name:"sass",loader:()=>c(()=>import("./sass-fe9762d1.js"),["static/sass-fe9762d1.js","static/css-ae0ae1d0.js"]).then(e=>{let{sass:t}=e;return m.define(t)})},{name:"ruby",loader:()=>c(()=>import("./ruby-e88f1f8d.js"),[]).then(e=>{let{ruby:t}=e;return m.define(t)})},{name:"python",loader:()=>c(()=>import("./python-fa45e8d1.js"),[]).then(e=>{let{python:t}=e;return m.define(t)})},{name:"xml",loader:()=>c(()=>import("./xml-4783b4a1.js"),[]).then(e=>{let{xml:t}=e;return m.define(t)})},{name:"yaml",loader:()=>c(()=>import("./yaml-95012b83.js"),[]).then(e=>{let{yaml:t}=e;return m.define(t)})},{name:"golang",loader:()=>c(()=>import("./go-8a088acb.js"),[]).then(e=>{let{go:t}=e;return m.define(t)})},{name:"text",loader:()=>{}},{name:"batch",loader:()=>{}}],b="cm-highlight-line",k=O.define(),y=O.define(),x=G.define({create(){return p.none},update(e,t){e=e.map(t.changes);for(const o of t.effects)o.is(k)&&(e=e.update({add:[P.range(o.value)]})),o.is(y)&&(e=e.update({filter:n=>n!==o.value}));return e},toJSON(e,t){const o=[],n=e.iter();for(;n.value;){const r=t.doc.lineAt(n.from).number;o.includes(r)||o.push(r),n.next()}return o},fromJSON(e,t){const o=t.doc.lines,n=e.filter(r=>r<=o).map(r=>P.range(t.doc.line(r).from));n.sort((r,a)=>r.from-a.from);try{return p.none.update({add:n})}catch(r){return console.error(r),p.none}},provide:e=>f.decorations.from(e)}),P=p.line({class:b}),I={highlight:x};function X(e){const{themeCtx:t}=e,o={color:t.theme.color.dark[t.tone]},n={color:t.theme.color.light[t.tone]};return f.baseTheme({".cm-lineNumbers":{cursor:"default"},".cm-line.cm-line":{position:"relative"},[".".concat(b,"::before")]:{position:"absolute",top:0,bottom:0,left:0,right:0,zIndex:-3,content:"''",boxSizing:"border-box"},["&dark .".concat(b,"::before")]:{background:h(o.color.muted.caution.pressed.bg,.5)},["&light .".concat(b,"::before")]:{background:h(n.color.muted.caution.pressed.bg,.75)}})}const Y=e=>{const t=X({themeCtx:e.theme});return[x,e.readOnly?[]:Q({domEventHandlers:{mousedown:(o,n)=>{const r=o.state.doc.lineAt(n.from);let a=!1;return o.state.field(x).between(r.from,r.to,(s,u,d)=>{if(d)return a=!0,!1}),a?o.dispatch({effects:y.of(r.from)}):o.dispatch({effects:k.of(r.from)}),e!=null&&e.onHighlightChange&&e.onHighlightChange(o.state.toJSON(I).highlight),!0}}}),t]};function Z(e,t){const o=e.state.doc,n=o.lines,r=Array.from({length:n},(a,s)=>s+1);e.dispatch({effects:r.map(a=>{const s=o.line(a);return t!=null&&t.includes(a)?k.of(s.from):y.of(s.from)})})}function $(e){const{fontSize:t}=e,o=A();return l.useMemo(()=>{const{code:n}=o.sanity.fonts,{fontSize:r,lineHeight:a}=n.sizes[t]||n.sizes[2];return f.baseTheme({"&":{fontSize:B(r)},"& .cm-scroller":{lineHeight:"".concat(a/r," !important")}})},[t,o])}function ee(){const e=S();return l.useMemo(()=>{const t={color:e.theme.color.dark[e.tone]},o={color:e.theme.color.light[e.tone]};return f.baseTheme({"&.cm-editor":{height:"100%"},"&.cm-editor.cm-focused":{outline:"none"},"&.cm-editor.cm-focused .cm-matchingBracket":{backgroundColor:"transparent"},"&.cm-editor.cm-focused .cm-nonmatchingBracket":{backgroundColor:"transparent"},"&dark.cm-editor.cm-focused .cm-matchingBracket":{outline:"1px solid ".concat(t.color.base.border)},"&dark.cm-editor.cm-focused .cm-nonmatchingBracket":{outline:"1px solid ".concat(t.color.base.border)},"&light.cm-editor.cm-focused .cm-matchingBracket":{outline:"1px solid ".concat(o.color.base.border)},"&light.cm-editor.cm-focused .cm-nonmatchingBracket":{outline:"1px solid ".concat(o.color.base.border)},"& .cm-lineNumbers .cm-gutterElement":{minWidth:"32px !important",padding:"0 8px !important"},"& .cm-gutter.cm-foldGutter":{width:"0px !important"},"&dark .cm-gutters":{color:"".concat(h(t.color.card.enabled.code.fg,.5)," !important"),borderRight:"1px solid ".concat(h(t.color.base.border,.5))},"&light .cm-gutters":{color:"".concat(h(o.color.card.enabled.code.fg,.5)," !important"),borderRight:"1px solid ".concat(h(o.color.base.border,.5))}})},[e])}const ne=l.forwardRef(function(t,o){const{basicSetup:n,highlightLines:r,languageMode:a,onHighlightChange:s,readOnly:u,value:d,...g}=t,L=S(),M=K(),[v,D]=l.useState(void 0),R=ee(),C=$({fontSize:1}),E=te(a),T=l.useMemo(()=>Y({onHighlightChange:s,readOnly:u,theme:L}),[s,u,L]),N=l.useMemo(()=>{const _=[R,C,T,f.lineWrapping];return E?[..._,E]:_},[C,T,E,R]);l.useEffect(()=>{v&&Z(v,r??[])},[v,r,d]);const V=l.useMemo(()=>({json:{doc:d??"",selection:{main:0,ranges:[{anchor:0,head:0}]},highlight:r??[]},fields:I}),[]),j=l.useCallback(_=>{D(_)},[]),H=l.useMemo(()=>n??{highlightActiveLine:!1},[n]);return F.jsx(J,{...g,value:d,ref:o,extensions:N,theme:M,onCreateEditor:j,initialState:V,basicSetup:H})});function te(e){const t=l.useContext(z),[o,n]=l.useState();return l.useEffect(()=>{var r;const u=[...(r=t==null?void 0:t.codeModes)!=null?r:[],...U].find(g=>g.name===e);u!=null&&u.loader||console.warn("Found no codeMode for language mode ".concat(e,", syntax highlighting will be disabled."));let d=!0;return Promise.resolve(u==null?void 0:u.loader()).then(g=>{d&&n(g)}).catch(g=>{console.error("Failed to load language mode ".concat(e),g),d&&n(void 0)}),()=>{d=!1}},[e,t]),o}export{ne as default};
