(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[5715],{8764:function(_,P,m){"use strict";var A=m(93714),l=m(75271),O=m(818),k=m(14908);function v(a){"@babel/helpers - typeof";return v=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(a)}function S(a,t){return B(a)||W(a,t)||g(a,t)||R()}function R(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function g(a,t){if(a){if(typeof a=="string")return b(a,t);var o=Object.prototype.toString.call(a).slice(8,-1);if(o==="Object"&&a.constructor&&(o=a.constructor.name),o==="Map"||o==="Set")return Array.from(a);if(o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return b(a,t)}}function b(a,t){(t==null||t>a.length)&&(t=a.length);for(var o=0,e=new Array(t);o<t;o++)e[o]=a[o];return e}function W(a,t){var o=a==null?null:typeof Symbol!="undefined"&&a[Symbol.iterator]||a["@@iterator"];if(o!=null){var e,n,r,i,s=[],f=!0,d=!1;try{if(r=(o=o.call(a)).next,t===0){if(Object(o)!==o)return;f=!1}else for(;!(f=(e=r.call(o)).done)&&(s.push(e.value),s.length!==t);f=!0);}catch(y){d=!0,n=y}finally{try{if(!f&&o.return!=null&&(i=o.return(),Object(i)!==i))return}finally{if(d)throw n}}return s}}function B(a){if(Array.isArray(a))return a}function N(a,t){var o=Object.keys(a);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(a);t&&(e=e.filter(function(n){return Object.getOwnPropertyDescriptor(a,n).enumerable})),o.push.apply(o,e)}return o}function I(a){for(var t=1;t<arguments.length;t++){var o=arguments[t]!=null?arguments[t]:{};t%2?N(Object(o),!0).forEach(function(e){x(a,e,o[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(o)):N(Object(o)).forEach(function(e){Object.defineProperty(a,e,Object.getOwnPropertyDescriptor(o,e))})}return a}function x(a,t,o){return t=c(t),t in a?Object.defineProperty(a,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):a[t]=o,a}function c(a){var t=p(a,"string");return v(t)==="symbol"?t:String(t)}function p(a,t){if(v(a)!=="object"||a===null)return a;var o=a[Symbol.toPrimitive];if(o!==void 0){var e=o.call(a,t||"default");if(v(e)!=="object")return e;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(a)}function u(a){var t=a.children;return l.createElement("span",{"data-token":t},t)}function E(a){return a.hasQuestionToken&&typeof a.type=="string"&&(a.type=a.type.replace(/\s+\|\s+undefined\s*$/i,"")),a}var h=function(t){var o,e=(0,A.YB)(),n=(0,A.WF)(),r=n.themeConfig;return(o=t.source)!==null&&o!==void 0&&o[0]&&r.sourceLink?l.createElement("a",{className:"dumi-default-api-link",href:e.formatMessage({id:"$internal.api.sourceLink"},I({},t.source[0])),target:"_blank",rel:"noreferrer"},t.className):t.className},T={toNode:function(t){return typeof t.type=="string"&&t.type in this?"enum"in t?this.enum(t):this[t.type](t):t.type?this.getValidClassName(t)||l.createElement("span",null,t.type):"const"in t?l.createElement("span",null,t.const):"oneOf"in t?this.oneOf(t):l.createElement("span",null,"unknown")},string:function(t){return l.createElement("span",null,t.type)},number:function(t){return l.createElement("span",null,t.type)},boolean:function(t){return l.createElement("span",null,t.type)},any:function(t){return l.createElement("span",null,t.type)},object:function(t){var o=this,e=Object.entries(t.properties||{}),n=e.map(function(r,i){var s,f=S(r,2),d=f[0],y=f[1];return l.createElement("span",{key:d},l.createElement("span",null,d),!((s=t.required)!==null&&s!==void 0&&s.includes(d))&&l.createElement(u,null,"?"),l.createElement(u,null,":"),y.type==="object"?l.createElement("span",null,"object"):o.toNode(y),i<e.length-1&&l.createElement(u,null,";"))});return l.createElement("span",null,l.createElement(u,null,"{"),n,l.createElement(u,null,"}"))},array:function(t){var o=this,e=l.createElement("span",null,"any");if(t.items){if(Array.isArray(t.items))return l.createElement("span",null,l.createElement(u,null,"["),t.items.map(function(r,i){return l.createElement("span",{key:"".concat(i)},i>0&&", ",o.toNode(r))}),l.createElement(u,null,"]"));var n=this.getValidClassName(t.items);e=n!=null?n:this.toNode(t.items)}return l.createElement("span",null,e,l.createElement(u,null,"["),l.createElement(u,null,"]"))},element:function(t){return l.createElement("span",null,l.createElement(u,null,"<"),l.createElement("span",null,t.componentName),l.createElement(u,null,">"))},function:function(t){var o=this,e=t.signature;if(!e)return l.createElement("span",null,"Function");var n="oneOf"in e?e.oneOf:[e];return n.map(function(r,i){return l.createElement("span",{key:"".concat(i)},r.isAsync?l.createElement(u,null,"async"):"",l.createElement(u,null,"("),r.arguments.map(function(s,f){return l.createElement("span",{key:"".concat(i).concat(f)},l.createElement("span",null,s.key),s.hasQuestionToken&&l.createElement(u,null,"?"),l.createElement(u,null,":"),o.toNode(s.schema?s.schema:E(s)),f<r.arguments.length-1&&l.createElement(u,null,","))}),l.createElement(u,null,")"),l.createElement(u,null,"=>"),o.toNode(r.returnType),i<n.length-1&&l.createElement(u,null,"|"))})},dom:function(t){return l.createElement("span",null,t.className||"DOM")},enum:function(t){var o=t.enum.map(function(e){return JSON.stringify(e)});return l.createElement("span",null,o.map(function(e,n){return l.createElement("span",{key:n},l.createElement("span",null,e),n<o.length-1&&l.createElement(u,null,"|"))}))},oneOf:function(t){var o=this;return t.oneOf.map(function(e,n){return l.createElement("span",{key:n},o.getValidClassName(e)||o.toNode(e),n<t.oneOf.length-1&&l.createElement(u,null,"|"))})},reference:function(t){var o=this,e=t.typeParameters||[],n=e.map(function(r,i){return l.createElement("span",{key:i},o.toNode(r),i<e.length-1&&l.createElement(u,null,","))});return l.createElement(l.Fragment,null,l.createElement("a",{className:"dumi-default-api-link",href:t.externalUrl,target:"_blank",rel:"noreferrer"},t.name),n.length?l.createElement(l.Fragment,null,l.createElement(u,null,"<"),n,l.createElement(u,null,">")):"")},getValidClassName:function(t){return"className"in t&&typeof t.className=="string"&&t.className!=="__type"?l.createElement(h,t):null}},M=function(t){var o=useState(function(){return T.toNode(t)}),e=S(o,2),n=e[0],r=e[1];return useEffect(function(){r(T.toNode(t))},[t]),React.createElement("code",{className:"dumi-default-api-type"},n)};function F(a){var t={};return Object.entries(a).forEach(function(o){var e,n,r=S(o,2),i=r[0],s=r[1],f=(e=s.tags)===null||e===void 0?void 0:e.modifierTags,d=(n=s.tags)===null||n===void 0?void 0:n.blockTags;f==null||f.forEach(function(y){(y==="alpha"||y==="beta"||y==="experimental")&&(t[i]=[y])}),d==null||d.forEach(function(y){var w=y.tag,C=y.content;if(w==="deprecated"||w==="since"){var D=C.map(function(U){return U.text}).join("");t[i]=[w,D]}})}),t}var j=function(t){var o=t.name,e=t.info,n=useIntl(),r=S(e,2),i=r[0],s=r[1],f=x({className:"dumi-default-api-release-modifer"},"data-release",i);s&&i==="deprecated"&&(f["data-dumi-tooltip"]=s);var d=i==="since"?"".concat(s,"+"):n.formatMessage({id:"api.component.release.".concat(i)});return React.createElement("span",{className:"dumi-default-api-release"},React.createElement("span",{className:"dumi-default-api-release-name","data-release":i},o),React.createElement("span",f,i==="deprecated"?d:React.createElement(Badge,{type:"info"},d)))},H=function(t){var o=useRouteMeta(),e=o.frontmatter,n=useAtomAssets(),r=n.components,i=t.id||e.atomId,s=useIntl();if(!i)throw new Error("`id` properties if required for API component!");var f=r==null?void 0:r[i],d={},y=(t.type||"props").toLowerCase();if(f){var w,C="".concat(y,"Config");d=((w=f[C])===null||w===void 0?void 0:w.properties)||{}}var D=useMemo(function(){return F(d)},[d]);return React.createElement("div",{className:"markdown"},React.createElement(Table,null,React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",null,s.formatMessage({id:"api.component.name"})),React.createElement("th",null,s.formatMessage({id:"api.component.description"})),React.createElement("th",null,s.formatMessage({id:"api.component.type"})),y==="props"&&React.createElement("th",null,s.formatMessage({id:"api.component.default"})))),React.createElement("tbody",null,Object.keys(d).length?Object.entries(d).map(function(U){var V,Y=S(U,2),L=Y[0],$=Y[1];return React.createElement("tr",{key:L},React.createElement("td",null,D[L]?React.createElement(j,{name:L,info:D[L]}):L),React.createElement("td",null,$.description||"--"),React.createElement("td",null,React.createElement(M,$)),y==="props"&&React.createElement("td",null,React.createElement("code",null,(V=f.propsConfig.required)!==null&&V!==void 0&&V.includes(L)?s.formatMessage({id:"api.component.required"}):JSON.stringify($.default)||"--")))}):React.createElement("tr",null,React.createElement("td",{colSpan:4},s.formatMessage({id:"api.component.".concat(r?"not.found":"unavailable")},{id:i}))))))},K=null},818:function(_,P,m){"use strict";var A=m(75271);function l(){return l=Object.assign?Object.assign.bind():function(v){for(var S=1;S<arguments.length;S++){var R=arguments[S];for(var g in R)Object.prototype.hasOwnProperty.call(R,g)&&(v[g]=R[g])}return v},l.apply(this,arguments)}var O=function(S){return React.createElement("span",l({className:"dumi-default-badge"},S))},k=null},98330:function(_,P,m){"use strict";var A=m(99142),l=m(5254),O=m(88035),k=m(75271);function v(g){"@babel/helpers - typeof";return v=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(b){return typeof b}:function(b){return b&&typeof Symbol=="function"&&b.constructor===Symbol&&b!==Symbol.prototype?"symbol":typeof b},v(g)}function S(g){var b=g.children,W=toArray(b).filter(function(N){var I;return v(N)==="object"&&typeof N.type=="function"&&((I=N.type)===null||I===void 0?void 0:I.name)===SourceCode.name}),B=W.map(function(N,I){var x,c,p=(x=N.props)!==null&&x!==void 0?x:{},u=p.lang,E=p.title;return{key:String((c=N.key)!==null&&c!==void 0?c:I),label:E||u||"txt",children:N}});return React.createElement(Tabs,{className:"dumi-default-code-group",items:B})}var R=null},14908:function(_,P,m){"use strict";m.d(P,{Z:function(){return x}});var A=m(30826),l=m.n(A),O=m(75271),k=["children"];function v(c,p){return W(c)||b(c,p)||R(c,p)||S()}function S(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function R(c,p){if(c){if(typeof c=="string")return g(c,p);var u=Object.prototype.toString.call(c).slice(8,-1);if(u==="Object"&&c.constructor&&(u=c.constructor.name),u==="Map"||u==="Set")return Array.from(c);if(u==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(u))return g(c,p)}}function g(c,p){(p==null||p>c.length)&&(p=c.length);for(var u=0,E=new Array(p);u<p;u++)E[u]=c[u];return E}function b(c,p){var u=c==null?null:typeof Symbol!="undefined"&&c[Symbol.iterator]||c["@@iterator"];if(u!=null){var E,h,T,M,F=[],j=!0,H=!1;try{if(T=(u=u.call(c)).next,p===0){if(Object(u)!==u)return;j=!1}else for(;!(j=(E=T.call(u)).done)&&(F.push(E.value),F.length!==p);j=!0);}catch(K){H=!0,h=K}finally{try{if(!j&&u.return!=null&&(M=u.return(),Object(M)!==M))return}finally{if(H)throw h}}return F}}function W(c){if(Array.isArray(c))return c}function B(c,p){if(c==null)return{};var u=N(c,p),E,h;if(Object.getOwnPropertySymbols){var T=Object.getOwnPropertySymbols(c);for(h=0;h<T.length;h++)E=T[h],!(p.indexOf(E)>=0)&&Object.prototype.propertyIsEnumerable.call(c,E)&&(u[E]=c[E])}return u}function N(c,p){if(c==null)return{};var u={},E=Object.keys(c),h,T;for(T=0;T<E.length;T++)h=E[T],!(p.indexOf(h)>=0)&&(u[h]=c[h]);return u}var I=function(p){var u=p.children,E=B(p,k),h=(0,O.useRef)(null),T=(0,O.useState)(!1),M=v(T,2),F=M[0],j=M[1],H=(0,O.useState)(!1),K=v(H,2),a=K[0],t=K[1];return(0,O.useEffect)(function(){var o=h.current;if(o){var e=l()(function(){j(o.scrollLeft>0),t(o.scrollLeft<o.scrollWidth-o.offsetWidth)},100);return e(),o.addEventListener("scroll",e),window.addEventListener("resize",e),function(){o.removeEventListener("scroll",e),window.removeEventListener("resize",e)}}},[]),O.createElement("div",{className:"dumi-default-table"},O.createElement("div",{className:"dumi-default-table-content",ref:h,"data-left-folded":F||void 0,"data-right-folded":a||void 0},O.createElement("table",E,u)))},x=I},26628:function(_,P,m){"use strict";var A=m(65173),l=m(75271);function O(e){"@babel/helpers - typeof";return O=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},O(e)}function k(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),r.push.apply(r,i)}return r}function v(e){for(var n=1;n<arguments.length;n++){var r=arguments[n]!=null?arguments[n]:{};n%2?k(Object(r),!0).forEach(function(i){S(e,i,r[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(r,i))})}return e}function S(e,n,r){return n=R(n),n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function R(e){var n=g(e,"string");return O(n)==="symbol"?n:String(n)}function g(e,n){if(O(e)!=="object"||e===null)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var i=r.call(e,n||"default");if(O(i)!=="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}function b(e,n){return N(e)||B(e,n)||c(e,n)||W()}function W(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function B(e,n){var r=e==null?null:typeof Symbol!="undefined"&&e[Symbol.iterator]||e["@@iterator"];if(r!=null){var i,s,f,d,y=[],w=!0,C=!1;try{if(f=(r=r.call(e)).next,n===0){if(Object(r)!==r)return;w=!1}else for(;!(w=(i=f.call(r)).done)&&(y.push(i.value),y.length!==n);w=!0);}catch(D){C=!0,s=D}finally{try{if(!w&&r.return!=null&&(d=r.return(),Object(d)!==d))return}finally{if(C)throw s}}return y}}function N(e){if(Array.isArray(e))return e}function I(e){return u(e)||p(e)||c(e)||x()}function x(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function c(e,n){if(e){if(typeof e=="string")return E(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor&&(r=e.constructor.name),r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return E(e,n)}}function p(e){if(typeof Symbol!="undefined"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function u(e){if(Array.isArray(e))return E(e)}function E(e,n){(n==null||n>e.length)&&(n=e.length);for(var r=0,i=new Array(n);r<n;r++)i[r]=e[r];return i}function h(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",r=[];return[].concat(e).forEach(function(i,s){var f="".concat(n?"".concat(n,"-"):"").concat(s);switch(i==null?void 0:i.type){case"ul":{var d,y=((d=r[r.length-1])===null||d===void 0?void 0:d.children)||r,w=h(i.props.children||[],f);y.push.apply(y,I(w));break}case"li":{var C,D,U=(C=i.props.children)===null||C===void 0||(D=C.some)===null||D===void 0?void 0:D.call(C,function(L){var $;return L.type==="ul"&&!(($=L.props.children)!==null&&$!==void 0&&$.length)}),V=[].concat(i.props.children).filter(function(L){return L.type!=="ul"}),Y=U?[]:h(i.props.children,f);r.push({title:V,key:f,children:Y,isLeaf:!U&&!Y.length,switcherIcon:U?React.createElement("span",{className:"tree-switcher-leaf-line"}):void 0});break}default:}}),r}var T=function(n){var r=useState(h(n)),i=b(r,2),s=i[0],f=i[1];return useEffect(function(){f(h(n))},[n]),s},M=function(n){var r,i=n.isLeaf,s=n.expanded,f=n.data;return i?React.createElement("span",{className:"dumi-default-tree-icon"},React.createElement(FileOutlined,{fill:"currentColor"})):!s||!(f!=null&&(r=f.children)!==null&&r!==void 0&&r.length)?React.createElement("span",{className:"dumi-default-tree-icon"},React.createElement(FolderOutlined,{fill:"currentColor"})):React.createElement("span",{className:"dumi-default-tree-icon"},React.createElement(FolderOpenOutlined,{fill:"currentColor"}))},F=function(n){var r=n.isLeaf,i=n.expanded;return r?React.createElement("span",{className:"tree-switcher-leaf-line"}):i?React.createElement("span",{className:"tree-switcher-line-icon"},React.createElement("span",{className:"dumi-default-tree-icon"},React.createElement(MinusSquareOutlined,{fill:"currentColor"}))):React.createElement("span",{className:"tree-switcher-line-icon"},React.createElement("span",{className:"dumi-default-tree-icon"},React.createElement(PlusSquareOutlined,{fill:"currentColor"})))},j=function(){return{height:0,opacity:0}},H=function(n){var r=n.scrollHeight;return{height:r,opacity:1}},K=function(n){return{height:n?n.offsetHeight:0}},a=function(n,r){return(r==null?void 0:r.deadline)===!0||r.propertyName==="height"},t={motionName:"ant-motion-collapse",onAppearStart:j,onEnterStart:j,onAppearActive:H,onEnterActive:H,onLeaveStart:K,onLeaveActive:j,onAppearEnd:a,onEnterEnd:a,onLeaveEnd:a,motionDeadline:500},o=function(e){var n=T(e.children),r=createRef(),i=function(f,d){var y,w=d.isLeaf,C=!w&&!((y=d.children)!==null&&y!==void 0&&y.length);w||C||f.shiftKey||f.metaKey||f.ctrlKey||r.current.onNodeExpand(f,d)};return React.createElement(Tree,{className:"dumi-default-tree",icon:M,ref:r,itemHeight:20,showLine:!0,selectable:!1,virtual:!1,motion:v(v({},t),{},{motionAppear:!1}),onClick:i,treeData:[{key:"0",title:e.title||"<root>",children:n}],defaultExpandAll:!0,switcherIcon:F})}},88035:function(_,P,m){"use strict";var A,l=m(62758).default;A={value:!0},A=v;var O=l(m(29199)),k=l(m(75271));function v(S){var R=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},g=[];return k.default.Children.forEach(S,function(b){b==null&&!R.keepEmpty||(Array.isArray(b)?g=g.concat(v(b)):(0,O.default)(b)&&b.props?g=g.concat(v(b.props.children,R)):g.push(b))}),g}},29199:function(_,P,m){"use strict";var A=m(62758).default;Object.defineProperty(P,"__esModule",{value:!0}),P.default=S;var l=A(m(37313)),O=Symbol.for("react.element"),k=Symbol.for("react.transitional.element"),v=Symbol.for("react.fragment");function S(R){return R&&(0,l.default)(R)==="object"&&(R.$$typeof===O||R.$$typeof===k)&&R.type===v}},62758:function(_){function P(m){return m&&m.__esModule?m:{default:m}}_.exports=P,_.exports.__esModule=!0,_.exports.default=_.exports},37313:function(_){function P(m){"@babel/helpers - typeof";return _.exports=P=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(A){return typeof A}:function(A){return A&&typeof Symbol=="function"&&A.constructor===Symbol&&A!==Symbol.prototype?"symbol":typeof A},_.exports.__esModule=!0,_.exports.default=_.exports,P(m)}_.exports=P,_.exports.__esModule=!0,_.exports.default=_.exports}}]);
