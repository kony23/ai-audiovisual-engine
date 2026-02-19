var RM=Object.defineProperty,NM=Object.defineProperties;var PM=Object.getOwnPropertyDescriptors;var Pg=Object.getOwnPropertySymbols;var OM=Object.prototype.hasOwnProperty,LM=Object.prototype.propertyIsEnumerable;var Og=(n,e,t)=>e in n?RM(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,$e=(n,e)=>{for(var t in e||={})OM.call(e,t)&&Og(n,t,e[t]);if(Pg)for(var t of Pg(e))LM.call(e,t)&&Og(n,t,e[t]);return n},St=(n,e)=>NM(n,PM(e));var en=null,dl=!1,sf=1,FM=null,Dn=Symbol("SIGNAL");function Ce(n){let e=en;return en=n,e}function hl(){return en}var No={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function of(n){if(dl)throw new Error("");if(en===null)return;en.consumerOnSignalRead(n);let e=en.producersTail;if(e!==void 0&&e.producer===n)return;let t,i=en.recomputing;if(i&&(t=e!==void 0?e.nextProducer:en.producers,t!==void 0&&t.producer===n)){en.producersTail=t,t.lastReadVersion=n.version;return}let r=n.consumersTail;if(r!==void 0&&r.consumer===en&&(!i||UM(r,en)))return;let s=Ts(en),o={producer:n,consumer:en,nextProducer:t,prevConsumer:r,lastReadVersion:n.version,nextConsumer:void 0};en.producersTail=o,e!==void 0?e.nextProducer=o:en.producers=o,s&&Ug(n,o)}function Lg(){sf++}function af(n){if(!(Ts(n)&&!n.dirty)&&!(!n.dirty&&n.lastCleanEpoch===sf)){if(!n.producerMustRecompute(n)&&!df(n)){rf(n);return}n.producerRecomputeValue(n),rf(n)}}function lf(n){if(n.consumers===void 0)return;let e=dl;dl=!0;try{for(let t=n.consumers;t!==void 0;t=t.nextConsumer){let i=t.consumer;i.dirty||kM(i)}}finally{dl=e}}function cf(){return en?.consumerAllowSignalWrites!==!1}function kM(n){n.dirty=!0,lf(n),n.consumerMarkedDirty?.(n)}function rf(n){n.dirty=!1,n.lastCleanEpoch=sf}function pl(n){return n&&Fg(n),Ce(n)}function Fg(n){n.producersTail=void 0,n.recomputing=!0}function uf(n,e){Ce(e),n&&kg(n)}function kg(n){n.recomputing=!1;let e=n.producersTail,t=e!==void 0?e.nextProducer:n.producers;if(t!==void 0){if(Ts(n))do t=ff(t);while(t!==void 0);e!==void 0?e.nextProducer=void 0:n.producers=void 0}}function df(n){for(let e=n.producers;e!==void 0;e=e.nextProducer){let t=e.producer,i=e.lastReadVersion;if(i!==t.version||(af(t),i!==t.version))return!0}return!1}function ml(n){if(Ts(n)){let e=n.producers;for(;e!==void 0;)e=ff(e)}n.producers=void 0,n.producersTail=void 0,n.consumers=void 0,n.consumersTail=void 0}function Ug(n,e){let t=n.consumersTail,i=Ts(n);if(t!==void 0?(e.nextConsumer=t.nextConsumer,t.nextConsumer=e):(e.nextConsumer=void 0,n.consumers=e),e.prevConsumer=t,n.consumersTail=e,!i)for(let r=n.producers;r!==void 0;r=r.nextProducer)Ug(r.producer,r)}function ff(n){let e=n.producer,t=n.nextProducer,i=n.nextConsumer,r=n.prevConsumer;if(n.nextConsumer=void 0,n.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:e.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(e.consumers=i,!Ts(e)){let s=e.producers;for(;s!==void 0;)s=ff(s)}return t}function Ts(n){return n.consumerIsAlwaysLive||n.consumers!==void 0}function hf(n){FM?.(n)}function UM(n,e){let t=e.producersTail;if(t!==void 0){let i=e.producers;do{if(i===n)return!0;if(i===t)break;i=i.nextProducer}while(i!==void 0)}return!1}function pf(n,e){return Object.is(n,e)}function gl(n,e){let t=Object.create(VM);t.computation=n,e!==void 0&&(t.equal=e);let i=()=>{if(af(t),of(t),t.value===fl)throw t.error;return t.value};return i[Dn]=t,hf(t),i}var tf=Symbol("UNSET"),nf=Symbol("COMPUTING"),fl=Symbol("ERRORED"),VM=St($e({},No),{value:tf,dirty:!0,error:null,equal:pf,kind:"computed",producerMustRecompute(n){return n.value===tf||n.value===nf},producerRecomputeValue(n){if(n.value===nf)throw new Error("");let e=n.value;n.value=nf;let t=pl(n),i,r=!1;try{i=n.computation(),Ce(null),r=e!==tf&&e!==fl&&i!==fl&&n.equal(e,i)}catch(s){i=fl,n.error=s}finally{uf(n,t)}if(r){n.value=e;return}n.value=i,n.version++}});function BM(){throw new Error}var Vg=BM;function Bg(n){Vg(n)}function mf(n){Vg=n}var HM=null;function gf(n,e){let t=Object.create(Gg);t.value=n,e!==void 0&&(t.equal=e);let i=()=>Hg(t);return i[Dn]=t,hf(t),[i,o=>vf(t,o),o=>zg(t,o)]}function Hg(n){return of(n),n.value}function vf(n,e){cf()||Bg(n),n.equal(n.value,e)||(n.value=e,zM(n))}function zg(n,e){cf()||Bg(n),vf(n,e(n.value))}var Gg=St($e({},No),{equal:pf,value:void 0,kind:"signal"});function zM(n){n.version++,Lg(),lf(n),HM?.(n)}function yf(n){let e=Ce(null);try{return n()}finally{Ce(e)}}function ot(n){return typeof n=="function"}function vl(n){let t=n(i=>{Error.call(i),i.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var yl=vl(n=>function(t){n(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function Po(n,e){if(n){let t=n.indexOf(e);0<=t&&n.splice(t,1)}}var ln=class n{constructor(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let e;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let s of t)s.remove(this);else t.remove(this);let{initialTeardown:i}=this;if(ot(i))try{i()}catch(s){e=s instanceof yl?s.errors:[s]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let s of r)try{Wg(s)}catch(o){e=e??[],o instanceof yl?e=[...e,...o.errors]:e.push(o)}}if(e)throw new yl(e)}}add(e){var t;if(e&&e!==this)if(this.closed)Wg(e);else{if(e instanceof n){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(e)}}_hasParent(e){let{_parentage:t}=this;return t===e||Array.isArray(t)&&t.includes(e)}_addParent(e){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e}_removeParent(e){let{_parentage:t}=this;t===e?this._parentage=null:Array.isArray(t)&&Po(t,e)}remove(e){let{_finalizers:t}=this;t&&Po(t,e),e instanceof n&&e._removeParent(this)}};ln.EMPTY=(()=>{let n=new ln;return n.closed=!0,n})();var _f=ln.EMPTY;function _l(n){return n instanceof ln||n&&"closed"in n&&ot(n.remove)&&ot(n.add)&&ot(n.unsubscribe)}function Wg(n){ot(n)?n():n.unsubscribe()}var $n={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var As={setTimeout(n,e,...t){let{delegate:i}=As;return i?.setTimeout?i.setTimeout(n,e,...t):setTimeout(n,e,...t)},clearTimeout(n){let{delegate:e}=As;return(e?.clearTimeout||clearTimeout)(n)},delegate:void 0};function xl(n){As.setTimeout(()=>{let{onUnhandledError:e}=$n;if(e)e(n);else throw n})}function xf(){}var jg=Mf("C",void 0,void 0);function $g(n){return Mf("E",void 0,n)}function qg(n){return Mf("N",n,void 0)}function Mf(n,e,t){return{kind:n,value:e,error:t}}var Ir=null;function Is(n){if($n.useDeprecatedSynchronousErrorHandling){let e=!Ir;if(e&&(Ir={errorThrown:!1,error:null}),n(),e){let{errorThrown:t,error:i}=Ir;if(Ir=null,t)throw i}}else n()}function Xg(n){$n.useDeprecatedSynchronousErrorHandling&&Ir&&(Ir.errorThrown=!0,Ir.error=n)}var Dr=class extends ln{constructor(e){super(),this.isStopped=!1,e?(this.destination=e,_l(e)&&e.add(this)):this.destination=jM}static create(e,t,i){return new Ds(e,t,i)}next(e){this.isStopped?Sf(qg(e),this):this._next(e)}error(e){this.isStopped?Sf($g(e),this):(this.isStopped=!0,this._error(e))}complete(){this.isStopped?Sf(jg,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(e){this.destination.next(e)}_error(e){try{this.destination.error(e)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},GM=Function.prototype.bind;function bf(n,e){return GM.call(n,e)}var Ef=class{constructor(e){this.partialObserver=e}next(e){let{partialObserver:t}=this;if(t.next)try{t.next(e)}catch(i){Ml(i)}}error(e){let{partialObserver:t}=this;if(t.error)try{t.error(e)}catch(i){Ml(i)}else Ml(e)}complete(){let{partialObserver:e}=this;if(e.complete)try{e.complete()}catch(t){Ml(t)}}},Ds=class extends Dr{constructor(e,t,i){super();let r;if(ot(e)||!e)r={next:e??void 0,error:t??void 0,complete:i??void 0};else{let s;this&&$n.useDeprecatedNextContext?(s=Object.create(e),s.unsubscribe=()=>this.unsubscribe(),r={next:e.next&&bf(e.next,s),error:e.error&&bf(e.error,s),complete:e.complete&&bf(e.complete,s)}):r=e}this.destination=new Ef(r)}};function Ml(n){$n.useDeprecatedSynchronousErrorHandling?Xg(n):xl(n)}function WM(n){throw n}function Sf(n,e){let{onStoppedNotification:t}=$n;t&&As.setTimeout(()=>t(n,e))}var jM={closed:!0,next:xf,error:WM,complete:xf};var Rs=typeof Symbol=="function"&&Symbol.observable||"@@observable";function Yg(n){return n}function Zg(n){return n.length===0?Yg:n.length===1?n[0]:function(t){return n.reduce((i,r)=>r(i),t)}}var Lt=(()=>{class n{constructor(t){t&&(this._subscribe=t)}lift(t){let i=new n;return i.source=this,i.operator=t,i}subscribe(t,i,r){let s=qM(t)?t:new Ds(t,i,r);return Is(()=>{let{operator:o,source:a}=this;s.add(o?o.call(s,a):a?this._subscribe(s):this._trySubscribe(s))}),s}_trySubscribe(t){try{return this._subscribe(t)}catch(i){t.error(i)}}forEach(t,i){return i=Jg(i),new i((r,s)=>{let o=new Ds({next:a=>{try{t(a)}catch(l){s(l),o.unsubscribe()}},error:s,complete:r});this.subscribe(o)})}_subscribe(t){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(t)}[Rs](){return this}pipe(...t){return Zg(t)(this)}toPromise(t){return t=Jg(t),new t((i,r)=>{let s;this.subscribe(o=>s=o,o=>r(o),()=>i(s))})}}return n.create=e=>new n(e),n})();function Jg(n){var e;return(e=n??$n.Promise)!==null&&e!==void 0?e:Promise}function $M(n){return n&&ot(n.next)&&ot(n.error)&&ot(n.complete)}function qM(n){return n&&n instanceof Dr||$M(n)&&_l(n)}function XM(n){return ot(n?.lift)}function Ns(n){return e=>{if(XM(e))return e.lift(function(t){try{return n(t,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function Ps(n,e,t,i,r){return new wf(n,e,t,i,r)}var wf=class extends Dr{constructor(e,t,i,r,s,o){super(e),this.onFinalize=s,this.shouldUnsubscribe=o,this._next=t?function(a){try{t(a)}catch(l){e.error(l)}}:super._next,this._error=r?function(a){try{r(a)}catch(l){e.error(l)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){e.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((e=this.onFinalize)===null||e===void 0||e.call(this))}}};var Kg=vl(n=>function(){n(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var qn=(()=>{class n extends Lt{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(t){let i=new bl(this,this);return i.operator=t,i}_throwIfClosed(){if(this.closed)throw new Kg}next(t){Is(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(t)}})}error(t){Is(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;let{observers:i}=this;for(;i.length;)i.shift().error(t)}})}complete(){Is(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:t}=this;for(;t.length;)t.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0}_trySubscribe(t){return this._throwIfClosed(),super._trySubscribe(t)}_subscribe(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)}_innerSubscribe(t){let{hasError:i,isStopped:r,observers:s}=this;return i||r?_f:(this.currentObservers=null,s.push(t),new ln(()=>{this.currentObservers=null,Po(s,t)}))}_checkFinalizedStatuses(t){let{hasError:i,thrownError:r,isStopped:s}=this;i?t.error(r):s&&t.complete()}asObservable(){let t=new Lt;return t.source=this,t}}return n.create=(e,t)=>new bl(e,t),n})(),bl=class extends qn{constructor(e,t){super(),this.destination=e,this.source=t}next(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.next)===null||i===void 0||i.call(t,e)}error(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.error)===null||i===void 0||i.call(t,e)}complete(){var e,t;(t=(e=this.destination)===null||e===void 0?void 0:e.complete)===null||t===void 0||t.call(e)}_subscribe(e){var t,i;return(i=(t=this.source)===null||t===void 0?void 0:t.subscribe(e))!==null&&i!==void 0?i:_f}};var Oo=class extends qn{constructor(e){super(),this._value=e}get value(){return this.getValue()}_subscribe(e){let t=super._subscribe(e);return!t.closed&&e.next(this._value),t}getValue(){let{hasError:e,thrownError:t,_value:i}=this;if(e)throw t;return this._throwIfClosed(),i}next(e){super.next(this._value=e)}};function YM(n){return n[n.length-1]}function Qg(n){return ot(YM(n))?n.pop():void 0}function tv(n,e,t,i){function r(s){return s instanceof t?s:new t(function(o){o(s)})}return new(t||(t=Promise))(function(s,o){function a(u){try{c(i.next(u))}catch(d){o(d)}}function l(u){try{c(i.throw(u))}catch(d){o(d)}}function c(u){u.done?s(u.value):r(u.value).then(a,l)}c((i=i.apply(n,e||[])).next())})}function ev(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function Rr(n){return this instanceof Rr?(this.v=n,this):new Rr(n)}function nv(n,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=t.apply(n,e||[]),r,s=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",o),r[Symbol.asyncIterator]=function(){return this},r;function o(h){return function(v){return Promise.resolve(v).then(h,d)}}function a(h,v){i[h]&&(r[h]=function(y){return new Promise(function(m,p){s.push([h,y,m,p])>1||l(h,y)})},v&&(r[h]=v(r[h])))}function l(h,v){try{c(i[h](v))}catch(y){f(s[0][3],y)}}function c(h){h.value instanceof Rr?Promise.resolve(h.value.v).then(u,d):f(s[0][2],h)}function u(h){l("next",h)}function d(h){l("throw",h)}function f(h,v){h(v),s.shift(),s.length&&l(s[0][0],s[0][1])}}function iv(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=n[Symbol.asyncIterator],t;return e?e.call(n):(n=typeof ev=="function"?ev(n):n[Symbol.iterator](),t={},i("next"),i("throw"),i("return"),t[Symbol.asyncIterator]=function(){return this},t);function i(s){t[s]=n[s]&&function(o){return new Promise(function(a,l){o=n[s](o),r(a,l,o.done,o.value)})}}function r(s,o,a,l){Promise.resolve(l).then(function(c){s({value:c,done:a})},o)}}var Sl=n=>n&&typeof n.length=="number"&&typeof n!="function";function El(n){return ot(n?.then)}function wl(n){return ot(n[Rs])}function Cl(n){return Symbol.asyncIterator&&ot(n?.[Symbol.asyncIterator])}function Tl(n){return new TypeError(`You provided ${n!==null&&typeof n=="object"?"an invalid object":`'${n}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function ZM(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Al=ZM();function Il(n){return ot(n?.[Al])}function Dl(n){return nv(this,arguments,function*(){let t=n.getReader();try{for(;;){let{value:i,done:r}=yield Rr(t.read());if(r)return yield Rr(void 0);yield yield Rr(i)}}finally{t.releaseLock()}})}function Rl(n){return ot(n?.getReader)}function Qi(n){if(n instanceof Lt)return n;if(n!=null){if(wl(n))return JM(n);if(Sl(n))return KM(n);if(El(n))return QM(n);if(Cl(n))return rv(n);if(Il(n))return eb(n);if(Rl(n))return tb(n)}throw Tl(n)}function JM(n){return new Lt(e=>{let t=n[Rs]();if(ot(t.subscribe))return t.subscribe(e);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function KM(n){return new Lt(e=>{for(let t=0;t<n.length&&!e.closed;t++)e.next(n[t]);e.complete()})}function QM(n){return new Lt(e=>{n.then(t=>{e.closed||(e.next(t),e.complete())},t=>e.error(t)).then(null,xl)})}function eb(n){return new Lt(e=>{for(let t of n)if(e.next(t),e.closed)return;e.complete()})}function rv(n){return new Lt(e=>{nb(n,e).catch(t=>e.error(t))})}function tb(n){return rv(Dl(n))}function nb(n,e){var t,i,r,s;return tv(this,void 0,void 0,function*(){try{for(t=iv(n);i=yield t.next(),!i.done;){let o=i.value;if(e.next(o),e.closed)return}}catch(o){r={error:o}}finally{try{i&&!i.done&&(s=t.return)&&(yield s.call(t))}finally{if(r)throw r.error}}e.complete()})}function fi(n,e,t,i=0,r=!1){let s=e.schedule(function(){t(),r?n.add(this.schedule(null,i)):this.unsubscribe()},i);if(n.add(s),!r)return s}function Nl(n,e=0){return Ns((t,i)=>{t.subscribe(Ps(i,r=>fi(i,n,()=>i.next(r),e),()=>fi(i,n,()=>i.complete(),e),r=>fi(i,n,()=>i.error(r),e)))})}function Pl(n,e=0){return Ns((t,i)=>{i.add(n.schedule(()=>t.subscribe(i),e))})}function sv(n,e){return Qi(n).pipe(Pl(e),Nl(e))}function ov(n,e){return Qi(n).pipe(Pl(e),Nl(e))}function av(n,e){return new Lt(t=>{let i=0;return e.schedule(function(){i===n.length?t.complete():(t.next(n[i++]),t.closed||this.schedule())})})}function lv(n,e){return new Lt(t=>{let i;return fi(t,e,()=>{i=n[Al](),fi(t,e,()=>{let r,s;try{({value:r,done:s}=i.next())}catch(o){t.error(o);return}s?t.complete():t.next(r)},0,!0)}),()=>ot(i?.return)&&i.return()})}function Ol(n,e){if(!n)throw new Error("Iterable cannot be null");return new Lt(t=>{fi(t,e,()=>{let i=n[Symbol.asyncIterator]();fi(t,e,()=>{i.next().then(r=>{r.done?t.complete():t.next(r.value)})},0,!0)})})}function cv(n,e){return Ol(Dl(n),e)}function uv(n,e){if(n!=null){if(wl(n))return sv(n,e);if(Sl(n))return av(n,e);if(El(n))return ov(n,e);if(Cl(n))return Ol(n,e);if(Il(n))return lv(n,e);if(Rl(n))return cv(n,e)}throw Tl(n)}function Cf(n,e){return e?uv(n,e):Qi(n)}function Nr(n,e){return Ns((t,i)=>{let r=0;t.subscribe(Ps(i,s=>{i.next(n.call(e,s,r++))}))})}var{isArray:ib}=Array;function rb(n,e){return ib(e)?n(...e):n(e)}function dv(n){return Nr(e=>rb(n,e))}var{isArray:sb}=Array,{getPrototypeOf:ob,prototype:ab,keys:lb}=Object;function fv(n){if(n.length===1){let e=n[0];if(sb(e))return{args:e,keys:null};if(cb(e)){let t=lb(e);return{args:t.map(i=>e[i]),keys:t}}}return{args:n,keys:null}}function cb(n){return n&&typeof n=="object"&&ob(n)===ab}function hv(n,e){return n.reduce((t,i,r)=>(t[i]=e[r],t),{})}function Tf(...n){let e=Qg(n),{args:t,keys:i}=fv(n),r=new Lt(s=>{let{length:o}=t;if(!o){s.complete();return}let a=new Array(o),l=o,c=o;for(let u=0;u<o;u++){let d=!1;Qi(t[u]).subscribe(Ps(s,f=>{d||(d=!0,c--),a[u]=f},()=>l--,void 0,()=>{(!l||!d)&&(c||s.next(i?hv(i,a):a),s.complete())}))}});return e?r.pipe(dv(e)):r}var Af;function Ll(){return Af}function hi(n){let e=Af;return Af=n,e}var pv=Symbol("NotFound");function Os(n){return n===pv||n?.name==="\u0275NotFound"}var Gf="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",Xe=class extends Error{code;constructor(e,t){super(Wf(e,t)),this.code=e}};function fb(n){return`NG0${Math.abs(n)}`}function Wf(n,e){return`${fb(n)}${e?": "+e:""}`}function ft(n){for(let e in n)if(n[e]===ft)return e;throw Error("")}function _v(n,e){for(let t in e)e.hasOwnProperty(t)&&!n.hasOwnProperty(t)&&(n[t]=e[t])}function er(n){if(typeof n=="string")return n;if(Array.isArray(n))return`[${n.map(er).join(", ")}]`;if(n==null)return""+n;let e=n.overriddenName||n.name;if(e)return`${e}`;let t=n.toString();if(t==null)return""+t;let i=t.indexOf(`
`);return i>=0?t.slice(0,i):t}function jf(n,e){return n?e?`${n} ${e}`:n:e||""}var hb=ft({__forward_ref__:ft});function Ur(n){return n.__forward_ref__=Ur,n.toString=function(){return er(this())},n}function Yt(n){return $f(n)?n():n}function $f(n){return typeof n=="function"&&n.hasOwnProperty(hb)&&n.__forward_ref__===Ur}function yt(n){return{token:n.token,providedIn:n.providedIn||null,factory:n.factory,value:void 0}}function ks(n){return{providers:n.providers||[],imports:n.imports||[]}}function Bl(n){return pb(n,Hl)}function pb(n,e){return n.hasOwnProperty(e)&&n[e]||null}function mb(n){let e=n?.[Hl]??null;return e||null}function Df(n){return n&&n.hasOwnProperty(kl)?n[kl]:null}var Hl=ft({\u0275prov:ft}),kl=ft({\u0275inj:ft}),He=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(e,t){this._desc=e,this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=yt({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function qf(n){return n&&!!n.\u0275providers}var Xf=ft({\u0275cmp:ft}),Yf=ft({\u0275dir:ft}),Zf=ft({\u0275pipe:ft});var Fo=ft({\u0275fac:ft}),Vr=ft({__NG_ELEMENT_ID__:ft}),mv=ft({__NG_ENV_ID__:ft});function Br(n){return Kf(n,"@Component"),n[Xf]||null}function Jf(n){return Kf(n,"@Directive"),n[Yf]||null}function xv(n){return Kf(n,"@Pipe"),n[Zf]||null}function Kf(n,e){if(n==null)throw new Xe(-919,!1)}function zl(n){return typeof n=="string"?n:n==null?"":String(n)}function Mv(n){return typeof n=="function"?n.name||n.toString():typeof n=="object"&&n!=null&&typeof n.type=="function"?n.type.name||n.type.toString():zl(n)}var bv=ft({ngErrorCode:ft}),gb=ft({ngErrorMessage:ft}),vb=ft({ngTokenPath:ft});function Qf(n,e){return Sv("",-200,e)}function Gl(n,e){throw new Xe(-201,!1)}function Sv(n,e,t){let i=new Xe(e,n);return i[bv]=e,i[gb]=n,t&&(i[vb]=t),i}function yb(n){return n[bv]}var Rf;function Ev(){return Rf}function vn(n){let e=Rf;return Rf=n,e}function eh(n,e,t){let i=Bl(n);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(t&8)return null;if(e!==void 0)return e;Gl(n,"")}var _b={},Pr=_b,xb="__NG_DI_FLAG__",Nf=class{injector;constructor(e){this.injector=e}retrieve(e,t){let i=Or(t)||0;try{return this.injector.get(e,i&8?null:Pr,i)}catch(r){if(Os(r))return r;throw r}}};function Mb(n,e=0){let t=Ll();if(t===void 0)throw new Xe(-203,!1);if(t===null)return eh(n,void 0,e);{let i=bb(e),r=t.retrieve(n,i);if(Os(r)){if(i.optional)return null;throw r}return r}}function ht(n,e=0){return(Ev()||Mb)(Yt(n),e)}function je(n,e){return ht(n,Or(e))}function Or(n){return typeof n>"u"||typeof n=="number"?n:0|(n.optional&&8)|(n.host&&1)|(n.self&&2)|(n.skipSelf&&4)}function bb(n){return{optional:!!(n&8),host:!!(n&1),self:!!(n&2),skipSelf:!!(n&4)}}function Pf(n){let e=[];for(let t=0;t<n.length;t++){let i=Yt(n[t]);if(Array.isArray(i)){if(i.length===0)throw new Xe(900,!1);let r,s=0;for(let o=0;o<i.length;o++){let a=i[o],l=Sb(a);typeof l=="number"?l===-1?r=a.token:s|=l:r=a}e.push(ht(r,s))}else e.push(ht(i))}return e}function Sb(n){return n[xb]}function Lr(n,e){let t=n.hasOwnProperty(Fo);return t?n[Fo]:null}function wv(n,e,t){if(n.length!==e.length)return!1;for(let i=0;i<n.length;i++){let r=n[i],s=e[i];if(t&&(r=t(r),s=t(s)),s!==r)return!1}return!0}function Cv(n){return n.flat(Number.POSITIVE_INFINITY)}function Wl(n,e){n.forEach(t=>Array.isArray(t)?Wl(t,e):e(t))}function th(n,e,t){e>=n.length?n.push(t):n.splice(e,0,t)}function Bo(n,e){return e>=n.length-1?n.pop():n.splice(e,1)[0]}function Tv(n,e,t,i){let r=n.length;if(r==e)n.push(t,i);else if(r===1)n.push(i,n[0]),n[0]=t;else{for(r--,n.push(n[r-1],n[r]);r>e;){let s=r-2;n[r]=n[s],r--}n[e]=t,n[e+1]=i}}function Av(n,e,t){let i=Us(n,e);return i>=0?n[i|1]=t:(i=~i,Tv(n,i,e,t)),i}function jl(n,e){let t=Us(n,e);if(t>=0)return n[t|1]}function Us(n,e){return Eb(n,e,1)}function Eb(n,e,t){let i=0,r=n.length>>t;for(;r!==i;){let s=i+(r-i>>1),o=n[s<<t];if(e===o)return s<<t;o>e?r=s:i=s+1}return~(r<<t)}var ir={},yn=[],Vs=new He(""),nh=new He("",-1),ih=new He(""),ko=class{get(e,t=Pr){if(t===Pr){let r=Sv("",-201);throw r.name="\u0275NotFound",r}return t}};function $l(n){return{\u0275providers:n}}function Iv(n){return $l([{provide:Vs,multi:!0,useValue:n}])}function Dv(...n){return{\u0275providers:rh(!0,n),\u0275fromNgModule:!0}}function rh(n,...e){let t=[],i=new Set,r,s=o=>{t.push(o)};return Wl(e,o=>{let a=o;Ul(a,s,[],i)&&(r||=[],r.push(a))}),r!==void 0&&Rv(r,s),t}function Rv(n,e){for(let t=0;t<n.length;t++){let{ngModule:i,providers:r}=n[t];sh(r,s=>{e(s,i)})}}function Ul(n,e,t,i){if(n=Yt(n),!n)return!1;let r=null,s=Df(n),o=!s&&Br(n);if(!s&&!o){let l=n.ngModule;if(s=Df(l),s)r=l;else return!1}else{if(o&&!o.standalone)return!1;r=n}let a=i.has(r);if(o){if(a)return!1;if(i.add(r),o.dependencies){let l=typeof o.dependencies=="function"?o.dependencies():o.dependencies;for(let c of l)Ul(c,e,t,i)}}else if(s){if(s.imports!=null&&!a){i.add(r);let c;Wl(s.imports,u=>{Ul(u,e,t,i)&&(c||=[],c.push(u))}),c!==void 0&&Rv(c,e)}if(!a){let c=Lr(r)||(()=>new r);e({provide:r,useFactory:c,deps:yn},r),e({provide:ih,useValue:r,multi:!0},r),e({provide:Vs,useValue:()=>ht(r),multi:!0},r)}let l=s.providers;if(l!=null&&!a){let c=n;sh(l,u=>{e(u,c)})}}else return!1;return r!==n&&n.providers!==void 0}function sh(n,e){for(let t of n)qf(t)&&(t=t.\u0275providers),Array.isArray(t)?sh(t,e):e(t)}var wb=ft({provide:String,useValue:ft});function Nv(n){return n!==null&&typeof n=="object"&&wb in n}function Cb(n){return!!(n&&n.useExisting)}function Tb(n){return!!(n&&n.useFactory)}function Fr(n){return typeof n=="function"}function Pv(n){return!!n.useClass}var Ho=new He(""),Fl={},gv={},If;function zo(){return If===void 0&&(If=new ko),If}var Rn=class{},kr=class extends Rn{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(e,t,i,r){super(),this.parent=t,this.source=i,this.scopes=r,Lf(e,o=>this.processProvider(o)),this.records.set(nh,Ls(void 0,this)),r.has("environment")&&this.records.set(Rn,Ls(void 0,this));let s=this.records.get(Ho);s!=null&&typeof s.value=="string"&&this.scopes.add(s.value),this.injectorDefTypes=new Set(this.get(ih,yn,{self:!0}))}retrieve(e,t){let i=Or(t)||0;try{return this.get(e,Pr,i)}catch(r){if(Os(r))return r;throw r}}destroy(){Lo(this),this._destroyed=!0;let e=Ce(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of t)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),Ce(e)}}onDestroy(e){return Lo(this),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){Lo(this);let t=hi(this),i=vn(void 0),r;try{return e()}finally{hi(t),vn(i)}}get(e,t=Pr,i){if(Lo(this),e.hasOwnProperty(mv))return e[mv](this);let r=Or(i),s,o=hi(this),a=vn(void 0);try{if(!(r&4)){let c=this.records.get(e);if(c===void 0){let u=Nb(e)&&Bl(e);u&&this.injectableDefInScope(u)?c=Ls(Of(e),Fl):c=null,this.records.set(e,c)}if(c!=null)return this.hydrate(e,c,r)}let l=r&2?zo():this.parent;return t=r&8&&t===Pr?null:t,l.get(e,t)}catch(l){let c=yb(l);throw c===-200||c===-201?new Xe(c,null):l}finally{vn(a),hi(o)}}resolveInjectorInitializers(){let e=Ce(null),t=hi(this),i=vn(void 0),r;try{let s=this.get(Vs,yn,{self:!0});for(let o of s)o()}finally{hi(t),vn(i),Ce(e)}}toString(){let e=[],t=this.records;for(let i of t.keys())e.push(er(i));return`R3Injector[${e.join(", ")}]`}processProvider(e){e=Yt(e);let t=Fr(e)?e:Yt(e&&e.provide),i=Ib(e);if(!Fr(e)&&e.multi===!0){let r=this.records.get(t);r||(r=Ls(void 0,Fl,!0),r.factory=()=>Pf(r.multi),this.records.set(t,r)),t=e,r.multi.push(e)}this.records.set(t,i)}hydrate(e,t,i){let r=Ce(null);try{if(t.value===gv)throw Qf(er(e));return t.value===Fl&&(t.value=gv,t.value=t.factory(void 0,i)),typeof t.value=="object"&&t.value&&Rb(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{Ce(r)}}injectableDefInScope(e){if(!e.providedIn)return!1;let t=Yt(e.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(e){let t=this._onDestroyHooks.indexOf(e);t!==-1&&this._onDestroyHooks.splice(t,1)}};function Of(n){let e=Bl(n),t=e!==null?e.factory:Lr(n);if(t!==null)return t;if(n instanceof He)throw new Xe(204,!1);if(n instanceof Function)return Ab(n);throw new Xe(204,!1)}function Ab(n){if(n.length>0)throw new Xe(204,!1);let t=mb(n);return t!==null?()=>t.factory(n):()=>new n}function Ib(n){if(Nv(n))return Ls(void 0,n.useValue);{let e=oh(n);return Ls(e,Fl)}}function oh(n,e,t){let i;if(Fr(n)){let r=Yt(n);return Lr(r)||Of(r)}else if(Nv(n))i=()=>Yt(n.useValue);else if(Tb(n))i=()=>n.useFactory(...Pf(n.deps||[]));else if(Cb(n))i=(r,s)=>ht(Yt(n.useExisting),s!==void 0&&s&8?8:void 0);else{let r=Yt(n&&(n.useClass||n.provide));if(Db(n))i=()=>new r(...Pf(n.deps));else return Lr(r)||Of(r)}return i}function Lo(n){if(n.destroyed)throw new Xe(205,!1)}function Ls(n,e,t=!1){return{factory:n,value:e,multi:t?[]:void 0}}function Db(n){return!!n.deps}function Rb(n){return n!==null&&typeof n=="object"&&typeof n.ngOnDestroy=="function"}function Nb(n){return typeof n=="function"||typeof n=="object"&&n.ngMetadataName==="InjectionToken"}function Lf(n,e){for(let t of n)Array.isArray(t)?Lf(t,e):t&&qf(t)?Lf(t.\u0275providers,e):e(t)}function ql(n,e){let t;n instanceof kr?(Lo(n),t=n):t=new Nf(n);let i,r=hi(t),s=vn(void 0);try{return e()}finally{hi(r),vn(s)}}function Ov(){return Ev()!==void 0||Ll()!=null}var Xn=0,we=1,Ne=2,zt=3,Pn=4,On=5,Bs=6,Hs=7,Ft=8,Pi=9,Oi=10,wt=11,zs=12,ah=13,Hr=14,Ln=15,rr=16,zr=17,pi=18,Li=19,lh=20,Ri=21,Xl=22,Go=23,_n=24,Yl=25,Gr=26,Zt=27,Lv=1,ch=6,sr=7,Wo=8,Wr=9,Rt=10;function mi(n){return Array.isArray(n)&&typeof n[Lv]=="object"}function Yn(n){return Array.isArray(n)&&n[Lv]===!0}function uh(n){return(n.flags&4)!==0}function jr(n){return n.componentOffset>-1}function Zl(n){return(n.flags&1)===1}function gi(n){return!!n.template}function Gs(n){return(n[Ne]&512)!==0}function $r(n){return(n[Ne]&256)===256}var dh="svg",Fv="math";function Fn(n){for(;Array.isArray(n);)n=n[Xn];return n}function fh(n,e){return Fn(e[n])}function Zn(n,e){return Fn(e[n.index])}function jo(n,e){return n.data[e]}function Jn(n,e){let t=e[n];return mi(t)?t:t[Xn]}function kv(n){return(n[Ne]&4)===4}function Jl(n){return(n[Ne]&128)===128}function Uv(n){return Yn(n[zt])}function vi(n,e){return e==null?null:n[e]}function hh(n){n[zr]=0}function ph(n){n[Ne]&1024||(n[Ne]|=1024,Jl(n)&&qo(n))}function Vv(n,e){for(;n>0;)e=e[Hr],n--;return e}function $o(n){return!!(n[Ne]&9216||n[_n]?.dirty)}function Kl(n){n[Oi].changeDetectionScheduler?.notify(8),n[Ne]&64&&(n[Ne]|=1024),$o(n)&&qo(n)}function qo(n){n[Oi].changeDetectionScheduler?.notify(0);let e=tr(n);for(;e!==null&&!(e[Ne]&8192||(e[Ne]|=8192,!Jl(e)));)e=tr(e)}function mh(n,e){if($r(n))throw new Xe(911,!1);n[Ri]===null&&(n[Ri]=[]),n[Ri].push(e)}function Bv(n,e){if(n[Ri]===null)return;let t=n[Ri].indexOf(e);t!==-1&&n[Ri].splice(t,1)}function tr(n){let e=n[zt];return Yn(e)?e[zt]:e}function gh(n){return n[Hs]??=[]}function vh(n){return n.cleanup??=[]}function Hv(n,e,t,i){let r=gh(e);r.push(t),n.firstCreatePass&&vh(n).push(i,r.length-1)}var ze={lFrame:ty(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var Ff=!1;function zv(){return ze.lFrame.elementDepthCount}function Gv(){ze.lFrame.elementDepthCount++}function yh(){ze.lFrame.elementDepthCount--}function Wv(){return ze.bindingsEnabled}function jv(){return ze.skipHydrationRootTNode!==null}function _h(n){return ze.skipHydrationRootTNode===n}function xh(){ze.skipHydrationRootTNode=null}function Ke(){return ze.lFrame.lView}function Jt(){return ze.lFrame.tView}function Ct(n){return ze.lFrame.contextLView=n,n[Ft]}function Tt(n){return ze.lFrame.contextLView=null,n}function xn(){let n=Mh();for(;n!==null&&n.type===64;)n=n.parent;return n}function Mh(){return ze.lFrame.currentTNode}function $v(){let n=ze.lFrame,e=n.currentTNode;return n.isParent?e:e.parent}function Ws(n,e){let t=ze.lFrame;t.currentTNode=n,t.isParent=e}function bh(){return ze.lFrame.isParent}function qv(){ze.lFrame.isParent=!1}function Sh(){return Ff}function Eh(n){let e=Ff;return Ff=n,e}function Xv(n){return ze.lFrame.bindingIndex=n}function qr(){return ze.lFrame.bindingIndex++}function Yv(n){let e=ze.lFrame,t=e.bindingIndex;return e.bindingIndex=e.bindingIndex+n,t}function Zv(){return ze.lFrame.inI18n}function Jv(n,e){let t=ze.lFrame;t.bindingIndex=t.bindingRootIndex=n,Ql(e)}function Kv(){return ze.lFrame.currentDirectiveIndex}function Ql(n){ze.lFrame.currentDirectiveIndex=n}function Qv(n){let e=ze.lFrame.currentDirectiveIndex;return e===-1?null:n[e]}function wh(){return ze.lFrame.currentQueryIndex}function ec(n){ze.lFrame.currentQueryIndex=n}function Pb(n){let e=n[we];return e.type===2?e.declTNode:e.type===1?n[On]:null}function Ch(n,e,t){if(t&4){let r=e,s=n;for(;r=r.parent,r===null&&!(t&1);)if(r=Pb(s),r===null||(s=s[Hr],r.type&10))break;if(r===null)return!1;e=r,n=s}let i=ze.lFrame=ey();return i.currentTNode=e,i.lView=n,!0}function tc(n){let e=ey(),t=n[we];ze.lFrame=e,e.currentTNode=t.firstChild,e.lView=n,e.tView=t,e.contextLView=n,e.bindingIndex=t.bindingStartIndex,e.inI18n=!1}function ey(){let n=ze.lFrame,e=n===null?null:n.child;return e===null?ty(n):e}function ty(n){let e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:n,child:null,inI18n:!1};return n!==null&&(n.child=e),e}function ny(){let n=ze.lFrame;return ze.lFrame=n.parent,n.currentTNode=null,n.lView=null,n}var Th=ny;function nc(){let n=ny();n.isParent=!0,n.tView=null,n.selectedIndex=-1,n.contextLView=null,n.elementDepthCount=0,n.currentDirectiveIndex=-1,n.currentNamespace=null,n.bindingRootIndex=-1,n.bindingIndex=-1,n.currentQueryIndex=0}function iy(n){return(ze.lFrame.contextLView=Vv(n,ze.lFrame.contextLView))[Ft]}function or(){return ze.lFrame.selectedIndex}function ar(n){ze.lFrame.selectedIndex=n}function ic(){let n=ze.lFrame;return jo(n.tView,n.selectedIndex)}function kn(){ze.lFrame.currentNamespace=dh}function Xo(){Ob()}function Ob(){ze.lFrame.currentNamespace=null}function ry(){return ze.lFrame.currentNamespace}var sy=!0;function rc(){return sy}function sc(n){sy=n}function kf(n,e=null,t=null,i){let r=oy(n,e,t,i);return r.resolveInjectorInitializers(),r}function oy(n,e=null,t=null,i,r=new Set){let s=[t||yn,Dv(n)];return i=i||(typeof n=="object"?void 0:er(n)),new kr(s,e||zo(),i||null,r)}var nr=class n{static THROW_IF_NOT_FOUND=Pr;static NULL=new ko;static create(e,t){if(Array.isArray(e))return kf({name:""},t,e,"");{let i=e.name??"";return kf({name:i},e.parent,e.providers,i)}}static \u0275prov=yt({token:n,providedIn:"any",factory:()=>ht(nh)});static __NG_ELEMENT_ID__=-1},Un=new He(""),js=(()=>{class n{static __NG_ELEMENT_ID__=Lb;static __NG_ENV_ID__=t=>t}return n})(),Uf=class extends js{_lView;constructor(e){super(),this._lView=e}get destroyed(){return $r(this._lView)}onDestroy(e){let t=this._lView;return mh(t,e),()=>Bv(t,e)}};function Lb(){return new Uf(Ke())}var ay=!1,ly=new He(""),$s=(()=>{class n{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new Oo(!1);debugTaskTracker=je(ly,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new Lt(t=>{t.next(!1),t.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),this.debugTaskTracker?.add(t),t}has(t){return this.pendingTasks.has(t)}remove(t){this.pendingTasks.delete(t),this.debugTaskTracker?.remove(t),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=yt({token:n,providedIn:"root",factory:()=>new n})}return n})(),Vf=class extends qn{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(e=!1){super(),this.__isAsync=e,Ov()&&(this.destroyRef=je(js,{optional:!0})??void 0,this.pendingTasks=je($s,{optional:!0})??void 0)}emit(e){let t=Ce(null);try{super.next(e)}finally{Ce(t)}}subscribe(e,t,i){let r=e,s=t||(()=>null),o=i;if(e&&typeof e=="object"){let l=e;r=l.next?.bind(l),s=l.error?.bind(l),o=l.complete?.bind(l)}this.__isAsync&&(s=this.wrapInTimeout(s),r&&(r=this.wrapInTimeout(r)),o&&(o=this.wrapInTimeout(o)));let a=super.subscribe({next:r,error:s,complete:o});return e instanceof ln&&e.add(a),a}wrapInTimeout(e){return t=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{e(t)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},vt=Vf;function Vl(...n){}function Ah(n){let e,t;function i(){n=Vl;try{t!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(t),e!==void 0&&clearTimeout(e)}catch{}}return e=setTimeout(()=>{n(),i()}),typeof requestAnimationFrame=="function"&&(t=requestAnimationFrame(()=>{n(),i()})),()=>i()}function cy(n){return queueMicrotask(()=>n()),()=>{n=Vl}}var Ih="isAngularZone",Uo=Ih+"_ID",Fb=0,Nn=class n{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new vt(!1);onMicrotaskEmpty=new vt(!1);onStable=new vt(!1);onError=new vt(!1);constructor(e){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:s=ay}=e;if(typeof Zone>"u")throw new Xe(908,!1);Zone.assertZonePatched();let o=this;o._nesting=0,o._outer=o._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(o._inner=o._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(o._inner=o._inner.fork(Zone.longStackTraceZoneSpec)),o.shouldCoalesceEventChangeDetection=!r&&i,o.shouldCoalesceRunChangeDetection=r,o.callbackScheduled=!1,o.scheduleInRootZone=s,Vb(o)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Ih)===!0}static assertInAngularZone(){if(!n.isInAngularZone())throw new Xe(909,!1)}static assertNotInAngularZone(){if(n.isInAngularZone())throw new Xe(909,!1)}run(e,t,i){return this._inner.run(e,t,i)}runTask(e,t,i,r){let s=this._inner,o=s.scheduleEventTask("NgZoneEvent: "+r,e,kb,Vl,Vl);try{return s.runTask(o,t,i)}finally{s.cancelTask(o)}}runGuarded(e,t,i){return this._inner.runGuarded(e,t,i)}runOutsideAngular(e){return this._outer.run(e)}},kb={};function Dh(n){if(n._nesting==0&&!n.hasPendingMicrotasks&&!n.isStable)try{n._nesting++,n.onMicrotaskEmpty.emit(null)}finally{if(n._nesting--,!n.hasPendingMicrotasks)try{n.runOutsideAngular(()=>n.onStable.emit(null))}finally{n.isStable=!0}}}function Ub(n){if(n.isCheckStableRunning||n.callbackScheduled)return;n.callbackScheduled=!0;function e(){Ah(()=>{n.callbackScheduled=!1,Bf(n),n.isCheckStableRunning=!0,Dh(n),n.isCheckStableRunning=!1})}n.scheduleInRootZone?Zone.root.run(()=>{e()}):n._outer.run(()=>{e()}),Bf(n)}function Vb(n){let e=()=>{Ub(n)},t=Fb++;n._inner=n._inner.fork({name:"angular",properties:{[Ih]:!0,[Uo]:t,[Uo+t]:!0},onInvokeTask:(i,r,s,o,a,l)=>{if(Bb(l))return i.invokeTask(s,o,a,l);try{return vv(n),i.invokeTask(s,o,a,l)}finally{(n.shouldCoalesceEventChangeDetection&&o.type==="eventTask"||n.shouldCoalesceRunChangeDetection)&&e(),yv(n)}},onInvoke:(i,r,s,o,a,l,c)=>{try{return vv(n),i.invoke(s,o,a,l,c)}finally{n.shouldCoalesceRunChangeDetection&&!n.callbackScheduled&&!Hb(l)&&e(),yv(n)}},onHasTask:(i,r,s,o)=>{i.hasTask(s,o),r===s&&(o.change=="microTask"?(n._hasPendingMicrotasks=o.microTask,Bf(n),Dh(n)):o.change=="macroTask"&&(n.hasPendingMacrotasks=o.macroTask))},onHandleError:(i,r,s,o)=>(i.handleError(s,o),n.runOutsideAngular(()=>n.onError.emit(o)),!1)})}function Bf(n){n._hasPendingMicrotasks||(n.shouldCoalesceEventChangeDetection||n.shouldCoalesceRunChangeDetection)&&n.callbackScheduled===!0?n.hasPendingMicrotasks=!0:n.hasPendingMicrotasks=!1}function vv(n){n._nesting++,n.isStable&&(n.isStable=!1,n.onUnstable.emit(null))}function yv(n){n._nesting--,Dh(n)}var Vo=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new vt;onMicrotaskEmpty=new vt;onStable=new vt;onError=new vt;run(e,t,i){return e.apply(t,i)}runGuarded(e,t,i){return e.apply(t,i)}runOutsideAngular(e){return e()}runTask(e,t,i,r){return e.apply(t,i)}};function Bb(n){return uy(n,"__ignore_ng_zone__")}function Hb(n){return uy(n,"__scheduler_tick__")}function uy(n,e){return!Array.isArray(n)||n.length!==1?!1:n[0]?.data?.[e]===!0}var Ni=class{_console=console;handleError(e){this._console.error("ERROR",e)}},Xr=new He("",{factory:()=>{let n=je(Nn),e=je(Rn),t;return i=>{n.runOutsideAngular(()=>{e.destroyed&&!t?setTimeout(()=>{throw i}):(t??=e.get(Ni),t.handleError(i))})}}}),dy={provide:Vs,useValue:()=>{let n=je(Ni,{optional:!0})},multi:!0},zb=new He("",{factory:()=>{let n=je(Un).defaultView;if(!n)return;let e=je(Xr),t=s=>{e(s.reason),s.preventDefault()},i=s=>{s.error?e(s.error):e(new Error(s.message,{cause:s})),s.preventDefault()},r=()=>{n.addEventListener("unhandledrejection",t),n.addEventListener("error",i)};typeof Zone<"u"?Zone.root.run(r):r(),je(js).onDestroy(()=>{n.removeEventListener("error",i),n.removeEventListener("unhandledrejection",t)})}});function Rh(){return $l([Iv(()=>{je(zb)})])}function At(n,e){let[t,i,r]=gf(n,e?.equal),s=t,o=s[Dn];return s.set=i,s.update=r,s.asReadonly=fy.bind(s),s}function fy(){let n=this[Dn];if(n.readonlyFn===void 0){let e=()=>this();e[Dn]=n,n.readonlyFn=e}return n.readonlyFn}var Fs=class{},Yo=new He("",{factory:()=>!0});var Nh=new He("");var Ph=(()=>{class n{static \u0275prov=yt({token:n,providedIn:"root",factory:()=>new Hf})}return n})(),Hf=class{dirtyEffectCount=0;queues=new Map;add(e){this.enqueue(e),this.schedule(e)}schedule(e){e.dirty&&this.dirtyEffectCount++}remove(e){let t=e.zone,i=this.queues.get(t);i.has(e)&&(i.delete(e),e.dirty&&this.dirtyEffectCount--)}enqueue(e){let t=e.zone;this.queues.has(t)||this.queues.set(t,new Set);let i=this.queues.get(t);i.has(e)||i.add(e)}flush(){for(;this.dirtyEffectCount>0;){let e=!1;for(let[t,i]of this.queues)t===null?e||=this.flushQueue(i):e||=t.run(()=>this.flushQueue(i));e||(this.dirtyEffectCount=0)}}flushQueue(e){let t=!1;for(let i of e)i.dirty&&(this.dirtyEffectCount--,t=!0,i.run());return t}},zf=class{[Dn];constructor(e){this[Dn]=e}destroy(){this[Dn].destroy()}};function Fi(n){return yf(n)}function oa(n){return{toString:n}.toString()}function Qb(n){return typeof n=="function"}function Hy(n,e,t,i){e!==null?e.applyValueToInputSignal(e,i):n[t]=i}var fc=class{previousValue;currentValue;firstChange;constructor(e,t,i){this.previousValue=e,this.currentValue=t,this.firstChange=i}isFirstChange(){return this.firstChange}},aa=(()=>{let n=()=>zy;return n.ngInherit=!0,n})();function zy(n){return n.type.prototype.ngOnChanges&&(n.setInput=tS),eS}function eS(){let n=Wy(this),e=n?.current;if(e){let t=n.previous;if(t===ir)n.previous=e;else for(let i in e)t[i]=e[i];n.current=null,this.ngOnChanges(e)}}function tS(n,e,t,i,r){let s=this.declaredInputs[i],o=Wy(n)||nS(n,{previous:ir,current:null}),a=o.current||(o.current={}),l=o.previous,c=l[s];a[s]=new fc(c&&c.currentValue,t,l===ir),Hy(n,e,r,t)}var Gy="__ngSimpleChanges__";function Wy(n){return n[Gy]||null}function nS(n,e){return n[Gy]=e}var hy=[];var pt=function(n,e=null,t){for(let i=0;i<hy.length;i++){let r=hy[i];r(n,e,t)}},it=(function(n){return n[n.TemplateCreateStart=0]="TemplateCreateStart",n[n.TemplateCreateEnd=1]="TemplateCreateEnd",n[n.TemplateUpdateStart=2]="TemplateUpdateStart",n[n.TemplateUpdateEnd=3]="TemplateUpdateEnd",n[n.LifecycleHookStart=4]="LifecycleHookStart",n[n.LifecycleHookEnd=5]="LifecycleHookEnd",n[n.OutputStart=6]="OutputStart",n[n.OutputEnd=7]="OutputEnd",n[n.BootstrapApplicationStart=8]="BootstrapApplicationStart",n[n.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",n[n.BootstrapComponentStart=10]="BootstrapComponentStart",n[n.BootstrapComponentEnd=11]="BootstrapComponentEnd",n[n.ChangeDetectionStart=12]="ChangeDetectionStart",n[n.ChangeDetectionEnd=13]="ChangeDetectionEnd",n[n.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",n[n.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",n[n.AfterRenderHooksStart=16]="AfterRenderHooksStart",n[n.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",n[n.ComponentStart=18]="ComponentStart",n[n.ComponentEnd=19]="ComponentEnd",n[n.DeferBlockStateStart=20]="DeferBlockStateStart",n[n.DeferBlockStateEnd=21]="DeferBlockStateEnd",n[n.DynamicComponentStart=22]="DynamicComponentStart",n[n.DynamicComponentEnd=23]="DynamicComponentEnd",n[n.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",n[n.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",n})(it||{});function iS(n,e,t){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:s}=e.type.prototype;if(i){let o=zy(e);(t.preOrderHooks??=[]).push(n,o),(t.preOrderCheckHooks??=[]).push(n,o)}r&&(t.preOrderHooks??=[]).push(0-n,r),s&&((t.preOrderHooks??=[]).push(n,s),(t.preOrderCheckHooks??=[]).push(n,s))}function rS(n,e){for(let t=e.directiveStart,i=e.directiveEnd;t<i;t++){let s=n.data[t].type.prototype,{ngAfterContentInit:o,ngAfterContentChecked:a,ngAfterViewInit:l,ngAfterViewChecked:c,ngOnDestroy:u}=s;o&&(n.contentHooks??=[]).push(-t,o),a&&((n.contentHooks??=[]).push(t,a),(n.contentCheckHooks??=[]).push(t,a)),l&&(n.viewHooks??=[]).push(-t,l),c&&((n.viewHooks??=[]).push(t,c),(n.viewCheckHooks??=[]).push(t,c)),u!=null&&(n.destroyHooks??=[]).push(t,u)}}function ac(n,e,t){jy(n,e,3,t)}function lc(n,e,t,i){(n[Ne]&3)===t&&jy(n,e,t,i)}function Oh(n,e){let t=n[Ne];(t&3)===e&&(t&=16383,t+=1,n[Ne]=t)}function jy(n,e,t,i){let r=i!==void 0?n[zr]&65535:0,s=i??-1,o=e.length-1,a=0;for(let l=r;l<o;l++)if(typeof e[l+1]=="number"){if(a=e[l],i!=null&&a>=i)break}else e[l]<0&&(n[zr]+=65536),(a<s||s==-1)&&(sS(n,t,e,l),n[zr]=(n[zr]&4294901760)+l+2),l++}function py(n,e){pt(it.LifecycleHookStart,n,e);let t=Ce(null);try{e.call(n)}finally{Ce(t),pt(it.LifecycleHookEnd,n,e)}}function sS(n,e,t,i){let r=t[i]<0,s=t[i+1],o=r?-t[i]:t[i],a=n[o];r?n[Ne]>>14<n[zr]>>16&&(n[Ne]&3)===e&&(n[Ne]+=16384,py(a,s)):py(a,s)}var Xs=-1,Zr=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(e,t,i,r){this.factory=e,this.name=r,this.canSeeViewProviders=t,this.injectImpl=i}};function oS(n){return(n.flags&8)!==0}function aS(n){return(n.flags&16)!==0}function lS(n,e,t){let i=0;for(;i<t.length;){let r=t[i];if(typeof r=="number"){if(r!==0)break;i++;let s=t[i++],o=t[i++],a=t[i++];n.setAttribute(e,o,a,s)}else{let s=r,o=t[++i];uS(s)?n.setProperty(e,s,o):n.setAttribute(e,s,o),i++}}return i}function cS(n){return n===3||n===4||n===6}function uS(n){return n.charCodeAt(0)===64}function Ys(n,e){if(!(e===null||e.length===0))if(n===null||n.length===0)n=e.slice();else{let t=-1;for(let i=0;i<e.length;i++){let r=e[i];typeof r=="number"?t=r:t===0||(t===-1||t===2?my(n,t,r,null,e[++i]):my(n,t,r,null,null))}}return n}function my(n,e,t,i,r){let s=0,o=n.length;if(e===-1)o=-1;else for(;s<n.length;){let a=n[s++];if(typeof a=="number"){if(a===e){o=-1;break}else if(a>e){o=s-1;break}}}for(;s<n.length;){let a=n[s];if(typeof a=="number")break;if(a===t){r!==null&&(n[s+1]=r);return}s++,r!==null&&s++}o!==-1&&(n.splice(o,0,e),s=o+1),n.splice(s++,0,t),r!==null&&n.splice(s++,0,r)}function $y(n){return n!==Xs}function hc(n){return n&32767}function dS(n){return n>>16}function pc(n,e){let t=dS(n),i=e;for(;t>0;)i=i[Hr],t--;return i}var Wh=!0;function gy(n){let e=Wh;return Wh=n,e}var fS=256,qy=fS-1,Xy=5,hS=0,yi={};function pS(n,e,t){let i;typeof t=="string"?i=t.charCodeAt(0)||0:t.hasOwnProperty(Vr)&&(i=t[Vr]),i==null&&(i=t[Vr]=hS++);let r=i&qy,s=1<<r;e.data[n+(r>>Xy)]|=s}function mc(n,e){let t=Yy(n,e);if(t!==-1)return t;let i=e[we];i.firstCreatePass&&(n.injectorIndex=e.length,Lh(i.data,n),Lh(e,null),Lh(i.blueprint,null));let r=_p(n,e),s=n.injectorIndex;if($y(r)){let o=hc(r),a=pc(r,e),l=a[we].data;for(let c=0;c<8;c++)e[s+c]=a[o+c]|l[o+c]}return e[s+8]=r,s}function Lh(n,e){n.push(0,0,0,0,0,0,0,0,e)}function Yy(n,e){return n.injectorIndex===-1||n.parent&&n.parent.injectorIndex===n.injectorIndex||e[n.injectorIndex+8]===null?-1:n.injectorIndex}function _p(n,e){if(n.parent&&n.parent.injectorIndex!==-1)return n.parent.injectorIndex;let t=0,i=null,r=e;for(;r!==null;){if(i=e_(r),i===null)return Xs;if(t++,r=r[Hr],i.injectorIndex!==-1)return i.injectorIndex|t<<16}return Xs}function jh(n,e,t){pS(n,e,t)}function Zy(n,e,t){if(t&8||n!==void 0)return n;Gl(e,"NodeInjector")}function Jy(n,e,t,i){if(t&8&&i===void 0&&(i=null),(t&3)===0){let r=n[Pi],s=vn(void 0);try{return r?r.get(e,i,t&8):eh(e,i,t&8)}finally{vn(s)}}return Zy(i,e,t)}function Ky(n,e,t,i=0,r){if(n!==null){if(e[Ne]&2048&&!(i&2)){let o=yS(n,e,t,i,yi);if(o!==yi)return o}let s=Qy(n,e,t,i,yi);if(s!==yi)return s}return Jy(e,t,i,r)}function Qy(n,e,t,i,r){let s=gS(t);if(typeof s=="function"){if(!Ch(e,n,i))return i&1?Zy(r,t,i):Jy(e,t,i,r);try{let o;if(o=s(i),o==null&&!(i&8))Gl(t);else return o}finally{Th()}}else if(typeof s=="number"){let o=null,a=Yy(n,e),l=Xs,c=i&1?e[Ln][On]:null;for((a===-1||i&4)&&(l=a===-1?_p(n,e):e[a+8],l===Xs||!yy(i,!1)?a=-1:(o=e[we],a=hc(l),e=pc(l,e)));a!==-1;){let u=e[we];if(vy(s,a,u.data)){let d=mS(a,e,t,o,i,c);if(d!==yi)return d}l=e[a+8],l!==Xs&&yy(i,e[we].data[a+8]===c)&&vy(s,a,e)?(o=u,a=hc(l),e=pc(l,e)):a=-1}}return r}function mS(n,e,t,i,r,s){let o=e[we],a=o.data[n+8],l=i==null?jr(a)&&Wh:i!=o&&(a.type&3)!==0,c=r&1&&s===a,u=cc(a,o,t,l,c);return u!==null?Ko(e,o,u,a,r):yi}function cc(n,e,t,i,r){let s=n.providerIndexes,o=e.data,a=s&1048575,l=n.directiveStart,c=n.directiveEnd,u=s>>20,d=i?a:a+u,f=r?a+u:c;for(let h=d;h<f;h++){let v=o[h];if(h<l&&t===v||h>=l&&v.type===t)return h}if(r){let h=o[l];if(h&&gi(h)&&h.type===t)return l}return null}function Ko(n,e,t,i,r){let s=n[t],o=e.data;if(s instanceof Zr){let a=s;if(a.resolving){let h=Mv(o[t]);throw Qf(h)}let l=gy(a.canSeeViewProviders);a.resolving=!0;let c=o[t].type||o[t],u,d=a.injectImpl?vn(a.injectImpl):null,f=Ch(n,i,0);try{s=n[t]=a.factory(void 0,r,o,n,i),e.firstCreatePass&&t>=i.directiveStart&&iS(t,o[t],e)}finally{d!==null&&vn(d),gy(l),a.resolving=!1,Th()}}return s}function gS(n){if(typeof n=="string")return n.charCodeAt(0)||0;let e=n.hasOwnProperty(Vr)?n[Vr]:void 0;return typeof e=="number"?e>=0?e&qy:vS:e}function vy(n,e,t){let i=1<<n;return!!(t[e+(n>>Xy)]&i)}function yy(n,e){return!(n&2)&&!(n&1&&e)}var Yr=class{_tNode;_lView;constructor(e,t){this._tNode=e,this._lView=t}get(e,t,i){return Ky(this._tNode,this._lView,e,Or(i),t)}};function vS(){return new Yr(xn(),Ke())}function xp(n){return oa(()=>{let e=n.prototype.constructor,t=e[Fo]||$h(e),i=Object.prototype,r=Object.getPrototypeOf(n.prototype).constructor;for(;r&&r!==i;){let s=r[Fo]||$h(r);if(s&&s!==t)return s;r=Object.getPrototypeOf(r)}return s=>new s})}function $h(n){return $f(n)?()=>{let e=$h(Yt(n));return e&&e()}:Lr(n)}function yS(n,e,t,i,r){let s=n,o=e;for(;s!==null&&o!==null&&o[Ne]&2048&&!Gs(o);){let a=Qy(s,o,t,i|2,yi);if(a!==yi)return a;let l=s.parent;if(!l){let c=o[lh];if(c){let u=c.get(t,yi,i);if(u!==yi)return u}l=e_(o),o=o[Hr]}s=l}return r}function e_(n){let e=n[we],t=e.type;return t===2?e.declTNode:t===1?n[On]:null}function _S(){return Qs(xn(),Ke())}function Qs(n,e){return new lr(Zn(n,e))}var lr=(()=>{class n{nativeElement;constructor(t){this.nativeElement=t}static __NG_ELEMENT_ID__=_S}return n})();function xS(n){return n instanceof lr?n.nativeElement:n}function MS(){return this._results[Symbol.iterator]()}var gc=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new qn}constructor(e=!1){this._emitDistinctChangesOnly=e}get(e){return this._results[e]}map(e){return this._results.map(e)}filter(e){return this._results.filter(e)}find(e){return this._results.find(e)}reduce(e,t){return this._results.reduce(e,t)}forEach(e){this._results.forEach(e)}some(e){return this._results.some(e)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(e,t){this.dirty=!1;let i=Cv(e);(this._changesDetected=!wv(this._results,i,t))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(e){this._onDirty=e}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=MS};function t_(n){return(n.flags&128)===128}var Mp=(function(n){return n[n.OnPush=0]="OnPush",n[n.Default=1]="Default",n})(Mp||{}),n_=new Map,bS=0;function SS(){return bS++}function ES(n){n_.set(n[Li],n)}function qh(n){n_.delete(n[Li])}var _y="__ngContext__";function Zs(n,e){mi(e)?(n[_y]=e[Li],ES(e)):n[_y]=e}function i_(n){return s_(n[zs])}function r_(n){return s_(n[Pn])}function s_(n){for(;n!==null&&!Yn(n);)n=n[Pn];return n}var wS;function bp(n){wS=n}var wc=new He("",{factory:()=>CS}),CS="ng";var Cc=new He(""),la=new He("",{providedIn:"platform",factory:()=>"unknown"});var Tc=new He("",{factory:()=>je(Un).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var o_="r";var a_="di";var l_=!1,c_=new He("",{factory:()=>l_});var TS=(n,e,t,i)=>{};function AS(n,e,t,i){TS(n,e,t,i)}function Sp(n){return(n.flags&32)===32}var IS=()=>null;function u_(n,e,t=!1){return IS(n,e,t)}function d_(n,e){let t=n.contentQueries;if(t!==null){let i=Ce(null);try{for(let r=0;r<t.length;r+=2){let s=t[r],o=t[r+1];if(o!==-1){let a=n.data[o];ec(s),a.contentQueries(2,e[o],o)}}}finally{Ce(i)}}}function Xh(n,e,t){ec(0);let i=Ce(null);try{e(n,t)}finally{Ce(i)}}function f_(n,e,t){if(uh(e)){let i=Ce(null);try{let r=e.directiveStart,s=e.directiveEnd;for(let o=r;o<s;o++){let a=n.data[o];if(a.contentQueries){let l=t[o];a.contentQueries(1,l,o)}}}finally{Ce(i)}}}var Qn=(function(n){return n[n.Emulated=0]="Emulated",n[n.None=2]="None",n[n.ShadowDom=3]="ShadowDom",n[n.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",n})(Qn||{});var Yh=class{changingThisBreaksApplicationSecurity;constructor(e){this.changingThisBreaksApplicationSecurity=e}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Gf})`}};function h_(n){return n instanceof Yh?n.changingThisBreaksApplicationSecurity:n}function DS(n,e){return n.createText(e)}function RS(n,e,t){n.setValue(e,t)}function p_(n,e,t){return n.createElement(e,t)}function vc(n,e,t,i,r){n.insertBefore(e,t,i,r)}function m_(n,e,t){n.appendChild(e,t)}function xy(n,e,t,i,r){i!==null?vc(n,e,t,i,r):m_(n,e,t)}function g_(n,e,t,i){n.removeChild(null,e,t,i)}function NS(n,e,t){n.setAttribute(e,"style",t)}function PS(n,e,t){t===""?n.removeAttribute(e,"class"):n.setAttribute(e,"class",t)}function v_(n,e,t){let{mergedAttrs:i,classes:r,styles:s}=t;i!==null&&lS(n,e,i),r!==null&&PS(n,e,r),s!==null&&NS(n,e,s)}function OS(n,e,t){let i=n.length;for(;;){let r=n.indexOf(e,t);if(r===-1)return r;if(r===0||n.charCodeAt(r-1)<=32){let s=e.length;if(r+s===i||n.charCodeAt(r+s)<=32)return r}t=r+1}}var y_="ng-template";function LS(n,e,t,i){let r=0;if(i){for(;r<e.length&&typeof e[r]=="string";r+=2)if(e[r]==="class"&&OS(e[r+1].toLowerCase(),t,0)!==-1)return!0}else if(Ep(n))return!1;if(r=e.indexOf(1,r),r>-1){let s;for(;++r<e.length&&typeof(s=e[r])=="string";)if(s.toLowerCase()===t)return!0}return!1}function Ep(n){return n.type===4&&n.value!==y_}function FS(n,e,t){let i=n.type===4&&!t?y_:n.value;return e===i}function kS(n,e,t){let i=4,r=n.attrs,s=r!==null?BS(r):0,o=!1;for(let a=0;a<e.length;a++){let l=e[a];if(typeof l=="number"){if(!o&&!Kn(i)&&!Kn(l))return!1;if(o&&Kn(l))continue;o=!1,i=l|i&1;continue}if(!o)if(i&4){if(i=2|i&1,l!==""&&!FS(n,l,t)||l===""&&e.length===1){if(Kn(i))return!1;o=!0}}else if(i&8){if(r===null||!LS(n,r,l,t)){if(Kn(i))return!1;o=!0}}else{let c=e[++a],u=US(l,r,Ep(n),t);if(u===-1){if(Kn(i))return!1;o=!0;continue}if(c!==""){let d;if(u>s?d="":d=r[u+1].toLowerCase(),i&2&&c!==d){if(Kn(i))return!1;o=!0}}}}return Kn(i)||o}function Kn(n){return(n&1)===0}function US(n,e,t,i){if(e===null)return-1;let r=0;if(i||!t){let s=!1;for(;r<e.length;){let o=e[r];if(o===n)return r;if(o===3||o===6)s=!0;else if(o===1||o===2){let a=e[++r];for(;typeof a=="string";)a=e[++r];continue}else{if(o===4)break;if(o===0){r+=4;continue}}r+=s?1:2}return-1}else return HS(e,n)}function VS(n,e,t=!1){for(let i=0;i<e.length;i++)if(kS(n,e[i],t))return!0;return!1}function BS(n){for(let e=0;e<n.length;e++){let t=n[e];if(cS(t))return e}return n.length}function HS(n,e){let t=n.indexOf(4);if(t>-1)for(t++;t<n.length;){let i=n[t];if(typeof i=="number")return-1;if(i===e)return t;t++}return-1}function My(n,e){return n?":not("+e.trim()+")":e}function zS(n){let e=n[0],t=1,i=2,r="",s=!1;for(;t<n.length;){let o=n[t];if(typeof o=="string")if(i&2){let a=n[++t];r+="["+o+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+o:i&4&&(r+=" "+o);else r!==""&&!Kn(o)&&(e+=My(s,r),r=""),i=o,s=s||!Kn(i);t++}return r!==""&&(e+=My(s,r)),e}function GS(n){return n.map(zS).join(",")}function WS(n){let e=[],t=[],i=1,r=2;for(;i<n.length;){let s=n[i];if(typeof s=="string")r===2?s!==""&&e.push(s,n[++i]):r===8&&t.push(s);else{if(!Kn(r))break;r=s}i++}return t.length&&e.push(1,...t),e}var Ui={};function wp(n,e,t,i,r,s,o,a,l,c,u){let d=Zt+i,f=d+r,h=jS(d,f),v=typeof c=="function"?c():c;return h[we]={type:n,blueprint:h,template:t,queries:null,viewQuery:a,declTNode:e,data:h.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:f,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof s=="function"?s():s,pipeRegistry:typeof o=="function"?o():o,firstChild:null,schemas:l,consts:v,incompleteFirstPass:!1,ssrId:u}}function jS(n,e){let t=[];for(let i=0;i<e;i++)t.push(i<n?null:Ui);return t}function $S(n){let e=n.tView;return e===null||e.incompleteFirstPass?n.tView=wp(1,null,n.template,n.decls,n.vars,n.directiveDefs,n.pipeDefs,n.viewQuery,n.schemas,n.consts,n.id):e}function Cp(n,e,t,i,r,s,o,a,l,c,u){let d=e.blueprint.slice();return d[Xn]=r,d[Ne]=i|4|128|8|64|1024,(c!==null||n&&n[Ne]&2048)&&(d[Ne]|=2048),hh(d),d[zt]=d[Hr]=n,d[Ft]=t,d[Oi]=o||n&&n[Oi],d[wt]=a||n&&n[wt],d[Pi]=l||n&&n[Pi]||null,d[On]=s,d[Li]=SS(),d[Bs]=u,d[lh]=c,d[Ln]=e.type==2?n[Ln]:d,d}function qS(n,e,t){let i=Zn(e,n),r=$S(t),s=n[Oi].rendererFactory,o=Tp(n,Cp(n,r,null,__(t),i,e,null,s.createRenderer(i,t),null,null,null));return n[e.index]=o}function __(n){let e=16;return n.signals?e=4096:n.onPush&&(e=64),e}function x_(n,e,t,i){if(t===0)return-1;let r=e.length;for(let s=0;s<t;s++)e.push(i),n.blueprint.push(i),n.data.push(null);return r}function Tp(n,e){return n[zs]?n[ah][Pn]=e:n[zs]=e,n[ah]=e,e}function qe(n=1){M_(Jt(),Ke(),or()+n,!1)}function M_(n,e,t,i){if(!i)if((e[Ne]&3)===3){let s=n.preOrderCheckHooks;s!==null&&ac(e,s,t)}else{let s=n.preOrderHooks;s!==null&&lc(e,s,0,t)}ar(t)}var Ac=(function(n){return n[n.None=0]="None",n[n.SignalBased=1]="SignalBased",n[n.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",n})(Ac||{});function Zh(n,e,t,i){let r=Ce(null);try{let[s,o,a]=n.inputs[t],l=null;(o&Ac.SignalBased)!==0&&(l=e[s][Dn]),l!==null&&l.transformFn!==void 0?i=l.transformFn(i):a!==null&&(i=a.call(e,i)),n.setInput!==null?n.setInput(e,l,i,t,s):Hy(e,l,s,i)}finally{Ce(r)}}var ki=(function(n){return n[n.Important=1]="Important",n[n.DashCase=2]="DashCase",n})(ki||{}),XS;function Ap(n,e){return XS(n,e)}var Jr=new Set,Ip=(function(n){return n[n.CHANGE_DETECTION=0]="CHANGE_DETECTION",n[n.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",n})(Ip||{}),ca=new He(""),by=new Set;function eo(n){by.has(n)||(by.add(n),performance?.mark?.("mark_feature_usage",{detail:{feature:n}}))}var b_=(()=>{class n{impl=null;execute(){this.impl?.execute()}static \u0275prov=yt({token:n,providedIn:"root",factory:()=>new n})}return n})();var S_=new He("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:je(Rn)})});function E_(n,e,t){let i=n.get(S_);if(Array.isArray(e))for(let r of e)i.queue.add(r),t?.detachedLeaveAnimationFns?.push(r);else i.queue.add(e),t?.detachedLeaveAnimationFns?.push(e);i.scheduler&&i.scheduler(n)}function YS(n,e){let t=n.get(S_);if(e.detachedLeaveAnimationFns){for(let i of e.detachedLeaveAnimationFns)t.queue.delete(i);e.detachedLeaveAnimationFns=void 0}}function ZS(n,e){for(let[t,i]of e)E_(n,i.animateFns)}function Sy(n,e,t,i){let r=n?.[Gr]?.enter;e!==null&&r&&r.has(t.index)&&ZS(i,r)}function qs(n,e,t,i,r,s,o,a){if(r!=null){let l,c=!1;Yn(r)?l=r:mi(r)&&(c=!0,r=r[Xn]);let u=Fn(r);n===0&&i!==null?(Sy(a,i,s,t),o==null?m_(e,i,u):vc(e,i,u,o||null,!0)):n===1&&i!==null?(Sy(a,i,s,t),vc(e,i,u,o||null,!0)):n===2?Ey(a,s,t,d=>{g_(e,u,c,d)}):n===3&&Ey(a,s,t,()=>{e.destroyNode(u)}),l!=null&&cE(e,n,t,l,s,i,o)}}function JS(n,e){w_(n,e),e[Xn]=null,e[On]=null}function KS(n,e,t,i,r,s){i[Xn]=r,i[On]=e,Dc(n,i,t,1,r,s)}function w_(n,e){e[Oi].changeDetectionScheduler?.notify(9),Dc(n,e,e[wt],2,null,null)}function QS(n){let e=n[zs];if(!e)return Fh(n[we],n);for(;e;){let t=null;if(mi(e))t=e[zs];else{let i=e[Rt];i&&(t=i)}if(!t){for(;e&&!e[Pn]&&e!==n;)mi(e)&&Fh(e[we],e),e=e[zt];e===null&&(e=n),mi(e)&&Fh(e[we],e),t=e&&e[Pn]}e=t}}function Dp(n,e){let t=n[Wr],i=t.indexOf(e);t.splice(i,1)}function Ic(n,e){if($r(e))return;let t=e[wt];t.destroyNode&&Dc(n,e,t,3,null,null),QS(e)}function Fh(n,e){if($r(e))return;let t=Ce(null);try{e[Ne]&=-129,e[Ne]|=256,e[_n]&&ml(e[_n]),nE(n,e),tE(n,e),e[we].type===1&&e[wt].destroy();let i=e[rr];if(i!==null&&Yn(e[zt])){i!==e[zt]&&Dp(i,e);let r=e[pi];r!==null&&r.detachView(n)}qh(e)}finally{Ce(t)}}function Ey(n,e,t,i){let r=n?.[Gr];if(r==null||r.leave==null||!r.leave.has(e.index))return i(!1);n&&Jr.add(n[Li]),E_(t,()=>{if(r.leave&&r.leave.has(e.index)){let o=r.leave.get(e.index),a=[];if(o){for(let l=0;l<o.animateFns.length;l++){let c=o.animateFns[l],{promise:u}=c();a.push(u)}r.detachedLeaveAnimationFns=void 0}r.running=Promise.allSettled(a),eE(n,i)}else n&&Jr.delete(n[Li]),i(!1)},r)}function eE(n,e){let t=n[Gr]?.running;if(t){t.then(()=>{n[Gr].running=void 0,Jr.delete(n[Li]),e(!0)});return}e(!1)}function tE(n,e){let t=n.cleanup,i=e[Hs];if(t!==null)for(let o=0;o<t.length-1;o+=2)if(typeof t[o]=="string"){let a=t[o+3];a>=0?i[a]():i[-a].unsubscribe(),o+=2}else{let a=i[t[o+1]];t[o].call(a)}i!==null&&(e[Hs]=null);let r=e[Ri];if(r!==null){e[Ri]=null;for(let o=0;o<r.length;o++){let a=r[o];a()}}let s=e[Go];if(s!==null){e[Go]=null;for(let o of s)o.destroy()}}function nE(n,e){let t;if(n!=null&&(t=n.destroyHooks)!=null)for(let i=0;i<t.length;i+=2){let r=e[t[i]];if(!(r instanceof Zr)){let s=t[i+1];if(Array.isArray(s))for(let o=0;o<s.length;o+=2){let a=r[s[o]],l=s[o+1];pt(it.LifecycleHookStart,a,l);try{l.call(a)}finally{pt(it.LifecycleHookEnd,a,l)}}else{pt(it.LifecycleHookStart,r,s);try{s.call(r)}finally{pt(it.LifecycleHookEnd,r,s)}}}}}function iE(n,e,t){return rE(n,e.parent,t)}function rE(n,e,t){let i=e;for(;i!==null&&i.type&168;)e=i,i=e.parent;if(i===null)return t[Xn];if(jr(i)){let{encapsulation:r}=n.data[i.directiveStart+i.componentOffset];if(r===Qn.None||r===Qn.Emulated)return null}return Zn(i,t)}function sE(n,e,t){return aE(n,e,t)}function oE(n,e,t){return n.type&40?Zn(n,t):null}var aE=oE,wy;function Rp(n,e,t,i){let r=iE(n,i,e),s=e[wt],o=i.parent||e[On],a=sE(o,i,e);if(r!=null)if(Array.isArray(t))for(let l=0;l<t.length;l++)xy(s,r,t[l],a,!1);else xy(s,r,t,a,!1);wy!==void 0&&wy(s,i,e,t,r)}function Zo(n,e){if(e!==null){let t=e.type;if(t&3)return Zn(e,n);if(t&4)return Jh(-1,n[e.index]);if(t&8){let i=e.child;if(i!==null)return Zo(n,i);{let r=n[e.index];return Yn(r)?Jh(-1,r):Fn(r)}}else{if(t&128)return Zo(n,e.next);if(t&32)return Ap(e,n)()||Fn(n[e.index]);{let i=C_(n,e);if(i!==null){if(Array.isArray(i))return i[0];let r=tr(n[Ln]);return Zo(r,i)}else return Zo(n,e.next)}}}return null}function C_(n,e){if(e!==null){let i=n[Ln][On],r=e.projection;return i.projection[r]}return null}function Jh(n,e){let t=Rt+n+1;if(t<e.length){let i=e[t],r=i[we].firstChild;if(r!==null)return Zo(i,r)}return e[sr]}function Np(n,e,t,i,r,s,o){for(;t!=null;){let a=i[Pi];if(t.type===128){t=t.next;continue}let l=i[t.index],c=t.type;if(o&&e===0&&(l&&Zs(Fn(l),i),t.flags|=2),!Sp(t))if(c&8)Np(n,e,t.child,i,r,s,!1),qs(e,n,a,r,l,t,s,i);else if(c&32){let u=Ap(t,i),d;for(;d=u();)qs(e,n,a,r,d,t,s,i);qs(e,n,a,r,l,t,s,i)}else c&16?lE(n,e,i,t,r,s):qs(e,n,a,r,l,t,s,i);t=o?t.projectionNext:t.next}}function Dc(n,e,t,i,r,s){Np(t,i,n.firstChild,e,r,s,!1)}function lE(n,e,t,i,r,s){let o=t[Ln],l=o[On].projection[i.projection];if(Array.isArray(l))for(let c=0;c<l.length;c++){let u=l[c];qs(e,n,t[Pi],r,u,i,s,t)}else{let c=l,u=o[zt];t_(i)&&(c.flags|=128),Np(n,e,c,u,r,s,!0)}}function cE(n,e,t,i,r,s,o){let a=i[sr],l=Fn(i);a!==l&&qs(e,n,t,s,a,r,o);for(let c=Rt;c<i.length;c++){let u=i[c];Dc(u[we],u,n,e,s,a)}}function uE(n,e,t,i,r){if(e)r?n.addClass(t,i):n.removeClass(t,i);else{let s=i.indexOf("-")===-1?void 0:ki.DashCase;r==null?n.removeStyle(t,i,s):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),s|=ki.Important),n.setStyle(t,i,r,s))}}function T_(n,e,t,i,r){let s=or(),o=i&2;try{ar(-1),o&&e.length>Zt&&M_(n,e,Zt,!1);let a=o?it.TemplateUpdateStart:it.TemplateCreateStart;pt(a,r,t),t(i,r)}finally{ar(s);let a=o?it.TemplateUpdateEnd:it.TemplateCreateEnd;pt(a,r,t)}}function A_(n,e,t){vE(n,e,t),(t.flags&64)===64&&yE(n,e,t)}function Pp(n,e,t=Zn){let i=e.localNames;if(i!==null){let r=e.index+1;for(let s=0;s<i.length;s+=2){let o=i[s+1],a=o===-1?t(e,n):n[o];n[r++]=a}}}function dE(n,e,t,i){let s=i.get(c_,l_)||t===Qn.ShadowDom||t===Qn.ExperimentalIsolatedShadowDom,o=n.selectRootElement(e,s);return fE(o),o}function fE(n){hE(n)}var hE=()=>null;function pE(n){return n==="class"?"className":n==="for"?"htmlFor":n==="formaction"?"formAction":n==="innerHtml"?"innerHTML":n==="readonly"?"readOnly":n==="tabindex"?"tabIndex":n}function mE(n,e,t,i,r,s){let o=e[we];if(Op(n,o,e,t,i)){jr(n)&&gE(e,n.index);return}n.type&3&&(t=pE(t)),I_(n,e,t,i,r,s)}function I_(n,e,t,i,r,s){if(n.type&3){let o=Zn(n,e);i=s!=null?s(i,n.value||"",t):i,r.setProperty(o,t,i)}else n.type&12}function gE(n,e){let t=Jn(e,n);t[Ne]&16||(t[Ne]|=64)}function vE(n,e,t){let i=t.directiveStart,r=t.directiveEnd;jr(t)&&qS(e,t,n.data[i+t.componentOffset]),n.firstCreatePass||mc(t,e);let s=t.initialInputs;for(let o=i;o<r;o++){let a=n.data[o],l=Ko(e,n,o,t);if(Zs(l,e),s!==null&&SE(e,o-i,l,a,t,s),gi(a)){let c=Jn(t.index,e);c[Ft]=Ko(e,n,o,t)}}}function yE(n,e,t){let i=t.directiveStart,r=t.directiveEnd,s=t.index,o=Kv();try{ar(s);for(let a=i;a<r;a++){let l=n.data[a],c=e[a];Ql(a),(l.hostBindings!==null||l.hostVars!==0||l.hostAttrs!==null)&&_E(l,c)}}finally{ar(-1),Ql(o)}}function _E(n,e){n.hostBindings!==null&&n.hostBindings(1,e)}function xE(n,e){let t=n.directiveRegistry,i=null;if(t)for(let r=0;r<t.length;r++){let s=t[r];VS(e,s.selectors,!1)&&(i??=[],gi(s)?i.unshift(s):i.push(s))}return i}function ME(n,e,t,i,r,s){let o=Zn(n,e);bE(e[wt],o,s,n.value,t,i,r)}function bE(n,e,t,i,r,s,o){if(s==null)n.removeAttribute(e,r,t);else{let a=o==null?zl(s):o(s,i||"",r);n.setAttribute(e,r,a,t)}}function SE(n,e,t,i,r,s){let o=s[e];if(o!==null)for(let a=0;a<o.length;a+=2){let l=o[a],c=o[a+1];Zh(i,t,l,c)}}function D_(n,e,t,i,r){let s=Zt+t,o=e[we],a=r(o,e,n,i,t);e[s]=a,Ws(n,!0);let l=n.type===2;return l?(v_(e[wt],a,n),(zv()===0||Zl(n))&&Zs(a,e),Gv()):Zs(a,e),rc()&&(!l||!Sp(n))&&Rp(o,e,a,n),n}function R_(n){let e=n;return bh()?qv():(e=e.parent,Ws(e,!1)),e}function EE(n,e){let t=n[Pi];if(!t)return;let i;try{i=t.get(Xr,null)}catch{i=null}i?.(e)}function Op(n,e,t,i,r){let s=n.inputs?.[i],o=n.hostDirectiveInputs?.[i],a=!1;if(o)for(let l=0;l<o.length;l+=2){let c=o[l],u=o[l+1],d=e.data[c];Zh(d,t[c],u,r),a=!0}if(s)for(let l of s){let c=t[l],u=e.data[l];Zh(u,c,i,r),a=!0}return a}function wE(n,e){let t=Jn(e,n),i=t[we];CE(i,t);let r=t[Xn];r!==null&&t[Bs]===null&&(t[Bs]=u_(r,t[Pi])),pt(it.ComponentStart);try{Lp(i,t,t[Ft])}finally{pt(it.ComponentEnd,t[Ft])}}function CE(n,e){for(let t=e.length;t<n.blueprint.length;t++)e.push(n.blueprint[t])}function Lp(n,e,t){tc(e);try{let i=n.viewQuery;i!==null&&Xh(1,i,t);let r=n.template;r!==null&&T_(n,e,r,1,t),n.firstCreatePass&&(n.firstCreatePass=!1),e[pi]?.finishViewCreation(n),n.staticContentQueries&&d_(n,e),n.staticViewQueries&&Xh(2,n.viewQuery,t);let s=n.components;s!==null&&TE(e,s)}catch(i){throw n.firstCreatePass&&(n.incompleteFirstPass=!0,n.firstCreatePass=!1),i}finally{e[Ne]&=-5,nc()}}function TE(n,e){for(let t=0;t<e.length;t++)wE(n,e[t])}function Rc(n,e,t,i){let r=Ce(null);try{let s=e.tView,a=n[Ne]&4096?4096:16,l=Cp(n,s,t,a,null,e,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),c=n[e.index];l[rr]=c;let u=n[pi];return u!==null&&(l[pi]=u.createEmbeddedView(s)),Lp(s,l,t),l}finally{Ce(r)}}function Qo(n,e){return!e||e.firstChild===null||t_(n)}function ea(n,e,t,i,r=!1){for(;t!==null;){if(t.type===128){t=r?t.projectionNext:t.next;continue}let s=e[t.index];s!==null&&i.push(Fn(s)),Yn(s)&&N_(s,i);let o=t.type;if(o&8)ea(n,e,t.child,i);else if(o&32){let a=Ap(t,e),l;for(;l=a();)i.push(l)}else if(o&16){let a=C_(e,t);if(Array.isArray(a))i.push(...a);else{let l=tr(e[Ln]);ea(l[we],l,a,i,!0)}}t=r?t.projectionNext:t.next}return i}function N_(n,e){for(let t=Rt;t<n.length;t++){let i=n[t],r=i[we].firstChild;r!==null&&ea(i[we],i,r,e)}n[sr]!==n[Xn]&&e.push(n[sr])}function P_(n){if(n[Yl]!==null){for(let e of n[Yl])e.impl.addSequence(e);n[Yl].length=0}}var O_=[];function AE(n){return n[_n]??IE(n)}function IE(n){let e=O_.pop()??Object.create(RE);return e.lView=n,e}function DE(n){n.lView[_n]!==n&&(n.lView=null,O_.push(n))}var RE=St($e({},No),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{qo(n.lView)},consumerOnSignalRead(){this.lView[_n]=this}});function NE(n){let e=n[_n]??Object.create(PE);return e.lView=n,e}var PE=St($e({},No),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{let e=tr(n.lView);for(;e&&!L_(e[we]);)e=tr(e);e&&ph(e)},consumerOnSignalRead(){this.lView[_n]=this}});function L_(n){return n.type!==2}function F_(n){if(n[Go]===null)return;let e=!0;for(;e;){let t=!1;for(let i of n[Go])i.dirty&&(t=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));e=t&&!!(n[Ne]&8192)}}var OE=100;function k_(n,e=0){let i=n[Oi].rendererFactory,r=!1;r||i.begin?.();try{LE(n,e)}finally{r||i.end?.()}}function LE(n,e){let t=Sh();try{Eh(!0),Kh(n,e);let i=0;for(;$o(n);){if(i===OE)throw new Xe(103,!1);i++,Kh(n,1)}}finally{Eh(t)}}function FE(n,e,t,i){if($r(e))return;let r=e[Ne],s=!1,o=!1;tc(e);let a=!0,l=null,c=null;s||(L_(n)?(c=AE(e),l=pl(c)):hl()===null?(a=!1,c=NE(e),l=pl(c)):e[_n]&&(ml(e[_n]),e[_n]=null));try{hh(e),Xv(n.bindingStartIndex),t!==null&&T_(n,e,t,2,i);let u=(r&3)===3;if(!s)if(u){let h=n.preOrderCheckHooks;h!==null&&ac(e,h,null)}else{let h=n.preOrderHooks;h!==null&&lc(e,h,0,null),Oh(e,0)}if(o||kE(e),F_(e),U_(e,0),n.contentQueries!==null&&d_(n,e),!s)if(u){let h=n.contentCheckHooks;h!==null&&ac(e,h)}else{let h=n.contentHooks;h!==null&&lc(e,h,1),Oh(e,1)}VE(n,e);let d=n.components;d!==null&&B_(e,d,0);let f=n.viewQuery;if(f!==null&&Xh(2,f,i),!s)if(u){let h=n.viewCheckHooks;h!==null&&ac(e,h)}else{let h=n.viewHooks;h!==null&&lc(e,h,2),Oh(e,2)}if(n.firstUpdatePass===!0&&(n.firstUpdatePass=!1),e[Xl]){for(let h of e[Xl])h();e[Xl]=null}s||(P_(e),e[Ne]&=-73)}catch(u){throw s||qo(e),u}finally{c!==null&&(uf(c,l),a&&DE(c)),nc()}}function U_(n,e){for(let t=i_(n);t!==null;t=r_(t))for(let i=Rt;i<t.length;i++){let r=t[i];V_(r,e)}}function kE(n){for(let e=i_(n);e!==null;e=r_(e)){if(!(e[Ne]&2))continue;let t=e[Wr];for(let i=0;i<t.length;i++){let r=t[i];ph(r)}}}function UE(n,e,t){pt(it.ComponentStart);let i=Jn(e,n);try{V_(i,t)}finally{pt(it.ComponentEnd,i[Ft])}}function V_(n,e){Jl(n)&&Kh(n,e)}function Kh(n,e){let i=n[we],r=n[Ne],s=n[_n],o=!!(e===0&&r&16);if(o||=!!(r&64&&e===0),o||=!!(r&1024),o||=!!(s?.dirty&&df(s)),o||=!1,s&&(s.dirty=!1),n[Ne]&=-9217,o)FE(i,n,i.template,n[Ft]);else if(r&8192){let a=Ce(null);try{F_(n),U_(n,1);let l=i.components;l!==null&&B_(n,l,1),P_(n)}finally{Ce(a)}}}function B_(n,e,t){for(let i=0;i<e.length;i++)UE(n,e[i],t)}function VE(n,e){let t=n.hostBindingOpCodes;if(t!==null)try{for(let i=0;i<t.length;i++){let r=t[i];if(r<0)ar(~r);else{let s=r,o=t[++i],a=t[++i];Jv(o,s);let l=e[s];pt(it.HostBindingsUpdateStart,l);try{a(2,l)}finally{pt(it.HostBindingsUpdateEnd,l)}}}}finally{ar(-1)}}function Fp(n,e){let t=Sh()?64:1088;for(n[Oi].changeDetectionScheduler?.notify(e);n;){n[Ne]|=t;let i=tr(n);if(Gs(n)&&!i)return n;n=i}return null}function H_(n,e,t,i){return[n,!0,0,e,null,i,null,t,null,null]}function z_(n,e){let t=Rt+e;if(t<n.length)return n[t]}function Nc(n,e,t,i=!0){let r=e[we];if(BE(r,e,n,t),i){let o=Jh(t,n),a=e[wt],l=a.parentNode(n[sr]);l!==null&&KS(r,n[On],a,e,l,o)}let s=e[Bs];s!==null&&s.firstChild!==null&&(s.firstChild=null)}function G_(n,e){let t=ta(n,e);return t!==void 0&&Ic(t[we],t),t}function ta(n,e){if(n.length<=Rt)return;let t=Rt+e,i=n[t];if(i){let r=i[rr];r!==null&&r!==n&&Dp(r,i),e>0&&(n[t-1][Pn]=i[Pn]);let s=Bo(n,Rt+e);JS(i[we],i);let o=s[pi];o!==null&&o.detachView(s[we]),i[zt]=null,i[Pn]=null,i[Ne]&=-129}return i}function BE(n,e,t,i){let r=Rt+i,s=t.length;i>0&&(t[r-1][Pn]=e),i<s-Rt?(e[Pn]=t[r],th(t,Rt+i,e)):(t.push(e),e[Pn]=null),e[zt]=t;let o=e[rr];o!==null&&t!==o&&W_(o,e);let a=e[pi];a!==null&&a.insertView(n),Kl(e),e[Ne]|=128}function W_(n,e){let t=n[Wr],i=e[zt];if(mi(i))n[Ne]|=2;else{let r=i[zt][Ln];e[Ln]!==r&&(n[Ne]|=2)}t===null?n[Wr]=[e]:t.push(e)}var Js=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let e=this._lView,t=e[we];return ea(t,e,t.firstChild,[])}constructor(e,t){this._lView=e,this._cdRefInjectingView=t}get context(){return this._lView[Ft]}set context(e){this._lView[Ft]=e}get destroyed(){return $r(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[zt];if(Yn(e)){let t=e[Wo],i=t?t.indexOf(this):-1;i>-1&&(ta(e,i),Bo(t,i))}this._attachedToViewContainer=!1}Ic(this._lView[we],this._lView)}onDestroy(e){mh(this._lView,e)}markForCheck(){Fp(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[Ne]&=-129}reattach(){Kl(this._lView),this._lView[Ne]|=128}detectChanges(){this._lView[Ne]|=1024,k_(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new Xe(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let e=Gs(this._lView),t=this._lView[rr];t!==null&&!e&&Dp(t,this._lView),w_(this._lView[we],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new Xe(902,!1);this._appRef=e;let t=Gs(this._lView),i=this._lView[rr];i!==null&&!t&&W_(i,this._lView),Kl(this._lView)}};var na=(()=>{class n{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=HE;constructor(t,i,r){this._declarationLView=t,this._declarationTContainer=i,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,i){return this.createEmbeddedViewImpl(t,i)}createEmbeddedViewImpl(t,i,r){let s=Rc(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:i,dehydratedView:r});return new Js(s)}}return n})();function HE(){return kp(xn(),Ke())}function kp(n,e){return n.type&4?new na(e,n,Qs(n,e)):null}function Pc(n,e,t,i,r){let s=n.data[e];if(s===null)s=zE(n,e,t,i,r),Zv()&&(s.flags|=32);else if(s.type&64){s.type=t,s.value=i,s.attrs=r;let o=$v();s.injectorIndex=o===null?-1:o.injectorIndex}return Ws(s,!0),s}function zE(n,e,t,i,r){let s=Mh(),o=bh(),a=o?s:s&&s.parent,l=n.data[e]=WE(n,a,t,e,i,r);return GE(n,l,s,o),l}function GE(n,e,t,i){n.firstChild===null&&(n.firstChild=e),t!==null&&(i?t.child==null&&e.parent!==null&&(t.child=e):t.next===null&&(t.next=e,e.prev=t))}function WE(n,e,t,i,r,s){let o=e?e.injectorIndex:-1,a=0;return jv()&&(a|=128),{type:t,index:i,insertBeforeIndex:null,injectorIndex:o,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,fieldIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,attrs:s,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function jE(n){let e=n[ch]??[],i=n[zt][wt],r=[];for(let s of e)s.data[a_]!==void 0?r.push(s):$E(s,i);n[ch]=r}function $E(n,e){let t=0,i=n.firstChild;if(i){let r=n.data[o_];for(;t<r;){let s=i.nextSibling;g_(e,i,!1),i=s,t++}}}var qE=()=>null,XE=()=>null;function Qh(n,e){return qE(n,e)}function j_(n,e,t){return XE(n,e,t)}var $_=class{},Oc=class{},ep=class{resolveComponentFactory(e){throw new Xe(917,!1)}},Lc=class{static NULL=new ep},Kr=class{},Fc=(()=>{class n{destroyNode=null;static __NG_ELEMENT_ID__=()=>YE()}return n})();function YE(){let n=Ke(),e=xn(),t=Jn(e.index,n);return(mi(t)?t:n)[wt]}var q_=(()=>{class n{static \u0275prov=yt({token:n,providedIn:"root",factory:()=>null})}return n})();var uc={},tp=class{injector;parentInjector;constructor(e,t){this.injector=e,this.parentInjector=t}get(e,t,i){let r=this.injector.get(e,uc,i);return r!==uc||t===uc?r:this.parentInjector.get(e,t,i)}};function yc(n,e,t){let i=t?n.styles:null,r=t?n.classes:null,s=0;if(e!==null)for(let o=0;o<e.length;o++){let a=e[o];if(typeof a=="number")s=a;else if(s==1)r=jf(r,a);else if(s==2){let l=a,c=e[++o];i=jf(i,l+": "+c+";")}}t?n.styles=i:n.stylesWithoutHost=i,t?n.classes=r:n.classesWithoutHost=r}function tn(n,e=0){let t=Ke();if(t===null)return ht(n,e);let i=xn();return Ky(i,t,Yt(n),e)}function ZE(n,e,t,i,r){let s=i===null?null:{"":-1},o=r(n,t);if(o!==null){let a=o,l=null,c=null;for(let u of o)if(u.resolveHostDirectives!==null){[a,l,c]=u.resolveHostDirectives(o);break}QE(n,e,t,a,s,l,c)}s!==null&&i!==null&&JE(t,i,s)}function JE(n,e,t){let i=n.localNames=[];for(let r=0;r<e.length;r+=2){let s=t[e[r+1]];if(s==null)throw new Xe(-301,!1);i.push(e[r],s)}}function KE(n,e,t){e.componentOffset=t,(n.components??=[]).push(e.index)}function QE(n,e,t,i,r,s,o){let a=i.length,l=null;for(let f=0;f<a;f++){let h=i[f];l===null&&gi(h)&&(l=h,KE(n,t,f)),jh(mc(t,e),n,h.type)}sw(t,n.data.length,a),l?.viewProvidersResolver&&l.viewProvidersResolver(l);for(let f=0;f<a;f++){let h=i[f];h.providersResolver&&h.providersResolver(h)}let c=!1,u=!1,d=x_(n,e,a,null);a>0&&(t.directiveToIndex=new Map);for(let f=0;f<a;f++){let h=i[f];if(t.mergedAttrs=Ys(t.mergedAttrs,h.hostAttrs),tw(n,t,e,d,h),rw(d,h,r),o!==null&&o.has(h)){let[y,m]=o.get(h);t.directiveToIndex.set(h.type,[d,y+t.directiveStart,m+t.directiveStart])}else(s===null||!s.has(h))&&t.directiveToIndex.set(h.type,d);h.contentQueries!==null&&(t.flags|=4),(h.hostBindings!==null||h.hostAttrs!==null||h.hostVars!==0)&&(t.flags|=64);let v=h.type.prototype;!c&&(v.ngOnChanges||v.ngOnInit||v.ngDoCheck)&&((n.preOrderHooks??=[]).push(t.index),c=!0),!u&&(v.ngOnChanges||v.ngDoCheck)&&((n.preOrderCheckHooks??=[]).push(t.index),u=!0),d++}ew(n,t,s)}function ew(n,e,t){for(let i=e.directiveStart;i<e.directiveEnd;i++){let r=n.data[i];if(t===null||!t.has(r))Cy(0,e,r,i),Cy(1,e,r,i),Ay(e,i,!1);else{let s=t.get(r);Ty(0,e,s,i),Ty(1,e,s,i),Ay(e,i,!0)}}}function Cy(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let s in r)if(r.hasOwnProperty(s)){let o;n===0?o=e.inputs??={}:o=e.outputs??={},o[s]??=[],o[s].push(i),X_(e,s)}}function Ty(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let s in r)if(r.hasOwnProperty(s)){let o=r[s],a;n===0?a=e.hostDirectiveInputs??={}:a=e.hostDirectiveOutputs??={},a[o]??=[],a[o].push(i,s),X_(e,o)}}function X_(n,e){e==="class"?n.flags|=8:e==="style"&&(n.flags|=16)}function Ay(n,e,t){let{attrs:i,inputs:r,hostDirectiveInputs:s}=n;if(i===null||!t&&r===null||t&&s===null||Ep(n)){n.initialInputs??=[],n.initialInputs.push(null);return}let o=null,a=0;for(;a<i.length;){let l=i[a];if(l===0){a+=4;continue}else if(l===5){a+=2;continue}else if(typeof l=="number")break;if(!t&&r.hasOwnProperty(l)){let c=r[l];for(let u of c)if(u===e){o??=[],o.push(l,i[a+1]);break}}else if(t&&s.hasOwnProperty(l)){let c=s[l];for(let u=0;u<c.length;u+=2)if(c[u]===e){o??=[],o.push(c[u+1],i[a+1]);break}}a+=2}n.initialInputs??=[],n.initialInputs.push(o)}function tw(n,e,t,i,r){n.data[i]=r;let s=r.factory||(r.factory=Lr(r.type,!0)),o=new Zr(s,gi(r),tn,null);n.blueprint[i]=o,t[i]=o,nw(n,e,i,x_(n,t,r.hostVars,Ui),r)}function nw(n,e,t,i,r){let s=r.hostBindings;if(s){let o=n.hostBindingOpCodes;o===null&&(o=n.hostBindingOpCodes=[]);let a=~e.index;iw(o)!=a&&o.push(a),o.push(t,i,s)}}function iw(n){let e=n.length;for(;e>0;){let t=n[--e];if(typeof t=="number"&&t<0)return t}return 0}function rw(n,e,t){if(t){if(e.exportAs)for(let i=0;i<e.exportAs.length;i++)t[e.exportAs[i]]=n;gi(e)&&(t[""]=n)}}function sw(n,e,t){n.flags|=1,n.directiveStart=e,n.directiveEnd=e+t,n.providerIndexes=e}function Y_(n,e,t,i,r,s,o,a){let l=e[we],c=l.consts,u=vi(c,o),d=Pc(l,n,t,i,u);return s&&ZE(l,e,d,vi(c,a),r),d.mergedAttrs=Ys(d.mergedAttrs,d.attrs),d.attrs!==null&&yc(d,d.attrs,!1),d.mergedAttrs!==null&&yc(d,d.mergedAttrs,!0),l.queries!==null&&l.queries.elementStart(l,d),d}function Z_(n,e){rS(n,e),uh(e)&&n.queries.elementEnd(e)}function ow(n,e,t,i,r,s){let o=e.consts,a=vi(o,r),l=Pc(e,n,t,i,a);if(l.mergedAttrs=Ys(l.mergedAttrs,l.attrs),s!=null){let c=vi(o,s);l.localNames=[];for(let u=0;u<c.length;u+=2)l.localNames.push(c[u],-1)}return l.attrs!==null&&yc(l,l.attrs,!1),l.mergedAttrs!==null&&yc(l,l.mergedAttrs,!0),e.queries!==null&&e.queries.elementStart(e,l),l}function es(n,e,t){if(t===Ui)return!1;let i=n[e];return Object.is(i,t)?!1:(n[e]=t,!0)}function dc(n,e,t){return function i(r){let s=jr(n)?Jn(n.index,e):e;Fp(s,5);let o=e[Ft],a=Iy(e,o,t,r),l=i.__ngNextListenerFn__;for(;l;)a=Iy(e,o,l,r)&&a,l=l.__ngNextListenerFn__;return a}}function Iy(n,e,t,i){let r=Ce(null);try{return pt(it.OutputStart,e,t),t(i)!==!1}catch(s){return EE(n,s),!1}finally{pt(it.OutputEnd,e,t),Ce(r)}}function J_(n,e,t,i,r,s,o,a){let l=Zl(n),c=!1,u=null;if(!i&&l&&(u=lw(e,t,s,n.index)),u!==null){let d=u.__ngLastListenerFn__||u;d.__ngNextListenerFn__=o,u.__ngLastListenerFn__=o,c=!0}else{let d=Zn(n,t),f=i?i(d):d;AS(t,f,s,a);let h=r.listen(f,s,a);if(!aw(s)){let v=i?y=>i(Fn(y[n.index])):n.index;K_(v,e,t,s,a,h,!1)}}return c}function aw(n){return n.startsWith("animation")||n.startsWith("transition")}function lw(n,e,t,i){let r=n.cleanup;if(r!=null)for(let s=0;s<r.length-1;s+=2){let o=r[s];if(o===t&&r[s+1]===i){let a=e[Hs],l=r[s+2];return a&&a.length>l?a[l]:null}typeof o=="string"&&(s+=2)}return null}function K_(n,e,t,i,r,s,o){let a=e.firstCreatePass?vh(e):null,l=gh(t),c=l.length;l.push(r,s),a&&a.push(i,n,c,(c+1)*(o?-1:1))}function Dy(n,e,t,i,r,s){let o=e[t],a=e[we],c=a.data[t].outputs[i],d=o[c].subscribe(s);K_(n.index,a,e,r,s,d,!0)}var np=Symbol("BINDING");var ip=class extends Lc{ngModule;constructor(e){super(),this.ngModule=e}resolveComponentFactory(e){let t=Br(e);return new ia(t,this.ngModule)}};function cw(n){return Object.keys(n).map(e=>{let[t,i,r]=n[e],s={propName:t,templateName:e,isSignal:(i&Ac.SignalBased)!==0};return r&&(s.transform=r),s})}function uw(n){return Object.keys(n).map(e=>({propName:n[e],templateName:e}))}function dw(n,e,t){let i=e instanceof Rn?e:e?.injector;return i&&n.getStandaloneInjector!==null&&(i=n.getStandaloneInjector(i)||i),i?new tp(t,i):t}function fw(n){let e=n.get(Kr,null);if(e===null)throw new Xe(407,!1);let t=n.get(q_,null),i=n.get(Fs,null);return{rendererFactory:e,sanitizer:t,changeDetectionScheduler:i,ngReflect:!1}}function hw(n,e){let t=Q_(n);return p_(e,t,t==="svg"?dh:t==="math"?Fv:null)}function Q_(n){return(n.selectors[0][0]||"div").toLowerCase()}var ia=class extends Oc{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=cw(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=uw(this.componentDef.outputs),this.cachedOutputs}constructor(e,t){super(),this.componentDef=e,this.ngModule=t,this.componentType=e.type,this.selector=GS(e.selectors),this.ngContentSelectors=e.ngContentSelectors??[],this.isBoundToModule=!!t}create(e,t,i,r,s,o){pt(it.DynamicComponentStart);let a=Ce(null);try{let l=this.componentDef,c=pw(i,l,o,s),u=dw(l,r||this.ngModule,e),d=fw(u),f=d.rendererFactory.createRenderer(null,l),h=i?dE(f,i,l.encapsulation,u):hw(l,f),v=o?.some(Ry)||s?.some(p=>typeof p!="function"&&p.bindings.some(Ry)),y=Cp(null,c,null,512|__(l),null,null,d,f,u,null,u_(h,u,!0));y[Zt]=h,tc(y);let m=null;try{let p=Y_(Zt,y,2,"#host",()=>c.directiveRegistry,!0,0);v_(f,h,p),Zs(h,y),A_(c,y,p),f_(c,p,y),Z_(c,p),t!==void 0&&gw(p,this.ngContentSelectors,t),m=Jn(p.index,y),y[Ft]=m[Ft],Lp(c,y,null)}catch(p){throw m!==null&&qh(m),qh(y),p}finally{pt(it.DynamicComponentEnd),nc()}return new _c(this.componentType,y,!!v)}finally{Ce(a)}}};function pw(n,e,t,i){let r=n?["ng-version","21.1.1"]:WS(e.selectors[0]),s=null,o=null,a=0;if(t)for(let u of t)a+=u[np].requiredVars,u.create&&(u.targetIdx=0,(s??=[]).push(u)),u.update&&(u.targetIdx=0,(o??=[]).push(u));if(i)for(let u=0;u<i.length;u++){let d=i[u];if(typeof d!="function")for(let f of d.bindings){a+=f[np].requiredVars;let h=u+1;f.create&&(f.targetIdx=h,(s??=[]).push(f)),f.update&&(f.targetIdx=h,(o??=[]).push(f))}}let l=[e];if(i)for(let u of i){let d=typeof u=="function"?u:u.type,f=Jf(d);l.push(f)}return wp(0,null,mw(s,o),1,a,l,null,null,null,[r],null)}function mw(n,e){return!n&&!e?null:t=>{if(t&1&&n)for(let i of n)i.create();if(t&2&&e)for(let i of e)i.update()}}function Ry(n){let e=n[np].kind;return e==="input"||e==="twoWay"}var _c=class extends $_{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(e,t,i){super(),this._rootLView=t,this._hasInputBindings=i,this._tNode=jo(t[we],Zt),this.location=Qs(this._tNode,t),this.instance=Jn(this._tNode.index,t)[Ft],this.hostView=this.changeDetectorRef=new Js(t,void 0),this.componentType=e}setInput(e,t){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),t))return;let r=this._rootLView,s=Op(i,r[we],r,e,t);this.previousInputValues.set(e,t);let o=Jn(i.index,r);Fp(o,1)}get injector(){return new Yr(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function gw(n,e,t){let i=n.projection=[];for(let r=0;r<e.length;r++){let s=t[r];i.push(s!=null&&s.length?Array.from(s):null)}}var kc=(()=>{class n{static __NG_ELEMENT_ID__=vw}return n})();function vw(){let n=xn();return t0(n,Ke())}var yw=kc,e0=class extends yw{_lContainer;_hostTNode;_hostLView;constructor(e,t,i){super(),this._lContainer=e,this._hostTNode=t,this._hostLView=i}get element(){return Qs(this._hostTNode,this._hostLView)}get injector(){return new Yr(this._hostTNode,this._hostLView)}get parentInjector(){let e=_p(this._hostTNode,this._hostLView);if($y(e)){let t=pc(e,this._hostLView),i=hc(e),r=t[we].data[i+8];return new Yr(r,t)}else return new Yr(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(e){let t=Ny(this._lContainer);return t!==null&&t[e]||null}get length(){return this._lContainer.length-Rt}createEmbeddedView(e,t,i){let r,s;typeof i=="number"?r=i:i!=null&&(r=i.index,s=i.injector);let o=Qh(this._lContainer,e.ssrId),a=e.createEmbeddedViewImpl(t||{},s,o);return this.insertImpl(a,r,Qo(this._hostTNode,o)),a}createComponent(e,t,i,r,s,o,a){let l=e&&!Qb(e),c;if(l)c=t;else{let m=t||{};c=m.index,i=m.injector,r=m.projectableNodes,s=m.environmentInjector||m.ngModuleRef,o=m.directives,a=m.bindings}let u=l?e:new ia(Br(e)),d=i||this.parentInjector;if(!s&&u.ngModule==null){let p=(l?d:this.parentInjector).get(Rn,null);p&&(s=p)}let f=Br(u.componentType??{}),h=Qh(this._lContainer,f?.id??null),v=h?.firstChild??null,y=u.create(d,r,v,s,o,a);return this.insertImpl(y.hostView,c,Qo(this._hostTNode,h)),y}insert(e,t){return this.insertImpl(e,t,!0)}insertImpl(e,t,i){let r=e._lView;if(Uv(r)){let a=this.indexOf(e);if(a!==-1)this.detach(a);else{let l=r[zt],c=new e0(l,l[On],l[zt]);c.detach(c.indexOf(e))}}let s=this._adjustIndex(t),o=this._lContainer;return Nc(o,r,s,i),e.attachToViewContainerRef(),th(kh(o),s,e),e}move(e,t){return this.insert(e,t)}indexOf(e){let t=Ny(this._lContainer);return t!==null?t.indexOf(e):-1}remove(e){let t=this._adjustIndex(e,-1),i=ta(this._lContainer,t);i&&(Bo(kh(this._lContainer),t),Ic(i[we],i))}detach(e){let t=this._adjustIndex(e,-1),i=ta(this._lContainer,t);return i&&Bo(kh(this._lContainer),t)!=null?new Js(i):null}_adjustIndex(e,t=0){return e??this.length+t}};function Ny(n){return n[Wo]}function kh(n){return n[Wo]||(n[Wo]=[])}function t0(n,e){let t,i=e[n.index];return Yn(i)?t=i:(t=H_(i,e,null,n),e[n.index]=t,Tp(e,t)),xw(t,e,n,i),new e0(t,n,e)}function _w(n,e){let t=n[wt],i=t.createComment(""),r=Zn(e,n),s=t.parentNode(r);return vc(t,s,i,t.nextSibling(r),!1),i}var xw=Sw,Mw=()=>!1;function bw(n,e,t){return Mw(n,e,t)}function Sw(n,e,t,i){if(n[sr])return;let r;t.type&8?r=Fn(i):r=_w(e,t),n[sr]=r}var rp=class n{queryList;matches=null;constructor(e){this.queryList=e}clone(){return new n(this.queryList)}setDirty(){this.queryList.setDirty()}},sp=class n{queries;constructor(e=[]){this.queries=e}createEmbeddedView(e){let t=e.queries;if(t!==null){let i=e.contentQueries!==null?e.contentQueries[0]:t.length,r=[];for(let s=0;s<i;s++){let o=t.getByIndex(s),a=this.queries[o.indexInDeclarationView];r.push(a.clone())}return new n(r)}return null}insertView(e){this.dirtyQueriesWithMatches(e)}detachView(e){this.dirtyQueriesWithMatches(e)}finishViewCreation(e){this.dirtyQueriesWithMatches(e)}dirtyQueriesWithMatches(e){for(let t=0;t<this.queries.length;t++)Up(e,t).matches!==null&&this.queries[t].setDirty()}},op=class{flags;read;predicate;constructor(e,t,i=null){this.flags=t,this.read=i,typeof e=="string"?this.predicate=Rw(e):this.predicate=e}},ap=class n{queries;constructor(e=[]){this.queries=e}elementStart(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(e,t)}elementEnd(e){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(e)}embeddedTView(e){let t=null;for(let i=0;i<this.length;i++){let r=t!==null?t.length:0,s=this.getByIndex(i).embeddedTView(e,r);s&&(s.indexInDeclarationView=i,t!==null?t.push(s):t=[s])}return t!==null?new n(t):null}template(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].template(e,t)}getByIndex(e){return this.queries[e]}get length(){return this.queries.length}track(e){this.queries.push(e)}},lp=class n{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(e,t=-1){this.metadata=e,this._declarationNodeIndex=t}elementStart(e,t){this.isApplyingToNode(t)&&this.matchTNode(e,t)}elementEnd(e){this._declarationNodeIndex===e.index&&(this._appliesToNextNode=!1)}template(e,t){this.elementStart(e,t)}embeddedTView(e,t){return this.isApplyingToNode(e)?(this.crossesNgTemplate=!0,this.addMatch(-e.index,t),new n(this.metadata)):null}isApplyingToNode(e){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,i=e.parent;for(;i!==null&&i.type&8&&i.index!==t;)i=i.parent;return t===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(e,t){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let s=i[r];this.matchTNodeWithReadOption(e,t,Ew(t,s)),this.matchTNodeWithReadOption(e,t,cc(t,e,s,!1,!1))}else i===na?t.type&4&&this.matchTNodeWithReadOption(e,t,-1):this.matchTNodeWithReadOption(e,t,cc(t,e,i,!1,!1))}matchTNodeWithReadOption(e,t,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===lr||r===kc||r===na&&t.type&4)this.addMatch(t.index,-2);else{let s=cc(t,e,r,!1,!1);s!==null&&this.addMatch(t.index,s)}else this.addMatch(t.index,i)}}addMatch(e,t){this.matches===null?this.matches=[e,t]:this.matches.push(e,t)}};function Ew(n,e){let t=n.localNames;if(t!==null){for(let i=0;i<t.length;i+=2)if(t[i]===e)return t[i+1]}return null}function ww(n,e){return n.type&11?Qs(n,e):n.type&4?kp(n,e):null}function Cw(n,e,t,i){return t===-1?ww(e,n):t===-2?Tw(n,e,i):Ko(n,n[we],t,e)}function Tw(n,e,t){if(t===lr)return Qs(e,n);if(t===na)return kp(e,n);if(t===kc)return t0(e,n)}function n0(n,e,t,i){let r=e[pi].queries[i];if(r.matches===null){let s=n.data,o=t.matches,a=[];for(let l=0;o!==null&&l<o.length;l+=2){let c=o[l];if(c<0)a.push(null);else{let u=s[c];a.push(Cw(e,u,o[l+1],t.metadata.read))}}r.matches=a}return r.matches}function cp(n,e,t,i){let r=n.queries.getByIndex(t),s=r.matches;if(s!==null){let o=n0(n,e,r,t);for(let a=0;a<s.length;a+=2){let l=s[a];if(l>0)i.push(o[a/2]);else{let c=s[a+1],u=e[-l];for(let d=Rt;d<u.length;d++){let f=u[d];f[rr]===f[zt]&&cp(f[we],f,c,i)}if(u[Wr]!==null){let d=u[Wr];for(let f=0;f<d.length;f++){let h=d[f];cp(h[we],h,c,i)}}}}}return i}function Aw(n,e){return n[pi].queries[e].queryList}function Iw(n,e,t){let i=new gc((t&4)===4);return Hv(n,e,i,i.destroy),(e[pi]??=new sp).queries.push(new rp(i))-1}function Dw(n,e,t){let i=Jt();return i.firstCreatePass&&(Nw(i,new op(n,e,t),-1),(e&2)===2&&(i.staticViewQueries=!0)),Iw(i,Ke(),e)}function Rw(n){return n.split(",").map(e=>e.trim())}function Nw(n,e,t){n.queries===null&&(n.queries=new ap),n.queries.track(new lp(e,t))}function Up(n,e){return n.queries.getByIndex(e)}function Pw(n,e){let t=n[we],i=Up(t,e);return i.crossesNgTemplate?cp(t,n,e,[]):n0(t,n,i,e)}var xc=class{};var ra=class extends xc{injector;componentFactoryResolver=new ip(this);instance=null;constructor(e){super();let t=new kr([...e.providers,{provide:xc,useValue:this},{provide:Lc,useValue:this.componentFactoryResolver}],e.parent||zo(),e.debugName,new Set(["environment"]));this.injector=t,e.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function i0(n,e,t=null){return new ra({providers:n,parent:e,debugName:t,runEnvironmentInitializers:!0}).injector}var Ow=(()=>{class n{_injector;cachedInjectors=new Map;constructor(t){this._injector=t}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let i=rh(!1,t.type),r=i.length>0?i0([i],this._injector,""):null;this.cachedInjectors.set(t,r)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=yt({token:n,providedIn:"environment",factory:()=>new n(ht(Rn))})}return n})();function ei(n){return oa(()=>{let e=r0(n),t=St($e({},e),{decls:n.decls,vars:n.vars,template:n.template,consts:n.consts||null,ngContentSelectors:n.ngContentSelectors,onPush:n.changeDetection===Mp.OnPush,directiveDefs:null,pipeDefs:null,dependencies:e.standalone&&n.dependencies||null,getStandaloneInjector:e.standalone?r=>r.get(Ow).getOrCreateStandaloneInjector(t):null,getExternalStyles:null,signals:n.signals??!1,data:n.data||{},encapsulation:n.encapsulation||Qn.Emulated,styles:n.styles||yn,_:null,schemas:n.schemas||null,tView:null,id:""});e.standalone&&eo("NgStandalone"),s0(t);let i=n.dependencies;return t.directiveDefs=Py(i,Lw),t.pipeDefs=Py(i,xv),t.id=Uw(t),t})}function Lw(n){return Br(n)||Jf(n)}function ua(n){return oa(()=>({type:n.type,bootstrap:n.bootstrap||yn,declarations:n.declarations||yn,imports:n.imports||yn,exports:n.exports||yn,transitiveCompileScopes:null,schemas:n.schemas||null,id:n.id||null}))}function Fw(n,e){if(n==null)return ir;let t={};for(let i in n)if(n.hasOwnProperty(i)){let r=n[i],s,o,a,l;Array.isArray(r)?(a=r[0],s=r[1],o=r[2]??s,l=r[3]||null):(s=r,o=r,a=Ac.None,l=null),t[s]=[i,a,l],e[s]=o}return t}function kw(n){if(n==null)return ir;let e={};for(let t in n)n.hasOwnProperty(t)&&(e[n[t]]=t);return e}function ts(n){return oa(()=>{let e=r0(n);return s0(e),e})}function r0(n){let e={};return{type:n.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:n.hostBindings||null,hostVars:n.hostVars||0,hostAttrs:n.hostAttrs||null,contentQueries:n.contentQueries||null,declaredInputs:e,inputConfig:n.inputs||ir,exportAs:n.exportAs||null,standalone:n.standalone??!0,signals:n.signals===!0,selectors:n.selectors||yn,viewQuery:n.viewQuery||null,features:n.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,inputs:Fw(n.inputs,e),outputs:kw(n.outputs),debugInfo:null}}function s0(n){n.features?.forEach(e=>e(n))}function Py(n,e){return n?()=>{let t=typeof n=="function"?n():n,i=[];for(let r of t){let s=e(r);s!==null&&i.push(s)}return i}:null}function Uw(n){let e=0,t=typeof n.consts=="function"?"":n.consts,i=[n.selectors,n.ngContentSelectors,n.hostVars,n.hostAttrs,t,n.vars,n.decls,n.encapsulation,n.standalone,n.signals,n.exportAs,JSON.stringify(n.inputs),JSON.stringify(n.outputs),Object.getOwnPropertyNames(n.type.prototype),!!n.contentQueries,!!n.viewQuery];for(let s of i.join("|"))e=Math.imul(31,e)+s.charCodeAt(0)<<0;return e+=2147483648,"c"+e}function Vw(n){return Object.getPrototypeOf(n.prototype).constructor}function ns(n){let e=Vw(n.type),t=!0,i=[n];for(;e;){let r;if(gi(n))r=e.\u0275cmp||e.\u0275dir;else{if(e.\u0275cmp)throw new Xe(903,!1);r=e.\u0275dir}if(r){if(t){i.push(r);let o=n;o.inputs=Uh(n.inputs),o.declaredInputs=Uh(n.declaredInputs),o.outputs=Uh(n.outputs);let a=r.hostBindings;a&&Ww(n,a);let l=r.viewQuery,c=r.contentQueries;if(l&&zw(n,l),c&&Gw(n,c),Bw(n,r),_v(n.outputs,r.outputs),gi(r)&&r.data.animation){let u=n.data;u.animation=(u.animation||[]).concat(r.data.animation)}}let s=r.features;if(s)for(let o=0;o<s.length;o++){let a=s[o];a&&a.ngInherit&&a(n),a===ns&&(t=!1)}}e=Object.getPrototypeOf(e)}Hw(i)}function Bw(n,e){for(let t in e.inputs){if(!e.inputs.hasOwnProperty(t)||n.inputs.hasOwnProperty(t))continue;let i=e.inputs[t];i!==void 0&&(n.inputs[t]=i,n.declaredInputs[t]=e.declaredInputs[t])}}function Hw(n){let e=0,t=null;for(let i=n.length-1;i>=0;i--){let r=n[i];r.hostVars=e+=r.hostVars,r.hostAttrs=Ys(r.hostAttrs,t=Ys(t,r.hostAttrs))}}function Uh(n){return n===ir?{}:n===yn?[]:n}function zw(n,e){let t=n.viewQuery;t?n.viewQuery=(i,r)=>{e(i,r),t(i,r)}:n.viewQuery=e}function Gw(n,e){let t=n.contentQueries;t?n.contentQueries=(i,r,s)=>{e(i,r,s),t(i,r,s)}:n.contentQueries=e}function Ww(n,e){let t=n.hostBindings;t?n.hostBindings=(i,r)=>{e(i,r),t(i,r)}:n.hostBindings=e}function jw(n,e,t,i,r,s,o,a){if(t.firstCreatePass){n.mergedAttrs=Ys(n.mergedAttrs,n.attrs);let u=n.tView=wp(2,n,r,s,o,t.directiveRegistry,t.pipeRegistry,null,t.schemas,t.consts,null);t.queries!==null&&(t.queries.template(t,n),u.queries=t.queries.embeddedTView(n))}a&&(n.flags|=a),Ws(n,!1);let l=$w(t,e,n,i);rc()&&Rp(t,e,l,n),Zs(l,e);let c=H_(l,e,l,n);e[i+Zt]=c,Tp(e,c),bw(c,n,e)}function Mc(n,e,t,i,r,s,o,a,l,c,u){let d=t+Zt,f;if(e.firstCreatePass){if(f=Pc(e,d,4,o||null,a||null),c!=null){let h=vi(e.consts,c);f.localNames=[];for(let v=0;v<h.length;v+=2)f.localNames.push(h[v],-1)}}else f=e.data[d];return jw(f,n,e,t,i,r,s,l),c!=null&&Pp(n,f,u),f}var $w=qw;function qw(n,e,t,i){return sc(!0),e[wt].createComment("")}var Vp=new He("");function da(n){return!!n&&typeof n.then=="function"}function o0(n){return!!n&&typeof n.subscribe=="function"}var a0=new He("");var Bp=(()=>{class n{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((t,i)=>{this.resolve=t,this.reject=i});appInits=je(a0,{optional:!0})??[];injector=je(nr);constructor(){}runInitializers(){if(this.initialized)return;let t=[];for(let r of this.appInits){let s=ql(this.injector,r);if(da(s))t.push(s);else if(o0(s)){let o=new Promise((a,l)=>{s.subscribe({complete:a,error:l})});t.push(o)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{i()}).catch(r=>{this.reject(r)}),t.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||n)};static \u0275prov=yt({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),l0=new He("");function c0(){mf(()=>{let n="";throw new Xe(600,n)})}function u0(n){return n.isBoundToModule}var Xw=10;var fa=(()=>{class n{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=je(Xr);afterRenderManager=je(b_);zonelessEnabled=je(Yo);rootEffectScheduler=je(Ph);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new qn;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=je($s);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(Nr(t=>!t))}constructor(){je(ca,{optional:!0})}whenStable(){let t;return new Promise(i=>{t=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{t.unsubscribe()})}_injector=je(Rn);_rendererFactory=null;get injector(){return this._injector}bootstrap(t,i){return this.bootstrapImpl(t,i)}bootstrapImpl(t,i,r=nr.NULL){return this._injector.get(Nn).run(()=>{pt(it.BootstrapComponentStart);let o=t instanceof Oc;if(!this._injector.get(Bp).done){let v="";throw new Xe(405,v)}let l;o?l=t:l=this._injector.get(Lc).resolveComponentFactory(t),this.componentTypes.push(l.componentType);let c=u0(l)?void 0:this._injector.get(xc),u=i||l.selector,d=l.create(r,[],u,c),f=d.location.nativeElement,h=d.injector.get(Vp,null);return h?.registerApplication(f),d.onDestroy(()=>{this.detachView(d.hostView),Jo(this.components,d),h?.unregisterApplication(f)}),this._loadComponent(d),pt(it.BootstrapComponentEnd,d),d})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){pt(it.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(Ip.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw pt(it.ChangeDetectionEnd),new Xe(101,!1);let t=Ce(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,Ce(t),this.afterTick.next(),pt(it.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(Kr,null,{optional:!0}));let t=0;for(;this.dirtyFlags!==0&&t++<Xw;){pt(it.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{pt(it.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let t=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!$o(r))continue;let s=i&&!this.zonelessEnabled?0:1;k_(r,s),t=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}t||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:t})=>$o(t))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(t){let i=t;this._views.push(i),i.attachToAppRef(this)}detachView(t){let i=t;Jo(this._views,i),i.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(t),this._injector.get(l0,[]).forEach(r=>r(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>Jo(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new Xe(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||n)};static \u0275prov=yt({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Jo(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function Vn(n,e,t,i){let r=Ke(),s=qr();if(es(r,s,e)){let o=Jt(),a=ic();ME(a,r,n,e,t,i)}return Vn}var QF=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var up=class{destroy(e){}updateValue(e,t){}swap(e,t){let i=Math.min(e,t),r=Math.max(e,t),s=this.detach(r);if(r-i>1){let o=this.detach(i);this.attach(i,s),this.attach(r,o)}else this.attach(i,s)}move(e,t){this.attach(t,this.detach(e))}};function Vh(n,e,t,i,r){return n===t&&Object.is(e,i)?1:Object.is(r(n,e),r(t,i))?-1:0}function Yw(n,e,t,i){let r,s,o=0,a=n.length-1,l=void 0;if(Array.isArray(e)){Ce(i);let c=e.length-1;for(Ce(null);o<=a&&o<=c;){let u=n.at(o),d=e[o],f=Vh(o,u,o,d,t);if(f!==0){f<0&&n.updateValue(o,d),o++;continue}let h=n.at(a),v=e[c],y=Vh(a,h,c,v,t);if(y!==0){y<0&&n.updateValue(a,v),a--,c--;continue}let m=t(o,u),p=t(a,h),S=t(o,d);if(Object.is(S,p)){let w=t(c,v);Object.is(w,m)?(n.swap(o,a),n.updateValue(a,v),c--,a--):n.move(a,o),n.updateValue(o,d),o++;continue}if(r??=new bc,s??=Ly(n,o,a,t),dp(n,r,o,S))n.updateValue(o,d),o++,a++;else if(s.has(S))r.set(m,n.detach(o)),a--;else{let w=n.create(o,e[o]);n.attach(o,w),o++,a++}}for(;o<=c;)Oy(n,r,t,o,e[o]),o++}else if(e!=null){Ce(i);let c=e[Symbol.iterator]();Ce(null);let u=c.next();for(;!u.done&&o<=a;){let d=n.at(o),f=u.value,h=Vh(o,d,o,f,t);if(h!==0)h<0&&n.updateValue(o,f),o++,u=c.next();else{r??=new bc,s??=Ly(n,o,a,t);let v=t(o,f);if(dp(n,r,o,v))n.updateValue(o,f),o++,a++,u=c.next();else if(!s.has(v))n.attach(o,n.create(o,f)),o++,a++,u=c.next();else{let y=t(o,d);r.set(y,n.detach(o)),a--}}}for(;!u.done;)Oy(n,r,t,n.length,u.value),u=c.next()}for(;o<=a;)n.destroy(n.detach(a--));r?.forEach(c=>{n.destroy(c)})}function dp(n,e,t,i){return e!==void 0&&e.has(i)?(n.attach(t,e.get(i)),e.delete(i),!0):!1}function Oy(n,e,t,i,r){if(dp(n,e,i,t(i,r)))n.updateValue(i,r);else{let s=n.create(i,r);n.attach(i,s)}}function Ly(n,e,t,i){let r=new Set;for(let s=e;s<=t;s++)r.add(i(s,n.at(s)));return r}var bc=class{kvMap=new Map;_vMap=void 0;has(e){return this.kvMap.has(e)}delete(e){if(!this.has(e))return!1;let t=this.kvMap.get(e);return this._vMap!==void 0&&this._vMap.has(t)?(this.kvMap.set(e,this._vMap.get(t)),this._vMap.delete(t)):this.kvMap.delete(e),!0}get(e){return this.kvMap.get(e)}set(e,t){if(this.kvMap.has(e)){let i=this.kvMap.get(e);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,t)}else this.kvMap.set(e,t)}forEach(e){for(let[t,i]of this.kvMap)if(e(i,t),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),e(i,t)}}};function _i(n,e,t,i,r,s,o,a){eo("NgControlFlow");let l=Ke(),c=Jt(),u=vi(c.consts,s);return Mc(l,c,n,e,t,i,r,u,256,o,a),Hp}function Hp(n,e,t,i,r,s,o,a){eo("NgControlFlow");let l=Ke(),c=Jt(),u=vi(c.consts,s);return Mc(l,c,n,e,t,i,r,u,512,o,a),Hp}function xi(n,e){eo("NgControlFlow");let t=Ke(),i=qr(),r=t[i]!==Ui?t[i]:-1,s=r!==-1?Sc(t,Zt+r):void 0,o=0;if(es(t,i,n)){let a=Ce(null);try{if(s!==void 0&&G_(s,o),n!==-1){let l=Zt+n,c=Sc(t,l),u=mp(t[we],l),d=j_(c,u,t),f=Rc(t,u,e,{dehydratedView:d});Nc(c,f,o,Qo(u,d))}}finally{Ce(a)}}else if(s!==void 0){let a=z_(s,o);a!==void 0&&(a[Ft]=e)}}var fp=class{lContainer;$implicit;$index;constructor(e,t,i){this.lContainer=e,this.$implicit=t,this.$index=i}get $count(){return this.lContainer.length-Rt}};var hp=class{hasEmptyBlock;trackByFn;liveCollection;constructor(e,t,i){this.hasEmptyBlock=e,this.trackByFn=t,this.liveCollection=i}};function ha(n,e,t,i,r,s,o,a,l,c,u,d,f){eo("NgControlFlow");let h=Ke(),v=Jt(),y=l!==void 0,m=Ke(),p=a?o.bind(m[Ln][Ft]):o,S=new hp(y,p);m[Zt+n]=S,Mc(h,v,n+1,e,t,i,r,vi(v.consts,s),256),y&&Mc(h,v,n+2,l,c,u,d,vi(v.consts,f),512)}var pp=class extends up{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(e,t,i){super(),this.lContainer=e,this.hostLView=t,this.templateTNode=i}get length(){return this.lContainer.length-Rt}at(e){return this.getLView(e)[Ft].$implicit}attach(e,t){let i=t[Bs];this.needsIndexUpdate||=e!==this.length,Nc(this.lContainer,t,e,Qo(this.templateTNode,i)),Zw(this.lContainer,e)}detach(e){return this.needsIndexUpdate||=e!==this.length-1,Jw(this.lContainer,e),Kw(this.lContainer,e)}create(e,t){let i=Qh(this.lContainer,this.templateTNode.tView.ssrId);return Rc(this.hostLView,this.templateTNode,new fp(this.lContainer,t,e),{dehydratedView:i})}destroy(e){Ic(e[we],e)}updateValue(e,t){this.getLView(e)[Ft].$implicit=t}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let e=0;e<this.length;e++)this.getLView(e)[Ft].$index=e}getLView(e){return Qw(this.lContainer,e)}};function pa(n){let e=Ce(null),t=or();try{let i=Ke(),r=i[we],s=i[t],o=t+1,a=Sc(i,o);if(s.liveCollection===void 0){let c=mp(r,o);s.liveCollection=new pp(a,i,c)}else s.liveCollection.reset();let l=s.liveCollection;if(Yw(l,n,s.trackByFn,e),l.updateIndexes(),s.hasEmptyBlock){let c=qr(),u=l.length===0;if(es(i,c,u)){let d=t+2,f=Sc(i,d);if(u){let h=mp(r,d),v=j_(f,h,i),y=Rc(i,h,void 0,{dehydratedView:v});Nc(f,y,0,Qo(h,v))}else r.firstUpdatePass&&jE(f),G_(f,0)}}}finally{Ce(e)}}function Sc(n,e){return n[e]}function Zw(n,e){if(n.length<=Rt)return;let t=Rt+e,i=n[t],r=i?i[Gr]:void 0;if(i&&r&&r.detachedLeaveAnimationFns&&r.detachedLeaveAnimationFns.length>0){let s=i[Pi];YS(s,r),Jr.delete(i[Li]),r.detachedLeaveAnimationFns=void 0}}function Jw(n,e){if(n.length<=Rt)return;let t=Rt+e,i=n[t],r=i?i[Gr]:void 0;r&&r.leave&&r.leave.size>0&&(r.detachedLeaveAnimationFns=[])}function Kw(n,e){return ta(n,e)}function Qw(n,e){return z_(n,e)}function mp(n,e){return jo(n,e)}function Vi(n,e,t){let i=Ke(),r=qr();if(es(i,r,e)){let s=Jt(),o=ic();mE(o,i,n,e,i[wt],t)}return Vi}function Fy(n,e,t,i,r){Op(e,n,t,r?"class":"style",i)}function Nt(n,e,t,i){let r=Ke(),s=r[we],o=n+Zt,a=s.firstCreatePass?Y_(o,r,2,e,xE,Wv(),t,i):s.data[o];if(D_(a,r,n,e,d0),Zl(a)){let l=r[we];A_(l,r,a),f_(l,a,r)}return i!=null&&Pp(r,a),Nt}function Gt(){let n=Jt(),e=xn(),t=R_(e);return n.firstCreatePass&&Z_(n,t),_h(t)&&xh(),yh(),t.classesWithoutHost!=null&&oS(t)&&Fy(n,t,Ke(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&aS(t)&&Fy(n,t,Ke(),t.stylesWithoutHost,!1),Gt}function Bi(n,e,t,i){return Nt(n,e,t,i),Gt(),Bi}function Pe(n,e,t,i){let r=Ke(),s=r[we],o=n+Zt,a=s.firstCreatePass?ow(o,s,2,e,t,i):s.data[o];return D_(a,r,n,e,d0),i!=null&&Pp(r,a),Pe}function Fe(){let n=xn(),e=R_(n);return _h(e)&&xh(),yh(),Fe}function Bn(n,e,t,i){return Pe(n,e,t,i),Fe(),Bn}var d0=(n,e,t,i,r)=>(sc(!0),p_(e[wt],i,ry()));function Hi(){return Ke()}function Uc(n,e,t){let i=Ke(),r=qr();if(es(i,r,e)){let s=Jt(),o=ic();I_(o,i,n,e,i[wt],t)}return Uc}var ma="en-US";var eC=ma;function f0(n){typeof n=="string"&&(eC=n.toLowerCase().replace(/_/g,"-"))}function Hn(n,e,t){let i=Ke(),r=Jt(),s=xn();return tC(r,i,i[wt],s,n,e,t),Hn}function Kt(n,e,t){let i=Ke(),r=Jt(),s=xn();return(s.type&3||t)&&J_(s,r,i,t,i[wt],n,e,dc(s,i,e)),Kt}function tC(n,e,t,i,r,s,o){let a=!0,l=null;if((i.type&3||o)&&(l??=dc(i,e,s),J_(i,n,e,o,t,r,s,l)&&(a=!1)),a){let c=i.outputs?.[r],u=i.hostDirectiveOutputs?.[r];if(u&&u.length)for(let d=0;d<u.length;d+=2){let f=u[d],h=u[d+1];l??=dc(i,e,s),Dy(i,e,f,h,r,l)}if(c&&c.length)for(let d of c)l??=dc(i,e,s),Dy(i,e,d,r,r,l)}}function Mn(n=1){return iy(n)}function Vc(n,e,t){return Dw(n,e,t),Vc}function Bc(n){let e=Ke(),t=Jt(),i=wh();ec(i+1);let r=Up(t,i);if(n.dirty&&kv(e)===((r.metadata.flags&2)===2)){if(r.matches===null)n.reset([]);else{let s=Pw(e,i);n.reset(s,xS),n.notifyOnChanges()}return!0}return!1}function Hc(){return Aw(Ke(),wh())}function oc(n,e){return n<<17|e<<2}function Qr(n){return n>>17&32767}function nC(n){return(n&2)==2}function iC(n,e){return n&131071|e<<17}function gp(n){return n|2}function Ks(n){return(n&131068)>>2}function Bh(n,e){return n&-131069|e<<2}function rC(n){return(n&1)===1}function vp(n){return n|1}function sC(n,e,t,i,r,s){let o=s?e.classBindings:e.styleBindings,a=Qr(o),l=Ks(o);n[i]=t;let c=!1,u;if(Array.isArray(t)){let d=t;u=d[1],(u===null||Us(d,u)>0)&&(c=!0)}else u=t;if(r)if(l!==0){let f=Qr(n[a+1]);n[i+1]=oc(f,a),f!==0&&(n[f+1]=Bh(n[f+1],i)),n[a+1]=iC(n[a+1],i)}else n[i+1]=oc(a,0),a!==0&&(n[a+1]=Bh(n[a+1],i)),a=i;else n[i+1]=oc(l,0),a===0?a=i:n[l+1]=Bh(n[l+1],i),l=i;c&&(n[i+1]=gp(n[i+1])),ky(n,u,i,!0),ky(n,u,i,!1),oC(e,u,n,i,s),o=oc(a,l),s?e.classBindings=o:e.styleBindings=o}function oC(n,e,t,i,r){let s=r?n.residualClasses:n.residualStyles;s!=null&&typeof e=="string"&&Us(s,e)>=0&&(t[i+1]=vp(t[i+1]))}function ky(n,e,t,i){let r=n[t+1],s=e===null,o=i?Qr(r):Ks(r),a=!1;for(;o!==0&&(a===!1||s);){let l=n[o],c=n[o+1];aC(l,e)&&(a=!0,n[o+1]=i?vp(c):gp(c)),o=i?Qr(c):Ks(c)}a&&(n[t+1]=i?gp(r):vp(r))}function aC(n,e){return n===null||e==null||(Array.isArray(n)?n[1]:n)===e?!0:Array.isArray(n)&&typeof e=="string"?Us(n,e)>=0:!1}function ti(n,e){return lC(n,e,null,!0),ti}function lC(n,e,t,i){let r=Ke(),s=Jt(),o=Yv(2);if(s.firstUpdatePass&&uC(s,n,o,i),e!==Ui&&es(r,o,e)){let a=s.data[or()];mC(s,a,r,r[wt],n,r[o+1]=gC(e,t),i,o)}}function cC(n,e){return e>=n.expandoStartIndex}function uC(n,e,t,i){let r=n.data;if(r[t+1]===null){let s=r[or()],o=cC(n,t);vC(s,i)&&e===null&&!o&&(e=!1),e=dC(r,s,e,i),sC(r,s,e,t,o,i)}}function dC(n,e,t,i){let r=Qv(n),s=i?e.residualClasses:e.residualStyles;if(r===null)(i?e.classBindings:e.styleBindings)===0&&(t=Hh(null,n,e,t,i),t=sa(t,e.attrs,i),s=null);else{let o=e.directiveStylingLast;if(o===-1||n[o]!==r)if(t=Hh(r,n,e,t,i),s===null){let l=fC(n,e,i);l!==void 0&&Array.isArray(l)&&(l=Hh(null,n,e,l[1],i),l=sa(l,e.attrs,i),hC(n,e,i,l))}else s=pC(n,e,i)}return s!==void 0&&(i?e.residualClasses=s:e.residualStyles=s),t}function fC(n,e,t){let i=t?e.classBindings:e.styleBindings;if(Ks(i)!==0)return n[Qr(i)]}function hC(n,e,t,i){let r=t?e.classBindings:e.styleBindings;n[Qr(r)]=i}function pC(n,e,t){let i,r=e.directiveEnd;for(let s=1+e.directiveStylingLast;s<r;s++){let o=n[s].hostAttrs;i=sa(i,o,t)}return sa(i,e.attrs,t)}function Hh(n,e,t,i,r){let s=null,o=t.directiveEnd,a=t.directiveStylingLast;for(a===-1?a=t.directiveStart:a++;a<o&&(s=e[a],i=sa(i,s.hostAttrs,r),s!==n);)a++;return n!==null&&(t.directiveStylingLast=a),i}function sa(n,e,t){let i=t?1:2,r=-1;if(e!==null)for(let s=0;s<e.length;s++){let o=e[s];typeof o=="number"?r=o:r===i&&(Array.isArray(n)||(n=n===void 0?[]:["",n]),Av(n,o,t?!0:e[++s]))}return n===void 0?null:n}function mC(n,e,t,i,r,s,o,a){if(!(e.type&3))return;let l=n.data,c=l[a+1],u=rC(c)?Uy(l,e,t,r,Ks(c),o):void 0;if(!Ec(u)){Ec(s)||nC(c)&&(s=Uy(l,null,t,r,a,o));let d=fh(or(),t);uE(i,o,d,r,s)}}function Uy(n,e,t,i,r,s){let o=e===null,a;for(;r>0;){let l=n[r],c=Array.isArray(l),u=c?l[1]:l,d=u===null,f=t[r+1];f===Ui&&(f=d?yn:void 0);let h=d?jl(f,i):u===i?f:void 0;if(c&&!Ec(h)&&(h=jl(l,i)),Ec(h)&&(a=h,o))return a;let v=n[r+1];r=o?Qr(v):Ks(v)}if(e!==null){let l=s?e.residualClasses:e.residualStyles;l!=null&&(a=jl(l,i))}return a}function Ec(n){return n!==void 0}function gC(n,e){return n==null||n===""||(typeof e=="string"?n=n+e:typeof n=="object"&&(n=er(h_(n)))),n}function vC(n,e){return(n.flags&(e?8:16))!==0}function nt(n,e=""){let t=Ke(),i=Jt(),r=n+Zt,s=i.firstCreatePass?Pc(i,r,1,e,null):i.data[r],o=yC(i,t,s,e,n);t[r]=o,rc()&&Rp(i,t,o,s),Ws(s,!1)}var yC=(n,e,t,i,r)=>(sc(!0),DS(e[wt],i));function _C(n,e,t,i=""){return es(n,qr(),t)?e+zl(t)+i:Ui}function zn(n){return cr("",n),zn}function cr(n,e,t){let i=Ke(),r=_C(i,n,e,t);return r!==Ui&&xC(i,or(),r),cr}function xC(n,e,t){let i=fh(e,n);RS(n[wt],i,t)}function Vy(n,e,t){let i=Jt();i.firstCreatePass&&h0(e,i.data,i.blueprint,gi(n),t)}function h0(n,e,t,i,r){if(n=Yt(n),Array.isArray(n))for(let s=0;s<n.length;s++)h0(n[s],e,t,i,r);else{let s=Jt(),o=Ke(),a=xn(),l=Fr(n)?n:Yt(n.provide),c=oh(n),u=a.providerIndexes&1048575,d=a.directiveStart,f=a.providerIndexes>>20;if(Fr(n)||!n.multi){let h=new Zr(c,r,tn,null),v=Gh(l,e,r?u:u+f,d);v===-1?(jh(mc(a,o),s,l),zh(s,n,e.length),e.push(l),a.directiveStart++,a.directiveEnd++,r&&(a.providerIndexes+=1048576),t.push(h),o.push(h)):(t[v]=h,o[v]=h)}else{let h=Gh(l,e,u+f,d),v=Gh(l,e,u,u+f),y=h>=0&&t[h],m=v>=0&&t[v];if(r&&!m||!r&&!y){jh(mc(a,o),s,l);let p=SC(r?bC:MC,t.length,r,i,c,n);!r&&m&&(t[v].providerFactory=p),zh(s,n,e.length,0),e.push(l),a.directiveStart++,a.directiveEnd++,r&&(a.providerIndexes+=1048576),t.push(p),o.push(p)}else{let p=p0(t[r?v:h],c,!r&&i);zh(s,n,h>-1?h:v,p)}!r&&i&&m&&t[v].componentProviders++}}}function zh(n,e,t,i){let r=Fr(e),s=Pv(e);if(r||s){let l=(s?Yt(e.useClass):e).prototype.ngOnDestroy;if(l){let c=n.destroyHooks||(n.destroyHooks=[]);if(!r&&e.multi){let u=c.indexOf(t);u===-1?c.push(t,[i,l]):c[u+1].push(i,l)}else c.push(t,l)}}}function p0(n,e,t){return t&&n.componentProviders++,n.multi.push(e)-1}function Gh(n,e,t,i){for(let r=t;r<i;r++)if(e[r]===n)return r;return-1}function MC(n,e,t,i,r){return yp(this.multi,[])}function bC(n,e,t,i,r){let s=this.multi,o;if(this.providerFactory){let a=this.providerFactory.componentProviders,l=Ko(i,i[we],this.providerFactory.index,r);o=l.slice(0,a),yp(s,o);for(let c=a;c<l.length;c++)o.push(l[c])}else o=[],yp(s,o);return o}function yp(n,e){for(let t=0;t<n.length;t++){let i=n[t];e.push(i())}return e}function SC(n,e,t,i,r,s){let o=new Zr(n,t,tn,null);return o.multi=[],o.index=e,o.componentProviders=0,p0(o,r,i&&!t),o}function to(n,e){return t=>{t.providersResolver=(i,r)=>Vy(i,r?r(n):n,!1),e&&(t.viewProvidersResolver=(i,r)=>Vy(i,r?r(e):e,!0))}}var m0=(()=>{class n{applicationErrorHandler=je(Xr);appRef=je(fa);taskService=je($s);ngZone=je(Nn);zonelessEnabled=je(Yo);tracing=je(ca,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new ln;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Uo):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(je(Nh,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let t=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(t);return}this.switchToMicrotaskScheduler(),this.taskService.remove(t)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let t=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(t)})})}notify(t){if(!this.zonelessEnabled&&t===5)return;switch(t){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?cy:Ah;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Uo+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let t=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(t),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let t=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(t)}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=yt({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function g0(){return[{provide:Fs,useExisting:m0},{provide:Nn,useClass:Vo},{provide:Yo,useValue:!0}]}function EC(){return typeof $localize<"u"&&$localize.locale||ma}var zp=new He("",{factory:()=>je(zp,{optional:!0,skipSelf:!0})||EC()});function kt(n,e){return gl(n,e?.equal)}var Gp=new He(""),NC=new He("");function ga(n){return!n.moduleRef}function PC(n){let e=ga(n)?n.r3Injector:n.moduleRef.injector,t=e.get(Nn);return t.run(()=>{ga(n)?n.r3Injector.resolveInjectorInitializers():n.moduleRef.resolveInjectorInitializers();let i=e.get(Xr),r;if(t.runOutsideAngular(()=>{r=t.onError.subscribe({next:i})}),ga(n)){let s=()=>e.destroy(),o=n.platformInjector.get(Gp);o.add(s),e.onDestroy(()=>{r.unsubscribe(),o.delete(s)})}else{let s=()=>n.moduleRef.destroy(),o=n.platformInjector.get(Gp);o.add(s),n.moduleRef.onDestroy(()=>{Jo(n.allPlatformModules,n.moduleRef),r.unsubscribe(),o.delete(s)})}return LC(i,t,()=>{let s=e.get($s),o=s.add(),a=e.get(Bp);return a.runInitializers(),a.donePromise.then(()=>{let l=e.get(zp,ma);if(f0(l||ma),!e.get(NC,!0))return ga(n)?e.get(fa):(n.allPlatformModules.push(n.moduleRef),n.moduleRef);if(ga(n)){let u=e.get(fa);return n.rootComponent!==void 0&&u.bootstrap(n.rootComponent),u}else return OC?.(n.moduleRef,n.allPlatformModules),n.moduleRef}).finally(()=>{s.remove(o)})})})}var OC;function LC(n,e,t){try{let i=t();return da(i)?i.catch(r=>{throw e.runOutsideAngular(()=>n(r)),r}):i}catch(i){throw e.runOutsideAngular(()=>n(i)),i}}var zc=null;function FC(n=[],e){return nr.create({name:e,providers:[{provide:Ho,useValue:"platform"},{provide:Gp,useValue:new Set([()=>zc=null])},...n]})}function kC(n=[]){if(zc)return zc;let e=FC(n);return zc=e,c0(),UC(e),e}function UC(n){let e=n.get(Cc,null);ql(n,()=>{e?.forEach(t=>t())})}var VC=1e4;var JH=VC-1e3;function v0(n){let{rootComponent:e,appProviders:t,platformProviders:i,platformRef:r}=n;pt(it.BootstrapApplicationStart);try{let s=r?.injector??kC(i),o=[g0(),dy,...t||[]],a=new ra({providers:o,parent:s,debugName:"",runEnvironmentInitializers:!1});return PC({r3Injector:a.injector,platformInjector:s,rootComponent:e})}catch(s){return Promise.reject(s)}finally{pt(it.BootstrapApplicationEnd)}}var y0=null;function ur(){return y0}function Wp(n){y0??=n}var ya=class{};function jp(n,e){e=encodeURIComponent(e);for(let t of n.split(";")){let i=t.indexOf("="),[r,s]=i==-1?[t,""]:[t.slice(0,i),t.slice(i+1)];if(r.trim()===e)return decodeURIComponent(s)}return null}var _a=class{};var _0="browser";var xa=class{_doc;constructor(e){this._doc=e}manager},Gc=(()=>{class n extends xa{constructor(t){super(t)}supports(t){return!0}addEventListener(t,i,r,s){return t.addEventListener(i,r,s),()=>this.removeEventListener(t,i,r,s)}removeEventListener(t,i,r,s){return t.removeEventListener(i,r,s)}static \u0275fac=function(i){return new(i||n)(ht(Un))};static \u0275prov=yt({token:n,factory:n.\u0275fac})}return n})(),$c=new He(""),Yp=(()=>{class n{_zone;_plugins;_eventNameToPlugin=new Map;constructor(t,i){this._zone=i,t.forEach(o=>{o.manager=this});let r=t.filter(o=>!(o instanceof Gc));this._plugins=r.slice().reverse();let s=t.find(o=>o instanceof Gc);s&&this._plugins.push(s)}addEventListener(t,i,r,s){return this._findPluginFor(i).addEventListener(t,i,r,s)}getZone(){return this._zone}_findPluginFor(t){let i=this._eventNameToPlugin.get(t);if(i)return i;if(i=this._plugins.find(s=>s.supports(t)),!i)throw new Xe(5101,!1);return this._eventNameToPlugin.set(t,i),i}static \u0275fac=function(i){return new(i||n)(ht($c),ht(Nn))};static \u0275prov=yt({token:n,factory:n.\u0275fac})}return n})(),$p="ng-app-id";function x0(n){for(let e of n)e.remove()}function M0(n,e){let t=e.createElement("style");return t.textContent=n,t}function BC(n,e,t,i){let r=n.head?.querySelectorAll(`style[${$p}="${e}"],link[${$p}="${e}"]`);if(r)for(let s of r)s.removeAttribute($p),s instanceof HTMLLinkElement?i.set(s.href.slice(s.href.lastIndexOf("/")+1),{usage:0,elements:[s]}):s.textContent&&t.set(s.textContent,{usage:0,elements:[s]})}function Xp(n,e){let t=e.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href",n),t}var Zp=(()=>{class n{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(t,i,r,s={}){this.doc=t,this.appId=i,this.nonce=r,BC(t,i,this.inline,this.external),this.hosts.add(t.head)}addStyles(t,i){for(let r of t)this.addUsage(r,this.inline,M0);i?.forEach(r=>this.addUsage(r,this.external,Xp))}removeStyles(t,i){for(let r of t)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(t,i,r){let s=i.get(t);s?s.usage++:i.set(t,{usage:1,elements:[...this.hosts].map(o=>this.addElement(o,r(t,this.doc)))})}removeUsage(t,i){let r=i.get(t);r&&(r.usage--,r.usage<=0&&(x0(r.elements),i.delete(t)))}ngOnDestroy(){for(let[,{elements:t}]of[...this.inline,...this.external])x0(t);this.hosts.clear()}addHost(t){this.hosts.add(t);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(t,M0(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(t,Xp(i,this.doc)))}removeHost(t){this.hosts.delete(t)}addElement(t,i){return this.nonce&&i.setAttribute("nonce",this.nonce),t.appendChild(i)}static \u0275fac=function(i){return new(i||n)(ht(Un),ht(wc),ht(Tc,8),ht(la))};static \u0275prov=yt({token:n,factory:n.\u0275fac})}return n})(),qp={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Jp=/%COMP%/g;var S0="%COMP%",HC=`_nghost-${S0}`,zC=`_ngcontent-${S0}`,GC=!0,WC=new He("",{factory:()=>GC});function jC(n){return zC.replace(Jp,n)}function $C(n){return HC.replace(Jp,n)}function E0(n,e){return e.map(t=>t.replace(Jp,n))}var Kp=(()=>{class n{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(t,i,r,s,o,a,l=null,c=null){this.eventManager=t,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=s,this.doc=o,this.ngZone=a,this.nonce=l,this.tracingService=c,this.defaultRenderer=new Ma(t,o,a,this.tracingService)}createRenderer(t,i){if(!t||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(t,i);return r instanceof jc?r.applyToHost(t):r instanceof ba&&r.applyStyles(),r}getOrCreateRenderer(t,i){let r=this.rendererByCompId,s=r.get(i.id);if(!s){let o=this.doc,a=this.ngZone,l=this.eventManager,c=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.tracingService;switch(i.encapsulation){case Qn.Emulated:s=new jc(l,c,i,this.appId,u,o,a,d);break;case Qn.ShadowDom:return new Wc(l,t,i,o,a,this.nonce,d,c);case Qn.ExperimentalIsolatedShadowDom:return new Wc(l,t,i,o,a,this.nonce,d);default:s=new ba(l,c,i,u,o,a,d);break}r.set(i.id,s)}return s}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(t){this.rendererByCompId.delete(t)}static \u0275fac=function(i){return new(i||n)(ht(Yp),ht(Zp),ht(wc),ht(WC),ht(Un),ht(Nn),ht(Tc),ht(ca,8))};static \u0275prov=yt({token:n,factory:n.\u0275fac})}return n})(),Ma=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(e,t,i,r){this.eventManager=e,this.doc=t,this.ngZone=i,this.tracingService=r}destroy(){}destroyNode=null;createElement(e,t){return t?this.doc.createElementNS(qp[t]||t,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,t){(b0(e)?e.content:e).appendChild(t)}insertBefore(e,t,i){e&&(b0(e)?e.content:e).insertBefore(t,i)}removeChild(e,t){t.remove()}selectRootElement(e,t){let i=typeof e=="string"?this.doc.querySelector(e):e;if(!i)throw new Xe(-5104,!1);return t||(i.textContent=""),i}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,t,i,r){if(r){t=r+":"+t;let s=qp[r];s?e.setAttributeNS(s,t,i):e.setAttribute(t,i)}else e.setAttribute(t,i)}removeAttribute(e,t,i){if(i){let r=qp[i];r?e.removeAttributeNS(r,t):e.removeAttribute(`${i}:${t}`)}else e.removeAttribute(t)}addClass(e,t){e.classList.add(t)}removeClass(e,t){e.classList.remove(t)}setStyle(e,t,i,r){r&(ki.DashCase|ki.Important)?e.style.setProperty(t,i,r&ki.Important?"important":""):e.style[t]=i}removeStyle(e,t,i){i&ki.DashCase?e.style.removeProperty(t):e.style[t]=""}setProperty(e,t,i){e!=null&&(e[t]=i)}setValue(e,t){e.nodeValue=t}listen(e,t,i,r){if(typeof e=="string"&&(e=ur().getGlobalEventTarget(this.doc,e),!e))throw new Xe(5102,!1);let s=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(s=this.tracingService.wrapEventListener(e,t,s)),this.eventManager.addEventListener(e,t,s,r)}decoratePreventDefault(e){return t=>{if(t==="__ngUnwrap__")return e;e(t)===!1&&t.preventDefault()}}};function b0(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var Wc=class extends Ma{hostEl;sharedStylesHost;shadowRoot;constructor(e,t,i,r,s,o,a,l){super(e,r,s,a),this.hostEl=t,this.sharedStylesHost=l,this.shadowRoot=t.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let c=i.styles;c=E0(i.id,c);for(let d of c){let f=document.createElement("style");o&&f.setAttribute("nonce",o),f.textContent=d,this.shadowRoot.appendChild(f)}let u=i.getExternalStyles?.();if(u)for(let d of u){let f=Xp(d,r);o&&f.setAttribute("nonce",o),this.shadowRoot.appendChild(f)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,t){return super.appendChild(this.nodeOrShadowRoot(e),t)}insertBefore(e,t,i){return super.insertBefore(this.nodeOrShadowRoot(e),t,i)}removeChild(e,t){return super.removeChild(null,t)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},ba=class extends Ma{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(e,t,i,r,s,o,a,l){super(e,s,o,a),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=r;let c=i.styles;this.styles=l?E0(l,c):c,this.styleUrls=i.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&Jr.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},jc=class extends ba{contentAttr;hostAttr;constructor(e,t,i,r,s,o,a,l){let c=r+"-"+i.id;super(e,t,i,s,o,a,l,c),this.contentAttr=jC(c),this.hostAttr=$C(c)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,t){let i=super.createElement(e,t);return super.setAttribute(i,this.contentAttr,""),i}};var qc=class n extends ya{supportsDOMEvents=!0;static makeCurrent(){Wp(new n)}onAndCancel(e,t,i,r){return e.addEventListener(t,i,r),()=>{e.removeEventListener(t,i,r)}}dispatchEvent(e,t){e.dispatchEvent(t)}remove(e){e.remove()}createElement(e,t){return t=t||this.getDefaultDocument(),t.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,t){return t==="window"?window:t==="document"?e:t==="body"?e.body:null}getBaseHref(e){let t=qC();return t==null?null:XC(t)}resetBaseElement(){Sa=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return jp(document.cookie,e)}},Sa=null;function qC(){return Sa=Sa||document.head.querySelector("base"),Sa?Sa.getAttribute("href"):null}function XC(n){return new URL(n,document.baseURI).pathname}var YC=(()=>{class n{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||n)};static \u0275prov=yt({token:n,factory:n.\u0275fac})}return n})(),w0=["alt","control","meta","shift"],ZC={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},JC={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},C0=(()=>{class n extends xa{constructor(t){super(t)}supports(t){return n.parseEventName(t)!=null}addEventListener(t,i,r,s){let o=n.parseEventName(i),a=n.eventCallback(o.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>ur().onAndCancel(t,o.domEventName,a,s))}static parseEventName(t){let i=t.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let s=n._normalizeKey(i.pop()),o="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),o="code."),w0.forEach(c=>{let u=i.indexOf(c);u>-1&&(i.splice(u,1),o+=c+".")}),o+=s,i.length!=0||s.length===0)return null;let l={};return l.domEventName=r,l.fullKey=o,l}static matchEventFullKeyCode(t,i){let r=ZC[t.key]||t.key,s="";return i.indexOf("code.")>-1&&(r=t.code,s="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),w0.forEach(o=>{if(o!==r){let a=JC[o];a(t)&&(s+=o+".")}}),s+=r,s===i)}static eventCallback(t,i,r){return s=>{n.matchEventFullKeyCode(s,t)&&r.runGuarded(()=>i(s))}}static _normalizeKey(t){return t==="esc"?"escape":t}static \u0275fac=function(i){return new(i||n)(ht(Un))};static \u0275prov=yt({token:n,factory:n.\u0275fac})}return n})();async function Qp(n,e,t){let i=$e({rootComponent:n},KC(e,t));return v0(i)}function KC(n,e){return{platformRef:e?.platformRef,appProviders:[...iT,...n?.providers??[]],platformProviders:nT}}function QC(){qc.makeCurrent()}function eT(){return new Ni}function tT(){return bp(document),document}var nT=[{provide:la,useValue:_0},{provide:Cc,useValue:QC,multi:!0},{provide:Un,useFactory:tT}];var iT=[{provide:Ho,useValue:"root"},{provide:Ni,useFactory:eT},{provide:$c,useClass:Gc,multi:!0},{provide:$c,useClass:C0,multi:!0},Kp,Zp,Yp,{provide:Kr,useExisting:Kp},{provide:_a,useClass:YC},[]];var T0={providers:[Rh()]};var O0=(()=>{class n{_renderer;_elementRef;onChange=t=>{};onTouched=()=>{};constructor(t,i){this._renderer=t,this._elementRef=i}setProperty(t,i){this._renderer.setProperty(this._elementRef.nativeElement,t,i)}registerOnTouched(t){this.onTouched=t}registerOnChange(t){this.onChange=t}setDisabledState(t){this.setProperty("disabled",t)}static \u0275fac=function(i){return new(i||n)(tn(Fc),tn(lr))};static \u0275dir=ts({type:n})}return n})(),rT=(()=>{class n extends O0{static \u0275fac=(()=>{let t;return function(r){return(t||(t=xp(n)))(r||n)}})();static \u0275dir=ts({type:n,features:[ns]})}return n})(),L0=new He("");var sT={provide:L0,useExisting:Ur(()=>Kc),multi:!0};function oT(){let n=ur()?ur().getUserAgent():"";return/android (\d+)/.test(n.toLowerCase())}var aT=new He(""),Kc=(()=>{class n extends O0{_compositionMode;_composing=!1;constructor(t,i,r){super(t,i),this._compositionMode=r,this._compositionMode==null&&(this._compositionMode=!oT())}writeValue(t){let i=t??"";this.setProperty("value",i)}_handleInput(t){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(t)}_compositionStart(){this._composing=!0}_compositionEnd(t){this._composing=!1,this._compositionMode&&this.onChange(t)}static \u0275fac=function(i){return new(i||n)(tn(Fc),tn(lr),tn(aT,8))};static \u0275dir=ts({type:n,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(i,r){i&1&&Hn("input",function(o){return r._handleInput(o.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(o){return r._compositionEnd(o.target.value)})},standalone:!1,features:[to([sT]),ns]})}return n})();var lT=new He(""),cT=new He("");function F0(n){return n!=null}function k0(n){return da(n)?Cf(n):n}function U0(n){let e={};return n.forEach(t=>{e=t!=null?$e($e({},e),t):e}),Object.keys(e).length===0?null:e}function V0(n,e){return e.map(t=>t(n))}function uT(n){return!n.validate}function B0(n){return n.map(e=>uT(e)?e:t=>e.validate(t))}function dT(n){if(!n)return null;let e=n.filter(F0);return e.length==0?null:function(t){return U0(V0(t,e))}}function H0(n){return n!=null?dT(B0(n)):null}function fT(n){if(!n)return null;let e=n.filter(F0);return e.length==0?null:function(t){let i=V0(t,e).map(k0);return Tf(i).pipe(Nr(U0))}}function z0(n){return n!=null?fT(B0(n)):null}function A0(n,e){return n===null?[e]:Array.isArray(n)?[...n,e]:[n,e]}function G0(n){return n._rawValidators}function W0(n){return n._rawAsyncValidators}function em(n){return n?Array.isArray(n)?n:[n]:[]}function Yc(n,e){return Array.isArray(n)?n.includes(e):n===e}function I0(n,e){let t=em(e);return em(n).forEach(r=>{Yc(t,r)||t.push(r)}),t}function D0(n,e){return em(e).filter(t=>!Yc(n,t))}var tm=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(e){this._rawValidators=e||[],this._composedValidatorFn=H0(this._rawValidators)}_setAsyncValidators(e){this._rawAsyncValidators=e||[],this._composedAsyncValidatorFn=z0(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(e){this._onDestroyCallbacks.push(e)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(e=>e()),this._onDestroyCallbacks=[]}reset(e=void 0){this.control&&this.control.reset(e)}hasError(e,t){return this.control?this.control.hasError(e,t):!1}getError(e,t){return this.control?this.control.getError(e,t):null}};var Aa=class extends tm{_parent=null;name=null;valueAccessor=null},nm=class{_cd;constructor(e){this._cd=e}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var j0=(()=>{class n extends nm{constructor(t){super(t)}static \u0275fac=function(i){return new(i||n)(tn(Aa,2))};static \u0275dir=ts({type:n,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(i,r){i&2&&ti("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)},standalone:!1,features:[ns]})}return n})();var Ea="VALID",Xc="INVALID",no="PENDING",wa="DISABLED",is=class{},Zc=class extends is{value;source;constructor(e,t){super(),this.value=e,this.source=t}},Ca=class extends is{pristine;source;constructor(e,t){super(),this.pristine=e,this.source=t}},Ta=class extends is{touched;source;constructor(e,t){super(),this.touched=e,this.source=t}},io=class extends is{status;source;constructor(e,t){super(),this.status=e,this.source=t}};var im=class extends is{source;constructor(e){super(),this.source=e}};function hT(n){return(Qc(n)?n.validators:n)||null}function pT(n){return Array.isArray(n)?H0(n):n||null}function mT(n,e){return(Qc(e)?e.asyncValidators:n)||null}function gT(n){return Array.isArray(n)?z0(n):n||null}function Qc(n){return n!=null&&!Array.isArray(n)&&typeof n=="object"}var rm=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(e,t){this._assignValidators(e),this._assignAsyncValidators(t)}get validator(){return this._composedValidatorFn}set validator(e){this._rawValidators=this._composedValidatorFn=e}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(e){this._rawAsyncValidators=this._composedAsyncValidatorFn=e}get parent(){return this._parent}get status(){return Fi(this.statusReactive)}set status(e){Fi(()=>this.statusReactive.set(e))}_status=kt(()=>this.statusReactive());statusReactive=At(void 0);get valid(){return this.status===Ea}get invalid(){return this.status===Xc}get pending(){return this.status==no}get disabled(){return this.status===wa}get enabled(){return this.status!==wa}errors;get pristine(){return Fi(this.pristineReactive)}set pristine(e){Fi(()=>this.pristineReactive.set(e))}_pristine=kt(()=>this.pristineReactive());pristineReactive=At(!0);get dirty(){return!this.pristine}get touched(){return Fi(this.touchedReactive)}set touched(e){Fi(()=>this.touchedReactive.set(e))}_touched=kt(()=>this.touchedReactive());touchedReactive=At(!1);get untouched(){return!this.touched}_events=new qn;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(e){this._assignValidators(e)}setAsyncValidators(e){this._assignAsyncValidators(e)}addValidators(e){this.setValidators(I0(e,this._rawValidators))}addAsyncValidators(e){this.setAsyncValidators(I0(e,this._rawAsyncValidators))}removeValidators(e){this.setValidators(D0(e,this._rawValidators))}removeAsyncValidators(e){this.setAsyncValidators(D0(e,this._rawAsyncValidators))}hasValidator(e){return Yc(this._rawValidators,e)}hasAsyncValidator(e){return Yc(this._rawAsyncValidators,e)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(e={}){let t=this.touched===!1;this.touched=!0;let i=e.sourceControl??this;this._parent&&!e.onlySelf&&this._parent.markAsTouched(St($e({},e),{sourceControl:i})),t&&e.emitEvent!==!1&&this._events.next(new Ta(!0,i))}markAllAsDirty(e={}){this.markAsDirty({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsDirty(e))}markAllAsTouched(e={}){this.markAsTouched({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsTouched(e))}markAsUntouched(e={}){let t=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let i=e.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:i})}),this._parent&&!e.onlySelf&&this._parent._updateTouched(e,i),t&&e.emitEvent!==!1&&this._events.next(new Ta(!1,i))}markAsDirty(e={}){let t=this.pristine===!0;this.pristine=!1;let i=e.sourceControl??this;this._parent&&!e.onlySelf&&this._parent.markAsDirty(St($e({},e),{sourceControl:i})),t&&e.emitEvent!==!1&&this._events.next(new Ca(!1,i))}markAsPristine(e={}){let t=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let i=e.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:!0,emitEvent:e.emitEvent})}),this._parent&&!e.onlySelf&&this._parent._updatePristine(e,i),t&&e.emitEvent!==!1&&this._events.next(new Ca(!0,i))}markAsPending(e={}){this.status=no;let t=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new io(this.status,t)),this.statusChanges.emit(this.status)),this._parent&&!e.onlySelf&&this._parent.markAsPending(St($e({},e),{sourceControl:t}))}disable(e={}){let t=this._parentMarkedDirty(e.onlySelf);this.status=wa,this.errors=null,this._forEachChild(r=>{r.disable(St($e({},e),{onlySelf:!0}))}),this._updateValue();let i=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new Zc(this.value,i)),this._events.next(new io(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(St($e({},e),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(r=>r(!0))}enable(e={}){let t=this._parentMarkedDirty(e.onlySelf);this.status=Ea,this._forEachChild(i=>{i.enable(St($e({},e),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent}),this._updateAncestors(St($e({},e),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(e,t){this._parent&&!e.onlySelf&&(this._parent.updateValueAndValidity(e),e.skipPristineCheck||this._parent._updatePristine({},t),this._parent._updateTouched({},t))}setParent(e){this._parent=e}getRawValue(){return this.value}updateValueAndValidity(e={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Ea||this.status===no)&&this._runAsyncValidator(i,e.emitEvent)}let t=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new Zc(this.value,t)),this._events.next(new io(this.status,t)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!e.onlySelf&&this._parent.updateValueAndValidity(St($e({},e),{sourceControl:t}))}_updateTreeValidity(e={emitEvent:!0}){this._forEachChild(t=>t._updateTreeValidity(e)),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?wa:Ea}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(e,t){if(this.asyncValidator){this.status=no,this._hasOwnPendingAsyncValidator={emitEvent:t!==!1,shouldHaveEmitted:e!==!1};let i=k0(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:t,shouldHaveEmitted:e})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let e=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,e}return!1}setErrors(e,t={}){this.errors=e,this._updateControlsErrors(t.emitEvent!==!1,this,t.shouldHaveEmitted)}get(e){let t=e;return t==null||(Array.isArray(t)||(t=t.split(".")),t.length===0)?null:t.reduce((i,r)=>i&&i._find(r),this)}getError(e,t){let i=t?this.get(t):this;return i&&i.errors?i.errors[e]:null}hasError(e,t){return!!this.getError(e,t)}get root(){let e=this;for(;e._parent;)e=e._parent;return e}_updateControlsErrors(e,t,i){this.status=this._calculateStatus(),e&&this.statusChanges.emit(this.status),(e||i)&&this._events.next(new io(this.status,t)),this._parent&&this._parent._updateControlsErrors(e,t,i)}_initObservables(){this.valueChanges=new vt,this.statusChanges=new vt}_calculateStatus(){return this._allControlsDisabled()?wa:this.errors?Xc:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(no)?no:this._anyControlsHaveStatus(Xc)?Xc:Ea}_anyControlsHaveStatus(e){return this._anyControls(t=>t.status===e)}_anyControlsDirty(){return this._anyControls(e=>e.dirty)}_anyControlsTouched(){return this._anyControls(e=>e.touched)}_updatePristine(e,t){let i=!this._anyControlsDirty(),r=this.pristine!==i;this.pristine=i,this._parent&&!e.onlySelf&&this._parent._updatePristine(e,t),r&&this._events.next(new Ca(this.pristine,t))}_updateTouched(e={},t){this.touched=this._anyControlsTouched(),this._events.next(new Ta(this.touched,t)),this._parent&&!e.onlySelf&&this._parent._updateTouched(e,t)}_onDisabledChange=[];_registerOnCollectionChange(e){this._onCollectionChange=e}_setUpdateStrategy(e){Qc(e)&&e.updateOn!=null&&(this._updateOn=e.updateOn)}_parentMarkedDirty(e){let t=this._parent&&this._parent.dirty;return!e&&!!t&&!this._parent._anyControlsDirty()}_find(e){return null}_assignValidators(e){this._rawValidators=Array.isArray(e)?e.slice():e,this._composedValidatorFn=pT(this._rawValidators)}_assignAsyncValidators(e){this._rawAsyncValidators=Array.isArray(e)?e.slice():e,this._composedAsyncValidatorFn=gT(this._rawAsyncValidators)}};var $0=new He("",{factory:()=>sm}),sm="always";function vT(n,e,t=sm){_T(n,e),e.valueAccessor.writeValue(n.value),(n.disabled||t==="always")&&e.valueAccessor.setDisabledState?.(n.disabled),MT(n,e),ST(n,e),bT(n,e),yT(n,e)}function R0(n,e,t=!0){let i=()=>{};e.valueAccessor&&(e.valueAccessor.registerOnChange(i),e.valueAccessor.registerOnTouched(i)),xT(n,e),n&&(e._invokeOnDestroyCallbacks(),n._registerOnCollectionChange(()=>{}))}function Jc(n,e){n.forEach(t=>{t.registerOnValidatorChange&&t.registerOnValidatorChange(e)})}function yT(n,e){if(e.valueAccessor.setDisabledState){let t=i=>{e.valueAccessor.setDisabledState(i)};n.registerOnDisabledChange(t),e._registerOnDestroy(()=>{n._unregisterOnDisabledChange(t)})}}function _T(n,e){let t=G0(n);e.validator!==null?n.setValidators(A0(t,e.validator)):typeof t=="function"&&n.setValidators([t]);let i=W0(n);e.asyncValidator!==null?n.setAsyncValidators(A0(i,e.asyncValidator)):typeof i=="function"&&n.setAsyncValidators([i]);let r=()=>n.updateValueAndValidity();Jc(e._rawValidators,r),Jc(e._rawAsyncValidators,r)}function xT(n,e){let t=!1;if(n!==null){if(e.validator!==null){let r=G0(n);if(Array.isArray(r)&&r.length>0){let s=r.filter(o=>o!==e.validator);s.length!==r.length&&(t=!0,n.setValidators(s))}}if(e.asyncValidator!==null){let r=W0(n);if(Array.isArray(r)&&r.length>0){let s=r.filter(o=>o!==e.asyncValidator);s.length!==r.length&&(t=!0,n.setAsyncValidators(s))}}}let i=()=>{};return Jc(e._rawValidators,i),Jc(e._rawAsyncValidators,i),t}function MT(n,e){e.valueAccessor.registerOnChange(t=>{n._pendingValue=t,n._pendingChange=!0,n._pendingDirty=!0,n.updateOn==="change"&&q0(n,e)})}function bT(n,e){e.valueAccessor.registerOnTouched(()=>{n._pendingTouched=!0,n.updateOn==="blur"&&n._pendingChange&&q0(n,e),n.updateOn!=="submit"&&n.markAsTouched()})}function q0(n,e){n._pendingDirty&&n.markAsDirty(),n.setValue(n._pendingValue,{emitModelToViewChange:!1}),e.viewToModelUpdate(n._pendingValue),n._pendingChange=!1}function ST(n,e){let t=(i,r)=>{e.valueAccessor.writeValue(i),r&&e.viewToModelUpdate(i)};n.registerOnChange(t),e._registerOnDestroy(()=>{n._unregisterOnChange(t)})}function ET(n,e){if(!n.hasOwnProperty("model"))return!1;let t=n.model;return t.isFirstChange()?!0:!Object.is(e,t.currentValue)}function wT(n){return Object.getPrototypeOf(n.constructor)===rT}function CT(n,e){if(!e)return null;Array.isArray(e);let t,i,r;return e.forEach(s=>{s.constructor===Kc?t=s:wT(s)?i=s:r=s}),r||i||t||null}function N0(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}function P0(n){return typeof n=="object"&&n!==null&&Object.keys(n).length===2&&"value"in n&&"disabled"in n}var om=class extends rm{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(e=null,t,i){super(hT(t),mT(i,t)),this._applyFormState(e),this._setUpdateStrategy(t),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),Qc(t)&&(t.nonNullable||t.initialValueIsDefault)&&(P0(e)?this.defaultValue=e.value:this.defaultValue=e)}setValue(e,t={}){this.value=this._pendingValue=e,this._onChange.length&&t.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,t.emitViewToModelChange!==!1)),this.updateValueAndValidity(t)}patchValue(e,t={}){this.setValue(e,t)}reset(e=this.defaultValue,t={}){this._applyFormState(e),this.markAsPristine(t),this.markAsUntouched(t),this.setValue(this.value,t),t.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,t?.emitEvent!==!1&&this._events.next(new im(this))}_updateValue(){}_anyControls(e){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(e){this._onChange.push(e)}_unregisterOnChange(e){N0(this._onChange,e)}registerOnDisabledChange(e){this._onDisabledChange.push(e)}_unregisterOnDisabledChange(e){N0(this._onDisabledChange,e)}_forEachChild(e){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(e){P0(e)?(this.value=this._pendingValue=e.value,e.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=e}};var X0=new He(""),TT={provide:Aa,useExisting:Ur(()=>am)},am=(()=>{class n extends Aa{_ngModelWarningConfig;callSetDisabledState;viewModel;form;set isDisabled(t){}model;update=new vt;static _ngModelWarningSentOnce=!1;_ngModelWarningSent=!1;constructor(t,i,r,s,o){super(),this._ngModelWarningConfig=s,this.callSetDisabledState=o,this._setValidators(t),this._setAsyncValidators(i),this.valueAccessor=CT(this,r)}ngOnChanges(t){if(this._isControlChanged(t)){let i=t.form.previousValue;i&&R0(i,this,!1),vT(this.form,this,this.callSetDisabledState),this.form.updateValueAndValidity({emitEvent:!1})}ET(t,this.viewModel)&&(this.form.setValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.form&&R0(this.form,this,!1)}get path(){return[]}get control(){return this.form}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t)}_isControlChanged(t){return t.hasOwnProperty("form")}static \u0275fac=function(i){return new(i||n)(tn(lT,10),tn(cT,10),tn(L0,10),tn(X0,8),tn($0,8))};static \u0275dir=ts({type:n,selectors:[["","formControl",""]],inputs:{form:[0,"formControl","form"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},exportAs:["ngForm"],standalone:!1,features:[to([TT]),ns,aa]})}return n})();var AT=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=ua({type:n});static \u0275inj=ks({})}return n})();var eu=(()=>{class n{static withConfig(t){return{ngModule:n,providers:[{provide:X0,useValue:t.warnOnNgModelWithFormControl??"always"},{provide:$0,useValue:t.callSetDisabledState??sm}]}}static \u0275fac=function(i){return new(i||n)};static \u0275mod=ua({type:n});static \u0275inj=ks({imports:[AT]})}return n})();var fx=0,Um=1,hx=2;var Ja=1,px=2,Eo=3,Xi=0,cn=1,wi=2,Ci=0,us=1,Vm=2,Bm=3,Hm=4,mx=5,yr=100,gx=101,vx=102,yx=103,_x=104,xx=200,Mx=201,bx=202,Sx=203,xu=204,Mu=205,Ex=206,wx=207,Cx=208,Tx=209,Ax=210,Ix=211,Dx=212,Rx=213,Nx=214,Wu=0,ju=1,$u=2,ds=3,qu=4,Xu=5,Yu=6,Zu=7,zm=0,Px=1,Ox=2,ai=0,Gm=1,Wm=2,jm=3,$m=4,qm=5,Xm=6,Ym=7;var Rm=300,Sr=301,ys=302,Ju=303,Ku=304,Ka=306,bu=1e3,bi=1001,Su=1002,Xt=1003,Lx=1004;var Qa=1005;var Qt=1006,Qu=1007;var Er=1008;var An=1009,Zm=1010,Jm=1011,wo=1012,ed=1013,li=1014,ci=1015,Ti=1016,td=1017,nd=1018,Co=1020,Km=35902,Qm=35899,eg=1021,tg=1022,jn=1023,Si=1026,wr=1027,ng=1028,id=1029,_s=1030,rd=1031;var sd=1033,el=33776,tl=33777,nl=33778,il=33779,od=35840,ad=35841,ld=35842,cd=35843,ud=36196,dd=37492,fd=37496,hd=37488,pd=37489,md=37490,gd=37491,vd=37808,yd=37809,_d=37810,xd=37811,Md=37812,bd=37813,Sd=37814,Ed=37815,wd=37816,Cd=37817,Td=37818,Ad=37819,Id=37820,Dd=37821,Rd=36492,Nd=36494,Pd=36495,Od=36283,Ld=36284,Fd=36285,kd=36286;var Oa=2300,Eu=2301,_u=2302,Nm=2400,Pm=2401,Om=2402;var Fx=3200;var kx=0,Ux=1,Ji="",En="srgb",fs="srgb-linear",La="linear",at="srgb";var ls=7680;var Lm=519,Vx=512,Bx=513,Hx=514,Ud=515,zx=516,Gx=517,Vd=518,Wx=519,Fm=35044;var ig="300 es",oi=2e3,Fa=2001;function rg(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function DT(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function ka(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function jx(){let n=ka("canvas");return n.style.display="block",n}var Y0={},yo=null;function sg(...n){let e="THREE."+n.shift();yo?yo("log",e,...n):console.log(e,...n)}function De(...n){let e="THREE."+n.shift();yo?yo("warn",e,...n):console.warn(e,...n)}function Ae(...n){let e="THREE."+n.shift();yo?yo("error",e,...n):console.error(e,...n)}function _o(...n){let e=n.join(" ");e in Y0||(Y0[e]=!0,De(...n))}function $x(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var Yi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var lm=Math.PI/180,wu=180/Math.PI;function rl(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(nn[n&255]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]+"-"+nn[e&255]+nn[e>>8&255]+"-"+nn[e>>16&15|64]+nn[e>>24&255]+"-"+nn[t&63|128]+nn[t>>8&255]+"-"+nn[t>>16&255]+nn[t>>24&255]+nn[i&255]+nn[i>>8&255]+nn[i>>16&255]+nn[i>>24&255]).toLowerCase()}function Ye(n,e,t){return Math.max(e,Math.min(t,n))}function RT(n,e){return(n%e+e)%e}function cm(n,e,t){return(1-t)*n+t*e}function Ia(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function fn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var Qe=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Zi=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3],f=s[o+0],h=s[o+1],v=s[o+2],y=s[o+3];if(a<=0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a>=1){e[t+0]=f,e[t+1]=h,e[t+2]=v,e[t+3]=y;return}if(d!==y||l!==f||c!==h||u!==v){let m=l*f+c*h+u*v+d*y;m<0&&(f=-f,h=-h,v=-v,y=-y,m=-m);let p=1-a;if(m<.9995){let S=Math.acos(m),w=Math.sin(S);p=Math.sin(p*S)/w,a=Math.sin(a*S)/w,l=l*p+f*a,c=c*p+h*a,u=u*p+v*a,d=d*p+y*a}else{l=l*p+f*a,c=c*p+h*a,u=u*p+v*a,d=d*p+y*a;let S=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=S,c*=S,u*=S,d*=S}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){let a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[o],f=s[o+1],h=s[o+2],v=s[o+3];return e[t]=a*v+u*d+l*h-c*f,e[t+1]=l*v+u*f+c*d-a*h,e[t+2]=c*v+u*h+a*f-l*d,e[t+3]=u*v-a*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),d=a(s/2),f=l(i/2),h=l(r/2),v=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*h*v,this._y=c*h*d-f*u*v,this._z=c*u*v+f*h*d,this._w=c*u*d-f*h*v;break;case"YXZ":this._x=f*u*d+c*h*v,this._y=c*h*d-f*u*v,this._z=c*u*v-f*h*d,this._w=c*u*d+f*h*v;break;case"ZXY":this._x=f*u*d-c*h*v,this._y=c*h*d+f*u*v,this._z=c*u*v+f*h*d,this._w=c*u*d-f*h*v;break;case"ZYX":this._x=f*u*d-c*h*v,this._y=c*h*d+f*u*v,this._z=c*u*v-f*h*d,this._w=c*u*d+f*h*v;break;case"YZX":this._x=f*u*d+c*h*v,this._y=c*h*d+f*u*v,this._z=c*u*v-f*h*d,this._w=c*u*d-f*h*v;break;case"XZY":this._x=f*u*d-c*h*v,this._y=c*h*d-f*u*v,this._z=c*u*v+f*h*d,this._w=c*u*d+f*h*v;break;default:De("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=i+a+d;if(f>0){let h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(o-r)*h}else if(i>a&&i>d){let h=2*Math.sqrt(1+i-a-d);this._w=(u-l)/h,this._x=.25*h,this._y=(r+o)/h,this._z=(s+c)/h}else if(a>d){let h=2*Math.sqrt(1+a-i-d);this._w=(s-c)/h,this._x=(r+o)/h,this._y=.25*h,this._z=(l+u)/h}else{let h=2*Math.sqrt(1+d-i-a);this._w=(o-r)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let l=1-t;if(a<.9995){let c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},F=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Z0.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Z0.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+l*c+o*d-a*u,this.y=i+l*u+a*c-s*d,this.z=r+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return um.copy(this).projectOnVector(e),this.sub(um)}reflect(e){return this.sub(um.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},um=new F,Z0=new Zi,Oe=class n{constructor(e,t,i,r,s,o,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],f=i[2],h=i[5],v=i[8],y=r[0],m=r[3],p=r[6],S=r[1],w=r[4],E=r[7],C=r[2],A=r[5],I=r[8];return s[0]=o*y+a*S+l*C,s[3]=o*m+a*w+l*A,s[6]=o*p+a*E+l*I,s[1]=c*y+u*S+d*C,s[4]=c*m+u*w+d*A,s[7]=c*p+u*E+d*I,s[2]=f*y+h*S+v*C,s[5]=f*m+h*w+v*A,s[8]=f*p+h*E+v*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,h=c*s-o*l,v=t*d+i*f+r*h;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/v;return e[0]=d*y,e[1]=(r*c-u*i)*y,e[2]=(a*i-r*o)*y,e[3]=f*y,e[4]=(u*t-r*l)*y,e[5]=(r*s-a*t)*y,e[6]=h*y,e[7]=(i*l-c*t)*y,e[8]=(o*t-i*s)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(dm.makeScale(e,t)),this}rotate(e){return this.premultiply(dm.makeRotation(-e)),this}translate(e,t){return this.premultiply(dm.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},dm=new Oe,J0=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),K0=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function NT(){let n={enabled:!0,workingColorSpace:fs,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===at&&(r.r=qi(r.r),r.g=qi(r.g),r.b=qi(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===at&&(r.r=vo(r.r),r.g=vo(r.g),r.b=vo(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ji?La:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return _o("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return _o("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[fs]:{primaries:e,whitePoint:i,transfer:La,toXYZ:J0,fromXYZ:K0,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:En},outputColorSpaceConfig:{drawingBufferColorSpace:En}},[En]:{primaries:e,whitePoint:i,transfer:at,toXYZ:J0,fromXYZ:K0,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:En}}}),n}var Ze=NT();function qi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function vo(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var ro,Cu=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ro===void 0&&(ro=ka("canvas")),ro.width=e.width,ro.height=e.height;let r=ro.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=ro}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ka("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=qi(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(qi(t[i]/255)*255):t[i]=qi(t[i]);return{data:t,width:e.width,height:e.height}}else return De("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},PT=0,xo=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:PT++}),this.uuid=rl(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(fm(r[o].image)):s.push(fm(r[o]))}else s=fm(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function fm(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Cu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(De("Texture: Unable to serialize Texture."),{})}var OT=0,hm=new F,Ki=(()=>{class n extends Yi{constructor(t=n.DEFAULT_IMAGE,i=n.DEFAULT_MAPPING,r=bi,s=bi,o=Qt,a=Er,l=jn,c=An,u=n.DEFAULT_ANISOTROPY,d=Ji){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:OT++}),this.uuid=rl(),this.name="",this.source=new xo(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=s,this.magFilter=o,this.minFilter=a,this.anisotropy=u,this.format=l,this.internalFormat=null,this.type=c,this.offset=new Qe(0,0),this.repeat=new Qe(1,1),this.center=new Qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(hm).x}get height(){return this.source.getSize(hm).y}get depth(){return this.source.getSize(hm).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let i in t){let r=t[i];if(r===void 0){De(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}let s=this[i];if(s===void 0){De(`Texture.setValues(): property '${i}' does not exist.`);continue}s&&r&&s.isVector2&&r.isVector2||s&&r&&s.isVector3&&r.isVector3||s&&r&&s.isMatrix3&&r.isMatrix3?s.copy(r):this[i]=r}}toJSON(t){let i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Rm)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case bu:t.x=t.x-Math.floor(t.x);break;case bi:t.x=t.x<0?0:1;break;case Su:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case bu:t.y=t.y-Math.floor(t.y);break;case bi:t.y=t.y<0?0:1;break;case Su:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}return n.DEFAULT_IMAGE=null,n.DEFAULT_MAPPING=Rm,n.DEFAULT_ANISOTROPY=1,n})(),Ot=class n{constructor(e=0,t=0,i=0,r=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],v=l[9],y=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-y)<.01&&Math.abs(v-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+y)<.1&&Math.abs(v+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(c+1)/2,E=(h+1)/2,C=(p+1)/2,A=(u+f)/4,I=(d+y)/4,k=(v+m)/4;return w>E&&w>C?w<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(w),r=A/i,s=I/i):E>C?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=A/r,s=k/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=I/s,r=k/s),this.set(i,r,s,t),this}let S=Math.sqrt((m-v)*(m-v)+(d-y)*(d-y)+(f-u)*(f-u));return Math.abs(S)<.001&&(S=1),this.x=(m-v)/S,this.y=(d-y)/S,this.z=(f-u)/S,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this.w=Ye(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this.w=Ye(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Tu=class extends Yi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Ot(0,0,e,t),this.scissorTest=!1,this.viewport=new Ot(0,0,e,t);let r={width:e,height:t,depth:i.depth},s=new Ki(r);this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:Qt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new xo(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Cn=class extends Tu{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},Ua=class extends Ki{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Au=class extends Ki{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var _r=class{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ii.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ii.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=ii.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ii):ii.fromBufferAttribute(s,o),ii.applyMatrix4(e.matrixWorld),this.expandByPoint(ii);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),tu.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),tu.copy(i.boundingBox)),tu.applyMatrix4(e.matrixWorld),this.union(tu)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ii),ii.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Da),nu.subVectors(this.max,Da),so.subVectors(e.a,Da),oo.subVectors(e.b,Da),ao.subVectors(e.c,Da),dr.subVectors(oo,so),fr.subVectors(ao,oo),rs.subVectors(so,ao);let t=[0,-dr.z,dr.y,0,-fr.z,fr.y,0,-rs.z,rs.y,dr.z,0,-dr.x,fr.z,0,-fr.x,rs.z,0,-rs.x,-dr.y,dr.x,0,-fr.y,fr.x,0,-rs.y,rs.x,0];return!pm(t,so,oo,ao,nu)||(t=[1,0,0,0,1,0,0,0,1],!pm(t,so,oo,ao,nu))?!1:(iu.crossVectors(dr,fr),t=[iu.x,iu.y,iu.z],pm(t,so,oo,ao,nu))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ii).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ii).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(zi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),zi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),zi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),zi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),zi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),zi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),zi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),zi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(zi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},zi=[new F,new F,new F,new F,new F,new F,new F,new F],ii=new F,tu=new _r,so=new F,oo=new F,ao=new F,dr=new F,fr=new F,rs=new F,Da=new F,nu=new F,iu=new F,ss=new F;function pm(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){ss.fromArray(n,s);let a=r.x*Math.abs(ss.x)+r.y*Math.abs(ss.y)+r.z*Math.abs(ss.z),l=e.dot(ss),c=t.dot(ss),u=i.dot(ss);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var LT=new _r,Ra=new F,mm=new F,Mo=class{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):LT.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ra.subVectors(e,this.center);let t=Ra.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Ra,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(mm.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ra.copy(e.center).add(mm)),this.expandByPoint(Ra.copy(e.center).sub(mm))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Gi=new F,gm=new F,ru=new F,hr=new F,vm=new F,su=new F,ym=new F,Iu=class{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Gi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Gi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Gi.copy(this.origin).addScaledVector(this.direction,t),Gi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){gm.copy(e).add(t).multiplyScalar(.5),ru.copy(t).sub(e).normalize(),hr.copy(this.origin).sub(gm);let s=e.distanceTo(t)*.5,o=-this.direction.dot(ru),a=hr.dot(this.direction),l=-hr.dot(ru),c=hr.lengthSq(),u=Math.abs(1-o*o),d,f,h,v;if(u>0)if(d=o*l-a,f=o*a-l,v=s*u,d>=0)if(f>=-v)if(f<=v){let y=1/u;d*=y,f*=y,h=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f<=-v?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c):f<=v?(d=0,f=Math.min(Math.max(-s,-l),s),h=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(gm).addScaledVector(ru,f),h}intersectSphere(e,t){Gi.subVectors(e.center,this.origin);let i=Gi.dot(this.direction),r=Gi.dot(Gi)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Gi)!==null}intersectTriangle(e,t,i,r,s){vm.subVectors(t,e),su.subVectors(i,e),ym.crossVectors(vm,su);let o=this.direction.dot(ym),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;hr.subVectors(this.origin,e);let l=a*this.direction.dot(su.crossVectors(hr,su));if(l<0)return null;let c=a*this.direction.dot(vm.cross(hr));if(c<0||l+c>o)return null;let u=-a*hr.dot(ym);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ht=class n{constructor(e,t,i,r,s,o,a,l,c,u,d,f,h,v,y,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,d,f,h,v,y,m)}set(e,t,i,r,s,o,a,l,c,u,d,f,h,v,y,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=v,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,i=e.elements,r=1/lo.setFromMatrixColumn(e,0).length(),s=1/lo.setFromMatrixColumn(e,1).length(),o=1/lo.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let f=o*u,h=o*d,v=a*u,y=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+v*c,t[5]=f-y*c,t[9]=-a*l,t[2]=y-f*c,t[6]=v+h*c,t[10]=o*l}else if(e.order==="YXZ"){let f=l*u,h=l*d,v=c*u,y=c*d;t[0]=f+y*a,t[4]=v*a-h,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-v,t[6]=y+f*a,t[10]=o*l}else if(e.order==="ZXY"){let f=l*u,h=l*d,v=c*u,y=c*d;t[0]=f-y*a,t[4]=-o*d,t[8]=v+h*a,t[1]=h+v*a,t[5]=o*u,t[9]=y-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let f=o*u,h=o*d,v=a*u,y=a*d;t[0]=l*u,t[4]=v*c-h,t[8]=f*c+y,t[1]=l*d,t[5]=y*c+f,t[9]=h*c-v,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let f=o*l,h=o*c,v=a*l,y=a*c;t[0]=l*u,t[4]=y-f*d,t[8]=v*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=h*d+v,t[10]=f-y*d}else if(e.order==="XZY"){let f=o*l,h=o*c,v=a*l,y=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+y,t[5]=o*u,t[9]=h*d-v,t[2]=v*d-h,t[6]=a*u,t[10]=y*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(FT,e,kT)}lookAt(e,t,i){let r=this.elements;return bn.subVectors(e,t),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),pr.crossVectors(i,bn),pr.lengthSq()===0&&(Math.abs(i.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),pr.crossVectors(i,bn)),pr.normalize(),ou.crossVectors(bn,pr),r[0]=pr.x,r[4]=ou.x,r[8]=bn.x,r[1]=pr.y,r[5]=ou.y,r[9]=bn.y,r[2]=pr.z,r[6]=ou.z,r[10]=bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],f=i[9],h=i[13],v=i[2],y=i[6],m=i[10],p=i[14],S=i[3],w=i[7],E=i[11],C=i[15],A=r[0],I=r[4],k=r[8],x=r[12],M=r[1],R=r[5],H=r[9],B=r[13],q=r[2],j=r[6],G=r[10],V=r[14],Z=r[3],ue=r[7],oe=r[11],de=r[15];return s[0]=o*A+a*M+l*q+c*Z,s[4]=o*I+a*R+l*j+c*ue,s[8]=o*k+a*H+l*G+c*oe,s[12]=o*x+a*B+l*V+c*de,s[1]=u*A+d*M+f*q+h*Z,s[5]=u*I+d*R+f*j+h*ue,s[9]=u*k+d*H+f*G+h*oe,s[13]=u*x+d*B+f*V+h*de,s[2]=v*A+y*M+m*q+p*Z,s[6]=v*I+y*R+m*j+p*ue,s[10]=v*k+y*H+m*G+p*oe,s[14]=v*x+y*B+m*V+p*de,s[3]=S*A+w*M+E*q+C*Z,s[7]=S*I+w*R+E*j+C*ue,s[11]=S*k+w*H+E*G+C*oe,s[15]=S*x+w*B+E*V+C*de,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],v=e[3],y=e[7],m=e[11],p=e[15],S=l*h-c*f,w=a*h-c*d,E=a*f-l*d,C=o*h-c*u,A=o*f-l*u,I=o*d-a*u;return t*(y*S-m*w+p*E)-i*(v*S-m*C+p*A)+r*(v*w-y*C+p*I)-s*(v*E-y*A+m*I)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],v=e[12],y=e[13],m=e[14],p=e[15],S=d*m*c-y*f*c+y*l*h-a*m*h-d*l*p+a*f*p,w=v*f*c-u*m*c-v*l*h+o*m*h+u*l*p-o*f*p,E=u*y*c-v*d*c+v*a*h-o*y*h-u*a*p+o*d*p,C=v*d*l-u*y*l-v*a*f+o*y*f+u*a*m-o*d*m,A=t*S+i*w+r*E+s*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/A;return e[0]=S*I,e[1]=(y*f*s-d*m*s-y*r*h+i*m*h+d*r*p-i*f*p)*I,e[2]=(a*m*s-y*l*s+y*r*c-i*m*c-a*r*p+i*l*p)*I,e[3]=(d*l*s-a*f*s-d*r*c+i*f*c+a*r*h-i*l*h)*I,e[4]=w*I,e[5]=(u*m*s-v*f*s+v*r*h-t*m*h-u*r*p+t*f*p)*I,e[6]=(v*l*s-o*m*s-v*r*c+t*m*c+o*r*p-t*l*p)*I,e[7]=(o*f*s-u*l*s+u*r*c-t*f*c-o*r*h+t*l*h)*I,e[8]=E*I,e[9]=(v*d*s-u*y*s-v*i*h+t*y*h+u*i*p-t*d*p)*I,e[10]=(o*y*s-v*a*s+v*i*c-t*y*c-o*i*p+t*a*p)*I,e[11]=(u*a*s-o*d*s-u*i*c+t*d*c+o*i*h-t*a*h)*I,e[12]=C*I,e[13]=(u*y*r-v*d*r+v*i*f-t*y*f-u*i*m+t*d*m)*I,e[14]=(v*a*r-o*y*r-v*i*l+t*y*l+o*i*m-t*a*m)*I,e[15]=(o*d*r-u*a*r+u*i*l-t*d*l-o*i*f+t*a*f)*I,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,f=s*c,h=s*u,v=s*d,y=o*u,m=o*d,p=a*d,S=l*c,w=l*u,E=l*d,C=i.x,A=i.y,I=i.z;return r[0]=(1-(y+p))*C,r[1]=(h+E)*C,r[2]=(v-w)*C,r[3]=0,r[4]=(h-E)*A,r[5]=(1-(f+p))*A,r[6]=(m+S)*A,r[7]=0,r[8]=(v+w)*I,r[9]=(m-S)*I,r[10]=(1-(f+y))*I,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;if(e.x=r[12],e.y=r[13],e.z=r[14],this.determinant()===0)return i.set(1,1,1),t.identity(),this;let s=lo.set(r[0],r[1],r[2]).length(),o=lo.set(r[4],r[5],r[6]).length(),a=lo.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),ri.copy(this);let c=1/s,u=1/o,d=1/a;return ri.elements[0]*=c,ri.elements[1]*=c,ri.elements[2]*=c,ri.elements[4]*=u,ri.elements[5]*=u,ri.elements[6]*=u,ri.elements[8]*=d,ri.elements[9]*=d,ri.elements[10]*=d,t.setFromRotationMatrix(ri),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=oi,l=!1){let c=this.elements,u=2*s/(t-e),d=2*s/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r),v,y;if(l)v=s/(o-s),y=o*s/(o-s);else if(a===oi)v=-(o+s)/(o-s),y=-2*o*s/(o-s);else if(a===Fa)v=-o/(o-s),y=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=oi,l=!1){let c=this.elements,u=2/(t-e),d=2/(i-r),f=-(t+e)/(t-e),h=-(i+r)/(i-r),v,y;if(l)v=1/(o-s),y=o/(o-s);else if(a===oi)v=-2/(o-s),y=-(o+s)/(o-s);else if(a===Fa)v=-1/(o-s),y=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=v,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},lo=new F,ri=new Ht,FT=new F(0,0,0),kT=new F(1,1,1),pr=new F,ou=new F,bn=new F,Q0=new Ht,ex=new Zi,hs=(()=>{class n{constructor(t=0,i=0,r=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,s=this._order){return this._x=t,this._y=i,this._z=r,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){let s=t.elements,o=s[0],a=s[4],l=s[8],c=s[1],u=s[5],d=s[9],f=s[2],h=s[6],v=s[10];switch(i){case"XYZ":this._y=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,v),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(l,v),this._z=Math.atan2(c,u)):(this._y=Math.atan2(-f,o),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,v),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-Ye(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,v),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(Ye(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,u),this._y=Math.atan2(-f,o)):(this._x=0,this._y=Math.atan2(l,v));break;case"XZY":this._z=Math.asin(-Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(l,o)):(this._x=Math.atan2(-d,v),this._y=0);break;default:De("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return Q0.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Q0,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return ex.setFromEuler(this),this.setFromQuaternion(ex,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}return n.DEFAULT_ORDER="XYZ",n})(),Va=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},UT=0,tx=new F,co=new Zi,Wi=new Ht,au=new F,Na=new F,VT=new F,BT=new Zi,nx=new F(1,0,0),ix=new F(0,1,0),rx=new F(0,0,1),sx={type:"added"},HT={type:"removed"},uo={type:"childadded",child:null},_m={type:"childremoved",child:null},xs=(()=>{class n extends Yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:UT++}),this.uuid=rl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new F,i=new hs,r=new Zi,s=new F(1,1,1);function o(){r.setFromEuler(i,!1)}function a(){i.setFromQuaternion(r,void 0,!1)}i._onChange(o),r._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ht},normalMatrix:{value:new Oe}}),this.matrix=new Ht,this.matrixWorld=new Ht,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Va,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return co.setFromAxisAngle(t,i),this.quaternion.multiply(co),this}rotateOnWorldAxis(t,i){return co.setFromAxisAngle(t,i),this.quaternion.premultiply(co),this}rotateX(t){return this.rotateOnAxis(nx,t)}rotateY(t){return this.rotateOnAxis(ix,t)}rotateZ(t){return this.rotateOnAxis(rx,t)}translateOnAxis(t,i){return tx.copy(t).applyQuaternion(this.quaternion),this.position.add(tx.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(nx,t)}translateY(t){return this.translateOnAxis(ix,t)}translateZ(t){return this.translateOnAxis(rx,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Wi.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?au.copy(t):au.set(t,i,r);let s=this.parent;this.updateWorldMatrix(!0,!1),Na.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wi.lookAt(Na,au,this.up):Wi.lookAt(au,Na,this.up),this.quaternion.setFromRotationMatrix(Wi),s&&(Wi.extractRotation(s.matrixWorld),co.setFromRotationMatrix(Wi),this.quaternion.premultiply(co.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(Ae("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(sx),uo.child=t,this.dispatchEvent(uo),uo.child=null):Ae("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}let i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(HT),_m.child=t,this.dispatchEvent(_m),_m.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Wi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Wi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Wi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(sx),uo.child=t,this.dispatchEvent(uo),uo.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,s=this.children.length;r<s;r++){let a=this.children[r].getObjectByProperty(t,i);if(a!==void 0)return a}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Na,t,VT),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Na,BT,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].traverseVisible(t)}traverseAncestors(t){let i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i){let r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(t){let i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(l=>St($e({},l),{boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(l=>$e({},l)),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function o(l,c){return l[c.uuid]===void 0&&(l[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);let l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){let c=l.shapes;if(Array.isArray(c))for(let u=0,d=c.length;u<d;u++){let f=c[u];o(t.shapes,f)}else o(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let l=[];for(let c=0,u=this.material.length;c<u;c++)l.push(o(t.materials,this.material[c]));s.material=l}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let l=0;l<this.children.length;l++)s.children.push(this.children[l].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let l=0;l<this.animations.length;l++){let c=this.animations[l];s.animations.push(o(t.animations,c))}}if(i){let l=a(t.geometries),c=a(t.materials),u=a(t.textures),d=a(t.images),f=a(t.shapes),h=a(t.skeletons),v=a(t.animations),y=a(t.nodes);l.length>0&&(r.geometries=l),c.length>0&&(r.materials=c),u.length>0&&(r.textures=u),d.length>0&&(r.images=d),f.length>0&&(r.shapes=f),h.length>0&&(r.skeletons=h),v.length>0&&(r.animations=v),y.length>0&&(r.nodes=y)}return r.object=s,r;function a(l){let c=[];for(let u in l){let d=l[u];delete d.metadata,c.push(d)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){let s=t.children[r];this.add(s.clone())}return this}}return n.DEFAULT_UP=new F(0,1,0),n.DEFAULT_MATRIX_AUTO_UPDATE=!0,n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,n})(),si=new F,ji=new F,xm=new F,$i=new F,fo=new F,ho=new F,ox=new F,Mm=new F,bm=new F,Sm=new F,Em=new Ot,wm=new Ot,Cm=new Ot,vr=class n{constructor(e=new F,t=new F,i=new F){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),si.subVectors(e,t),r.cross(si);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){si.subVectors(r,t),ji.subVectors(i,t),xm.subVectors(e,t);let o=si.dot(si),a=si.dot(ji),l=si.dot(xm),c=ji.dot(ji),u=ji.dot(xm),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;let f=1/d,h=(c*l-a*u)*f,v=(o*u-a*l)*f;return s.set(1-h-v,v,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,$i)===null?!1:$i.x>=0&&$i.y>=0&&$i.x+$i.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,$i)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,$i.x),l.addScaledVector(o,$i.y),l.addScaledVector(a,$i.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return Em.setScalar(0),wm.setScalar(0),Cm.setScalar(0),Em.fromBufferAttribute(e,t),wm.fromBufferAttribute(e,i),Cm.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Em,s.x),o.addScaledVector(wm,s.y),o.addScaledVector(Cm,s.z),o}static isFrontFacing(e,t,i,r){return si.subVectors(i,t),ji.subVectors(e,t),si.cross(ji).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return si.subVectors(this.c,this.b),ji.subVectors(this.a,this.b),si.cross(ji).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,o,a;fo.subVectors(r,i),ho.subVectors(s,i),Mm.subVectors(e,i);let l=fo.dot(Mm),c=ho.dot(Mm);if(l<=0&&c<=0)return t.copy(i);bm.subVectors(e,r);let u=fo.dot(bm),d=ho.dot(bm);if(u>=0&&d<=u)return t.copy(r);let f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(fo,o);Sm.subVectors(e,s);let h=fo.dot(Sm),v=ho.dot(Sm);if(v>=0&&h<=v)return t.copy(s);let y=h*c-l*v;if(y<=0&&c>=0&&v<=0)return a=c/(c-v),t.copy(i).addScaledVector(ho,a);let m=u*v-h*d;if(m<=0&&d-u>=0&&h-v>=0)return ox.subVectors(s,r),a=(d-u)/(d-u+(h-v)),t.copy(r).addScaledVector(ox,a);let p=1/(m+y+f);return o=y*p,a=f*p,t.copy(i).addScaledVector(fo,o).addScaledVector(ho,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},qx={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mr={h:0,s:0,l:0},lu={h:0,s:0,l:0};function Tm(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var rt=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=En){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ze.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=Ze.workingColorSpace){if(e=RT(e,1),t=Ye(t,0,1),i=Ye(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Tm(o,s,e+1/3),this.g=Tm(o,s,e),this.b=Tm(o,s,e-1/3)}return Ze.colorSpaceToWorking(this,r),this}setStyle(e,t=En){function i(s){s!==void 0&&parseFloat(s)<1&&De("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:De("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);De("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=En){let i=qx[e.toLowerCase()];return i!==void 0?this.setHex(i,t):De("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=qi(e.r),this.g=qi(e.g),this.b=qi(e.b),this}copyLinearToSRGB(e){return this.r=vo(e.r),this.g=vo(e.g),this.b=vo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=En){return Ze.workingToColorSpace(rn.copy(this),e),Math.round(Ye(rn.r*255,0,255))*65536+Math.round(Ye(rn.g*255,0,255))*256+Math.round(Ye(rn.b*255,0,255))}getHexString(e=En){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.workingToColorSpace(rn.copy(this),t);let i=rn.r,r=rn.g,s=rn.b,o=Math.max(i,r,s),a=Math.min(i,r,s),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Ze.workingColorSpace){return Ze.workingToColorSpace(rn.copy(this),t),e.r=rn.r,e.g=rn.g,e.b=rn.b,e}getStyle(e=En){Ze.workingToColorSpace(rn.copy(this),e);let t=rn.r,i=rn.g,r=rn.b;return e!==En?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(mr),this.setHSL(mr.h+e,mr.s+t,mr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(mr),e.getHSL(lu);let i=cm(mr.h,lu.h,t),r=cm(mr.s,lu.s,t),s=cm(mr.l,lu.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},rn=new rt;rt.NAMES=qx;var zT=0,ps=class extends Yi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zT++}),this.uuid=rl(),this.name="",this.type="Material",this.blending=us,this.side=Xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xu,this.blendDst=Mu,this.blendEquation=yr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new rt(0,0,0),this.blendAlpha=0,this.depthFunc=ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Lm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ls,this.stencilZFail=ls,this.stencilZPass=ls,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){De(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){De(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==us&&(i.blending=this.blending),this.side!==Xi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==xu&&(i.blendSrc=this.blendSrc),this.blendDst!==Mu&&(i.blendDst=this.blendDst),this.blendEquation!==yr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ds&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Lm&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ls&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ls&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ls&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ba=class extends ps{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hs,this.combine=zm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Bt=new F,cu=new Qe,GT=0,wn=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:GT++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Fm,this.updateRanges=[],this.gpuType=ci,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)cu.fromBufferAttribute(this,t),cu.applyMatrix3(e),this.setXY(t,cu.x,cu.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ia(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=fn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ia(t,this.array)),t}setX(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ia(t,this.array)),t}setY(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ia(t,this.array)),t}setZ(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ia(t,this.array)),t}setW(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),i=fn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),i=fn(i,this.array),r=fn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),i=fn(i,this.array),r=fn(r,this.array),s=fn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Fm&&(e.usage=this.usage),e}};var Ha=class extends wn{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var za=class extends wn{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Wn=class extends wn{constructor(e,t,i){super(new Float32Array(e),t,i)}},WT=0,Gn=new Ht,Am=new xs,po=new F,Sn=new _r,Pa=new _r,qt=new F,Ei=class n extends Yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:WT++}),this.uuid=rl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(rg(e)?za:Ha)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Oe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Gn.makeRotationFromQuaternion(e),this.applyMatrix4(Gn),this}rotateX(e){return Gn.makeRotationX(e),this.applyMatrix4(Gn),this}rotateY(e){return Gn.makeRotationY(e),this.applyMatrix4(Gn),this}rotateZ(e){return Gn.makeRotationZ(e),this.applyMatrix4(Gn),this}translate(e,t,i){return Gn.makeTranslation(e,t,i),this.applyMatrix4(Gn),this}scale(e,t,i){return Gn.makeScale(e,t,i),this.applyMatrix4(Gn),this}lookAt(e){return Am.lookAt(e),Am.updateMatrix(),this.applyMatrix4(Am.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(po).negate(),this.translate(po.x,po.y,po.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Wn(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&De("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _r);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ae("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];Sn.setFromBufferAttribute(s),this.morphTargetsRelative?(qt.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(qt),qt.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(qt)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ae('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mo);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ae("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){let i=this.boundingSphere.center;if(Sn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];Pa.setFromBufferAttribute(a),this.morphTargetsRelative?(qt.addVectors(Sn.min,Pa.min),Sn.expandByPoint(qt),qt.addVectors(Sn.max,Pa.max),Sn.expandByPoint(qt)):(Sn.expandByPoint(Pa.min),Sn.expandByPoint(Pa.max))}Sn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)qt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(qt));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)qt.fromBufferAttribute(a,c),l&&(po.fromBufferAttribute(e,c),qt.add(po)),r=Math.max(r,i.distanceToSquared(qt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ae('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ae("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new wn(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let k=0;k<i.count;k++)a[k]=new F,l[k]=new F;let c=new F,u=new F,d=new F,f=new Qe,h=new Qe,v=new Qe,y=new F,m=new F;function p(k,x,M){c.fromBufferAttribute(i,k),u.fromBufferAttribute(i,x),d.fromBufferAttribute(i,M),f.fromBufferAttribute(s,k),h.fromBufferAttribute(s,x),v.fromBufferAttribute(s,M),u.sub(c),d.sub(c),h.sub(f),v.sub(f);let R=1/(h.x*v.y-v.x*h.y);isFinite(R)&&(y.copy(u).multiplyScalar(v.y).addScaledVector(d,-h.y).multiplyScalar(R),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-v.x).multiplyScalar(R),a[k].add(y),a[x].add(y),a[M].add(y),l[k].add(m),l[x].add(m),l[M].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let k=0,x=S.length;k<x;++k){let M=S[k],R=M.start,H=M.count;for(let B=R,q=R+H;B<q;B+=3)p(e.getX(B+0),e.getX(B+1),e.getX(B+2))}let w=new F,E=new F,C=new F,A=new F;function I(k){C.fromBufferAttribute(r,k),A.copy(C);let x=a[k];w.copy(x),w.sub(C.multiplyScalar(C.dot(x))).normalize(),E.crossVectors(A,x);let R=E.dot(l[k])<0?-1:1;o.setXYZW(k,w.x,w.y,w.z,R)}for(let k=0,x=S.length;k<x;++k){let M=S[k],R=M.start,H=M.count;for(let B=R,q=R+H;B<q;B+=3)I(e.getX(B+0)),I(e.getX(B+1)),I(e.getX(B+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new wn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);let r=new F,s=new F,o=new F,a=new F,l=new F,c=new F,u=new F,d=new F;if(e)for(let f=0,h=e.count;f<h;f+=3){let v=e.getX(f+0),y=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,v),s.fromBufferAttribute(t,y),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,v),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)qt.fromBufferAttribute(e,t),qt.normalize(),e.setXYZ(t,qt.x,qt.y,qt.z)}toNonIndexed(){function e(a,l){let c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u),h=0,v=0;for(let y=0,m=l.length;y<m;y++){a.isInterleavedBufferAttribute?h=l[y]*a.data.stride+a.offset:h=l[y]*u;for(let p=0;p<u;p++)f[v++]=c[h++]}return new wn(f,u,d)}if(this.index===null)return De("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let l=r[a],c=e(l,i);t.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){let f=c[u],h=e(f,i);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){let h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let c in r){let u=r[c];this.setAttribute(c,u.clone(t))}let s=e.morphAttributes;for(let c in s){let u=[],d=s[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,u=o.length;c<u;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},ax=new Ht,os=new Iu,uu=new Mo,lx=new F,du=new F,fu=new F,hu=new F,Im=new F,pu=new F,cx=new F,mu=new F,pn=class extends xs{constructor(e=new Ei,t=new Ba){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){pu.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let u=a[l],d=s[l];u!==0&&(Im.fromBufferAttribute(d,e),o?pu.addScaledVector(Im,u):pu.addScaledVector(Im.sub(t),u))}t.add(pu)}return t}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),uu.copy(i.boundingSphere),uu.applyMatrix4(s),os.copy(e.ray).recast(e.near),!(uu.containsPoint(os.origin)===!1&&(os.intersectSphere(uu,lx)===null||os.origin.distanceToSquared(lx)>(e.far-e.near)**2))&&(ax.copy(s).invert(),os.copy(e.ray).applyMatrix4(ax),!(i.boundingBox!==null&&os.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,os)))}_computeIntersections(e,t,i){let r,s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,y=f.length;v<y;v++){let m=f[v],p=o[m.materialIndex],S=Math.max(m.start,h.start),w=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let E=S,C=w;E<C;E+=3){let A=a.getX(E),I=a.getX(E+1),k=a.getX(E+2);r=gu(this,p,e,i,c,u,d,A,I,k),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let v=Math.max(0,h.start),y=Math.min(a.count,h.start+h.count);for(let m=v,p=y;m<p;m+=3){let S=a.getX(m),w=a.getX(m+1),E=a.getX(m+2);r=gu(this,o,e,i,c,u,d,S,w,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,y=f.length;v<y;v++){let m=f[v],p=o[m.materialIndex],S=Math.max(m.start,h.start),w=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let E=S,C=w;E<C;E+=3){let A=E,I=E+1,k=E+2;r=gu(this,p,e,i,c,u,d,A,I,k),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let v=Math.max(0,h.start),y=Math.min(l.count,h.start+h.count);for(let m=v,p=y;m<p;m+=3){let S=m,w=m+1,E=m+2;r=gu(this,o,e,i,c,u,d,S,w,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function jT(n,e,t,i,r,s,o,a){let l;if(e.side===cn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Xi,a),l===null)return null;mu.copy(a),mu.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(mu);return c<t.near||c>t.far?null:{distance:c,point:mu.clone(),object:n}}function gu(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,du),n.getVertexPosition(l,fu),n.getVertexPosition(c,hu);let u=jT(n,e,t,i,du,fu,hu,cx);if(u){let d=new F;vr.getBarycoord(cx,du,fu,hu,d),r&&(u.uv=vr.getInterpolatedAttribute(r,a,l,c,d,new Qe)),s&&(u.uv1=vr.getInterpolatedAttribute(s,a,l,c,d,new Qe)),o&&(u.normal=vr.getInterpolatedAttribute(o,a,l,c,d,new F),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let f={a,b:l,c,normal:new F,materialIndex:0};vr.getNormal(du,fu,hu,f.normal),u.face=f,u.barycoord=d}return u}var bo=class n extends Ei{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],u=[],d=[],f=0,h=0;v("z","y","x",-1,-1,i,t,e,o,s,0),v("z","y","x",1,-1,i,t,-e,o,s,1),v("x","z","y",1,1,e,i,t,r,o,2),v("x","z","y",1,-1,e,i,-t,r,o,3),v("x","y","z",1,-1,e,t,i,r,s,4),v("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Wn(c,3)),this.setAttribute("normal",new Wn(u,3)),this.setAttribute("uv",new Wn(d,2));function v(y,m,p,S,w,E,C,A,I,k,x){let M=E/I,R=C/k,H=E/2,B=C/2,q=A/2,j=I+1,G=k+1,V=0,Z=0,ue=new F;for(let oe=0;oe<G;oe++){let de=oe*R-B;for(let Ge=0;Ge<j;Ge++){let Ue=Ge*M-H;ue[y]=Ue*S,ue[m]=de*w,ue[p]=q,c.push(ue.x,ue.y,ue.z),ue[y]=0,ue[m]=0,ue[p]=A>0?1:-1,u.push(ue.x,ue.y,ue.z),d.push(Ge/I),d.push(1-oe/k),V+=1}}for(let oe=0;oe<k;oe++)for(let de=0;de<I;de++){let Ge=f+de+j*oe,Ue=f+de+j*(oe+1),Et=f+(de+1)+j*(oe+1),bt=f+(de+1)+j*oe;l.push(Ge,Ue,bt),l.push(Ue,Et,bt),Z+=6}a.addGroup(h,Z,x),h+=Z,f+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ms(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(De("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function on(n){let e={};for(let t=0;t<n.length;t++){let i=Ms(n[t]);for(let r in i)e[r]=i[r]}return e}function $T(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function og(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}var Xx={clone:Ms,merge:on},qT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,XT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,sn=class extends ps{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qT,this.fragmentShader=XT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ms(e.uniforms),this.uniformsGroups=$T(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},Ga=class extends xs{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ht,this.projectionMatrix=new Ht,this.projectionMatrixInverse=new Ht,this.coordinateSystem=oi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},gr=new F,ux=new Qe,dx=new Qe,hn=class extends Ga{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=wu*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(lm*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return wu*2*Math.atan(Math.tan(lm*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){gr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(gr.x,gr.y).multiplyScalar(-e/gr.z),gr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(gr.x,gr.y).multiplyScalar(-e/gr.z)}getViewSize(e,t){return this.getViewBounds(e,ux,dx),t.subVectors(dx,ux)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(lm*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},mo=-90,go=1,Du=class extends xs{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new hn(mo,go,e,t);r.layers=this.layers,this.add(r);let s=new hn(mo,go,e,t);s.layers=this.layers,this.add(s);let o=new hn(mo,go,e,t);o.layers=this.layers,this.add(o);let a=new hn(mo,go,e,t);a.layers=this.layers,this.add(a);let l=new hn(mo,go,e,t);l.layers=this.layers,this.add(l);let c=new hn(mo,go,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(let c of t)this.remove(c);if(e===oi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Fa)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}},Wa=class extends Ki{constructor(e=[],t=Sr,i,r,s,o,a,l,c,u){super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ja=class extends Cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Wa(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new bo(5,5,5),s=new sn({name:"CubemapFromEquirect",uniforms:Ms(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:cn,blending:Ci});s.uniforms.tEquirect.value=t;let o=new pn(r,s),a=t.minFilter;return t.minFilter===Er&&(t.minFilter=Qt),new Du(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}},cs=class extends xs{constructor(){super(),this.isGroup=!0,this.type="Group"}},YT={type:"move"},So=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new cs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new cs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new cs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let y of e.hand.values()){let m=t.getJointPose(y,i),p=this._getHandJoint(c,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,v=.005;c.inputState.pinching&&f>h+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(YT)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new cs;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}};var $a=class extends xs{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hs,this.environmentIntensity=1,this.environmentRotation=new hs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var Ru=class extends Ki{constructor(e=null,t=1,i=1,r,s,o,a,l,c=Xt,u=Xt,d,f){super(null,o,a,l,c,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Dm=new F,ZT=new F,JT=new Oe,Mi=class{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=Dm.subVectors(i,t).cross(ZT.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(Dm),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||JT.getNormalMatrix(e),r=this.coplanarPoint(Dm).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},as=new Mo,KT=new Qe(.5,.5),vu=new F,qa=class{constructor(e=new Mi,t=new Mi,i=new Mi,r=new Mi,s=new Mi,o=new Mi){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=oi,i=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],d=s[5],f=s[6],h=s[7],v=s[8],y=s[9],m=s[10],p=s[11],S=s[12],w=s[13],E=s[14],C=s[15];if(r[0].setComponents(c-o,h-u,p-v,C-S).normalize(),r[1].setComponents(c+o,h+u,p+v,C+S).normalize(),r[2].setComponents(c+a,h+d,p+y,C+w).normalize(),r[3].setComponents(c-a,h-d,p-y,C-w).normalize(),i)r[4].setComponents(l,f,m,E).normalize(),r[5].setComponents(c-l,h-f,p-m,C-E).normalize();else if(r[4].setComponents(c-l,h-f,p-m,C-E).normalize(),t===oi)r[5].setComponents(c+l,h+f,p+m,C+E).normalize();else if(t===Fa)r[5].setComponents(l,f,m,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),as.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),as.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(as)}intersectsSprite(e){as.center.set(0,0,0);let t=KT.distanceTo(e.center);return as.radius=.7071067811865476+t,as.applyMatrix4(e.matrixWorld),this.intersectsSphere(as)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(vu.x=r.normal.x>0?e.max.x:e.min.x,vu.y=r.normal.y>0?e.max.y:e.min.y,vu.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(vu)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var xr=class extends Ki{constructor(e,t,i=li,r,s,o,a=Xt,l=Xt,c,u=Si,d=1){if(u!==Si&&u!==wr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:d};super(f,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new xo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Nu=class extends xr{constructor(e,t=li,i=Sr,r,s,o=Xt,a=Xt,l,c=Si){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,r,s,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Xa=class extends Ki{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var ms=class n extends Ei{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,d=e/a,f=t/l,h=[],v=[],y=[],m=[];for(let p=0;p<u;p++){let S=p*f-o;for(let w=0;w<c;w++){let E=w*d-s;v.push(E,-S,0),y.push(0,0,1),m.push(w/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<a;S++){let w=S+c*p,E=S+c*(p+1),C=S+1+c*(p+1),A=S+1+c*p;h.push(w,E,A),h.push(E,C,A)}this.setIndex(h),this.setAttribute("position",new Wn(v,3)),this.setAttribute("normal",new Wn(y,3)),this.setAttribute("uv",new Wn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var Pu=class extends sn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Ou=class extends ps{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Fx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Lu=class extends ps{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function yu(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}var gs=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];n:{e:{let o;t:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=t[++i],e<r)break e}o=t.length;break t}if(!(e>=s)){let a=t[1];e<a&&(i=2,s=a);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=s,s=t[--i-1],e>=s)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=i[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Fu=class extends gs{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Nm,endingEnd:Nm}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],l=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case Pm:s=e,a=2*t-i;break;case Om:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Pm:o=e,l=2*i-t;break;case Om:o=1,l=i+r[1]-r[0];break;default:o=e-1,l=t}let c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,v=(i-t)/(r-t),y=v*v,m=y*v,p=-f*m+2*f*y-f*v,S=(1+f)*m+(-1.5-2*f)*y+(-.5+f)*v+1,w=(-1-h)*m+(1.5+h)*y+.5*v,E=h*m-h*y;for(let C=0;C!==a;++C)s[C]=p*o[u+C]+S*o[c+C]+w*o[l+C]+E*o[d+C];return s}},ku=class extends gs{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(i-t)/(r-t),d=1-u;for(let f=0;f!==a;++f)s[f]=o[c+f]*d+o[l+f]*u;return s}},Uu=class extends gs{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Tn=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=yu(t,this.TimeBufferType),this.values=yu(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:yu(e.times,Array),values:yu(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Uu(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ku(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Fu(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Oa:t=this.InterpolantFactoryMethodDiscrete;break;case Eu:t=this.InterpolantFactoryMethodLinear;break;case _u:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return De("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Oa;case this.InterpolantFactoryMethodLinear:return Eu;case this.InterpolantFactoryMethodSmooth:return _u}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ae("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(Ae("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){Ae("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){Ae("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(r!==void 0&&DT(r))for(let a=0,l=r.length;a!==l;++a){let c=r[a];if(isNaN(c)){Ae("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===_u,s=e.length-1,o=1;for(let a=1;a<s;++a){let l=!1,c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(r)l=!0;else{let d=a*i,f=d-i,h=d+i;for(let v=0;v!==i;++v){let y=t[d+v];if(y!==t[f+v]||y!==t[h+v]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let d=a*i,f=o*i;for(let h=0;h!==i;++h)t[f+h]=t[d+h]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,l=o*i,c=0;c!==i;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Tn.prototype.ValueTypeName="";Tn.prototype.TimeBufferType=Float32Array;Tn.prototype.ValueBufferType=Float32Array;Tn.prototype.DefaultInterpolation=Eu;var Mr=class extends Tn{constructor(e,t,i){super(e,t,i)}};Mr.prototype.ValueTypeName="bool";Mr.prototype.ValueBufferType=Array;Mr.prototype.DefaultInterpolation=Oa;Mr.prototype.InterpolantFactoryMethodLinear=void 0;Mr.prototype.InterpolantFactoryMethodSmooth=void 0;var Vu=class extends Tn{constructor(e,t,i,r){super(e,t,i,r)}};Vu.prototype.ValueTypeName="color";var Bu=class extends Tn{constructor(e,t,i,r){super(e,t,i,r)}};Bu.prototype.ValueTypeName="number";var Hu=class extends gs{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-t)/(r-t),c=e*a;for(let u=c+a;c!==u;c+=4)Zi.slerpFlat(s,0,o,c-a,o,c,l);return s}},Ya=class extends Tn{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new Hu(this.times,this.values,this.getValueSize(),e)}};Ya.prototype.ValueTypeName="quaternion";Ya.prototype.InterpolantFactoryMethodSmooth=void 0;var br=class extends Tn{constructor(e,t,i){super(e,t,i)}};br.prototype.ValueTypeName="string";br.prototype.ValueBufferType=Array;br.prototype.DefaultInterpolation=Oa;br.prototype.InterpolantFactoryMethodLinear=void 0;br.prototype.InterpolantFactoryMethodSmooth=void 0;var zu=class extends Tn{constructor(e,t,i,r){super(e,t,i,r)}};zu.prototype.ValueTypeName="vector";var vs=class extends Ga{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var Gu=class extends hn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Za=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};var ag="\\[\\]\\.:\\/",QT=new RegExp("["+ag+"]","g"),lg="[^"+ag+"]",eA="[^"+ag.replace("\\.","")+"]",tA=/((?:WC+[\/:])*)/.source.replace("WC",lg),nA=/(WCOD+)?/.source.replace("WCOD",eA),iA=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",lg),rA=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",lg),sA=new RegExp("^"+tA+nA+iA+rA+"$"),oA=["material","materials","bones","map"],km=class{constructor(e,t,i){let r=i||Pt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Pt=(()=>{class n{constructor(t,i,r){this.path=i,this.parsedPath=r||n.parseTrackName(i),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,i,r){return t&&t.isAnimationObjectGroup?new n.Composite(t,i,r):new n(t,i,r)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(QT,"")}static parseTrackName(t){let i=sA.exec(t);if(i===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let r={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},s=r.nodeName&&r.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let o=r.nodeName.substring(s+1);oA.indexOf(o)!==-1&&(r.nodeName=r.nodeName.substring(0,s),r.objectName=o)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return r}static findNode(t,i){if(i===void 0||i===""||i==="."||i===-1||i===t.name||i===t.uuid)return t;if(t.skeleton){let r=t.skeleton.getBoneByName(i);if(r!==void 0)return r}if(t.children){let r=function(o){for(let a=0;a<o.length;a++){let l=o[a];if(l.name===i||l.uuid===i)return l;let c=r(l.children);if(c)return c}return null},s=r(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,i){t[i]=this.targetObject[this.propertyName]}_getValue_array(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)t[i++]=r[s]}_getValue_arrayElement(t,i){t[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,i){this.resolvedProperty.toArray(t,i)}_setValue_direct(t,i){this.targetObject[this.propertyName]=t[i]}_setValue_direct_setNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++]}_setValue_array_setNeedsUpdate(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,i){this.resolvedProperty[this.propertyIndex]=t[i]}_setValue_arrayElement_setNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,i){this.resolvedProperty.fromArray(t,i)}_setValue_fromArray_setNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,i){this.bind(),this.getValue(t,i)}_setValue_unbound(t,i){this.bind(),this.setValue(t,i)}bind(){let t=this.node,i=this.parsedPath,r=i.objectName,s=i.propertyName,o=i.propertyIndex;if(t||(t=n.findNode(this.rootNode,i.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){De("PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let u=i.objectIndex;switch(r){case"materials":if(!t.material){Ae("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ae("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ae("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===u){u=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ae("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ae("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[r]===void 0){Ae("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[r]}if(u!==void 0){if(t[u]===void 0){Ae("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[u]}}let a=t[s];if(a===void 0){let u=i.nodeName;Ae("PropertyBinding: Trying to update property for track: "+u+"."+s+" but it wasn't found.",t);return}let l=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?l=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(o!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Ae("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ae("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[o]!==void 0&&(o=t.morphTargetDictionary[o])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=o}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}return n.Composite=km,n})();Pt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Pt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Pt.prototype.GetterByBindingType=[Pt.prototype._getValue_direct,Pt.prototype._getValue_array,Pt.prototype._getValue_arrayElement,Pt.prototype._getValue_toArray];Pt.prototype.SetterByBindingTypeAndVersioning=[[Pt.prototype._setValue_direct,Pt.prototype._setValue_direct_setNeedsUpdate,Pt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Pt.prototype._setValue_array,Pt.prototype._setValue_array_setNeedsUpdate,Pt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Pt.prototype._setValue_arrayElement,Pt.prototype._setValue_arrayElement_setNeedsUpdate,Pt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Pt.prototype._setValue_fromArray,Pt.prototype._setValue_fromArray_setNeedsUpdate,Pt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var aG=new Float32Array(1);function cg(n,e,t,i){let r=aA(i);switch(t){case eg:return n*e;case ng:return n*e/r.components*r.byteLength;case id:return n*e/r.components*r.byteLength;case _s:return n*e*2/r.components*r.byteLength;case rd:return n*e*2/r.components*r.byteLength;case tg:return n*e*3/r.components*r.byteLength;case jn:return n*e*4/r.components*r.byteLength;case sd:return n*e*4/r.components*r.byteLength;case el:case tl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case nl:case il:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ad:case cd:return Math.max(n,16)*Math.max(e,8)/4;case od:case ld:return Math.max(n,8)*Math.max(e,8)/2;case ud:case dd:case hd:case pd:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case fd:case md:case gd:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case vd:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case yd:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case _d:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case xd:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Md:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case bd:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Sd:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Ed:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case wd:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Cd:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Td:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ad:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Id:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Dd:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Rd:case Nd:case Pd:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Od:case Ld:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Fd:case kd:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function aA(n){switch(n){case An:case Zm:return{byteLength:1,components:1};case wo:case Jm:case Ti:return{byteLength:2,components:1};case td:case nd:return{byteLength:2,components:4};case li:case ed:case ci:return{byteLength:4,components:1};case Km:case Qm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"182"}}));typeof window<"u"&&(window.__THREE__?De("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="182");function vM(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function cA(n){let e=new WeakMap;function t(a,l){let c=a.array,u=a.usage,d=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=n.SHORT;else if(c instanceof Uint32Array)h=n.UNSIGNED_INT;else if(c instanceof Int32Array)h=n.INT;else if(c instanceof Int8Array)h=n.BYTE;else if(c instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){let u=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,u);else{d.sort((h,v)=>h.start-v.start);let f=0;for(let h=1;h<d.length;h++){let v=d[f],y=d[h];y.start<=v.start+v.count+1?v.count=Math.max(v.count,y.start+y.count-v.start):(++f,d[f]=y)}d.length=f+1;for(let h=0,v=d.length;h<v;h++){let y=d[h];n.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var uA=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,dA=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,fA=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hA=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pA=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,mA=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gA=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,vA=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yA=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,_A=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xA=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,MA=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bA=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,SA=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,EA=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,wA=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,CA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,TA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,AA=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,IA=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,DA=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,RA=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,NA=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,PA=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,OA=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,LA=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,FA=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kA=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,UA=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,VA=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,BA="gl_FragColor = linearToOutputTexel( gl_FragColor );",HA=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,GA=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,WA=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,jA=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$A=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,qA=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,XA=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,YA=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ZA=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,JA=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,KA=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,QA=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,eI=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,tI=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,nI=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,iI=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rI=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sI=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,oI=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,aI=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lI=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( vec3( 1.0 ) - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,cI=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,uI=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,dI=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fI=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hI=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pI=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mI=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,gI=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vI=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,yI=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,_I=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xI=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,MI=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bI=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,SI=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,EI=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wI=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,CI=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,TI=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,AI=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,II=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,DI=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,RI=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,NI=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,PI=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,OI=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,LI=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,FI=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kI=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,UI=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,VI=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,BI=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,HI=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zI=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,GI=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,WI=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jI=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 0, 5, phi ).x + bitangent * vogelDiskSample( 0, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 1, 5, phi ).x + bitangent * vogelDiskSample( 1, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 2, 5, phi ).x + bitangent * vogelDiskSample( 2, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 3, 5, phi ).x + bitangent * vogelDiskSample( 3, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 4, 5, phi ).x + bitangent * vogelDiskSample( 4, 5, phi ).y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadow = step( depth, dp );
			#else
				shadow = step( dp, depth );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,$I=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,qI=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,XI=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,YI=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ZI=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,JI=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,KI=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,QI=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,eD=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tD=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nD=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,iD=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,rD=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,sD=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,oD=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,aD=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,lD=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,cD=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,uD=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dD=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fD=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hD=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pD=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mD=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,gD=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,vD=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,yD=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,_D=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xD=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,MD=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,bD=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,SD=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ED=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wD=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,CD=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,TD=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,AD=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ID=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,DD=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,RD=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ND=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,PD=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,OD=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,LD=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,FD=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kD=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,UD=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,VD=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,BD=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,HD=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zD=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ke={alphahash_fragment:uA,alphahash_pars_fragment:dA,alphamap_fragment:fA,alphamap_pars_fragment:hA,alphatest_fragment:pA,alphatest_pars_fragment:mA,aomap_fragment:gA,aomap_pars_fragment:vA,batching_pars_vertex:yA,batching_vertex:_A,begin_vertex:xA,beginnormal_vertex:MA,bsdfs:bA,iridescence_fragment:SA,bumpmap_pars_fragment:EA,clipping_planes_fragment:wA,clipping_planes_pars_fragment:CA,clipping_planes_pars_vertex:TA,clipping_planes_vertex:AA,color_fragment:IA,color_pars_fragment:DA,color_pars_vertex:RA,color_vertex:NA,common:PA,cube_uv_reflection_fragment:OA,defaultnormal_vertex:LA,displacementmap_pars_vertex:FA,displacementmap_vertex:kA,emissivemap_fragment:UA,emissivemap_pars_fragment:VA,colorspace_fragment:BA,colorspace_pars_fragment:HA,envmap_fragment:zA,envmap_common_pars_fragment:GA,envmap_pars_fragment:WA,envmap_pars_vertex:jA,envmap_physical_pars_fragment:nI,envmap_vertex:$A,fog_vertex:qA,fog_pars_vertex:XA,fog_fragment:YA,fog_pars_fragment:ZA,gradientmap_pars_fragment:JA,lightmap_pars_fragment:KA,lights_lambert_fragment:QA,lights_lambert_pars_fragment:eI,lights_pars_begin:tI,lights_toon_fragment:iI,lights_toon_pars_fragment:rI,lights_phong_fragment:sI,lights_phong_pars_fragment:oI,lights_physical_fragment:aI,lights_physical_pars_fragment:lI,lights_fragment_begin:cI,lights_fragment_maps:uI,lights_fragment_end:dI,logdepthbuf_fragment:fI,logdepthbuf_pars_fragment:hI,logdepthbuf_pars_vertex:pI,logdepthbuf_vertex:mI,map_fragment:gI,map_pars_fragment:vI,map_particle_fragment:yI,map_particle_pars_fragment:_I,metalnessmap_fragment:xI,metalnessmap_pars_fragment:MI,morphinstance_vertex:bI,morphcolor_vertex:SI,morphnormal_vertex:EI,morphtarget_pars_vertex:wI,morphtarget_vertex:CI,normal_fragment_begin:TI,normal_fragment_maps:AI,normal_pars_fragment:II,normal_pars_vertex:DI,normal_vertex:RI,normalmap_pars_fragment:NI,clearcoat_normal_fragment_begin:PI,clearcoat_normal_fragment_maps:OI,clearcoat_pars_fragment:LI,iridescence_pars_fragment:FI,opaque_fragment:kI,packing:UI,premultiplied_alpha_fragment:VI,project_vertex:BI,dithering_fragment:HI,dithering_pars_fragment:zI,roughnessmap_fragment:GI,roughnessmap_pars_fragment:WI,shadowmap_pars_fragment:jI,shadowmap_pars_vertex:$I,shadowmap_vertex:qI,shadowmask_pars_fragment:XI,skinbase_vertex:YI,skinning_pars_vertex:ZI,skinning_vertex:JI,skinnormal_vertex:KI,specularmap_fragment:QI,specularmap_pars_fragment:eD,tonemapping_fragment:tD,tonemapping_pars_fragment:nD,transmission_fragment:iD,transmission_pars_fragment:rD,uv_pars_fragment:sD,uv_pars_vertex:oD,uv_vertex:aD,worldpos_vertex:lD,background_vert:cD,background_frag:uD,backgroundCube_vert:dD,backgroundCube_frag:fD,cube_vert:hD,cube_frag:pD,depth_vert:mD,depth_frag:gD,distance_vert:vD,distance_frag:yD,equirect_vert:_D,equirect_frag:xD,linedashed_vert:MD,linedashed_frag:bD,meshbasic_vert:SD,meshbasic_frag:ED,meshlambert_vert:wD,meshlambert_frag:CD,meshmatcap_vert:TD,meshmatcap_frag:AD,meshnormal_vert:ID,meshnormal_frag:DD,meshphong_vert:RD,meshphong_frag:ND,meshphysical_vert:PD,meshphysical_frag:OD,meshtoon_vert:LD,meshtoon_frag:FD,points_vert:kD,points_frag:UD,shadow_vert:VD,shadow_frag:BD,sprite_vert:HD,sprite_frag:zD},ae={common:{diffuse:{value:new rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new Qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new rt(16777215)},opacity:{value:1},center:{value:new Qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},Ii={basic:{uniforms:on([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:on([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new rt(0)}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:on([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new rt(0)},specular:{value:new rt(1118481)},shininess:{value:30}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:on([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:on([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new rt(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:on([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:on([ae.points,ae.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:on([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:on([ae.common,ae.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:on([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:on([ae.sprite,ae.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distance:{uniforms:on([ae.common,ae.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distance_vert,fragmentShader:ke.distance_frag},shadow:{uniforms:on([ae.lights,ae.fog,{color:{value:new rt(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};Ii.physical={uniforms:on([Ii.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new Qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new Qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new rt(0)},specularColor:{value:new rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new Qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};var Bd={r:0,b:0,g:0},bs=new hs,GD=new Ht;function WD(n,e,t,i,r,s,o){let a=new rt(0),l=s===!0?0:1,c,u,d=null,f=0,h=null;function v(w){let E=w.isScene===!0?w.background:null;return E&&E.isTexture&&(E=(w.backgroundBlurriness>0?t:e).get(E)),E}function y(w){let E=!1,C=v(w);C===null?p(a,l):C&&C.isColor&&(p(C,1),E=!0);let A=n.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(w,E){let C=v(E);C&&(C.isCubeTexture||C.mapping===Ka)?(u===void 0&&(u=new pn(new bo(1,1,1),new sn({name:"BackgroundCubeMaterial",uniforms:Ms(Ii.backgroundCube.uniforms),vertexShader:Ii.backgroundCube.vertexShader,fragmentShader:Ii.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,I,k){this.matrixWorld.copyPosition(k.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),bs.copy(E.backgroundRotation),bs.x*=-1,bs.y*=-1,bs.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(bs.y*=-1,bs.z*=-1),u.material.uniforms.envMap.value=C,u.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(GD.makeRotationFromEuler(bs)),u.material.toneMapped=Ze.getTransfer(C.colorSpace)!==at,(d!==C||f!==C.version||h!==n.toneMapping)&&(u.material.needsUpdate=!0,d=C,f=C.version,h=n.toneMapping),u.layers.enableAll(),w.unshift(u,u.geometry,u.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new pn(new ms(2,2),new sn({name:"BackgroundMaterial",uniforms:Ms(Ii.background.uniforms),vertexShader:Ii.background.vertexShader,fragmentShader:Ii.background.fragmentShader,side:Xi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=Ze.getTransfer(C.colorSpace)!==at,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||f!==C.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,d=C,f=C.version,h=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function p(w,E){w.getRGB(Bd,og(n)),i.buffers.color.setClear(Bd.r,Bd.g,Bd.b,E,o)}function S(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,E=1){a.set(w),l=E,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,p(a,l)},render:y,addToRenderList:m,dispose:S}}function jD(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null),s=r,o=!1;function a(M,R,H,B,q){let j=!1,G=d(B,H,R);s!==G&&(s=G,c(s.object)),j=h(M,B,H,q),j&&v(M,B,H,q),q!==null&&e.update(q,n.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,E(M,R,H,B),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return n.createVertexArray()}function c(M){return n.bindVertexArray(M)}function u(M){return n.deleteVertexArray(M)}function d(M,R,H){let B=H.wireframe===!0,q=i[M.id];q===void 0&&(q={},i[M.id]=q);let j=q[R.id];j===void 0&&(j={},q[R.id]=j);let G=j[B];return G===void 0&&(G=f(l()),j[B]=G),G}function f(M){let R=[],H=[],B=[];for(let q=0;q<t;q++)R[q]=0,H[q]=0,B[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:H,attributeDivisors:B,object:M,attributes:{},index:null}}function h(M,R,H,B){let q=s.attributes,j=R.attributes,G=0,V=H.getAttributes();for(let Z in V)if(V[Z].location>=0){let oe=q[Z],de=j[Z];if(de===void 0&&(Z==="instanceMatrix"&&M.instanceMatrix&&(de=M.instanceMatrix),Z==="instanceColor"&&M.instanceColor&&(de=M.instanceColor)),oe===void 0||oe.attribute!==de||de&&oe.data!==de.data)return!0;G++}return s.attributesNum!==G||s.index!==B}function v(M,R,H,B){let q={},j=R.attributes,G=0,V=H.getAttributes();for(let Z in V)if(V[Z].location>=0){let oe=j[Z];oe===void 0&&(Z==="instanceMatrix"&&M.instanceMatrix&&(oe=M.instanceMatrix),Z==="instanceColor"&&M.instanceColor&&(oe=M.instanceColor));let de={};de.attribute=oe,oe&&oe.data&&(de.data=oe.data),q[Z]=de,G++}s.attributes=q,s.attributesNum=G,s.index=B}function y(){let M=s.newAttributes;for(let R=0,H=M.length;R<H;R++)M[R]=0}function m(M){p(M,0)}function p(M,R){let H=s.newAttributes,B=s.enabledAttributes,q=s.attributeDivisors;H[M]=1,B[M]===0&&(n.enableVertexAttribArray(M),B[M]=1),q[M]!==R&&(n.vertexAttribDivisor(M,R),q[M]=R)}function S(){let M=s.newAttributes,R=s.enabledAttributes;for(let H=0,B=R.length;H<B;H++)R[H]!==M[H]&&(n.disableVertexAttribArray(H),R[H]=0)}function w(M,R,H,B,q,j,G){G===!0?n.vertexAttribIPointer(M,R,H,q,j):n.vertexAttribPointer(M,R,H,B,q,j)}function E(M,R,H,B){y();let q=B.attributes,j=H.getAttributes(),G=R.defaultAttributeValues;for(let V in j){let Z=j[V];if(Z.location>=0){let ue=q[V];if(ue===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(ue=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(ue=M.instanceColor)),ue!==void 0){let oe=ue.normalized,de=ue.itemSize,Ge=e.get(ue);if(Ge===void 0)continue;let Ue=Ge.buffer,Et=Ge.type,bt=Ge.bytesPerElement,$=Et===n.INT||Et===n.UNSIGNED_INT||ue.gpuType===ed;if(ue.isInterleavedBufferAttribute){let J=ue.data,pe=J.stride,Le=ue.offset;if(J.isInstancedInterleavedBuffer){for(let ve=0;ve<Z.locationSize;ve++)p(Z.location+ve,J.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let ve=0;ve<Z.locationSize;ve++)m(Z.location+ve);n.bindBuffer(n.ARRAY_BUFFER,Ue);for(let ve=0;ve<Z.locationSize;ve++)w(Z.location+ve,de/Z.locationSize,Et,oe,pe*bt,(Le+de/Z.locationSize*ve)*bt,$)}else{if(ue.isInstancedBufferAttribute){for(let J=0;J<Z.locationSize;J++)p(Z.location+J,ue.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let J=0;J<Z.locationSize;J++)m(Z.location+J);n.bindBuffer(n.ARRAY_BUFFER,Ue);for(let J=0;J<Z.locationSize;J++)w(Z.location+J,de/Z.locationSize,Et,oe,de*bt,de/Z.locationSize*J*bt,$)}}else if(G!==void 0){let oe=G[V];if(oe!==void 0)switch(oe.length){case 2:n.vertexAttrib2fv(Z.location,oe);break;case 3:n.vertexAttrib3fv(Z.location,oe);break;case 4:n.vertexAttrib4fv(Z.location,oe);break;default:n.vertexAttrib1fv(Z.location,oe)}}}}S()}function C(){k();for(let M in i){let R=i[M];for(let H in R){let B=R[H];for(let q in B)u(B[q].object),delete B[q];delete R[H]}delete i[M]}}function A(M){if(i[M.id]===void 0)return;let R=i[M.id];for(let H in R){let B=R[H];for(let q in B)u(B[q].object),delete B[q];delete R[H]}delete i[M.id]}function I(M){for(let R in i){let H=i[R];if(H[M.id]===void 0)continue;let B=H[M.id];for(let q in B)u(B[q].object),delete B[q];delete H[M.id]}}function k(){x(),o=!0,s!==r&&(s=r,c(s.object))}function x(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:k,resetDefaultState:x,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfProgram:I,initAttributes:y,enableAttribute:m,disableUnusedAttributes:S}}function $D(n,e,t){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),t.update(u,i,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let h=0;for(let v=0;v<d;v++)h+=u[v];t.update(h,i,1)}function l(c,u,d,f){if(d===0)return;let h=e.get("WEBGL_multi_draw");if(h===null)for(let v=0;v<c.length;v++)o(c[v],u[v],f[v]);else{h.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,d);let v=0;for(let y=0;y<d;y++)v+=u[y]*f[y];t.update(v,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function qD(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let I=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(I){return!(I!==jn&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){let k=I===Ti&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==An&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==ci&&!k)}function l(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(De("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=n.getParameter(n.MAX_SAMPLES),A=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:v,maxTextureSize:y,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:w,maxFragmentUniforms:E,maxSamples:C,samples:A}}function XD(n){let e=this,t=null,i=0,r=!1,s=!1,o=new Mi,a=new Oe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let h=d.length!==0||f||i!==0||r;return r=f,i=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){let v=d.clippingPlanes,y=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!r||v===null||v.length===0||s&&!m)s?u(null):c();else{let S=s?0:i,w=S*4,E=p.clippingState||null;l.value=E,E=u(v,f,w,h);for(let C=0;C!==w;++C)E[C]=t[C];p.clippingState=E,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,h,v){let y=d!==null?d.length:0,m=null;if(y!==0){if(m=l.value,v!==!0||m===null){let p=h+y*4,S=f.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,E=h;w!==y;++w,E+=4)o.copy(d[w]).applyMatrix4(S,a),o.normal.toArray(m,E),m[E+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function YD(n){let e=new WeakMap;function t(o,a){return a===Ju?o.mapping=Sr:a===Ku&&(o.mapping=ys),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Ju||a===Ku)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new ja(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){let a=o.target;a.removeEventListener("dispose",r);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}var Cr=4,Yx=[.125,.215,.35,.446,.526,.582],Es=20,ZD=256,sl=new vs,Zx=new rt,ug=null,dg=0,fg=0,hg=!1,JD=new F,zd=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:o=256,position:a=JD}=s;ug=this._renderer.getRenderTarget(),dg=this._renderer.getActiveCubeFace(),fg=this._renderer.getActiveMipmapLevel(),hg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qx(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kx(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ug,dg,fg),this._renderer.xr.enabled=hg,e.scissorTest=!1,To(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Sr||e.mapping===ys?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ug=this._renderer.getRenderTarget(),dg=this._renderer.getActiveCubeFace(),fg=this._renderer.getActiveMipmapLevel(),hg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:Ti,format:jn,colorSpace:fs,depthBuffer:!1},r=Jx(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Jx(e,t,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=KD(s)),this._blurMaterial=e1(s,e,t),this._ggxMaterial=QD(s,e,t)}return r}_compileMaterial(e){let t=new pn(new Ei,e);this._renderer.compile(t,sl)}_sceneToCubeUV(e,t,i,r,s){let l=new hn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(Zx),d.toneMapping=ai,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new pn(new bo,new Ba({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1})));let y=this._backgroundBox,m=y.material,p=!1,S=e.background;S?S.isColor&&(m.color.copy(S),e.background=null,p=!0):(m.color.copy(Zx),p=!0);for(let w=0;w<6;w++){let E=w%3;E===0?(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[w],s.y,s.z)):E===1?(l.up.set(0,0,c[w]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[w],s.z)):(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[w]));let C=this._cubeSize;To(r,E*C,w>2?C:0,C,C),d.setRenderTarget(r),p&&d.render(y,l),d.render(e,l)}d.toneMapping=h,d.autoClear=f,e.background=S}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===Sr||e.mapping===ys;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qx()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kx());let s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;let a=s.uniforms;a.envMap.value=e;let l=this._cubeSize;To(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,sl)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;let l=o.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),f=0+c*1.25,h=d*f,{_lodMax:v}=this,y=this._sizeLods[i],m=3*y*(i>v-Cr?i-v+Cr:0),p=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=h,l.mipInt.value=v-t,To(s,m,p,3*y,2*y),r.setRenderTarget(s),r.render(a,sl),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=v-i,To(e,m,p,3*y,2*y),r.setRenderTarget(e),r.render(a,sl)}_blur(e,t,i,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Ae("blur direction must be either latitudinal or longitudinal!");let u=3,d=this._lodMeshes[r];d.material=c;let f=c.uniforms,h=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*Es-1),y=s/v,m=isFinite(s)?1+Math.floor(u*y):Es;m>Es&&De(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Es}`);let p=[],S=0;for(let I=0;I<Es;++I){let k=I/y,x=Math.exp(-k*k/2);p.push(x),I===0?S+=x:I<m&&(S+=2*x)}for(let I=0;I<p.length;I++)p[I]=p[I]/S;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:w}=this;f.dTheta.value=v,f.mipInt.value=w-i;let E=this._sizeLods[r],C=3*E*(r>w-Cr?r-w+Cr:0),A=4*(this._cubeSize-E);To(t,C,A,3*E,2*E),l.setRenderTarget(t),l.render(d,sl)}};function KD(n){let e=[],t=[],i=[],r=n,s=n-Cr+1+Yx.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);e.push(a);let l=1/a;o>n-Cr?l=Yx[o-n+Cr-1]:o===0&&(l=0),t.push(l);let c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,v=6,y=3,m=2,p=1,S=new Float32Array(y*v*h),w=new Float32Array(m*v*h),E=new Float32Array(p*v*h);for(let A=0;A<h;A++){let I=A%3*2/3-1,k=A>2?0:-1,x=[I,k,0,I+2/3,k,0,I+2/3,k+1,0,I,k,0,I+2/3,k+1,0,I,k+1,0];S.set(x,y*v*A),w.set(f,m*v*A);let M=[A,A,A,A,A,A];E.set(M,p*v*A)}let C=new Ei;C.setAttribute("position",new wn(S,y)),C.setAttribute("uv",new wn(w,m)),C.setAttribute("faceIndex",new wn(E,p)),i.push(new pn(C,null)),r>Cr&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Jx(n,e,t){let i=new Cn(n,e,t);return i.texture.mapping=Ka,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function To(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function QD(n,e,t){return new sn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ZD,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Wd(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function e1(n,e,t){let i=new Float32Array(Es),r=new F(0,1,0);return new sn({name:"SphericalGaussianBlur",defines:{n:Es,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Wd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Kx(){return new sn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Qx(){return new sn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Wd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function t1(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===Ju||l===Ku,u=l===Sr||l===ys;if(c||u){let d=e.get(a),f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new zd(n)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{let h=a.image;return c&&h&&h.height>0||u&&h&&r(h)?(t===null&&(t=new zd(n)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function r(a){let l=0,c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){let l=a.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function n1(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&_o("WebGLRenderer: "+i+" extension not supported."),r}}}function i1(n,e,t,i){let r={},s=new WeakMap;function o(d){let f=d.target;f.index!==null&&e.remove(f.index);for(let v in f.attributes)e.remove(f.attributes[v]);f.removeEventListener("dispose",o),delete r[f.id];let h=s.get(f);h&&(e.remove(h),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function l(d){let f=d.attributes;for(let h in f)e.update(f[h],n.ARRAY_BUFFER)}function c(d){let f=[],h=d.index,v=d.attributes.position,y=0;if(h!==null){let S=h.array;y=h.version;for(let w=0,E=S.length;w<E;w+=3){let C=S[w+0],A=S[w+1],I=S[w+2];f.push(C,A,A,I,I,C)}}else if(v!==void 0){let S=v.array;y=v.version;for(let w=0,E=S.length/3-1;w<E;w+=3){let C=w+0,A=w+1,I=w+2;f.push(C,A,A,I,I,C)}}else return;let m=new(rg(f)?za:Ha)(f,1);m.version=y;let p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){let f=s.get(d);if(f){let h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function r1(n,e,t){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,h){n.drawElements(i,h,s,f*o),t.update(h,i,1)}function c(f,h,v){v!==0&&(n.drawElementsInstanced(i,h,s,f*o,v),t.update(h,i,v))}function u(f,h,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,f,0,v);let m=0;for(let p=0;p<v;p++)m+=h[p];t.update(m,i,1)}function d(f,h,v,y){if(v===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,h[p],y[p]);else{m.multiDrawElementsInstancedWEBGL(i,h,0,s,f,0,y,0,v);let p=0;for(let S=0;S<v;S++)p+=h[S]*y[S];t.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function s1(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:Ae("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function o1(n,e,t){let i=new WeakMap,r=new Ot;function s(o,a,l){let c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,f=i.get(a);if(f===void 0||f.count!==d){let M=function(){k.dispose(),i.delete(a),a.removeEventListener("dispose",M)};var h=M;f!==void 0&&f.texture.dispose();let v=a.morphAttributes.position!==void 0,y=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],E=0;v===!0&&(E=1),y===!0&&(E=2),m===!0&&(E=3);let C=a.attributes.position.count*E,A=1;C>e.maxTextureSize&&(A=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);let I=new Float32Array(C*A*4*d),k=new Ua(I,C,A,d);k.type=ci,k.needsUpdate=!0;let x=E*4;for(let R=0;R<d;R++){let H=p[R],B=S[R],q=w[R],j=C*A*4*R;for(let G=0;G<H.count;G++){let V=G*x;v===!0&&(r.fromBufferAttribute(H,G),I[j+V+0]=r.x,I[j+V+1]=r.y,I[j+V+2]=r.z,I[j+V+3]=0),y===!0&&(r.fromBufferAttribute(B,G),I[j+V+4]=r.x,I[j+V+5]=r.y,I[j+V+6]=r.z,I[j+V+7]=0),m===!0&&(r.fromBufferAttribute(q,G),I[j+V+8]=r.x,I[j+V+9]=r.y,I[j+V+10]=r.z,I[j+V+11]=q.itemSize===4?r.w:1)}}f={count:d,texture:k,size:new Qe(C,A)},i.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let v=0;for(let m=0;m<c.length;m++)v+=c[m];let y=a.morphTargetsRelative?1:1-v;l.getUniforms().setValue(n,"morphTargetBaseInfluence",y),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function a1(n,e,t,i){let r=new WeakMap;function s(l){let c=i.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return d}function o(){r=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}var l1={[Gm]:"LINEAR_TONE_MAPPING",[Wm]:"REINHARD_TONE_MAPPING",[jm]:"CINEON_TONE_MAPPING",[$m]:"ACES_FILMIC_TONE_MAPPING",[Xm]:"AGX_TONE_MAPPING",[Ym]:"NEUTRAL_TONE_MAPPING",[qm]:"CUSTOM_TONE_MAPPING"};function c1(n,e,t,i,r){let s=new Cn(e,t,{type:n,depthBuffer:i,stencilBuffer:r}),o=new Cn(e,t,{type:Ti,depthBuffer:!1,stencilBuffer:!1}),a=new Ei;a.setAttribute("position",new Wn([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new Wn([0,2,0,0,2,0],2));let l=new Pu({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new pn(a,l),u=new vs(-1,1,1,-1,0,1),d=null,f=null,h=!1,v,y=null,m=[],p=!1;this.setSize=function(S,w){s.setSize(S,w),o.setSize(S,w);for(let E=0;E<m.length;E++){let C=m[E];C.setSize&&C.setSize(S,w)}},this.setEffects=function(S){m=S,p=m.length>0&&m[0].isRenderPass===!0;let w=s.width,E=s.height;for(let C=0;C<m.length;C++){let A=m[C];A.setSize&&A.setSize(w,E)}},this.begin=function(S,w){if(h||S.toneMapping===ai&&m.length===0)return!1;if(y=w,w!==null){let E=w.width,C=w.height;(s.width!==E||s.height!==C)&&this.setSize(E,C)}return p===!1&&S.setRenderTarget(s),v=S.toneMapping,S.toneMapping=ai,!0},this.hasRenderPass=function(){return p},this.end=function(S,w){S.toneMapping=v,h=!0;let E=s,C=o;for(let A=0;A<m.length;A++){let I=m[A];if(I.enabled!==!1&&(I.render(S,C,E,w),I.needsSwap!==!1)){let k=E;E=C,C=k}}if(d!==S.outputColorSpace||f!==S.toneMapping){d=S.outputColorSpace,f=S.toneMapping,l.defines={},Ze.getTransfer(d)===at&&(l.defines.SRGB_TRANSFER="");let A=l1[f];A&&(l.defines[A]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=E.texture,S.setRenderTarget(y),S.render(c,u),y=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){s.dispose(),o.dispose(),a.dispose(),l.dispose()}}var yM=new Ki,gg=new xr(1,1),_M=new Ua,xM=new Au,MM=new Wa,eM=[],tM=[],nM=new Float32Array(16),iM=new Float32Array(9),rM=new Float32Array(4);function Io(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=eM[r];if(s===void 0&&(s=new Float32Array(r),eM[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Wt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function jt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function jd(n,e){let t=tM[e];t===void 0&&(t=new Int32Array(e),tM[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function u1(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function d1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;n.uniform2fv(this.addr,e),jt(t,e)}}function f1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Wt(t,e))return;n.uniform3fv(this.addr,e),jt(t,e)}}function h1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;n.uniform4fv(this.addr,e),jt(t,e)}}function p1(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Wt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),jt(t,e)}else{if(Wt(t,i))return;rM.set(i),n.uniformMatrix2fv(this.addr,!1,rM),jt(t,i)}}function m1(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Wt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),jt(t,e)}else{if(Wt(t,i))return;iM.set(i),n.uniformMatrix3fv(this.addr,!1,iM),jt(t,i)}}function g1(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Wt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),jt(t,e)}else{if(Wt(t,i))return;nM.set(i),n.uniformMatrix4fv(this.addr,!1,nM),jt(t,i)}}function v1(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function y1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;n.uniform2iv(this.addr,e),jt(t,e)}}function _1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;n.uniform3iv(this.addr,e),jt(t,e)}}function x1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;n.uniform4iv(this.addr,e),jt(t,e)}}function M1(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function b1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;n.uniform2uiv(this.addr,e),jt(t,e)}}function S1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;n.uniform3uiv(this.addr,e),jt(t,e)}}function E1(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;n.uniform4uiv(this.addr,e),jt(t,e)}}function w1(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(gg.compareFunction=t.isReversedDepthBuffer()?Vd:Ud,s=gg):s=yM,t.setTexture2D(e||s,r)}function C1(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||xM,r)}function T1(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||MM,r)}function A1(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||_M,r)}function I1(n){switch(n){case 5126:return u1;case 35664:return d1;case 35665:return f1;case 35666:return h1;case 35674:return p1;case 35675:return m1;case 35676:return g1;case 5124:case 35670:return v1;case 35667:case 35671:return y1;case 35668:case 35672:return _1;case 35669:case 35673:return x1;case 5125:return M1;case 36294:return b1;case 36295:return S1;case 36296:return E1;case 35678:case 36198:case 36298:case 36306:case 35682:return w1;case 35679:case 36299:case 36307:return C1;case 35680:case 36300:case 36308:case 36293:return T1;case 36289:case 36303:case 36311:case 36292:return A1}}function D1(n,e){n.uniform1fv(this.addr,e)}function R1(n,e){let t=Io(e,this.size,2);n.uniform2fv(this.addr,t)}function N1(n,e){let t=Io(e,this.size,3);n.uniform3fv(this.addr,t)}function P1(n,e){let t=Io(e,this.size,4);n.uniform4fv(this.addr,t)}function O1(n,e){let t=Io(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function L1(n,e){let t=Io(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function F1(n,e){let t=Io(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function k1(n,e){n.uniform1iv(this.addr,e)}function U1(n,e){n.uniform2iv(this.addr,e)}function V1(n,e){n.uniform3iv(this.addr,e)}function B1(n,e){n.uniform4iv(this.addr,e)}function H1(n,e){n.uniform1uiv(this.addr,e)}function z1(n,e){n.uniform2uiv(this.addr,e)}function G1(n,e){n.uniform3uiv(this.addr,e)}function W1(n,e){n.uniform4uiv(this.addr,e)}function j1(n,e,t){let i=this.cache,r=e.length,s=jd(t,r);Wt(i,s)||(n.uniform1iv(this.addr,s),jt(i,s));let o;this.type===n.SAMPLER_2D_SHADOW?o=gg:o=yM;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function $1(n,e,t){let i=this.cache,r=e.length,s=jd(t,r);Wt(i,s)||(n.uniform1iv(this.addr,s),jt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||xM,s[o])}function q1(n,e,t){let i=this.cache,r=e.length,s=jd(t,r);Wt(i,s)||(n.uniform1iv(this.addr,s),jt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||MM,s[o])}function X1(n,e,t){let i=this.cache,r=e.length,s=jd(t,r);Wt(i,s)||(n.uniform1iv(this.addr,s),jt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||_M,s[o])}function Y1(n){switch(n){case 5126:return D1;case 35664:return R1;case 35665:return N1;case 35666:return P1;case 35674:return O1;case 35675:return L1;case 35676:return F1;case 5124:case 35670:return k1;case 35667:case 35671:return U1;case 35668:case 35672:return V1;case 35669:case 35673:return B1;case 5125:return H1;case 36294:return z1;case 36295:return G1;case 36296:return W1;case 35678:case 36198:case 36298:case 36306:case 35682:return j1;case 35679:case 36299:case 36307:return $1;case 35680:case 36300:case 36308:case 36293:return q1;case 36289:case 36303:case 36311:case 36292:return X1}}var vg=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=I1(t.type)}},yg=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Y1(t.type)}},_g=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],i)}}},pg=/(\w+)(\])?(\[|\.)?/g;function sM(n,e){n.seq.push(e),n.map[e.id]=e}function Z1(n,e,t){let i=n.name,r=i.length;for(pg.lastIndex=0;;){let s=pg.exec(i),o=pg.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){sM(t,c===void 0?new vg(a,n,e):new yg(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new _g(a),sM(t,d)),t=d}}}var Ao=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);Z1(a,l,this)}let r=[],s=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&i.push(o)}return i}};function oM(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var J1=37297,K1=0;function Q1(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var aM=new Oe;function eR(n){Ze._getMatrix(aM,Ze.workingColorSpace,n);let e=`mat3( ${aM.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(n)){case La:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return De("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function lM(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+Q1(n.getShaderSource(e),a)}else return s}function tR(n,e){let t=eR(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var nR={[Gm]:"Linear",[Wm]:"Reinhard",[jm]:"Cineon",[$m]:"ACESFilmic",[Xm]:"AgX",[Ym]:"Neutral",[qm]:"Custom"};function iR(n,e){let t=nR[e];return t===void 0?(De("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Hd=new F;function rR(){Ze.getLuminanceCoefficients(Hd);let n=Hd.x.toFixed(4),e=Hd.y.toFixed(4),t=Hd.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sR(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(al).join(`
`)}function oR(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function aR(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function al(n){return n!==""}function cM(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function uM(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var lR=/^[ \t]*#include +<([\w\d./]+)>/gm;function xg(n){return n.replace(lR,uR)}var cR=new Map;function uR(n,e){let t=ke[e];if(t===void 0){let i=cR.get(e);if(i!==void 0)t=ke[i],De('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return xg(t)}var dR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dM(n){return n.replace(dR,fR)}function fR(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function fM(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var hR={[Ja]:"SHADOWMAP_TYPE_PCF",[Eo]:"SHADOWMAP_TYPE_VSM"};function pR(n){return hR[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var mR={[Sr]:"ENVMAP_TYPE_CUBE",[ys]:"ENVMAP_TYPE_CUBE",[Ka]:"ENVMAP_TYPE_CUBE_UV"};function gR(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":mR[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var vR={[ys]:"ENVMAP_MODE_REFRACTION"};function yR(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":vR[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var _R={[zm]:"ENVMAP_BLENDING_MULTIPLY",[Px]:"ENVMAP_BLENDING_MIX",[Ox]:"ENVMAP_BLENDING_ADD"};function xR(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":_R[n.combine]||"ENVMAP_BLENDING_NONE"}function MR(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function bR(n,e,t,i){let r=n.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,l=pR(t),c=gR(t),u=yR(t),d=xR(t),f=MR(t),h=sR(t),v=oR(s),y=r.createProgram(),m,p,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(al).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(al).join(`
`),p.length>0&&(p+=`
`)):(m=[fM(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(al).join(`
`),p=[fM(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ai?"#define TONE_MAPPING":"",t.toneMapping!==ai?ke.tonemapping_pars_fragment:"",t.toneMapping!==ai?iR("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,tR("linearToOutputTexel",t.outputColorSpace),rR(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(al).join(`
`)),o=xg(o),o=cM(o,t),o=uM(o,t),a=xg(a),a=cM(a,t),a=uM(a,t),o=dM(o),a=dM(a),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===ig?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ig?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let w=S+m+o,E=S+p+a,C=oM(r,r.VERTEX_SHADER,w),A=oM(r,r.FRAGMENT_SHADER,E);r.attachShader(y,C),r.attachShader(y,A),t.index0AttributeName!==void 0?r.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function I(R){if(n.debug.checkShaderErrors){let H=r.getProgramInfoLog(y)||"",B=r.getShaderInfoLog(C)||"",q=r.getShaderInfoLog(A)||"",j=H.trim(),G=B.trim(),V=q.trim(),Z=!0,ue=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(Z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,y,C,A);else{let oe=lM(r,C,"vertex"),de=lM(r,A,"fragment");Ae("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+j+`
`+oe+`
`+de)}else j!==""?De("WebGLProgram: Program Info Log:",j):(G===""||V==="")&&(ue=!1);ue&&(R.diagnostics={runnable:Z,programLog:j,vertexShader:{log:G,prefix:m},fragmentShader:{log:V,prefix:p}})}r.deleteShader(C),r.deleteShader(A),k=new Ao(r,y),x=aR(r,y)}let k;this.getUniforms=function(){return k===void 0&&I(this),k};let x;this.getAttributes=function(){return x===void 0&&I(this),x};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(y,J1)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=K1++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=C,this.fragmentShader=A,this}var SR=0,Mg=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new bg(e),t.set(e,i)),i}},bg=class{constructor(e){this.id=SR++,this.code=e,this.usedTimes=0}};function ER(n,e,t,i,r,s,o){let a=new Va,l=new Mg,c=new Set,u=[],d=new Map,f=r.logarithmicDepthBuffer,h=r.precision,v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(x){return c.add(x),x===0?"uv":`uv${x}`}function m(x,M,R,H,B){let q=H.fog,j=B.geometry,G=x.isMeshStandardMaterial?H.environment:null,V=(x.isMeshStandardMaterial?t:e).get(x.envMap||G),Z=V&&V.mapping===Ka?V.image.height:null,ue=v[x.type];x.precision!==null&&(h=r.getMaxPrecision(x.precision),h!==x.precision&&De("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));let oe=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,de=oe!==void 0?oe.length:0,Ge=0;j.morphAttributes.position!==void 0&&(Ge=1),j.morphAttributes.normal!==void 0&&(Ge=2),j.morphAttributes.color!==void 0&&(Ge=3);let Ue,Et,bt,$;if(ue){let ct=Ii[ue];Ue=ct.vertexShader,Et=ct.fragmentShader}else Ue=x.vertexShader,Et=x.fragmentShader,l.update(x),bt=l.getVertexShaderID(x),$=l.getFragmentShaderID(x);let J=n.getRenderTarget(),pe=n.state.buffers.depth.getReversed(),Le=B.isInstancedMesh===!0,ve=B.isBatchedMesh===!0,et=!!x.map,$t=!!x.matcap,Je=!!V,lt=!!x.aoMap,mt=!!x.lightMap,Ve=!!x.bumpMap,Ut=!!x.normalMap,T=!!x.displacementMap,Vt=!!x.emissiveMap,st=!!x.metalnessMap,_t=!!x.roughnessMap,_e=x.anisotropy>0,b=x.clearcoat>0,g=x.dispersion>0,N=x.iridescence>0,W=x.sheen>0,Y=x.transmission>0,z=_e&&!!x.anisotropyMap,Me=b&&!!x.clearcoatMap,ne=b&&!!x.clearcoatNormalMap,ye=b&&!!x.clearcoatRoughnessMap,Ie=N&&!!x.iridescenceMap,Q=N&&!!x.iridescenceThicknessMap,re=W&&!!x.sheenColorMap,ge=W&&!!x.sheenRoughnessMap,xe=!!x.specularMap,ie=!!x.specularColorMap,Be=!!x.specularIntensityMap,D=Y&&!!x.transmissionMap,ce=Y&&!!x.thicknessMap,ee=!!x.gradientMap,fe=!!x.alphaMap,K=x.alphaTest>0,X=!!x.alphaHash,te=!!x.extensions,Re=ai;x.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Re=n.toneMapping);let xt={shaderID:ue,shaderType:x.type,shaderName:x.name,vertexShader:Ue,fragmentShader:Et,defines:x.defines,customVertexShaderID:bt,customFragmentShaderID:$,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:ve,batchingColor:ve&&B._colorsTexture!==null,instancing:Le,instancingColor:Le&&B.instanceColor!==null,instancingMorph:Le&&B.morphTexture!==null,outputColorSpace:J===null?n.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:fs,alphaToCoverage:!!x.alphaToCoverage,map:et,matcap:$t,envMap:Je,envMapMode:Je&&V.mapping,envMapCubeUVHeight:Z,aoMap:lt,lightMap:mt,bumpMap:Ve,normalMap:Ut,displacementMap:T,emissiveMap:Vt,normalMapObjectSpace:Ut&&x.normalMapType===Ux,normalMapTangentSpace:Ut&&x.normalMapType===kx,metalnessMap:st,roughnessMap:_t,anisotropy:_e,anisotropyMap:z,clearcoat:b,clearcoatMap:Me,clearcoatNormalMap:ne,clearcoatRoughnessMap:ye,dispersion:g,iridescence:N,iridescenceMap:Ie,iridescenceThicknessMap:Q,sheen:W,sheenColorMap:re,sheenRoughnessMap:ge,specularMap:xe,specularColorMap:ie,specularIntensityMap:Be,transmission:Y,transmissionMap:D,thicknessMap:ce,gradientMap:ee,opaque:x.transparent===!1&&x.blending===us&&x.alphaToCoverage===!1,alphaMap:fe,alphaTest:K,alphaHash:X,combine:x.combine,mapUv:et&&y(x.map.channel),aoMapUv:lt&&y(x.aoMap.channel),lightMapUv:mt&&y(x.lightMap.channel),bumpMapUv:Ve&&y(x.bumpMap.channel),normalMapUv:Ut&&y(x.normalMap.channel),displacementMapUv:T&&y(x.displacementMap.channel),emissiveMapUv:Vt&&y(x.emissiveMap.channel),metalnessMapUv:st&&y(x.metalnessMap.channel),roughnessMapUv:_t&&y(x.roughnessMap.channel),anisotropyMapUv:z&&y(x.anisotropyMap.channel),clearcoatMapUv:Me&&y(x.clearcoatMap.channel),clearcoatNormalMapUv:ne&&y(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&y(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Ie&&y(x.iridescenceMap.channel),iridescenceThicknessMapUv:Q&&y(x.iridescenceThicknessMap.channel),sheenColorMapUv:re&&y(x.sheenColorMap.channel),sheenRoughnessMapUv:ge&&y(x.sheenRoughnessMap.channel),specularMapUv:xe&&y(x.specularMap.channel),specularColorMapUv:ie&&y(x.specularColorMap.channel),specularIntensityMapUv:Be&&y(x.specularIntensityMap.channel),transmissionMapUv:D&&y(x.transmissionMap.channel),thicknessMapUv:ce&&y(x.thicknessMap.channel),alphaMapUv:fe&&y(x.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Ut||_e),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!j.attributes.uv&&(et||fe),fog:!!q,useFog:x.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:x.flatShading===!0&&x.wireframe===!1,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:pe,skinning:B.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:Ge,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:Re,decodeVideoTexture:et&&x.map.isVideoTexture===!0&&Ze.getTransfer(x.map.colorSpace)===at,decodeVideoTextureEmissive:Vt&&x.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(x.emissiveMap.colorSpace)===at,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===wi,flipSided:x.side===cn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:te&&x.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(te&&x.extensions.multiDraw===!0||ve)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return xt.vertexUv1s=c.has(1),xt.vertexUv2s=c.has(2),xt.vertexUv3s=c.has(3),c.clear(),xt}function p(x){let M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(let R in x.defines)M.push(R),M.push(x.defines[R]);return x.isRawShaderMaterial===!1&&(S(M,x),w(M,x),M.push(n.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function S(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapCubeUVHeight),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.morphAttributeCount),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function w(x,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),x.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),x.push(a.mask)}function E(x){let M=v[x.type],R;if(M){let H=Ii[M];R=Xx.clone(H.uniforms)}else R=x.uniforms;return R}function C(x,M){let R=d.get(M);return R!==void 0?++R.usedTimes:(R=new bR(n,M,x,s),u.push(R),d.set(M,R)),R}function A(x){if(--x.usedTimes===0){let M=u.indexOf(x);u[M]=u[u.length-1],u.pop(),d.delete(x.cacheKey),x.destroy()}}function I(x){l.remove(x)}function k(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:E,acquireProgram:C,releaseProgram:A,releaseShaderCache:I,programs:u,dispose:k}}function wR(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function CR(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function hM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function pM(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(d,f,h,v,y,m){let p=n[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:v,renderOrder:d.renderOrder,z:y,group:m},n[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=v,p.renderOrder=d.renderOrder,p.z=y,p.group=m),e++,p}function a(d,f,h,v,y,m){let p=o(d,f,h,v,y,m);h.transmission>0?i.push(p):h.transparent===!0?r.push(p):t.push(p)}function l(d,f,h,v,y,m){let p=o(d,f,h,v,y,m);h.transmission>0?i.unshift(p):h.transparent===!0?r.unshift(p):t.unshift(p)}function c(d,f){t.length>1&&t.sort(d||CR),i.length>1&&i.sort(f||hM),r.length>1&&r.sort(f||hM)}function u(){for(let d=e,f=n.length;d<f;d++){let h=n[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function TR(){let n=new WeakMap;function e(i,r){let s=n.get(i),o;return s===void 0?(o=new pM,n.set(i,[o])):r>=s.length?(o=new pM,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function AR(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new rt};break;case"SpotLight":t={position:new F,direction:new F,color:new rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new rt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new rt,groundColor:new rt};break;case"RectAreaLight":t={color:new rt,position:new F,halfWidth:new F,halfHeight:new F};break}return n[e.id]=t,t}}}function IR(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var DR=0;function RR(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function NR(n){let e=new AR,t=IR(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new F);let r=new F,s=new Ht,o=new Ht;function a(c){let u=0,d=0,f=0;for(let x=0;x<9;x++)i.probe[x].set(0,0,0);let h=0,v=0,y=0,m=0,p=0,S=0,w=0,E=0,C=0,A=0,I=0;c.sort(RR);for(let x=0,M=c.length;x<M;x++){let R=c[x],H=R.color,B=R.intensity,q=R.distance,j=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===_s?j=R.shadow.map.texture:j=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)u+=H.r*B,d+=H.g*B,f+=H.b*B;else if(R.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(R.sh.coefficients[G],B);I++}else if(R.isDirectionalLight){let G=e.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let V=R.shadow,Z=t.get(R);Z.shadowIntensity=V.intensity,Z.shadowBias=V.bias,Z.shadowNormalBias=V.normalBias,Z.shadowRadius=V.radius,Z.shadowMapSize=V.mapSize,i.directionalShadow[h]=Z,i.directionalShadowMap[h]=j,i.directionalShadowMatrix[h]=R.shadow.matrix,S++}i.directional[h]=G,h++}else if(R.isSpotLight){let G=e.get(R);G.position.setFromMatrixPosition(R.matrixWorld),G.color.copy(H).multiplyScalar(B),G.distance=q,G.coneCos=Math.cos(R.angle),G.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),G.decay=R.decay,i.spot[y]=G;let V=R.shadow;if(R.map&&(i.spotLightMap[C]=R.map,C++,V.updateMatrices(R),R.castShadow&&A++),i.spotLightMatrix[y]=V.matrix,R.castShadow){let Z=t.get(R);Z.shadowIntensity=V.intensity,Z.shadowBias=V.bias,Z.shadowNormalBias=V.normalBias,Z.shadowRadius=V.radius,Z.shadowMapSize=V.mapSize,i.spotShadow[y]=Z,i.spotShadowMap[y]=j,E++}y++}else if(R.isRectAreaLight){let G=e.get(R);G.color.copy(H).multiplyScalar(B),G.halfWidth.set(R.width*.5,0,0),G.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=G,m++}else if(R.isPointLight){let G=e.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),G.distance=R.distance,G.decay=R.decay,R.castShadow){let V=R.shadow,Z=t.get(R);Z.shadowIntensity=V.intensity,Z.shadowBias=V.bias,Z.shadowNormalBias=V.normalBias,Z.shadowRadius=V.radius,Z.shadowMapSize=V.mapSize,Z.shadowCameraNear=V.camera.near,Z.shadowCameraFar=V.camera.far,i.pointShadow[v]=Z,i.pointShadowMap[v]=j,i.pointShadowMatrix[v]=R.shadow.matrix,w++}i.point[v]=G,v++}else if(R.isHemisphereLight){let G=e.get(R);G.skyColor.copy(R.color).multiplyScalar(B),G.groundColor.copy(R.groundColor).multiplyScalar(B),i.hemi[p]=G,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ae.LTC_FLOAT_1,i.rectAreaLTC2=ae.LTC_FLOAT_2):(i.rectAreaLTC1=ae.LTC_HALF_1,i.rectAreaLTC2=ae.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;let k=i.hash;(k.directionalLength!==h||k.pointLength!==v||k.spotLength!==y||k.rectAreaLength!==m||k.hemiLength!==p||k.numDirectionalShadows!==S||k.numPointShadows!==w||k.numSpotShadows!==E||k.numSpotMaps!==C||k.numLightProbes!==I)&&(i.directional.length=h,i.spot.length=y,i.rectArea.length=m,i.point.length=v,i.hemi.length=p,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=E+C-A,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=I,k.directionalLength=h,k.pointLength=v,k.spotLength=y,k.rectAreaLength=m,k.hemiLength=p,k.numDirectionalShadows=S,k.numPointShadows=w,k.numSpotShadows=E,k.numSpotMaps=C,k.numLightProbes=I,i.version=DR++)}function l(c,u){let d=0,f=0,h=0,v=0,y=0,m=u.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){let w=c[p];if(w.isDirectionalLight){let E=i.directional[d];E.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),d++}else if(w.isSpotLight){let E=i.spot[h];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),h++}else if(w.isRectAreaLight){let E=i.rectArea[v];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(m),o.identity(),s.copy(w.matrixWorld),s.premultiply(m),o.extractRotation(s),E.halfWidth.set(w.width*.5,0,0),E.halfHeight.set(0,w.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),v++}else if(w.isPointLight){let E=i.point[f];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(m),f++}else if(w.isHemisphereLight){let E=i.hemi[y];E.direction.setFromMatrixPosition(w.matrixWorld),E.direction.transformDirection(m),y++}}}return{setup:a,setupView:l,state:i}}function mM(n){let e=new NR(n),t=[],i=[];function r(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function PR(n){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new mM(n),e.set(r,[a])):s>=o.length?(a=new mM(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var OR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,LR=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,FR=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],kR=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],gM=new Ht,ol=new F,mg=new F;function UR(n,e,t){let i=new qa,r=new Qe,s=new Qe,o=new Ot,a=new Ou,l=new Lu,c={},u=t.maxTextureSize,d={[Xi]:cn,[cn]:Xi,[wi]:wi},f=new sn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Qe},radius:{value:4}},vertexShader:OR,fragmentShader:LR}),h=f.clone();h.defines.HORIZONTAL_PASS=1;let v=new Ei;v.setAttribute("position",new wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new pn(v,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ja;let p=this.type;this.render=function(A,I,k){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;A.type===px&&(De("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),A.type=Ja);let x=n.getRenderTarget(),M=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),H=n.state;H.setBlending(Ci),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);let B=p!==this.type;B&&I.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(j=>j.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,j=A.length;q<j;q++){let G=A[q],V=G.shadow;if(V===void 0){De("WebGLShadowMap:",G,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);let Z=V.getFrameExtents();if(r.multiply(Z),s.copy(V.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Z.x),r.x=s.x*Z.x,V.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Z.y),r.y=s.y*Z.y,V.mapSize.y=s.y)),V.map===null||B===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Eo){if(G.isPointLight){De("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Cn(r.x,r.y,{format:_s,type:Ti,minFilter:Qt,magFilter:Qt,generateMipmaps:!1}),V.map.texture.name=G.name+".shadowMap",V.map.depthTexture=new xr(r.x,r.y,ci),V.map.depthTexture.name=G.name+".shadowMapDepth",V.map.depthTexture.format=Si,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Xt,V.map.depthTexture.magFilter=Xt}else{G.isPointLight?(V.map=new ja(r.x),V.map.depthTexture=new Nu(r.x,li)):(V.map=new Cn(r.x,r.y),V.map.depthTexture=new xr(r.x,r.y,li)),V.map.depthTexture.name=G.name+".shadowMap",V.map.depthTexture.format=Si;let oe=n.state.buffers.depth.getReversed();this.type===Ja?(V.map.depthTexture.compareFunction=oe?Vd:Ud,V.map.depthTexture.minFilter=Qt,V.map.depthTexture.magFilter=Qt):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Xt,V.map.depthTexture.magFilter=Xt)}V.camera.updateProjectionMatrix()}let ue=V.map.isWebGLCubeRenderTarget?6:1;for(let oe=0;oe<ue;oe++){if(V.map.isWebGLCubeRenderTarget)n.setRenderTarget(V.map,oe),n.clear();else{oe===0&&(n.setRenderTarget(V.map),n.clear());let de=V.getViewport(oe);o.set(s.x*de.x,s.y*de.y,s.x*de.z,s.y*de.w),H.viewport(o)}if(G.isPointLight){let de=V.camera,Ge=V.matrix,Ue=G.distance||de.far;Ue!==de.far&&(de.far=Ue,de.updateProjectionMatrix()),ol.setFromMatrixPosition(G.matrixWorld),de.position.copy(ol),mg.copy(de.position),mg.add(FR[oe]),de.up.copy(kR[oe]),de.lookAt(mg),de.updateMatrixWorld(),Ge.makeTranslation(-ol.x,-ol.y,-ol.z),gM.multiplyMatrices(de.projectionMatrix,de.matrixWorldInverse),V._frustum.setFromProjectionMatrix(gM,de.coordinateSystem,de.reversedDepth)}else V.updateMatrices(G);i=V.getFrustum(),E(I,k,V.camera,G,this.type)}V.isPointLightShadow!==!0&&this.type===Eo&&S(V,k),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(x,M,R)};function S(A,I){let k=e.update(y);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,h.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Cn(r.x,r.y,{format:_s,type:Ti})),f.uniforms.shadow_pass.value=A.map.depthTexture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(I,null,k,f,y,null),h.uniforms.shadow_pass.value=A.mapPass.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(I,null,k,h,y,null)}function w(A,I,k,x){let M=null,R=k.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)M=R;else if(M=k.isPointLight===!0?l:a,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let H=M.uuid,B=I.uuid,q=c[H];q===void 0&&(q={},c[H]=q);let j=q[B];j===void 0&&(j=M.clone(),q[B]=j,I.addEventListener("dispose",C)),M=j}if(M.visible=I.visible,M.wireframe=I.wireframe,x===Eo?M.side=I.shadowSide!==null?I.shadowSide:I.side:M.side=I.shadowSide!==null?I.shadowSide:d[I.side],M.alphaMap=I.alphaMap,M.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,M.map=I.map,M.clipShadows=I.clipShadows,M.clippingPlanes=I.clippingPlanes,M.clipIntersection=I.clipIntersection,M.displacementMap=I.displacementMap,M.displacementScale=I.displacementScale,M.displacementBias=I.displacementBias,M.wireframeLinewidth=I.wireframeLinewidth,M.linewidth=I.linewidth,k.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let H=n.properties.get(M);H.light=k}return M}function E(A,I,k,x,M){if(A.visible===!1)return;if(A.layers.test(I.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===Eo)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,A.matrixWorld);let B=e.update(A),q=A.material;if(Array.isArray(q)){let j=B.groups;for(let G=0,V=j.length;G<V;G++){let Z=j[G],ue=q[Z.materialIndex];if(ue&&ue.visible){let oe=w(A,ue,x,M);A.onBeforeShadow(n,A,I,k,B,oe,Z),n.renderBufferDirect(k,null,B,oe,A,Z),A.onAfterShadow(n,A,I,k,B,oe,Z)}}}else if(q.visible){let j=w(A,q,x,M);A.onBeforeShadow(n,A,I,k,B,j,null),n.renderBufferDirect(k,null,B,j,A,null),A.onAfterShadow(n,A,I,k,B,j,null)}}let H=A.children;for(let B=0,q=H.length;B<q;B++)E(H[B],I,k,x,M)}function C(A){A.target.removeEventListener("dispose",C);for(let k in c){let x=c[k],M=A.target.uuid;M in x&&(x[M].dispose(),delete x[M])}}}var VR={[Wu]:ju,[$u]:Yu,[qu]:Zu,[ds]:Xu,[ju]:Wu,[Yu]:$u,[Zu]:qu,[Xu]:ds};function BR(n,e){function t(){let D=!1,ce=new Ot,ee=null,fe=new Ot(0,0,0,0);return{setMask:function(K){ee!==K&&!D&&(n.colorMask(K,K,K,K),ee=K)},setLocked:function(K){D=K},setClear:function(K,X,te,Re,xt){xt===!0&&(K*=Re,X*=Re,te*=Re),ce.set(K,X,te,Re),fe.equals(ce)===!1&&(n.clearColor(K,X,te,Re),fe.copy(ce))},reset:function(){D=!1,ee=null,fe.set(-1,0,0,0)}}}function i(){let D=!1,ce=!1,ee=null,fe=null,K=null;return{setReversed:function(X){if(ce!==X){let te=e.get("EXT_clip_control");X?te.clipControlEXT(te.LOWER_LEFT_EXT,te.ZERO_TO_ONE_EXT):te.clipControlEXT(te.LOWER_LEFT_EXT,te.NEGATIVE_ONE_TO_ONE_EXT),ce=X;let Re=K;K=null,this.setClear(Re)}},getReversed:function(){return ce},setTest:function(X){X?J(n.DEPTH_TEST):pe(n.DEPTH_TEST)},setMask:function(X){ee!==X&&!D&&(n.depthMask(X),ee=X)},setFunc:function(X){if(ce&&(X=VR[X]),fe!==X){switch(X){case Wu:n.depthFunc(n.NEVER);break;case ju:n.depthFunc(n.ALWAYS);break;case $u:n.depthFunc(n.LESS);break;case ds:n.depthFunc(n.LEQUAL);break;case qu:n.depthFunc(n.EQUAL);break;case Xu:n.depthFunc(n.GEQUAL);break;case Yu:n.depthFunc(n.GREATER);break;case Zu:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}fe=X}},setLocked:function(X){D=X},setClear:function(X){K!==X&&(ce&&(X=1-X),n.clearDepth(X),K=X)},reset:function(){D=!1,ee=null,fe=null,K=null,ce=!1}}}function r(){let D=!1,ce=null,ee=null,fe=null,K=null,X=null,te=null,Re=null,xt=null;return{setTest:function(ct){D||(ct?J(n.STENCIL_TEST):pe(n.STENCIL_TEST))},setMask:function(ct){ce!==ct&&!D&&(n.stencilMask(ct),ce=ct)},setFunc:function(ct,di,Di){(ee!==ct||fe!==di||K!==Di)&&(n.stencilFunc(ct,di,Di),ee=ct,fe=di,K=Di)},setOp:function(ct,di,Di){(X!==ct||te!==di||Re!==Di)&&(n.stencilOp(ct,di,Di),X=ct,te=di,Re=Di)},setLocked:function(ct){D=ct},setClear:function(ct){xt!==ct&&(n.clearStencil(ct),xt=ct)},reset:function(){D=!1,ce=null,ee=null,fe=null,K=null,X=null,te=null,Re=null,xt=null}}}let s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap,u={},d={},f=new WeakMap,h=[],v=null,y=!1,m=null,p=null,S=null,w=null,E=null,C=null,A=null,I=new rt(0,0,0),k=0,x=!1,M=null,R=null,H=null,B=null,q=null,j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,V=0,Z=n.getParameter(n.VERSION);Z.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(Z)[1]),G=V>=1):Z.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),G=V>=2);let ue=null,oe={},de=n.getParameter(n.SCISSOR_BOX),Ge=n.getParameter(n.VIEWPORT),Ue=new Ot().fromArray(de),Et=new Ot().fromArray(Ge);function bt(D,ce,ee,fe){let K=new Uint8Array(4),X=n.createTexture();n.bindTexture(D,X),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let te=0;te<ee;te++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(ce,0,n.RGBA,1,1,fe,0,n.RGBA,n.UNSIGNED_BYTE,K):n.texImage2D(ce+te,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,K);return X}let $={};$[n.TEXTURE_2D]=bt(n.TEXTURE_2D,n.TEXTURE_2D,1),$[n.TEXTURE_CUBE_MAP]=bt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[n.TEXTURE_2D_ARRAY]=bt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),$[n.TEXTURE_3D]=bt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),J(n.DEPTH_TEST),o.setFunc(ds),Ve(!1),Ut(Um),J(n.CULL_FACE),lt(Ci);function J(D){u[D]!==!0&&(n.enable(D),u[D]=!0)}function pe(D){u[D]!==!1&&(n.disable(D),u[D]=!1)}function Le(D,ce){return d[D]!==ce?(n.bindFramebuffer(D,ce),d[D]=ce,D===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ce),D===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ce),!0):!1}function ve(D,ce){let ee=h,fe=!1;if(D){ee=f.get(ce),ee===void 0&&(ee=[],f.set(ce,ee));let K=D.textures;if(ee.length!==K.length||ee[0]!==n.COLOR_ATTACHMENT0){for(let X=0,te=K.length;X<te;X++)ee[X]=n.COLOR_ATTACHMENT0+X;ee.length=K.length,fe=!0}}else ee[0]!==n.BACK&&(ee[0]=n.BACK,fe=!0);fe&&n.drawBuffers(ee)}function et(D){return v!==D?(n.useProgram(D),v=D,!0):!1}let $t={[yr]:n.FUNC_ADD,[gx]:n.FUNC_SUBTRACT,[vx]:n.FUNC_REVERSE_SUBTRACT};$t[yx]=n.MIN,$t[_x]=n.MAX;let Je={[xx]:n.ZERO,[Mx]:n.ONE,[bx]:n.SRC_COLOR,[xu]:n.SRC_ALPHA,[Ax]:n.SRC_ALPHA_SATURATE,[Cx]:n.DST_COLOR,[Ex]:n.DST_ALPHA,[Sx]:n.ONE_MINUS_SRC_COLOR,[Mu]:n.ONE_MINUS_SRC_ALPHA,[Tx]:n.ONE_MINUS_DST_COLOR,[wx]:n.ONE_MINUS_DST_ALPHA,[Ix]:n.CONSTANT_COLOR,[Dx]:n.ONE_MINUS_CONSTANT_COLOR,[Rx]:n.CONSTANT_ALPHA,[Nx]:n.ONE_MINUS_CONSTANT_ALPHA};function lt(D,ce,ee,fe,K,X,te,Re,xt,ct){if(D===Ci){y===!0&&(pe(n.BLEND),y=!1);return}if(y===!1&&(J(n.BLEND),y=!0),D!==mx){if(D!==m||ct!==x){if((p!==yr||E!==yr)&&(n.blendEquation(n.FUNC_ADD),p=yr,E=yr),ct)switch(D){case us:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Vm:n.blendFunc(n.ONE,n.ONE);break;case Bm:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Hm:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ae("WebGLState: Invalid blending: ",D);break}else switch(D){case us:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Vm:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Bm:Ae("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Hm:Ae("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ae("WebGLState: Invalid blending: ",D);break}S=null,w=null,C=null,A=null,I.set(0,0,0),k=0,m=D,x=ct}return}K=K||ce,X=X||ee,te=te||fe,(ce!==p||K!==E)&&(n.blendEquationSeparate($t[ce],$t[K]),p=ce,E=K),(ee!==S||fe!==w||X!==C||te!==A)&&(n.blendFuncSeparate(Je[ee],Je[fe],Je[X],Je[te]),S=ee,w=fe,C=X,A=te),(Re.equals(I)===!1||xt!==k)&&(n.blendColor(Re.r,Re.g,Re.b,xt),I.copy(Re),k=xt),m=D,x=!1}function mt(D,ce){D.side===wi?pe(n.CULL_FACE):J(n.CULL_FACE);let ee=D.side===cn;ce&&(ee=!ee),Ve(ee),D.blending===us&&D.transparent===!1?lt(Ci):lt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);let fe=D.stencilWrite;a.setTest(fe),fe&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Vt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?J(n.SAMPLE_ALPHA_TO_COVERAGE):pe(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(D){M!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),M=D)}function Ut(D){D!==fx?(J(n.CULL_FACE),D!==R&&(D===Um?n.cullFace(n.BACK):D===hx?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):pe(n.CULL_FACE),R=D}function T(D){D!==H&&(G&&n.lineWidth(D),H=D)}function Vt(D,ce,ee){D?(J(n.POLYGON_OFFSET_FILL),(B!==ce||q!==ee)&&(n.polygonOffset(ce,ee),B=ce,q=ee)):pe(n.POLYGON_OFFSET_FILL)}function st(D){D?J(n.SCISSOR_TEST):pe(n.SCISSOR_TEST)}function _t(D){D===void 0&&(D=n.TEXTURE0+j-1),ue!==D&&(n.activeTexture(D),ue=D)}function _e(D,ce,ee){ee===void 0&&(ue===null?ee=n.TEXTURE0+j-1:ee=ue);let fe=oe[ee];fe===void 0&&(fe={type:void 0,texture:void 0},oe[ee]=fe),(fe.type!==D||fe.texture!==ce)&&(ue!==ee&&(n.activeTexture(ee),ue=ee),n.bindTexture(D,ce||$[D]),fe.type=D,fe.texture=ce)}function b(){let D=oe[ue];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function g(){try{n.compressedTexImage2D(...arguments)}catch(D){Ae("WebGLState:",D)}}function N(){try{n.compressedTexImage3D(...arguments)}catch(D){Ae("WebGLState:",D)}}function W(){try{n.texSubImage2D(...arguments)}catch(D){Ae("WebGLState:",D)}}function Y(){try{n.texSubImage3D(...arguments)}catch(D){Ae("WebGLState:",D)}}function z(){try{n.compressedTexSubImage2D(...arguments)}catch(D){Ae("WebGLState:",D)}}function Me(){try{n.compressedTexSubImage3D(...arguments)}catch(D){Ae("WebGLState:",D)}}function ne(){try{n.texStorage2D(...arguments)}catch(D){Ae("WebGLState:",D)}}function ye(){try{n.texStorage3D(...arguments)}catch(D){Ae("WebGLState:",D)}}function Ie(){try{n.texImage2D(...arguments)}catch(D){Ae("WebGLState:",D)}}function Q(){try{n.texImage3D(...arguments)}catch(D){Ae("WebGLState:",D)}}function re(D){Ue.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),Ue.copy(D))}function ge(D){Et.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),Et.copy(D))}function xe(D,ce){let ee=c.get(ce);ee===void 0&&(ee=new WeakMap,c.set(ce,ee));let fe=ee.get(D);fe===void 0&&(fe=n.getUniformBlockIndex(ce,D.name),ee.set(D,fe))}function ie(D,ce){let fe=c.get(ce).get(D);l.get(ce)!==fe&&(n.uniformBlockBinding(ce,fe,D.__bindingPointIndex),l.set(ce,fe))}function Be(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ue=null,oe={},d={},f=new WeakMap,h=[],v=null,y=!1,m=null,p=null,S=null,w=null,E=null,C=null,A=null,I=new rt(0,0,0),k=0,x=!1,M=null,R=null,H=null,B=null,q=null,Ue.set(0,0,n.canvas.width,n.canvas.height),Et.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:J,disable:pe,bindFramebuffer:Le,drawBuffers:ve,useProgram:et,setBlending:lt,setMaterial:mt,setFlipSided:Ve,setCullFace:Ut,setLineWidth:T,setPolygonOffset:Vt,setScissorTest:st,activeTexture:_t,bindTexture:_e,unbindTexture:b,compressedTexImage2D:g,compressedTexImage3D:N,texImage2D:Ie,texImage3D:Q,updateUBOMapping:xe,uniformBlockBinding:ie,texStorage2D:ne,texStorage3D:ye,texSubImage2D:W,texSubImage3D:Y,compressedTexSubImage2D:z,compressedTexSubImage3D:Me,scissor:re,viewport:ge,reset:Be}}function HR(n,e,t,i,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Qe,u=new WeakMap,d,f=new WeakMap,h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(b,g){return h?new OffscreenCanvas(b,g):ka("canvas")}function y(b,g,N){let W=1,Y=_e(b);if((Y.width>N||Y.height>N)&&(W=N/Math.max(Y.width,Y.height)),W<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){let z=Math.floor(W*Y.width),Me=Math.floor(W*Y.height);d===void 0&&(d=v(z,Me));let ne=g?v(z,Me):d;return ne.width=z,ne.height=Me,ne.getContext("2d").drawImage(b,0,0,z,Me),De("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+z+"x"+Me+")."),ne}else return"data"in b&&De("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),b;return b}function m(b){return b.generateMipmaps}function p(b){n.generateMipmap(b)}function S(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(b,g,N,W,Y=!1){if(b!==null){if(n[b]!==void 0)return n[b];De("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let z=g;if(g===n.RED&&(N===n.FLOAT&&(z=n.R32F),N===n.HALF_FLOAT&&(z=n.R16F),N===n.UNSIGNED_BYTE&&(z=n.R8)),g===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&(z=n.R8UI),N===n.UNSIGNED_SHORT&&(z=n.R16UI),N===n.UNSIGNED_INT&&(z=n.R32UI),N===n.BYTE&&(z=n.R8I),N===n.SHORT&&(z=n.R16I),N===n.INT&&(z=n.R32I)),g===n.RG&&(N===n.FLOAT&&(z=n.RG32F),N===n.HALF_FLOAT&&(z=n.RG16F),N===n.UNSIGNED_BYTE&&(z=n.RG8)),g===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&(z=n.RG8UI),N===n.UNSIGNED_SHORT&&(z=n.RG16UI),N===n.UNSIGNED_INT&&(z=n.RG32UI),N===n.BYTE&&(z=n.RG8I),N===n.SHORT&&(z=n.RG16I),N===n.INT&&(z=n.RG32I)),g===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&(z=n.RGB8UI),N===n.UNSIGNED_SHORT&&(z=n.RGB16UI),N===n.UNSIGNED_INT&&(z=n.RGB32UI),N===n.BYTE&&(z=n.RGB8I),N===n.SHORT&&(z=n.RGB16I),N===n.INT&&(z=n.RGB32I)),g===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&(z=n.RGBA8UI),N===n.UNSIGNED_SHORT&&(z=n.RGBA16UI),N===n.UNSIGNED_INT&&(z=n.RGBA32UI),N===n.BYTE&&(z=n.RGBA8I),N===n.SHORT&&(z=n.RGBA16I),N===n.INT&&(z=n.RGBA32I)),g===n.RGB&&(N===n.UNSIGNED_INT_5_9_9_9_REV&&(z=n.RGB9_E5),N===n.UNSIGNED_INT_10F_11F_11F_REV&&(z=n.R11F_G11F_B10F)),g===n.RGBA){let Me=Y?La:Ze.getTransfer(W);N===n.FLOAT&&(z=n.RGBA32F),N===n.HALF_FLOAT&&(z=n.RGBA16F),N===n.UNSIGNED_BYTE&&(z=Me===at?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT_4_4_4_4&&(z=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&(z=n.RGB5_A1)}return(z===n.R16F||z===n.R32F||z===n.RG16F||z===n.RG32F||z===n.RGBA16F||z===n.RGBA32F)&&e.get("EXT_color_buffer_float"),z}function E(b,g){let N;return b?g===null||g===li||g===Co?N=n.DEPTH24_STENCIL8:g===ci?N=n.DEPTH32F_STENCIL8:g===wo&&(N=n.DEPTH24_STENCIL8,De("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===li||g===Co?N=n.DEPTH_COMPONENT24:g===ci?N=n.DEPTH_COMPONENT32F:g===wo&&(N=n.DEPTH_COMPONENT16),N}function C(b,g){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==Xt&&b.minFilter!==Qt?Math.log2(Math.max(g.width,g.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?g.mipmaps.length:1}function A(b){let g=b.target;g.removeEventListener("dispose",A),k(g),g.isVideoTexture&&u.delete(g)}function I(b){let g=b.target;g.removeEventListener("dispose",I),M(g)}function k(b){let g=i.get(b);if(g.__webglInit===void 0)return;let N=b.source,W=f.get(N);if(W){let Y=W[g.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&x(b),Object.keys(W).length===0&&f.delete(N)}i.remove(b)}function x(b){let g=i.get(b);n.deleteTexture(g.__webglTexture);let N=b.source,W=f.get(N);delete W[g.__cacheKey],o.memory.textures--}function M(b){let g=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(g.__webglFramebuffer[W]))for(let Y=0;Y<g.__webglFramebuffer[W].length;Y++)n.deleteFramebuffer(g.__webglFramebuffer[W][Y]);else n.deleteFramebuffer(g.__webglFramebuffer[W]);g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer[W])}else{if(Array.isArray(g.__webglFramebuffer))for(let W=0;W<g.__webglFramebuffer.length;W++)n.deleteFramebuffer(g.__webglFramebuffer[W]);else n.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&n.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let W=0;W<g.__webglColorRenderbuffer.length;W++)g.__webglColorRenderbuffer[W]&&n.deleteRenderbuffer(g.__webglColorRenderbuffer[W]);g.__webglDepthRenderbuffer&&n.deleteRenderbuffer(g.__webglDepthRenderbuffer)}let N=b.textures;for(let W=0,Y=N.length;W<Y;W++){let z=i.get(N[W]);z.__webglTexture&&(n.deleteTexture(z.__webglTexture),o.memory.textures--),i.remove(N[W])}i.remove(b)}let R=0;function H(){R=0}function B(){let b=R;return b>=r.maxTextures&&De("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),R+=1,b}function q(b){let g=[];return g.push(b.wrapS),g.push(b.wrapT),g.push(b.wrapR||0),g.push(b.magFilter),g.push(b.minFilter),g.push(b.anisotropy),g.push(b.internalFormat),g.push(b.format),g.push(b.type),g.push(b.generateMipmaps),g.push(b.premultiplyAlpha),g.push(b.flipY),g.push(b.unpackAlignment),g.push(b.colorSpace),g.join()}function j(b,g){let N=i.get(b);if(b.isVideoTexture&&st(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&N.__version!==b.version){let W=b.image;if(W===null)De("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)De("WebGLRenderer: Texture marked for update but image is incomplete");else{$(N,b,g);return}}else b.isExternalTexture&&(N.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+g)}function G(b,g){let N=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&N.__version!==b.version){$(N,b,g);return}else b.isExternalTexture&&(N.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+g)}function V(b,g){let N=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&N.__version!==b.version){$(N,b,g);return}t.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+g)}function Z(b,g){let N=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&N.__version!==b.version){J(N,b,g);return}t.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+g)}let ue={[bu]:n.REPEAT,[bi]:n.CLAMP_TO_EDGE,[Su]:n.MIRRORED_REPEAT},oe={[Xt]:n.NEAREST,[Lx]:n.NEAREST_MIPMAP_NEAREST,[Qa]:n.NEAREST_MIPMAP_LINEAR,[Qt]:n.LINEAR,[Qu]:n.LINEAR_MIPMAP_NEAREST,[Er]:n.LINEAR_MIPMAP_LINEAR},de={[Vx]:n.NEVER,[Wx]:n.ALWAYS,[Bx]:n.LESS,[Ud]:n.LEQUAL,[Hx]:n.EQUAL,[Vd]:n.GEQUAL,[zx]:n.GREATER,[Gx]:n.NOTEQUAL};function Ge(b,g){if(g.type===ci&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===Qt||g.magFilter===Qu||g.magFilter===Qa||g.magFilter===Er||g.minFilter===Qt||g.minFilter===Qu||g.minFilter===Qa||g.minFilter===Er)&&De("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,ue[g.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,ue[g.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,ue[g.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,oe[g.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,oe[g.minFilter]),g.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,de[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Xt||g.minFilter!==Qa&&g.minFilter!==Er||g.type===ci&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){let N=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function Ue(b,g){let N=!1;b.__webglInit===void 0&&(b.__webglInit=!0,g.addEventListener("dispose",A));let W=g.source,Y=f.get(W);Y===void 0&&(Y={},f.set(W,Y));let z=q(g);if(z!==b.__cacheKey){Y[z]===void 0&&(Y[z]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,N=!0),Y[z].usedTimes++;let Me=Y[b.__cacheKey];Me!==void 0&&(Y[b.__cacheKey].usedTimes--,Me.usedTimes===0&&x(g)),b.__cacheKey=z,b.__webglTexture=Y[z].texture}return N}function Et(b,g,N){return Math.floor(Math.floor(b/N)/g)}function bt(b,g,N,W){let z=b.updateRanges;if(z.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,g.width,g.height,N,W,g.data);else{z.sort((Q,re)=>Q.start-re.start);let Me=0;for(let Q=1;Q<z.length;Q++){let re=z[Me],ge=z[Q],xe=re.start+re.count,ie=Et(ge.start,g.width,4),Be=Et(re.start,g.width,4);ge.start<=xe+1&&ie===Be&&Et(ge.start+ge.count-1,g.width,4)===ie?re.count=Math.max(re.count,ge.start+ge.count-re.start):(++Me,z[Me]=ge)}z.length=Me+1;let ne=n.getParameter(n.UNPACK_ROW_LENGTH),ye=n.getParameter(n.UNPACK_SKIP_PIXELS),Ie=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,g.width);for(let Q=0,re=z.length;Q<re;Q++){let ge=z[Q],xe=Math.floor(ge.start/4),ie=Math.ceil(ge.count/4),Be=xe%g.width,D=Math.floor(xe/g.width),ce=ie,ee=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Be),n.pixelStorei(n.UNPACK_SKIP_ROWS,D),t.texSubImage2D(n.TEXTURE_2D,0,Be,D,ce,ee,N,W,g.data)}b.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ne),n.pixelStorei(n.UNPACK_SKIP_PIXELS,ye),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ie)}}function $(b,g,N){let W=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(W=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&(W=n.TEXTURE_3D);let Y=Ue(b,g),z=g.source;t.bindTexture(W,b.__webglTexture,n.TEXTURE0+N);let Me=i.get(z);if(z.version!==Me.__version||Y===!0){t.activeTexture(n.TEXTURE0+N);let ne=Ze.getPrimaries(Ze.workingColorSpace),ye=g.colorSpace===Ji?null:Ze.getPrimaries(g.colorSpace),Ie=g.colorSpace===Ji||ne===ye?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);let Q=y(g.image,!1,r.maxTextureSize);Q=_t(g,Q);let re=s.convert(g.format,g.colorSpace),ge=s.convert(g.type),xe=w(g.internalFormat,re,ge,g.colorSpace,g.isVideoTexture);Ge(W,g);let ie,Be=g.mipmaps,D=g.isVideoTexture!==!0,ce=Me.__version===void 0||Y===!0,ee=z.dataReady,fe=C(g,Q);if(g.isDepthTexture)xe=E(g.format===wr,g.type),ce&&(D?t.texStorage2D(n.TEXTURE_2D,1,xe,Q.width,Q.height):t.texImage2D(n.TEXTURE_2D,0,xe,Q.width,Q.height,0,re,ge,null));else if(g.isDataTexture)if(Be.length>0){D&&ce&&t.texStorage2D(n.TEXTURE_2D,fe,xe,Be[0].width,Be[0].height);for(let K=0,X=Be.length;K<X;K++)ie=Be[K],D?ee&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,ie.width,ie.height,re,ge,ie.data):t.texImage2D(n.TEXTURE_2D,K,xe,ie.width,ie.height,0,re,ge,ie.data);g.generateMipmaps=!1}else D?(ce&&t.texStorage2D(n.TEXTURE_2D,fe,xe,Q.width,Q.height),ee&&bt(g,Q,re,ge)):t.texImage2D(n.TEXTURE_2D,0,xe,Q.width,Q.height,0,re,ge,Q.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){D&&ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,fe,xe,Be[0].width,Be[0].height,Q.depth);for(let K=0,X=Be.length;K<X;K++)if(ie=Be[K],g.format!==jn)if(re!==null)if(D){if(ee)if(g.layerUpdates.size>0){let te=cg(ie.width,ie.height,g.format,g.type);for(let Re of g.layerUpdates){let xt=ie.data.subarray(Re*te/ie.data.BYTES_PER_ELEMENT,(Re+1)*te/ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,Re,ie.width,ie.height,1,re,xt)}g.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,ie.width,ie.height,Q.depth,re,ie.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,K,xe,ie.width,ie.height,Q.depth,0,ie.data,0,0);else De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?ee&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,ie.width,ie.height,Q.depth,re,ge,ie.data):t.texImage3D(n.TEXTURE_2D_ARRAY,K,xe,ie.width,ie.height,Q.depth,0,re,ge,ie.data)}else{D&&ce&&t.texStorage2D(n.TEXTURE_2D,fe,xe,Be[0].width,Be[0].height);for(let K=0,X=Be.length;K<X;K++)ie=Be[K],g.format!==jn?re!==null?D?ee&&t.compressedTexSubImage2D(n.TEXTURE_2D,K,0,0,ie.width,ie.height,re,ie.data):t.compressedTexImage2D(n.TEXTURE_2D,K,xe,ie.width,ie.height,0,ie.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?ee&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,ie.width,ie.height,re,ge,ie.data):t.texImage2D(n.TEXTURE_2D,K,xe,ie.width,ie.height,0,re,ge,ie.data)}else if(g.isDataArrayTexture)if(D){if(ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,fe,xe,Q.width,Q.height,Q.depth),ee)if(g.layerUpdates.size>0){let K=cg(Q.width,Q.height,g.format,g.type);for(let X of g.layerUpdates){let te=Q.data.subarray(X*K/Q.data.BYTES_PER_ELEMENT,(X+1)*K/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,X,Q.width,Q.height,1,re,ge,te)}g.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,re,ge,Q.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,xe,Q.width,Q.height,Q.depth,0,re,ge,Q.data);else if(g.isData3DTexture)D?(ce&&t.texStorage3D(n.TEXTURE_3D,fe,xe,Q.width,Q.height,Q.depth),ee&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,re,ge,Q.data)):t.texImage3D(n.TEXTURE_3D,0,xe,Q.width,Q.height,Q.depth,0,re,ge,Q.data);else if(g.isFramebufferTexture){if(ce)if(D)t.texStorage2D(n.TEXTURE_2D,fe,xe,Q.width,Q.height);else{let K=Q.width,X=Q.height;for(let te=0;te<fe;te++)t.texImage2D(n.TEXTURE_2D,te,xe,K,X,0,re,ge,null),K>>=1,X>>=1}}else if(Be.length>0){if(D&&ce){let K=_e(Be[0]);t.texStorage2D(n.TEXTURE_2D,fe,xe,K.width,K.height)}for(let K=0,X=Be.length;K<X;K++)ie=Be[K],D?ee&&t.texSubImage2D(n.TEXTURE_2D,K,0,0,re,ge,ie):t.texImage2D(n.TEXTURE_2D,K,xe,re,ge,ie);g.generateMipmaps=!1}else if(D){if(ce){let K=_e(Q);t.texStorage2D(n.TEXTURE_2D,fe,xe,K.width,K.height)}ee&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,re,ge,Q)}else t.texImage2D(n.TEXTURE_2D,0,xe,re,ge,Q);m(g)&&p(W),Me.__version=z.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function J(b,g,N){if(g.image.length!==6)return;let W=Ue(b,g),Y=g.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+N);let z=i.get(Y);if(Y.version!==z.__version||W===!0){t.activeTexture(n.TEXTURE0+N);let Me=Ze.getPrimaries(Ze.workingColorSpace),ne=g.colorSpace===Ji?null:Ze.getPrimaries(g.colorSpace),ye=g.colorSpace===Ji||Me===ne?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let Ie=g.isCompressedTexture||g.image[0].isCompressedTexture,Q=g.image[0]&&g.image[0].isDataTexture,re=[];for(let X=0;X<6;X++)!Ie&&!Q?re[X]=y(g.image[X],!0,r.maxCubemapSize):re[X]=Q?g.image[X].image:g.image[X],re[X]=_t(g,re[X]);let ge=re[0],xe=s.convert(g.format,g.colorSpace),ie=s.convert(g.type),Be=w(g.internalFormat,xe,ie,g.colorSpace),D=g.isVideoTexture!==!0,ce=z.__version===void 0||W===!0,ee=Y.dataReady,fe=C(g,ge);Ge(n.TEXTURE_CUBE_MAP,g);let K;if(Ie){D&&ce&&t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,Be,ge.width,ge.height);for(let X=0;X<6;X++){K=re[X].mipmaps;for(let te=0;te<K.length;te++){let Re=K[te];g.format!==jn?xe!==null?D?ee&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,te,0,0,Re.width,Re.height,xe,Re.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,te,Be,Re.width,Re.height,0,Re.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,te,0,0,Re.width,Re.height,xe,ie,Re.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,te,Be,Re.width,Re.height,0,xe,ie,Re.data)}}}else{if(K=g.mipmaps,D&&ce){K.length>0&&fe++;let X=_e(re[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,fe,Be,X.width,X.height)}for(let X=0;X<6;X++)if(Q){D?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,re[X].width,re[X].height,xe,ie,re[X].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Be,re[X].width,re[X].height,0,xe,ie,re[X].data);for(let te=0;te<K.length;te++){let xt=K[te].image[X].image;D?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,te+1,0,0,xt.width,xt.height,xe,ie,xt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,te+1,Be,xt.width,xt.height,0,xe,ie,xt.data)}}else{D?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,xe,ie,re[X]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Be,xe,ie,re[X]);for(let te=0;te<K.length;te++){let Re=K[te];D?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,te+1,0,0,xe,ie,Re.image[X]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+X,te+1,Be,xe,ie,Re.image[X])}}}m(g)&&p(n.TEXTURE_CUBE_MAP),z.__version=Y.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function pe(b,g,N,W,Y,z){let Me=s.convert(N.format,N.colorSpace),ne=s.convert(N.type),ye=w(N.internalFormat,Me,ne,N.colorSpace),Ie=i.get(g),Q=i.get(N);if(Q.__renderTarget=g,!Ie.__hasExternalTextures){let re=Math.max(1,g.width>>z),ge=Math.max(1,g.height>>z);Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?t.texImage3D(Y,z,ye,re,ge,g.depth,0,Me,ne,null):t.texImage2D(Y,z,ye,re,ge,0,Me,ne,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),Vt(g)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,W,Y,Q.__webglTexture,0,T(g)):(Y===n.TEXTURE_2D||Y>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,W,Y,Q.__webglTexture,z),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Le(b,g,N){if(n.bindRenderbuffer(n.RENDERBUFFER,b),g.depthBuffer){let W=g.depthTexture,Y=W&&W.isDepthTexture?W.type:null,z=E(g.stencilBuffer,Y),Me=g.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Vt(g)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,T(g),z,g.width,g.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,T(g),z,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,z,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Me,n.RENDERBUFFER,b)}else{let W=g.textures;for(let Y=0;Y<W.length;Y++){let z=W[Y],Me=s.convert(z.format,z.colorSpace),ne=s.convert(z.type),ye=w(z.internalFormat,Me,ne,z.colorSpace);Vt(g)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,T(g),ye,g.width,g.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,T(g),ye,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,ye,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ve(b,g,N){let W=g.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Y=i.get(g.depthTexture);if(Y.__renderTarget=g,(!Y.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),W){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,g.depthTexture.addEventListener("dispose",A)),Y.__webglTexture===void 0){Y.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),Ge(n.TEXTURE_CUBE_MAP,g.depthTexture);let Ie=s.convert(g.depthTexture.format),Q=s.convert(g.depthTexture.type),re;g.depthTexture.format===Si?re=n.DEPTH_COMPONENT24:g.depthTexture.format===wr&&(re=n.DEPTH24_STENCIL8);for(let ge=0;ge<6;ge++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,re,g.width,g.height,0,Ie,Q,null)}}else j(g.depthTexture,0);let z=Y.__webglTexture,Me=T(g),ne=W?n.TEXTURE_CUBE_MAP_POSITIVE_X+N:n.TEXTURE_2D,ye=g.depthTexture.format===wr?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(g.depthTexture.format===Si)Vt(g)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ye,ne,z,0,Me):n.framebufferTexture2D(n.FRAMEBUFFER,ye,ne,z,0);else if(g.depthTexture.format===wr)Vt(g)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ye,ne,z,0,Me):n.framebufferTexture2D(n.FRAMEBUFFER,ye,ne,z,0);else throw new Error("Unknown depthTexture format")}function et(b){let g=i.get(b),N=b.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==b.depthTexture){let W=b.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),W){let Y=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,W.removeEventListener("dispose",Y)};W.addEventListener("dispose",Y),g.__depthDisposeCallback=Y}g.__boundDepthTexture=W}if(b.depthTexture&&!g.__autoAllocateDepthBuffer)if(N)for(let W=0;W<6;W++)ve(g.__webglFramebuffer[W],b,W);else{let W=b.texture.mipmaps;W&&W.length>0?ve(g.__webglFramebuffer[0],b,0):ve(g.__webglFramebuffer,b,0)}else if(N){g.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[W]),g.__webglDepthbuffer[W]===void 0)g.__webglDepthbuffer[W]=n.createRenderbuffer(),Le(g.__webglDepthbuffer[W],b,!1);else{let Y=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,z=g.__webglDepthbuffer[W];n.bindRenderbuffer(n.RENDERBUFFER,z),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,z)}}else{let W=b.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=n.createRenderbuffer(),Le(g.__webglDepthbuffer,b,!1);else{let Y=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,z=g.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,z),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,z)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function $t(b,g,N){let W=i.get(b);g!==void 0&&pe(W.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&et(b)}function Je(b){let g=b.texture,N=i.get(b),W=i.get(g);b.addEventListener("dispose",I);let Y=b.textures,z=b.isWebGLCubeRenderTarget===!0,Me=Y.length>1;if(Me||(W.__webglTexture===void 0&&(W.__webglTexture=n.createTexture()),W.__version=g.version,o.memory.textures++),z){N.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer[ne]=[];for(let ye=0;ye<g.mipmaps.length;ye++)N.__webglFramebuffer[ne][ye]=n.createFramebuffer()}else N.__webglFramebuffer[ne]=n.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer=[];for(let ne=0;ne<g.mipmaps.length;ne++)N.__webglFramebuffer[ne]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(Me)for(let ne=0,ye=Y.length;ne<ye;ne++){let Ie=i.get(Y[ne]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=n.createTexture(),o.memory.textures++)}if(b.samples>0&&Vt(b)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let ne=0;ne<Y.length;ne++){let ye=Y[ne];N.__webglColorRenderbuffer[ne]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[ne]);let Ie=s.convert(ye.format,ye.colorSpace),Q=s.convert(ye.type),re=w(ye.internalFormat,Ie,Q,ye.colorSpace,b.isXRRenderTarget===!0),ge=T(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,ge,re,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ne,n.RENDERBUFFER,N.__webglColorRenderbuffer[ne])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),Le(N.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(z){t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),Ge(n.TEXTURE_CUBE_MAP,g);for(let ne=0;ne<6;ne++)if(g.mipmaps&&g.mipmaps.length>0)for(let ye=0;ye<g.mipmaps.length;ye++)pe(N.__webglFramebuffer[ne][ye],b,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye);else pe(N.__webglFramebuffer[ne],b,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);m(g)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let ne=0,ye=Y.length;ne<ye;ne++){let Ie=Y[ne],Q=i.get(Ie),re=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(re=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(re,Q.__webglTexture),Ge(re,Ie),pe(N.__webglFramebuffer,b,Ie,n.COLOR_ATTACHMENT0+ne,re,0),m(Ie)&&p(re)}t.unbindTexture()}else{let ne=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ne=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ne,W.__webglTexture),Ge(ne,g),g.mipmaps&&g.mipmaps.length>0)for(let ye=0;ye<g.mipmaps.length;ye++)pe(N.__webglFramebuffer[ye],b,g,n.COLOR_ATTACHMENT0,ne,ye);else pe(N.__webglFramebuffer,b,g,n.COLOR_ATTACHMENT0,ne,0);m(g)&&p(ne),t.unbindTexture()}b.depthBuffer&&et(b)}function lt(b){let g=b.textures;for(let N=0,W=g.length;N<W;N++){let Y=g[N];if(m(Y)){let z=S(b),Me=i.get(Y).__webglTexture;t.bindTexture(z,Me),p(z),t.unbindTexture()}}}let mt=[],Ve=[];function Ut(b){if(b.samples>0){if(Vt(b)===!1){let g=b.textures,N=b.width,W=b.height,Y=n.COLOR_BUFFER_BIT,z=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Me=i.get(b),ne=g.length>1;if(ne)for(let Ie=0;Ie<g.length;Ie++)t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);let ye=b.texture.mipmaps;ye&&ye.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let Ie=0;Ie<g.length;Ie++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(Y|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(Y|=n.STENCIL_BUFFER_BIT)),ne){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Me.__webglColorRenderbuffer[Ie]);let Q=i.get(g[Ie]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Q,0)}n.blitFramebuffer(0,0,N,W,0,0,N,W,Y,n.NEAREST),l===!0&&(mt.length=0,Ve.length=0,mt.push(n.COLOR_ATTACHMENT0+Ie),b.depthBuffer&&b.resolveDepthBuffer===!1&&(mt.push(z),Ve.push(z),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ve)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,mt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ne)for(let Ie=0;Ie<g.length;Ie++){t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.RENDERBUFFER,Me.__webglColorRenderbuffer[Ie]);let Q=i.get(g[Ie]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.TEXTURE_2D,Q,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){let g=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[g])}}}function T(b){return Math.min(r.maxSamples,b.samples)}function Vt(b){let g=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function st(b){let g=o.render.frame;u.get(b)!==g&&(u.set(b,g),b.update())}function _t(b,g){let N=b.colorSpace,W=b.format,Y=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||N!==fs&&N!==Ji&&(Ze.getTransfer(N)===at?(W!==jn||Y!==An)&&De("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ae("WebGLTextures: Unsupported texture color space:",N)),g}function _e(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=H,this.setTexture2D=j,this.setTexture2DArray=G,this.setTexture3D=V,this.setTextureCube=Z,this.rebindTextures=$t,this.setupRenderTarget=Je,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=Ut,this.setupDepthRenderbuffer=et,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=Vt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function zR(n,e){function t(i,r=Ji){let s,o=Ze.getTransfer(r);if(i===An)return n.UNSIGNED_BYTE;if(i===td)return n.UNSIGNED_SHORT_4_4_4_4;if(i===nd)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Km)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Qm)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Zm)return n.BYTE;if(i===Jm)return n.SHORT;if(i===wo)return n.UNSIGNED_SHORT;if(i===ed)return n.INT;if(i===li)return n.UNSIGNED_INT;if(i===ci)return n.FLOAT;if(i===Ti)return n.HALF_FLOAT;if(i===eg)return n.ALPHA;if(i===tg)return n.RGB;if(i===jn)return n.RGBA;if(i===Si)return n.DEPTH_COMPONENT;if(i===wr)return n.DEPTH_STENCIL;if(i===ng)return n.RED;if(i===id)return n.RED_INTEGER;if(i===_s)return n.RG;if(i===rd)return n.RG_INTEGER;if(i===sd)return n.RGBA_INTEGER;if(i===el||i===tl||i===nl||i===il)if(o===at)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===el)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===tl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===nl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===il)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===el)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===tl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===nl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===il)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===od||i===ad||i===ld||i===cd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===od)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ad)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ld)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===cd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ud||i===dd||i===fd||i===hd||i===pd||i===md||i===gd)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ud||i===dd)return o===at?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===fd)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===hd)return s.COMPRESSED_R11_EAC;if(i===pd)return s.COMPRESSED_SIGNED_R11_EAC;if(i===md)return s.COMPRESSED_RG11_EAC;if(i===gd)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===vd||i===yd||i===_d||i===xd||i===Md||i===bd||i===Sd||i===Ed||i===wd||i===Cd||i===Td||i===Ad||i===Id||i===Dd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===vd)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===yd)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===_d)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===xd)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Md)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===bd)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Sd)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ed)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===wd)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Cd)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Td)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ad)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Id)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Dd)return o===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Rd||i===Nd||i===Pd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Rd)return o===at?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Nd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Pd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Od||i===Ld||i===Fd||i===kd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Od)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Ld)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Fd)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===kd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Co?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var GR=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,WR=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Sg=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Xa(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new sn({vertexShader:GR,fragmentShader:WR,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new pn(new ms(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Eg=class extends Yi{constructor(e,t){super();let i=this,r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,v=null,y=typeof XRWebGLBinding<"u",m=new Sg,p={},S=t.getContextAttributes(),w=null,E=null,C=[],A=[],I=new Qe,k=null,x=new hn;x.viewport=new Ot;let M=new hn;M.viewport=new Ot;let R=[x,M],H=new Gu,B=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let J=C[$];return J===void 0&&(J=new So,C[$]=J),J.getTargetRaySpace()},this.getControllerGrip=function($){let J=C[$];return J===void 0&&(J=new So,C[$]=J),J.getGripSpace()},this.getHand=function($){let J=C[$];return J===void 0&&(J=new So,C[$]=J),J.getHandSpace()};function j($){let J=A.indexOf($.inputSource);if(J===-1)return;let pe=C[J];pe!==void 0&&(pe.update($.inputSource,$.frame,c||o),pe.dispatchEvent({type:$.type,data:$.inputSource}))}function G(){r.removeEventListener("select",j),r.removeEventListener("selectstart",j),r.removeEventListener("selectend",j),r.removeEventListener("squeeze",j),r.removeEventListener("squeezestart",j),r.removeEventListener("squeezeend",j),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",V);for(let $=0;$<C.length;$++){let J=A[$];J!==null&&(A[$]=null,C[$].disconnect(J))}B=null,q=null,m.reset();for(let $ in p)delete p[$];e.setRenderTarget(w),h=null,f=null,d=null,r=null,E=null,bt.stop(),i.isPresenting=!1,e.setPixelRatio(k),e.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,i.isPresenting===!0&&De("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,i.isPresenting===!0&&De("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(w=e.getRenderTarget(),r.addEventListener("select",j),r.addEventListener("selectstart",j),r.addEventListener("selectend",j),r.addEventListener("squeeze",j),r.addEventListener("squeezestart",j),r.addEventListener("squeezeend",j),r.addEventListener("end",G),r.addEventListener("inputsourceschange",V),S.xrCompatible!==!0&&await t.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(I),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,Le=null,ve=null;S.depth&&(ve=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=S.stencil?wr:Si,Le=S.stencil?Co:li);let et={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(et),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),E=new Cn(f.textureWidth,f.textureHeight,{format:jn,type:An,depthTexture:new xr(f.textureWidth,f.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let pe={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,pe),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),E=new Cn(h.framebufferWidth,h.framebufferHeight,{format:jn,type:An,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),bt.setContext(r),bt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function V($){for(let J=0;J<$.removed.length;J++){let pe=$.removed[J],Le=A.indexOf(pe);Le>=0&&(A[Le]=null,C[Le].disconnect(pe))}for(let J=0;J<$.added.length;J++){let pe=$.added[J],Le=A.indexOf(pe);if(Le===-1){for(let et=0;et<C.length;et++)if(et>=A.length){A.push(pe),Le=et;break}else if(A[et]===null){A[et]=pe,Le=et;break}if(Le===-1)break}let ve=C[Le];ve&&ve.connect(pe)}}let Z=new F,ue=new F;function oe($,J,pe){Z.setFromMatrixPosition(J.matrixWorld),ue.setFromMatrixPosition(pe.matrixWorld);let Le=Z.distanceTo(ue),ve=J.projectionMatrix.elements,et=pe.projectionMatrix.elements,$t=ve[14]/(ve[10]-1),Je=ve[14]/(ve[10]+1),lt=(ve[9]+1)/ve[5],mt=(ve[9]-1)/ve[5],Ve=(ve[8]-1)/ve[0],Ut=(et[8]+1)/et[0],T=$t*Ve,Vt=$t*Ut,st=Le/(-Ve+Ut),_t=st*-Ve;if(J.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(_t),$.translateZ(st),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),ve[10]===-1)$.projectionMatrix.copy(J.projectionMatrix),$.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let _e=$t+st,b=Je+st,g=T-_t,N=Vt+(Le-_t),W=lt*Je/b*_e,Y=mt*Je/b*_e;$.projectionMatrix.makePerspective(g,N,W,Y,_e,b),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function de($,J){J===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(J.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let J=$.near,pe=$.far;m.texture!==null&&(m.depthNear>0&&(J=m.depthNear),m.depthFar>0&&(pe=m.depthFar)),H.near=M.near=x.near=J,H.far=M.far=x.far=pe,(B!==H.near||q!==H.far)&&(r.updateRenderState({depthNear:H.near,depthFar:H.far}),B=H.near,q=H.far),H.layers.mask=$.layers.mask|6,x.layers.mask=H.layers.mask&3,M.layers.mask=H.layers.mask&5;let Le=$.parent,ve=H.cameras;de(H,Le);for(let et=0;et<ve.length;et++)de(ve[et],Le);ve.length===2?oe(H,x,M):H.projectionMatrix.copy(x.projectionMatrix),Ge($,H,Le)};function Ge($,J,pe){pe===null?$.matrix.copy(J.matrixWorld):($.matrix.copy(pe.matrixWorld),$.matrix.invert(),$.matrix.multiply(J.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(J.projectionMatrix),$.projectionMatrixInverse.copy(J.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=wu*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function($){l=$,f!==null&&(f.fixedFoveation=$),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(H)},this.getCameraTexture=function($){return p[$]};let Ue=null;function Et($,J){if(u=J.getViewerPose(c||o),v=J,u!==null){let pe=u.views;h!==null&&(e.setRenderTargetFramebuffer(E,h.framebuffer),e.setRenderTarget(E));let Le=!1;pe.length!==H.cameras.length&&(H.cameras.length=0,Le=!0);for(let Je=0;Je<pe.length;Je++){let lt=pe[Je],mt=null;if(h!==null)mt=h.getViewport(lt);else{let Ut=d.getViewSubImage(f,lt);mt=Ut.viewport,Je===0&&(e.setRenderTargetTextures(E,Ut.colorTexture,Ut.depthStencilTexture),e.setRenderTarget(E))}let Ve=R[Je];Ve===void 0&&(Ve=new hn,Ve.layers.enable(Je),Ve.viewport=new Ot,R[Je]=Ve),Ve.matrix.fromArray(lt.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(lt.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(mt.x,mt.y,mt.width,mt.height),Je===0&&(H.matrix.copy(Ve.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),Le===!0&&H.cameras.push(Ve)}let ve=r.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){d=i.getBinding();let Je=d.getDepthInformation(pe[0]);Je&&Je.isValid&&Je.texture&&m.init(Je,r.renderState)}if(ve&&ve.includes("camera-access")&&y){e.state.unbindTexture(),d=i.getBinding();for(let Je=0;Je<pe.length;Je++){let lt=pe[Je].camera;if(lt){let mt=p[lt];mt||(mt=new Xa,p[lt]=mt);let Ve=d.getCameraImage(lt);mt.sourceTexture=Ve}}}}for(let pe=0;pe<C.length;pe++){let Le=A[pe],ve=C[pe];Le!==null&&ve!==void 0&&ve.update(Le,J,c||o)}Ue&&Ue($,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),v=null}let bt=new vM;bt.setAnimationLoop(Et),this.setAnimationLoop=function($){Ue=$},this.dispose=function(){}}},Ss=new hs,jR=new Ht;function $R(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,og(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,S,w,E){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,E)):p.isMeshMatcapMaterial?(s(m,p),v(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),y(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,S,w):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===cn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===cn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let S=e.get(p),w=S.envMap,E=S.envMapRotation;w&&(m.envMap.value=w,Ss.copy(E),Ss.x*=-1,Ss.y*=-1,Ss.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Ss.y*=-1,Ss.z*=-1),m.envMapRotation.value.setFromMatrix4(jR.makeRotationFromEuler(Ss)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===cn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){let S=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function qR(n,e,t,i){let r={},s={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,w){let E=w.program;i.uniformBlockBinding(S,E)}function c(S,w){let E=r[S.id];E===void 0&&(v(S),E=u(S),r[S.id]=E,S.addEventListener("dispose",m));let C=w.program;i.updateUBOMapping(S,C);let A=e.render.frame;s[S.id]!==A&&(f(S),s[S.id]=A)}function u(S){let w=d();S.__bindingPointIndex=w;let E=n.createBuffer(),C=S.__size,A=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,C,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,E),E}function d(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return Ae("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){let w=r[S.id],E=S.uniforms,C=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let A=0,I=E.length;A<I;A++){let k=Array.isArray(E[A])?E[A]:[E[A]];for(let x=0,M=k.length;x<M;x++){let R=k[x];if(h(R,A,x,C)===!0){let H=R.__offset,B=Array.isArray(R.value)?R.value:[R.value],q=0;for(let j=0;j<B.length;j++){let G=B[j],V=y(G);typeof G=="number"||typeof G=="boolean"?(R.__data[0]=G,n.bufferSubData(n.UNIFORM_BUFFER,H+q,R.__data)):G.isMatrix3?(R.__data[0]=G.elements[0],R.__data[1]=G.elements[1],R.__data[2]=G.elements[2],R.__data[3]=0,R.__data[4]=G.elements[3],R.__data[5]=G.elements[4],R.__data[6]=G.elements[5],R.__data[7]=0,R.__data[8]=G.elements[6],R.__data[9]=G.elements[7],R.__data[10]=G.elements[8],R.__data[11]=0):(G.toArray(R.__data,q),q+=V.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,H,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(S,w,E,C){let A=S.value,I=w+"_"+E;if(C[I]===void 0)return typeof A=="number"||typeof A=="boolean"?C[I]=A:C[I]=A.clone(),!0;{let k=C[I];if(typeof A=="number"||typeof A=="boolean"){if(k!==A)return C[I]=A,!0}else if(k.equals(A)===!1)return k.copy(A),!0}return!1}function v(S){let w=S.uniforms,E=0,C=16;for(let I=0,k=w.length;I<k;I++){let x=Array.isArray(w[I])?w[I]:[w[I]];for(let M=0,R=x.length;M<R;M++){let H=x[M],B=Array.isArray(H.value)?H.value:[H.value];for(let q=0,j=B.length;q<j;q++){let G=B[q],V=y(G),Z=E%C,ue=Z%V.boundary,oe=Z+ue;E+=ue,oe!==0&&C-oe<V.storage&&(E+=C-oe),H.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=E,E+=V.storage}}}let A=E%C;return A>0&&(E+=C-A),S.__size=E,S.__cache={},this}function y(S){let w={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(w.boundary=4,w.storage=4):S.isVector2?(w.boundary=8,w.storage=8):S.isVector3||S.isColor?(w.boundary=16,w.storage=12):S.isVector4?(w.boundary=16,w.storage=16):S.isMatrix3?(w.boundary=48,w.storage=48):S.isMatrix4?(w.boundary=64,w.storage=64):S.isTexture?De("WebGLRenderer: Texture samplers can not be part of an uniforms group."):De("WebGLRenderer: Unsupported uniform value type.",S),w}function m(S){let w=S.target;w.removeEventListener("dispose",m);let E=o.indexOf(w.__bindingPointIndex);o.splice(E,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function p(){for(let S in r)n.deleteBuffer(r[S]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}var XR=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ai=null;function YR(){return Ai===null&&(Ai=new Ru(XR,16,16,_s,Ti),Ai.name="DFG_LUT",Ai.minFilter=Qt,Ai.magFilter=Qt,Ai.wrapS=bi,Ai.wrapT=bi,Ai.generateMipmaps=!1,Ai.needsUpdate=!0),Ai}var Gd=class{constructor(e={}){let{canvas:t=jx(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:h=An}=e;this.isWebGLRenderer=!0;let v;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=i.getContextAttributes().alpha}else v=o;let y=h,m=new Set([sd,rd,id]),p=new Set([An,li,wo,Co,td,nd]),S=new Uint32Array(4),w=new Int32Array(4),E=null,C=null,A=[],I=[],k=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ai,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,M=!1;this._outputColorSpace=En;let R=0,H=0,B=null,q=-1,j=null,G=new Ot,V=new Ot,Z=null,ue=new rt(0),oe=0,de=t.width,Ge=t.height,Ue=1,Et=null,bt=null,$=new Ot(0,0,de,Ge),J=new Ot(0,0,de,Ge),pe=!1,Le=new qa,ve=!1,et=!1,$t=new Ht,Je=new F,lt=new Ot,mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ve=!1;function Ut(){return B===null?Ue:1}let T=i;function Vt(_,P){return t.getContext(_,P)}try{let _={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"182"}`),t.addEventListener("webglcontextlost",Re,!1),t.addEventListener("webglcontextrestored",xt,!1),t.addEventListener("webglcontextcreationerror",ct,!1),T===null){let P="webgl2";if(T=Vt(P,_),T===null)throw Vt(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(_){throw Ae("WebGLRenderer: "+_.message),_}let st,_t,_e,b,g,N,W,Y,z,Me,ne,ye,Ie,Q,re,ge,xe,ie,Be,D,ce,ee,fe,K;function X(){st=new n1(T),st.init(),ee=new zR(T,st),_t=new qD(T,st,e,ee),_e=new BR(T,st),_t.reversedDepthBuffer&&f&&_e.buffers.depth.setReversed(!0),b=new s1(T),g=new wR,N=new HR(T,st,_e,g,_t,ee,b),W=new YD(x),Y=new t1(x),z=new cA(T),fe=new jD(T,z),Me=new i1(T,z,b,fe),ne=new a1(T,Me,z,b),Be=new o1(T,_t,N),ge=new XD(g),ye=new ER(x,W,Y,st,_t,fe,ge),Ie=new $R(x,g),Q=new TR,re=new PR(st),ie=new WD(x,W,Y,_e,ne,v,l),xe=new UR(x,ne,_t),K=new qR(T,b,_t,_e),D=new $D(T,st,b),ce=new r1(T,st,b),b.programs=ye.programs,x.capabilities=_t,x.extensions=st,x.properties=g,x.renderLists=Q,x.shadowMap=xe,x.state=_e,x.info=b}X(),y!==An&&(k=new c1(y,t.width,t.height,r,s));let te=new Eg(x,T);this.xr=te,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){let _=st.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){let _=st.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return Ue},this.setPixelRatio=function(_){_!==void 0&&(Ue=_,this.setSize(de,Ge,!1))},this.getSize=function(_){return _.set(de,Ge)},this.setSize=function(_,P,U=!0){if(te.isPresenting){De("WebGLRenderer: Can't change size while VR device is presenting.");return}de=_,Ge=P,t.width=Math.floor(_*Ue),t.height=Math.floor(P*Ue),U===!0&&(t.style.width=_+"px",t.style.height=P+"px"),k!==null&&k.setSize(t.width,t.height),this.setViewport(0,0,_,P)},this.getDrawingBufferSize=function(_){return _.set(de*Ue,Ge*Ue).floor()},this.setDrawingBufferSize=function(_,P,U){de=_,Ge=P,Ue=U,t.width=Math.floor(_*U),t.height=Math.floor(P*U),this.setViewport(0,0,_,P)},this.setEffects=function(_){if(y===An){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(_){for(let P=0;P<_.length;P++)if(_[P].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}k.setEffects(_||[])},this.getCurrentViewport=function(_){return _.copy(G)},this.getViewport=function(_){return _.copy($)},this.setViewport=function(_,P,U,L){_.isVector4?$.set(_.x,_.y,_.z,_.w):$.set(_,P,U,L),_e.viewport(G.copy($).multiplyScalar(Ue).round())},this.getScissor=function(_){return _.copy(J)},this.setScissor=function(_,P,U,L){_.isVector4?J.set(_.x,_.y,_.z,_.w):J.set(_,P,U,L),_e.scissor(V.copy(J).multiplyScalar(Ue).round())},this.getScissorTest=function(){return pe},this.setScissorTest=function(_){_e.setScissorTest(pe=_)},this.setOpaqueSort=function(_){Et=_},this.setTransparentSort=function(_){bt=_},this.getClearColor=function(_){return _.copy(ie.getClearColor())},this.setClearColor=function(){ie.setClearColor(...arguments)},this.getClearAlpha=function(){return ie.getClearAlpha()},this.setClearAlpha=function(){ie.setClearAlpha(...arguments)},this.clear=function(_=!0,P=!0,U=!0){let L=0;if(_){let O=!1;if(B!==null){let se=B.texture.format;O=m.has(se)}if(O){let se=B.texture.type,he=p.has(se),le=ie.getClearColor(),me=ie.getClearAlpha(),be=le.r,Te=le.g,Se=le.b;he?(S[0]=be,S[1]=Te,S[2]=Se,S[3]=me,T.clearBufferuiv(T.COLOR,0,S)):(w[0]=be,w[1]=Te,w[2]=Se,w[3]=me,T.clearBufferiv(T.COLOR,0,w))}else L|=T.COLOR_BUFFER_BIT}P&&(L|=T.DEPTH_BUFFER_BIT),U&&(L|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(L)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Re,!1),t.removeEventListener("webglcontextrestored",xt,!1),t.removeEventListener("webglcontextcreationerror",ct,!1),ie.dispose(),Q.dispose(),re.dispose(),g.dispose(),W.dispose(),Y.dispose(),ne.dispose(),fe.dispose(),K.dispose(),ye.dispose(),te.dispose(),te.removeEventListener("sessionstart",Cg),te.removeEventListener("sessionend",Tg),Tr.stop()};function Re(_){_.preventDefault(),sg("WebGLRenderer: Context Lost."),M=!0}function xt(){sg("WebGLRenderer: Context Restored."),M=!1;let _=b.autoReset,P=xe.enabled,U=xe.autoUpdate,L=xe.needsUpdate,O=xe.type;X(),b.autoReset=_,xe.enabled=P,xe.autoUpdate=U,xe.needsUpdate=L,xe.type=O}function ct(_){Ae("WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function di(_){let P=_.target;P.removeEventListener("dispose",di),Di(P)}function Di(_){SM(_),g.remove(_)}function SM(_){let P=g.get(_).programs;P!==void 0&&(P.forEach(function(U){ye.releaseProgram(U)}),_.isShaderMaterial&&ye.releaseShaderCache(_))}this.renderBufferDirect=function(_,P,U,L,O,se){P===null&&(P=mt);let he=O.isMesh&&O.matrixWorld.determinant()<0,le=wM(_,P,U,L,O);_e.setMaterial(L,he);let me=U.index,be=1;if(L.wireframe===!0){if(me=Me.getWireframeAttribute(U),me===void 0)return;be=2}let Te=U.drawRange,Se=U.attributes.position,We=Te.start*be,dt=(Te.start+Te.count)*be;se!==null&&(We=Math.max(We,se.start*be),dt=Math.min(dt,(se.start+se.count)*be)),me!==null?(We=Math.max(We,0),dt=Math.min(dt,me.count)):Se!=null&&(We=Math.max(We,0),dt=Math.min(dt,Se.count));let It=dt-We;if(It<0||It===1/0)return;fe.setup(O,L,le,U,me);let Dt,gt=D;if(me!==null&&(Dt=z.get(me),gt=ce,gt.setIndex(Dt)),O.isMesh)L.wireframe===!0?(_e.setLineWidth(L.wireframeLinewidth*Ut()),gt.setMode(T.LINES)):gt.setMode(T.TRIANGLES);else if(O.isLine){let Ee=L.linewidth;Ee===void 0&&(Ee=1),_e.setLineWidth(Ee*Ut()),O.isLineSegments?gt.setMode(T.LINES):O.isLineLoop?gt.setMode(T.LINE_LOOP):gt.setMode(T.LINE_STRIP)}else O.isPoints?gt.setMode(T.POINTS):O.isSprite&&gt.setMode(T.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)_o("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),gt.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(st.get("WEBGL_multi_draw"))gt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{let Ee=O._multiDrawStarts,ut=O._multiDrawCounts,tt=O._multiDrawCount,mn=me?z.get(me).bytesPerElement:1,Cs=g.get(L).currentProgram.getUniforms();for(let gn=0;gn<tt;gn++)Cs.setValue(T,"_gl_DrawID",gn),gt.render(Ee[gn]/mn,ut[gn])}else if(O.isInstancedMesh)gt.renderInstances(We,It,O.count);else if(U.isInstancedBufferGeometry){let Ee=U._maxInstanceCount!==void 0?U._maxInstanceCount:1/0,ut=Math.min(U.instanceCount,Ee);gt.renderInstances(We,It,ut)}else gt.render(We,It)};function wg(_,P,U){_.transparent===!0&&_.side===wi&&_.forceSinglePass===!1?(_.side=cn,_.needsUpdate=!0,ul(_,P,U),_.side=Xi,_.needsUpdate=!0,ul(_,P,U),_.side=wi):ul(_,P,U)}this.compile=function(_,P,U=null){U===null&&(U=_),C=re.get(U),C.init(P),I.push(C),U.traverseVisible(function(O){O.isLight&&O.layers.test(P.layers)&&(C.pushLight(O),O.castShadow&&C.pushShadow(O))}),_!==U&&_.traverseVisible(function(O){O.isLight&&O.layers.test(P.layers)&&(C.pushLight(O),O.castShadow&&C.pushShadow(O))}),C.setupLights();let L=new Set;return _.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;let se=O.material;if(se)if(Array.isArray(se))for(let he=0;he<se.length;he++){let le=se[he];wg(le,U,O),L.add(le)}else wg(se,U,O),L.add(se)}),C=I.pop(),L},this.compileAsync=function(_,P,U=null){let L=this.compile(_,P,U);return new Promise(O=>{function se(){if(L.forEach(function(he){g.get(he).currentProgram.isReady()&&L.delete(he)}),L.size===0){O(_);return}setTimeout(se,10)}st.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let Kd=null;function EM(_){Kd&&Kd(_)}function Cg(){Tr.stop()}function Tg(){Tr.start()}let Tr=new vM;Tr.setAnimationLoop(EM),typeof self<"u"&&Tr.setContext(self),this.setAnimationLoop=function(_){Kd=_,te.setAnimationLoop(_),_===null?Tr.stop():Tr.start()},te.addEventListener("sessionstart",Cg),te.addEventListener("sessionend",Tg),this.render=function(_,P){if(P!==void 0&&P.isCamera!==!0){Ae("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;let U=te.enabled===!0&&te.isPresenting===!0,L=k!==null&&(B===null||U)&&k.begin(x,B);if(_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),te.enabled===!0&&te.isPresenting===!0&&(k===null||k.isCompositing()===!1)&&(te.cameraAutoUpdate===!0&&te.updateCamera(P),P=te.getCamera()),_.isScene===!0&&_.onBeforeRender(x,_,P,B),C=re.get(_,I.length),C.init(P),I.push(C),$t.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),Le.setFromProjectionMatrix($t,oi,P.reversedDepth),et=this.localClippingEnabled,ve=ge.init(this.clippingPlanes,et),E=Q.get(_,A.length),E.init(),A.push(E),te.enabled===!0&&te.isPresenting===!0){let he=x.xr.getDepthSensingMesh();he!==null&&Qd(he,P,-1/0,x.sortObjects)}Qd(_,P,0,x.sortObjects),E.finish(),x.sortObjects===!0&&E.sort(Et,bt),Ve=te.enabled===!1||te.isPresenting===!1||te.hasDepthSensing()===!1,Ve&&ie.addToRenderList(E,_),this.info.render.frame++,ve===!0&&ge.beginShadows();let O=C.state.shadowsArray;if(xe.render(O,_,P),ve===!0&&ge.endShadows(),this.info.autoReset===!0&&this.info.reset(),(L&&k.hasRenderPass())===!1){let he=E.opaque,le=E.transmissive;if(C.setupLights(),P.isArrayCamera){let me=P.cameras;if(le.length>0)for(let be=0,Te=me.length;be<Te;be++){let Se=me[be];Ig(he,le,_,Se)}Ve&&ie.render(_);for(let be=0,Te=me.length;be<Te;be++){let Se=me[be];Ag(E,_,Se,Se.viewport)}}else le.length>0&&Ig(he,le,_,P),Ve&&ie.render(_),Ag(E,_,P)}B!==null&&H===0&&(N.updateMultisampleRenderTarget(B),N.updateRenderTargetMipmap(B)),L&&k.end(x),_.isScene===!0&&_.onAfterRender(x,_,P),fe.resetDefaultState(),q=-1,j=null,I.pop(),I.length>0?(C=I[I.length-1],ve===!0&&ge.setGlobalState(x.clippingPlanes,C.state.camera)):C=null,A.pop(),A.length>0?E=A[A.length-1]:E=null};function Qd(_,P,U,L){if(_.visible===!1)return;if(_.layers.test(P.layers)){if(_.isGroup)U=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(P);else if(_.isLight)C.pushLight(_),_.castShadow&&C.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||Le.intersectsSprite(_)){L&&lt.setFromMatrixPosition(_.matrixWorld).applyMatrix4($t);let he=ne.update(_),le=_.material;le.visible&&E.push(_,he,le,U,lt.z,null)}}else if((_.isMesh||_.isLine||_.isPoints)&&(!_.frustumCulled||Le.intersectsObject(_))){let he=ne.update(_),le=_.material;if(L&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),lt.copy(_.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),lt.copy(he.boundingSphere.center)),lt.applyMatrix4(_.matrixWorld).applyMatrix4($t)),Array.isArray(le)){let me=he.groups;for(let be=0,Te=me.length;be<Te;be++){let Se=me[be],We=le[Se.materialIndex];We&&We.visible&&E.push(_,he,We,U,lt.z,Se)}}else le.visible&&E.push(_,he,le,U,lt.z,null)}}let se=_.children;for(let he=0,le=se.length;he<le;he++)Qd(se[he],P,U,L)}function Ag(_,P,U,L){let{opaque:O,transmissive:se,transparent:he}=_;C.setupLightsView(U),ve===!0&&ge.setGlobalState(x.clippingPlanes,U),L&&_e.viewport(G.copy(L)),O.length>0&&cl(O,P,U),se.length>0&&cl(se,P,U),he.length>0&&cl(he,P,U),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function Ig(_,P,U,L){if((U.isScene===!0?U.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[L.id]===void 0){let We=st.has("EXT_color_buffer_half_float")||st.has("EXT_color_buffer_float");C.state.transmissionRenderTarget[L.id]=new Cn(1,1,{generateMipmaps:!0,type:We?Ti:An,minFilter:Er,samples:_t.samples,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace})}let se=C.state.transmissionRenderTarget[L.id],he=L.viewport||G;se.setSize(he.z*x.transmissionResolutionScale,he.w*x.transmissionResolutionScale);let le=x.getRenderTarget(),me=x.getActiveCubeFace(),be=x.getActiveMipmapLevel();x.setRenderTarget(se),x.getClearColor(ue),oe=x.getClearAlpha(),oe<1&&x.setClearColor(16777215,.5),x.clear(),Ve&&ie.render(U);let Te=x.toneMapping;x.toneMapping=ai;let Se=L.viewport;if(L.viewport!==void 0&&(L.viewport=void 0),C.setupLightsView(L),ve===!0&&ge.setGlobalState(x.clippingPlanes,L),cl(_,U,L),N.updateMultisampleRenderTarget(se),N.updateRenderTargetMipmap(se),st.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let dt=0,It=P.length;dt<It;dt++){let Dt=P[dt],{object:gt,geometry:Ee,material:ut,group:tt}=Dt;if(ut.side===wi&&gt.layers.test(L.layers)){let mn=ut.side;ut.side=cn,ut.needsUpdate=!0,Dg(gt,U,L,Ee,ut,tt),ut.side=mn,ut.needsUpdate=!0,We=!0}}We===!0&&(N.updateMultisampleRenderTarget(se),N.updateRenderTargetMipmap(se))}x.setRenderTarget(le,me,be),x.setClearColor(ue,oe),Se!==void 0&&(L.viewport=Se),x.toneMapping=Te}function cl(_,P,U){let L=P.isScene===!0?P.overrideMaterial:null;for(let O=0,se=_.length;O<se;O++){let he=_[O],{object:le,geometry:me,group:be}=he,Te=he.material;Te.allowOverride===!0&&L!==null&&(Te=L),le.layers.test(U.layers)&&Dg(le,P,U,me,Te,be)}}function Dg(_,P,U,L,O,se){_.onBeforeRender(x,P,U,L,O,se),_.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),O.onBeforeRender(x,P,U,L,_,se),O.transparent===!0&&O.side===wi&&O.forceSinglePass===!1?(O.side=cn,O.needsUpdate=!0,x.renderBufferDirect(U,P,L,O,_,se),O.side=Xi,O.needsUpdate=!0,x.renderBufferDirect(U,P,L,O,_,se),O.side=wi):x.renderBufferDirect(U,P,L,O,_,se),_.onAfterRender(x,P,U,L,O,se)}function ul(_,P,U){P.isScene!==!0&&(P=mt);let L=g.get(_),O=C.state.lights,se=C.state.shadowsArray,he=O.state.version,le=ye.getParameters(_,O.state,se,P,U),me=ye.getProgramCacheKey(le),be=L.programs;L.environment=_.isMeshStandardMaterial?P.environment:null,L.fog=P.fog,L.envMap=(_.isMeshStandardMaterial?Y:W).get(_.envMap||L.environment),L.envMapRotation=L.environment!==null&&_.envMap===null?P.environmentRotation:_.envMapRotation,be===void 0&&(_.addEventListener("dispose",di),be=new Map,L.programs=be);let Te=be.get(me);if(Te!==void 0){if(L.currentProgram===Te&&L.lightsStateVersion===he)return Ng(_,le),Te}else le.uniforms=ye.getUniforms(_),_.onBeforeCompile(le,x),Te=ye.acquireProgram(le,me),be.set(me,Te),L.uniforms=le.uniforms;let Se=L.uniforms;return(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(Se.clippingPlanes=ge.uniform),Ng(_,le),L.needsLights=TM(_),L.lightsStateVersion=he,L.needsLights&&(Se.ambientLightColor.value=O.state.ambient,Se.lightProbe.value=O.state.probe,Se.directionalLights.value=O.state.directional,Se.directionalLightShadows.value=O.state.directionalShadow,Se.spotLights.value=O.state.spot,Se.spotLightShadows.value=O.state.spotShadow,Se.rectAreaLights.value=O.state.rectArea,Se.ltc_1.value=O.state.rectAreaLTC1,Se.ltc_2.value=O.state.rectAreaLTC2,Se.pointLights.value=O.state.point,Se.pointLightShadows.value=O.state.pointShadow,Se.hemisphereLights.value=O.state.hemi,Se.directionalShadowMap.value=O.state.directionalShadowMap,Se.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Se.spotShadowMap.value=O.state.spotShadowMap,Se.spotLightMatrix.value=O.state.spotLightMatrix,Se.spotLightMap.value=O.state.spotLightMap,Se.pointShadowMap.value=O.state.pointShadowMap,Se.pointShadowMatrix.value=O.state.pointShadowMatrix),L.currentProgram=Te,L.uniformsList=null,Te}function Rg(_){if(_.uniformsList===null){let P=_.currentProgram.getUniforms();_.uniformsList=Ao.seqWithValue(P.seq,_.uniforms)}return _.uniformsList}function Ng(_,P){let U=g.get(_);U.outputColorSpace=P.outputColorSpace,U.batching=P.batching,U.batchingColor=P.batchingColor,U.instancing=P.instancing,U.instancingColor=P.instancingColor,U.instancingMorph=P.instancingMorph,U.skinning=P.skinning,U.morphTargets=P.morphTargets,U.morphNormals=P.morphNormals,U.morphColors=P.morphColors,U.morphTargetsCount=P.morphTargetsCount,U.numClippingPlanes=P.numClippingPlanes,U.numIntersection=P.numClipIntersection,U.vertexAlphas=P.vertexAlphas,U.vertexTangents=P.vertexTangents,U.toneMapping=P.toneMapping}function wM(_,P,U,L,O){P.isScene!==!0&&(P=mt),N.resetTextureUnits();let se=P.fog,he=L.isMeshStandardMaterial?P.environment:null,le=B===null?x.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:fs,me=(L.isMeshStandardMaterial?Y:W).get(L.envMap||he),be=L.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,Te=!!U.attributes.tangent&&(!!L.normalMap||L.anisotropy>0),Se=!!U.morphAttributes.position,We=!!U.morphAttributes.normal,dt=!!U.morphAttributes.color,It=ai;L.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(It=x.toneMapping);let Dt=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,gt=Dt!==void 0?Dt.length:0,Ee=g.get(L),ut=C.state.lights;if(ve===!0&&(et===!0||_!==j)){let an=_===j&&L.id===q;ge.setState(L,_,an)}let tt=!1;L.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==ut.state.version||Ee.outputColorSpace!==le||O.isBatchedMesh&&Ee.batching===!1||!O.isBatchedMesh&&Ee.batching===!0||O.isBatchedMesh&&Ee.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Ee.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Ee.instancing===!1||!O.isInstancedMesh&&Ee.instancing===!0||O.isSkinnedMesh&&Ee.skinning===!1||!O.isSkinnedMesh&&Ee.skinning===!0||O.isInstancedMesh&&Ee.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ee.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Ee.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Ee.instancingMorph===!1&&O.morphTexture!==null||Ee.envMap!==me||L.fog===!0&&Ee.fog!==se||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==ge.numPlanes||Ee.numIntersection!==ge.numIntersection)||Ee.vertexAlphas!==be||Ee.vertexTangents!==Te||Ee.morphTargets!==Se||Ee.morphNormals!==We||Ee.morphColors!==dt||Ee.toneMapping!==It||Ee.morphTargetsCount!==gt)&&(tt=!0):(tt=!0,Ee.__version=L.version);let mn=Ee.currentProgram;tt===!0&&(mn=ul(L,P,O));let Cs=!1,gn=!1,Ro=!1,Mt=mn.getUniforms(),un=Ee.uniforms;if(_e.useProgram(mn.program)&&(Cs=!0,gn=!0,Ro=!0),L.id!==q&&(q=L.id,gn=!0),Cs||j!==_){_e.buffers.depth.getReversed()&&_.reversedDepth!==!0&&(_._reversedDepth=!0,_.updateProjectionMatrix()),Mt.setValue(T,"projectionMatrix",_.projectionMatrix),Mt.setValue(T,"viewMatrix",_.matrixWorldInverse);let dn=Mt.map.cameraPosition;dn!==void 0&&dn.setValue(T,Je.setFromMatrixPosition(_.matrixWorld)),_t.logarithmicDepthBuffer&&Mt.setValue(T,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),(L.isMeshPhongMaterial||L.isMeshToonMaterial||L.isMeshLambertMaterial||L.isMeshBasicMaterial||L.isMeshStandardMaterial||L.isShaderMaterial)&&Mt.setValue(T,"isOrthographic",_.isOrthographicCamera===!0),j!==_&&(j=_,gn=!0,Ro=!0)}if(Ee.needsLights&&(ut.state.directionalShadowMap.length>0&&Mt.setValue(T,"directionalShadowMap",ut.state.directionalShadowMap,N),ut.state.spotShadowMap.length>0&&Mt.setValue(T,"spotShadowMap",ut.state.spotShadowMap,N),ut.state.pointShadowMap.length>0&&Mt.setValue(T,"pointShadowMap",ut.state.pointShadowMap,N)),O.isSkinnedMesh){Mt.setOptional(T,O,"bindMatrix"),Mt.setOptional(T,O,"bindMatrixInverse");let an=O.skeleton;an&&(an.boneTexture===null&&an.computeBoneTexture(),Mt.setValue(T,"boneTexture",an.boneTexture,N))}O.isBatchedMesh&&(Mt.setOptional(T,O,"batchingTexture"),Mt.setValue(T,"batchingTexture",O._matricesTexture,N),Mt.setOptional(T,O,"batchingIdTexture"),Mt.setValue(T,"batchingIdTexture",O._indirectTexture,N),Mt.setOptional(T,O,"batchingColorTexture"),O._colorsTexture!==null&&Mt.setValue(T,"batchingColorTexture",O._colorsTexture,N));let In=U.morphAttributes;if((In.position!==void 0||In.normal!==void 0||In.color!==void 0)&&Be.update(O,U,mn),(gn||Ee.receiveShadow!==O.receiveShadow)&&(Ee.receiveShadow=O.receiveShadow,Mt.setValue(T,"receiveShadow",O.receiveShadow)),L.isMeshGouraudMaterial&&L.envMap!==null&&(un.envMap.value=me,un.flipEnvMap.value=me.isCubeTexture&&me.isRenderTargetTexture===!1?-1:1),L.isMeshStandardMaterial&&L.envMap===null&&P.environment!==null&&(un.envMapIntensity.value=P.environmentIntensity),un.dfgLUT!==void 0&&(un.dfgLUT.value=YR()),gn&&(Mt.setValue(T,"toneMappingExposure",x.toneMappingExposure),Ee.needsLights&&CM(un,Ro),se&&L.fog===!0&&Ie.refreshFogUniforms(un,se),Ie.refreshMaterialUniforms(un,L,Ue,Ge,C.state.transmissionRenderTarget[_.id]),Ao.upload(T,Rg(Ee),un,N)),L.isShaderMaterial&&L.uniformsNeedUpdate===!0&&(Ao.upload(T,Rg(Ee),un,N),L.uniformsNeedUpdate=!1),L.isSpriteMaterial&&Mt.setValue(T,"center",O.center),Mt.setValue(T,"modelViewMatrix",O.modelViewMatrix),Mt.setValue(T,"normalMatrix",O.normalMatrix),Mt.setValue(T,"modelMatrix",O.matrixWorld),L.isShaderMaterial||L.isRawShaderMaterial){let an=L.uniformsGroups;for(let dn=0,ef=an.length;dn<ef;dn++){let Ar=an[dn];K.update(Ar,mn),K.bind(Ar,mn)}}return mn}function CM(_,P){_.ambientLightColor.needsUpdate=P,_.lightProbe.needsUpdate=P,_.directionalLights.needsUpdate=P,_.directionalLightShadows.needsUpdate=P,_.pointLights.needsUpdate=P,_.pointLightShadows.needsUpdate=P,_.spotLights.needsUpdate=P,_.spotLightShadows.needsUpdate=P,_.rectAreaLights.needsUpdate=P,_.hemisphereLights.needsUpdate=P}function TM(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(_,P,U){let L=g.get(_);L.__autoAllocateDepthBuffer=_.resolveDepthBuffer===!1,L.__autoAllocateDepthBuffer===!1&&(L.__useRenderToTexture=!1),g.get(_.texture).__webglTexture=P,g.get(_.depthTexture).__webglTexture=L.__autoAllocateDepthBuffer?void 0:U,L.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(_,P){let U=g.get(_);U.__webglFramebuffer=P,U.__useDefaultFramebuffer=P===void 0};let AM=T.createFramebuffer();this.setRenderTarget=function(_,P=0,U=0){B=_,R=P,H=U;let L=null,O=!1,se=!1;if(_){let le=g.get(_);if(le.__useDefaultFramebuffer!==void 0){_e.bindFramebuffer(T.FRAMEBUFFER,le.__webglFramebuffer),G.copy(_.viewport),V.copy(_.scissor),Z=_.scissorTest,_e.viewport(G),_e.scissor(V),_e.setScissorTest(Z),q=-1;return}else if(le.__webglFramebuffer===void 0)N.setupRenderTarget(_);else if(le.__hasExternalTextures)N.rebindTextures(_,g.get(_.texture).__webglTexture,g.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){let Te=_.depthTexture;if(le.__boundDepthTexture!==Te){if(Te!==null&&g.has(Te)&&(_.width!==Te.image.width||_.height!==Te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(_)}}let me=_.texture;(me.isData3DTexture||me.isDataArrayTexture||me.isCompressedArrayTexture)&&(se=!0);let be=g.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(Array.isArray(be[P])?L=be[P][U]:L=be[P],O=!0):_.samples>0&&N.useMultisampledRTT(_)===!1?L=g.get(_).__webglMultisampledFramebuffer:Array.isArray(be)?L=be[U]:L=be,G.copy(_.viewport),V.copy(_.scissor),Z=_.scissorTest}else G.copy($).multiplyScalar(Ue).floor(),V.copy(J).multiplyScalar(Ue).floor(),Z=pe;if(U!==0&&(L=AM),_e.bindFramebuffer(T.FRAMEBUFFER,L)&&_e.drawBuffers(_,L),_e.viewport(G),_e.scissor(V),_e.setScissorTest(Z),O){let le=g.get(_.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+P,le.__webglTexture,U)}else if(se){let le=P;for(let me=0;me<_.textures.length;me++){let be=g.get(_.textures[me]);T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0+me,be.__webglTexture,U,le)}}else if(_!==null&&U!==0){let le=g.get(_.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,le.__webglTexture,U)}q=-1},this.readRenderTargetPixels=function(_,P,U,L,O,se,he,le=0){if(!(_&&_.isWebGLRenderTarget)){Ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let me=g.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&he!==void 0&&(me=me[he]),me){_e.bindFramebuffer(T.FRAMEBUFFER,me);try{let be=_.textures[le],Te=be.format,Se=be.type;if(!_t.textureFormatReadable(Te)){Ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_t.textureTypeReadable(Se)){Ae("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=_.width-L&&U>=0&&U<=_.height-O&&(_.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+le),T.readPixels(P,U,L,O,ee.convert(Te),ee.convert(Se),se))}finally{let be=B!==null?g.get(B).__webglFramebuffer:null;_e.bindFramebuffer(T.FRAMEBUFFER,be)}}},this.readRenderTargetPixelsAsync=async function(_,P,U,L,O,se,he,le=0){if(!(_&&_.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let me=g.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&he!==void 0&&(me=me[he]),me)if(P>=0&&P<=_.width-L&&U>=0&&U<=_.height-O){_e.bindFramebuffer(T.FRAMEBUFFER,me);let be=_.textures[le],Te=be.format,Se=be.type;if(!_t.textureFormatReadable(Te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_t.textureTypeReadable(Se))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let We=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,We),T.bufferData(T.PIXEL_PACK_BUFFER,se.byteLength,T.STREAM_READ),_.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+le),T.readPixels(P,U,L,O,ee.convert(Te),ee.convert(Se),0);let dt=B!==null?g.get(B).__webglFramebuffer:null;_e.bindFramebuffer(T.FRAMEBUFFER,dt);let It=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await $x(T,It,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,We),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,se),T.deleteBuffer(We),T.deleteSync(It),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(_,P=null,U=0){let L=Math.pow(2,-U),O=Math.floor(_.image.width*L),se=Math.floor(_.image.height*L),he=P!==null?P.x:0,le=P!==null?P.y:0;N.setTexture2D(_,0),T.copyTexSubImage2D(T.TEXTURE_2D,U,0,0,he,le,O,se),_e.unbindTexture()};let IM=T.createFramebuffer(),DM=T.createFramebuffer();this.copyTextureToTexture=function(_,P,U=null,L=null,O=0,se=null){se===null&&(O!==0?(_o("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),se=O,O=0):se=0);let he,le,me,be,Te,Se,We,dt,It,Dt=_.isCompressedTexture?_.mipmaps[se]:_.image;if(U!==null)he=U.max.x-U.min.x,le=U.max.y-U.min.y,me=U.isBox3?U.max.z-U.min.z:1,be=U.min.x,Te=U.min.y,Se=U.isBox3?U.min.z:0;else{let In=Math.pow(2,-O);he=Math.floor(Dt.width*In),le=Math.floor(Dt.height*In),_.isDataArrayTexture?me=Dt.depth:_.isData3DTexture?me=Math.floor(Dt.depth*In):me=1,be=0,Te=0,Se=0}L!==null?(We=L.x,dt=L.y,It=L.z):(We=0,dt=0,It=0);let gt=ee.convert(P.format),Ee=ee.convert(P.type),ut;P.isData3DTexture?(N.setTexture3D(P,0),ut=T.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(N.setTexture2DArray(P,0),ut=T.TEXTURE_2D_ARRAY):(N.setTexture2D(P,0),ut=T.TEXTURE_2D),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,P.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,P.unpackAlignment);let tt=T.getParameter(T.UNPACK_ROW_LENGTH),mn=T.getParameter(T.UNPACK_IMAGE_HEIGHT),Cs=T.getParameter(T.UNPACK_SKIP_PIXELS),gn=T.getParameter(T.UNPACK_SKIP_ROWS),Ro=T.getParameter(T.UNPACK_SKIP_IMAGES);T.pixelStorei(T.UNPACK_ROW_LENGTH,Dt.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,Dt.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,be),T.pixelStorei(T.UNPACK_SKIP_ROWS,Te),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Se);let Mt=_.isDataArrayTexture||_.isData3DTexture,un=P.isDataArrayTexture||P.isData3DTexture;if(_.isDepthTexture){let In=g.get(_),an=g.get(P),dn=g.get(In.__renderTarget),ef=g.get(an.__renderTarget);_e.bindFramebuffer(T.READ_FRAMEBUFFER,dn.__webglFramebuffer),_e.bindFramebuffer(T.DRAW_FRAMEBUFFER,ef.__webglFramebuffer);for(let Ar=0;Ar<me;Ar++)Mt&&(T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,g.get(_).__webglTexture,O,Se+Ar),T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,g.get(P).__webglTexture,se,It+Ar)),T.blitFramebuffer(be,Te,he,le,We,dt,he,le,T.DEPTH_BUFFER_BIT,T.NEAREST);_e.bindFramebuffer(T.READ_FRAMEBUFFER,null),_e.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else if(O!==0||_.isRenderTargetTexture||g.has(_)){let In=g.get(_),an=g.get(P);_e.bindFramebuffer(T.READ_FRAMEBUFFER,IM),_e.bindFramebuffer(T.DRAW_FRAMEBUFFER,DM);for(let dn=0;dn<me;dn++)Mt?T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,In.__webglTexture,O,Se+dn):T.framebufferTexture2D(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,In.__webglTexture,O),un?T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,an.__webglTexture,se,It+dn):T.framebufferTexture2D(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,an.__webglTexture,se),O!==0?T.blitFramebuffer(be,Te,he,le,We,dt,he,le,T.COLOR_BUFFER_BIT,T.NEAREST):un?T.copyTexSubImage3D(ut,se,We,dt,It+dn,be,Te,he,le):T.copyTexSubImage2D(ut,se,We,dt,be,Te,he,le);_e.bindFramebuffer(T.READ_FRAMEBUFFER,null),_e.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else un?_.isDataTexture||_.isData3DTexture?T.texSubImage3D(ut,se,We,dt,It,he,le,me,gt,Ee,Dt.data):P.isCompressedArrayTexture?T.compressedTexSubImage3D(ut,se,We,dt,It,he,le,me,gt,Dt.data):T.texSubImage3D(ut,se,We,dt,It,he,le,me,gt,Ee,Dt):_.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,se,We,dt,he,le,gt,Ee,Dt.data):_.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,se,We,dt,Dt.width,Dt.height,gt,Dt.data):T.texSubImage2D(T.TEXTURE_2D,se,We,dt,he,le,gt,Ee,Dt);T.pixelStorei(T.UNPACK_ROW_LENGTH,tt),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,mn),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Cs),T.pixelStorei(T.UNPACK_SKIP_ROWS,gn),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Ro),se===0&&P.generateMipmaps&&T.generateMipmap(ut),_e.unbindTexture()},this.initRenderTarget=function(_){g.get(_).__webglFramebuffer===void 0&&N.setupRenderTarget(_)},this.initTexture=function(_){_.isCubeTexture?N.setTextureCube(_,0):_.isData3DTexture?N.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?N.setTexture2DArray(_,0):N.setTexture2D(_,0),_e.unbindTexture()},this.resetState=function(){R=0,H=0,B=null,_e.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}};var Do=class n{audioContext=null;analyser=null;source=null;stream=null;mediaElement=null;mediaElementSource=null;fftSize=1024;frequencyData=new Uint8Array(this.fftSize/2);timeData=new Uint8Array(this.fftSize);previousSpectrum=new Float32Array(this.fftSize/2);hasPreviousSpectrum=!1;status=At("idle");activeSource=At(null);rawMetrics=At({rms:0,bass:0,lowMid:0,mid:0,presence:0,treble:0,spectralCentroid:0,spectralFlux:0,zcr:0,crest:0});rms=kt(()=>this.rawMetrics().rms);bass=kt(()=>this.rawMetrics().bass);lowMid=kt(()=>this.rawMetrics().lowMid);mid=kt(()=>this.rawMetrics().mid);presence=kt(()=>this.rawMetrics().presence);treble=kt(()=>this.rawMetrics().treble);spectralCentroid=kt(()=>this.rawMetrics().spectralCentroid);spectralFlux=kt(()=>this.rawMetrics().spectralFlux);zcr=kt(()=>this.rawMetrics().zcr);crest=kt(()=>this.rawMetrics().crest);energy=kt(()=>this.bass()*.4+this.mid()*.3+this.presence()*.2+this.treble()*.1);async initMicrophone(){try{let e=await navigator.mediaDevices.getUserMedia({audio:!0});await this.initFromMediaStream(e,"microphone")}catch{this.status.set("error"),this.activeSource.set(null)}}async initSystemAudio(){try{let e=await navigator.mediaDevices.getDisplayMedia({video:!0,audio:!0});if(!e.getAudioTracks().length)throw e.getTracks().forEach(t=>t.stop()),new Error("No system audio track available");await this.initFromMediaStream(e,"system")}catch{this.status.set("error"),this.activeSource.set(null)}}async initFromAudioElement(e){try{await this.ensureAudioContext(),(!this.mediaElementSource||this.mediaElement!==e)&&(this.mediaElementSource?.disconnect(),this.mediaElementSource=this.audioContext.createMediaElementSource(e),this.mediaElement=e),this.connectSource(this.mediaElementSource,{routeToDestination:!0,stopStream:!0}),this.status.set("running"),this.activeSource.set("file")}catch{this.status.set("error"),this.activeSource.set(null)}}stopLiveInput(){this.activeSource()!=="microphone"&&this.activeSource()!=="system"||(this.disconnectCurrentSource(),this.stopStreamTracks(),this.status.set("idle"),this.activeSource.set(null))}update(){this.analyser&&(this.analyser.getByteFrequencyData(this.frequencyData),this.analyser.getByteTimeDomainData(this.timeData),this.rawMetrics.set(this.calculateMetrics()))}setupAnalyser(){this.analyser=this.audioContext.createAnalyser(),this.analyser.fftSize=this.fftSize,this.analyser.smoothingTimeConstant=.8}async initFromMediaStream(e,t){await this.ensureAudioContext(),this.stopStreamTracks(),this.stream=e,this.bindStreamEnded(e);let i=this.audioContext.createMediaStreamSource(e);this.connectSource(i,{routeToDestination:!1,stopStream:!1}),this.status.set("running"),this.activeSource.set(t)}async ensureAudioContext(){this.audioContext||(this.audioContext=new AudioContext),this.analyser||this.setupAnalyser(),this.audioContext.state==="suspended"&&await this.audioContext.resume()}connectSource(e,t){this.disconnectCurrentSource(),t.stopStream&&this.stopStreamTracks(),this.analyser||this.setupAnalyser(),e.connect(this.analyser),t.routeToDestination&&this.analyser.connect(this.audioContext.destination),this.source=e,this.hasPreviousSpectrum=!1,this.previousSpectrum.fill(0)}disconnectCurrentSource(){this.source?.disconnect(),this.source=null,this.analyser?.disconnect()}stopStreamTracks(){this.stream&&(this.stream.getTracks().forEach(e=>e.stop()),this.stream=null)}bindStreamEnded(e){for(let t of e.getTracks())t.addEventListener("ended",()=>{this.stream===e&&(this.disconnectCurrentSource(),this.stopStreamTracks(),this.status.set("idle"),this.activeSource.set(null))})}calculateMetrics(){let e=this.frequencyData,t=this.averageByHz(e,20,140),i=this.averageByHz(e,140,400),r=this.averageByHz(e,400,2e3),s=this.averageByHz(e,2e3,6e3),o=this.averageByHz(e,6e3,16e3),a=this.calculateRMS(this.timeData),l=this.calculateSpectralCentroid(e),c=this.calculateSpectralFlux(e),u=this.calculateZeroCrossingRate(this.timeData),d=this.calculateCrestFactor(this.timeData,a);return{rms:a,bass:t,lowMid:i,mid:r,presence:s,treble:o,spectralCentroid:l,spectralFlux:c,zcr:u,crest:d}}average(e,t,i){if(i<=t)return 0;let r=0;for(let s=t;s<i;s++)r+=e[s];return r/(i-t)/255}averageByHz(e,t,i){let r=this.frequencyBinForHz(t),s=Math.min(e.length,this.frequencyBinForHz(i)+1);return this.average(e,r,s)}frequencyBinForHz(e){let i=(this.audioContext?.sampleRate??44100)/this.fftSize,r=Math.floor(e/i);return Math.max(0,Math.min(this.frequencyData.length-1,r))}calculateRMS(e){let t=0;for(let i=0;i<e.length;i++){let r=(e[i]-128)/128;t+=r*r}return Math.sqrt(t/e.length)}calculateSpectralCentroid(e){let t=0,i=0;for(let r=0;r<e.length;r++){let s=e[r]/255;t+=r*s,i+=s}return i<=1e-5?0:t/i/(e.length-1)}calculateSpectralFlux(e){let t=0;for(let i=0;i<e.length;i++){let r=e[i]/255,s=r-this.previousSpectrum[i];s>0&&(t+=s),this.previousSpectrum[i]=r}return this.hasPreviousSpectrum?Math.min(1,t/e.length*6):(this.hasPreviousSpectrum=!0,0)}calculateZeroCrossingRate(e){let t=0,i=e[0]-128>=0?1:-1;for(let r=1;r<e.length;r++){let s=e[r]-128>=0?1:-1;s!==i&&t++,i=s}return t/(e.length-1)}calculateCrestFactor(e,t){let i=0;for(let s=0;s<e.length;s++){let o=Math.abs((e[s]-128)/128);o>i&&(i=o)}if(t<=1e-5)return 0;let r=i/t;return Math.min(1,Math.max(0,(r-1)/9))}static \u0275fac=function(t){return new(t||n)};static \u0275prov=yt({token:n,factory:n.\u0275fac,providedIn:"root"})};var ws={timeSpeed:1,reactivity:1,energyGain:1,bassGain:1,midGain:1,trebleGain:1,fluxGain:1};var ui=class extends Error{constructor(t,i,r=[]){super(i);this.code=t;this.details=r}},$d=class n{endpoint="/apishaders/generate";async generateFragment(e){let t=e.trim();if(!t)throw new ui("EMPTY_PROMPT","Prompt is empty.");try{let i=await fetch(this.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:t,target:"webgl1",requiredUniforms:["uTime","uResolution","uEnergy","uBass","uLowMid","uMid","uPresence","uTreble","uHigh","uRms","uCentroid","uFlux","uZcr","uCrest"]})});if(!i.ok){let o=(await i.text()).slice(0,200);throw new ui("API",`Shader API error (${i.status}).`,[o])}let r=await i.json();return{fragment:this.extractFragment(r),source:"api"}}catch(i){if(i instanceof ui&&i.code==="EMPTY_PROMPT")throw i;return{fragment:this.buildFallbackFragment(t),source:"fallback"}}}validateProgram(e,t){let r=document.createElement("canvas").getContext("webgl");if(!r)return["WebGL context is unavailable."];let s=r.createShader(r.VERTEX_SHADER),o=r.createShader(r.FRAGMENT_SHADER);if(!s||!o)return["Unable to allocate shader objects."];let a=`
attribute vec3 position;
void main() {
  gl_Position = vec4(position, 1.0);
}
`.trim();r.shaderSource(s,a),r.compileShader(s);let l=r.getShaderParameter(s,r.COMPILE_STATUS),c=r.getShaderInfoLog(s)??"";r.shaderSource(o,t),r.compileShader(o);let u=r.getShaderParameter(o,r.COMPILE_STATUS),d=r.getShaderInfoLog(o)??"",f=[];if(!l&&c.trim()&&f.push(`Vertex compile error: ${c.trim()}`),!u&&d.trim()&&f.push(`Fragment compile error: ${d.trim()}`),!f.length&&l&&u){let h=r.createProgram();if(!h)return["Unable to allocate shader program."];r.attachShader(h,s),r.attachShader(h,o),r.linkProgram(h);let v=r.getProgramParameter(h,r.LINK_STATUS),y=r.getProgramInfoLog(h)??"";!v&&y.trim()&&f.push(`Program link error: ${y.trim()}`),r.deleteProgram(h)}return r.deleteShader(s),r.deleteShader(o),f}extractFragment(e){let t=typeof e.fragment=="string"?e.fragment:typeof e.shader?.fragment=="string"?e.shader.fragment:null;if(!t)throw new ui("INVALID_RESPONSE","Shader API returned invalid payload.");let i=t.replace(/^```(?:glsl)?\s*/i,"").replace(/```$/i,"").trim();if(!i.includes("void main"))throw new ui("INVALID_RESPONSE","Fragment shader has no main() function.");return i}buildFallbackFragment(e){let t=this.hashPrompt(e),i=(t%360).toFixed(1),r=(t*7%360).toFixed(1),s=(.35+t%40/100).toFixed(2),o=(.55+t%30/100).toFixed(2);return`
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uEnergy;
uniform float uBass;
uniform float uLowMid;
uniform float uMid;
uniform float uPresence;
uniform float uTreble;
uniform float uHigh;
uniform float uRms;
uniform float uCentroid;
uniform float uFlux;
uniform float uZcr;
uniform float uCrest;

vec3 hsl2rgb(vec3 c) {
  vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amp * sin(p.x) * cos(p.y);
    p = mat2(1.7, 1.2, -1.2, 1.7) * p;
    amp *= 0.55;
  }
  return value;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
  float t = uTime * ${s};

  float pulse = mix(uEnergy, uBass, 0.65);
  float detail = mix(uMid, uPresence, 0.5) + uFlux * 0.7;
  float noise = fbm(uv * (3.0 + 4.0 * detail) + vec2(t, -t * 0.7));
  float ring = sin(length(uv) * (10.0 + 8.0 * uTreble) - t * 4.0 + noise * 2.0);
  float glow = exp(-3.2 * length(uv)) * (0.5 + pulse * ${o});
  float value = 0.5 + 0.5 * ring + glow + noise * 0.25;

  vec3 colA = hsl2rgb(vec3(${i} / 360.0, 0.78, 0.48));
  vec3 colB = hsl2rgb(vec3(${r} / 360.0, 0.82, 0.58));
  vec3 color = mix(colA, colB, clamp(value + uCentroid * 0.35, 0.0, 1.0));
  color *= 0.55 + 0.95 * clamp(value + uRms * 0.8 + uCrest * 0.25, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
`.trim()}hashPrompt(e){let t=2166136261;for(let i=0;i<e.length;i++)t^=e.charCodeAt(i),t=Math.imul(t,16777619);return Math.abs(t>>>0)}static \u0275fac=function(t){return new(t||n)};static \u0275prov=yt({token:n,factory:n.\u0275fac,providedIn:"root"})};var ll=class n{audio=je(Do);canvas;scene;camera;renderer;material;mesh;drawingBufferSize=new Qe;clock=new Za;time=0;isPlaybackActive=!1;controls=$e({},ws);cappedPixelRatio=Math.min(window.devicePixelRatio||1,1.25);resizeHandler=null;init(e,t){this.canvas=e,this.scene=new $a,this.camera=new vs(-1,1,1,-1,0,1),this.renderer=new Gd({canvas:e,powerPreference:"high-performance"}),this.renderer.setPixelRatio(this.cappedPixelRatio),this.resizeRendererToCanvas();let i=new ms(2,2);this.material=new sn({vertexShader:t.vertex,fragmentShader:t.fragment,uniforms:t.uniforms}),this.mesh=new pn(i,this.material),this.scene.add(this.mesh),this.updateResolutionUniform(),this.resizeHandler=()=>{this.resizeRendererToCanvas(),this.updateResolutionUniform()},window.addEventListener("resize",this.resizeHandler)}setProgram(e){let t=new sn({vertexShader:e.vertex,fragmentShader:e.fragment,uniforms:e.uniforms});this.material&&this.material.dispose(),this.material=t,this.mesh.material=t,this.updateResolutionUniform()}setPlaybackActive(e){this.isPlaybackActive=e}setShaderControls(e){this.controls=$e({},e)}ngOnDestroy(){this.resizeHandler&&(window.removeEventListener("resize",this.resizeHandler),this.resizeHandler=null)}animate=()=>{requestAnimationFrame(this.animate),this.audio.update();let e=this.clock.getDelta(),t=this.controls;this.isPlaybackActive&&(this.time+=e*t.timeSpeed);let i=(s,o=1)=>Math.max(0,s*t.reactivity*o),r=this.material.uniforms;r.uTime&&(r.uTime.value=this.time),r.uEnergy&&(r.uEnergy.value=i(this.audio.energy(),t.energyGain)),r.uBass&&(r.uBass.value=i(this.audio.bass(),t.bassGain)),r.uLowMid&&(r.uLowMid.value=i(this.audio.lowMid(),t.midGain)),r.uMid&&(r.uMid.value=i(this.audio.mid(),t.midGain)),r.uPresence&&(r.uPresence.value=i(this.audio.presence(),t.trebleGain)),r.uTreble&&(r.uTreble.value=i(this.audio.treble(),t.trebleGain)),r.uHigh&&(r.uHigh.value=i(this.audio.treble(),t.trebleGain)),r.uRms&&(r.uRms.value=i(this.audio.rms(),t.energyGain)),r.uCentroid&&(r.uCentroid.value=i(this.audio.spectralCentroid(),t.fluxGain)),r.uFlux&&(r.uFlux.value=i(this.audio.spectralFlux(),t.fluxGain)),r.uZcr&&(r.uZcr.value=i(this.audio.zcr(),t.fluxGain)),r.uCrest&&(r.uCrest.value=i(this.audio.crest(),t.energyGain)),this.renderer.render(this.scene,this.camera)};resizeRendererToCanvas(){!this.renderer||!this.canvas||this.renderer.setSize(this.canvas.clientWidth,this.canvas.clientHeight,!1)}updateResolutionUniform(){!this.renderer||!this.material?.uniforms.uResolution||(this.renderer.getDrawingBufferSize(this.drawingBufferSize),this.material.uniforms.uResolution.value.set(this.drawingBufferSize.x,this.drawingBufferSize.y))}static \u0275fac=function(t){return new(t||n)};static \u0275prov=yt({token:n,factory:n.\u0275fac,providedIn:"root"})};var ZR=(n,e)=>e.id;function JR(n,e){n&1&&(kn(),Pe(0,"svg",10),Bn(1,"path",27),Fe())}function KR(n,e){n&1&&(kn(),Pe(0,"svg",10),Bn(1,"path",35),Fe())}function QR(n,e){n&1&&(kn(),Pe(0,"svg",10),Bn(1,"path",36),Fe())}function eN(n,e){if(n&1){let t=Hi();Pe(0,"div",8)(1,"button",33),Kt("click",function(){Ct(t);let r=Mn();return Tt(r.onTogglePlayback())}),_i(2,JR,2,0,":svg:svg",10)(3,KR,2,0,":svg:svg",10)(4,QR,2,0,":svg:svg",10),Fe(),Pe(5,"button",34),Kt("click",function(){Ct(t);let r=Mn();return Tt(r.onStop())}),kn(),Pe(6,"svg",10),Bn(7,"path",27),Fe()()()}if(n&2){let t=Mn();qe(),Vn("aria-label",t.isLiveSourceActive?"Stop live source":t.isPlaying?"Pause":"Play"),qe(),xi(t.isLiveSourceActive?2:t.isPlaying?3:4)}}function tN(n,e){if(n&1){let t=Hi();Pe(0,"button",37),Kt("click",function(){Ct(t);let r=Mn();return Tt(r.onStopLiveSource())}),nt(1," Stop live source "),Fe()}}function nN(n,e){n&1&&(kn(),Pe(0,"svg",10),Bn(1,"path",27),Fe())}function iN(n,e){n&1&&(kn(),Pe(0,"svg",10),Bn(1,"path",35),Fe())}function rN(n,e){n&1&&(kn(),Pe(0,"svg",10),Bn(1,"path",36),Fe())}function sN(n,e){if(n&1){let t=Hi();Pe(0,"button",38),Kt("click",function(){let r=Ct(t).$implicit,s=Mn();return Tt(s.onSelectPreset(r.id))}),nt(1),Fe()}if(n&2){let t=e.$implicit,i=Mn();ti("preset--active",i.selectedPresetId===t.id),qe(),cr(" ",t.label," ")}}var qd=class n{urlControl;isPlaying=!1;isLiveSourceActive=!1;activeSourceLabel="None";selectedTrackName=null;statusLabel="Waiting for track";isCollapsed=!1;selectedPresetId="";presets=[];fileSelected=new vt;useMicrophone=new vt;useSystemAudio=new vt;stopLiveSource=new vt;loadUrl=new vt;togglePlayback=new vt;stop=new vt;selectPreset=new vt;toggleController=new vt;onFileSelected(e){this.fileSelected.emit(e)}onLoadUrl(){this.loadUrl.emit()}onUseMicrophone(){this.useMicrophone.emit()}onUseSystemAudio(){this.useSystemAudio.emit()}onStopLiveSource(){this.stopLiveSource.emit()}onTogglePlayback(){this.togglePlayback.emit()}onStop(){this.stop.emit()}onSelectPreset(e){this.selectPreset.emit(e)}onToggleController(){this.toggleController.emit()}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=ei({type:n,selectors:[["app-audio-controller"]],inputs:{urlControl:"urlControl",isPlaying:"isPlaying",isLiveSourceActive:"isLiveSourceActive",activeSourceLabel:"activeSourceLabel",selectedTrackName:"selectedTrackName",statusLabel:"statusLabel",isCollapsed:"isCollapsed",selectedPresetId:"selectedPresetId",presets:"presets"},outputs:{fileSelected:"fileSelected",useMicrophone:"useMicrophone",useSystemAudio:"useSystemAudio",stopLiveSource:"stopLiveSource",loadUrl:"loadUrl",togglePlayback:"togglePlayback",stop:"stop",selectPreset:"selectPreset",toggleController:"toggleController"},decls:51,vars:11,consts:[["aria-label","Player controller",1,"controller"],[1,"controller__header"],["aria-live","polite",1,"display"],[1,"display__label"],[1,"display__marquee"],[1,"display__track"],[1,"display__text"],["aria-hidden","true",1,"display__text"],[1,"header-transport"],["type","button","aria-label","Toggle controller",1,"icon-button",3,"click"],["viewBox","0 0 24 24","aria-hidden","true"],["d","M4 14h16M4 10h16","fill","none","stroke","currentColor","stroke-width","2","stroke-linecap","round"],[1,"controller__body"],[1,"inputs"],[1,"row"],["for","track-file"],["id","track-file","type","file","accept","audio/*",3,"change"],[1,"source-actions"],["type","button",1,"pill",3,"click"],[1,"system-audio-wrap"],["type","button",1,"pill","system-audio-button",3,"click"],["role","note",1,"source-hint"],["type","button",1,"pill","pill--danger"],[1,"source-label"],[1,"transport"],["type","button",1,"transport__button",3,"click"],["type","button","aria-label","Stop",1,"transport__button",3,"click"],["d","M7 7h10v10H7z","fill","currentColor"],[1,"status"],["aria-label","Shader presets",1,"presets"],[1,"presets__label"],[1,"presets__list"],["type","button",1,"preset",3,"preset--active"],["type","button",1,"transport__button","transport__button--small",3,"click"],["type","button","aria-label","Stop",1,"transport__button","transport__button--small",3,"click"],["d","M6 5h4v14H6zM14 5h4v14h-4z","fill","currentColor"],["d","M7 5l12 7-12 7z","fill","currentColor"],["type","button",1,"pill","pill--danger",3,"click"],["type","button",1,"preset",3,"click"]],template:function(t,i){t&1&&(Pe(0,"section",0)(1,"header",1)(2,"div",2)(3,"span",3),nt(4,"Now playing"),Fe(),Pe(5,"div",4)(6,"div",5)(7,"span",6),nt(8),Fe(),Pe(9,"span",7),nt(10),Fe()()()(),_i(11,eN,8,2,"div",8),Pe(12,"button",9),Kt("click",function(){return i.onToggleController()}),kn(),Pe(13,"svg",10),Bn(14,"path",11),Fe()()(),Xo(),Pe(15,"div",12)(16,"div",13)(17,"div",14)(18,"label",15),nt(19,"Local track"),Fe(),Pe(20,"input",16),Kt("change",function(s){return i.onFileSelected(s)}),Fe()(),Pe(21,"div",14)(22,"label"),nt(23,"Live input"),Fe(),Pe(24,"div",17)(25,"button",18),Kt("click",function(){return i.onUseMicrophone()}),nt(26," Use microphone "),Fe(),Pe(27,"div",19)(28,"button",20),Kt("click",function(){return i.onUseSystemAudio()}),nt(29," Use system/browser audio "),Fe(),Pe(30,"div",21),nt(31,' Enable "Share system audio" in the browser share dialog. '),Fe()(),_i(32,tN,2,0,"button",22),Fe(),Pe(33,"div",23),nt(34),Fe()()(),Pe(35,"div",24)(36,"button",25),Kt("click",function(){return i.onTogglePlayback()}),_i(37,nN,2,0,":svg:svg",10)(38,iN,2,0,":svg:svg",10)(39,rN,2,0,":svg:svg",10),Fe(),Pe(40,"button",26),Kt("click",function(){return i.onStop()}),kn(),Pe(41,"svg",10),Bn(42,"path",27),Fe()(),Xo(),Pe(43,"div",28),nt(44),Fe()(),Pe(45,"div",29)(46,"label",30),nt(47,"Shader presets"),Fe(),Pe(48,"div",31),ha(49,sN,2,3,"button",32,ZR),Fe()()()()),t&2&&(ti("controller--collapsed",i.isCollapsed),qe(8),cr(" ",i.selectedTrackName??"No track loaded"," - "),qe(2),cr(" ",i.selectedTrackName??"No track loaded"," - "),qe(),xi(i.isCollapsed?11:-1),qe(),Vn("aria-expanded",!i.isCollapsed),qe(20),xi(i.isLiveSourceActive?32:-1),qe(2),cr("Source: ",i.activeSourceLabel),qe(2),Vn("aria-label",i.isLiveSourceActive?"Stop live source":i.isPlaying?"Pause":"Play"),qe(),xi(i.isLiveSourceActive?37:i.isPlaying?38:39),qe(7),zn(i.statusLabel),qe(5),pa(i.presets))},dependencies:[eu],styles:[".controller[_ngcontent-%COMP%]{position:absolute;left:50%;bottom:1.5rem;transform:translate(-50%);width:min(42rem,calc(100vw - 2rem));color:#f7f2ff;border-radius:1.2rem;border:1px solid rgba(255,255,255,.15);background:linear-gradient(145deg,#0a0c19f2,#101224e6);box-shadow:0 20px 60px #03060fa6;-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px)}.controller__header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.9rem 1.2rem;border-bottom:1px solid rgba(255,255,255,.08);min-width:0}.controller__body[_ngcontent-%COMP%]{display:grid;gap:1.25rem;padding:1.2rem 1.4rem 1.4rem}.controller--collapsed[_ngcontent-%COMP%]   .controller__body[_ngcontent-%COMP%]{display:none}.display[_ngcontent-%COMP%]{display:grid;gap:.3rem;background:#00000073;border-radius:.8rem;padding:.6rem .9rem;border:1px solid rgba(255,255,255,.08);min-width:0;flex:1 1 auto;overflow:hidden}.display__label[_ngcontent-%COMP%]{font-size:.7rem;text-transform:uppercase;letter-spacing:.12em;color:#fff9}.display__marquee[_ngcontent-%COMP%]{overflow:hidden;white-space:nowrap;-webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 8%,#000 92%,transparent 100%);mask-image:linear-gradient(90deg,transparent 0%,#000 8%,#000 92%,transparent 100%);width:100%}.display__track[_ngcontent-%COMP%]{display:inline-flex;width:max-content;animation:_ngcontent-%COMP%_marquee 12s linear infinite;will-change:transform;transform:translateZ(0)}.display__text[_ngcontent-%COMP%]{flex:0 0 auto;padding-right:1.5rem}@keyframes _ngcontent-%COMP%_marquee{0%{transform:translate(0)}to{transform:translate(-50%)}}.icon-button[_ngcontent-%COMP%]{display:inline-flex;justify-content:center;width:2.4rem;height:2.4rem;border-radius:50%;border:1px solid rgba(255,255,255,.15);background:#ffffff0d;color:#f7f2ff;cursor:pointer}button[_ngcontent-%COMP%]{transition:background-color .16s ease,color .16s ease,border-color .16s ease,box-shadow .16s ease,filter .16s ease}.header-transport[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:.5rem}.inputs[_ngcontent-%COMP%]{display:grid;gap:.8rem}.row[_ngcontent-%COMP%]{display:grid;gap:.4rem}.row--inline[_ngcontent-%COMP%]{grid-template-columns:minmax(0,1fr) auto;align-items:end}label[_ngcontent-%COMP%]{font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;color:#fff9}input[type=file][_ngcontent-%COMP%], input[type=url][_ngcontent-%COMP%]{padding:.55rem .7rem;border-radius:.6rem;border:1px solid rgba(255,255,255,.18);background:#00000059;color:inherit}input[type=file][_ngcontent-%COMP%]::file-selector-button{margin-right:.6rem;padding:.35rem .7rem;border-radius:999px;border:none;background:#f6b1ff;color:#1b0d1f;font-weight:600;cursor:pointer}.pill[_ngcontent-%COMP%]{align-self:stretch;padding:.55rem 1rem;border-radius:999px;border:none;background:#6cc9ff;color:#08111a;font-weight:600;cursor:pointer}.pill--danger[_ngcontent-%COMP%]{background:#ff8f8f;color:#210b0b}.source-actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:.5rem;align-items:flex-start}.system-audio-wrap[_ngcontent-%COMP%]{position:relative;display:inline-flex}.source-hint[_ngcontent-%COMP%]{position:absolute;left:0;top:calc(100% + .45rem);z-index:3;width:16.5rem;display:none;padding:.45rem .55rem;border-radius:.45rem;border:1px solid rgba(255,255,255,.2);background:#090c18f2;font-size:.75rem;color:#ffffff9e}.system-audio-wrap[_ngcontent-%COMP%]:hover   .source-hint[_ngcontent-%COMP%], .system-audio-button[_ngcontent-%COMP%]:focus-visible + .source-hint[_ngcontent-%COMP%]{display:block}.source-label[_ngcontent-%COMP%]{font-size:.8rem;color:#ffffffb8}.transport[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem;padding:.6rem .9rem;border-radius:.9rem;background:#00000059;border:1px solid rgba(255,255,255,.08)}.transport__button[_ngcontent-%COMP%]{width:2.6rem;height:2.6rem;border-radius:.8rem;border:none;background:linear-gradient(135deg,#f4d77c,#f38ec8);color:#120c1a;cursor:pointer;display:inline-flex;align-items:center;justify-content:center}.transport__button--small[_ngcontent-%COMP%]{width:2.1rem;height:2.1rem;border-radius:.65rem}.transport__button[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{width:1.2rem;height:1.2rem}.status[_ngcontent-%COMP%]{margin-left:auto;font-size:.85rem;color:#ffffffb3}.presets[_ngcontent-%COMP%]{display:grid;gap:.5rem}.presets__label[_ngcontent-%COMP%]{display:block}.presets__list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:.6rem}.preset[_ngcontent-%COMP%]{padding:.5rem .9rem;border-radius:999px;border:1px solid rgba(255,255,255,.15);background:#ffffff0a;color:#fffc;cursor:pointer}.preset--active[_ngcontent-%COMP%]{background:#9bffe4;color:#102018;border-color:transparent;font-weight:600}button[_ngcontent-%COMP%]:focus-visible, input[_ngcontent-%COMP%]:focus-visible{outline:2px solid #f9f871;outline-offset:2px}@media(hover:hover)and (pointer:fine){button[_ngcontent-%COMP%]:hover{filter:brightness(1.06)}.icon-button[_ngcontent-%COMP%]:hover{background:#ffffff24;border-color:#ffffff59}.pill[_ngcontent-%COMP%]:hover{background:#8cd8ff;color:#06121d}.pill--danger[_ngcontent-%COMP%]:hover{background:#f77;color:#260909}.transport__button[_ngcontent-%COMP%]:hover{background:linear-gradient(135deg,#ffe38f,#ff9dd2);color:#100919}.preset[_ngcontent-%COMP%]:hover{background:#9bffe42e;border-color:#9bffe480;color:#d9fff4}}@media(max-width:720px){.controller[_ngcontent-%COMP%]{bottom:1rem}.row--inline[_ngcontent-%COMP%]{grid-template-columns:1fr}.transport[_ngcontent-%COMP%]{flex-wrap:wrap}}"]})};var oN=(n,e)=>e.key;function aN(n,e){if(n&1){let t=Hi();Pe(0,"label",9)(1,"span",10),nt(2),Fe(),Pe(3,"span",11),nt(4),Fe()(),Pe(5,"input",12),Kt("input",function(r){let s=Ct(t).$implicit,o=Mn();return Tt(o.onSliderInput(s.key,r))}),Fe()}if(n&2){let t=e.$implicit,i=Mn();Vn("for","shader-slider-"+t.key),qe(2),zn(t.label),qe(2),zn(i.formatValue(i.readValue(t.key))),qe(),Uc("id","shader-slider-"+t.key)("min",t.min)("max",t.max)("step",t.step)("value",i.readValue(t.key))}}var Xd=class n{controls;controlsChange=new vt;isMinimized=!0;sliderConfigs=[{key:"timeSpeed",label:"Time speed",min:.1,max:3,step:.05},{key:"reactivity",label:"Global reactivity",min:0,max:3,step:.05},{key:"energyGain",label:"Energy gain",min:0,max:3,step:.05},{key:"bassGain",label:"Bass gain",min:0,max:3,step:.05},{key:"midGain",label:"Mid gain",min:0,max:3,step:.05},{key:"trebleGain",label:"Treble gain",min:0,max:3,step:.05},{key:"fluxGain",label:"Detail gain",min:0,max:3,step:.05}];toggleMinimized(){this.isMinimized=!this.isMinimized}onReset(){this.controlsChange.emit($e({},ws))}onSliderInput(e,t){if(!this.controls)return;let i=t.target;if(!i)return;let r=this.sliderConfigs.find(l=>l.key===e);if(!r)return;let s=Number(i.value);if(Number.isNaN(s))return;let o=this.clamp(s,r.min,r.max),a=St($e({},this.controls),{[e]:o});this.controlsChange.emit(a)}readValue(e){return this.controls?.[e]??ws[e]}formatValue(e){return e.toFixed(2)}clamp(e,t,i){return Math.min(i,Math.max(t,e))}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=ei({type:n,selectors:[["app-shader-control-panel"]],inputs:{controls:"controls"},outputs:{controlsChange:"controlsChange"},decls:16,vars:5,consts:[["aria-label","Shader controls",1,"control-panel"],[1,"control-panel__header"],[1,"control-panel__actions"],["type","button",1,"control-panel__reset",3,"click"],[1,"control-panel__toggle-wrap"],["type","button",1,"control-panel__toggle",3,"click"],["aria-hidden","true"],["role","note",1,"control-panel__hint"],[1,"control-panel__body"],[1,"slider"],[1,"slider__name"],[1,"slider__value"],["type","range",3,"input","id","min","max","step","value"]],template:function(t,i){t&1&&(Pe(0,"section",0)(1,"header",1)(2,"h2"),nt(3,"Shader Controls"),Fe(),Pe(4,"div",2)(5,"button",3),Kt("click",function(){return i.onReset()}),nt(6," Reset "),Fe(),Pe(7,"div",4)(8,"button",5),Kt("click",function(){return i.toggleMinimized()}),Pe(9,"span",6),nt(10),Fe()(),Pe(11,"div",7),nt(12,"Show shader control panel"),Fe()()()(),Pe(13,"div",8),ha(14,aN,6,8,null,null,oN),Fe()()),t&2&&(ti("control-panel--minimized",i.isMinimized),qe(8),Vn("aria-label",i.isMinimized?"Expand shader controls":"Minimize shader controls")("aria-expanded",!i.isMinimized),qe(2),zn(i.isMinimized?"+":"-"),qe(4),pa(i.sliderConfigs))},styles:[".control-panel[_ngcontent-%COMP%]{position:absolute;top:1rem;left:1rem;width:min(20rem,calc(100vw - 2rem));max-width:calc(100vw - 2rem);padding:.9rem;overflow:hidden;border-radius:1rem;border:1px solid rgba(255,255,255,.2);color:#f7f2ff;background:linear-gradient(148deg,#0f1527eb,#0b1d2fdb);box-shadow:0 12px 30px #02060e8c;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}.control-panel--minimized[_ngcontent-%COMP%]{width:2.5rem;height:2.5rem;padding:0;overflow:visible;border-radius:999px;display:grid;place-items:center}.control-panel__header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:.65rem;margin-bottom:.7rem}.control-panel__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0;font-size:.82rem;letter-spacing:.1em;text-transform:uppercase}.control-panel__actions[_ngcontent-%COMP%]{margin-left:auto;display:inline-flex;align-items:center;gap:.4rem}.control-panel__toggle-wrap[_ngcontent-%COMP%]{position:relative;display:inline-flex}.control-panel__reset[_ngcontent-%COMP%], .control-panel__toggle[_ngcontent-%COMP%]{border:1px solid rgba(255,255,255,.24);color:inherit;background:#ffffff14;cursor:pointer;font:inherit}.control-panel__reset[_ngcontent-%COMP%]{border-radius:999px;padding:.3rem .65rem;font-size:.7rem;letter-spacing:.08em;text-transform:uppercase}.control-panel__toggle[_ngcontent-%COMP%]{width:1.85rem;height:1.85rem;border-radius:999px;display:inline-grid;place-items:center;line-height:1}.control-panel__toggle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:1rem;font-weight:700}.control-panel__hint[_ngcontent-%COMP%]{position:absolute;left:calc(100% + .45rem);top:50%;transform:translateY(-50%);z-index:3;display:none;width:max-content;padding:.45rem .55rem;border-radius:.45rem;border:1px solid rgba(255,255,255,.2);background:#090c18f2;font-size:.75rem;color:#ffffff9e}.control-panel__body[_ngcontent-%COMP%]{display:grid;gap:.35rem}.slider[_ngcontent-%COMP%]{display:flex;align-items:baseline;justify-content:space-between;gap:.8rem;font-size:.76rem}.slider__name[_ngcontent-%COMP%]{letter-spacing:.06em;text-transform:uppercase;color:#ffffffb8}.slider__value[_ngcontent-%COMP%]{font-variant-numeric:tabular-nums;color:#ffffffe6}input[type=range][_ngcontent-%COMP%]{width:100%;accent-color:#7fffd2}.control-panel--minimized[_ngcontent-%COMP%]   .control-panel__header[_ngcontent-%COMP%]{margin:0;width:100%;justify-content:center}.control-panel--minimized[_ngcontent-%COMP%]   .control-panel__actions[_ngcontent-%COMP%], .control-panel--minimized[_ngcontent-%COMP%]   .control-panel__toggle[_ngcontent-%COMP%]{margin:0}.control-panel--minimized[_ngcontent-%COMP%]   .control-panel__toggle-wrap[_ngcontent-%COMP%]:hover   .control-panel__hint[_ngcontent-%COMP%], .control-panel--minimized[_ngcontent-%COMP%]   .control-panel__toggle[_ngcontent-%COMP%]:focus-visible + .control-panel__hint[_ngcontent-%COMP%]{display:block}.control-panel--minimized[_ngcontent-%COMP%]   .control-panel__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .control-panel--minimized[_ngcontent-%COMP%]   .control-panel__reset[_ngcontent-%COMP%], .control-panel--minimized[_ngcontent-%COMP%]   .control-panel__body[_ngcontent-%COMP%]{display:none}button[_ngcontent-%COMP%]:focus-visible, input[_ngcontent-%COMP%]:focus-visible{outline:2px solid #f9f871;outline-offset:2px}@media(max-width:720px){.control-panel[_ngcontent-%COMP%]{top:5.6rem;left:.75rem;right:.75rem;width:auto}}"]})};function lN(n,e){n&1&&(Nt(0,"p",8),nt(1,"Generated shader active"),Gt())}function cN(n,e){if(n&1&&(Nt(0,"p",11),nt(1),Gt()),n&2){let t=Mn();qe(),zn(t.errorMessage)}}function uN(n,e){n&1&&(Bi(0,"span",13),Nt(1,"span"),nt(2,"Generating..."),Gt())}function dN(n,e){n&1&&(Nt(0,"span"),nt(1,"Generate"),Gt())}var Yd=class n{promptControl;generationStatus="Idle";errorMessage=null;disabled=!1;isLoading=!1;generatedActive=!1;isMinimized=!0;generate=new vt;ngOnChanges(e){this.promptControl&&(e.promptControl||e.disabled)&&(this.disabled&&this.promptControl.enabled?this.promptControl.disable({emitEvent:!1}):!this.disabled&&this.promptControl.disabled&&this.promptControl.enable({emitEvent:!1}))}onGenerate(){this.generate.emit()}isGenerateDisabled(){return this.disabled||this.isLoading||!this.promptControl.value.trim()}toggleMinimized(){this.isMinimized=!this.isMinimized}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=ei({type:n,selectors:[["app-shader-prompter"]],inputs:{promptControl:"promptControl",generationStatus:"generationStatus",errorMessage:"errorMessage",disabled:"disabled",isLoading:"isLoading",generatedActive:"generatedActive"},outputs:{generate:"generate"},features:[aa],decls:21,vars:11,consts:[["aria-label","Shader prompt",1,"prompter"],[1,"prompter__header"],[1,"prompter__status"],[1,"prompter__minimize-wrap"],["type","button",1,"prompter__minimize",3,"click"],["aria-hidden","true"],["role","note",1,"prompter__hint"],[1,"prompter__body"],["role","status",1,"prompter__active"],["for","shader-prompt"],["id","shader-prompt","rows","4","placeholder","Describe the shader style, motion and audio reaction...",3,"formControl"],["role","status",1,"prompter__error"],["type","button",1,"generate",3,"click","disabled"],["aria-hidden","true",1,"generate__spinner"]],template:function(t,i){t&1&&(Nt(0,"section",0)(1,"header",1)(2,"h2"),nt(3,"Shader Prompter"),Gt(),Nt(4,"span",2),nt(5),Gt(),Nt(6,"div",3)(7,"button",4),Hn("click",function(){return i.toggleMinimized()}),Nt(8,"span",5),nt(9),Gt()(),Nt(10,"div",6),nt(11,"Show shader prompter"),Gt()()(),Nt(12,"div",7),_i(13,lN,2,0,"p",8),Nt(14,"label",9),nt(15,"Prompt"),Gt(),Bi(16,"textarea",10),_i(17,cN,2,1,"p",11),Nt(18,"button",12),Hn("click",function(){return i.onGenerate()}),_i(19,uN,3,0)(20,dN,2,0,"span"),Gt()()()),t&2&&(ti("prompter--minimized",i.isMinimized),qe(5),zn(i.generationStatus),qe(2),Vn("aria-label",i.isMinimized?"Expand shader prompter":"Minimize shader prompter")("aria-expanded",!i.isMinimized),qe(2),zn(i.isMinimized?"+":"-"),qe(4),xi(i.generatedActive?13:-1),qe(3),Vi("formControl",i.promptControl),qe(),xi(i.errorMessage?17:-1),qe(),Vi("disabled",i.isGenerateDisabled()),qe(),xi(i.isLoading?19:20))},dependencies:[eu,Kc,j0,am],styles:[".prompter[_ngcontent-%COMP%]{position:absolute;top:1rem;right:1rem;width:min(24rem,calc(100vw - 2rem));max-width:calc(100vw - 2rem);padding:.9rem;overflow:hidden;border-radius:1rem;border:1px solid rgba(255,255,255,.2);color:#f7f2ff;background:linear-gradient(140deg,#0c1123eb,#0e182bdb);box-shadow:0 12px 32px #02060e8c;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}.prompter--minimized[_ngcontent-%COMP%]{width:2.5rem;height:2.5rem;left:auto;padding:0;overflow:visible;border-radius:999px;display:grid;place-items:center}.prompter__header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:.75rem;margin-bottom:.6rem}.prompter__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0;font-size:.85rem;letter-spacing:.1em;text-transform:uppercase}.prompter__status[_ngcontent-%COMP%]{font-size:.75rem;color:#ffffffb3}.prompter__minimize-wrap[_ngcontent-%COMP%]{position:relative;margin-left:auto;display:inline-flex}.prompter__minimize[_ngcontent-%COMP%]{width:1.9rem;height:1.9rem;border:1px solid rgba(255,255,255,.26);border-radius:999px;display:inline-grid;place-items:center;background:#ffffff14;color:inherit;cursor:pointer;font:inherit;line-height:1}.prompter__minimize[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:1rem;font-weight:700}.prompter__hint[_ngcontent-%COMP%]{position:absolute;right:calc(100% + .45rem);top:50%;transform:translateY(-50%);z-index:3;display:none;width:max-content;padding:.45rem .55rem;border-radius:.45rem;border:1px solid rgba(255,255,255,.2);background:#090c18f2;font-size:.75rem;color:#ffffff9e}.prompter__body[_ngcontent-%COMP%]{display:grid;gap:.45rem}label[_ngcontent-%COMP%]{font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:#ffffffad}textarea[_ngcontent-%COMP%]{width:100%;max-width:100%;box-sizing:border-box;resize:both;border-radius:.65rem;border:1px solid rgba(255,255,255,.2);background:#00000059;color:inherit;font:inherit;padding:.6rem .7rem}.prompter--minimized[_ngcontent-%COMP%]   .prompter__header[_ngcontent-%COMP%]{margin:0;width:100%;justify-content:center}.prompter--minimized[_ngcontent-%COMP%]   .prompter__minimize[_ngcontent-%COMP%], .prompter--minimized[_ngcontent-%COMP%]   .prompter__minimize-wrap[_ngcontent-%COMP%]{margin:0}.prompter--minimized[_ngcontent-%COMP%]   .prompter__minimize-wrap[_ngcontent-%COMP%]:hover   .prompter__hint[_ngcontent-%COMP%], .prompter--minimized[_ngcontent-%COMP%]   .prompter__minimize[_ngcontent-%COMP%]:focus-visible + .prompter__hint[_ngcontent-%COMP%]{display:block}.prompter--minimized[_ngcontent-%COMP%]   .prompter__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .prompter--minimized[_ngcontent-%COMP%]   .prompter__status[_ngcontent-%COMP%], .prompter--minimized[_ngcontent-%COMP%]   .prompter__body[_ngcontent-%COMP%]{display:none}.generate[_ngcontent-%COMP%]{justify-self:end;display:inline-flex;align-items:center;gap:.45rem;border:none;border-radius:999px;padding:.5rem 1rem;font-weight:600;cursor:pointer;background:linear-gradient(135deg,#7df7d7,#7bc9ff);color:#071521}.prompter__active[_ngcontent-%COMP%]{margin:0;font-size:.75rem;color:#b6ffd8;background:#54e1a829;border:1px solid rgba(131,255,195,.45);border-radius:999px;padding:.25rem .55rem;width:fit-content}.generate__spinner[_ngcontent-%COMP%]{width:.9rem;height:.9rem;border:2px solid rgba(7,21,33,.25);border-top-color:#071521;border-radius:50%;animation:_ngcontent-%COMP%_spin .8s linear infinite}.generate[_ngcontent-%COMP%]:disabled{cursor:not-allowed;opacity:.75}.prompter__error[_ngcontent-%COMP%]{margin:0;font-size:.8rem;line-height:1.35;color:#ffb7b7}@keyframes _ngcontent-%COMP%_spin{to{transform:rotate(360deg)}}button[_ngcontent-%COMP%]:focus-visible, textarea[_ngcontent-%COMP%]:focus-visible{outline:2px solid #f9f871;outline-offset:2px}@media(max-width:720px){.prompter[_ngcontent-%COMP%]{top:.75rem;right:.75rem;left:.75rem;width:auto}}"]})};var fN=["canvas"],hN=["audio"],Zd=class n{canvas;audioElement;three=je(ll);audio=je(Do);shaderGeneration=je($d);urlControl=new om("",{nonNullable:!0});isPlaying=At(!1);selectedTrackName=At(null);shaderLoadError=At(null);isControllerCollapsed=At(!1);selectedPresetId=At("smooth");promptControl=new om("",{nonNullable:!0});promptStatus=At("Prompt idle");isPromptGenerating=At(!1);promptError=At(null);isGeneratedShaderActive=At(!1);shaderControls=At($e({},ws));statusLabel=kt(()=>{if(this.shaderLoadError())return"Shader load error";let e=this.audio.status(),t=this.audio.activeSource();return e==="error"?"Audio error":e==="running"&&t==="microphone"?"Microphone active":e==="running"&&t==="system"?"System audio active":e==="running"?"Audio ready":"Waiting for track"});isLiveSourceActive=kt(()=>{let e=this.audio.activeSource();return e==="microphone"||e==="system"});activeSourceLabel=kt(()=>{let e=this.audio.activeSource();return e==="microphone"?"Microphone":e==="system"?"System audio":e==="file"?"File":"None"});audioObjectUrl=null;vertexShaderSource=null;presets=[{id:"smooth",label:"Smooth",fragmentPath:"shaders/smooth.glsl"},{id:"nebula-drift",label:"Nebula Drift",fragmentPath:"shaders/fragment.glsl"},{id:"nebula",label:"Nebula",fragmentPath:"shaders/nebula.glsl"},{id:"aurora",label:"Aurora Flux",fragmentPath:"shaders/fragment-aurora.glsl"},{id:"ion",label:"Ion Bloom",fragmentPath:"shaders/fragment-ion.glsl"},{id:"vortex",label:"Vortex",fragmentPath:"shaders/vortex.glsl"},{id:"soft",label:"Soft",fragmentPath:"shaders/soft.glsl"}];presetOptions=this.presets.map(e=>({id:e.id,label:e.label}));async ngAfterViewInit(){try{this.vertexShaderSource=await this.loadShader("shaders/vertex.glsl");let e=await this.loadPresetFragment(this.selectedPresetId());this.three.init(this.canvas.nativeElement,this.buildProgram(e)),this.three.setShaderControls(this.shaderControls()),this.three.animate()}catch(e){this.shaderLoadError.set("Failed to load shaders"),console.error(e)}}ngOnDestroy(){this.audioObjectUrl&&URL.revokeObjectURL(this.audioObjectUrl),this.audio.stopLiveInput()}async onFileSelected(e){let i=e.target?.files?.[0];i&&(this.audioObjectUrl&&URL.revokeObjectURL(this.audioObjectUrl),this.audioObjectUrl=URL.createObjectURL(i),this.selectedTrackName.set(i.name),await this.setAudioSource(this.audioObjectUrl))}async onLoadUrl(){let e=this.urlControl.value.trim();e&&(this.audioObjectUrl&&(URL.revokeObjectURL(this.audioObjectUrl),this.audioObjectUrl=null),this.selectedTrackName.set(e),await this.setAudioSource(e))}async onTogglePlayback(){if(this.isLiveSourceActive()){this.onStopLiveSource();return}let e=this.audioElement?.nativeElement;if(e?.src){if(e.paused){try{await e.play()}catch(t){console.error(t)}return}e.pause()}}async onStop(){if(this.isLiveSourceActive()){this.onStopLiveSource();return}let e=this.audioElement?.nativeElement;e?.src&&(e.pause(),e.currentTime=0,this.three.setPlaybackActive(!1))}async onUseMicrophone(){this.stopAudioElementPlayback(),await this.audio.initMicrophone(),this.audio.status()==="running"&&(this.selectedTrackName.set("Microphone input"),this.isPlaying.set(!0),this.three.setPlaybackActive(!0))}async onUseSystemAudio(){this.stopAudioElementPlayback(),await this.audio.initSystemAudio(),this.audio.status()==="running"&&(this.selectedTrackName.set("System audio input"),this.isPlaying.set(!0),this.three.setPlaybackActive(!0))}onStopLiveSource(){this.audio.stopLiveInput(),this.selectedTrackName.set(null),this.isPlaying.set(!1),this.three.setPlaybackActive(!1)}async onSelectPreset(e){if(!(e===this.selectedPresetId()&&!this.isGeneratedShaderActive())){this.selectedPresetId.set(e);try{let t=await this.loadPresetFragment(e);this.three.setProgram(this.buildProgram(t)),this.isGeneratedShaderActive.set(!1),this.promptStatus.set(`Preset applied: ${e}`),this.promptError.set(null)}catch(t){this.shaderLoadError.set("Failed to load shader preset"),console.error(t)}}}toggleController(){this.isControllerCollapsed.update(e=>!e)}async onGeneratePrompt(){let e=this.promptControl.value.trim();if(!e){this.promptStatus.set("Prompt is empty"),this.promptError.set("Enter a prompt before starting generation.");return}if(!this.vertexShaderSource){this.promptStatus.set("Shader engine unavailable"),this.promptError.set("Missing vertex shader. Refresh the page and try again.");return}this.promptError.set(null),this.isPromptGenerating.set(!0),this.promptStatus.set("Generating shader...");try{let t=await this.shaderGeneration.generateFragment(e);if(t.source==="fallback")throw new ui("API","Remote shader generator unavailable.");let i=this.shaderGeneration.validateProgram(this.vertexShaderSource,t.fragment);if(i.length)throw new ui("COMPILATION","Generated shader failed compilation.",[...i]);this.three.setProgram(this.buildProgram(t.fragment)),this.isGeneratedShaderActive.set(!0),this.promptStatus.set("Generated and applied")}catch(t){t instanceof ui?(this.promptStatus.set("Generation failed"),this.promptError.set(this.mapGenerationError(t))):(this.promptStatus.set("Generation failed"),this.promptError.set("Unexpected shader generation error.")),await this.applySmoothPresetFallback(),console.error(t)}finally{this.isPromptGenerating.set(!1)}}onAudioPlay(){this.audio.activeSource()==="file"&&(this.isPlaying.set(!0),this.three.setPlaybackActive(!0))}onAudioPause(){this.audio.activeSource()==="file"&&(this.isPlaying.set(!1),this.three.setPlaybackActive(!1))}onShaderControlsChange(e){this.shaderControls.set(e),this.three.setShaderControls(e)}async setAudioSource(e){let t=this.audioElement.nativeElement;t.src=e,t.load(),await this.audio.initFromAudioElement(t);try{await t.play()}catch(i){console.error(i)}}async loadPresetFragment(e){let t=this.presets.find(i=>i.id===e);if(!t)throw new Error(`Unknown preset: ${e}`);return this.loadShader(t.fragmentPath)}buildProgram(e){if(!this.vertexShaderSource)throw new Error("Vertex shader not loaded");return{vertex:this.vertexShaderSource,fragment:e,uniforms:{uTime:{value:0},uResolution:{value:new Qe(1,1)},uEnergy:{value:0},uBass:{value:0},uLowMid:{value:0},uMid:{value:0},uPresence:{value:0},uTreble:{value:0},uHigh:{value:0},uRms:{value:0},uCentroid:{value:0},uFlux:{value:0},uZcr:{value:0},uCrest:{value:0}}}}stopAudioElementPlayback(){let e=this.audioElement?.nativeElement;e&&(e.pause(),e.currentTime=0)}async loadShader(e){let t=`${e}?v=${Date.now()}`,i=await fetch(t);if(!i.ok)throw new Error(`Shader load failed: ${i.status} (${i.url})`);let r=await i.text(),s=i.headers.get("content-type")??"unknown";if(s.includes("text/html")||r.includes("<!doctype html"))throw console.error("Shader fetch returned HTML",{url:i.url,status:i.status,contentType:s,preview:r.slice(0,200)}),new Error(`Shader load returned HTML (${i.url})`);return r}async applySmoothPresetFallback(){try{let e=await this.loadPresetFragment("smooth");this.selectedPresetId.set("smooth"),this.three.setProgram(this.buildProgram(e)),this.isGeneratedShaderActive.set(!1),this.promptStatus.set("Generation failed - smooth preset applied")}catch(e){this.promptStatus.set("Generation failed"),this.promptError.set("Failed to load smooth fallback."),console.error(e)}}mapGenerationError(e){return e.code==="COMPILATION"&&e.details.length?`GLSL compilation error: ${e.details[0]}`:e.code==="API"&&e.details.length?`API error: ${e.details[0]}`:e.code==="INVALID_RESPONSE"?"API returned an invalid shader.":e.code==="EMPTY_PROMPT"?"Prompt cannot be empty.":e.message}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=ei({type:n,selectors:[["app-visualizer"]],viewQuery:function(t,i){if(t&1&&Vc(fN,7)(hN,7),t&2){let r;Bc(r=Hc())&&(i.canvas=r.first),Bc(r=Hc())&&(i.audioElement=r.first)}},features:[to([ll])],decls:8,vars:16,consts:[["canvas",""],["audio",""],[1,"visualizer"],["aria-label","Audio visualizer"],[3,"generate","promptControl","generationStatus","errorMessage","disabled","isLoading","generatedActive"],[3,"controlsChange","controls"],[3,"fileSelected","useMicrophone","useSystemAudio","stopLiveSource","loadUrl","togglePlayback","stop","selectPreset","toggleController","urlControl","isPlaying","isLiveSourceActive","activeSourceLabel","selectedTrackName","statusLabel","isCollapsed","selectedPresetId","presets"],["crossorigin","anonymous","preload","metadata",3,"play","pause"]],template:function(t,i){if(t&1){let r=Hi();Nt(0,"div",2),Bi(1,"canvas",3,0),Nt(3,"app-shader-prompter",4),Hn("generate",function(){return Ct(r),Tt(i.onGeneratePrompt())}),Gt(),Nt(4,"app-shader-control-panel",5),Hn("controlsChange",function(o){return Ct(r),Tt(i.onShaderControlsChange(o))}),Gt(),Nt(5,"app-audio-controller",6),Hn("fileSelected",function(o){return Ct(r),Tt(i.onFileSelected(o))})("useMicrophone",function(){return Ct(r),Tt(i.onUseMicrophone())})("useSystemAudio",function(){return Ct(r),Tt(i.onUseSystemAudio())})("stopLiveSource",function(){return Ct(r),Tt(i.onStopLiveSource())})("loadUrl",function(){return Ct(r),Tt(i.onLoadUrl())})("togglePlayback",function(){return Ct(r),Tt(i.onTogglePlayback())})("stop",function(){return Ct(r),Tt(i.onStop())})("selectPreset",function(o){return Ct(r),Tt(i.onSelectPreset(o))})("toggleController",function(){return Ct(r),Tt(i.toggleController())}),Gt(),Nt(6,"audio",7,1),Hn("play",function(){return Ct(r),Tt(i.onAudioPlay())})("pause",function(){return Ct(r),Tt(i.onAudioPause())}),Gt()()}t&2&&(qe(3),Vi("promptControl",i.promptControl)("generationStatus",i.promptStatus())("errorMessage",i.promptError())("disabled",i.isPromptGenerating())("isLoading",i.isPromptGenerating())("generatedActive",i.isGeneratedShaderActive()),qe(),Vi("controls",i.shaderControls()),qe(),Vi("urlControl",i.urlControl)("isPlaying",i.isPlaying())("isLiveSourceActive",i.isLiveSourceActive())("activeSourceLabel",i.activeSourceLabel())("selectedTrackName",i.selectedTrackName())("statusLabel",i.statusLabel())("isCollapsed",i.isControllerCollapsed())("selectedPresetId",i.selectedPresetId())("presets",i.presetOptions))},dependencies:[qd,Yd,Xd],styles:[".visualizer[_ngcontent-%COMP%]{position:relative;width:100vw;height:100vh;overflow:hidden;background:radial-gradient(circle at 20% 20%,#181a33,#05060d 70%);font-family:Space Grotesk,system-ui,sans-serif}canvas[_ngcontent-%COMP%]{width:100%;height:100%;display:block}audio[_ngcontent-%COMP%]{display:none}"],changeDetection:0})};var Jd=class n{title=At("ai-audiovisual-engine");static \u0275fac=function(t){return new(t||n)};static \u0275cmp=ei({type:n,selectors:[["app-root"]],decls:1,vars:0,template:function(t,i){t&1&&Bi(0,"app-visualizer")},dependencies:[Zd],encapsulation:2})};Qp(Jd,T0).catch(n=>console.error(n));
