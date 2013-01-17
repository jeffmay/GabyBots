var wpTiles = {
  tools : {
    log : function (a) { if (window.console) { console.log(a); } },
    commercialNode : (typeof commercialNode !== 'undefined') ? commercialNode:'technology',
    urlCheck : window.urlCheck || function(arg){
      var loc = parent.window.location.href || doc.referrer,
        obj = (arguments[1] && typeof arguments[1] === 'object') ? arguments[1] : null,
        regex = (obj !== null && obj.type === 'variable') ? new RegExp("[\\?&;]" + arg + "=([^&#?]*)") : new RegExp(arg),
        results = regex.exec(loc);
      return(results === null) ? null : results[results.length - 1];
    },
    ord : window.wpAd && wpAd.keyvalues && wpAd.keyvalues.ord ? wpAd.keyvalues.ord() : Math.floor(Math.random()*1E18),
    getCookie : (typeof getCookie === 'function') ? getCookie:function (name) {
      return ((" " + document.cookie.length > 0) && (" " + document.cookie.indexOf(" " + name + "=") !== -1)) ? ((" " + document.cookie.indexOf(';', " " + document.cookie.indexOf(" " + name + "=") + " " + name + "=".length)) === -1) ? unescape(" " + document.cookie.substring((" " + document.cookie.indexOf(" " + name + "=") + " " + name + "=".length), " " + document.cookie.length)):unescape(" " + document.cookie.substring((" " + document.cookie.indexOf(" " + name + "=") + " " + name + "=".length), " " + document.cookie.indexOf(';', (" " + document.cookie.indexOf(" " + name + "=") + " " + name + "=".length)))):'';
    },
    adOpsLocalFlag : window.wpAd && wpAd.flags ? function(){return wpAd.flags.is_local;} : function () { return (wpTiles && wpTiles.tools && wpTiles.tools.getCookie('WPATC') && wpTiles.tools.getCookie('WPATC').match('C=1:')) ? true:false; },
    estNowWithYear : (typeof estNowWithYear !== 'undefined') ? function(){
      return estNowWithYear;
    }:(function(){
      var a = new Date(),
      e = a.getTime(),
      t = a.getDate(),
      // z = get date of the first sunday in the current month.
      z = (a.getDate() - a.getDay())%7,
      // s = if the current date is or before the first sunday of the current month, then the result will be 7 less than . This check returns the correct date of the first sunday of this month.
      s = (z<=0) ? z + 7 : z,
      n = a.getMonth() + 1,
      m = (a.getTimezoneOffset() - ((n < 3 || n > 11) ? 300:(n > 3 && n < 11) ? 240:(n === 3) ? (t > (s+7) || (t == (s+7) && a.getHours() >= 2)) ? 240:300:(t > s || (t == s && a.getHours() >= 2)) ? 300:240)) * 60000,
      b = new Date(e + m),
      d = '' + ((b.getYear() < 1900) ? b.getYear() + 1900:b.getYear()) + (((b.getMonth() + 1) < 10) ? "0" + (b.getMonth() + 1):(b.getMonth() + 1)) + ((b.getDate() < 10) ? "0" + b.getDate():b.getDate()) + ((b.getHours() < 10) ? "0" + b.getHours():b.getHours()) + ((b.getMinutes() < 10) ? "0" + b.getMinutes():b.getMinutes());
      
      window.estNowWithYear = d.toString();
    })(),
    location : function () {
      var cn;
      wpTiles.tools.commercialNode = (wpTiles.tools.urlCheck('demoAds', {'type': 'variable'})) ? wpTiles.tools.dcNodeOverride():wpTiles.tools.commercialNode;
      //wpTiles.tools.commercialNode = (wpTiles.tools.urlCheck('demoAds', {'type': 'variable'}) && wpTiles.tools.urlCheck('demoAds', {'type': 'variable'}).match('tiffanytile')) ? wpTiles.tools.dcNodeOverride():wpTiles.tools.commercialNode;
      cn = wpTiles.tools.commercialNode;
      cn += (wpTiles.tools.commercialNode === 'washingtonpost.com' && wpTiles.tools.urlCheck('reload=true')) ? '/tiffrefresh':'';
      cn += (wpTiles.tools.commercialNode === 'metro' && (typeof commercialPageType != 'undefined' && commercialPageType === 'front')) ? '/front':'';
      cn += ((wpTiles.tools.commercialNode === 'artsandliving' || wpTiles.tools.commercialNode === 'opinion' || wpTiles.tools.commercialNode === 'sports') && wpTiles.tools.urlCheck('/wp-dyn/content/'+wpTiles.tools.commercialNode)) ? '/front':'';
      return cn;
    },
    dcNodeOverride : function () {
      return urlCheck('dcnode', {type : 'variable'}) || wpTiles.tools.commercialNode;
    },
    makeArrays : function (a) {
      for (var b in a) {
        if (typeof a[b] === 'String') {
          a[b] = [a[b]];
        }
      }
    },
    delivery : function (a) {
      for (var b in a) {
        if (b === 'delivery') {
          return a[b];
        }
      }
      return 'adi';
    },
    subscriber : function () {
      return (wpTiles.tools.getCookie('WPATC') !== null) ? (wpTiles.tools.getCookie('WPATC').match('P=1:')) ? true:false:false;
    },
    buildTestFilghts : function (a) {
      if ((wpTiles.tools.urlCheck('allAds') || (wpTiles.tools.urlCheck('demoAds', {'type': 'variable'}) && wpTiles.tools.urlCheck('demoAds', {'type': 'variable'}).match('tiffanytile'))) && a === 'tiff'){
        try{console.log(a);}catch(e){}
        wpTiles.tiff.flights = {
          test : {
            dates : [estNowWithYear + '/' + estNowWithYear],
            locations : [wpTiles.tools.location()],
            width : '184',
            height : '90'
          }
        };
        try{console.log(wpTiles.tiff.flights);}catch(e){}
      }
    },
    getFlashVer : function(){
      var i,a,o,p,s="Shockwave",f="Flash",t=" 2.0",u=s+" "+f,v=s+f+".",rSW=RegExp("^"+u+" (\\d+)");
      if((o=navigator.plugins)&&(p=o[u]||o[u+t])&&(a=p.description.match(rSW)))return a[1];
      else if(!!(window.ActiveXObject))for(i=10;i>0;i--)try{if(!!(new window.ActiveXObject(v+v+i)))return i;}catch(e){}
      return 0;
    }
  },
  checks : {
    date : function (a, tileType) {
      var b, c, d, e, f;
      for (b in a) {
        if (b == 'dates') {
          c = a[b].length;
          for (d = 0; d < c; d = d + 1) {
            e = a[b][d].split('/')[0];
            f = a[b][d].split('/')[1];
            if (estNowWithYear >= e && estNowWithYear <= f) {
              wpTiles.checks.commercialNode(a, tileType);
            }
          }
        }
      }
    },
    commercialNode : function (a, tileType) {
      var b, c, d, e, f, l, array_with_cc, loc, check = false;
      if (wpTiles.tools.location !== '') {
        loc = wpTiles.tools.location();
        for (b in a) {
          if (b === 'locations') {
            l = a[b].length;
            array_with_cc = a[b];
            while(l--){
              if (typeof wpTiles.contentCategory[a[b][l]] !== 'undefined') {
                array_with_cc = wpTiles.contentCategory[a[b][l]].concat(array_with_cc);
              }
            }
            e = array_with_cc;
            c = e.length;
            for (d = 0; d < c; d = d + 1) {
              f = new RegExp("^"+e[d].replace(/^\!/,''),"g");
              if (loc.match(f)) {
                if(!e[d].match(/^\!/)){
                  check = true;
                } else {
                  check = false;
                }
              }
            }
            if(check){
              wpTiles.checks.local(a, tileType);
              break;
            } else {
              return false;
            }
          }
        }
      } else {
        return false;
      }
    },
    local : function (a, tileType) {
      var b;
      for (b in a) {
        if (b === 'local') {
          if ((a[b][0] && !wpTiles.tools.adOpsLocalFlag()) || (!a[b][0] && wpTiles.tools.adOpsLocalFlag())) {
            return false;
          }
        }
      }
      wpTiles[tileType].exec(a);
    }
  },
  contentCategory : {
    cc_broadNode : ['politics', 'business', 'opinion', 'washingtonpost.com'],
    cc_classifieds : ['weather', 'cars', 'cityguide', 'jobs', 'cars', 'shopping'],
    cc_jrs : ['jobs', 'rentals', 'shopping'],
    cc_health : ['health', 'education'],
    cc_entertainment : ['artsandliving/movies', 'artsandliving/television', 'artsandliving/entertainmentnews', 'artsandliving/dvdhomevideo'],
    cc_artsandliving : ['artsandliving/adviceandrelationships', 'artsandliving/books', 'artsandliving/comics', 'artsandliving/crosswords', 'artsandliving/fashionandbeauty', 'artsandliving/foodanddining', 'artsandliving/homeandgarden', 'artsandliving/museums', 'artsandliving/music', 'artsandliving/pets', 'artsandliving/style', 'artsandliving/theater', 'artsandliving/horoscopes', 'travel'],
    //19584-MB
    cc_execnews : ['bloomberg', 'business', 'liveonline', 'nation', 'national', 'opinion', 'opinions', 'politics', 'print', 'technology', 'world'],
    cc_local : ['cityguide', 'weather', 'cars', 'shopping', 'shoppingNEW', 'shoppingOLD', 'jobs']
  },
  init : function (a) {
    wpTiles.tools.buildTestFilghts(a);
    for (var b in wpTiles[a].flights) {
      if(!wpTiles[a].flights[b].preempt && !wpTiles[a].executed){
        if (b !== null) {
            wpTiles.checks.date(wpTiles[a].flights[b], a);
        }
        else {
          break;  
        }
      }
    }
    for (var k in wpTiles[a].flights) {
      if(wpTiles[a].flights[k].preempt && !wpTiles[a].executed){
        if (k !== null) {
            wpTiles.checks.date(wpTiles[a].flights[k], a);
        }
        else {
          break;  
        }
      }
    }
    delete wpTiles[a];
  },
  336 : {
    exec : function (a) {
      if (typeof a.hardcode!='undefined' && a.hardcode[0]) {
        document.write('<div style="margin-bottom : 10px">' + a.hardcode[0] + '</div>');
      }
      else{
        document.write('<div style="margin-bottom : 10px"><iframe src="http://ad.doubleclick.net/adi/wpni.washingtonpost.com;kw=' + a.keyvalue + ';ad=336x60;sz=336x60;ord=' + wpTiles.tools.ord + '?" width="336" height="60" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" style="margin-bottom : 3px"></iframe></div>');
      }
    },
    executed:false
  },
  featurebar : {
    exec : function() {
      if(commercialNode != 'cityguide' && commercialNode != 'weather')
      {document.writeln ('<div align="left" style="padding:3px 0px 3px 0px"><img src="http://media3.washingtonpost.com/wp-srv/hp/img/ad_label_leftjust.gif" alt="ad_icon" width="100" height="13" border="0"/></div>' );}
      placeAd('SECTION',commercialNode,7,';ad=fb;',true);
      try{
        document.getElementById('ad7').style.paddingBottom = '5px';
      }catch(err){}
      
      if((commercialNode.match('opinion') || commercialNode.match('politics')) && document.getElementById('ad7'))
      {
        document.getElementById('ad7').style.textAlign = 'left';
      }
      
      if(commercialNode == 'cityguide')
      {
      
        if(document.getElementById('ad7') && document.getElementById('bread_crumbs'))
        {
          document.getElementById('wrapperMain').style.position = 'relative';
          var ad7 = document.getElementById('ad7');
          document.getElementById('bread_crumbs').style.paddingBottom = "15px";
          ad7.style.marginBottom = '5px';
          ad7.style.position = 'absolute';
          ad7.style.top = '0px';
          ad7.style.left = '0px';
        }
      }    
    }    
  },
  nav_tile : {
    exec : function (a) {
      if (a.hardcode[0] && document.getElementById('target-button') && wpTiles.tools.getFlashVer()>=9) {
        document.getElementById('target-button').innerHTML = a.hardcode[0];
        document.getElementById('target-button').style.display = 'block';
      }
    }
  },
  networknews : function (a) {
    if (typeof NetworkNews !== 'undefined' && typeof NetworkNews.Constants !== 'undefined'){
      NetworkNews.Constants.hasAd = true;
    }
    if(/*urlCheck('test_ads=cc_networknews') && */a.type.hardcode && a.adType){
      document.write('<div id="nn_ad_tile_'+a.adType+'">'+a.type.hardcode+'</div>');
    }
    else{
      document.write('<div id="nn_ad_tile_' + a.type + '" style="background-color: rgb(153, 153, 153); position: relative; padding: 0px; margin: 0px; height: ' + a.height + 'px; width: ' + a.width + 'px;"><img src="http://www.washingtonpost.com/wp-srv/images/spacer.gif" width="' + a.width + '" height="' + a.height + '"><div style="position: absolute; top: 5px; left: 5px; color: rgb(255, 255, 255); font-size: 12px; font-family: Arial,Helvetica,sans-serif;">' + a.width + 'x' + a.height + ' Test Spot<br></div></div>');
    }
  },
  nn_hp : {
    executed : false,
    exec : function (a) { 
      wpTiles.networknews({width:'190', height:'20', type:a}); 
      wpTiles.nn_hp.executed = true;
    } 
  },
  nn_footer : {
    executed : false,
    exec : function (a) {
      wpTiles.networknews({width:'200', height:'30', type:a});
      wpTiles.nn_footer.executed = true;
    }
  },
  nn_sidebar : {
    executed : false,
    exec : function (a) {
      wpTiles.networknews({width:'200', height:'30', type:a});
      wpTiles.nn_sidebar.executed = true;
    } 
  },
  nn_rr : {
    executed : false,
    exec : function (a) { 
      wpTiles.networknews({width:'200', height:'30', type:a, adType:'nn_rr'});
      wpTiles.nn_rr.executed = true;
    }
  },
  subscriber : {
    exec : function (a) {
      if ((a.subscriber[0] && wpTiles.tools.subscriber()) || (!a.subscriber[0] && !wpTiles.tools.subscriber())) {
        document.write('<img src="http://media.washingtonpost.com/wp-srv/gr/label-from-twp.gif" width="119" height="14" alt="From The Washington Post" title="From The Washington Post" id="fromThePostLabel" class="label"/>');
        document.write(a.hardcode[0]);
      } else if (document.getElementById('fromThePostLabel')) {
        document.getElementById('fromThePostLabel').style.display = 'none';
      }
    }
  },
  293 : {
    exec : function (a) {
      if (a.hardcode[0]) {
        document.getElementById('padb_slug').style.display = 'block';
        document.write(a.hardcode[0]);
      } else if (document.getElementById('padb_slug')) {
        document.getElementById('padb_slug').style.display = 'none';
      }
    }
  },
  90 : {
    exec : function(a){
      if(a.hardcode[0]){
        document.write(a.hardcode[0]);
      }
    }
  },
  hasTiff : false,
  tiff : {
    executed : false,
    exec : function (a) {
      function render_tiff(pos){
        var commercialNode = wpTiles.tools.location(),
        commercial_node = commercialNode + ((commercialNode === 'washingtonpost.com' && wpTiles.tools.urlCheck('reload=true')) ? '/tiffrefresh':''),
        tiffDiv = document.getElementById('slug_'+pos) ? document.getElementById('slug_'+pos):document.getElementById('adTiff'),
        tiffIframe = document.createElement('iframe'),
        tiffOnTheFly = wpTiles.tools.urlCheck('test_ads', {type : 'variable'}) ? 'kw=test_' + wpTiles.tools.urlCheck('test_ads', {type : 'variable'}) + ';':'',
        tiffTD;
        
        tiffOnTheFly += typeof dfpcomp !== 'undefined' ? 'dfpcomp='+dfpcomp+';' : '';
        tiffOnTheFly += window.uKeyvalue ? window.uKeyvalue() : '';

        wpTiles.hasTiff = true;
        tiffDiv.style.display = 'block';
        tiffDiv.style.position = 'absolute';
        tiffDiv.style.right = '0px';
        tiffDiv.style.bottom = '0px';
        tiffDiv.style.marginBottom = '2px';
        tiffDiv.parentNode.style.position = 'relative';
        if (a.hardcode && a.hardcode !=='') {
          if (typeof a.hardcode[0] !== 'function') {
            document.write(a.hardcode[0]);
          } else {
            a.hardcode[0]();
          }
        } else if (a.placead && a.placead !== '') {
          placeAd('SECTION',commercialNode,14,'',true);
        } else {
          tiffIframe.src= 'http://ad.doubleclick.net/adi/wpni.' + commercial_node + ';pos='+pos+';ad=tiff;sz=184x90,200x60;beta=n;' + tiffOnTheFly + 'ord=' + Math.floor(Math.random()*1E10) + '?';
          tiffIframe.width = a.width;
          tiffIframe.height = a.height;
          tiffIframe.frameBorder = 0;
          tiffIframe.marginHeight = 0;
          tiffIframe.marginWidth = 0;
          tiffIframe.scrolling = "no";
          if(!document.getElementById('tiffTD_'+pos)) {
            tiffTD = document.createElement('div');
            tiffTD.id = 'tiffTD_'+pos;
            tiffDiv.appendChild(tiffTD);
          }
          document.getElementById('tiffTD_'+pos).appendChild(tiffIframe);
        }
      }
      if ((!wpTiles.tools.urlCheck('demoAds') && !wpTiles.tools.urlCheck('no_ads')) || (wpTiles.tools.urlCheck('demoAds', {'type': 'variable'}) && wpTiles.tools.urlCheck('demoAds', {'type': 'variable'}).match('tiffanytile'))) {
        render_tiff('tiffany_tile');
        if(document.getElementById('slug_tiffany_tile_2')){
          render_tiff('tiffany_tile_2');
        }
        wpTiles.tiff.executed = true;
      }
    }
  }
};
  
if(wpTiles.tools.urlCheck('test_ads=networknews')){
  wpTiles.nn_hp.flights = {
    13179 : { dates : [estNowWithYear + '/' + estNowWithYear], locations : [wpTiles.tools.location()] }
  };
  wpTiles.nn_footer.flights = {
    13179 : { dates : [estNowWithYear + '/' + estNowWithYear], locations : [wpTiles.tools.location()] }
  };
  wpTiles.nn_sidebar.flights = {
    13179 : { dates : [estNowWithYear + '/' + estNowWithYear], locations : [wpTiles.tools.location()] }
  };
  wpTiles.nn_rr.flights = {
    13179 : { dates : [estNowWithYear + '/' + estNowWithYear], locations : [wpTiles.tools.location()] }
  };
}
/*else if(wpTiles.tools.urlCheck('test_ads=cc_networknews')){*/
else{
  wpTiles.nn_rr.flights = {
    12250 : { dates : ['201010110000/201012312359'], locations : [wpTiles.tools.location()], hardcode:'<img src="http://imp.constantcontact.com/imp/cmp.jsp?impcc=IMP_143029301421510&o=http://img.constantcontact.com/lp/images/standard/spacer.gif" alt="" style="display:none;width:1px;height:1px;border:0"/><a href="http://altfarm.mediaplex.com/ad/ck/14302-93014-2151-0?mpt='+wpTiles.tools.ord+'" target="_blank"><img src="http://www.washingtonpost.com/wp-adv/advertisers/constant_contact/wp/201010/ConstantContact_201010_200x30.png" width=200"" height=30"" alt="" border="0" /></a><img src="http://altfarm.mediaplex.com/ad/tr/14302-93014-2151-0?mpt='+wpTiles.tools.ord+'" alt="" style="display:none;width:1px;height:1px;border:0" /><script src="http://puma.vizu.com/cdn/00/00/06/21/tracking_only.js?adid=logo;siteid=washingtonpost;" type="text/javascript"></script><img src="http://haku.vizu.com/a.gif?cid=621;adid=logo;siteid=washingtonpost;?'+wpTiles.tools.ord+'" alt="" style="display:none;width:1px;height:1px;border:0"/>' }
  };
}

wpTiles.featurebar.flights = {
  13405 : {
    dates : ['201004190000/201012312359'], locations : ['realestate/propertyvalue']
  },
  14224 : {
    dates : ['201007260000/201107252359'], locations : ['artsandliving/theater']  
  }
};

//if(wpTiles.tools.urlCheck('test_ads=targettile')){
  wpTiles.target = {
    exec : function(){
      b = document.getElementById('brand-wrapper');
      b.className = 'target';
      link = document.createElement('link');
      link.href = 'http://media.washingtonpost.com/wp-adv/advertisers/target/target.css';
      link.rel = 'stylesheet';
      link.type = 'text/css';
      document.getElementsByTagName('head')[0].appendChild(link);
      
      if(document.getElementsByTagName("body")[0].className){
        document.getElementsByTagName("body")[0].className+=" target";
      }
      else{
        document.getElementsByTagName("body")[0].className="target";
      }
      
      c = document.createElement('div');
      c.id = 'target';
      b.appendChild(c);
      c.innerHTML = '<div class="close" onclick="javascript:wpTiles.target.close()">close x</div><object type="application/x-shockwave-flash" data="http://media.washingtonpost.com/wp-adv/advertisers/target/TargetGannett_70x22_Click_r08.swf" width="950" height="950" id="target-circular"><param name="movie" value="http://media.washingtonpost.com/wp-adv/advertisers/target/TargetGannett_70x22_Click_r08.swf"\/><param name="quality" value="high"\/><param name="wmode" value="transparent"\/><param name="menu" value="false"\/><param name="allowfullscreen" value="false"\/><param name="allowScriptAccess" value="always"\/><\/object><img src="http://ad.doubleclick.net/ad/N3550.WashingtonPost/B5040651.2;sz=1x1;ord='+wpTiles.tools.ord+'?" border="0" width="1" height="1" alt="" style="display:none" />';
    },
    close : function(){
      t = document.getElementById('target');
      document.getElementById('brand-wrapper').removeChild(t);
      c = document.getElementsByTagName('body')[0].className.replace(/target/,'');
      document.getElementsByTagName('body')[0].className = c;
    }
  };
  
  wpTiles.nav_tile.flights = {
    12345 : {
      dates : [estNowWithYear + '/' + estNowWithYear], locations : ['artsandliving','metro'], hardcode : ['<a href="javascript:wpTiles.target.exec()"><img src="http://media.washingtonpost.com/wp-adv/advertisers/target/images/target_tile_30x90.gif" alt="" width="90" height="29" border="0"/></a><img src="http://ad.doubleclick.net/ad/N3550.WashingtonPost/B5040651.3;sz=1x1;ord='+wpTiles.tools.ord+'?" border="0" width="1" height="1" alt="" style="display:none" />']
    }
  };
//}

wpTiles.subscriber.flights = {
  15268 : { dates : ['201102280000/201105272359'], locations : ['washingtonpost.com'], subscriber : [false], hardcode : ['<div><a target="_blank" href="https://subscription.washpost.com/subscriberservices/subscriber.portal?state=welcome&oscode=RPW8"><img height="100" width="293" border="0" alt="" src="http://media.washingtonpost.com/wp-adv/advertisers/twp/images/SpringDeal_293X100_hmpg.gif"></a></div>'] }
};

wpTiles['293'].flights = {
  9229 : {
    dates : ['201004300000/201006302359'], locations : ['washingtonpost.com'], local : [true], hardcode : ['<a href="https://subscription.washpost.com/subscriberservices/subscriber.portal?state=capbiznewsub" target="_blank"><img border="0" src="http://www.washingtonpost.com/wp-adv/advertisers/capbiz/images/293x100_static_gov.gif" alt="" width="293" height="100"/></a>']
  }
};

wpTiles['90'].flights = {
  15253 : {
    dates : ['201101180000/201103092359'],
    locations : ['business/front'],
    hardcode : ['<div style="text-align:right;"><span style="display:inline-block;font-size:12px;line-height:12px;margin:10px 5px 0 0;color:#a5a49f;">SPONSORED BY HSBC</span><a href="http://ad.doubleclick.net/clk;234724207;58510481;c?http://www.us.hsbc.com/1/2/3/hsbcpremier/prom/jan-11?code=WES0020831&WT.mc_id=HBUS_WES0020831" target="_blank"><img border="0" src="http://media.washingtonpost.com/wp-adv/advertisers/hsbc/business/90x32/HSBC_w_tagline_4C.jpg" alt="" width="90" height="32" /></a><img src="http://ad.doubleclick.net/ad/N630.washingtonpost/B5154568.3;sz=1x1;ord='+wpTiles.tools.ord+'" border="0" height="1" width="1" alt="" style="display:none;" /></div>']
  }
};

wpTiles['336'].flights = {
  14679: {
    dates : ['201009200000/201012152359'],locations : ['washingtonpost.com'],hardcode : ['<a href="http://www.washingtonpost.com/wp-adv/advertisers/cfc/" target="_blank"><img src="http://www.washingtonpost.com/wp-adv/advertisers/cfc/09_2010/2010_CFCNCA_WP_homepg_tile.gif" width="336" height="60" /></a>']
  },
  15284 : {
    dates : ['201101040000/201101111000'], locations : ['washingtonpost.com'], hardcode : ['<a href="http://washingtonpostlive.com/conferences/sports/live" target="_blank"><img src="http://media.washingtonpost.com/wp-adv/advertisers/businessofsports/2011/businessofsports-316x72.jpg" border="0" height="72" width="316" alt="advertisement" /></a>']
  },
  15291 : {
    dates : ['201101070000/201101222359'], locations : ['washingtonpost.com'], keyvalue : 'postfun'
  }
};

/*wpTiles['336'].flights = {
  99999 : {
    dates : ['201005010000/201005302359'], locations : ['washingtonpost.com'], keyvalue : 'matt'
  }
}*/

try{wpTiles.init('nav_tile');}catch(e){}


if(typeof placeAd2!=='function'){
document.write('<script type="text/javascript" src="http://media.washingtonpost.com/wp-srv/ad/tile_flights.js"><\/script>');
}
