var intSizeChecker=0,intViewableArea=0,intContentArea=0,intCurrentPosition=0,intNewPosition=0,intScrollInterval=0,intScrollSpeed=8,intAmountToJump=150,slideshowButtons,slideshowPlay,ssButtons,ssSelf;YAHOO.namespace("reuters");function scrollRowDown(){if(intViewableArea!=0&&intContentArea!=0&&intViewableArea<intContentArea){var a=intContentArea-intViewableArea+intCurrentPosition;intNewPosition=a<intAmountToJump?intCurrentPosition-a:intCurrentPosition-intAmountToJump;scrollToNewPosition()}}
function scrollRowUp(){intViewableArea!=0&&intContentArea!=0&&intViewableArea<intContentArea&&(intNewPosition=-intCurrentPosition<intAmountToJump?0:intCurrentPosition+intAmountToJump,scrollToNewPosition())}
function scrollUntil(){if(intCurrentPosition<intNewPosition){var a=Math.ceil((intNewPosition-intCurrentPosition)/intScrollSpeed);intCurrentPosition+=a;document.getElementById("thumbTab").style.cssText="margin-left:"+intCurrentPosition+"px"}else intCurrentPosition>intNewPosition?(a=Math.ceil((intCurrentPosition-intNewPosition)/intScrollSpeed),intCurrentPosition-=a,document.getElementById("thumbTab").style.cssText="margin-left:"+intCurrentPosition+"px"):clearInterval(intScrollInterval)}
function scrollToNewPosition(){clearInterval(intScrollInterval);intScrollInterval=setInterval(scrollUntil,50)}function scrollToPosition(a){intNewPosition=a;scrollToNewPosition()}
function scrollToPhoto(a){var b=intViewableArea/2,d=document.getElementById("thumb"+a).offsetWidth/2,a=document.getElementById("thumb"+a).offsetLeft,b=Math.round(intCurrentPosition-a+b-d),b=b<0?b:0;intContentArea>intViewableArea&&(b+20>-(intContentArea-intViewableArea)?scrollToPosition(b):scrollToPosition(-(intContentArea-intViewableArea)))}function scrollHome(){scrollToPosition(0)}function scrollEnd(){scrollToPosition(-(intContentArea-intViewableArea))}function buttonMenu(){return false}
function disableButton(a){document.getElementById(a).className="hidden"}function enableButton(a){document.getElementById(a).className=""}
function initButtons(){document.getElementById("controlLeft").onclick=scrollRowUp;document.getElementById("controlLeft").ondblclick=scrollHome;document.getElementById("controlRight").onclick=scrollRowDown;document.getElementById("controlRight").ondblclick=scrollEnd;document.getElementById("controlLeft").oncontextmenu=buttonMenu;document.getElementById("controlRight").oncontextmenu=buttonMenu}
function querySt(a){hu=window.location.search.substring(1);gy=hu.split("&");for(i=0;i<gy.length;i++)if(ft=gy[i].split("="),ft[0]==a)return ft[1]}function forEach(a,b){for(var d=0;d<a.length;d++)b(a[d])}function tag(a,b,d){return{name:a,attributes:d,content:b}}function link(a,b){return tag("a",[b],{href:a})}function image(a){return tag("img",[],{src:a})}function escapeHTML(a){forEach([[/&/g,"&amp;"],[/"/g,"&quot;"],[/</g,"&lt;"],[/>/g,"&gt;"]],function(b){a=a.replace(b[0],b[1])});return a}
function renderHTML(a){function b(a){var b=[];if(a)for(var d in a)b.push(" "+d+'="'+escapeHTML(a[d])+'"');return b.join("")}function d(a){typeof a=="string"?e.push(escapeHTML(a)):!a.content||a.content.length==0?e.push("<"+a.name+b(a.attributes)+"/>"):(e.push("<"+a.name+b(a.attributes)+">"),forEach(a.content,d),e.push("</"+a.name+">"))}var e=[];d(a);return e.join("")}
testMessage=function(a){var b=document.getElementById("testing");if(b!=null&&b!=void 0){var d=document.createElement("p");d.innerHTML=a;b.appendChild(d)}};
YAHOO.reuters.slideshow=function(a,b,d){this.container=YAHOO.util.Dom.get(a);this.effect=YAHOO.reuters.slideshow.effects.fadeOut;this.effect2=YAHOO.reuters.slideshow.effects.fadeIn;this.thumbs=false;this.title=d.slideshow.title;this.id=d.idNum;this.interval=d.interval?d.interval:4E3;this.startNumber=this.getStartNumber(b);this.slides=d.slideshow.slides.length;this.frames=[];for(a=0;a<d.slideshow.slides.length;a++)this.frames[a]={type:"virtual",image:d.slideshow.slides[a].image,thumb:d.slideshow.slides[a].thumbnail,
caption:this.fixAttribution(d.slideshow.slides[a].caption,a),altCaption:this.fixAttributionAlt(d.slideshow.slides[a].caption,a)};slideshowPlaying=0;ssSelf=this;slideshowButtons=document.getElementById("slideshowButtons");slideshowPlay=document.getElementById("slideshowPlay");ssButtons=[];slideshowButtons&&ssButtons.push(slideshowButtons);slideshowPlay&&ssButtons.push(slideshowPlay);this.initImages();if(document.getElementById("thumbSection"))this.thumbs=true,this.loadThumbs(),this.checkViewableArea(),
initButtons(),intSizeChecker=setTimeout(this.checkViewableArea,1E3),this.loadThumbActions();document.getElementById("photoId")&&this.photoControls(this.startNumber);this.loadCaptions();this.loadLeftRight();(slideshowButtons||slideshowPlay)&&this.ssRollovers();this.init()};
YAHOO.reuters.slideshow.prototype={init:function(){if(!this.effect)this.effect=YAHOO.reuters.slideshow.effects.fadeOut;this.active_frame=this.get_active_frame()},get_active_frame:function(){return YAHOO.util.Dom.getElementsByClassName("yui-sldshw-active",null,this.container)[0]},get_frame_index:function(a){for(var b=0;b<this.frames.length;b++)if(this.frames[b].value==a)return b;return-1},prev_selector:function(a){return(a-1+this.frames.length)%this.frames.length},next_selector:function(a){return(a+
1)%this.frames.length},highlight_thumb:function(a){a="thumb"+(a>=0?a:this.get_frame_index(this.get_active_frame()));YAHOO.util.Dom.removeClass(YAHOO.util.Dom.getElementsByClassName("active-thumb")[0],"active-thumb");YAHOO.util.Dom.addClass(document.getElementById(a),"active-thumb")},choose_next_frame:function(a,b){var a=a==null||a==false?false:true,d=this.get_frame_index(this.get_active_frame());d<0&&(d=0);for(var d=a==true?this.prev_selector(d):typeof b=="number"?b:this.next_selector(d),e=this.frames[d];e.value==
this.active_frame||e.type=="broken";)e=this.frames[this.next_selector(d)];this.next_frame=e.value;YAHOO.util.Dom.replaceClass(this.next_frame,"yui-sldshw-cached","yui-sldshw-next");this.effect2.setup(this.next_frame)},transition_tracking:function(){var a=this.get_frame_index(this.active_frame)+1;slideshowPlaying==0?typeof dcsMultiTrack=="function"&&((document.getElementById("slideshowInlineSmall")||document.getElementById("homepageSlideshow"))&&dcsMultiTrack("DCSext.VirtualEvent","1","WT.cg_n","Event - Inline Slideshow Change",
"DCSext.ContentType","Event","DCSext.PageTotal",this.frames.length,"DCSext.PageNumber",a,"DCSext.ContentHeadline",this.title),document.getElementById("slideshowSingle")&&dcsMultiTrack("WT.cg_n","Pictures - Slideshow","DCSext.ContentType","Slideshow","DCSext.PageTotal",this.frames.length,"DCSext.PageNumber",a,"DCSext.ContentHeadline",this.title,"DCSext.ContentID",this.id)):slideshowPlaying==1&&typeof dcsMultiTrack=="function"&&document.getElementById("slideshowSingle")&&dcsMultiTrack("WT.cg_n","Slideshow - Auto Slide",
"DCSext.ContentType","Slideshow","DCSext.PageTotal",this.frames.length,"DCSext.PageNumber",a,"DCSext.ContentHeadline",this.title,"DCSext.ContentID",this.id,"DCSext.VirtualEvent","1")},clean_up_transition:function(){YAHOO.util.Dom.replaceClass(this.active_frame,"yui-sldshw-active","yui-sldshw-cached");YAHOO.util.Dom.replaceClass(this.next_frame,"yui-sldshw-next","yui-sldshw-active");this.active_frame=this.next_frame;this.transition_tracking();this.loadBackNext();nielsenEventBeacon()},transition:function(a){var a=
a==null?{}:a,b=a.jumpTo===void 0?false:a.jumpTo;(a.reverse==null?0:a.reverse)?this.choose_next_frame(true,""):b>=0&&this.choose_next_frame(false,b);a=this.get_frame_index(this.next_frame);this.thumbs==true&&(this.highlight_thumb(a),scrollToPhoto(a));this.swapCaption(a);this.photoControls(a+1);if(document.getElementById("slideshowSingle"))document.location.hash="a="+(a+1);a=this.effect.get_animation(this.active_frame);b=this.effect2.get_animation(this.next_frame);b.onComplete.subscribe(this.clean_up_transition,
this,true);a.animate();b.animate()},loop:function(){if(slideshowPlaying==0){this.loop_interval=setInterval(function(){ssSelf.transition({slideshow:true})},this.interval);slideshowPlaying=1;YAHOO.util.Dom.setStyle(ssButtons,"display","none");document.getElementById("ssPlay").src="/resources_v2/images/ssButton-stop.gif";var a=this.get_frame_index(this.active_frame)+1;dcsMultiTrack("WT.cg_n","Slideshow Play","DCSext.ContentType","Slideshow","DCSext.PageTotal",this.frames.length,"DCSext.PageNumber",a,
"DCSext.ContentHeadline",this.title,"DCSext.ContentID",this.id)}else clearInterval(this.loop_interval),slideshowPlaying=0,document.getElementById("ssPlay").src="/resources_v2/images/ssButton-play.gif"},getStartNumber:function(a){a=a==null?1:a;if(document.location.hash!="")document.location.hash.search("a=")!=-1&&(a=parseInt(document.location.hash.split("a=")[1]),isNaN(a)&&(a=1));else if(document.getElementById("slideshowSingle"))Reuters.utils.getQueryStringParameter(location.href,"slide")&&(a=Reuters.utils.getQueryStringParameter(location.href,
"slide")),document.location.hash="a="+a;return a},initImages:function(){for(var a="",b=0;b<this.frames.length;b++)activeClass=b==this.startNumber-1?"yui-sldshw-active yui-sldshw-frame":"yui-sldshw-cached yui-sldshw-frame",a+=renderHTML(tag("div",[tag("div",[" "],{"class":"image-container",id:"ic"+b})],{id:"frame_fd1fade","class":activeClass})),this.frames[b].type="framed";c=this.startNumber-1;cElement="image"+c;document.getElementById("displayFrame").innerHTML=a;a=YAHOO.util.Dom.getElementsByClassName("yui-sldshw-frame",
null,this.container);if(!(a.length>1))return false;for(var b=0;b<a.length;b++)this.frames[b].value=a[b];this.loadImages(c,this.prev_selector(c),this.next_selector(c));document.getElementById("slideshowSingle")&&this.showSsButtons(document.getElementById(cElement))},loadImages:function(){var a=arguments;for(i=0;i<a.length;i++)this.cacheImage(a[i])},loadBackNext:function(){var a=this.get_frame_index(this.get_active_frame());this.loadImages(this.prev_selector(a),this.next_selector(a))},cacheImage:function(a){if(this.frames[a].type==
"framed"){var b=a+1;document.getElementById("slideshowSingle")?document.getElementById("ic"+a).innerHTML=renderHTML(tag("img",[],{alt:this.frames[a].altCaption,src:this.frames[a].image,id:"image"+a})):this.id.indexOf("USRTR")==0||this.id.indexOf("UKRTR")==0||this.id.indexOf("INRTR")==0?document.getElementById("ic"+a).innerHTML=renderHTML(tag("a",[tag("img",[],{alt:this.frames[a].altCaption,src:this.frames[a].image,id:"image"+a})],{href:"/news/pictures/slideshow?articleId="+this.id+"&slide="+b,target:"_top"})):
this.id.indexOf("cSlideshow")==0&&sjURL?document.getElementById("ic"+a).innerHTML=renderHTML(tag("a",[tag("img",[],{alt:this.frames[a].altCaption,src:this.frames[a].image,id:"image"+a})],{href:"/news/pictures/cslideshow?sj="+sjURL+"&slide="+b,target:"_top"})):document.getElementById("ic"+a).innerHTML=renderHTML(tag("a",[tag("img",[],{alt:this.frames[a].altCaption,src:this.frames[a].image,id:"image"+a})],{href:"/article/slideshow/id"+this.id+"#a="+b,target:"_top"}));this.frames[a].type="cached";testMessage("loaded image: "+
a+" with type: "+this.frames[a].type);this.loadImageActions(a)}},loadImageActions:function(a){c=document.getElementById("image"+a);document.getElementById("slideshowSingle")?(YAHOO.util.Event.addListener(c,"mousemove",this.imageMouseover),YAHOO.util.Event.addListener(c,"mouseout",this.imageMouseout)):document.getElementById("slideshowInlineLarge")&&document.getElementById("captionContent")&&(a=["displayFrame","captionContent","photoControls"],YAHOO.util.Event.on(a,"mouseover",Reuters.article.showCaption),
YAHOO.util.Event.on(a,"mousemove",Reuters.article.showCaption),YAHOO.util.Event.on(a,"mouseout",Reuters.article.hideCaption))},imageMouseover:function(a){a=YAHOO.util.Event.getTarget(a);ssSelf.showSsButtons(a)},showSsButtons:function(a){if(!(slideshowButtons.className==a.id||slideshowPlay.className==a.id)){var b=0,d=0,b=a.offsetLeft,d=a.offsetWidth;imgPaddingRight=parseFloat(YAHOO.util.Dom.getStyle(a,"padding-right"));adjImgWidth=d-imgPaddingRight;dispWidth=document.getElementById("displayFrame").offsetWidth;
if(d!=dispWidth&&slideshowButtons)a.parentNode.insertBefore(slideshowButtons,a),YAHOO.util.Dom.setStyle(slideshowButtons,"left",b+adjImgWidth-88+"px"),slideshowButtons.className=a.id;if(slideshowPlay)a.parentNode.insertBefore(slideshowPlay,a),YAHOO.util.Dom.setStyle(slideshowPlay,"left",(dispWidth-194)/2+"px"),slideshowPlay.className=a.id}YAHOO.util.Dom.setStyle(ssButtons,"display","block")},imageMouseout:function(){YAHOO.util.Dom.setStyle(ssButtons,"display","none")},loadCaptions:function(){c=this.startNumber-
1;if(document.getElementById("txtFrame"))document.getElementById("txtFrame").innerHTML=renderHTML(tag("div",[tag("span",[this.frames[c].caption],{id:"imageCaption"})],{"class":"yui-txt-frame",id:"caption"+c}))},fixAttribution:function(a,b){var d=this.slides,a=a.replace(/<[^<>]*>/g,""),e=RegExp("(.*)(REUTERS/)(.*)","g").exec(a),h=b+1;if(e!=null)if(document.getElementById("slideshowSingle"))e=e!=null?tag("p",[e[1],tag("br"),tag("span",[e[2]+e[3]],{"class":"label"})]):tag("p",[tag("span",{"class":"label"}),
a],{});else if(e[1].length>200){var j=tag,d=tag("span",[h+" of "+d+". "],{"class":"label"}),f;f=e[1];var g;if(f.split){f=f.split("");if(f.length>200)for(g=f.length-1;g>-1;--g)if(g>200)f.length=g;else if(" "===f[g]){f.length=g;break}f=f.join("")}else f="";e=j("p",[d,f+" ",tag("a",["More..."],{href:"/news/pictures/slideshow?articleId="+this.id+"&slide="+h}),tag("br"),tag("span",["Credit: "+e[2]+e[3]],{"class":"label"})])}else e=tag("p",[tag("span",[h+" of "+d+". "],{"class":"label"}),e[1],tag("br"),
tag("span",["Credit: "+e[2]+e[3]],{"class":"label"})]);else e=document.getElementById("slideshowSingle")?tag("p",[a],{}):tag("p",[tag("span",[h+" of "+d+". "],{"class":"label"}),a],{});return e},fixAttributionAlt:function(a){var a=a.replace(/<[^<>]*>/g,""),b=RegExp("(.*)(REUTERS/)(.*)","g").exec(a);if(b!=null)return a=b[1]+b[2]+b[3],a=a.replace(/\//g,"-"),a=a.replace(/\'/g,"'"),a=a.replace(/\"/g,"'"),a=a.replace(/\n/g," ");a=a.replace(/\//g,"-");a=a.replace(/\'/g,"'");a=a.replace(/\"/g,"'");return a=
a.replace(/\n/g," ")},swapCaption:function(a){if(document.getElementById("txtFrame"))document.getElementById("txtFrame").innerHTML=renderHTML(tag("div",[tag("span",[this.frames[a].caption],{id:"imageCaption"})],{"class":"yui-txt-frame",id:"caption"+a}));else if(document.getElementById("captionContent")){var b=YAHOO.util.Dom.getElementsByClassName("captionText","div","captionContent")[0];if(b)b.innerHTML=renderHTML(this.frames[a].caption)}},photoControls:function(a){if(document.getElementById("photoId")){var b=
" "+a+" / "+this.frames.length+" ";document.getElementById("photoId").innerHTML=b}if(document.getElementById("fullSizeLink"))b=document.getElementById("fullSizeLink").href,b=Reuters.utils.replaceQueryStringParam(b,"slide",a),document.getElementById("fullSizeLink").href=b},loadThumbs:function(){var a=document.getElementById("thumbSection"),b=[];for(i=0;i<this.frames.length;i++)thClass=i==this.startNumber-1?"thumbnail active-thumb":"thumbnail",onClickJS="javascript:"+this.id+".transition({jumpTo:"+
i+"});return false",b.push(tag("td",[tag("div",[tag("img",[],{src:this.frames[i].thumb,alt:"thumbnail",id:"ti"+i,title:"Click to view full image"})],{"class":thClass,id:"thumb"+i,onclick:onClickJS})],{}));var d=[];d.push(tag("div",[tag("img",[],{id:"controlLeft",src:"/resources_v2/images/thumbStripBack.gif"}),tag("img",[],{src:"/resources_v2/images/thumbBar.gif","class":"thumbBar"})],{"class":"thumbnailControl left"}));d.push(tag("div",[tag("img",[],{src:"/resources_v2/images/thumbBar.gif","class":"thumbBar"}),
tag("img",[],{id:"controlRight",src:"/resources_v2/images/thumbStripNext.gif"})],{"class":"thumbnailControl right"}));a.innerHTML=renderHTML(tag("div",[tag("div",[tag("div",[tag("table",[tag("tr",b,{id:"tableContent"})],{id:"thumbTable",cellspacing:"0",cellpadding:"0"})],{id:"thumbTab"}),tag("div",d,{"class":"thumbnailControls"})],{id:"thumbnails"}),tag("div",[],{"class":"linebreak"})],{"class":"sectionContent"}));if(this.frames.length==1)document.getElementById("thumbnails").className="hidden"},
loadThumbActions:function(){var a=[];for(i=0;i<this.frames.length;i++)a.push("ti"+i);YAHOO.util.Event.addListener(a,"mouseover",this.thumbMouseover)},thumbMouseover:function(a){var a=YAHOO.util.Event.getTarget(a),b=a.id.substr(2);ssSelf.cacheImage(b);YAHOO.util.Event.removeListener(a.id,"mouseover")},checkViewableArea:function(){intViewableArea=document.getElementById("thumbnails").offsetWidth;intContentArea=document.getElementById("thumbTable").offsetWidth+95;if(intViewableArea-30>intContentArea){disableButton("controlLeft");
disableButton("controlRight");var a=YAHOO.util.Dom.getElementsByClassName("thumbBar","img");YAHOO.util.Dom.setStyle(a,"display","none");intNewPosition=(intViewableArea-intContentArea)/2;document.getElementById("thumbTab").style.cssText="margin-left:"+intNewPosition+"px"}else enableButton("controlLeft"),enableButton("controlRight"),clearInterval(intSizeChecker)},ssRollovers:function(){var a="ssFollow,ssEmbed,ssComments,ssNumComments,ssNumCommentsContainer,ssPlay".split(",");YAHOO.util.Event.on(a,"mouseover",
this.mouseOn);YAHOO.util.Event.on(a,"mouseout",this.mouseOff)},loadLeftRight:function(){var a=["prevButton","nextButton"];YAHOO.util.Event.on(a,"mouseover",this.mouseOn);YAHOO.util.Event.on(a,"mouseout",this.mouseOff)},mouseOn:function(a){a=YAHOO.util.Event.getTarget(a);switch(a.id){case "prevButton":a.src="/resources_v2/images/photo_left_over.gif";break;case "nextButton":a.src="/resources_v2/images/photo_right_over.gif";break;case "ssFollow":YAHOO.util.Dom.setStyle(ssButtons,"display","block");a.src=
"/resources_v2/images/ssButton-follow-glow.png";break;case "ssEmbed":YAHOO.util.Dom.setStyle(ssButtons,"display","block");a.src="/resources_v2/images/ssButton-embed-glow.png";break;case "ssComments":YAHOO.util.Dom.setStyle(ssButtons,"display","block");a.src="/resources_v2/images/ssButton-comments-glow.png";break;case "ssNumComments":YAHOO.util.Dom.setStyle(ssButtons,"display","block");document.getElementById("ssComments").src="/resources_v2/images/ssButton-comments-glow.png";break;case "ssNumCommentsContainer":YAHOO.util.Dom.setStyle(ssButtons,
"display","block");document.getElementById("ssComments").src="/resources_v2/images/ssButton-comments-glow.png";break;case "ssPlay":YAHOO.util.Dom.setStyle(ssButtons,"display","block")}},mouseOff:function(a){a=YAHOO.util.Event.getTarget(a);switch(a.id){case "prevButton":a.src="/resources_v2/images/photo_left.gif";break;case "nextButton":a.src="/resources_v2/images/photo_right.gif";break;case "ssFollow":a.src="/resources_v2/images/ssButton-follow.png";break;case "ssEmbed":a.src="/resources_v2/images/ssButton-embed.png";
break;case "ssComments":a.src="/resources_v2/images/ssButton-comments.png";break;case "ssNumComments":document.getElementById("ssComments").src="/resources_v2/images/ssButton-comments.png";break;case "ssNumCommentsContainer":document.getElementById("ssComments").src="/resources_v2/images/ssButton-comments.png"}},displayAll:function(){var a=document.getElementById("thumbSection"),b=document.getElementById("slideshowSingle"),d=YAHOO.util.Dom.getElementsByClassName("sectionContent","div",b)[0];if(YAHOO.util.Dom.getElementsByClassName("sectionContent",
"div",b).length>1){for(;b.firstChild;)b.removeChild(b.firstChild);b.appendChild(this.switchViewShow);YAHOO.util.Dom.setStyle(a,"display","block");YAHOO.util.Dom.setStyle("slideshowViewShow","display","none");YAHOO.util.Dom.setStyle("slideshowViewAll","display","block")}else this.switchViewShow=b.removeChild(d),YAHOO.util.Dom.setStyle(a,"display","none"),YAHOO.util.Dom.setStyle("slideshowViewAll","display","none"),YAHOO.util.Dom.setStyle("slideshowViewShow","display","block"),this.switchViewAll!=null?
b.innerHTML=this.switchViewAll:(this.showAll(b),this.switchViewAll=b.innerHTML,this.ssRollovers())},showAll:function(a){slideshowButtons&&YAHOO.util.Dom.removeClass(slideshowButtons,"image0");for(i=0;i<this.frames.length;i++)sectionContent=renderHTML(tag("div",[tag("div",[tag("img",[],{src:this.frames[i].image,id:"image"+i})],{"class":"yui-sldshw-frame-all"}),tag("div",[this.frames[i].caption],{"class":"multimedia-text"})],{"class":"sectionContent"})),sectionContent+=this.frames.length!=i+1?renderHTML(tag("div",
[" "],{"class":"sldshw-all-break"})):"",a.innerHTML+=sectionContent}};YAHOO.reuters.slideshow.effects={fadeOut:{setup:function(a){YAHOO.util.Dom.setStyle(a,"opacity","1")},get_animation:function(a){return new YAHOO.util.Anim(a,{opacity:{to:0}},0.25,YAHOO.util.Easing.easeOut)}},fadeIn:{setup:function(a){YAHOO.util.Dom.setStyle(a,"opacity","0")},get_animation:function(a){YAHOO.util.Dom.getRegion(a);return new YAHOO.util.Anim(a,{opacity:{to:1}},0.25,YAHOO.util.Easing.easeOut)}}};