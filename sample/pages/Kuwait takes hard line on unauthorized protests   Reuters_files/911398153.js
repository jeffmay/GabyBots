/* AG-develop 12.7.1-649 (2012-09-20 11:43:57 CDT) */
rsinetsegs=['D08734_70252','D08734_70045','D08734_72417','D08734_70028','D08734_70066','D08734_70027','D08734_72080','D08734_70008','I07714_10383','D08734_70664','D08734_70671','D08734_70101','D08734_70675','D08734_70680','D08734_72076','D08734_72414','D08734_72079','D08734_70691','D08734_70693','D08734_70957','I07714_10173','I07714_10267','I07714_10272','D08734_70105','D08734_70009','D08734_70010','D08734_70012','D08734_70021','D08734_70033','D08734_70040','D08734_70043','D08734_70044','D08734_70050','D08734_70052','D08734_70060','D08734_70061','D08734_70065','D08734_70074','D08734_70079','D08734_70082','D08734_70085','D08734_70086','D08734_70094','D08734_70095','D08734_70098','D08734_70106','D08734_70107','D08734_70112','D08734_70113','D08734_70114','D08734_70116','D08734_70195','D08734_70620','D08734_70623','D08734_70625','D08734_70628','D08734_70629','D08734_70748','D08734_70758','D08734_71001','D08734_70663','D08734_72008','D08734_72009','D08734_72078','D08734_72081','D08734_72083','D08734_72771','I07714_10452','D08734_71244','D08734_72435','D08734_72731','D08734_72736','D08734_72743','D08734_71701','D08734_72420','D08734_72593','D08734_72595','D08734_72597','D08734_72693','D08734_72711','D08734_72712','D08734_72714','D08734_72715','D08734_72716','D08734_71161','D08734_71168','D08734_71228','D08734_71230','D08734_71322','I07714_10351','I07714_50000','I07714_50090','I07714_50128','I07714_50134'];
var rsiExp=new Date((new Date()).getTime()+2419200000);
var rsiDom=location.hostname;
rsiDom=rsiDom.replace(/.*(\.[\w\-]+\.[a-zA-Z]{3}$)/,'$1');
rsiDom=rsiDom.replace(/.*(\.[\w\-]+\.\w+\.[a-zA-Z]{2}$)/,'$1');
rsiDom=rsiDom.replace(/.*(\.[\w\-]{3,}\.[a-zA-Z]{2}$)/,'$1');
var rsiSegs="";
var rsiPat=/.*_5.*/;
for(x=0;x<rsinetsegs.length;++x){if(!rsiPat.test(rsinetsegs[x]))rsiSegs+='|'+rsinetsegs[x];}
document.cookie="rsi_segs="+(rsiSegs.length>0?rsiSegs.substr(1):"")+";expires="+rsiExp.toGMTString()+";path=/;domain="+rsiDom;
if(typeof(DM_onSegsAvailable)=="function"){DM_onSegsAvailable(['D08734_70252','D08734_70045','D08734_72417','D08734_70028','D08734_70066','D08734_70027','D08734_72080','D08734_70008','I07714_10383','D08734_70664','D08734_70671','D08734_70101','D08734_70675','D08734_70680','D08734_72076','D08734_72414','D08734_72079','D08734_70691','D08734_70693','D08734_70957','I07714_10173','I07714_10267','I07714_10272','D08734_70105','D08734_70009','D08734_70010','D08734_70012','D08734_70021','D08734_70033','D08734_70040','D08734_70043','D08734_70044','D08734_70050','D08734_70052','D08734_70060','D08734_70061','D08734_70065','D08734_70074','D08734_70079','D08734_70082','D08734_70085','D08734_70086','D08734_70094','D08734_70095','D08734_70098','D08734_70106','D08734_70107','D08734_70112','D08734_70113','D08734_70114','D08734_70116','D08734_70195','D08734_70620','D08734_70623','D08734_70625','D08734_70628','D08734_70629','D08734_70748','D08734_70758','D08734_71001','D08734_70663','D08734_72008','D08734_72009','D08734_72078','D08734_72081','D08734_72083','D08734_72771','I07714_10452','D08734_71244','D08734_72435','D08734_72731','D08734_72736','D08734_72743','D08734_71701','D08734_72420','D08734_72593','D08734_72595','D08734_72597','D08734_72693','D08734_72711','D08734_72712','D08734_72714','D08734_72715','D08734_72716','D08734_71161','D08734_71168','D08734_71228','D08734_71230','D08734_71322','I07714_10351','I07714_50000','I07714_50090','I07714_50128','I07714_50134'],'i07714');}