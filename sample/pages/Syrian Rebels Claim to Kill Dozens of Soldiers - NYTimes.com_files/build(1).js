NYTD.track=function(){if("dcsMultiTrack" in window){dcsMultiTrack.apply(this,arguments);}else{setTimeout(function(){NYTD.track.apply(this,arguments);},1000);}};NYTD.Facebook={APP_ID:"9869919170",API_KEY:"990e3f5d72ed31535d09dc1a05fb5ddd",CHANNEL:"http://www.nytimes.com/packages/html/facebook/fbchannel.html"};NYTD.Facebook.SDK=(function(){return{load:function(){if(!document.body){setTimeout(arguments.callee,100);}else{var d=document.createElement("div");d.id="fb-root";document.body.insertBefore(d,document.body.firstChild);var e=document.createElement("script");e.src=document.location.protocol+"//connect.facebook.net/en_US/all.js";e.async=true;document.body.insertBefore(e,document.body.firstChild);}},initialize:function(){FB.init({apiKey:NYTD.Facebook.API_KEY,appId:NYTD.Facebook.APP_ID,status:false,cookie:true,xfbml:false,channelUrl:NYTD.Facebook.CHANNEL,oauth:true});}};})();(function(app){app.Cookie={get:function(name){return new RegExp(name+"=([^;]+)").test(unescape(document.cookie))?RegExp.$1:null;},set:function(name,value,options){var newcookie=[escape(name)+"="+escape(value)];if(options){if(options.expires){newcookie.push("expires="+options.expires.toGMTString());}if(options.path){newcookie.push("path="+options.path);}if(options.domain){newcookie.push("domain="+options.domain);}if(options.secure){newcookie.push("secure");}}document.cookie=newcookie.join("; ");}};})(NYTD.Facebook);NYTD.Facebook=NYTD.Facebook||{};NYTD.Facebook.User=(function(){var callbacks=[],head=document.getElementsByTagName("head")[0],meta=new Element("meta",{"name":"WT.z_fbc"}),baseUrl="/svc/timespeople/toolbar/2.0/user/",fbloggedInUrl=baseUrl+"fbloggedin",setEmailFormatUrl=baseUrl+"setemailformat",unlinkUrl=baseUrl+"fbunlink",loginOrigin="";head.appendChild(meta);function notify(value,response){for(var i=0,callback;callback=callbacks[i];i++){callback(value,response);}}function setTrackingMeta(value){meta.content=value;}function processToken(response){var response=JSON.parse(response.responseText);if(response.error_id){switch(response.error_id){case 401:var date=new Date();date.setTime(date.getTime()+31536000000);NYTD.Facebook.Cookie.set("nyt-nofb","0",{domain:".nytimes.com",path:"/",expires:date});notify(false);break;case 402:var date=new Date();date.setTime(date.getTime()+31536000000);NYTD.Facebook.Cookie.set("nyt-nofb","1",{domain:".nytimes.com",path:"/",expires:date});notify(false);break;case 500:notify(false);break;}setTrackingMeta("0");}else{if(response.user.facebook_id){NYTD.Facebook.User.facebook_id=response.user.facebook_id;FB.init({apiKey:NYTD.Facebook.API_KEY,appId:NYTD.Facebook.APP_ID,status:false,cookie:true,xfbml:false,channelUrl:NYTD.Facebook.CHANNEL,oauth:true,authResponse:{uid:response.user.facebook_id,accessToken:response.user.fb_session_key}});notify(true);setTrackingMeta("1");}}}function onCodeSaved(response){NYTD.Facebook.User.unlinked=false;var date=new Date();date.setTime(date.getTime()-31536000000);NYTD.Facebook.Cookie.set("nyt-nofb","0",{domain:".nytimes.com",path:"/",expires:date});var response=JSON.parse(response.responseText);if(response.user&&response.user["new"]){if(response.user.id>0){NYTD.track("WT.z_rconv","FBC");}else{NYTD.track("WT.z_rconv","FBC-Fail");}NYTD.track("WT.z_fb_login","3","DCS.dcsuri","/facebook_regi"+loginOrigin+".html","WT.ti","Facebook Widget Regi","WT.z_fb","1","WT.z_dcsm","1");if(NYTD.Facebook.User.showNewsletterPrefs){NYTD.Facebook.PrefsDialog.open();}}loginOrigin="";}return{showNewsletterPrefs:true,isLoggedIn:function(callback){var session=FB.getAuthResponse();var noFB=NYTD.Facebook.Cookie.get("nyt-nofb");if(session){NYTD.Facebook.User.facebook_id=session.uid;notify(true);setTrackingMeta("1");}else{if(noFB){notify(false);}else{new Ajax.Request(fbloggedInUrl,{method:"get",onSuccess:processToken});}}},login:function(callback,origin){origin=origin?"_"+origin:"";var session=FB.getAuthResponse();if(session){NYTD.Facebook.User.saveCode(session.accessToken,function(response){if(callback&&typeof callback==="function"){callback(response);}notify(true);setTrackingMeta("1");NYTD.track("WT.z_fb_login","1","DCS.dcsuri","/facebook_post_logon"+origin+".html","WT.ti","Facebook Widget Post Logon","WT.z_fb","1","WT.z_dcsm","1");});}else{FB.login(function(response){if(response.authResponse){loginOrigin=origin;NYTD.Facebook.User.saveCode(response.authResponse.accessToken,function(response){if(callback&&typeof callback==="function"){callback(response);}notify(true);setTrackingMeta("1");NYTD.track("WT.z_fb_login","1","DCS.dcsuri","/facebook_post_logon"+origin+".html","WT.ti","Facebook Widget Post Logon","WT.z_fb","1","WT.z_dcsm","1");});}else{notify(false);NYTD.track("WT.z_fb_login","2","DCS.dcsuri","/facebook_post_logon"+origin+".html","WT.ti","Facebook Widget Post Logon","WT.z_fb","1","WT.z_dcsm","1");}},{scope:"offline_access,email,user_about_me,user_birthday,user_education_history,user_groups,user_hometown,user_interests,user_likes,user_location,user_website,user_work_history"});}},register:function(callback){if(callback&&typeof callback==="function"){callbacks.push(callback);}},saveCode:function(code,callback){new Ajax.Request(fbloggedInUrl+"?code="+code,{method:"get",onSuccess:function(response){onCodeSaved(response);callback(response);}});},setEmailFormat:function(queryString){new Ajax.Request(setEmailFormatUrl+"?"+queryString,{method:"get"});},isSelf:function(facebook_id){return NYTD.Facebook.User.facebook_id&&NYTD.Facebook.User.facebook_id==facebook_id;},unlink:function(){if(!NYTD.Facebook.User.unlinked){FB.logout();NYTD.Facebook.User.unlinked=true;new Ajax.Request(unlinkUrl,{method:"get",onSuccess:function(){notify(false);}});}}};})();NYTD.Facebook=NYTD.Facebook||{};NYTD.Facebook.Feeds=(function(){var defaultLimit=3;var knownURLs=[];var knownTitles=[];function handleError(response){switch(response.error_code){case"190":default:NYTD.Facebook.User.unlink();}}function request(method,callback,limit,maxage){var requestObj={method:method,site:"nytimes.com",limit:limit||defaultLimit};if(maxage){requestObj.max_age=maxage;}FB.api(requestObj,function(response){if(response.error_code){handleError(response);return;}callback(response);});}function filterSelf(items){var filteredItems=[];for(var i=0,item;item=items[i];i++){if(NYTD.Facebook.User.isSelf(item.user.id)){continue;}filteredItems.push(item);}return filteredItems;}function dedupe(items){var filteredItems=[];for(var i=0,item;item=items[i];i++){if(item.url in knownURLs){continue;}item.title=item.title.replace(" - NYTimes.com","");if(item.title in knownTitles){continue;}filteredItems.push(item);knownURLs[item.url]=1;knownTitles[item.title]=1;}return filteredItems;}return{getRecommendations:function(callback,limit,maxage){if(FB.getAuthResponse()&&!NYTD.Facebook.User.unlinked){request("recommendations.get",function(items){items=dedupe(items);callback(items);},limit,maxage);}else{this.getDefaultRecommendations(callback);}},getDefaultRecommendations:function(callback,limit){new Ajax.Request("/facebook?format=json",{method:"get",onSuccess:function(response){callback(JSON.parse(response.responseText).slice(0,(limit||defaultLimit)));}});},getActivity:function(callback,limit){limit=limit||defaultLimit;var paddedlimit=limit+3;request("activity.get",function(items){items=dedupe(filterSelf(items));items=items.slice(0,limit);callback(items);},paddedlimit);}};})();if(typeof Object.create!=="function"){Object.create=function(o){function F(){}F.prototype=o;return new F();};}NYTD.Facebook=NYTD.Facebook||{};NYTD.Facebook.BaseController={run:function(){NYTD.Facebook.SDK.initialize();this.patch();},render:function(isLoggedIn){if(isLoggedIn){this.view.renderLoggedIn();this.getLoggedInFeeds();}else{this.view.renderLoggedOut();NYTD.Facebook.Feeds.getRecommendations(function(feed){this.view.updatePopular(feed);}.bind(this),2,2);}},patch:function(){var cColumn=$$(".cColumn").first();if(cColumn){var holder=new Element("div",{"id":"facebookContainer"}).addClassName("columnGroup");if($(document.body).hasClassName("wideAd")){cColumn.insert({bottom:holder});}else{if(!$("FixedPanel")){cColumn.insert({top:holder});}}NYTD.Facebook.User.register(this.render.bind(this));NYTD.Facebook.User.isLoggedIn();}else{setTimeout(this.patch.bind(this),10);}},mergeFeeds:function(){if("activities" in this&&"recommendations" in this){try{if(this.activities.length){var activities=this.activities;var recommendations=this.recommendations;this.view.updateNetwork(activities);this.view.updateRecommendations(recommendations.splice(0,(4-activities.length)));}else{this.view.setHeader("Popular on Facebook");this.view.updatePopular(this.recommendations);}}catch(e){var self=this;NYTD.Facebook.Feeds.getDefaultRecommendations(function(){self.view.setHeader("Popular on Facebook");self.view.updatePopular(self.recommendations);});}}},getLoggedInFeeds:function(){NYTD.Facebook.Feeds.getActivity(function(feed){this.activities=feed;this.mergeFeeds();}.bind(this));NYTD.Facebook.Feeds.getRecommendations(function(feed){this.recommendations=feed;this.mergeFeeds();}.bind(this),4,2);}};NYTD.Facebook.Module=(function(){var recommendationsEl=new Element("div"),activitiesEl=new Element("div"),headerEl=new Element("div");var info="Throughout NYTimes.com, you will see Facebook modules like this one. Log in with Facebook to see what your friends are recommending and make your own recommendations. For details, click &ldquo;What&rsquo;s This?&rdquo; to open the Social Media FAQ.";function activateFacebookButton(){$$(".fb_button").invoke("observe","click",function(event){NYTD.Facebook.User.login();});}function appendTrackingToURL(url,trackingSrc){var retStr=url;if(retStr.indexOf("?")!==-1){retStr+="&";}else{retStr+="?";}retStr+="src="+trackingSrc;return retStr;}return{renderLoggedIn:function(){var container=$("facebookContainer");if(container){var inset=new Element("div").addClassName(NYTD.Facebook.ArticleModuleView?"":"inset");headerEl.update(this.templates.loggedInHeader);inset.insert(headerEl);inset.insert(this.templates.faq);inset.insert(activitiesEl);inset.insert(recommendationsEl);container.removeClassName("loggedOut");container.addClassName("loggedIn");container.update(inset);}},renderLoggedOut:function(){var container=$("facebookContainer");if(container){var inset=new Element("div").addClassName("inset");inset.insert(this.templates.login);headerEl.update(this.templates.loggedOutHeader);inset.insert(headerEl);inset.insert(recommendationsEl);container.removeClassName("loggedIn");container.addClassName("loggedOut");container.update(inset);activateFacebookButton();}},updateNetwork:function(activities){var buffer=new Element("div");for(var i=0,activity;activity=activities[i];i++){activity.url=appendTrackingToURL(activity.url,this.TRACKING_NETWORK);var item=NYTD.Template(this.templates.activity,activity);buffer.insert(item);}activitiesEl.update(buffer.innerHTML);},updateRecommendations:function(activities){recommendationsEl.removeClassName("subColumns").removeClassName("subColumn-2");var buffer=new Element("div");for(var i=0,activity;activity=activities[i];i++){activity.url=appendTrackingToURL(activity.url,this.TRACKING_RECOMMENDATION);activity.img=activity.thumbnail||activity.img;var item=NYTD.Template(this.templates.recommendation,activity);buffer.insert(item);}recommendationsEl.update(buffer.innerHTML);},updatePopular:function(activities){recommendationsEl.addClassName("subColumns").addClassName("subColumn-2");var buffer=new Element("div");for(var i=0,activity;activity=activities[i];i++){activity.url=appendTrackingToURL(activity.url,this.TRACKING_POPULAR);activity.img=activity.thumbnail||activity.img;var item;if(NYTD.Facebook.ArticleModuleView){item='<div class="column '+(i%2?"last":"")+'">'+NYTD.Template(this.templates.popular,activity)+"</div>";}else{item=NYTD.Template(this.templates.popular,activity);}buffer.insert(item);}recommendationsEl.update(buffer.innerHTML);},setHeader:function(header){headerEl.down("h4").update(header);},templates:{login:'        <a class="fb_button fb_button_medium">          <span class="fb_button_text">Log In With Facebook</span>        </a>        <p class="caption">Log in to see what your friends are sharing on nytimes.com.        <span id="fbInfo"><a href="http://www.nytimes.com/privacy">Privacy Policy</a> | <a href="http://www.nytimes.com/packages/html/timespeople/faq/social/" title="'+info+'">What&rsquo;s This?</a></span></p>        <div class="singleRuleDivider"></div>      ',loggedOutHeader:'<h4 class="sectionHeaderHome">What&rsquo;s Popular Now <img class="inTextImage" src="'+NYTD.Hosts.imageHost+'/images/article/functions/facebook.gif"></h4>',loggedInHeader:'<h4 class="sectionHeaderHome">Latest in My Network <img class="inTextImage" src="'+NYTD.Hosts.imageHost+'/images/article/functions/facebook.gif"></h4>',activity:'        <div class="activity">          <% if (user.image) { %>            <img class="userImage" height="25" width="25" src="<%= user.image %>" />          <% } %>          <div class="actor">            <a href="<%= user.href %>"><%= user.name %></a>            <span class="verb"> recommended </span>           </div>           <p><a href="<%= url %>"><%= title %></a></p>        </div>',recommendation:'        <div class="activity">          <div class="verb">Popular Now</div>          <p><a href="<%= url %>"><%= title %></a></p>        </div>',popular:'          <div class="activity">            <% if (img) { %>              <img class="runaroundRight" height="50" width="50" src="<%= img %>" />            <% } %>            <p class="popular"><a href="<%= url %>"><%= title %></a></p>          </div>',faq:'<div id="fbInfo"><a class="meta" href="http://www.nytimes.com/packages/html/timespeople/faq/social/" title="'+info+'">What&rsquo;s This?</a></div>'}};})();$$("head").first().insert(new Element("link",{"rel":"stylesheet","type":"text/css","href":NYTD.Hosts.cssHost+"/css/app/facebook/newsletterPrefs.css"}));NYTD.Facebook.PrefsDialog=(function(){function setEventHandlers(){Event.observe($("facebookNewsletterForm"),"submit",function(e){var queryString=e.element().serialize();NYTD.Facebook.User.setEmailFormat(queryString);NYTD.UPTracker&&NYTD.UPTracker.track({"eventType":"es","data":{"name":"nytupdates","src":"MPS-FBM"}});NYTD.Facebook.PrefsDialog.close();e.stop();});Event.observe($("facebookNewsletterForm"),"reset",function(e){NYTD.Facebook.PrefsDialog.close();e.stop();});}return{element:new Element("div"),open:function(){this.element.update(this.template);document.body.appendChild(this.element);this.open=null;setEventHandlers();},close:function(){this.element.remove();},template:'  <div id="facebookModalBg">    <div id="facebookModal">      <div class="facebookModalBar facebookModalBarTop">&nbsp;</div>      <form id="facebookNewsletterForm">      <div class="facebookModalInner">      <p class="facebookModalText">Thanks for logging in with Facebook and creating an NYTimes.com account!</h1>      <p><strong>Sign up for e-mails from NYTimes.com, exclusively for registered users:</strong></p>      <table cellspacing="0">      <tr>      <td><p>Preferred E-Mail Format:</p></td>      <td>      <label><input type="radio" name="email_format" value="html" checked="checked"></input> HTML (Text and Images)</label>      <label><input type="radio" name="email_format" value="text"></input> Text Only</label>      </td>      </tr>      </table>      </div>      <div class="facebookModalBar">        <div class="inset">        <button type="submit" class="appButton" name="facebookNewsletterSubscribe" value="yes"><span>Yes!</span></button>&nbsp;&nbsp;        <button type="reset" class="appButton" name="facebookNewsletterSubscribe" value="no"><span>No Thanks.</span></button>        </div>      </div>      </div>    </div>  </div>  '};})();$$("head").first().insert(new Element("link",{"rel":"stylesheet","type":"text/css","href":NYTD.Hosts.cssHost+"/css/app/facebook/article.css"}));NYTD.Facebook.ArticleModuleView=NYTD.Facebook.Module;NYTD.Facebook.ArticleModuleView.templates.loggedInHeader=NYTD.Facebook.ArticleModuleView.templates.loggedInHeader.replace("sectionHeaderHome","sectionHeader");NYTD.Facebook.ArticleModuleView.templates.loggedOutHeader=NYTD.Facebook.ArticleModuleView.templates.loggedOutHeader.replace("sectionHeaderHome","sectionHeader");NYTD.Facebook.ArticleModuleView.TRACKING_NETWORK="ISMR_AP_LI_LST_FB";NYTD.Facebook.ArticleModuleView.TRACKING_RECOMMENDATION="ISMR_AP_LI_MST_FB";NYTD.Facebook.ArticleModuleView.TRACKING_POPULAR="ISMR_AP_LO_MST_FB";NYTD.Facebook=NYTD.Facebook||{};NYTD.Facebook.ArticleController=Object.create(NYTD.Facebook.BaseController);NYTD.Facebook.ArticleController.view=NYTD.Facebook.ArticleModuleView;if(window.XMLHttpRequest){window.fbAsyncInit=function(){NYTD.Facebook.ArticleController.run();};NYTD.Facebook.SDK.load();}NYTD.Facebook.facebookTool={Config:(function(){var width=646,height=436,winWidth=screen.width,winHeight=screen.height,left=Math.round((winWidth/2)-(width/2)),top=(winHeight>height)?Math.round((winHeight/2)-(height/2)):0;return{windowOptions:"scrollbars=yes,resizable=yes,toolbar=no,location=yes,width="+width+",height="+height+",left="+left+",top="+top,windowName:"facebookShare"};})(),initialize:function(element,position,x,y,asset){this.asset=asset||TimesPeople.Page;this.element=element;this.position=position;this.x=x?x+"px":"";this.y=y?y+"px":"";this.label="Recommend";this.draw();},draw:function(){var html=NYTD.Template(this.toolbar_item_html,{label:this.label});var insertion={};insertion[this.position]=html;this.element.insert(insertion);$("facebook_button").observe("click",this.onClick.bind(this));},onClick:function(event){var sharerUrl="https://www.facebook.com/sharer.php?";var articleUrl=this.asset.getUrl();articleUrl+=((articleUrl.indexOf("?")>=0)?"&":"?")+"smid=fb-share";sharerUrl+="u="+encodeURIComponent(articleUrl)+"&t="+encodeURIComponent(this.asset.getTitle());if(!this.facebookWindow||this.facebookWindow.closed){this.facebookWindow=window.open(sharerUrl,this.Config.windowName,this.Config.windowOptions);}dcsMultiTrack&&dcsMultiTrack("DCS.dcssip","www.nytimes.com","DCS.dcsuri","/Article-Tool-Share-facebook.html","WT.ti","Article-Tool-Share-facebook","WT.z_dcsm","1");},toolbar_item_html:'        <li id="facebook_item">            <a id="facebook_button">                <span><%= label %></span>            </a>        </li>    '};
// Tue Oct 16 14:40:02 EDT 2012
