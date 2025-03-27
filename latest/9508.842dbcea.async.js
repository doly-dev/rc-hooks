"use strict";(self.webpackChunkrc_hooks=self.webpackChunkrc_hooks||[]).push([[9508],{39508:function(y,i,e){e.r(i),e.d(i,{clearCache:function(){return o.L},useAsync:function(){return o.Z},useClickAway:function(){return L.Z},useControllableValue:function(){return M.Z},useDebounce:function(){return l.Z},useDebounceFn:function(){return n.Z},useLatest:function(){return d.Z},useLimitList:function(){return P.Z},useLoadMore:function(){return t.Z},useMount:function(){return h.Z},useMountedRef:function(){return p.Z},usePagination:function(){return a.Z},usePersistFn:function(){return K.Z},usePrevious:function(){return v.Z},useSafeState:function(){return g.Z},useSetState:function(){return f.Z},useSize:function(){return b.Z},useThrottle:function(){return s.Z},useThrottleFn:function(){return u.Z},useUnmount:function(){return O.Z},useUnmountedRef:function(){return C.Z},useUpdate:function(){return B.Z},useUpdateEffect:function(){return W.Z},useUpdateLayoutEffect:function(){return U.Z}});var o=e(45040),t=e(45568),a=e(27070),n=e(73832),l=e(25456),u=e(42213),s=e(66293),d=e(6889),P=e(19664),f=e(97446),v=e(50199),g=e(15505),h=e(79566),p=e(93603),O=e(3373),C=e(64342),B=e(36739),W=e(96555),U=e(79993),L=e(54695),M=e(48116),K=e(77019),b=e(24317)},81180:function(y,i,e){e.d(i,{LK:function(){return I},ZP:function(){return F},lJ:function(){return D}});var o=e(26068),t=e.n(o),a=e(25298),n=e.n(a),l=e(17069),u=e.n(l),s=e(82092),d=e.n(s),P=e(61295),f=e(60549),v=e(80811);function g(){return typeof document!="undefined"&&typeof document.visibilityState!="undefined"?document.visibilityState!=="hidden":!0}function h(){return typeof navigator!="undefined"&&typeof navigator.onLine!="undefined"?navigator.onLine:!0}function p(R,m){var r=!1;return function(){if(!r){r=!0;for(var c=arguments.length,E=new Array(c),S=0;S<c;S++)E[S]=arguments[S];R.apply(void 0,E),setTimeout(function(){r=!1},m)}}}var O=[];function C(R){return O.push(R),function(){var r=O.indexOf(R);O.splice(r,1)}}var B=!1;if(typeof window!="undefined"&&window.addEventListener&&!B){var W=function(){if(g())for(var m=0;m<O.length;m++){var r=O[m];r()}};window.addEventListener("visibilitychange",W,!1),B=!0}var U=C,L=[];function M(R){return L.push(R),function(){var r=L.indexOf(R);L.splice(r,1)}}var K=!1;if(typeof window!="undefined"&&window.addEventListener&&!K){var b=function(){if(!(!g()||!h()))for(var m=0;m<L.length;m++){var r=L[m];r()}};window.addEventListener("visibilitychange",b,!1),window.addEventListener("focus",b,!1),K=!0}var A=M,_=new v.Z({prefix:"rc-hooks",stdTTL:5*60*1e3});function D(R){return _.cache.get(R)}function I(R){R?_.cache.del(R):_.cache.clear()}var j=function(){function R(m,r){n()(this,R),d()(this,"async",void 0),d()(this,"debounce",void 0),d()(this,"throttle",void 0),d()(this,"unsubscribes",void 0),d()(this,"options",void 0),d()(this,"params",[]),d()(this,"pollingWhenVisibleFlag",!1),d()(this,"pollingTimer",null),d()(this,"counter",1),d()(this,"destroyed",!1),this.async=m,this.options=t()({cacheTime:5*60*1e3,persisted:!1,pollingWhenHidden:!0,refreshOnWindowFocus:!1,focusTimespan:5e3},r),this.unsubscribes=[],this.init()}return u()(R,[{key:"init",value:function(){var r=this.options,c=r.pollingInterval,E=r.refreshOnWindowFocus,S=r.focusTimespan;if(this.updateDebounce(),c&&this.unsubscribes.push(U(this.rePolling.bind(this))),E){var Z=p(this.refresh.bind(this),S);this.unsubscribes.push(A(Z))}}},{key:"updateDebounce",value:function(){var r=this.options,c=r.debounceInterval,E=r.throttleInterval;this.debounce=typeof c=="number"&&c>0?(0,P.Z)(this._run,c):void 0,this.throttle=typeof E=="number"&&E>0?(0,f.Z)(this._run,E):void 0}},{key:"rePolling",value:function(){this.pollingWhenVisibleFlag&&(this.pollingWhenVisibleFlag=!1,this.refresh())}},{key:"afterUpdateOptions",value:function(r){var c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};("debounceInterval"in c&&c.debounceInterval!==r.debounceInterval||"throttleInterval"in c&&c.throttleInterval!==r.throttleInterval)&&this.updateDebounce()}},{key:"updateOptions",value:function(r){var c=this.options,E=t()(t()({},this.options),r);this.options=E,this.afterUpdateOptions(c,E)}},{key:"_run",value:function(){for(var r=this,c=arguments.length,E=new Array(c),S=0;S<c;S++)E[S]=arguments[S];this.pollingTimer&&clearTimeout(this.pollingTimer);var Z=this.counter;this.params=E;var z=this.options,$=z.cacheKey,w=z.cacheTime,ne=z.persisted,X=z.formatResult,T=z.onSuccess,N=z.onError,k=z.onFinally,V=z.onBefore,ee=z.pollingWhenHidden,te=z.pollingInterval;return V==null||V(E),new Promise(function(oe,ae){_.run(function(){return r.async.apply(r,E).then(function(Y){return typeof X=="function"?X(Y,E):Y})},$,{persisted:ne,ttl:w}).then(function(Y){Z===r.counter&&(T==null||T(Y,E),oe(Y))}).catch(function(Y){Z===r.counter&&(N==null||N(Y,E),ae(Y))}).finally(function(){if(Z===r.counter&&(k==null||k(),te)){if(!g()&&!ee){r.pollingWhenVisibleFlag=!0;return}r.pollingTimer=setTimeout(function(){r.run.apply(r,E)},te)}})})}},{key:"run",value:function(){for(var r=arguments.length,c=new Array(r),E=0;E<r;E++)c[E]=arguments[E];return this.debounce?(this.debounce.apply(this,c),Promise.resolve(null)):this.throttle?(this.throttle.apply(this,c),Promise.resolve(null)):(this.counter+=1,this._run.apply(this,c))}},{key:"refresh",value:function(){return this.run.apply(this,this.params)}},{key:"cancel",value:function(){this.debounce&&this.debounce.cancel(),this.throttle&&this.throttle.cancel(),this.pollingTimer&&(clearTimeout(this.pollingTimer),this.pollingTimer=null),this.counter+=1}},{key:"destroy",value:function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;r&&this.cancel(),this.destroyed||(this.destroyed=!0,this.unsubscribes.forEach(function(c){return c()}),this.unsubscribes=[])}},{key:"resume",value:function(){this.destroyed&&(this.destroyed=!1,this.init())}}]),R}(),F=j},45040:function(y,i,e){e.d(i,{L:function(){return h.LK},Z:function(){return B}});var o=e(26068),t=e.n(o),a=e(48305),n=e.n(a),l=e(75271),u=e(71017),s=e(96171),d=e(35897),P=e(77019),f=e(96555),v=e(6889),g=e(64342),h=e(81180);function p(W,U){return!(0,d.Z)(W)||!(0,d.Z)(U)?!1:W.length===U.length&&W.every(function(L,M){return U[M]===L})}var O=p,C=function(U,L){var M=L||{},K=M.autoRun,b=K===void 0?!0:K,A=M.refreshDeps,_=A===void 0?[]:A,D=M.defaultParams,I=M.loadingDelay,j=M.__INTERNAL_FORMAT__,F=M.defaultLoading,R=M.initialData,m=M.cacheKey,r=m===void 0?"":m,c=M.cacheTime,E=c===void 0?5*60*1e3:c,S=M.persisted,Z=S===void 0?!1:S,z=M.onSuccess,$=z===void 0?u.Z:z,w=M.onError,ne=w===void 0?u.Z:w,X=M.onFinally,T=X===void 0?u.Z:X,N=M.onBefore,k=N===void 0?u.Z:N,V=M.pollingInterval,ee=V===void 0?0:V,te=M.pollingWhenHidden,oe=te===void 0?!0:te,ae=M.refreshOnWindowFocus,Y=ae===void 0?!1:ae,le=M.focusTimespan,ue=le===void 0?5e3:le,se=M.debounceInterval,ie=M.throttleInterval,_e=(0,l.useState)(function(){return{params:[],loading:!!((0,s.Z)(F)?b&&!I:F),error:null,data:r?(0,h.lJ)(r):R}}),ce=n()(_e,2),fe=ce[0],J=ce[1],G=(0,v.Z)(fe),de=(0,g.Z)(),Q=(0,l.useRef)(null),Te=(0,P.Z)(U),ve=(0,P.Z)($),he=(0,P.Z)(ne),me=(0,P.Z)(T),Ee=(0,P.Z)(k),pe=(0,v.Z)(j),Pe=(0,l.useCallback)(function(H){Ee(H),Q.current&&clearTimeout(Q.current);var q=r?(0,h.lJ)(r):void 0;(!q||!Z)&&((G.current.loading!==!I||!O(G.current.params,H))&&J(function(x){return t()(t()({},x),{},{loading:!I,params:H})}),I&&(Q.current=setTimeout(function(){de.current||J(function(x){return t()(t()({},x),{},{loading:!0})})},I)))},[r,G,I,Ee,Z,de]),ge=(0,l.useCallback)(function(H,q){Q.current&&clearTimeout(Q.current),J(function(x){return t()(t()({},x),{},{data:H,error:null,loading:!1})}),ve(H,q)},[ve]),Me=(0,l.useCallback)(function(H,q){Q.current&&clearTimeout(Q.current),J(function(x){return t()(t()({},x),{},{error:H,loading:!1})}),he(H,q)},[he]),re=(0,l.useRef)();re.current||(re.current=new h.ZP(Te,{cacheKey:r,cacheTime:E,persisted:Z,formatResult:pe.current,onSuccess:ge,onError:Me,onFinally:me,onBefore:Pe,debounceInterval:se,throttleInterval:ie,pollingInterval:ee,pollingWhenHidden:oe,refreshOnWindowFocus:Y,focusTimespan:ue})),(0,f.Z)(function(){re.current.updateOptions({cacheKey:r,cacheTime:E,persisted:Z,formatResult:pe.current,onSuccess:ge,onError:Me,onFinally:me,onBefore:Pe,debounceInterval:se,throttleInterval:ie,pollingInterval:ee,pollingWhenHidden:oe,refreshOnWindowFocus:Y,focusTimespan:ue})},[ve,he,r,E,Z,se,ie,me,Ee,ee,oe,Y,ue,ge,Me,Pe]);var Oe=(0,l.useCallback)(function(){for(var H=arguments.length,q=new Array(H),x=0;x<H;x++)q[x]=arguments[x];return re.current.run.apply(re.current,q)},[]),De=(0,l.useCallback)(function(){return re.current.refresh()},[]),Re=(0,l.useCallback)(function(){re.current.cancel(),Q.current&&clearTimeout(Q.current),J(function(H){return t()(t()({},H),{},{loading:!1})})},[]),Le=function(q){J(typeof q=="function"?function(x){return t()(t()({},x),{},{data:q(fe.data)})}:function(x){return t()(t()({},x),{},{data:q})})};return(0,f.Z)(function(){b&&(0,d.Z)(_)&&_.length>0&&De()},[b].concat(_)),(0,l.useEffect)(function(){if(b){var H=(0,d.Z)(D)?D:typeof D!="undefined"?[D]:[];Oe.apply(void 0,H)}return re.current.resume(),function(){Re(),re.current.destroy(!1)}},[]),t()(t()({},fe),{},{run:Oe,cancel:Re,mutate:Le,refresh:De})},B=C},54695:function(y,i,e){var o=e(75271),t=e(26527),a=e(37198),n=e(6889);function l(u,s){var d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"click",P=(0,t.Z)(u),f=(0,n.Z)(P),v=P.every(function(B){return typeof B=="function"}),g=v?f:P,h=(0,n.Z)(s),p=(0,t.Z)(d),O=(0,n.Z)(p),C=p.join("");(0,o.useEffect)(function(){var B=function(L){var M=v?g.current:g;if(!M.some(function(b){var A=(0,a.Z)(b);return!A||(A==null?void 0:A.contains(L.target))})){var K;(K=h.current)===null||K===void 0||K.call(h,L)}},W=(0,t.Z)(O.current);return W.forEach(function(U){document.addEventListener(U,B)}),function(){W.forEach(function(U){document.removeEventListener(U,B)})}},[g,v,C])}i.Z=l},48116:function(y,i,e){var o=e(48305),t=e.n(o),a=e(75271),n=e(96555);function l(){var u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},d=s.defaultValue,P=s.defaultValuePropName,f=P===void 0?"defaultValue":P,v=s.valuePropName,g=v===void 0?"value":v,h=s.trigger,p=h===void 0?"onChange":h,O=g in u,C=u[g],B=(0,a.useState)(function(){return O?C:f in u?u[f]:d}),W=t()(B,2),U=W[0],L=W[1];(0,n.Z)(function(){O&&L(C)},[C,O]);var M=(0,a.useCallback)(function(K){if(O||L(K),u[p]){for(var b=arguments.length,A=new Array(b>1?b-1:0),_=1;_<b;_++)A[_-1]=arguments[_];u[p].apply(u,[K].concat(A))}},[O,u,p]);return[O?C:U,M]}i.Z=l},25456:function(y,i,e){var o=e(48305),t=e.n(o),a=e(75271),n=e(73832);function l(u){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,P=(0,a.useState)(u),f=t()(P,2),v=f[0],g=f[1],h=(0,n.Z)(g,s,d),p=h.run;return(0,a.useEffect)(function(){p(u)},[p,u]),v}i.Z=l},73832:function(y,i,e){var o=e(75271),t=e(61295),a=e(3373),n=e(6889);function l(u){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,P=(0,n.Z)(u),f=(0,o.useRef)((0,t.Z)(function(){for(var v=arguments.length,g=new Array(v),h=0;h<v;h++)g[h]=arguments[h];return P.current.apply(void 0,g)},s,d));return(0,a.Z)(function(){f.current.cancel()}),{run:f.current,cancel:f.current.cancel,flush:f.current.flush}}i.Z=l},6889:function(y,i,e){var o=e(75271);function t(a){var n=(0,o.useRef)(a);return n.current=a,n}i.Z=t},19664:function(y,i,e){var o=e(48305),t=e.n(o),a=e(75271),n=e(35897);function l(){var u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},d=s||{},P=d.count,f=P===void 0?3:P,v=d.defaultLimited,g=v===void 0?!0:v,h=(0,a.useRef)(g),p=(0,a.useMemo)(function(){return(0,n.Z)(u)?u:[]},[u]),O=(0,a.useMemo)(function(){return f>0?Math.ceil(f):0},[f]),C=(0,a.useMemo)(function(){return p.length>O},[O,p.length]),B=(0,a.useState)(function(){return C&&g?p.slice(0,O):p}),W=t()(B,2),U=W[0],L=W[1],M=function(){C&&(h.current=!h.current),L(h.current?p.slice(0,O):p)};return(0,a.useEffect)(function(){L(h.current?p.slice(0,O):p)},[O,p]),{canLimit:C,limited:h.current,data:U,toggle:M}}i.Z=l},45568:function(y,i,e){e.d(i,{Z:function(){return b}});var o=e(57724),t=e.n(o),a=e(26068),n=e.n(a),l=e(67825),u=e.n(l),s=e(75271),d=e(35897),P=e(45040),f=e(77019),v=e(33609),g=e(54051),h=function(){var _=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window;return!v.jU||!_?0:(0,g.Z)(_)?window.scrollY:_.scrollTop},p=function(){var _=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window;return!v.jU||!_?0:(0,g.Z)(_)?document.documentElement.scrollHeight:_.scrollHeight},O=function(){var _=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window;return!v.jU||!_?0:(0,g.Z)(_)?document.documentElement.clientHeight:_.clientHeight};function C(A){return typeof A=="function"?A():A}var B=function(){var _=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},D=_.target,I=_.threshold,j=I===void 0?100:I,F=_.onScrollLower,R=F===void 0?function(){}:F,m=(0,f.Z)(R),r=(0,s.useCallback)(function(){if(D){var c=C(D);c&&p(c)-h(c)<=O(c)+j&&m()}},[m,D,j]);(0,s.useEffect)(function(){if(D){var c=C(D);if(c)return c.addEventListener("scroll",r),function(){c.removeEventListener("scroll",r)}}},[D,r])},W=B,U=e(96555),L=["threshold","target","isNoMore","refreshDeps","autoRun"],M=["run","data","loading","cancel","params","mutate"];function K(A,_){var D=_||{},I=D.threshold,j=I===void 0?100:I,F=D.target,R=D.isNoMore,m=R===void 0?function(){return!1}:R,r=D.refreshDeps,c=r===void 0?[]:r,E=D.autoRun,S=E===void 0?!0:E,Z=u()(D,L),z=(0,s.useRef)([]),$=(0,s.useRef)(1),w=(0,P.Z)(A,n()(n()({defaultParams:[{current:$.current}],autoRun:S},Z),{},{onError:function(G,de){var Q;$.current>1&&($.current-=1),Z==null||(Q=Z.onError)===null||Q===void 0||Q.call(Z,G,de)},__INTERNAL_FORMAT__:function(G){return z.current=$.current===1?G.list:z.current.concat(G.list),n()(n()({},G),{},{list:z.current})}})),ne=w.run,X=w.data,T=w.loading,N=w.cancel,k=w.params,V=w.mutate,ee=u()(w,M),te=m?!T&&m(X):!1,oe=k||[],ae=t()(oe),Y=ae[0],le=ae.slice(1),ue=(0,s.useCallback)(function(){return ne.apply(void 0,[{current:$.current}].concat(le))},[le,ne]),se=(0,s.useCallback)(function(){T&&$.current>1&&($.current-=1),N()},[N,T]),ie=(0,s.useCallback)(function(){T||te||($.current+=1,ue())},[T,te,ue]),_e=(0,s.useCallback)(function(J){var G=typeof J=="function"?J(X):J;z.current=(G==null?void 0:G.list)||[],V(G)},[X,V]),ce=(0,s.useCallback)(function(){return se(),$.current=1,_e(function(J){return n()(n()({},J),{},{list:[]})}),ue()},[se,ue,_e]),fe=(0,s.useCallback)(function(){if(!(T||!F))return ie()},[ie,F,T]);return W({target:F,threshold:j,onScrollLower:fe}),(0,U.Z)(function(){S&&(0,d.Z)(c)&&c.length>0&&ce()},c),n()(n()({},ee),{},{loading:T,data:X,run:ne,refresh:ce,cancel:se,mutate:_e,params:[n()(n()({},Y),{},{current:$.current})].concat(le),loadMore:ie,loadingMore:T&&$.current>1,noMore:te})}var b=K},79566:function(y,i,e){var o=e(75271),t=function(n){(0,o.useEffect)(function(){n()},[])};i.Z=t},93603:function(y,i,e){var o=e(75271),t=function(){var n=(0,o.useRef)(!1);return(0,o.useEffect)(function(){return n.current=!0,function(){n.current=!1}},[]),n};i.Z=t},27070:function(y,i,e){var o=e(57724),t=e.n(o),a=e(26068),n=e.n(a),l=e(67825),u=e.n(l),s=e(75271),d=e(35897),P=e(45040),f=e(96555),v=["defaultPageSize","refreshDeps","defaultParams","autoRun"],g=["run","data","params","loading"];function h(p,O){var C=O||{},B=C.defaultPageSize,W=B===void 0?10:B,U=C.refreshDeps,L=U===void 0?[]:U,M=C.defaultParams,K=C.autoRun,b=K===void 0?!0:K,A=u()(C,v),_=(0,s.useMemo)(function(){return M||[{current:1,pageSize:W}]},[W,M]),D=(0,P.Z)(p,n()({defaultParams:_,autoRun:b},A)),I=D.run,j=D.data,F=D.params,R=D.loading,m=u()(D,g),r=F&&F[0]?F[0]:_[0],c=r.current,E=r.pageSize,S=(j==null?void 0:j.total)||0,Z=(0,s.useCallback)(function(T){var N=t()(F),k=N[0],V=N.slice(1);I.apply(void 0,[n()(n()({},k),T)].concat(V))},[F,I]),z=(0,s.useCallback)(function(){Z({current:c,pageSize:E})},[Z,c,E]),$=(0,s.useCallback)(function(T,N){var k=T<=0?1:T,V=N<=0?1:N,ee=Math.ceil(S/V);k>ee&&ee>0&&(k=ee),Z({current:k,pageSize:V})},[Z,S]),w=(0,s.useCallback)(function(T){$(T,E)},[$,E]),ne=(0,s.useCallback)(function(T){$(c,T)},[c,$]),X=(0,s.useCallback)(function(T,N,k,V){Z({current:T==null?void 0:T.current,pageSize:T==null?void 0:T.pageSize,filters:N,sorter:k,extra:V})},[Z]);return(0,f.Z)(function(){b&&(0,d.Z)(L)&&L.length>0&&w(1)},L),n()(n()({},m),{},{data:j,run:I,refresh:z,loading:R,params:F,pagination:{current:c,pageSize:E,total:S,onChange:$,changeCurrent:w,changePageSize:ne},tableProps:{dataSource:(j==null?void 0:j.list)||[],loading:R,onChange:X,pagination:{total:S,current:c,pageSize:E}}})}i.Z=h},77019:function(y,i,e){var o=e(75271),t=e(6889);function a(n){var l=(0,t.Z)(n),u=(0,o.useCallback)(function(){for(var s=l.current,d=arguments.length,P=new Array(d),f=0;f<d;f++)P[f]=arguments[f];return s==null?void 0:s.apply(void 0,P)},[]);return u}i.Z=a},50199:function(y,i,e){var o=e(75271),t=e(93603);function a(n){var l=(0,t.Z)(),u=(0,o.useRef)(),s=(0,o.useRef)(n);return l.current&&s.current!==n&&(u.current=s.current,s.current=n),u.current}i.Z=a},15505:function(y,i,e){var o=e(48305),t=e.n(o),a=e(75271),n=e(64342);function l(u){var s=(0,n.Z)(),d=(0,a.useState)(u),P=t()(d,2),f=P[0],v=P[1],g=(0,a.useCallback)(function(h){s.current||v(h)},[]);return[f,g]}i.Z=l},97446:function(y,i,e){var o=e(26068),t=e.n(o),a=e(48305),n=e.n(a),l=e(75271);function u(s){var d=(0,l.useState)(s),P=n()(d,2),f=P[0],v=P[1],g=(0,l.useCallback)(function(h){v(function(p){var O=h instanceof Function?h(p):h;return O instanceof Object?t()(t()({},p),O):p})},[]);return[f,g]}i.Z=u},24317:function(y,i,e){e.d(i,{Z:function(){return K}});var o=e(48305),t=e.n(o),a=e(75271),n=e(26068),l=e.n(n),u=e(17069),s=e.n(u),d=e(25298),P=e.n(d),f=e(82092),v=e.n(f),g=e(33609),h=e(60549),p=50,O=["top","right","bottom","left","width","height","size","weight"],C={characterData:!0,childList:!0,attributes:!0,subtree:!0},B=s()(function b(A){var _=this;P()(this,b),v()(this,"observer",void 0),v()(this,"throttleRefresh",void 0),v()(this,"targetNode",void 0),v()(this,"callback",void 0),v()(this,"refresh",function(){_.targetNode&&_.callback([{target:_.targetNode}],{})}),v()(this,"onTransitionEnd_",function(D){var I=D.propertyName,j=I===void 0?"":I,F=O.some(function(R){return j.indexOf(R)>-1});F&&_.throttleRefresh()}),v()(this,"observe",function(D,I){g.jU&&(_.targetNode=D,document.addEventListener("transitionend",_.onTransitionEnd_),window.addEventListener("resize",_.throttleRefresh),_.observer.observe(document,l()(l()({},C),I)))}),v()(this,"disconnect",function(){g.jU&&(_.throttleRefresh.cancel(),_.targetNode=null,document.removeEventListener("transitionend",_.onTransitionEnd_),window.removeEventListener("resize",_.throttleRefresh),_.observer.disconnect())}),this.throttleRefresh=(0,h.Z)(this.refresh,p),this.targetNode=null,this.callback=A,this.observer=new MutationObserver(this.throttleRefresh)}),W=B,U=e(37198),L=e(6889);function M(b){var A=(0,L.Z)(b),_=typeof b=="function",D=_?A:b,I=(0,a.useState)(function(){var m=(0,U.Z)(b);return{width:m==null?void 0:m.clientWidth,height:m==null?void 0:m.clientHeight}}),j=t()(I,2),F=j[0],R=j[1];return(0,a.useEffect)(function(){var m=(0,U.Z)(_?D.current:D);function r(E){E&&R({width:E.clientWidth,height:E.clientHeight})}if(!m)return function(){};r(m);var c=new W(function(E){E.forEach(function(S){r(S.target)})});return c.observe(m),function(){c.disconnect()}},[D,_]),F}var K=M},66293:function(y,i,e){var o=e(48305),t=e.n(o),a=e(75271),n=e(42213);function l(u){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,P=(0,a.useState)(u),f=t()(P,2),v=f[0],g=f[1],h=(0,n.Z)(g,s,d),p=h.run;return(0,a.useEffect)(function(){p(u)},[p,u]),v}i.Z=l},42213:function(y,i,e){var o=e(75271),t=e(60549),a=e(3373),n=e(6889);function l(u){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,P=(0,n.Z)(u),f=(0,o.useRef)((0,t.Z)(function(){for(var v=arguments.length,g=new Array(v),h=0;h<v;h++)g[h]=arguments[h];return P.current.apply(void 0,g)},s,d));return(0,a.Z)(function(){f.current.cancel()}),{run:f.current,cancel:f.current.cancel,flush:f.current.flush}}i.Z=l},3373:function(y,i,e){var o=e(75271),t=e(6889),a=function(l){var u=(0,t.Z)(l);(0,o.useEffect)(function(){return function(){return u.current()}},[])};i.Z=a},64342:function(y,i,e){var o=e(75271),t=function(){var n=(0,o.useRef)(!1);return(0,o.useEffect)(function(){return n.current=!1,function(){n.current=!0}},[]),n};i.Z=t},36739:function(y,i,e){var o=e(48305),t=e.n(o),a=e(75271),n=e(15505),l=function(){var s=(0,n.Z)(0),d=t()(s,2),P=d[1],f=(0,a.useCallback)(function(){P(function(v){return v+1})},[]);return f};i.Z=l},96555:function(y,i,e){var o=e(75271),t=function(n,l){var u=(0,o.useRef)(!1);(0,o.useEffect)(function(){if(!u.current)u.current=!0;else return n()},l)};i.Z=t},79993:function(y,i,e){var o=e(75271),t=function(n,l){var u=(0,o.useRef)(!1);(0,o.useLayoutEffect)(function(){if(!u.current)u.current=!0;else return n()},l)};i.Z=t},37198:function(y,i,e){var o=e(31759),t=e.n(o);function a(n){return typeof n=="function"?n():t()(n)==="object"&&n&&"current"in n?n.current:n}i.Z=a}}]);
