if((location.href.match('test_ads=fixad') || location.href.match('allAds')) || (estNowWithYear >= '201001040000' && estNowWithYear <= '201001102359') && !location.href.match('no_ads'))
{
	//document.write('<div style="margin-bottom:4px"><a href="http://www.adobe.com" target="_blank"><img src="http://media.washingtonpost.com/wp-adv/advertisers/adobe/images/adobe_147x41.gif" alt="" width="147" height="41" border="0" /></a></div>');
	document.write('<iframe width="147" height="41" frameborder="0" scrolling="no" style="margin-bottom:4px" marginwidth="0" marginheight="0" src="http://ad.doubleclick.net/adi/wpni.politics/fedpage/thefix;dir=thefixnode;dir=politics;dir=fedpage;dir=thefix;ad=147x41;sz=147x41;ord='+Math.round(Math.random()*10000000)+'?"></iframe>');
};