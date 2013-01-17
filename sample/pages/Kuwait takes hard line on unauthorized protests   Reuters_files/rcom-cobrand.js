// Currently supported
// 44: yahoo finance
// 77: MSN
// 78: Financial Post
// 79: FT
// 144: Yahoo JP
// 311: Hexun
// 611: Yahoo Singapore
// 444: Invertia
// 471: FT UK

Reuters.namespace('cobrand');

Reuters.cobrand.COBRANDS = new Array();
Reuters.cobrand.COBRANDS["rpc44"] = { html: "<div class=\"cobrand\" id=\"cobrandYF\"><a id=\"link1\" href=\"http://finance.yahoo.com\" target=\"_blank\"></a></div>", name: "Yahoo"};
Reuters.cobrand.COBRANDS["rpc77"] = { html: "<div class=\"cobrand\" id=\"cobrandMSN\"><a id=\"link1\" href=\"http://moneycentral.msn.com/home.asp\" target=\"_blank\"></a><a id=\"link2\" href=\"http://moneycentral.msn.com/investor/home.asp\" target=\"_blank\"></a></div>", name: "MSN"};
Reuters.cobrand.COBRANDS["rpc78"] = { html: "<div class=\"cobrand\" id=\"cobrandFP\"><a id=\"link1\" href=\"http://www.financialpost.com/\" target=\"_blank\"></a></div>", name: "FP"};
Reuters.cobrand.COBRANDS["rpc79"] = { html: "<div class=\"cobrand\" id=\"cobrandFT\"><a id=\"link1\" href=\"http://www.ft.com/world/us\" target=\"_blank\"></a></div>", name: "FT"};
Reuters.cobrand.COBRANDS["rpc144"] = { html: "<div class=\"cobrand\" id=\"cobrandYahooJp\"><a id=\"link1\" href=\"http://quote.yahoo.co.jp\" target=\"_blank\"></a></div>", name: "YahooJP"};
Reuters.cobrand.COBRANDS["rpc311"] = { html: "<div class=\"cobrand\" id=\"cobrandHexun\"><a id=\"link1\" href=\"http://forex.hexun.com/\" target=\"_blank\"></a></div>", name: "Hexun"};
Reuters.cobrand.COBRANDS["rpc611"] = { html: "<div class=\"cobrand\" id=\"cobrandYahooSg\"><a id=\"link1\" href=\"http://sg.biz.yahoo.com/sg\" target=\"_blank\"></a></div>", name: "cobrandYahooSg"};
Reuters.cobrand.COBRANDS["rpc444"] = { html: "<div class=\"cobrand\" id=\"cobrandInert\"><a id=\"link1\" href=\"http://www.invertia.com\" target=\"_blank\"></a></div>", name: "cobrandInert"};
Reuters.cobrand.COBRANDS["rpc471"] = { html: "<div class=\"cobrand\" id=\"cobrandFtUk\"><a id=\"link1\" href=\"http://www.ft.com/home/uk\" target=\"_blank\"></a></div>", name: "cobrandFtUk"};
Reuters.cobrand.COBRANDS["rpc418"] = { html: "<div class=\"cobrand\" id=\"cobrandMSNUK\"><a id=\"link1\" href=\"http://uk.msn.com/\" target=\"_blank\"></a></div>", name: "cobrandMSNUK"};

Reuters.cobrand.COBRANDS["rpc454"] = { html: '<div class="cobrand" id="cobrandUnit" style="width: 166px; background: url(\'http://static.reuters.com/resources/media/editorial/20101206/standardchartered_logo.png\') no-repeat;"> <a id="link1" href="http://www.standardchartered.com" target="_blank" style="width: 166px; background: url(\'http://static.reuters.com/resources/media/editorial/20101206/standardchartered_logo.png\') no-repeat;"></a></div>', name: 'Standard Chartered'};

Reuters.cobrand.COBRANDS["rpc477"] = { html: '<div class="cobrand" id="cobrandUnit" style="width: 190px; background: url(\'http://static.reuters.com/resources/media/editorial/20101208/12322_thumb_back_businessdesk.png\') no-repeat;"> <a id="link1" href="http://thebusinessdesk.com" target="_blank" style="width: 190px; background: url(\'http://static.reuters.com/resources/media/editorial/20101208/12322_thumb_back_businessdesk.png\') no-repeat;"></a></div>', name: 'Business Desk'};

Reuters.cobrand.COBRANDS["rpc433"] = { html: '<div class="cobrand" id="cobrandUnit" style="width: 190px; background: url(\'http://static.reuters.com/resources/media/editorial/20101209/12326_thumb_back_moneyextra.png\') no-repeat;"> <a id="link1" href="http://moneyextra.com" target="_blank" style="width: 190px; background: url(\'http://static.reuters.com/resources/media/editorial/20101209/12326_thumb_back_moneyextra.png\') no-repeat;"></a></div>', name: 'Money Extra'};

Reuters.cobrand.COBRANDS["rpc478"] = { html: '<div class="cobrand" id="cobrandUnit" style="width: 110px; background: url(\'http://static.reuters.com/resources/media/editorial/20101209/12323_thumb_back_gradiary.png\') no-repeat;"> <a id="link1" href="http://www.graddiary.com/" target="_blank" style="width: 110px; background: url(\'http://static.reuters.com/resources/media/editorial/20101209/12323_thumb_back_gradiary.png\') no-repeat;"></a></div>', name: 'Gradiary'};

Reuters.cobrand.COBRANDS["rpc438"] = { html: '<div class="cobrand" id="cobrandUnit" style="width: 170px; background: url(\'http://static.reuters.com/resources/media/editorial/20101209/12325_thumb_back_newfoxmedia.png\') no-repeat;"> <a id="link1" href="http://www.newfox-media.co.uk/" target="_blank" style="width: 170px; background: url(\'http://static.reuters.com/resources/media/editorial/20101209/12325_thumb_back_newfoxmedia.png\') no-repeat;"></a></div>', name: 'New Fox Media'};
Reuters.cobrand.initialize = function() {
  trace("initialized");
  this.rpcCodeQ = Reuters.utils.getQueryStringParameter(location.href, "rpc");
  trace("rpcCodeQ: " + this.rpcCodeQ);
  if (Reuters.lang.isNotEmpty(this.rpcCodeQ)) {
    YAHOO.util.Cookie.set("rpc", this.rpcCodeQ);
  }
  this.rpcCode = YAHOO.util.Cookie.get("rpc");
  trace("rpcCode: " + this.rpcCode);
  //If this is not the initial request containing the rpc in the url
  //and the referrer is not reuters, remove the cookie
  if (Reuters.lang.isEmpty(this.rpcCodeQ) && (document.referrer.indexOf("reuters") < 0)) {
    YAHOO.util.Cookie.remove("rpc");
    this.rpcCode=null;
  }
  trace("rpcCode: " + this.rpcCode);
  if (Reuters.lang.isNotEmpty(this.rpcCode)) {
    var cobrand = Reuters.cobrand.COBRANDS['rpc'+this.rpcCode];
    trace("cobrand: " + cobrand);
    if (Reuters.lang.isNotEmpty(cobrand)) {
      Reuters.utils.loadStylesheet('cobrand', '/resources_v2/css/rcom-cobrand.css');
      var cobrandDiv = document.createElement('div');
      cobrandDiv.id = 'cobrandShell';
      cobrandDiv.innerHTML = cobrand.html;
      var cobrandLoader = document.getElementById("cobrandLoader");
      if (cobrandLoader) {
         cobrandLoader.appendChild(cobrandDiv);
      }
      //document.write('<META name="WT.seg_4" content="' + cobrand.name + '">');
    }
  }
}
Reuters.utils.addLoadEvent(Reuters.cobrand.initialize);
Reuters.cobrand.COBRANDS["rpc468"] = { html: '<div class="cobrand" id="cobrandUnit" style="width: 161px; background: url(\'http://static.reuters.com/resources/media/editorial/20110114/motley_back_logo.gif\') no-repeat;"> <a id="link1" href="http://www.fool.co.uk/" target="_blank" style="width: 161px; background: url(\'http://static.reuters.com/resources/media/editorial/20110114/motley_back_logo.gif\') no-repeat;"></a></div>', name: 'Motley Fool'};

Reuters.cobrand.COBRANDS["rpc456"] = { html: '<div class="cobrand" id="cobrandUnit" style="width: 253px; background: url(\'http://static.reuters.com/resources/media/editorial/20110124/back_pearlfinders.gif\') no-repeat;"> <a id="link1" href="http://www.pearlfinders.com/uk/" target="_blank" style="width: 253px; background: url(\'http://static.reuters.com/resources/media/editorial/20110124/back_pearlfinders.gif\') no-repeat;"></a></div>', name: 'Pearl Finder'};

Reuters.cobrand.COBRANDS["rpc407"] = { html: '<div class="cobrand" id="cobrandUnit" style="width: 300px; background: url(\'http://static.reuters.com/resources/media/editorial/20110608/gazette_back.gif\') no-repeat;"> <a id="link1" href="http://www.thebirminghamgazette.co.uk/" target="_blank" style="width: 300px; background: url(\'http://static.reuters.com/resources/media/editorial/20110608/gazette_back.gif\') no-repeat;"></a></div>', name: 'Birmingham Gazette'};

