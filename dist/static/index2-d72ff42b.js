import{a as f,aU as j,j as t,ar as g,aZ as P,ad as L,a_ as w,f as v,n as B,a$ as k,at as T,b0 as A,$ as C,aW as _,as as S,aX as W,ap as D,ag as H,aY as $}from"./sanity-91d6aefe.js";const E=f.hr`
  background-color: var(--card-border-color);
  height: 1px;
  margin: 0;
  border: none;
`;function G(l){const{childItemId:n,items:a,isActive:o,layout:i,showIcons:d,title:r}=l,{collapsed:u}=L(),c=w(a==null?void 0:a.filter(e=>e.type!=="divider")),x=v.useCallback(e=>{var s;return((s=a==null?void 0:a.find((h,m)=>m===e))==null?void 0:s.type)==="divider"},[a]),p=v.useCallback(e=>{var h;const s=(h=e.displayOptions)==null?void 0:h.showIcon;return typeof s<"u"?s!==!1:d!==!1},[d]),I=v.useCallback((e,s)=>{const{virtualIndex:h}=s;if(e.type==="divider")return t.jsx(B,{marginBottom:1,children:t.jsx(E,{})},`divider-${h}`);const m=!o&&n===e.id,y=o&&n===e.id,b=e._id&&e.schemaType?{_id:e._id,_type:e.schemaType.name,title:e.title}:void 0;return t.jsx(k,{icon:p(e)?e.icon:!1,id:e.id,layout:i,marginBottom:1,pressed:m,schemaType:e.schemaType,selected:y,title:c(e).title,value:b},e.id)},[n,c,o,i,p]);return t.jsx(T,{overflow:u?"hidden":"auto",children:a&&a.length>0&&t.jsx(A,{activeItemDataAttr:"data-hovered",ariaLabel:r,canReceiveFocus:!0,getItemDisabled:x,itemHeight:51,items:a,onlyShowSelectionWhenActive:!0,paddingBottom:1,paddingX:3,renderItem:I,wrapAround:!1})})}const F=({index:l,menuItems:n,menuItemGroups:a,title:o})=>{const{features:i}=C(),{collapsed:d,isLast:r}=_(),u=r&&!d?-1:0;return t.jsx(S,{actions:t.jsx(W,{menuItems:n,menuItemGroups:a}),backButton:i.backButton&&l>0&&t.jsx(D,{as:H,"data-as":"a",icon:$,mode:"bleed",tooltipProps:{content:"Back"}}),tabIndex:u,title:o})};function U(l){const{childItemId:n,index:a,isActive:o,isSelected:i,pane:d,paneKey:r}=l,{defaultLayout:u,displayOptions:c,items:x,menuItems:p,menuItemGroups:I}=d,e=(c==null?void 0:c.showIcons)!==!1,{title:s}=j(d);return t.jsxs(g,{currentMaxWidth:350,"data-testid":"structure-tool-list-pane","data-ui":"ListPane",id:r,maxWidth:640,minWidth:320,selected:i,children:[P,t.jsx(F,{index:a,menuItems:p,menuItemGroups:I,title:s}),t.jsx(G,{childItemId:n,isActive:o,items:x,layout:u,showIcons:e,title:s},r)]})}export{U as default};
