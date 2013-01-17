//Generated:2012-10-23 21:55:36
	
	
//6-55
//Flashtalking altimage tag - www.flashtalking.com

var ftRandomNumber_384936=Math.floor(Math.random()*10000),
ft384936 = {
	params:window.ftParams_384936||"",
	confID:window.ftConfID_384936||"0",
	pID:384936,
	creativeID:"397334",
	exttrack:[],
	extscript:[""],
	width:"300",
	height:"250",
	altimg:"http://cdn.flashtalking.com/xre/38/384936/397334/image/397334.gif",
	altimghref:"http://servedby.flashtalking.com/click/3/22608;384936;397334;210;[FT_CONFID]/?g=[FT_GUID]&random=[FT_RANDOM]&ft_width=300&ft_height=250&url=http://listenpolitician.com/?utm_source=Ad.com&utm_medium=Ad_com_CustomDatalogixDatabaseAARPDatabaseTargeting_300x250&utm_term=pyramid&utm_content=Valueclick&utm_campaign=AARPYEASEngagement2012",
	switchArray:["altimg", "altimghref", "cdnSrc", "cdnGUID", "iDeviceImp"],
	divID:"ftdiv384936",
	altimgID:"ftalt384936",
	alttext:"Click here",
	altimgtarget:"_blank",
	altimgborder:"0",
	centreAd:true,
	eventListeners:{},
	storeGUID:/iP(ad|hone|od)/.test(navigator.appVersion),
	servedby:/servedby\.flashtalking/.test(location.href),
	//serveDom?
	cdn:/(cdn|secure)\.flashtalking/.test(location.href),
	cdnSrc:"http://cdn.flashtalking.com/frameworks/js/frame/?g=",
	cdnGUID:"http://cdn.flashtalking.com/frameworks/js/ftGUID.html?g=",
	iDeviceImp:"http://servedby.flashtalking.com/imp/3/22608;384936;207;guid;Adcom;AdcomCustomDatalogixDatabaseAARPDatabaseTargeting300x250/?ft_guid=",
	secure:location.protocol==="https:",
	api: {},
	fallbackAPI: {
		target: "_blank",
		open:function(url){
			window.open(url, this.target);
		}
	},
	$:function(el){
		var o=this,
		x = el||o.divID,
		p={o:o};
		p.y=typeof x=="string"?document.getElementById(x):x;
		return new this.$Base(p);
	},
	bver:function(b, p){
		return (navigator[p||"appVersion"].toLowerCase().indexOf(b.toLowerCase())>=0);
	},
	qs:function(){
		var querystring=this.params,
		args=querystring.split('&'),
		qsObj = {};
		for(var i=0;i<args.length;i++){
			var pair=args[i].split('=');
			if(pair.length>1){
				for(var j=2;j<pair.length;j++){
					pair[1]+="="+pair[j];
				}
			}
			var temp, temp0, temp1;
			temp=unescape(pair[0]).split('+');
			temp0=temp.join(' ');
			temp=unescape(pair[1]).split('+');
			temp1=temp.join(' ');
			qsObj[temp0]=temp1;
		}
		this.qs = function(ref,def){
			if(!qsObj[ref]){
				qsObj[ref]=def;
			}
			return qsObj[ref];
		};
		return this.qs.apply(this, arguments);
	},
	addEventListener:function(type,func){
		if(typeof this.eventListeners[type]=="undefined")
			this.eventListeners[type]=[];
		if(typeof func=="function")
			this.eventListeners[type].push(func);
	},
	dispatchEvent:function(type){
		if(typeof this.eventListeners[type]!="undefined"){
			for(var i=0;i<this.eventListeners[type].length;i++){
				this.eventListeners[type][i].call(this);
			}
		}
	},
	init:function(){
		var o = this,
			frame = false,
			guid = window["ftGUID_"+o.pID];
		o.qs();
		o.setAPI();
		if(o.storeGUID&&!o.servedby&&!o.cdn){
			o.cdnSrc += guid+"&p="+escape(o.params);
			o.cdnSrc += "&c="+o.confID;
			o.cdnSrc += "&pID="+o.pID+"&xx="+String(o.pID).substr(0,2);
			o.cdnSrc += "&creativeID="+o.creativeID;
			o.insertParam(o.altimghref, {param:"ft_guid", value:guid});
			frame = true;
			o.outputDiv(frame);
		}else{
			o.setup();
			o.outputExternals();
			o.dispatchEvent("start");
			o.outputDiv(frame);
			o.dispatchEvent("end");
		}
	},
	setup:function(){
		var o = this,
		q = o.qs,
		guid = window["ftGUID_"+o.pID], 
		t;
		if(q("ftx","")!==""||q("fty","")!==""){
			q.ftx=q("ftx","0");
			q.fty=q("fty","0");
		}
		if(o.storeGUID){
			if(typeof localStorage!=="undefined"){
				guid = localStorage.ftGUID = window["ftGUID_"+o.pID] = localStorage.ftGUID||window["ftGUID_"+o.pID];
			}
			o.altimghref = o.insertParam(o.altimghref, {param:"ft_guid", value:guid});
		}
		o.iDeviceImp += guid+"&cb="+o.random();
		
		o.cdnGUID += guid;
		
		
		
		if(o.secure){
			for(i=o.switchArray.length;i--;){
				t = o[o.switchArray[i]];
				t = t.replace(/\bhttp:\/\/(cdn(?=\.flash)|video(?=\.flash)|stat(?=\.flash)|a(?=\.flash))/, "https://secure");
				o[o.switchArray[i]] = t.replace("http:", "https:");
			}
		}
		o.setupLoadListener();
		o.modifyClicks();
		if(o.storeGUID){
			o.output207(guid);
		}
		o.setupBackupImp();
	},
	outputDiv:function(frame){
		var o = this,
		div = '',
		absPos = '',
		content = frame?"getFrame":"getBackup",
		posStyle = 'relative';
		if(this.qs.ftx||this.qs.fty){
			absPos = 'left:'+this.qs.ftx+'px; top:'+this.qs.fty+'px; ';
			posStyle = 'absolute';
		}
		if(this.qs("ftadz","")!=="")
			absPos+='z-index:'+this.qs("ftadz")+';';
			
		if(this.centreAd)
			absPos+=" margin: 0 auto;";
			
		div += '<div id="'+this.divID+'" style="position:'+posStyle+'; width:'+this.width+'px; height:'+this.height+'px;'+absPos+'">';
		div += o[content]();
		div += '</div>';
		document.write(div);
		this.dispatchEvent("backup");
	},
	getBackup:function(){
		var o=this;
		return '<a id="fta'+o.altimgID+'" href="javascript:ft'+o.pID+'.api.open(\''+unescape(o.addVClick(o.altimghref))+'\');"><img id="'+o.altimgID+'" src="'+o.altimg+'" alt="'+o.alttext+'" style="width:'+o.width+'px; height:'+o.height+'px; border:'+o.altimgborder+'px"/></a>';
	},
	getFrame:function(){
		var o = this;
		return '<iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" topmargin="0" leftmargin="0" allowtransparency="true" width="'+o.width+'" height="'+o.height+'" src="'+o.cdnSrc+'"></iframe>';
	},
	modifyClicks:function(){
		var o = this,
		insert = {param:"ft_custom", value:window["ftCustom_"+o.pID]||""};
		if(insert.value!==""){
			o.altimghref = o.insertParam(o.altimghref, insert);
		}
	},
	setupBackupImp:function(){
		var o = this;
		o.altimg = o.insertParam(o.altimg, {param: "ft_creative", value:o.creativeID});
		o.altimg = o.insertParam(o.altimg, {param: "ft_configuration", value:window["ftConfID_"+o.pID]});
	},
	insertParam:function(str, insert){
		if(typeof str === "string")
			return str.replace("/?", "/?"+insert.param+"="+insert.value+"&");
	},
	addVClick: function(ct){
		return unescape(this.qs("click",""))+this.replaceMacros(ct);
	},
	outputExternals:function(){
		var o=this,
		i;
		function outputPixel(p){
			if(p) {
				new Image().src = o.replaceMacros(p);
			}
		}
		for(i=o.exttrack.length;i--;){
				outputPixel(o.exttrack[i]);
		}
		
		for(i=o.extscript.length;i--;){
			if(o.extscript[i]!=="")
				o.appendScriptToHead(o.replaceMacros(o.extscript[i]));
		}
	},
	output207:function(guid){
		var o = this,
			fr = document.createElement("iframe"),
			cdnFr;
		fr.style.display = "none";
		if(o.servedby){
			cdnFr = fr.cloneNode();
			cdnFr.src = o.cdnGUID;
			document.body.appendChild(cdnFr);
		}
		fr.src = o.iDeviceImp;
		document.body.appendChild(fr);
	},
	replaceMacros:function(str){
		var o = this,
		macro = /\[FT_RANDOM\]/g,
		conf = /\[FT_CONFID\]/g,
		guid = /\[FT_GUID\]/g,
		noCache = /\[noCachebuster\]/,
		r = o.random(),
		c = window["ftConfID_"+o.pID],
		g = window["ftGUID_"+o.pID];
		if(noCache.test(str)){
			str = str.replace(noCache,"");
			return str.replace(conf, c);
		}
		str = str.replace(guid, g);
		str = macro.test(str)?str.replace(macro, r):str+'?'+r;
		return str.replace(conf, c);
	},
	appendScriptToHead:function(scr){
	  var head = document.getElementsByTagName("head")[0],
	  newScript = document.createElement('script');
	  newScript.type = 'text/javascript';
	  newScript.src = scr;
	  head.appendChild(newScript);
	},
	setupLoadListener:function(){
		var _this = this,
		w = window;
		f = function(){
			_this.dispatchEvent("load");
		};
		if(this.bver("MSIE")){
			w.attachEvent("onload",f);
		}else{
			w.addEventListener("load",f,false);			
		}
	},
	setAPI:function(){
		var o=this;
		o.api = window.ormma||window.mraid||o.fallbackAPI;
		if(!o.api.request) {
			o.api.request = o.fallbackAPI.request;
		}
		if(o.storeGUID){
			if(o.api!==o.fallbackAPI){
					o.storeGUID=false;
			}
			if(o.cdn){
				o.fallbackAPI.open = function(url){
					window.open(url, this.target);
				};
			}
		}
	},
	random:function(x){
		var x = x||1000000000;
		return Math.floor(Math.random()*x);
	},
	$Base:function(p){
		var o = this;
		o.$ = true;
		o.o = p.o;
		o.target = p.y.$ ? p.y.target : p.y;
		o.style = p.y.style;
	}
};
//--start extensions



//--end extensions
ft384936.init();

