Reuters.namespace("Reuters.tns");Reuters.tns.ARTICLE_ASSET_TYPE="a";Reuters.tns.VIDEO_ASSET_TYPE="v";Reuters.tns.SLIDESHOW_ASSET_TYPE="s";Reuters.tns.CHANNEL_ASSET_TYPE="c";Reuters.tns.RECENT_CHANNEL_ASSET_TYPE="d";Reuters.tns.RECENT_CHANNEL_ASSET_MAX_LENGTH=3;Reuters.tns.RIC_ASSET_TYPE="r";Reuters.tns.RIC_ASSET_MAX_LENGTH=9;Reuters.tns.ASSET_MAX_LENGTH_UNREGISTERED=9;Reuters.tns.ASSET_MAX_LENGTH_REGISTERED=50;
Reuters.tns.ASSET_TYPES=[Reuters.tns.ARTICLE_ASSET_TYPE,Reuters.tns.VIDEO_ASSET_TYPE,Reuters.tns.SLIDESHOW_ASSET_TYPE,Reuters.tns.CHANNEL_ASSET_TYPE,Reuters.tns.RECENT_CHANNEL_ASSET_TYPE,Reuters.tns.RIC_ASSET_TYPE];Reuters.tns.fadeSaveTimer=null;Reuters.tns.hideSaveTimer=null;Reuters.tns.TNS_DOMAIN="http://js."+window.location.hostname;Reuters.tns.CUSTOM_ASSETS_URL="/tools/jsonCustomHeadlines?jsobjectvar=Reuters.tns.assets";Reuters.tns.TNS_GET_URL=Reuters.tns.TNS_DOMAIN+"/tracknsave?get=1";
Reuters.tns.TNS_PUT_URL=Reuters.tns.TNS_DOMAIN+"/tracknsave?put=1";Reuters.tns.TNS_PDF_GEN_GET_URL=Reuters.tns.TNS_DOMAIN+"/pdfgen/pdfgen_listener.php";for(var i=0;i<Reuters.tns.ASSET_TYPES.length;i++)Reuters.namespace("Reuters.tns.assets."+Reuters.tns.ASSET_TYPES[i]);document.write('<script src="/resources_v2/js/tracker_activityStream.js" type="text/javascript"><\/script>');
Reuters.tns.initialize=function(){if(!Reuters.lang.isNotEmpty(Reuters.NO_TNS)||!Reuters.NO_TNS)Reuters.tns.CURRENT_USER=new Reuters.tns.User,Reuters.tns.CURRENT_USER.setUserId(),Reuters.utils.addLoadEvent(Reuters.tns.CURRENT_USER._getJSONSavedAssets,Reuters.tns.CURRENT_USER),Reuters.utils.addLoadEvent(Reuters.tns.drawTrackbar)};
Reuters.tns.initializeSilently=function(){Reuters.tns.CURRENT_USER=new Reuters.tns.User;Reuters.tns.CURRENT_USER.setUserId();Reuters.utils.addLoadEvent(Reuters.tns.CURRENT_USER._getJSONSavedAssets,Reuters.tns.CURRENT_USER)};
Reuters.tns.addSaveButton=function(){for(var a=document.getElementsByTagName("a"),b=0;b<a.length;b++)if(Reuters.lang.isNotEmpty(a[b].href)&&(a[b].parentNode.nodeName.toLowerCase()=="h1"||a[b].parentNode.nodeName.toLowerCase()=="h2"||a[b].parentNode.nodeName.toLowerCase()=="h3"||a[b].parentNode.nodeName.toLowerCase()=="h4"||a[b].parentNode.nodeName.toLowerCase()=="h5"||a[b].parentNode.nodeName.toLowerCase()=="h6"||a[b].parentNode.nodeName.toLowerCase()=="li")&&a[b].parentNode.getAttribute("tns")!=
"no"){var d=Reuters.tns.extractStoryBitsFromLink(a[b]);Reuters.lang.isNotEmpty(d)&&(Reuters.tns.assets[d.type][d.id]=d,a[b].setAttribute("tnsStoryId",d.id),a[b].setAttribute("tnsStoryType",d.type),a[b].setAttribute("tnsStoryHeadline",d.headline),YAHOO.util.Event.addListener(a[b],"mouseover",Reuters.tns.showSaveButton),YAHOO.util.Event.addListener(a[b],"mouseout",Reuters.tns.hideSaveButton))}};
Reuters.tns.getMousePosition=function(a){var b=0,d=0;if(!a)a=window.event;if(a.pageX||a.pageY)b=a.pageX,d=a.pageY;else if(a.clientX||a.clientY)b=a.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,d=a.clientY+document.body.scrollTop+document.documentElement.scrollTop;return{x:b,y:d}};
Reuters.tns.showSaveButton=function(a){Reuters.tns.keepSaveButton();var b=false;document.getElementById("tnsSaver")?document.getElementById("tnsSaver").getAttribute("storyId")!=this.getAttribute("tnsStoryId")&&(Reuters.tns.destroySaveButton(),b=true):b=true;if(b){a=Reuters.tns.getMousePosition(a);b=document.createElement("div");b.className="saveTrack";var d=Reuters.tns.CURRENT_USER.getSavedAssets();b.setAttribute("storyId",this.getAttribute("tnsStoryId"));b.setAttribute("assetType",this.getAttribute("tnsStoryType"));
b.setAttribute("storyHeadline",this.getAttribute("tnsStoryHeadline"));b.id="tnsSaver";b.style.cssText="top:"+(a.y-34)+"px; left:"+(a.x+26)+"px;";b.setAttribute("hrefClone",this.getAttribute("href"));document.body.insertBefore(b,document.getElementById("header"));var e=document.createElement("span");e.innerHTML="Save";e.className="hrefClone";e.style.cssText="z-index: 2; width: 49px; text-align: center; position: absolute; top: 5px; left: 0";e.setAttribute("storyId",this.getAttribute("tnsStoryId"));
e.setAttribute("assetType",this.getAttribute("tnsStoryType"));e.setAttribute("storyHeadline",this.getAttribute("tnsStoryHeadline"));for(j=0;j<d.length;j++)if(this.getAttribute("tnsStoryId")==d[j].id){e.innerHTML="Saved";b.className="saveTrack saved";Reuters.tns.hideSaveTimer=setTimeout(Reuters.tns.isAlreadySaved,2200);break}c=document.createElement("div");c.style.cssText="height: 36px; width: 49px; z-index: 1; position: absolute; top: 0; left: 0;";c.setAttribute("hrefClone",this.getAttribute("href"));
b.appendChild(e);b.appendChild(c);YAHOO.util.Event.addListener(c,"click",Reuters.tns.clickThroughAnyway);YAHOO.util.Event.addListener(e,"click",Reuters.tns.storyLinkClicked);YAHOO.util.Event.addListener(b,"mouseover",Reuters.tns.keepSaveButton);YAHOO.util.Event.addListener(b,"mouseout",Reuters.tns.hideSaveButton);YAHOO.util.Event.addListener(this,"mousemove",Reuters.tns.resetMousePosition);Reuters.tns.activatedButton=this;Reuters.tns.lastButtonPosition={x:a.x,y:a.y};Reuters.tns.currentButtonPosition=
{x:a.x,y:a.y};Reuters.tns.fadeSaveTimer=setTimeout(Reuters.tns.readySaveButton,500)}};Reuters.tns.clickThroughAnyway=function(){if(this.getAttribute("hrefClone")!=null&&this.getAttribute("hrefClone")!=void 0)location.href=this.getAttribute("hrefClone")};Reuters.tns.isAlreadySaved=function(){try{document.getElementById("tnsSaver").className.search(/saved/)!=-1&&Reuters.tns.hideSaveButton()}catch(a){}};
Reuters.tns.readySaveButton=function(){Math.abs(Reuters.tns.lastButtonPosition.x-Reuters.tns.currentButtonPosition.x)<5&&Math.abs(Reuters.tns.lastButtonPosition.y-Reuters.tns.currentButtonPosition.y)<5?(YAHOO.util.Event.removeListener(Reuters.tns.activatedButton,"mousemove"),document.getElementById("tnsSaver").style.cssText="top:"+(Reuters.tns.lastButtonPosition.y-36)+"px; left:"+(Reuters.tns.lastButtonPosition.x-26)+"px;",Reuters.tns.fadeSaveTimer=setTimeout(Reuters.tns.fadeSaveButton,700)):(Reuters.tns.lastButtonPosition=
Reuters.tns.currentButtonPosition,Reuters.tns.fadeSaveTimer=setTimeout(Reuters.tns.readySaveButton,500))};Reuters.tns.resetMousePosition=function(a){a=Reuters.tns.getMousePosition(a);Reuters.tns.currentButtonPosition={x:a.x,y:a.y}};Reuters.tns.fadeSaveButton=function(){saverFader=new YAHOO.util.ColorAnim("tnsSaver",{opacity:{from:0,to:100}},15,YAHOO.util.Easing.easeOut);saverFader.animate()};
Reuters.tns.keepSaveButton=function(){YAHOO.util.Event.removeListener(Reuters.tns.activatedButton,"mousemove");clearTimeout(Reuters.tns.hideSaveTimer)};Reuters.tns.hideSaveButton=function(){Reuters.tns.hideSaveTimer=setTimeout(Reuters.tns.destroySaveButton,500)};Reuters.tns.destroySaveButton=function(){clearTimeout(Reuters.tns.fadeSaveTimer);document.getElementById("tnsSaver")!=null&&document.body.removeChild(document.getElementById("tnsSaver"))};Reuters.tns.requestPDF=function(a){Reuters.tns.CURRENT_USER.getRequestPDF(a)};
Reuters.tns.queuedPDF=function(a){alert("Brian said that the PDF status is "+a)};
Reuters.tns.storyLinkClicked=function(){if(this.innerHTML!="Saved"){var a=Reuters.tns.CURRENT_USER.getSavedAssetCount();if(a<Reuters.tns.ASSET_MAX_LENGTH_UNREGISTERED&&Reuters.utils.isLoggedIn()==false||Reuters.utils.isLoggedIn()==true&&a<Reuters.tns.ASSET_MAX_LENGTH_REGISTERED){var a=this.getAttribute("storyId"),b=this.getAttribute("assetType"),d=this.getAttribute("storyHeadline");this.innerHTML="Saved";this.parentNode.className="saveTrack saved";Reuters.tns.CURRENT_USER.saveAsset(b,a);typeof dcsMultiTrack!=
"undefined"&&dcsMultiTrack("DCSext.DartZone","","DCSext.ModID","","DCSext.ModImp","0","DCSext.VirtualEvent","1","DCSext.rChannel","Track and Save","WT.cg_n","Track and Save - Save Item","WT.cg_s","Save Item","DCSext.ContentID",a,"DCSext.ContentHeadline",d);Reuters.tns.showSavedAction()}else Reuters.tns.showUnregisteredSavedAction();Reuters.tns.hideSaveTimer=setTimeout(Reuters.tns.isAlreadySaved,100)}};Reuters.tns.STORY_LINK_REGEX=/\/article\/((.*)(\/))?id(.*)/;Reuters.tns.SLIDESHOW_LINK_REGEX=/\/news\/pictures\/slideshow\?articleId=.*/;
Reuters.tns.VIDEO_LINK_REGEX=/\/news\/video\/.*\?videoId=.*/;
Reuters.tns.extractStoryBitsFromLink=function(a){var b=Reuters.tns.STORY_LINK_REGEX.exec(a.href);if(b)return{type:b&&b[4].length>10?"a":"s",id:b[4],headline:a.innerHTML,href:a.href};if(b=Reuters.tns.SLIDESHOW_LINK_REGEX.exec(a.href))if(b=Reuters.utils.getQueryStringParameter(b[0],"articleId"))return{type:"s",id:b,headline:a.innerHTML,href:a.href};if(b=Reuters.tns.VIDEO_LINK_REGEX.exec(a.href))if(b=Reuters.utils.getQueryStringParameter(b[0],"videoId"))return{type:"v",id:b,headline:a.innerHTML,href:a.href}};
Reuters.tns.setUserInfo=function(a){Reuters.tns.CURRENT_USER.setUserInfo.apply(Reuters.tns.CURRENT_USER,arguments)};
Reuters.tns.otherStuff=function(){Reuters.tns._keys="GOODNEWSEVERYONE";Reuters.tns._keyIdx=0;document.onkeyup=function(a){try{console.debug("evt: %s",a)}catch(b){}a=window.event?event.keyCode:a.keyCode;a=String.fromCharCode(a);try{console.debug("keyCode: %s",a)}catch(d){}if(a==Reuters.tns._keys.charAt(Reuters.tns._keyIdx)){try{console.debug("keyCode: %s",a)}catch(e){}Reuters.tns._keyIdx++;try{console.debug("keyIdx: %s",Reuters.tns._keyIdx)}catch(f){}if(Reuters.tns._keyIdx>=Reuters.tns._keys.length){a=
document.getElementById("track-login");if(!Reuters.utils.isLoggedIn())a.innerHTML='<span class="hrefClone" onclick="Reuters.utils.login();"><img src="/resources_v2/images/alien/login.png" /></span>&nbsp;<img src="/resources_v2/images/alien/or.png" />&nbsp;<a href="https://commerce.us.reuters.com/registration/pages/registration/begin.do?registrationLoginUrl=/login/pages/login/login.do?go=http://betaus.idevus.g3.reuters.com/"><img src="/resources_v2/images/alien/register.png" /></a>';document.getElementById("btnMyTopics").innerHTML=
'<img src="/resources_v2/images/alien/latestfrommytopics.png" />';document.getElementById("btnSavedItems").innerHTML='<span class="trackbarCount" id="savedItemsCount">'+Reuters.tns.CURRENT_USER.getSavedAssetCount()+'</span><img src="/resources_v2/images/alien/saveditems.png" />';if(a=document.getElementById("btnRecentCompanies"))a.innerHTML='<span class="trackbarCount" id="recentCompaniesCount">'+Reuters.tns.CURRENT_USER.getRecentCompanies().length+'</span><img src="/resources_v2/images/alien/recentcompanies.png" />';
if(a=document.getElementById("btnSuggested")){var g=document.getElementById("suggestedCount").innerHTML;a.innerHTML='<span class="trackbarCount" id="suggestedCount">'+g+'</span><img src="/resources_v2/images/alien/suggestedforyou.png" />'}if(a=document.getElementById("logoLink"))a.innerHTML='<img border="0" alt="Reuters" src="/resources_v2/images/alien/logo.gif"/>';if((a=document.getElementById("editions"))&&a.children[0])a.children[0].innerHTML='<img border="0" alt="EDITION" src="/resources_v2/images/alien/edition.png" />';
if(a=document.getElementById("currentedition"))a.innerHTML='<img border="0" alt="U.S." src="/resources_v2/images/alien/currentEdition.png"/>';if(a=document.getElementById("MenuItem_1"))a.innerHTML=Reuters.info.edition=="BETAUS"?'<span class="hrefClone"></span>':'<span class="hrefClone '+Reuters.info.edition+'"></span>';if(a=document.getElementById("MenuItem_2"))a.innerHTML='<span class="hrefClone"></span>';if(a=document.getElementById("MenuItem_3"))a.innerHTML='<span class="hrefClone "></span>';if((a=
document.getElementById("utilities"))&&a.children[0]){if(a.children[0].children[0]&&a.children[0].children[0].children[0])a.children[0].children[0].children[0].innerHTML='<img border="0" alt="Login" src="/resources_v2/images/alien/login_header.png" />';if(a.children[0].children[1]&&a.children[0].children[1].children[0])a.children[0].children[1].children[0].innerHTML='<img border="0" alt="Register" src="/resources_v2/images/alien/register_header.png" />'}if(a=document.getElementById("searchbuttonNav"))a.src=
"/resources_v2/images/alien/btn_header_go.gif"}}else Reuters.tns._keyIdx=0}};Reuters.tns.User=function(){this.userAssetsArray=this.userAssetsPiecesArray=this.userId=null;this.mergeStatus="none";this.userInfoListeners=[]};var RTU=Reuters.tns.User;
RTU.prototype.setUserId=function(){this.userId=this.getUserId();if(Reuters.lang.isEmpty(this.userId))this._setDataSource("cookie");else{var a="https://commerce.us.reuters.com/services/secureuserdata?key="+encodeURIComponent(this.userId)+"&callback=Reuters.tns.setUserInfo";a+="&refreshUrlTimestamp="+(new Date).getTime();Reuters.utils.loadScript("userInfoLoader",a);a=this._getDataSource();if(Reuters.lang.isNotEmpty(a)&&a=="cookie")this.mergeStatus="merging",this._mergeAssets();this._setDataSource("tracknsave")}};
RTU.prototype.getUserId=function(){var a=this._getUserId();return Reuters.lang.isNotEmpty(a)?a:null};RTU.prototype.getUserInfo=function(){return this.userInfo};RTU.prototype.addUserInfoListener=function(a){this.userInfoListeners.push(a)};RTU.prototype.setUserInfo=function(a){try{console.debug("listeners: %o",this.userInfoListeners)}catch(b){}this.userInfo=a;for(var d=0;d<this.userInfoListeners.length;d++)this.userInfoListeners[d](a)};
RTU.prototype.saveAsset=function(a,b){var d=Reuters.tns.assets[a][b];if(Reuters.lang.isNotEmpty(d))return this.userAssetsArray[d.type].pushUnique(d.id),this._saveJSONandCookieAssets()};
RTU.prototype.getSavedAssets=function(){for(var a=[],b=Reuters.lang.isNotEmpty(this.userAssetsPiecesArray)&&this.userAssetsPiecesArray.length>0?this.userAssetsPiecesArray:this._getSavedCookieAssetPieces(),d=0;d<b.length;d++){var e=b[d];e.type!=Reuters.tns.CHANNEL_ASSET_TYPE&&e.type!=Reuters.tns.RECENT_CHANNEL_ASSET_TYPE&&e.type!=Reuters.tns.RIC_ASSET_TYPE&&(e=Reuters.tns.assets[e.type][e.id],Reuters.lang.isNotEmpty(e)&&a.push(e))}return a};
RTU.prototype.getSavedAssetCount=function(){for(var a=Reuters.lang.isNotEmpty(this.userAssetsPiecesArray)&&this.userAssetsPiecesArray.length>0?this.userAssetsPiecesArray:this._getSavedCookieAssetPieces(),b=0,d=0;d<a.length;d++){var e=a[d];e.type!=Reuters.tns.CHANNEL_ASSET_TYPE&&e.type!=Reuters.tns.RECENT_CHANNEL_ASSET_TYPE&&e.type!=Reuters.tns.RIC_ASSET_TYPE&&b++}return b};
RTU.prototype.getSavedAssetsByType=function(a){for(var b=[],d=Reuters.lang.isNotEmpty(this.userAssetsPiecesArray)&&this.userAssetsPiecesArray.length>0?this.userAssetsPiecesArray:this._getSavedCookieAssetPieces(),e=0;e<d.length;e++){var f=d[e],g=Reuters.tns.assets[f.type][f.id];Reuters.lang.isNotEmpty(g)&&f.type==a&&b.push(g)}return b};
RTU.prototype.removeSavedAsset=function(a,b){Reuters.lang.isNotEmpty(this.userAssetsArray)&&this.userAssetsArray[a].length>0&&Reuters.lang.Arrays.remove(this.userAssetsArray[a],b+"");this._saveJSONandCookieAssets()};
RTU.prototype.getUnloadedAssets=function(){var a=this.userAssetsArray;if(Reuters.lang.isNotEmpty(a))for(var b=0;b<Reuters.tns.ASSET_TYPES.length;b++)for(var d=Reuters.tns.ASSET_TYPES[b],e=0;e<a[d].length;e++){var f=a[d][e];Reuters.lang.isEmpty(Reuters.tns.assets[d][f])&&YAHOO.util.Connect.asyncRequest("GET",Reuters.tns.CUSTOM_ASSETS_URL+"&"+d+"id="+f,{success:function(a){eval(a.responseText)}})}};RTU.prototype.getRecentCompanies=function(){return this.userAssetsArray[Reuters.tns.RIC_ASSET_TYPE]};
RTU.prototype.saveRecentCompany=function(a){this.userAssetsArray[Reuters.tns.RIC_ASSET_TYPE].pushUnique(a);this.userAssetsArray[Reuters.tns.RIC_ASSET_TYPE].length>Reuters.tns.RIC_ASSET_MAX_LENGTH&&(this.userAssetsArray[Reuters.tns.RIC_ASSET_TYPE].reverse(),this.userAssetsArray[Reuters.tns.RIC_ASSET_TYPE].pop(),this.userAssetsArray[Reuters.tns.RIC_ASSET_TYPE].reverse());this._saveJSONandCookieAssets();return this.userAssetsArray[Reuters.tns.RIC_ASSET_TYPE].length};RTU.prototype.getSavedTopicIds=function(){return this.userAssetsArray[Reuters.tns.CHANNEL_ASSET_TYPE]};
RTU.prototype.getSavedTopics=function(){return this.getSavedAssetsByType(Reuters.tns.CHANNEL_ASSET_TYPE)};
RTU.prototype.saveTopic=function(a,b,d){this.userAssetsArray[Reuters.tns.CHANNEL_ASSET_TYPE].pushUnique(a+"");Reuters.tns.assets[Reuters.tns.CHANNEL_ASSET_TYPE][a]={type:Reuters.tns.CHANNEL_ASSET_TYPE,id:a,channel:b,title:d};typeof dcsMultiTrack!="undefined"&&dcsMultiTrack("DCSext.DartZone","","DCSext.ModID","","DCSext.ModImp","0","DCSext.VirtualEvent","1","DCSext.rChannel","Track and Save","WT.cg_n","Track and Save - Follow Topic","WT.cg_s","Follow Topic","DCSext.ContentChannel",b);this._saveJSONandCookieAssets();
Reuters.tns.showTopicsAction(d);Reuters.activityStream.followTopic(d,location.href);return this.userAssetsArray[Reuters.tns.CHANNEL_ASSET_TYPE].length};RTU.prototype.getRecentTopicIds=function(){return this.userAssetsArray[Reuters.tns.RECENT_CHANNEL_ASSET_TYPE]};RTU.prototype.getRecentTopics=function(){return this.getSavedAssetsByType(Reuters.tns.RECENT_CHANNEL_ASSET_TYPE)};
RTU.prototype.rememberRecentTopic=function(a,b,d){this.userAssetsArray[Reuters.tns.RECENT_CHANNEL_ASSET_TYPE].pushUnique(a+"");Reuters.tns.assets[Reuters.tns.RECENT_CHANNEL_ASSET_TYPE][a]={type:Reuters.tns.RECENT_CHANNEL_ASSET_TYPE,id:a,channel:b,title:d};this.userAssetsArray[Reuters.tns.RECENT_CHANNEL_ASSET_TYPE].length>Reuters.tns.RECENT_CHANNEL_ASSET_MAX_LENGTH&&(this.userAssetsArray[Reuters.tns.RECENT_CHANNEL_ASSET_TYPE].reverse(),this.userAssetsArray[Reuters.tns.RECENT_CHANNEL_ASSET_TYPE].pop(),
this.userAssetsArray[Reuters.tns.RECENT_CHANNEL_ASSET_TYPE].reverse());this._saveJSONandCookieAssets();return this.userAssetsArray[Reuters.tns.RECENT_CHANNEL_ASSET_TYPE].length};
RTU.prototype._getSavedCookieAssetPieces=function(){var a=YAHOO.util.Cookie.getSub("tns","value");this.userAssetsArray=[];for(var b=0;b<Reuters.tns.ASSET_TYPES.length;b++)this.userAssetsArray[Reuters.tns.ASSET_TYPES[b]]=[];this.userAssetsPiecesArray=[];a=Reuters.lang.isNotEmpty(a)?a.split(","):[];for(b=0;b<a.length;b++){var d=a[b].split(":");this.userAssetsArray[d[0]].push(d[1])}this._refreshUserAssetsPiecesArray();this.getUnloadedAssets();return this.userAssetsPiecesArray};
RTU.prototype.generateCookieString=function(){var a="";if(Reuters.lang.isNotEmpty(this.userAssetsPiecesArray))for(var b=0;b<this.userAssetsPiecesArray.length;b++){var d=this.userAssetsPiecesArray[b];a+=b!=0?",":"";a+=d.type+":"+d.id}return a};
RTU.prototype._saveCookieAssetsArray=function(){var a=this.generateCookieString(),b=new Date;b.toGMTString();b.setFullYear(b.getFullYear()+1);b.toGMTString();b.toGMTString();if(Reuters.lang.isNotEmpty(a)&&a!="")return YAHOO.util.Cookie.setSub("tns","value",a,{path:"/",expires:b}),a.split(",").length;YAHOO.util.Cookie.setSub("tns","value","",{path:"/",expires:new Date("January 12, 2025")})};RTU.prototype._getUserId=function(){return YAHOO.util.Cookie.get("customerId")};
RTU.prototype._setDataSource=function(a){var b=new Date;b.setYear(b.getYear()+1);YAHOO.util.Cookie.setSub("tns","dataSource",a,{path:"/",expires:new Date("January 12, 2025")})};RTU.prototype._getDataSource=function(){return YAHOO.util.Cookie.getSub("tns","dataSource")};RTU.prototype._loadJSON=function(a){try{console.debug("url: %s",a)}catch(b){}var d=document.getElementsByTagName("head")[0],e=document.createElement("script");e.type="text/javascript";e.src=a;d.appendChild(e)};
RTU.prototype._processJSON=function(a){if(!Reuters.lang.isEmpty(a))if(a=eval("("+decodeURIComponent(a)+")"),Reuters.lang.isNotEmpty(a.value)){for(var a=a.value.split(","),b=0;b<a.length;b++){var d=a[b].split(":");this.userAssetsArray[d[0]].pushUnique(d[1])}this._refreshUserAssetsPiecesArray();this._saveCookieAssetsArray();this.getUnloadedAssets();Reuters.tns.updateSavedItems()}else Reuters.lang.isNotEmpty(a.Status)};
RTU.prototype._getJSONSavedAssets=function(){try{console.debug("_getJSONSavedAssets: userId: %s",this.userId)}catch(a){}if(Reuters.lang.isNotEmpty(this.userId))if(this.mergeStatus!="merging"){this.userAssetsArray=[];for(var b=0;b<Reuters.tns.ASSET_TYPES.length;b++)this.userAssetsArray[Reuters.tns.ASSET_TYPES[b]]=[];this.userAssetsPiecesArray=[];this._loadJSON(Reuters.tns.TNS_GET_URL+"&callback=Reuters.tns.CURRENT_USER._processJSON")}else this.mergeStatus="done"};
RTU.prototype._saveJSONAssetsArray=function(){if(Reuters.lang.isNotEmpty(this.userId)){var a=this.generateCookieString();this._loadJSON(Reuters.lang.isNotEmpty(a)&&a!=""?Reuters.tns.TNS_PUT_URL+"&value='{%22value%22:%22"+a+"%22}'&callback=Reuters.tns.CURRENT_USER._processJSON":Reuters.tns.TNS_PUT_URL+"&value='{%22value%22:%22%22}'&callback=Reuters.tns.CURRENT_USER._processJSON");this._refreshUserAssetsPiecesArray()}};
RTU.prototype._refreshUserAssetsPiecesArray=function(){this.userAssetsPiecesArray=[];for(var a=0;a<Reuters.tns.ASSET_TYPES.length;a++)for(var b=0;b<this.userAssetsArray[Reuters.tns.ASSET_TYPES[a]].length;b++)this.userAssetsPiecesArray.pushUnique({type:Reuters.tns.ASSET_TYPES[a],id:this.userAssetsArray[Reuters.tns.ASSET_TYPES[a]][b]})};RTU.prototype._saveJSONandCookieAssets=function(){this._refreshUserAssetsPiecesArray();Reuters.lang.isNotEmpty(this.userId)&&this._saveJSONAssetsArray();return this._saveCookieAssetsArray()};
RTU.prototype._mergeAssets=function(){Reuters.lang.isNotEmpty(this.userId)&&(this._getSavedCookieAssetPieces(),this._loadJSON(Reuters.tns.TNS_GET_URL+"&callback=Reuters.tns.CURRENT_USER._processAndMergeJSON"))};
RTU.prototype._processAndMergeJSON=function(a){if(!Reuters.lang.isEmpty(a)){a=eval("("+decodeURIComponent(a)+")");if(Reuters.lang.isNotEmpty(a.value))for(var a=a.value.split(","),b=0;b<a.length;b++){var d=a[b].split(":");this.userAssetsArray[d[0]].pushUnique(d[1])}else Reuters.lang.isNotEmpty(a.Status);this._refreshUserAssetsPiecesArray();this._saveJSONAssetsArray();this._saveCookieAssetsArray();this.getUnloadedAssets();Reuters.tns.updateSavedItems()}};
RTU.prototype.getRequestPDF=function(a){try{console.debug("requesting pdf")}catch(b){}a=Reuters.tns.TNS_PDF_GEN_GET_URL+"?userid="+encodeURIComponent(this.getUserId())+"&aid="+encodeURIComponent(a.join(","))+"&callback=Reuters.tns.CURRENT_USER._processRequestPDFResponse";try{console.debug("url: %s",a)}catch(d){}this._loadJSON(a)};
RTU.prototype._processRequestPDFResponse=function(a){try{console.debug("jsonObject: %o",a)}catch(b){}Reuters.lang.isEmpty(a)||(a.response.success?alert("Please check your email shortly for PDF of your request"):alert("Error processing your request. Please try again.\n"+a.errors[0]))};RTU=null;delete RTU;
