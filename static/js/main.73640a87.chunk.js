(this["webpackJsonpphotoframe-react"]=this["webpackJsonpphotoframe-react"]||[]).push([[0],{33:function(t,e,n){},34:function(t,e,n){"use strict";n.r(e);var a=n(1),r=n(0),i=n(9),c=n.n(i),o=n(21),s=n(6),u=n(2),d=n.n(u),l=n(5),p=n(4),h=n(16),f=n.n(h),b=Object(r.createContext)();function j(t){var e=Object(r.useState)(),n=Object(p.a)(e,2),i=n[0],c=n[1],u=Object(r.useState)(),h=Object(p.a)(u,2),j=h[0],v=h[1],g=Object(r.useRef)(),m=Object(r.useState)(),O=Object(p.a)(m,2),y=O[0],x=O[1],w=Object(r.useState)([]),_=Object(p.a)(w,2),C=_[0],k=_[1],S=function(){var t=Object(l.a)(d.a.mark((function t(e,n){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.send({"@type":"sendMessage",chat_id:e,reply_to_message_id:0,input_message_content:{"@type":"inputMessageText",text:{"@type":"formattedText",text:n,entities:[]}}}));case 1:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),I=function(){var t=Object(l.a)(d.a.mark((function t(){var e,n,a,r=arguments;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=r.length>0&&void 0!==r[0]?r[0]:"9223372036854775807",n=r.length>1&&void 0!==r[1]?r[1]:0,a=r.length>2&&void 0!==r[2]?r[2]:50,t.abrupt("return",i.send({"@type":"getChats",chat_list:{"@type":"chatListMain"},offset_order:e,offset_chat_id:n,limit:a}));case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),z=function(){var t=Object(l.a)(d.a.mark((function t(e){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",i.send({"@type":"getChat",chat_id:e}));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),E=function(){var t=Object(l.a)(d.a.mark((function t(e){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.send({"@type":"downloadFile",file_id:e,priority:1,synchronous:!0});case 2:return t.abrupt("return",i.send({"@type":"readFile",file_id:e}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),L=Object(r.useCallback)((function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:100;i&&i.send({"@type":"getChatHistory",chat_id:t,limit:n,from_message_id:e}).then((function(t){return k((function(e){return Object(s.a)(new Set([].concat(Object(s.a)(t.messages),Object(s.a)(e)))).sort((function(t,e){return t.date-e.date}))}))}))}),[i]),P=Object(r.useCallback)((function(t){"updateAuthorizationState"===t["@type"]&&x(t),"updateNewMessage"!==t["@type"]&&"updateDeleteMessages"!==t["@type"]||function(t){var e;switch(t["@type"]){case"updateNewMessage":(null===t||void 0===t||null===(e=t.message)||void 0===e?void 0:e.chat_id)===g.current&&k((function(e){return[].concat(Object(s.a)(e),[null===t||void 0===t?void 0:t.message])}));break;case"updateDeleteMessages":t.chat_id===g.current&&t.message_ids.forEach(function(){var t=Object(l.a)(d.a.mark((function t(e){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:k((function(t){return t.filter((function(t){return t.id!==e}))}));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}}(t)}),[]);return Object(r.useEffect)((function(){console.log("Initializing tdlib");var t=new f.a({useTestDC:!1,readOnly:!1,verbosity:3,jsVerbosity:3,fastUpdating:!0,useDatabase:!1,mode:"wasm"});t.onUpdate=P,c(t)}),[P]),Object(r.useEffect)((function(){i&&i.send({"@type":"setTdlibParameters",parameters:{"@type":"tdParameters",use_test_dc:!1,api_id:"10726",api_hash:"f896fe83f2e0a25b99b44c9aad2421f3",system_language_code:navigator.language||"en",device_model:"Telegram Frame",application_version:"0.1",use_secret_chats:!1,use_message_database:!1,use_file_database:!1,files_directory:"/"}})}),[i]),Object(r.useEffect)((function(){function t(){return(t=Object(l.a)(d.a.mark((function t(){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.send({"@type":"getChats",chat_list:{"@type":"chatListMain"},offset_order:"9223372036854775807",offset_chat_id:j,limit:1});case 2:L(j);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}i&&j&&(g.current=j,function(){t.apply(this,arguments)}())}),[i,j,L]),Object(a.jsx)(b.Provider,Object(o.a)({value:{client:i,chatId:j,setChatId:v,event:y,history:C,getChat:z,getChats:I,getChatHistory:L,sendTextMessage:S,downloadFile:E}},t))}function v(){var t=Object(r.useContext)(b);if(void 0===t)throw new Error("useTdlib must be used within a TelegramProvider");return t}var g=n(3),m=n(17),O=n.n(m),y=n.p+"static/media/tg_logo.eea735da.png",x=g.a.div({display:"grid",placeItems:"center",height:600,backgroundColor:"rgba(238, 243, 246, 0.8)"});function w(t){var e=t.event,n=v().client,i=Object(r.useRef)();return Object(r.useEffect)((function(){function t(){return(t=Object(l.a)(d.a.mark((function t(){var a,r;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=e.authorization_state["@type"],t.t0=a,t.next="authorizationStateClosed"===t.t0?4:"authorizationStateWaitEncryptionKey"===t.t0?8:"authorizationStateWaitPhoneNumber"===t.t0?11:"authorizationStateWaitOtherDeviceConfirmation"===t.t0?14:18;break;case 4:return t.next=6,n.send({"@type":"destroy"});case 6:return window.location.reload(),t.abrupt("break",19);case 8:return t.next=10,n.send({"@type":"checkDatabaseEncryptionKey"});case 10:return t.abrupt("break",19);case 11:return t.next=13,n.send({"@type":"requestQrCodeAuthentication",other_user_ids:[]});case 13:return t.abrupt("break",19);case 14:return r=new O.a({width:400,height:400,data:e.authorization_state.link,image:y,dotsOptions:{color:"#25abec",type:"square"},backgroundOptions:{color:"transparent"},imageOptions:{crossOrigin:"anonymous",margin:20}}),i.current.innerHTML="",r.append(i.current),t.abrupt("break",19);case 18:return t.abrupt("break",19);case 19:case"end":return t.stop()}}),t)})))).apply(this,arguments)}n&&(null===e||void 0===e?void 0:e.authorization_state)&&function(){t.apply(this,arguments)}()}),[n,e]),Object(a.jsxs)(x,{children:[Object(a.jsx)("h1",{children:"Login with your device"}),Object(a.jsx)("div",{ref:i})]})}var _=n(7);function C(t){var e=t.fileId,n=t.render,a=v().downloadFile,i=Object(r.useState)(),c=Object(p.a)(i,2),o=c[0],s=c[1];return Object(r.useEffect)((function(){var t=!0;function n(){return(n=Object(l.a)(d.a.mark((function n(){var r;return d.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(e){n.next=2;break}return n.abrupt("return");case 2:return n.next=4,a(e);case 4:r=n.sent,t&&s(URL.createObjectURL(r.data));case 6:case"end":return n.stop()}}),n)})))).apply(this,arguments)}return function(){n.apply(this,arguments)}(),function(){return t=!1}}),[e,a]),n&&n({blob:o})}var k=g.a.div.withConfig({displayName:"RoundChatPicture",componentId:"sc-1urxdss-0"})((function(t){var e=t.size,n=void 0===e?100:e,a=t.src;return{height:n,width:n,borderRadius:"50%",backgroundImage:"url(".concat(a,")"),backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundColor:"rgba(238, 243, 246, 0.8)"}})),S=g.a.div.withConfig({displayName:"ChatSelection__ListContainer",componentId:"sc-1r1tjet-0"})({scrollDirection:"vertical"}),I=g.a.ul.withConfig({displayName:"ChatSelection__List",componentId:"sc-1r1tjet-1"})({listStyle:"none",margin:0,padding:0}),z=g.a.li.withConfig({displayName:"ChatSelection__Chat",componentId:"sc-1r1tjet-2"})({padding:10,fontSize:"2rem","&:nth-child(odd)":{background:"rgba(238, 243, 246, 0.8)"}});function E(){var t=v(),e=t.client,n=t.getChat,i=t.getChats,c=t.setChatId,o=Object(r.useState)([]),u=Object(p.a)(o,2),h=u[0],f=u[1];return Object(r.useEffect)((function(){function t(){return(t=Object(l.a)(d.a.mark((function t(){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i();case 2:t.sent.chat_ids.map(function(){var t=Object(l.a)(d.a.mark((function t(e){var a;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n(e);case 2:a=t.sent,f((function(t){var n,r;return[].concat(Object(s.a)(t),[{id:e,title:a.title,chatPhotoId:null===a||void 0===a||null===(n=a.photo)||void 0===n||null===(r=n.small)||void 0===r?void 0:r.id}])}));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[e,n,i]),Object(a.jsxs)(S,{children:[Object(a.jsx)("h1",{children:"Select a chat to use as Frame:"}),Object(a.jsx)(I,{children:h.map((function(t){return Object(a.jsx)(z,{onClick:function(e){return c(t.id)},children:Object(a.jsxs)("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"},children:[Object(a.jsx)(C,{fileId:t.chatPhotoId,render:function(t){return Object(a.jsx)(k,{size:100,src:t.blob})}}),Object(a.jsx)("div",{style:{marginLeft:30},children:t.title})]})},t.id)}))})]})}var L=g.a.div.withConfig({displayName:"EmptyChat__Container",componentId:"jss9dm-0"})({display:"grid",placeItems:"center",height:"100vh"}),P=g.a.div.withConfig({displayName:"EmptyChat__Message",componentId:"jss9dm-1"})({fontSize:"2rem"});function N(){var t=v(),e=t.client,n=t.chatId,i=t.getChat,c=t.getChatHistory,o=Object(r.useState)(null),s=Object(p.a)(o,2),u=s[0],h=s[1],f=Object(r.useState)(),b=Object(p.a)(f,2),j=b[0],g=b[1];return Object(r.useEffect)((function(){n&&c&&c(n)}),[n,c]),Object(r.useEffect)((function(){var t=!0;function e(){return(e=Object(l.a)(d.a.mark((function e(){var a,r,c,o;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i(n);case 2:c=e.sent,o=null===c||void 0===c||null===(a=c.photo)||void 0===a||null===(r=a.big)||void 0===r?void 0:r.id,t&&(h(c.title),g(o));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return function(){e.apply(this,arguments)}(),function(){return t=!1}}),[e,n,i]),Object(a.jsxs)(L,{children:[Object(a.jsx)(C,{fileId:j,render:function(t){return Object(a.jsx)(k,{size:400,src:t.blob})}}),Object(a.jsxs)(P,{children:["Send a picture to '",u,"' to view it here"]})]})}var R=g.a.div.withConfig({displayName:"Loading__Overlay",componentId:"sc-1ptxpaf-0"})({display:"grid",placeItems:"center",height:"100%",width:"100%",position:"fixed",top:0,right:0,zIndex:999,backgroundColor:"rgba(238, 243, 246, 0.8)",overflowX:"hidden"}),M=g.a.div.withConfig({displayName:"Loading__Container",componentId:"sc-1ptxpaf-1"})({padding:20,display:"grid",placeItems:"center",backgroundColor:"white",boxShadow:"0 0 16px 0 rgba(51,51,51,0.16)",height:150,width:150,borderRadius:"50%"});function D(t){var e=t.message,n=void 0===e?"Loading...":e;return c.a.createPortal(Object(a.jsx)(R,{children:Object(a.jsx)(M,{children:Object(a.jsx)("div",{children:n})})}),document.getElementById("modal-root"))}var T=n(14),F=g.a.button({padding:10,border:"none",font:"inherit",color:"inherit",backgroundColor:"light-grey",borderRadius:"50%",height:50,width:50,fontSize:"1.5rem",margin:5});function U(t){t.client;var e=t.text,n=t.children,r=v(),i=r.chatId,c=r.sendTextMessage,o=Object(T.a)("/pop-down.mp3",{volume:.25}),s=Object(p.a)(o,1)[0],u=Object(T.a)("/pop-up-on.mp3",{volume:.25}),d=Object(p.a)(u,1)[0];return Object(a.jsx)(F,{onMouseDown:s,onMouseUp:function(t){d(),function(t){c(i,t)}(e)},children:n})}var W=g.a.div.withConfig({displayName:"Slideshow__Container",componentId:"dxjitx-0"})({overflow:"hidden",height:600,width:1024,cursor:"none"}),H=g.a.div.withConfig({displayName:"Slideshow__Picture",componentId:"dxjitx-1"})((function(t){var e=t.blob;return{height:600,backgroundImage:"url(".concat(e,")"),backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover"}})),A=g.a.div.withConfig({displayName:"Slideshow__Caption",componentId:"dxjitx-2"})({position:"relative",top:-60,left:"2%",color:"white",fontSize:"2rem"}),B=g.a.div.withConfig({displayName:"Slideshow__Reactions",componentId:"dxjitx-3"})({position:"relative",top:"-15%",left:"85%",display:"flex",flexDirection:"row"});function K(){var t=v(),e=t.client,n=t.chatId,i=t.history,c=t.getChatHistory,o=t.downloadFile,s=Object(r.useState)(!0),u=Object(p.a)(s,2),h=u[0],f=u[1],b=Object(r.useState)(),j=Object(p.a)(b,2),g=j[0],m=j[1],O=Object(r.useState)(""),y=Object(p.a)(O,2),x=y[0],w=y[1];return Object(r.useEffect)((function(){function t(){return(t=Object(l.a)(d.a.mark((function t(){var e,n,r,c,s,u,l,p,h,b,j,v,g,O;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:f(!0),c=i.filter((function(t){var e;return["messagePhoto","messageVideo"].includes(null===t||void 0===t||null===(e=t.content)||void 0===e?void 0:e["@type"])})),Object(_.isEmpty)(c)&&m(Object(a.jsx)(D,{message:"No media in this chat..."})),s=Object(_.last)(c),t.t0=null===s||void 0===s||null===(e=s.content)||void 0===e?void 0:e["@type"],t.next="messagePhoto"===t.t0?7:"messageVideo"===t.t0?17:26;break;case 7:return u=s.content.photo,l=Object(_.last)(u.sizes),p=l.photo.id,t.next=12,o(p);case 12:return h=t.sent,b=URL.createObjectURL(h.data),m(Object(a.jsx)(H,{"data-testid":p,blob:b})),w(null===(n=s.content)||void 0===n?void 0:n.text),t.abrupt("break",27);case 17:return j=s.content.video,v=j.video.id,t.next=21,o(v);case 21:return g=t.sent,O=URL.createObjectURL(g.data),m(Object(a.jsx)("video",{"data-testid":v,src:O,controls:!0,autoPlay:!0})),w(null===(r=s.content)||void 0===r?void 0:r.text),t.abrupt("break",27);case 26:return t.abrupt("break",27);case 27:f(!1);case 28:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[e,i,n,c,o]),Object(a.jsxs)(W,{children:[h&&Object(a.jsx)(D,{}),g,Object(a.jsx)(A,{children:x}),Object(a.jsxs)(B,{children:[Object(a.jsx)(U,{client:e,text:"\u2665\ufe0f",children:"\u2665\ufe0f"}),Object(a.jsx)(U,{client:e,text:"\ud83e\udd70",children:"\ud83e\udd70"})]})]})}function V(){var t=v(),e=t.chatId,n=t.history;return e?Object(_.isEmpty)(n)?Object(a.jsx)(N,{}):Object(a.jsx)(K,{}):Object(a.jsx)(E,{})}n(32),n(33);var q=function(){var t=v(),e=t.client,n=t.event,r=t.updates;if(!n||!n.authorization_state)return Object(a.jsx)(D,{message:"Loading the app..."});switch(n.authorization_state["@type"]){case"authorizationStateWaitEncryptionKey":case"authorizationStateWaitOtherDeviceConfirmation":case"authorizationStateWaitPhoneNumber":case"updateAuthorizationState":case"authorizationStateClosed":return Object(a.jsx)(w,{event:n,client:e});case"authorizationStateReady":return Object(a.jsx)(V,{updates:r,client:e});default:return null}},J=function(t){t&&t instanceof Function&&n.e(4).then(n.bind(null,36)).then((function(e){var n=e.getCLS,a=e.getFID,r=e.getFCP,i=e.getLCP,c=e.getTTFB;n(t),a(t),r(t),i(t),c(t)}))};c.a.render(Object(a.jsx)(r.StrictMode,{children:Object(a.jsx)(j,{children:Object(a.jsx)(q,{})})}),document.getElementById("root")),J()}},[[34,1,2]]]);
//# sourceMappingURL=main.73640a87.chunk.js.map