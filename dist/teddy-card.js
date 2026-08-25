/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let n=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=o.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o.set(i,t))}return t}toString(){return this.cssText}};const s=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new n(o,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,p=globalThis,g=p.trustedTypes,_=g?g.emptyScript:"",f=p.reactiveElementPolyfillSupport,m=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!a(t,e),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&l(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const s=o?.call(this);n?.call(this,e),this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,o)=>{if(e)i.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,i.appendChild(o)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=o;const s=n.fromAttribute(e,t.type);this[o]=s??this._$Ej?.get(o)??s,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const o=this.constructor,n=this[t];if(i??=o.getPropertyOptions(t),!((i.hasChanged??y)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:n},s){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??e??this[t]),!0!==n||void 0!==s)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[m("elementProperties")]=new Map,$[m("finalized")]=new Map,f?.({ReactiveElement:$}),(p.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,w=x.trustedTypes,A=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+C,k=`<${S}>`,T=document,U=()=>T.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,I="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,z=/>/g,M=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,H=/"/g,L=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),q=new WeakMap,W=T.createTreeWalker(T,129);function K(t,e){if(!P(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const F=(t,e)=>{const i=t.length-1,o=[];let n,s=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===N?"!--"===l[1]?r=O:void 0!==l[1]?r=z:void 0!==l[2]?(L.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=M):void 0!==l[3]&&(r=M):r===M?">"===l[0]?(r=n??N,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?M:'"'===l[3]?H:R):r===H||r===R?r=M:r===O||r===z?r=N:(r=M,n=void 0);const h=r===M&&t[e+1].startsWith("/>")?" ":"";s+=r===N?i+k:c>=0?(o.push(a),i.slice(0,c)+E+i.slice(c)+C+h):i+C+(-2===c?e:h)}return[K(t,s+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class Z{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let n=0,s=0;const r=t.length-1,a=this.parts,[l,c]=F(t,e);if(this.el=Z.createElement(l,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=W.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(E)){const e=c[s++],i=o.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?X:"?"===r[1]?tt:"@"===r[1]?et:Q}),o.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),o.removeAttribute(t));if(L.test(o.tagName)){const t=o.textContent.split(C),e=t.length-1;if(e>0){o.textContent=w?w.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],U()),W.nextNode(),a.push({type:2,index:++n});o.append(t[e],U())}}}else if(8===o.nodeType)if(o.data===S)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=o.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,o){if(e===B)return e;let n=void 0!==o?i._$Co?.[o]:i._$Cl;const s=D(e)?void 0:e._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),void 0===s?n=void 0:(n=new s(t),n._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=n:i._$Cl=n),void 0!==n&&(e=G(t,n._$AS(t,e.values),n,o)),e}class J{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??T).importNode(e,!0);W.currentNode=o;let n=W.nextNode(),s=0,r=0,a=i[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new Y(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new it(n,this,t)),this._$AV.push(e),a=i[++r]}s!==a?.index&&(n=W.nextNode(),s++)}return W.currentNode=T,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),D(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>P(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new J(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new Z(t)),e}k(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const n of t)o===e.length?e.push(i=new Y(this.O(U()),this.O(U()),this,this.options)):i=e[o],i._$AI(n),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,o){const n=this.strings;let s=!1;if(void 0===n)t=G(this,t,e,0),s=!D(t)||t!==this._$AH&&t!==B,s&&(this._$AH=t);else{const o=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=G(this,o[i+r],e,r),a===B&&(a=this._$AH[r]),s||=!D(a)||a!==this._$AH[r],a===V?t=V:t!==V&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}s&&!o&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class X extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class tt extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class et extends Q{constructor(t,e,i,o,n){super(t,e,i,o,n),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??V)===B)return;const i=this._$AH,o=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==V&&(i===V||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const ot=x.litHtmlPolyfillSupport;ot?.(Z,Y),(x.litHtmlVersions??=[]).push("3.3.1");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class st extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let n=o._$litPart$;if(void 0===n){const t=i?.renderBefore??null;o._$litPart$=n=new Y(e.insertBefore(U(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}st._$litElement$=!0,st.finalized=!0,nt.litElementHydrateSupport?.({LitElement:st});const rt=nt.litElementPolyfillSupport;rt?.({LitElement:st}),(nt.litElementVersions??=[]).push("4.2.1");const at={en:{title:"Title",now_playing:"Now playing",chapter:"Chapter",battery:"Battery",charging:"Charging",on_charger:"On charger",off_charger:"Off charger",volume:"Volume",volume_db:"Volume dB",no_content:"No Tonie on the box",unknown_title:"Unknown content",tag_uid:"Tag UID",charging_station:"Charging Station",volume_level:"Volume Level",small_ear_quieter:"Small Ear (quieter)",big_ear_louder:"Big Ear (louder)",content_audio_id:"Content Audio ID",cache_cloud_content:"Cache Cloud Content",enable_cloud_operation:"Enable Cloud Operation",config:{toniebox_id:"Toniebox ID",toniebox_name:"Toniebox Name",language:"Language",entity_source:"Select Toniebox Entity",toniebox_id_description:"The ID of your Toniebox (used in entity names)",toniebox_name_description:"Display name for your Toniebox",language_description:"Language for the card interface",entity_source_description:"Select any entity from your Toniebox to auto-configure",show_details:"Show extra details",show_details_description:"Adds tag UID, audio ID and ear buttons to the card",no_devices_found:"No TeddyCloud devices found",devices_found:"Found {count} TeddyCloud device(s)",entity_validation:"Detected entities",entities_missing:"{count} of {total} entities missing",entities_all_found:"All entities found"},errors:{missing_toniebox_id:"Toniebox ID is required",missing_toniebox_name:"Toniebox Name is required",entity_not_found:"Entity not found",not_configured:"Select a Toniebox entity in the card editor."}},de:{title:"Titel",now_playing:"Läuft gerade",chapter:"Kapitel",battery:"Akku",charging:"Lädt",on_charger:"In Ladestation",off_charger:"Nicht am Laden",volume:"Lautstärke",volume_db:"Lautstärke dB",no_content:"Kein Tonie auf der Box",unknown_title:"Unbekannter Inhalt",tag_uid:"Tag UID",charging_station:"Ladestation",volume_level:"Lautstärke Level",small_ear_quieter:"kleines Ohr (leiser)",big_ear_louder:"großes Ohr (lauter)",content_audio_id:"Content Audio ID",cache_cloud_content:"Cloud-Inhalte zwischenspeichern",enable_cloud_operation:"Cloud-Betrieb aktivieren",config:{toniebox_id:"Toniebox ID",toniebox_name:"Toniebox Name",language:"Sprache",entity_source:"Toniebox Entity auswählen",toniebox_id_description:"Die ID Ihrer Toniebox (wird in Entity-Namen verwendet)",toniebox_name_description:"Anzeigename für Ihre Toniebox",language_description:"Sprache für die Karten-Oberfläche",entity_source_description:"Wählen Sie eine Entity Ihrer Toniebox zur automatischen Konfiguration",show_details:"Zusatzinfos anzeigen",show_details_description:"Ergänzt Tag UID, Audio ID und Ohr-Tasten auf der Karte",no_devices_found:"Keine TeddyCloud Geräte gefunden",devices_found:"{count} TeddyCloud Gerät(e) gefunden",entity_validation:"Erkannte Entities",entities_missing:"{count} von {total} Entities fehlen",entities_all_found:"Alle Entities gefunden"},errors:{missing_toniebox_id:"Toniebox ID ist erforderlich",missing_toniebox_name:"Toniebox Name ist erforderlich",entity_not_found:"Entity nicht gefunden",not_configured:"Bitte im Karten-Editor eine Toniebox-Entity auswählen."}}};function lt(t,e="en",i={}){const o=t.split(".");let n=at[e]||at.en,s=at.en;for(const t of o)n=n?.[t],s=s?.[t];const r=n??s;if("string"!=typeof r)return t;let a=r;return Object.entries(i).forEach(([t,e])=>{a=a.split("{"+t+"}").join(String(e))}),a}const ct="teddycloud_box_";function dt(t){if(!t||"string"!=typeof t)return null;const e=t.match(/teddycloud_box_([^_]+)_/);return e?e[1]:null}function ht(t){return Boolean(t)&&t.includes(ct)}function ut(t,e){if(!t?.attributes)return`Toniebox ${e}`;const i=t.attributes.friendly_name,o=t.attributes.name,n=t.attributes.device_name;return i?i.replace(/^TeddyCloud Box \w+ /,"").replace(/^Toniebox /,"").replace(/^Box /,"")||`Toniebox ${e}`:n||(o||`Toniebox ${e}`)}function pt(t,e,i=null){for(const o of e){const e=t.find(t=>o.test(t.suffix)&&(!i||i.includes(t.domain)));if(e)return e.entityId}return null}function gt(t,e){const i=function(t,e){if(!t?.states||!e)return[];const i=`${ct}${e}_`;return Object.keys(t.states).filter(t=>t.includes(i)).map(t=>{const{domain:e,objectId:o}=function(t){const e=(t||"").indexOf(".");return e<0?{domain:"",objectId:t||""}:{domain:t.slice(0,e),objectId:t.slice(e+1)}}(t);return{entityId:t,domain:e,suffix:o.slice(o.indexOf(i)+i.length)}})}(t,e),o=_t(e),n=(e,n,s)=>pt(i,e,n)||(t?.states?.[o[s]]?o[s]:null);return{contentPicture:n([/^content_picture$/,/picture|image|cover/],["image"],"contentPicture"),contentTitle:n([/^content_title$/,/content.*title/,/title/],["sensor"],"contentTitle"),chapter:pt(i,[/chapter/,/track/,/episode/],["sensor"]),contentSeries:pt(i,[/series/,/^content_source$/],["sensor"]),battery:pt(i,[/battery_level/,/battery_percent/,/^battery$/,/battery/],["sensor"]),charger:n([/^charger$/,/charg/],["binary_sensor"],"charger"),volumeLevel:n([/^volume_level$/,/volume_level/],["sensor","number"],"volumeLevel"),volumeDb:n([/^volume_db$/,/volume_db/],["sensor"],"volumeDb"),tagValid:n([/^tag_valid$/,/tag/],["sensor","binary_sensor"],"tagValid"),contentAudioId:n([/^content_audio_id$/,/audio_id/],["sensor"],"contentAudioId"),volumeDown:n([/^volume_down$/],["event"],"volumeDown"),volumeUp:n([/^volume_up$/],["event"],"volumeUp"),lastSeen:pt(i,[/last_seen/,/last_online/,/last_contact/],["sensor"]),all:i}}function _t(t){return{contentPicture:`image.${ct}${t}_content_picture`,contentTitle:`sensor.${ct}${t}_content_title`,tagValid:`sensor.${ct}${t}_tag_valid`,volumeDb:`sensor.${ct}${t}_volume_db`,volumeLevel:`sensor.${ct}${t}_volume_level`,contentAudioId:`sensor.${ct}${t}_content_audio_id`,charger:`binary_sensor.${ct}${t}_charger`,volumeDown:`event.${ct}${t}_volume_down`,volumeUp:`event.${ct}${t}_volume_up`}}customElements.define("teddy-card-editor",class extends st{static get properties(){return{hass:{},config:{},_availableDevices:{type:Array},_selectedEntity:{type:String}}}constructor(){super(),this.config={toniebox_id:"",toniebox_name:"",language:"en",entity_source:"",show_details:!1},this._availableDevices=[],this._selectedEntity=""}setConfig(t){this.config={toniebox_id:"",toniebox_name:"",language:"en",entity_source:"",show_details:!1,...t},this._selectedEntity=this.config.entity_source||"",this._updateAvailableDevices()}connectedCallback(){super.connectedCallback(),this._updateAvailableDevices()}updated(t){super.updated(t),t.has("hass")&&this._updateAvailableDevices()}_updateAvailableDevices(){if(this.hass){const t=function(t){const e=new Map;return t?.states?(Object.keys(t.states).forEach(t=>{if(!ht(t))return;const i=dt(t);i&&(e.has(i)||e.set(i,{id:i,entities:[],name:null,sampleEntity:t}),e.get(i).entities.push(t))}),e.forEach((e,i)=>{const o=t.states[e.sampleEntity];e.name=ut(o,i)}),e):e}(this.hass);this._availableDevices=Array.from(t.values())}}get _toniebox_id(){return this.config?.toniebox_id||""}get _toniebox_name(){return this.config?.toniebox_name||""}get _language(){return this.config?.language||"en"}get _entity_source(){return this.config?.entity_source||""}get _show_details(){return!0===this.config?.show_details}_switchChanged(t){const e=t.target.configValue;e&&this._updateConfig({...this.config,[e]:t.target.checked})}_onEntitySelect(t){const e=t.target.value;if(this._selectedEntity=e,e&&this.hass)try{const t=function(t,e){const i=dt(e);if(!i)throw new Error("Invalid entity selected - cannot extract Toniebox ID");return{entity_source:e,toniebox_id:i,toniebox_name:ut(t.states[e],i)}}(this.hass,e);if(console.debug("Auto config from entity:",t),t&&"object"==typeof t){const e={...this.config||{language:"en"},...t,language:this._language};console.debug("Final config to update:",e),this._updateConfig(e)}else console.warn("Invalid autoConfig received:",t)}catch(t){console.error("Could not create config from entity:",t)}else if(!e){const t={...this.config,entity_source:"",toniebox_id:"",toniebox_name:""};this._updateConfig(t)}}_valueChanged(t){if(!this.config||!this.hass)return;const e=t.target,i=e.configValue,o=e.value;if(this[`_${i}`]===o)return;const n={...this.config};i&&(""===o||void 0===o?delete n[i]:n[i]=o),this._updateConfig(n)}_updateConfig(t){if(!t||"object"!=typeof t)return void console.error("Cannot update with invalid config:",t);const e={language:"en"};Object.keys(t).forEach(i=>{void 0!==t[i]&&(e[i]=t[i])}),console.debug("Updating config:",e),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_renderEntityConfig(){const t=(e=this.hass,e?.states?Object.keys(e.states).filter(t=>ht(t)).map(t=>{const i=e.states[t],o=dt(t);return{value:t,label:`${ut(i,o)} (${i.attributes?.friendly_name||t})`,boxId:o}}).sort((t,e)=>t.label.localeCompare(e.label)):[]);var e;return j`
      <div class="entity-config">
        <div class="form-group">
          <ha-select
            label="${lt("config.entity_source",this._language)}"
            .value=${this._selectedEntity}
            @selected=${this._onEntitySelect}
            helper-text="${lt("config.entity_source_description",this._language)}"
          >
            <mwc-list-item value="">-- Select Entity --</mwc-list-item>
            ${t.map(t=>j`
              <mwc-list-item value="${t.value}">
                ${t.label}
              </mwc-list-item>
            `)}
          </ha-select>
        </div>

        ${this._selectedEntity?j`
          <div class="auto-detected-info">
            <h4>${lt("config.entity_validation",this._language)}</h4>
            ${this._renderEntityValidation()}
          </div>
        `:""}
      </div>
    `}_renderEntityValidation(){if(!this._toniebox_id)return j`<div class="no-validation">Select an entity to validate</div>`;const t=function(t,e){const i=["contentPicture","contentTitle","charger","volumeLevel"],o=gt(t,e),n=_t(e),s=[],r=[];return i.forEach(t=>{o[t]?r.push({key:t,entityId:o[t]}):s.push({key:t,entityId:n[t]||t})}),{valid:0===s.length,missing:s,available:r,discovered:o.all,totalExpected:i.length,foundCount:r.length}}(this.hass,this._toniebox_id),e=t.discovered||[];return j`
      <div class="entity-validation">
        ${t.valid?j`
          <ha-alert alert-type="success">
            ${lt("config.entities_all_found",this._language)}
          </ha-alert>
        `:j`
          <ha-alert alert-type="warning">
            ${lt("config.entities_missing",this._language,{count:t.missing.length,total:t.totalExpected})}
          </ha-alert>
        `}

        <div class="discovered">
          <h5>${e.length} entities</h5>
          <ul>
            ${e.map(t=>j`
              <li><code>${t.entityId}</code></li>
            `)}
          </ul>
        </div>
      </div>
    `}render(){return this.hass?j`
      <div class="card-config">
        ${this._renderEntityConfig()}

        <div class="form-group">
          <ha-select
            label="${lt("config.language",this._language)}"
            .value=${this._language}
            .configValue=${"language"}
            @selected=${this._valueChanged}
            helper-text="${lt("config.language_description",this._language)}"
          >
            <mwc-list-item value="en">English</mwc-list-item>
            <mwc-list-item value="de">Deutsch</mwc-list-item>
          </ha-select>
        </div>

        <div class="form-group switch-row">
          <ha-switch
            .checked=${this._show_details}
            .configValue=${"show_details"}
            @change=${this._switchChanged}
          ></ha-switch>
          <div>
            <div class="switch-label">${lt("config.show_details",this._language)}</div>
            <div class="switch-help">${lt("config.show_details_description",this._language)}</div>
          </div>
        </div>

        <div class="validation-summary">
          ${this._selectedEntity?j`
            <ha-alert alert-type="success">
              Configuration is valid! 🎉
            </ha-alert>
          `:j`
            <ha-alert alert-type="info">
              Please select a TeddyCloud entity to configure the card.
            </ha-alert>
          `}
        </div>
      </div>
    `:j``}static get styles(){return s`
      .card-config {
        padding: 20px;
      }

      .form-group {
        margin-bottom: 20px;
      }

      .form-group ha-textfield,
      .form-group ha-select {
        width: 100%;
      }

      .mode-toggle {
        margin-bottom: 24px;
        padding: 16px;
        background: var(--card-background-color);
        border-radius: 8px;
        border: 1px solid var(--divider-color);
      }

      .toggle-container {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 8px;
      }

      .toggle-label {
        flex: 1;
      }

      .toggle-description {
        font-size: 14px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }

      .devices-info {
        font-size: 14px;
        color: var(--primary-text-color);
        font-weight: 500;
      }

      .entity-config {
        background: var(--card-background-color);
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 20px;
        border: 1px solid var(--divider-color);
      }

      .auto-detected-info,
      .validation-info,
      .device-info {
        margin-top: 16px;
      }

      .auto-detected-info h4,
      .validation-info h4,
      .device-info h4 {
        margin: 0 0 12px 0;
        color: var(--primary-text-color);
      }

      .entity-validation,
      .device-validation {
        background: var(--code-editor-background-color, #f8f9fa);
        border-radius: 8px;
        padding: 12px;
      }

      .device-info-details {
        margin-bottom: 16px;
        padding: 8px;
        background: var(--card-background-color);
        border-radius: 4px;
        border-left: 4px solid var(--primary-color);
      }

      .device-properties {
        margin-top: 8px;
        font-size: 14px;
      }

      .device-properties div {
        margin-bottom: 4px;
      }

      .switch-row {
        display: flex;
        align-items: flex-start;
        gap: 12px;
      }

      .switch-label {
        font-size: 15px;
        color: var(--primary-text-color);
      }

      .switch-help {
        font-size: 13px;
        color: var(--secondary-text-color);
      }

      .discovered {
        margin-top: 12px;
      }

      .discovered h5 {
        margin: 0 0 6px 0;
        font-size: 13px;
        color: var(--secondary-text-color);
      }

      .discovered ul {
        margin: 0;
        padding-left: 16px;
        max-height: 180px;
        overflow-y: auto;
        font-size: 12px;
      }

      .discovered code {
        font-family: 'Courier New', monospace;
        color: var(--primary-text-color);
      }

      .entity-status {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-top: 12px;
      }

      .found-entities h5,
      .missing-entities h5 {
        margin: 0 0 8px 0;
        font-size: 14px;
      }

      .found-entities h5 {
        color: var(--success-color, #4caf50);
      }

      .missing-entities h5 {
        color: var(--error-color, #f44336);
      }

      .entity-status ul {
        margin: 0;
        padding-left: 16px;
        font-size: 12px;
      }

      .entity-status li {
        margin-bottom: 4px;
      }

      .entity-status code {
        background: var(--card-background-color);
        padding: 2px 4px;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
        color: var(--primary-text-color);
      }

      .validation-summary {
        margin-top: 20px;
      }

      .no-validation {
        font-style: italic;
        color: var(--secondary-text-color);
      }

      ha-alert {
        margin-bottom: 12px;
      }

      @media (max-width: 600px) {
        .entity-status {
          grid-template-columns: 1fr;
        }
      }
    `}});const ft="0.4.3";console.info(`%c TEDDY-CARD %c v${ft} `,"color: white; font-weight: bold; background: #03a9f4","color: white; font-weight: bold; background: #606060");class mt extends st{static get properties(){return{hass:{},config:{},_failedUrls:{state:!0}}}constructor(){super(),this.config={language:"en",entity_source:"",toniebox_id:"",toniebox_name:"",show_details:!1},this._failedUrls=new Set}static getConfigElement(){return document.createElement("teddy-card-editor")}static getStubConfig(){return{entity_source:"",language:"en",show_details:!1}}setConfig(t){const e={...t};if(e.entity_source){const t=dt(e.entity_source);t&&(e.toniebox_id=t)}e.entity_source||e.toniebox_id||console.log("Card needs configuration - please select an entity or enter Toniebox ID"),this.config={language:"en",show_details:!1,...e},this._updateAutoDetectedName()}updated(t){super.updated(t),t.has("hass")&&this._updateAutoDetectedName()}_updateAutoDetectedName(){if(!this.hass||!this.config?.entity_source||this.config.toniebox_name)return;const t=this.hass.states[this.config.entity_source];if(!t)return;const e=ut(t,this.config.toniebox_id);e!==this.config.toniebox_name&&(this.config={...this.config,toniebox_name:e},this.requestUpdate())}getCardSize(){return this.config?.show_details?6:4}get _lang(){return this.config?.language||"en"}_state(t){return t?this.hass.states[t]:void 0}_format(t){if(!t)return null;if(["unknown","unavailable","none",""].includes(t.state))return null;if("function"==typeof this.hass.formatEntityState)try{return this.hass.formatEntityState(t)}catch(t){}const e=t.attributes?.unit_of_measurement;return e?`${t.state} ${e}`:t.state}_label(t,e){const i=t?.attributes?.friendly_name;if(i){const t=i.replace(/^TeddyCloud Server\s*/i,"").replace(/^TeddyCloud Box \w+\s*/i,"").replace(/^TeddyCloud\s*/i,"").trim();if(t)return t.charAt(0).toUpperCase()+t.slice(1)}const o=(e||"").replace(/_/g," ").trim();return o?o.charAt(0).toUpperCase()+o.slice(1):e}_showMoreInfo(t){if(!t)return;const e=new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}_toggle(t,e){e?.stopPropagation();const i=t.split(".")[0];this.hass.callService(i,"toggle",{entity_id:t})}_pictureUrls(t){if(!t)return[];const e=[];return t.entity_id?.startsWith("image.")&&e.push(`/api/image_proxy/${t.entity_id}?state=${encodeURIComponent(t.state||"")}`),t.attributes?.entity_picture&&e.push(t.attributes.entity_picture),e.filter((t,i)=>e.indexOf(t)===i)}_pictureUrl(t){return this._pictureUrls(t).find(t=>!this._failedUrls.has(t))||null}_onPictureError(t){this._failedUrls=new Set([...this._failedUrls,t])}_chapterText(t){const e=this._state(t.chapter),i=this._format(e);if(i)return i;const o=this._state(t.contentTitle)?.attributes||{},n=[o.chapter_title,o.chapter,o.current_chapter,o.track_title,o.track,o.episode].find(t=>null!=t&&""!==t);if(void 0===n)return null;const s=o.chapter_count??o.chapters_total??(Array.isArray(o.chapters)?o.chapters.length:void 0);return"number"==typeof n&&s?`${n} / ${s}`:String(n)}_renderCover(t){const e=this._pictureUrl(this._state(t.contentPicture));return e?j`
      <div class="cover">
        <img
          src="${e}"
          alt=""
          @error=${()=>this._onPictureError(e)}
        />
      </div>
    `:j`
        <div class="cover cover-empty">
          <ha-icon icon="mdi:teddy-bear"></ha-icon>
        </div>
      `}_renderHero(t){const e=this._lang,i=this._state(t.contentTitle),o=this._format(i),n=this._chapterText(t),s=this._format(this._state(t.contentSeries)),r=this._pictureUrl(this._state(t.contentPicture));return j`
      <div class="hero">
        ${r?j`<div class="hero-backdrop" style="background-image:url('${r}')"></div>`:""}
        <div class="hero-inner">
          ${this._renderCover(t)}
          <div class="now" @click=${()=>this._showMoreInfo(t.contentTitle)}>
            ${o?j`<div class="eyebrow">${s||lt("now_playing",e)}</div>`:""}
            <div class="now-title ${o?"":"now-title-empty"}">${o||lt("no_content",e)}</div>
            ${n?j`
              <div class="now-chapter">
                <ha-icon icon="mdi:playlist-music"></ha-icon>
                <span>${lt("chapter",e)} · ${n}</span>
              </div>
            `:""}
          </div>
        </div>
      </div>
    `}_renderBattery(t){const e=this._lang,i=this._state(t.battery),o=this._state(t.charger),n="on"===o?.state,s=Number(i?.state),r=Number.isFinite(s)&&"%"===i?.attributes?.unit_of_measurement?Math.max(0,Math.min(100,s)):null;let a="ok";n?a="charging":null!==r&&r<=20?a="low":null!==r&&r<=40&&(a="warn");const l=n?"mdi:battery-charging":null===r?"mdi:battery-unknown":"mdi:battery"+(r>=95?"":"-"+10*Math.max(1,Math.round(r/10))),c=this._format(i)||lt(n?"on_charger":"off_charger",e),d=lt(n?"charging":i?"battery":"charging_station",e);return j`
      <div
        class="stat stat-${a}"
        @click=${()=>this._showMoreInfo(t.battery||t.charger)}
      >
        <ha-icon icon="${l}"></ha-icon>
        <div class="stat-body">
          <span class="stat-value">${c}</span>
          <span class="stat-caption">${d}</span>
        </div>
        ${null!==r?j`
          <div class="stat-bar"><span style="width:${r}%"></span></div>
        `:""}
      </div>
    `}_renderVolume(t){const e=this._lang,i=this._state(t.volumeLevel),o=this._state(t.volumeDb),n=Number(i?.state),s=Number(i?.attributes?.min),r=Number(i?.attributes?.max),a=Number.isFinite(n)&&Number.isFinite(s)&&Number.isFinite(r)&&r>s,l=a?r-s+1:0,c=a?n-s+1:0,d=a?c/l:null,h=this._format(o),u=this._format(i),p=a?`${n} / ${r}`:u??h??"–",g=a||!u?lt("volume",e):`${lt("volume",e)}${h?` · ${h}`:""}`;return j`
      <div class="stat" @click=${()=>this._showMoreInfo(t.volumeLevel||t.volumeDb)}>
        <ha-icon icon="${null===d?"mdi:volume-medium":d<=.01?"mdi:volume-off":d<=.34?"mdi:volume-low":d<=.67?"mdi:volume-medium":"mdi:volume-high"}"></ha-icon>
        <div class="stat-body">
          <span class="stat-value">${p}${a&&h?j` <em>${h}</em>`:""}</span>
          <span class="stat-caption">${g}</span>
        </div>
        ${a&&l<=12?j`
          <div class="steps">
            ${Array.from({length:l},(t,e)=>j`
              <span class="${e<c?"on":""}"></span>
            `)}
          </div>
        `:""}
        ${a&&l>12?j`
          <div class="stat-bar"><span style="width:${Math.round(100*d)}%; background: var(--primary-color)"></span></div>
        `:""}
      </div>
    `}_renderDetailRow(t,e,i){const o=this._state(t);return o?j`
      <div class="detail-row" @click=${()=>this._showMoreInfo(t)}>
        <ha-icon icon="${i}"></ha-icon>
        <span class="detail-name">${e}</span>
        <span class="detail-state">${this._format(o)??"–"}</span>
      </div>
    `:""}_renderDetails(t){if(!this.config?.show_details)return"";const e=this._lang;return j`
      <div class="details">
        ${this._renderDetailRow(t.tagValid,lt("tag_uid",e),"mdi:tag")}
        ${this._renderDetailRow(t.contentAudioId,lt("content_audio_id",e),"mdi:identifier")}
        ${this._renderDetailRow(t.volumeDown,lt("small_ear_quieter",e),"mdi:ear-hearing-off")}
        ${this._renderDetailRow(t.volumeUp,lt("big_ear_louder",e),"mdi:ear-hearing")}
        ${this._renderDetailRow(t.lastSeen,"Last seen","mdi:clock-outline")}
      </div>
    `}render(){if(!this.config||!this.hass)return j``;const t=this._lang;if(!this.config.toniebox_id)return j`
        <ha-card>
          <div class="setup">
            <ha-icon icon="mdi:teddy-bear"></ha-icon>
            <div>
              <h3>TeddyCloud</h3>
              <p>${lt("errors.not_configured",t)}</p>
            </div>
          </div>
        </ha-card>
      `;const e=gt(this.hass,this.config.toniebox_id);return j`
      <ha-card>
        <div class="header">
          <span class="box-name">${this.config.toniebox_name||`Toniebox ${this.config.toniebox_id}`}</span>
        </div>

        ${this._renderHero(e)}

        <div class="stats">
          ${this._renderBattery(e)}
          ${this._renderVolume(e)}
        </div>

        ${this._renderDetails(e)}
      </ha-card>
    `}static get styles(){return s`
      :host {
        display: block;
        --teddy-radius: 16px;
        --teddy-gap: 12px;
      }

      ha-card {
        overflow: hidden;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: var(--teddy-gap);
      }

      /* ---------------------------------------------------------- header */

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      .box-name {
        font-size: 20px;
        font-weight: 600;
        color: var(--primary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      /* ------------------------------------------------------------ hero */

      .hero {
        position: relative;
        border-radius: var(--teddy-radius);
        overflow: hidden;
        background: var(--secondary-background-color);
        isolation: isolate;
      }

      .hero-backdrop {
        position: absolute;
        inset: -20%;
        background-size: cover;
        background-position: center;
        filter: blur(28px) saturate(1.4);
        opacity: 0.55;
        z-index: -1;
      }

      .hero-inner {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        background: linear-gradient(
          100deg,
          color-mix(in srgb, var(--card-background-color) 82%, transparent),
          color-mix(in srgb, var(--card-background-color) 55%, transparent)
        );
      }

      .cover {
        flex-shrink: 0;
        width: 96px;
        height: 96px;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.28);
        background: var(--divider-color);
      }

      .cover img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .cover-empty {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--secondary-text-color);
      }

      .cover-empty ha-icon {
        --mdc-icon-size: 44px;
      }

      .now {
        min-width: 0;
        cursor: pointer;
      }

      .eyebrow {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
      }

      .now-title {
        margin-top: 2px;
        font-size: 18px;
        font-weight: 600;
        line-height: 1.25;
        color: var(--primary-text-color);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .now-title-empty {
        font-weight: 500;
        color: var(--secondary-text-color);
      }

      .now-chapter {
        margin-top: 6px;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: var(--secondary-text-color);
      }

      .now-chapter ha-icon {
        --mdc-icon-size: 16px;
      }

      /* ----------------------------------------------------------- stats */

      .stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--teddy-gap);
      }

      .stat {
        position: relative;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px;
        border-radius: var(--teddy-radius);
        background: var(--secondary-background-color);
        cursor: pointer;
        overflow: hidden;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }

      .stat:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
      }

      .stat ha-icon {
        --mdc-icon-size: 24px;
        color: var(--state-icon-color, var(--primary-text-color));
      }

      .stat-charging ha-icon { color: var(--success-color, #4caf50); }
      .stat-warn ha-icon { color: var(--warning-color, #ff9800); }
      .stat-low ha-icon { color: var(--error-color, #f44336); }

      .stat-body {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }

      .stat-value {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
        white-space: nowrap;
      }

      .stat-value em {
        font-style: normal;
        font-size: 12px;
        font-weight: 400;
        color: var(--secondary-text-color);
      }

      .stat-caption {
        font-size: 12px;
        color: var(--secondary-text-color);
      }

      .stat-bar {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 3px;
        width: 100%;
        background: var(--divider-color);
      }

      .stat-bar span {
        display: block;
        height: 100%;
        background: var(--success-color, #4caf50);
      }

      .stat-warn .stat-bar span { background: var(--warning-color, #ff9800); }
      .stat-low .stat-bar span { background: var(--error-color, #f44336); }

      .steps {
        margin-left: auto;
        display: flex;
        align-items: flex-end;
        gap: 3px;
        height: 22px;
      }

      .steps span {
        width: 5px;
        border-radius: 2px;
        background: var(--divider-color);
        height: 40%;
      }

      .steps span:nth-child(2) { height: 60%; }
      .steps span:nth-child(3) { height: 80%; }
      .steps span:nth-child(n+4) { height: 100%; }

      .steps span.on {
        background: var(--primary-color);
      }

      /* --------------------------------------------------------- details */

      .details {
        display: flex;
        flex-direction: column;
      }

      .detail-row {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 4px;
        border-bottom: 1px solid var(--divider-color);
        cursor: pointer;
      }

      .detail-row:last-child {
        border-bottom: none;
      }

      .detail-row ha-icon {
        --mdc-icon-size: 18px;
        color: var(--state-icon-color, var(--secondary-text-color));
      }

      .detail-name {
        flex: 1;
        font-size: 14px;
        color: var(--primary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .detail-state {
        font-size: 14px;
        color: var(--secondary-text-color);
        text-align: right;
      }

      /* ----------------------------------------------------------- setup */

      .setup {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .setup ha-icon {
        --mdc-icon-size: 40px;
        color: var(--primary-color);
      }

      .setup h3 {
        margin: 0 0 4px 0;
        color: var(--primary-text-color);
      }

      .setup p {
        margin: 0;
        color: var(--secondary-text-color);
      }

      @media (max-width: 480px) {
        .stats {
          grid-template-columns: 1fr;
        }

        .cover {
          width: 76px;
          height: 76px;
        }
      }
    `}}customElements.define("teddy-card",mt),window.customCards=window.customCards||[],window.customCards.push({type:"teddy-card",name:"TeddyCloud Toniebox Card",description:"A custom card for displaying TeddyCloud Toniebox information",version:ft});export{mt as TeddyCard};
