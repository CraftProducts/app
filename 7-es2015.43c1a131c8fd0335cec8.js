(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"Y+n1":function(t,e,c){"use strict";c.r(e),c.d(e,"TemplatesModule",(function(){return st}));var i=c("ofXK"),s=c("3Pt+"),a=c("tyNb"),r=c("1kSV"),n=c("+1ss"),o=c("Tzox"),l=c("6NWb"),d=c("l2bN"),u=c("kt0X"),p=c("snw9");const m={LoadTemplates:Object(o.i)("[LoadTemplates]"),LoadTemplatesFailed:Object(o.i)("[LoadTemplates] Failed"),LoadTemplatesSuccess:Object(o.i)("[LoadTemplates] Success"),LoadFile:Object(o.i)("[LoadFile]")};class f{constructor(t){this.payload=t,this.type=m.LoadTemplates}}class b{constructor(t){this.payload=t,this.type=m.LoadFile}}function h(t,e){switch(e.type){case m.LoadTemplatesSuccess:return Object.assign(Object.assign({},t),{list:e.payload});default:return t}}const g={list:null};var y=c("mrSG"),v=c("LRne"),T=c("eIep"),L=c("lJxs"),O=c("JIr8"),j=c("fXoL");let w=(()=>{class t{constructor(t,e){this.actions$=t,this.templateService=e,this.loadTemplates=this.actions$.pipe(Object(p.d)(m.LoadTemplates),Object(T.a)(t=>this.templateService.loadTemplates().pipe(Object(L.a)(t=>({type:m.LoadTemplatesSuccess,payload:t})),Object(O.a)(()=>Object(v.a)({type:m.LoadTemplatesFailed})))))}}return t.\u0275fac=function(e){return new(e||t)(j.lc(p.a),j.lc(o.f))},t.\u0275prov=j.Tb({token:t,factory:t.\u0275fac}),Object(y.b)([Object(p.b)()],t.prototype,"loadTemplates",void 0),t})();var F=c("CpTu"),J=c("Z0Cl"),x=c("G3A0"),$=function(t){return t!=t},I=c("5WsY"),k=c("8M4i"),C=c("/1FC"),V=c("EUcb"),P=c("fshX"),S=c("twO/"),X=c("mkut"),q=Math.max,G=function(t,e,c,i){var s;t=Object(I.a)(t)?t:null==(s=t)?[]:function(t,e){return Object(S.a)(e,(function(e){return t[e]}))}(s,Object(X.a)(s)),c=c&&!i?Object(P.a)(c):0;var a=t.length;return c<0&&(c=q(a+c,0)),function(t){return"string"==typeof t||!Object(C.a)(t)&&Object(V.a)(t)&&"[object String]"==Object(k.a)(t)}(t)?c<=a&&t.indexOf(e,c)>-1:!!a&&function(t,e,c){return e==e?function(t,e,c){for(var i=c-1,s=t.length;++i<s;)if(t[i]===e)return i;return-1}(t,e,c):Object(x.a)(t,$,c)}(t,e,c)>-1},Y=c("pLZG"),U=c("ZR4k"),M=c("7zfz");function R(t,e){1&t&&(j.dc(0,"div"),j.Yb(1,"fa-icon",5),j.Vc(2," loading... "),j.cc()),2&t&&(j.Jb(1),j.yc("spin",!0))}const W=function(t){return{"bg-white":t}},E=function(t,e){return{group:t,code:e}};function N(t,e){if(1&t&&(j.dc(0,"li",34),j.dc(1,"a",35),j.Vc(2),j.cc(),j.cc()),2&t){const t=e.$implicit,c=j.rc(2).$implicit,i=j.rc(3);j.yc("ngClass",j.Cc(3,W,i.selectedCode===t.code)),j.Jb(1),j.yc("queryParams",j.Dc(5,E,c.code,t.code)),j.Jb(1),j.Xc(" ",t.title," ")}}function z(t,e){if(1&t&&(j.dc(0,"ul",32),j.Tc(1,N,3,8,"li",33),j.cc()),2&t){const t=j.rc().$implicit;j.Jb(1),j.yc("ngForOf",t.list)}}function D(t,e){if(1&t&&(j.dc(0,"div",29),j.dc(1,"h6",30),j.Vc(2),j.cc(),j.Tc(3,z,2,1,"ul",31),j.cc()),2&t){const t=e.$implicit;j.Jb(2),j.Xc("",t.title," "),j.Jb(1),j.yc("ngIf",t.list&&t.list.length>0)}}function H(t,e){if(1&t&&(j.dc(0,"div",25),j.dc(1,"div",26),j.dc(2,"div",27),j.Tc(3,D,4,2,"div",28),j.cc(),j.cc(),j.cc()),2&t){const t=j.rc(2);j.Jb(3),j.yc("ngForOf",t.details.groups)}}function Z(t,e){1&t&&(j.dc(0,"a",39),j.Yb(1,"fa-icon",40),j.cc())}function A(t,e){if(1&t&&(j.dc(0,"div",36),j.Tc(1,Z,2,0,"a",37),j.dc(2,"h6",38),j.Vc(3),j.cc(),j.dc(4,"small",30),j.Vc(5),j.cc(),j.cc()),2&t){const t=j.rc(2);j.Jb(1),j.yc("ngIf",t.selectedCode),j.Jb(2),j.Wc(t.selectedGroup.title),j.Jb(2),j.Wc(t.selectedGroup.summary)}}function B(t,e){if(1&t&&j.Yb(0,"img",47),2&t){const t=j.rc().$implicit,e=j.rc(3);j.yc("src",e.templateFileLocation+"/"+t.thumbnail,j.Oc)}}const K=function(t,e){return[t,e]},Q=function(){return{view:"intro"}};function _(t,e){if(1&t&&(j.dc(0,"a",42),j.dc(1,"h6",43),j.Vc(2),j.cc(),j.dc(3,"div",44),j.Tc(4,B,1,1,"img",45),j.dc(5,"div",46),j.dc(6,"ngx-md"),j.Vc(7),j.sc(8,"truncate"),j.cc(),j.cc(),j.cc(),j.cc()),2&t){const t=e.$implicit,c=j.rc(3);j.yc("routerLink",j.Dc(10,K,c.redirectTo,t.code))("queryParams",j.Bc(13,Q))("title",t.title),j.Jb(2),j.Xc("",t.title," "),j.Jb(2),j.yc("ngIf",t.thumbnail),j.Jb(3),j.Wc(j.vc(8,6,t.summary,125,"..."))}}function tt(t,e){if(1&t&&(j.bc(0),j.Tc(1,_,9,14,"a",41),j.ac()),2&t){const t=j.rc(2);j.Jb(1),j.yc("ngForOf",t.filteredList)}}function et(t,e){if(1&t&&(j.dc(0,"div",48),j.Yb(1,"fa-icon",49),j.Vc(2," No templates registered yet. "),j.dc(3,"div",50),j.dc(4,"a",51),j.Vc(5," learn here "),j.Yb(6,"fa-icon",23),j.cc(),j.cc(),j.cc()),2&t){const t=j.rc(2);j.Jb(4),j.yc("href",t.documentationUrl,j.Oc)}}function ct(t,e){if(1&t){const t=j.ec();j.dc(0,"div",6),j.Tc(1,H,4,1,"div",7),j.dc(2,"div",8),j.dc(3,"div",9),j.dc(4,"h1",10),j.Vc(5),j.cc(),j.dc(6,"div",11),j.Yb(7,"ngx-md",12),j.cc(),j.Tc(8,A,6,3,"div",13),j.dc(9,"div",14),j.dc(10,"div",15),j.dc(11,"h6",16),j.Vc(12,"Use custom template"),j.cc(),j.dc(13,"div",17),j.dc(14,"div",18),j.Vc(15," Can't find a template? Use your own template. "),j.dc(16,"div",19),j.dc(17,"sharedlib-load-localfile",20),j.pc("fileLoaded",(function(e){return j.Mc(t),j.rc().onTemplateFileLoaded(e)}))("error",(function(e){return j.Mc(t),j.rc().onFileLoadingError(e)})),j.cc(),j.cc(),j.dc(18,"div",21),j.dc(19,"a",22),j.Vc(20," learn here "),j.Yb(21,"fa-icon",23),j.cc(),j.cc(),j.cc(),j.cc(),j.cc(),j.Tc(22,tt,2,1,"ng-container",3),j.Tc(23,et,7,1,"div",24),j.cc(),j.cc(),j.cc(),j.cc()}if(2&t){const t=j.rc();j.Jb(1),j.yc("ngIf",t.details.groups&&t.details.groups.length>0),j.Jb(4),j.Xc(" ",t.details.title," "),j.Jb(2),j.yc("data",t.details.summary),j.Jb(1),j.yc("ngIf",t.selectedGroup),j.Jb(11),j.yc("href",t.documentationUrl,j.Oc),j.Jb(3),j.yc("ngIf",t.filteredList&&t.filteredList.length>0),j.Jb(1),j.yc("ngIf",!t.filteredList||0===t.filteredList.length)}}const it=[{path:"",component:(()=>{class t{constructor(t,e,c,i,s){this.store$=t,this.router=e,this.activatedRoute=c,this.messageService=i,this.isCollapsed=!0,this.redirectTo="/",this.templateFileLocation="",this.documentationUrl="",this.onFileLoadingError=t=>this.messageService.add({severity:"error",detail:"Error:"+t,life:5e3,closable:!0});const a=F.a(s,{key:"templates"});this.templateFileLocation=a?""+a.value:"";const r=F.a(s,{key:"documentation"});this.documentationUrl=r?""+r.value:""}ngOnInit(){this.store$.dispatch(new f(null)),this.queryParams$=this.activatedRoute.queryParams.subscribe(t=>{this.selectedType=t.group,this.selectedCode=t.code,this.populateFilteredGroup()}),this.redirectTo$=this.activatedRoute.data.pipe(Object(Y.a)(t=>t.redirectTo&&t.redirectTo.length>0),Object(L.a)(t=>t.redirectTo)).subscribe(t=>this.redirectTo="/"+t),this.details$=this.store$.select(t=>t.templates.list).pipe(Object(Y.a)(t=>t)).subscribe(t=>{this.details=t,this.populateFilteredGroup()})}ngOnDestroy(){this.params$&&this.params$.unsubscribe(),this.queryParams$&&this.queryParams$.unsubscribe(),this.redirectTo$&&this.redirectTo$.unsubscribe(),this.details$&&this.details$.unsubscribe()}onTemplateFileLoaded(t){t&&t.content&&(t.type="template",t.content=Object(U.load)(t.content)),this.store$.dispatch(new b(t))}populateFilteredGroup(){if(this.selectedGroup=null,this.details)if(this.selectedCode&&this.selectedType&&this.details.groups){const t=F.a(this.details.groups,{code:this.selectedType});t&&t.list&&(this.selectedGroup=F.a(t.list,{code:this.selectedCode}),this.filteredList=J.a(this.details.templates,t=>G(t[this.selectedType],this.selectedCode)))}else this.filteredList=this.details.templates}}return t.\u0275fac=function(e){return new(e||t)(j.Xb(u.h),j.Xb(a.d),j.Xb(a.a),j.Xb(M.c),j.Xb(o.b))},t.\u0275cmp=j.Rb({type:t,selectors:[["app-templates-list"]],decls:5,vars:2,consts:[[1,"main-container"],[1,"body-container"],[1,"container-fluid"],[4,"ngIf"],["class","row  mt-4",4,"ngIf"],["icon","spinner","aria-hidden","true",3,"spin"],[1,"row","mt-4"],["class","col-md-2",4,"ngIf"],[1,"col-md-8"],[1,"text-center"],[1,"mb-3"],[1,"pb-4"],[3,"data"],["class","alert alert-secondary rounded-0 text-left m-3 border-0","style","border-left: solid 3px #aaa!important;",4,"ngIf"],[1,"clearfix","d-flex","justify-content-center","flex-wrap"],[1,"m-2","card","select-card","custom-shadow","alert-primary"],[1,"bg-light","border-bottom","p-3","card-title"],[1,"p-2"],[1,"small"],[1,"m-2"],["errorMessage","Invalid file. System only supports CraftProduct compliant YAML files.","label","Open template file","accept","application/x-yaml","icon","upload","cssClass","btn-sm btn-primary",3,"fileLoaded","error"],[1,"text-right"],["target","blank",3,"href"],["icon","angle-right",1,"ml-1"],["class","m-2 select-card custom-shadow alert-warning pt-5",4,"ngIf"],[1,"col-md-2"],[1,"mt-5","pt-5"],[1,"alert"],["class","",4,"ngFor","ngForOf"],[1,""],[1,"text-muted"],["class","small list-unstyled",4,"ngIf"],[1,"small","list-unstyled"],["class","p-1",3,"ngClass",4,"ngFor","ngForOf"],[1,"p-1",3,"ngClass"],["routerLink","/templates","queryParamsHandling","merge",1,"text-dark",3,"queryParams"],[1,"alert","alert-secondary","rounded-0","text-left","m-3","border-0",2,"border-left","solid 3px #aaa!important"],["routerLink","/templates","class","text-muted float-right",4,"ngIf"],[1,"mb-0"],["routerLink","/templates",1,"text-muted","float-right"],["icon","times"],["queryParamsHandling","merge","class","m-2 card select-card custom-shadow text-center","style","overflow: hidden;",3,"routerLink","queryParams","title",4,"ngFor","ngForOf"],["queryParamsHandling","merge",1,"m-2","card","select-card","custom-shadow","text-center",2,"overflow","hidden",3,"routerLink","queryParams","title"],[1,"bg-light","border-bottom","p-3","card-title","text-truncate","mb-0"],[1,"p-3"],[3,"src",4,"ngIf"],[1,"card-text","small","text-left"],[3,"src"],[1,"m-2","select-card","custom-shadow","alert-warning","pt-5"],["icon","exclamation-triangle"],[1,"text-right","mt-2","small"],["target","blank",1,"btn","btn-link","btn-sm",3,"href"]],template:function(t,e){1&t&&(j.dc(0,"div",0),j.dc(1,"div",1),j.dc(2,"div",2),j.Tc(3,R,3,1,"div",3),j.Tc(4,ct,24,7,"div",4),j.cc(),j.cc(),j.cc()),2&t&&(j.Jb(3),j.yc("ngIf",!e.details),j.Jb(1),j.yc("ngIf",e.details))},directives:[i.m,l.a,d.a,o.c,i.l,i.k,a.e],pipes:[n.b],encapsulation:2}),t})()}];let st=(()=>{class t{}return t.\u0275mod=j.Vb({type:t}),t.\u0275inj=j.Ub({factory:function(e){return new(e||t)},imports:[[i.c,s.c,a.f,r.f,n.a,o.e,l.c,d.b,u.j.forFeature("templates",h,{initialState:g}),p.c.forFeature([w]),a.f.forChild(it)]]}),t})()}}]);