wpAd.config.templates = {

  //default templates
  default01: { what: ['leaderboard','flex','flex_re','flex_bb_hp','flex_ss_bb','flex_ss_tp','flex_ss_bb_hp', '120x240', '200x50', '150x60', '285x29', 'bigbox', 'bigbox_vi', 'inline_bb', 'itb', 'skyscraper', 'grid_bigbox'] },
  default02: { what: ['sponsor_links_bt'], hardcode: '<script type="text/javascript">wpAds.textlinks.init(wp_meta_data.contentType && wp_meta_data.contentType[0],"bt",commercialNode)</script>' },
  default03: { what: ['sponsor_links_in'], hardcode: '<script type="text/javascript">wpAds.textlinks.init(wp_meta_data.contentType && wp_meta_data.contentType[0],"in",commercialNode)</script>' },
  default04: { what: ['sponsor_links_rr'], hardcode: '<script type="text/javascript">wpAds.textlinks.init(wp_meta_data.contentType && wp_meta_data.contentType[0],"rr",commercialNode)</script>' },
  default05: { what: ['topjobs'], hardcode: '<script type="text/javascript" src="http://js.washingtonpost.com/wp-adv/topjobs3/top_jobs_v3.js"></script>' },

  //19847-JH-pptile
  not_on_homepage: {
    what: ['!leaderboard', '!pptile'],
    where: ['washingtonpost.com']
  },
  //19879-CD
  no_bb_arkadium: {
    what: ['!bigbox'],
    where: ['entertainment/arkadium']
  },
  local_page: {
    what: ['!leaderboard','!sponsor'],
    where: ['metro/front']
  },
  //10758-HS
  trulia_bb: {
    what: ['bigbox'],
    where: ['trulia']
  },
  re_front: {
    what: ['sponsor_community','sponsor_condo' ,'sponsor_new_home_builder'],
    where: ['realestate/front']
  },
  //18183-AL-251594600
  featured_agent: {
    what : ['sponsor_agent'],
    where : ['realestate/front'],
    when : ['201201110000/201212312359']
  },
  sponsor_spots_re: {
    what: ['sponsor_community','sponsor_condo','sponsor_new_home_builder'],
    where: ['realestate/neighborhoods/front', 'realestate/buy']
  },
  //20428-CD
  sponsor_spots_rentals:{
    what: ['featrent', 'featrent_2', 'featrent_3', 'featrent_4', 'featrent_5', 'featrent_6', 'featrent_7', 'featrent_8'],
    where: ['rentals']
  },
  jobs_336x60: {
    what: ['336x60'],
    where: ['jobs']
  },
  no_flex_mm: {
    what: ['!flex_ss_bb_hp'],
    where: ['multimedia/livevideo']
  },
  liveonlineflex: {
    what: ['!flex_ss_bb_hp'],
    where: ['multimedia/livevideo']
  },
  //15630-ML
  serviceAlley: {
    what: ['marketing'],
    where: ['blogs/front','local/front','local/trafficandcommuting/front','local/dc-politics/front','local/md-politics/front','local/virginia_politics/front','business/local-business/front','lifestyle/home/front','metro/front','metro/traffic','metro/dc/front','metro/md/front','metro/va/front','metro/transportation','metro/local-tools','business/localbusiness/front','artsandliving/homeandgarden/front','realestate','realestate/neighborhoods/front','rentals'],
    hardcode: '<script type="text/javascript" src="http://www.servicealley.com/javascripts/wapo-widget.js"></script>'
  },
  gog_deal: {
    what: ['deal'],
    where: ['metro/front','cityguide'],
    hardcode: function(){
      var a = {"metro":"11","artsandliving/foodanddining":"12","cityguide":"13","cityguide/restaurants":"14","cityguide/bars":"15","cityguide/movies":"16","cityguide/events":"17","cityguide/music":"18","cityguide/museums":"19","cityguide/theater":"20","cityguide/bestbets":"21","cityguide/kidfriendly":"22","cityguide/visitors":"23"};
      return a[commercialNode] ? '<script type="text/javascript" src="http://files.secondstreetmedia.com/washingtonpost/widget'+a[commercialNode]+'.js"></script>' : '';
    }
  },
  local_food_336x60: {
    what: ['336x60'],
    where: ['lifestyle/food/front','local/front'],
    hardcode: function(){
      var a = {"local/front":"11","lifestyle/food/front":"12"};
      return a[commercialNode] ? '<script type="text/javascript" src="http://files.secondstreetmedia.com/washingtonpost/widget'+a[commercialNode]+'.js"></script>' : '';
    }
  },
  serviceAlley_test: {
    what: ['marketing'],
    where: ['blogs/front','local/front','local/trafficandcommuting/front','local/dc-politics/front','local/md-politics/front','local/virginia_politics/front','business/local-business/front','lifestyle/home/front','lifestyle/home_garden','metro/front','metro/traffic','metro/dc/front','metro/md/front','metro/va/front','metro/transportation','metro/local-tools','business/localbusiness/front','artsandliving/homeandgarden/front','realestate','realestate/neighborhoods/front','rentals'],
    hardcode: /http\:\/\/qaprev\./.test(location.href) ?
      (!window.jQuery ? '<sc' + 'ript type="text/javascript" src="http://js.washingtonpost.com/wpost/js/combo?token=20120507181000&c=true&m=true&context=eidos&r=/jquery-1.4.js"></sc' + 'ript>' : '' )+'<sc' + 'ript type="text/javascript" src="http://bunsen.wapolabs.com/revplat/prod/1.4.5-3/js/revplat.wp-config.js"></sc' + 'ript><sc' + 'ript type="text/javascript" src="http://bunsen.wapolabs.com/revplat/prod/1.4.5-3/js/revplat.min.js"></sc' + 'ript><div id="rev_ad_6"></div>' :
      '<sc'+'ript type="text/javascript" src="http://www.servicealley.com/javascripts/wapo-widget.js"></scr'+'ipt>'
  },
  ups_no_inline_bb: {
    what: ['!inline_bb'],
    where: ['liveonline/viewpoint/nevellj']
  },
  //18875-CD
  re300x100: {
    what: ['300x100'],
    where: ['realestate']
  },
  //RICH P
  test_lep: {
    what: ['600x130'],
    where: ['jobs/front']
  },
  agoogleadaytest: {
    what: ['agoogleaday'],
    url_check: ['test_ads=agoogleaday']
  },
  js_tiff_test: {
    url_check: ['js_tiff'],
    what: ['tiffany_tile', 'tiffany_tile_2']
  },
  networknews_test: {
    url_check: ['test_ads=networknews'],
    what: ['nn_hp'],
    hardcode: '<div id="nn_ad_tile_hp" style="background-color: rgb(153, 153, 153); position: relative; padding: 0px; margin: 0px; height: 20px; width: 190px;"><img src="http://www.washingtonpost.com/wp-srv/images/spacer.gif" width="190" height="20"><div style="position: absolute; top: 5px; left: 5px; color: rgb(255, 255, 255); font-size: 12px; font-family: Arial,Helvetica,sans-serif;">190x20 Test Spot<br></div></div>'
  },
  liveslostgallery: {
    what : ['!nav_tile', '!tiffany_tile', '!leaderboard', '!extra_bb', '!leaderboard_2', '!bigbox', '!promo'],
    page_id: ['1000.1.3877687284']
  },
  //19907-ST-259338172, 259338173, 259338176, 259338178, 259338179, 259338180
  ING88x31: {
    what: ['88x31'],
    when: ['201207020000/201212312359']
  },
  //18182-AL-235419621
  lf336: {
    what: ['336x35_top'],
    where: ['realestate/front'],
    when: ['201201010000/201212312359']
  },
  //20187-CD
  pptileAudi: {
    what: ['pptile'],
    where: ['!washingtonpost.com', '!sports/blog/football_insider', '!sports/blog/nationals_journal'],
    when: ['201209100000/201211152359']
  },
  //20246-CD
  toprated_lawyers: {
    what: ['marketing'],
    where: ['lifestyle/magazine/front'],
    when: ['201209280000/201212312359'],
    hardcode: '<div style="height:30;background-color:rgb(243,243,243);text-align:center;"><a href="http://topratedlawyers.washingtonpost.com" target="_blank" style="font-size:1.2em;line-height:30px;">Click Here to view the Area\'s Top-Rated Lawyers</a></div>'
  },
  //20278-LB
  cfc_homepage: {
    what: ['336x60'],
    where: ['washingtonpost.com'],
    when: ['201210010000/201210052359','201210150000/201210192359','201210290000/201211022359','201211120000/201211162359','201212030000/201212072359']
  },
  //20246-JH
  topratedlawyers_2: {
    what: ['marketing_2'],
    where: ['lifestyle/magazine/front'],
  when: ['201201010000/201211032359'],
    hardcode: '<a href="http://www.washingtonpost.com/wp-adv/prod/capitolcuisine" target="_blank"><img src="//img.wpdigital.net/wp-adv/advertising/levya/img/magweek2.png" border="0" alt="Preview our New Special Section" /></a>'
  },
  //20364-CW
  bottom_lb_adx: {
    what: ['leaderboard_2']
  },
  //20406-LB
  moneygrab: {
    'what': ['extra_bb'],
  'where': ['!washingtonpost.com']
  },
  //20438-CD
  jc_penney_1030: {
    what: ['pushdown'],
    where: ['washingtonpost.com'],
    when: ['201211010000/201211012359']
  },
  //20452-CD
    bingbingbing: {
      'what': ['pushdown'],
      'where': ['washingtonpost.com'],
      'when': ['201211040000/201211042359']
  },
  //99999-JH
    private_schools: {
    what: ['marketing_2'],
    where: ['lifestyle/magazine/front'],
  when: ['201211040000/201212312359'],
    hardcode: '<a href="http://www.washingtonpost.com/wp-adv/prod/capitolcuisine" target="_blank"><img src="http://img.wpdigital.net/wp-adv/advertising/levya/img/magweek2.png" border="0" alt="Preview our New Special Section" style="display:block"/></a><a href="http://www.washingtonpost.com/wp-adv/prod/privateschools" target="_blank"><img src="http://img.wpdigital.net/wp-adv/prod/tiles/jpg/privateschoolstile.jpg" border="0" alt="Preview our New Special Section" style="display:block;margin-top:10px;"/></a>'
  },
  //20466-LB
  samsung: {
      //'what': ['pushdown'],
      'what': ['leaderboard'],
      'where': ['washingtonpost.com'],
      'when': ['201211050000/201211052359']
  },
  //20323-LB
    norfolksouthern_eday: {
      'what': ['pushdown'],
      'where': ['washingtonpost.com'],
      'when': ['201211060000/201211062359']
  },
  //20442-LB
    prudential: {
      'what': ['pushdown'],
      'where': ['washingtonpost.com'],
      'when': ['201211070000/201211072359']
  },
  //20439-LB
    ups: {
      'what': ['pushdown'],
      'where': ['washingtonpost.com'],
      'when': ['201211080000/201211082359']
  }
};

wpAd.config.adtypes = {
  "120x240": { "size": [[120,240]], "keyvalues": { "ad": ["120x240"] } },
  "300x100": { "size": [[300,100]] },
  "336x35": { "size": [[336,35]], "keyvalues": { "ad": ["336x35"], "pos": ["ad19"] } },
  "336x35_top": { "size": [[336,35]], "keyvalues": { "ad": ["336x35"] } },
  "336x60": { "size": [[336,60]], "keyvalues": { "ad": ["336x60"] } },
  "200x50": { "size": [[200,50]], "keyvalues": { "ad": ["200x50"] } },
  "150x60": { "size": [[150,60]], "keyvalues": { "ad": ["150x60"] } },
  "285x29": { "size": [[285,29]], "keyvalues": { "ad": ["285x29"] } },
  "600x130": { "size": [[600,130]] },
  "88x31": { "size": [[88,31]] },
  "agoogleaday": { "size": [[1,1]] },
  "bigbox": { "size": [[300,250]], "keyvalues": { "ad": ["bb"], "pos": ["ad20"] } },
  "deal": { "size": [[1,1]], "keyvalues": { "ad": ["deal"], "pos": ["ad45"] } },
  "extra_bb": { "size": [[300,250]], "keyvalues": { "ad": ["bb"], "pos": ["ad44"] } },
  "featrent": { "size": [[1,1]] },
  "featurebar": { "size": [[446,33]], "keyvalues": { "ad": ["fb"], "pos": ["ad7"] } },
  "flex": { "size": [[336,850]], "keyvalues": { "ad": ["hp"] } },
  "flex_bb_hp": { "size": [[300,250],[300,600],[336,850]], "keyvalues": { "ad": ["hp","bb"], "pos": ["ad16"] } },
  "flex_re": { "size": [[300,250],[300,600]], "keyvalues": { "ad": ["bb","tp"] } },
  "flex_ss_bb": { "size": [[160,600],[300,250]], "keyvalues": { "ad": ["ss","bb"] } },
  "flex_ss_bb_hp": { "size": [[160,600],[300,250],[300,600],[336,850]], "keyvalues": { "ad": ["ss","bb","hp"], "pos": ["ad6"] } },
  "flex_ss_tp": { "size": [[300,250],[300,600]], "keyvalues": { "ad": ["bb","tp"] } },
  "grid_bigbox":  { "size": [[300,250]] },
  "inline_bb": { "size": [[300,250]], "keyvalues": { "ad": ["inline_bb"] } },
  "itb": { "size": [[1,1]] },
  "leaderboard": { "size": [[728,90]], "keyvalues": { "ad": ["lb"], "pos": ["ad1"] } },
  "leaderboard_2": { "size": [[728,90]], "keyvalues": { "ad": ["lb"], "pos": ["ad2"] } },
  "marketing": { "size": [[1,1]] },
  "mm_overlay": { "size": [[1,1]] },
  "nav_tile": { "size": [[1,1]] },
  "nn": { "size": [[200,80]] },
  "nn_footer": { "size": [[200,30]], "keyvalues": { "ad": ["nn_footer"] } },
  "nn_hp": { "size": [[190,20]], "keyvalues": { "ad": ["nn_hp"] } },
  "nn_rr": { "size": [[200,80]], "keyvalues": { "ad": ["nn_rr"] } },
  "nn_sidebar": { "size": [[200,30]], "keyvalues": { "ad": ["nn_sidebar"] } },
  "pptile": { "size": [[300,60]] },
  "promo": { "size": [[200,60]] },
  "pushdown": { "size": [[1,1]], "keyvalues": { "pos": ["ad43"] } },
  "skyscraper": { "size": [[160,600]], "keyvalues": { "ad": ["ss"], "pos": ["ad3"] } },
  "sponsor": { "size": [[1,1]] },
  "sponsor_links_bt": { "size": [[1,1]] },
  "sponsor_links_in": { "size": [[1,1]] },
  "sponsor_links_rr": { "size": [[1,1]] },
  "tiffany_tile": { "size": [[184,90],[200,60]], "keyvalues": { "ad": ["tiff"], "pos": ["ad14"] } },
  "tooltile": { "size": [[1,1]] },
  "topjobs": { "size": [[1,1]] }
};
