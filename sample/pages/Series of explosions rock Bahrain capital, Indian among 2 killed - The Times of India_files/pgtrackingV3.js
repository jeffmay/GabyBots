/*
 * This Script is used to Log the access log data
 * Author : ram.awasthi@timesgroup.com
 * (c) Times Business Solutions Limited
 * Date: 16/7/2010
 */

if(!iBeatPgTrend) {
	var iBeatPgTrend = {
		version     : 1.3,
		
		key         : "",
		host        : "",
		domain      : "",
		url         : "",
		pgDnldTime  : -1,
		channel     : "",
		sessonId    : "",
		agentType   : "",
		referer     : "",
		articleId   : "",
		contentType : "",
		location    : "1",
		cat         : "",
		subcat      : "",
		tag         : "",
		publishedTime : "",
		action      : "1",
		author      : "",
		
		//Initialize setup
		init : function () {
				var config = window._page_config;
				if(config){
					this.key       = config.key;
					this.channel   = config.channel;
					this.domain    = config.domain;
					
					if(config.cat) {
						this.cat       = config.cat;
					}
					
					if(config.subcat) {
						this.subcat    = config.subcat;
					}
					
					if(config.contenttag) {
						this.tag       = config.contenttag;
					}
					
					if(config.articledt) {
						this.publishedTime  = config.articledt;
					}
					
					if(config.author) {
						this.author  = config.author;
					}
					
					if(config.articleId) {
						this.articleId = config.articleId;
					}
					
					if(config.location) {
						this.location = config.location;
					}
					
					if(config.contentType) {
						this.contentType = config.contentType;
					}
					
					if(config.action) {
						this.action = config.action;
					}
					
					this.host      = config.host;
					this.url       = window.location.href;
					this.referer   = document.referrer;
					
					//Maintain session Information If no session Id is sent 3rd Party cookie will do
					if(config.sessionId) {
						this.sessionId = config.sessionId
					} else {
						var sId = this.readCookie("_ibeat_session");
						if(sId) {
							this.sessionId = sId;
						} else {
							this.sessionId = this.guid();
							this.createCookie("_ibeat_session", this.sessionId, 30, "/");
						}
					}
					this.agentType = navigator.userAgent;
					if(typeof(window._pg_startpt)=="number"){
						if(typeof(window._pg_endpt)=="number"){
							this.pgDnldTime = window._pg_endpt - window._pg_startpt;
						}
					}
				}

				if(this.validate() == false) {
					return;	
				}

				this.host=this.host.replace(/^www\./,"");
				this.logServer="ibeat.indiatimes.com";
				this.log();
		},
		
		logaction: function(action) {
			this.action = action;
			this.log();
		},
		//Prepares logging Request and make a call to sendRequest
		log: function () {
				var request = "http://"+this.logServer+"/iBeat/pageTrendlog.html?h="+encodeURIComponent(this.host);
				request += "&d="+encodeURIComponent(this.domain);
				request += "&url="+encodeURIComponent(this.url);
				request += "&k="+this.key;
				request += "&ts="+this.pgDnldTime;
				request += "&ch="+encodeURIComponent(this.channel);
				request += "&sid="+encodeURIComponent(this.sessionId);
				request += "&at="+encodeURIComponent(this.agentType);
				request += "&ref="+encodeURIComponent(this.referer);
				request += "&aid="+encodeURIComponent(this.articleId);
				request += "&loc="+encodeURIComponent(this.location);
				request += "&ct="+encodeURIComponent(this.contentType);
				request += "&cat="+encodeURIComponent(this.cat);
				request += "&scat="+encodeURIComponent(this.subcat);
				request += "&ac="+encodeURIComponent(this.action);
				request += "&tg="+encodeURIComponent(this.tag);
				request += "&pts="+encodeURIComponent(this.publishedTime);
				request += "&auth="+encodeURIComponent(this.author);
				this.sendRequest(request);

		},

		//Actual Logging request is sent here
		sendRequest : function(request) {
				var img = new Image(1,1);
				//Do Some Error Handling if required Though not that much important
				img.src = request;
		},

		//Generate Unique Session ID
		guid:function(){
			var key,rnd,i;
			key="";
			for(i=0;i<16;i++){
				rnd=Math.floor(Math.random()*36).toString(36);
				key = key + rnd;
			}
			return key;
		},
	
	 deleteCookie:function(cookieName){
			if(this.readCookie(cookieName)){this.createCookie(cookieName,"",-1);
				return true
			}
			return false
		},

	createCookie:function(name,value,mins,path){
			if(!path){ path="/"  }

			var expiry= "";
			if(mins){
				var cDate=new Date();	
				cDate.setTime(cDate.getTime()+(mins*60*1000));
				expiry=";expires="+cDate.toGMTString();
			} 
			document.cookie=name+"="+value+expiry+";path="+path;
		},
		
		readCookie:function(cookieName){
			var str=cookieName+"=";
			var args = document.cookie.split(":");

			for(var d=0;d<args.length;d++){
				var f=args[d];
				while(f.charAt(0)==" "){
					f=f.substring(1,f.length)
				}
				if(f.indexOf(str)==0){
					return f.substring(cookieName.length,f.length)
				}
			}
			return null;
		},
		
		validate: function() {
			if(
			   this.cat         == "" ||
			   this.domain      == "" ||
			   this.key         == "" ||
			   this.channel     == "") {
				    return false;
				}
				return true;
		}
		
	};

	function logaction(action) {
		iBeatPgTrend.logaction(action);
	};
	
	iBeatPgTrend.init();
	
};
