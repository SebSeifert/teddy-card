/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let s=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=o.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&o.set(i,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new s(o,e,i)},r=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:a,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,p=globalThis,g=p.trustedTypes,_=g?g.emptyScript:"",f=p.reactiveElementPolyfillSupport,v=(e,t)=>e,m={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!a(e,t),b={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&l(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:s}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const n=o?.call(this);s?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...d(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,o)=>{if(t)i.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of o){const o=document.createElement("style"),s=e.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=t.cssText,i.appendChild(o)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:m).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=i.getPropertyOptions(o),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:m;this._$Em=o;const n=s.fromAttribute(t,e.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){const o=this.constructor,s=this[e];if(i??=o.getPropertyOptions(e),!((i.hasChanged??y)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:s},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==s||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,i,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,f?.({ReactiveElement:x}),(p.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,w=$.trustedTypes,A=w?w.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+C,k=`<${S}>`,T=document,I=()=>T.createComment(""),D=e=>null===e||"object"!=typeof e&&"function"!=typeof e,U=Array.isArray,z="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,N=/>/g,M=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,R=/"/g,L=/^(?:script|style|textarea|title)$/i,j=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),B=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),q=new WeakMap,K=T.createTreeWalker(T,129);function W(e,t){if(!U(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const F=(e,t)=>{const i=e.length-1,o=[];let s,n=2===t?"<svg>":3===t?"<math>":"",r=O;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===O?"!--"===l[1]?r=P:void 0!==l[1]?r=N:void 0!==l[2]?(L.test(l[2])&&(s=RegExp("</"+l[2],"g")),r=M):void 0!==l[3]&&(r=M):r===M?">"===l[0]?(r=s??O,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?M:'"'===l[3]?R:H):r===R||r===H?r=M:r===P||r===N?r=O:(r=M,s=void 0);const h=r===M&&e[t+1].startsWith("/>")?" ":"";n+=r===O?i+k:c>=0?(o.push(a),i.slice(0,c)+E+i.slice(c)+C+h):i+C+(-2===c?t:h)}return[W(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class Z{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let s=0,n=0;const r=e.length-1,a=this.parts,[l,c]=F(e,t);if(this.el=Z.createElement(l,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=K.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(E)){const t=c[n++],i=o.getAttribute(e).split(C),r=/([.?@])?(.*)/.exec(t);a.push({type:1,index:s,name:r[2],strings:i,ctor:"."===r[1]?X:"?"===r[1]?ee:"@"===r[1]?te:Q}),o.removeAttribute(e)}else e.startsWith(C)&&(a.push({type:6,index:s}),o.removeAttribute(e));if(L.test(o.tagName)){const e=o.textContent.split(C),t=e.length-1;if(t>0){o.textContent=w?w.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],I()),K.nextNode(),a.push({type:2,index:++s});o.append(e[t],I())}}}else if(8===o.nodeType)if(o.data===S)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=o.data.indexOf(C,e+1));)a.push({type:7,index:s}),e+=C.length-1}s++}}static createElement(e,t){const i=T.createElement("template");return i.innerHTML=e,i}}function G(e,t,i=e,o){if(t===B)return t;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const n=D(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(e),s._$AT(e,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(t=G(e,s._$AS(e,t.values),s,o)),t}class J{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??T).importNode(t,!0);K.currentNode=o;let s=K.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new Y(s,s.nextSibling,this,e):1===a.type?t=new a.ctor(s,a.name,a.strings,this,e):6===a.type&&(t=new ie(s,this,e)),this._$AV.push(t),a=i[++r]}n!==a?.index&&(s=K.nextNode(),n++)}return K.currentNode=T,o}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=G(this,e,t),D(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==B&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>U(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&D(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Z.createElement(W(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new J(o,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new Z(e)),t}k(e){U(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const s of e)o===t.length?t.push(i=new Y(this.O(I()),this.O(I()),this,this.options)):i=t[o],i._$AI(s),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,s){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(e,t=this,i,o){const s=this.strings;let n=!1;if(void 0===s)e=G(this,e,t,0),n=!D(e)||e!==this._$AH&&e!==B,n&&(this._$AH=e);else{const o=e;let r,a;for(e=s[0],r=0;r<s.length-1;r++)a=G(this,o[i+r],t,r),a===B&&(a=this._$AH[r]),n||=!D(a)||a!==this._$AH[r],a===V?e=V:e!==V&&(e+=(a??"")+s[r+1]),this._$AH[r]=a}n&&!o&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class X extends Q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}class ee extends Q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}}class te extends Q{constructor(e,t,i,o,s){super(e,t,i,o,s),this.type=5}_$AI(e,t=this){if((e=G(this,e,t,0)??V)===B)return;const i=this._$AH,o=e===V&&i!==V||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==V&&(i===V||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ie{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}}const oe=$.litHtmlPolyfillSupport;oe?.(Z,Y),($.litHtmlVersions??=[]).push("3.3.1");const se=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ne extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const o=i?.renderBefore??t;let s=o._$litPart$;if(void 0===s){const e=i?.renderBefore??null;o._$litPart$=s=new Y(t.insertBefore(I(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}}ne._$litElement$=!0,ne.finalized=!0,se.litElementHydrateSupport?.({LitElement:ne});const re=se.litElementPolyfillSupport;re?.({LitElement:ne}),(se.litElementVersions??=[]).push("4.2.1");const ae={en:{title:"Title",now_playing:"Now playing",chapter:"Chapter",battery:"Battery",charging:"Charging",on_charger:"On charger",off_charger:"Off charger",volume:"Volume",volume_db:"Volume dB",no_content:"No Tonie on the box",unknown_title:"Unknown content",tag_uid:"Tag UID",charging_station:"Charging Station",volume_level:"Volume Level",small_ear_quieter:"Small Ear (quieter)",big_ear_louder:"Big Ear (louder)",content_audio_id:"Content Audio ID",cache_cloud_content:"Cache Cloud Content",enable_cloud_operation:"Enable Cloud Operation",server:{heading:"TeddyCloud Server",controls:"Controls",status:"Status",online:"Online",offline:"Offline",no_entities:"No TeddyCloud server entities found",show_all:"Show all",show_less:"Show less"},config:{toniebox_id:"Toniebox ID",toniebox_name:"Toniebox Name",language:"Language",entity_source:"Select Toniebox Entity",toniebox_id_description:"The ID of your Toniebox (used in entity names)",toniebox_name_description:"Display name for your Toniebox",language_description:"Language for the card interface",entity_source_description:"Select any entity from your Toniebox to auto-configure",show_server:"Show TeddyCloud server section",show_server_description:"Display server status and switches below the box",show_details:"Show extra details",show_details_description:"Adds tag UID, audio ID and ear buttons to the card",no_devices_found:"No TeddyCloud devices found",devices_found:"Found {count} TeddyCloud device(s)",entity_validation:"Detected entities",entities_missing:"{count} of {total} entities missing",entities_all_found:"All entities found"},errors:{missing_toniebox_id:"Toniebox ID is required",missing_toniebox_name:"Toniebox Name is required",entity_not_found:"Entity not found",not_configured:"Select a Toniebox entity in the card editor."}},de:{title:"Titel",now_playing:"Läuft gerade",chapter:"Kapitel",battery:"Akku",charging:"Lädt",on_charger:"In Ladestation",off_charger:"Nicht am Laden",volume:"Lautstärke",volume_db:"Lautstärke dB",no_content:"Kein Tonie auf der Box",unknown_title:"Unbekannter Inhalt",tag_uid:"Tag UID",charging_station:"Ladestation",volume_level:"Lautstärke Level",small_ear_quieter:"kleines Ohr (leiser)",big_ear_louder:"großes Ohr (lauter)",content_audio_id:"Content Audio ID",cache_cloud_content:"Cloud-Inhalte zwischenspeichern",enable_cloud_operation:"Cloud-Betrieb aktivieren",server:{heading:"TeddyCloud Server",controls:"Einstellungen",status:"Status",online:"Online",offline:"Offline",no_entities:"Keine TeddyCloud Server-Entities gefunden",show_all:"Alle anzeigen",show_less:"Weniger anzeigen"},config:{toniebox_id:"Toniebox ID",toniebox_name:"Toniebox Name",language:"Sprache",entity_source:"Toniebox Entity auswählen",toniebox_id_description:"Die ID Ihrer Toniebox (wird in Entity-Namen verwendet)",toniebox_name_description:"Anzeigename für Ihre Toniebox",language_description:"Sprache für die Karten-Oberfläche",entity_source_description:"Wählen Sie eine Entity Ihrer Toniebox zur automatischen Konfiguration",show_server:"TeddyCloud Server-Bereich anzeigen",show_server_description:"Server-Status und Schalter unter der Box anzeigen",show_details:"Zusatzinfos anzeigen",show_details_description:"Ergänzt Tag UID, Audio ID und Ohr-Tasten auf der Karte",no_devices_found:"Keine TeddyCloud Geräte gefunden",devices_found:"{count} TeddyCloud Gerät(e) gefunden",entity_validation:"Erkannte Entities",entities_missing:"{count} von {total} Entities fehlen",entities_all_found:"Alle Entities gefunden"},errors:{missing_toniebox_id:"Toniebox ID ist erforderlich",missing_toniebox_name:"Toniebox Name ist erforderlich",entity_not_found:"Entity nicht gefunden",not_configured:"Bitte im Karten-Editor eine Toniebox-Entity auswählen."}}};function le(e,t="en",i={}){const o=e.split(".");let s=ae[t]||ae.en,n=ae.en;for(const e of o)s=s?.[e],n=n?.[e];const r=s??n;if("string"!=typeof r)return e;let a=r;return Object.entries(i).forEach(([e,t])=>{a=a.split("{"+e+"}").join(String(t))}),a}const ce="teddycloud_box_",de="teddycloud_server_";function he(e){if(!e||"string"!=typeof e)return null;const t=e.match(/teddycloud_box_([^_]+)_/);return t?t[1]:null}function ue(e){const t=(e||"").indexOf(".");return t<0?{domain:"",objectId:e||""}:{domain:e.slice(0,t),objectId:e.slice(t+1)}}function pe(e){return Boolean(e)&&e.includes(ce)}function ge(e){return Boolean(e)&&e.includes(de)}function _e(e,t){if(!e?.attributes)return`Toniebox ${t}`;const i=e.attributes.friendly_name,o=e.attributes.name,s=e.attributes.device_name;return i?i.replace(/^TeddyCloud Box \w+ /,"").replace(/^Toniebox /,"").replace(/^Box /,"")||`Toniebox ${t}`:s||(o||`Toniebox ${t}`)}function fe(e,t,i=null){for(const o of t){const t=e.find(e=>o.test(e.suffix)&&(!i||i.includes(e.domain)));if(t)return t.entityId}return null}function ve(e,t){const i=function(e,t){if(!e?.states||!t)return[];const i=`${ce}${t}_`;return Object.keys(e.states).filter(e=>e.includes(i)).map(e=>{const{domain:t,objectId:o}=ue(e);return{entityId:e,domain:t,suffix:o.slice(o.indexOf(i)+i.length)}})}(e,t),o=ye(t),s=(t,s,n)=>fe(i,t,s)||(e?.states?.[o[n]]?o[n]:null);return{contentPicture:s([/^content_picture$/,/picture|image|cover/],["image"],"contentPicture"),contentTitle:s([/^content_title$/,/content.*title/,/title/],["sensor"],"contentTitle"),chapter:fe(i,[/chapter/,/track/,/episode/],["sensor"]),contentSeries:fe(i,[/series/,/^content_source$/],["sensor"]),battery:fe(i,[/battery_level/,/battery_percent/,/^battery$/,/battery/],["sensor"]),charger:s([/^charger$/,/charg/],["binary_sensor"],"charger"),volumeLevel:s([/^volume_level$/,/volume_level/],["sensor","number"],"volumeLevel"),volumeDb:s([/^volume_db$/,/volume_db/],["sensor"],"volumeDb"),tagValid:s([/^tag_valid$/,/tag/],["sensor","binary_sensor"],"tagValid"),contentAudioId:s([/^content_audio_id$/,/audio_id/],["sensor"],"contentAudioId"),volumeDown:s([/^volume_down$/],["event"],"volumeDown"),volumeUp:s([/^volume_up$/],["event"],"volumeUp"),lastSeen:fe(i,[/last_seen/,/last_online/,/last_contact/],["sensor"]),all:i}}function me(e){const t=function(e){return e?.states?Object.keys(e.states).filter(ge).map(e=>{const{domain:t,objectId:i}=ue(e);return{entityId:e,domain:t,suffix:i.slice(i.indexOf(de)+18)}}).sort((e,t)=>e.suffix.localeCompare(t.suffix)):[]}(e);return{controls:t.filter(e=>["switch","input_boolean","number","select","button"].includes(e.domain)),info:t.filter(e=>["sensor","binary_sensor","update"].includes(e.domain)),all:t}}function ye(e){return{contentPicture:`image.${ce}${e}_content_picture`,contentTitle:`sensor.${ce}${e}_content_title`,tagValid:`sensor.${ce}${e}_tag_valid`,volumeDb:`sensor.${ce}${e}_volume_db`,volumeLevel:`sensor.${ce}${e}_volume_level`,contentAudioId:`sensor.${ce}${e}_content_audio_id`,charger:`binary_sensor.${ce}${e}_charger`,volumeDown:`event.${ce}${e}_volume_down`,volumeUp:`event.${ce}${e}_volume_up`}}customElements.define("teddy-card-editor",class extends ne{static get properties(){return{hass:{},config:{},_availableDevices:{type:Array},_selectedEntity:{type:String}}}constructor(){super(),this.config={toniebox_id:"",toniebox_name:"",language:"en",entity_source:"",show_server:!0,show_details:!1},this._availableDevices=[],this._selectedEntity=""}setConfig(e){this.config={toniebox_id:"",toniebox_name:"",language:"en",entity_source:"",show_server:!0,show_details:!1,...e},this._selectedEntity=this.config.entity_source||"",this._updateAvailableDevices()}connectedCallback(){super.connectedCallback(),this._updateAvailableDevices()}updated(e){super.updated(e),e.has("hass")&&this._updateAvailableDevices()}_updateAvailableDevices(){if(this.hass){const e=function(e){const t=new Map;return e?.states?(Object.keys(e.states).forEach(e=>{if(!pe(e))return;const i=he(e);i&&(t.has(i)||t.set(i,{id:i,entities:[],name:null,sampleEntity:e}),t.get(i).entities.push(e))}),t.forEach((t,i)=>{const o=e.states[t.sampleEntity];t.name=_e(o,i)}),t):t}(this.hass);this._availableDevices=Array.from(e.values())}}get _toniebox_id(){return this.config?.toniebox_id||""}get _toniebox_name(){return this.config?.toniebox_name||""}get _language(){return this.config?.language||"en"}get _entity_source(){return this.config?.entity_source||""}get _show_server(){return!1!==this.config?.show_server}get _show_details(){return!0===this.config?.show_details}_switchChanged(e){const t=e.target.configValue;t&&this._updateConfig({...this.config,[t]:e.target.checked})}_onEntitySelect(e){const t=e.target.value;if(this._selectedEntity=t,t&&this.hass)try{const e=function(e,t){const i=he(t);if(!i)throw new Error("Invalid entity selected - cannot extract Toniebox ID");return{entity_source:t,toniebox_id:i,toniebox_name:_e(e.states[t],i)}}(this.hass,t);if(console.debug("Auto config from entity:",e),e&&"object"==typeof e){const t={...this.config||{language:"en"},...e,language:this._language};console.debug("Final config to update:",t),this._updateConfig(t)}else console.warn("Invalid autoConfig received:",e)}catch(e){console.error("Could not create config from entity:",e)}else if(!t){const e={...this.config,entity_source:"",toniebox_id:"",toniebox_name:""};this._updateConfig(e)}}_valueChanged(e){if(!this.config||!this.hass)return;const t=e.target,i=t.configValue,o=t.value;if(this[`_${i}`]===o)return;const s={...this.config};i&&(""===o||void 0===o?delete s[i]:s[i]=o),this._updateConfig(s)}_updateConfig(e){if(!e||"object"!=typeof e)return void console.error("Cannot update with invalid config:",e);const t={language:"en"};Object.keys(e).forEach(i=>{void 0!==e[i]&&(t[i]=e[i])}),console.debug("Updating config:",t),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_renderEntityConfig(){const e=(t=this.hass,t?.states?Object.keys(t.states).filter(e=>pe(e)).map(e=>{const i=t.states[e],o=he(e);return{value:e,label:`${_e(i,o)} (${i.attributes?.friendly_name||e})`,boxId:o}}).sort((e,t)=>e.label.localeCompare(t.label)):[]);var t;return j`
      <div class="entity-config">
        <div class="form-group">
          <ha-select
            label="${le("config.entity_source",this._language)}"
            .value=${this._selectedEntity}
            @selected=${this._onEntitySelect}
            helper-text="${le("config.entity_source_description",this._language)}"
          >
            <mwc-list-item value="">-- Select Entity --</mwc-list-item>
            ${e.map(e=>j`
              <mwc-list-item value="${e.value}">
                ${e.label}
              </mwc-list-item>
            `)}
          </ha-select>
        </div>

        ${this._selectedEntity?j`
          <div class="auto-detected-info">
            <h4>${le("config.entity_validation",this._language)}</h4>
            ${this._renderEntityValidation()}
          </div>
        `:""}
      </div>
    `}_renderEntityValidation(){if(!this._toniebox_id)return j`<div class="no-validation">Select an entity to validate</div>`;const e=function(e,t){const i=["contentPicture","contentTitle","charger","volumeLevel"],o=ve(e,t),s=ye(t),n=[],r=[];return i.forEach(e=>{o[e]?r.push({key:e,entityId:o[e]}):n.push({key:e,entityId:s[e]||e})}),{valid:0===n.length,missing:n,available:r,discovered:o.all,totalExpected:i.length,foundCount:r.length}}(this.hass,this._toniebox_id),t=e.discovered||[];return j`
      <div class="entity-validation">
        ${e.valid?j`
          <ha-alert alert-type="success">
            ${le("config.entities_all_found",this._language)}
          </ha-alert>
        `:j`
          <ha-alert alert-type="warning">
            ${le("config.entities_missing",this._language,{count:e.missing.length,total:e.totalExpected})}
          </ha-alert>
        `}

        <div class="discovered">
          <h5>${t.length} entities</h5>
          <ul>
            ${t.map(e=>j`
              <li><code>${e.entityId}</code></li>
            `)}
          </ul>
        </div>
      </div>
    `}render(){return this.hass?j`
      <div class="card-config">
        ${this._renderEntityConfig()}

        <div class="form-group">
          <ha-select
            label="${le("config.language",this._language)}"
            .value=${this._language}
            .configValue=${"language"}
            @selected=${this._valueChanged}
            helper-text="${le("config.language_description",this._language)}"
          >
            <mwc-list-item value="en">English</mwc-list-item>
            <mwc-list-item value="de">Deutsch</mwc-list-item>
          </ha-select>
        </div>

        <div class="form-group switch-row">
          <ha-switch
            .checked=${this._show_server}
            .configValue=${"show_server"}
            @change=${this._switchChanged}
          ></ha-switch>
          <div>
            <div class="switch-label">${le("config.show_server",this._language)}</div>
            <div class="switch-help">${le("config.show_server_description",this._language)}</div>
          </div>
        </div>

        <div class="form-group switch-row">
          <ha-switch
            .checked=${this._show_details}
            .configValue=${"show_details"}
            @change=${this._switchChanged}
          ></ha-switch>
          <div>
            <div class="switch-label">${le("config.show_details",this._language)}</div>
            <div class="switch-help">${le("config.show_details_description",this._language)}</div>
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
    `:j``}static get styles(){return n`
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
    `}});const be="0.4.0";console.info(`%c TEDDY-CARD %c v${be} `,"color: white; font-weight: bold; background: #03a9f4","color: white; font-weight: bold; background: #606060");class xe extends ne{static get properties(){return{hass:{},config:{},_serverExpanded:{state:!0},_failedImageUrl:{state:!0}}}constructor(){super(),this.config={language:"en",entity_source:"",toniebox_id:"",toniebox_name:"",show_server:!0,show_details:!1},this._serverExpanded=!1,this._failedImageUrl=null}static getConfigElement(){return document.createElement("teddy-card-editor")}static getStubConfig(){return{entity_source:"",language:"en",show_server:!0,show_details:!1}}setConfig(e){const t={...e};if(t.entity_source){const e=he(t.entity_source);e&&(t.toniebox_id=e)}t.entity_source||t.toniebox_id||console.log("Card needs configuration - please select an entity or enter Toniebox ID"),this.config={language:"en",show_server:!0,show_details:!1,...t},this._updateAutoDetectedName()}updated(e){super.updated(e),e.has("hass")&&this._updateAutoDetectedName()}_updateAutoDetectedName(){if(!this.hass||!this.config?.entity_source||this.config.toniebox_name)return;const e=this.hass.states[this.config.entity_source];if(!e)return;const t=_e(e,this.config.toniebox_id);t!==this.config.toniebox_name&&(this.config={...this.config,toniebox_name:t},this.requestUpdate())}getCardSize(){return this.config?.show_server?8:5}get _lang(){return this.config?.language||"en"}_state(e){return e?this.hass.states[e]:void 0}_format(e){if(!e)return null;if(["unknown","unavailable","none",""].includes(e.state))return null;if("function"==typeof this.hass.formatEntityState)try{return this.hass.formatEntityState(e)}catch(e){}const t=e.attributes?.unit_of_measurement;return t?`${e.state} ${t}`:e.state}_label(e,t){const i=e?.attributes?.friendly_name;if(i){const e=i.replace(/^TeddyCloud Server\s*/i,"").replace(/^TeddyCloud Box \w+\s*/i,"").replace(/^TeddyCloud\s*/i,"").trim();if(e)return e.charAt(0).toUpperCase()+e.slice(1)}const o=(t||"").replace(/_/g," ").trim();return o?o.charAt(0).toUpperCase()+o.slice(1):t}_showMoreInfo(e){if(!e)return;const t=new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0});this.dispatchEvent(t)}_toggle(e,t){t?.stopPropagation();const i=e.split(".")[0];this.hass.callService(i,"toggle",{entity_id:e})}_chapterText(e){const t=this._state(e.chapter),i=this._format(t);if(i)return i;const o=this._state(e.contentTitle)?.attributes||{},s=[o.chapter_title,o.chapter,o.current_chapter,o.track_title,o.track,o.episode].find(e=>null!=e&&""!==e);if(void 0===s)return null;const n=o.chapter_count??o.chapters_total??(Array.isArray(o.chapters)?o.chapters.length:void 0);return"number"==typeof s&&n?`${s} / ${n}`:String(s)}_renderCover(e){const t=this._state(e.contentPicture),i=t?.attributes?.entity_picture;return i&&this._failedImageUrl!==i?j`
      <div class="cover">
        <img
          src="${i}"
          alt=""
          @error=${()=>{this._failedImageUrl=i}}
        />
      </div>
    `:j`
        <div class="cover cover-empty">
          <ha-icon icon="mdi:teddy-bear"></ha-icon>
        </div>
      `}_renderHero(e){const t=this._lang,i=this._state(e.contentTitle),o=this._format(i),s=this._chapterText(e),n=this._format(this._state(e.contentSeries)),r=this._state(e.contentPicture),a=r?.attributes?.entity_picture,l=a&&this._failedImageUrl!==a?a:null;return j`
      <div class="hero">
        ${l?j`<div class="hero-backdrop" style="background-image:url('${l}')"></div>`:""}
        <div class="hero-inner">
          ${this._renderCover(e)}
          <div class="now" @click=${()=>this._showMoreInfo(e.contentTitle)}>
            <div class="eyebrow">${n||le(o?"now_playing":"no_content",t)}</div>
            <div class="now-title">${o||le("no_content",t)}</div>
            ${s?j`
              <div class="now-chapter">
                <ha-icon icon="mdi:playlist-music"></ha-icon>
                <span>${le("chapter",t)} · ${s}</span>
              </div>
            `:""}
          </div>
        </div>
      </div>
    `}_renderBattery(e){const t=this._lang,i=this._state(e.battery),o=this._state(e.charger),s="on"===o?.state,n=Number(i?.state),r=Number.isFinite(n)&&"%"===i?.attributes?.unit_of_measurement?Math.max(0,Math.min(100,n)):null;let a="ok";s?a="charging":null!==r&&r<=20?a="low":null!==r&&r<=40&&(a="warn");const l=s?"mdi:battery-charging":null===r?"mdi:battery-unknown":"mdi:battery"+(r>=95?"":"-"+10*Math.max(1,Math.round(r/10))),c=this._format(i)||le(s?"on_charger":"off_charger",t),d=le(s?"charging":i?"battery":"charging_station",t);return j`
      <div
        class="stat stat-${a}"
        @click=${()=>this._showMoreInfo(e.battery||e.charger)}
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
    `}_renderVolume(e){const t=this._lang,i=this._state(e.volumeLevel),o=this._state(e.volumeDb),s=Number(i?.state),n=Number(i?.attributes?.min??0),r=Number(i?.attributes?.max??3),a=Number.isFinite(r)&&r>n?r-n+1:4,l=Number.isFinite(s)?s-n+1:0,c=this._format(o),d=Number.isFinite(s)?`${s}${Number.isFinite(r)?` / ${r}`:""}`:"–";return j`
      <div class="stat" @click=${()=>this._showMoreInfo(e.volumeLevel||e.volumeDb)}>
        <ha-icon icon="${l<=1?"mdi:volume-low":l>=a?"mdi:volume-high":"mdi:volume-medium"}"></ha-icon>
        <div class="stat-body">
          <span class="stat-value">${d}${c?j` <em>${c}</em>`:""}</span>
          <span class="stat-caption">${le("volume",t)}</span>
        </div>
        <div class="steps">
          ${Array.from({length:a},(e,t)=>j`
            <span class="${t<l?"on":""}"></span>
          `)}
        </div>
      </div>
    `}_renderDetailRow(e,t,i){const o=this._state(e);return o?j`
      <div class="detail-row" @click=${()=>this._showMoreInfo(e)}>
        <ha-icon icon="${i}"></ha-icon>
        <span class="detail-name">${t}</span>
        <span class="detail-state">${this._format(o)??"–"}</span>
      </div>
    `:""}_renderDetails(e){if(!this.config?.show_details)return"";const t=this._lang;return j`
      <div class="details">
        ${this._renderDetailRow(e.tagValid,le("tag_uid",t),"mdi:tag")}
        ${this._renderDetailRow(e.contentAudioId,le("content_audio_id",t),"mdi:identifier")}
        ${this._renderDetailRow(e.volumeDown,le("small_ear_quieter",t),"mdi:ear-hearing-off")}
        ${this._renderDetailRow(e.volumeUp,le("big_ear_louder",t),"mdi:ear-hearing")}
        ${this._renderDetailRow(e.lastSeen,"Last seen","mdi:clock-outline")}
      </div>
    `}_renderServerControl(e){const t=this._state(e.entityId);if(!t)return"";const i=["switch","input_boolean"].includes(e.domain);return j`
      <div class="server-control" @click=${()=>this._showMoreInfo(e.entityId)}>
        <span class="server-control-name">${this._label(t,e.suffix)}</span>
        ${i?j`
          <ha-switch
            .checked=${"on"===t.state}
            @click=${t=>this._toggle(e.entityId,t)}
          ></ha-switch>
        `:j`<span class="detail-state">${this._format(t)??"–"}</span>`}
      </div>
    `}_renderServerInfo(e){const t=this._state(e.entityId);if(!t)return"";const i="binary_sensor"===e.domain?"on"===t.state?le("server.online",this._lang):le("server.offline",this._lang):this._format(t)??"–";return j`
      <div class="server-tile" @click=${()=>this._showMoreInfo(e.entityId)}>
        <span class="tile-label">${this._label(t,e.suffix)}</span>
        <span class="tile-value">${i}</span>
      </div>
    `}_renderServer(){if(!this.config?.show_server)return"";const e=this._lang,{controls:t,info:i}=me(this.hass);if(!t.length&&!i.length)return j`
        <div class="section">
          <h3>${le("server.heading",e)}</h3>
          <div class="empty">${le("server.no_entities",e)}</div>
        </div>
      `;const o=this._serverExpanded?i:i.slice(0,6);return j`
      <div class="section">
        <h3>
          <ha-icon icon="mdi:server-network"></ha-icon>
          ${le("server.heading",e)}
        </h3>

        ${i.length?j`
          <div class="server-grid">
            ${o.map(e=>this._renderServerInfo(e))}
          </div>
          ${i.length>6?j`
            <button class="link-button" @click=${()=>{this._serverExpanded=!this._serverExpanded}}>
              ${le(this._serverExpanded?"server.show_less":"server.show_all",e)}
              (${i.length})
            </button>
          `:""}
        `:""}

        ${t.length?j`
          <div class="server-controls">
            ${t.map(e=>this._renderServerControl(e))}
          </div>
        `:""}
      </div>
    `}render(){if(!this.config||!this.hass)return j``;const e=this._lang;if(!this.config.toniebox_id)return j`
        <ha-card>
          <div class="setup">
            <ha-icon icon="mdi:teddy-bear"></ha-icon>
            <div>
              <h3>TeddyCloud</h3>
              <p>${le("errors.not_configured",e)}</p>
            </div>
          </div>
        </ha-card>
      `;const t=ve(this.hass,this.config.toniebox_id),i=this._state(t.charger),o="on"===i?.state;return j`
      <ha-card>
        <div class="header">
          <span class="box-name">${this.config.toniebox_name||`Toniebox ${this.config.toniebox_id}`}</span>
          ${i?j`
            <span class="pill ${o?"pill-charging":""}">
              <ha-icon icon="${o?"mdi:power-plug":"mdi:power-plug-off"}"></ha-icon>
              ${le(o?"on_charger":"off_charger",e)}
            </span>
          `:""}
        </div>

        ${this._renderHero(t)}

        <div class="stats">
          ${this._renderBattery(t)}
          ${this._renderVolume(t)}
        </div>

        ${this._renderDetails(t)}
        ${this._renderServer()}
      </ha-card>
    `}static get styles(){return n`
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

      .pill {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
        padding: 4px 10px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
        background: var(--divider-color);
      }

      .pill-charging {
        color: var(--success-color, #4caf50);
        background: color-mix(in srgb, var(--success-color, #4caf50) 18%, transparent);
      }

      .pill ha-icon {
        --mdc-icon-size: 15px;
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

      /* ---------------------------------------------------------- server */

      .section {
        border-top: 1px solid var(--divider-color);
        padding-top: var(--teddy-gap);
      }

      .section h3 {
        display: flex;
        align-items: center;
        gap: 6px;
        margin: 0 0 10px 0;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
      }

      .section h3 ha-icon {
        --mdc-icon-size: 18px;
      }

      .server-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        gap: 8px;
      }

      .server-tile {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 10px;
        border-radius: 12px;
        background: var(--secondary-background-color);
        cursor: pointer;
        min-width: 0;
      }

      .tile-label {
        font-size: 11px;
        color: var(--secondary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .tile-value {
        font-size: 15px;
        font-weight: 600;
        color: var(--primary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .server-controls {
        margin-top: 10px;
      }

      .server-control {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 6px 4px;
        border-bottom: 1px solid var(--divider-color);
        cursor: pointer;
      }

      .server-control:last-child {
        border-bottom: none;
      }

      .server-control-name {
        font-size: 14px;
        color: var(--primary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .link-button {
        margin-top: 8px;
        padding: 0;
        border: none;
        background: none;
        font: inherit;
        font-size: 13px;
        color: var(--primary-color);
        cursor: pointer;
      }

      .empty {
        font-size: 14px;
        color: var(--secondary-text-color);
        font-style: italic;
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
    `}}customElements.define("teddy-card",xe),window.customCards=window.customCards||[],window.customCards.push({type:"teddy-card",name:"TeddyCloud Toniebox Card",description:"A custom card for displaying TeddyCloud Toniebox information",version:be});export{xe as TeddyCard};
