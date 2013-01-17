function setTabsC(settab)
{
	 BRTabsC(settab);
}


function BRTabsC(tab) {
                switch (tab) {
                    case "BRtab1C":
                        document.getElementById('BRcontent1C').className = 'br-content-on';
                        document.getElementById('BRcontent2C').className = 'br-content-off';
						document.getElementById('BRcontent3C').className = 'br-content-off';
						document.getElementById('BRcontent4C').className = 'br-content-off';
						document.getElementById('BRcontent5C').className = 'br-content-off';
						
						document.getElementById('BRtab1C').className = 'br-tabs-on';
						document.getElementById('BRtab2C').className = 'br-tabs-off';
						document.getElementById('BRtab3C').className = 'br-tabs-off';
						document.getElementById('BRtab4C').className = 'br-tabs-off';
						document.getElementById('BRtab5C').className = 'br-tabs-off';
                        break;
                    case "BRtab2C":
                        document.getElementById('BRcontent1C').className = 'br-content-off';
                        document.getElementById('BRcontent2C').className = 'br-content-on';
						document.getElementById('BRcontent3C').className = 'br-content-off';
						document.getElementById('BRcontent4C').className = 'br-content-off';
						document.getElementById('BRcontent5C').className = 'br-content-off';
						
						document.getElementById('BRtab1C').className = 'br-tabs-off';
						document.getElementById('BRtab2C').className = 'br-tabs-on';
						document.getElementById('BRtab3C').className = 'br-tabs-off';
						document.getElementById('BRtab4C').className = 'br-tabs-off';
						document.getElementById('BRtab5C').className = 'br-tabs-off';
                        break;
					case "BRtab3C":
                        document.getElementById('BRcontent1C').className = 'br-content-off';
                        document.getElementById('BRcontent2C').className = 'br-content-off';
						document.getElementById('BRcontent3C').className = 'br-content-on';
						document.getElementById('BRcontent4C').className = 'br-content-off';
						document.getElementById('BRcontent5C').className = 'br-content-off';
						
						document.getElementById('BRtab1C').className = 'br-tabs-off';
						document.getElementById('BRtab2C').className = 'br-tabs-off';
						document.getElementById('BRtab3C').className = 'br-tabs-on';
						document.getElementById('BRtab4C').className = 'br-tabs-off';
						document.getElementById('BRtab5C').className = 'br-tabs-off';
                        break;
					case "BRtab4C":
                        document.getElementById('BRcontent1C').className = 'br-content-off';
                        document.getElementById('BRcontent2C').className = 'br-content-off';
						document.getElementById('BRcontent3C').className = 'br-content-off';
						document.getElementById('BRcontent4C').className = 'br-content-on';
						document.getElementById('BRcontent5C').className = 'br-content-off';
						
						document.getElementById('BRtab1C').className = 'br-tabs-off';
						document.getElementById('BRtab2C').className = 'br-tabs-off';
						document.getElementById('BRtab3C').className = 'br-tabs-off';
						document.getElementById('BRtab4C').className = 'br-tabs-on';
						document.getElementById('BRtab5C').className = 'br-tabs-off';
                        break;
					case "BRtab5C":
                        document.getElementById('BRcontent1C').className = 'br-content-off';
                        document.getElementById('BRcontent2C').className = 'br-content-off';
						document.getElementById('BRcontent3C').className = 'br-content-off';
						document.getElementById('BRcontent4C').className = 'br-content-off';
						document.getElementById('BRcontent5C').className = 'br-content-on';
						
						document.getElementById('BRtab1C').className = 'br-tabs-off';
						document.getElementById('BRtab2C').className = 'br-tabs-off';
						document.getElementById('BRtab3C').className = 'br-tabs-off';
						document.getElementById('BRtab4C').className = 'br-tabs-off';
						document.getElementById('BRtab5C').className = 'br-tabs-on';
                        break;
                }
            }
			
document.write('<link href="http://www.bankrate.com/jsfeeds/reut-styles.css" rel="stylesheet" type="text/css" />');
document.write('<script src="http://www.bankrate.com/jsfeeds/reut-tabbed-rates-reut-markets-story.js" type="text/javascript"></script>');