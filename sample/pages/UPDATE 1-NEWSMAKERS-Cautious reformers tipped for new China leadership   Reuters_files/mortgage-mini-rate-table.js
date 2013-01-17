/*
This file is Copyright (c) 2010 Bankrate, Inc.
No part of this file may be modified in any way without expressed written permission from an authorized representative from Bankrate Inc.
*/

var BRMmortgageMiniRateTable = {
    StaticServiceURL: "http://partnerservices.bankrate.com/channels/partners/rates/mortgages/",
    StaticLoanLimitServiceURL: "http://partnerservices.bankrate.com/channels/partners/rates/loanlimit/",
    StaticOverNightServiceURL: "http://partnerservices.bankrate.com/channels/partners/rates/overnightaverages/",
    CheckForIE: false,
    oRow: null,
    RowCount: 1,
    Partner: '',
    Key: '',
    DefaultZipOverride: '90033',
    LoanAmount: 165000,
    StrClickDate: '',
    Arr3Items: null,
    ArrProducts: null,
    ArrSelectedProd: null,
    ArrCounter: 0,
    product: 1,
    marketID: 0,
    points: 'all',
    counterForSelProd: 0,
    MarketLinkId: '',
    ZipCodeToLink: '',
    OverNightProd: '1,2,6',
    ZipCode: '',

    Init: function () {
        if (typeof (BRMmortgageMiniRateTableVars) != 'undefined' && BRMmortgageMiniRateTableVars != null) {

            var Defaults = BRMmortgageMiniRateTableVars;

            if (typeof (Defaults.Partner) != "undefined" && Defaults.Partner != null && typeof (Defaults.Key) != "undefined" && Defaults.Key != null) {
                this.Partner = Defaults.Partner;
                this.Key = Defaults.Key;
            }

            if (typeof (Defaults.Zip) != "undefined" && Defaults.Zip != null) {
                if (Defaults.Zip != "") {
                    if (this.ValidateZip(Defaults.Zip)) {
                        this.ZipCode = Defaults.Zip;
                    }
                }
            }
        }
        else {
            // If no rate table variables are available, assume this is the affiliate center
            try {
                var RateTableValues = WidgetsCommon.GetPIDfromCookie();
                RateTableValues = RateTableValues.split(',');

                this.Partner = RateTableValues[0].substr(2);
                this.Key = RateTableValues[1];
            } catch (e) {

            }
        }


        var ie = (typeof window.ActiveXObject != 'undefined');
        if (ie) {
            this.CheckForIE = true;
        }
        /*
        //css ref
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("id", "miniMtgRate");
        fileref.setAttribute("type", "text/css")
        var cssLocaton = 'http://affiliate-center.dev.bankrate.com/system/css/mortgage-rate-table-widget-300.css';
        fileref.setAttribute("href", cssLocaton)
        if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref);*/

        //initialize product array
        this.ArrSelectedProd = new Array();
        this.ArrProducts = new Array();
        this.ArrProducts[0] = 1;
        this.ArrProducts[1] = 2;
        this.ArrProducts[2] = 6;

        this.CreateHTMLwrap();
        this.FetchRss();
    },

    ValidateZip: function (zipValue) {
        if (isNaN(zipValue)) {
            return false;
        }
        for (i = 0; i < zipValue.length; i++) {
            var c = zipValue.charAt(i);
            if (c == "-" || ((c < "0") || (c > "9"))) {
                return false;
            }
        }
        if (zipValue != "") {
            if (zipValue.length == 5) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    },

    GetJSONP: function () {
        var url = this.StaticServiceURL;

        url += this.Partner + "/" + this.Key + "/" + document.location.hostname;
        url += "?market=" + this.marketID + "&products=" + this.product + "&loanamount=" + this.LoanAmount + "&points=" + this.points + "&def=" + this.DefaultZipOverride;
        url += "&format=json";
        url += "&zip=" + this.ZipCode + "&omni=";
        url += "&method=BRMmortgageMiniRateTable.RateTableCallback";

        var script = document.createElement("script");
        script.id = "BRMmortgageMiniRateTableJSONPScript";
        script.setAttribute("src", url);
        script.setAttribute("type", "text/javascript");
        document.getElementsByTagName('head')[0].appendChild(script);

    },

    RemoveScript: function (scriptToRemove) {
        var s = document.getElementById(scriptToRemove);
        if (s != null && typeof (s) != "undefined") {
            document.getElementsByTagName('head')[0].removeChild(s);
        }
    },

    RateTableCallback: function (strXML) {
        this.RemoveScript('BRMmortgageMiniRateTableJSONPScript');

        if (strXML != null)
            this.FillBody(strXML);
    },
    GetOverNightJSONP: function () {
        var url = this.StaticOverNightServiceURL;

        url += this.Partner + "/" + this.Key + "/" + document.location.hostname;
        //url += "?market=" + this.marketID + "&products=" + this.OverNightProd + "&def=" + this.DefaultZipOverride;
        url += "?products=" + this.OverNightProd + "&def=" + this.DefaultZipOverride;
        url += "&natl=true&zip=" + this.ZipCode;
        url += "&format=json";
        url += "&method=BRMmortgageMiniRateTable.OverNightCallback";
        var script = document.createElement("script");
        script.id = "BRMmortgageMiniRateTableOverNightJSONPScript";
        script.setAttribute("src", url);
        script.setAttribute("type", "text/javascript");
        document.getElementsByTagName('head')[0].appendChild(script);

    },
    OverNightCallback: function (strJson) {
        this.RemoveScript('BRMmortgageMiniRateTableOverNightJSONPScript');
        if (strJson != null)
            this.FillOABody(strJson);
    },


    FetchRss: function () {
        if (this.ArrSelectedProd.length < 3) {
            try {
                if (this.CheckForIE) {
                    document.getElementById("BRrateTB").innerText = '';
                } else {
                    document.getElementById("BRrateTB").innerHTML = '';
                }
            } catch (e) {
                var test = true;
            }
            document.getElementById('mtgRateWidg').style.display = 'block';
            document.getElementById('minimrtgOA').style.display = 'none';
            //pick product randomly
            this.PickRandomProd();
            this.GetJSONP();

        }

    },

    PickRandomProd: function () {
        if (this.ArrSelectedProd.length < 3) {
            var randProd = this.ArrProducts[this.Rand(3) - 1];
            if (!this.CheckDuplicateProduct(randProd)) {
                this.ArrSelectedProd[this.counterForSelProd] = randProd;
                this.product = randProd;
                this.counterForSelProd++;
            }
            else {
                this.PickRandomProd();
            }
        }
    },

    Rand: function (n) {
        return (Math.floor(Math.random() * n + 1));
    },


    FormatCurrency: function (num) {
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num))
            num = "0";
        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' +
                num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + '$' + num + '.' + cents);
    },

    CustomDate: function (xmlDate) {
        var date = xmlDate.split("/");
        var mydate = new Date(xmlDate); //new Date("20" + date[2], parseInt(date[0]) - 1, parseInt(date[1] - 0));

        var day = mydate.getDay();
        var month = mydate.getMonth();
        var daym = mydate.getDate();

        if (daym < 10)
            daym = "0" + daym;

        var dayarray = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
        var montharray = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        var returnDate = dayarray[day] + " " + montharray[month] + " " + daym;
        return returnDate;
    },



    CreateHTMLwrap: function () {

        document.write("<div id=\"mtgRateWidg\" class=\"br-rate-green-container\" style=\"text-align:left;display:none\">");
        document.write("<a href=\"javascript:onclick=BRMmortgageMiniRateTable.SeeAllRates()\" class=\"br-rate-boxhead\" id=\"BRcriteriaUsed\"></a>");
        document.write("<a href=\"javascript:onclick=BRMmortgageMiniRateTable.SeeAllRates()\" class=\"br-rate-location\" id=\"RateHeaderMarket\"></a>");
        document.write("<table cellpadding=\"1\" cellspacing=\"0\" border=\"0\" width=\"285\" class=\"br-rate-table\">");
        document.write("<div id=\"dvMortTableBody\"><tbody id=\"BRrateTB\"></tbody></div>");
        document.write("</table>");
        document.write("<ul class=\"footer-links\">");
        document.write("<li><a href=\"javascript:onclick=BRMmortgageMiniRateTable.SeeAllRates()\">See&nbsp;all&nbsp;rates</a></li>");
        document.write("<li><a href=\"javascript:onclick=BRMmortgageMiniRateTable.RedirectRatePage('http://www.bankrate.com/funnel/mortgages/product-criteria.aspx?pid=p:' + BRMmortgageMiniRateTable.Partner + '&prodtype=mtg' )\">Criteria&nbsp;used</a></li>");
        document.write("</ul>");
        document.write("<img src=\"http://www.bankrate.com/system/img/br-logo.gif\" width=\"92\" height=\"13\" border=\"0\" class=\"footer-logo\" />");
        document.write("</div>");

        //Mini Overnight rate averages...

        document.writeln("<div class=\"br-rate-red-container\" id=\"minimrtgOA\" style=\"display:none\">");
        document.writeln("	<a href=\"#\" class=\"br-rate-boxhead\">National overnight average rates</a>");
        document.writeln("	<table cellpadding=\"1\" cellspacing=\"0\" border=\"0\" width=\"285\" class=\"br-rate-table\">");
        document.writeln("		<tr>");
        document.writeln("			<td width=\"70\">");
        document.writeln("				<a id=\"minimrtg1\" href=\"#\" class=\"br-rate-table-product\">30 year fixed mortgage</a>");
        document.writeln("			</td>");
        document.writeln("			<td width=\"70\" align=\"center\" valign=\"bottom\">");
        document.writeln("              <a id=\"minimrtgImg1\" target=\"_blank\" href=\"#\">");
        document.writeln("				<img src=\"http://www.bankrate.com/system/img/orange-graph.gif\" width=\"20\" height=\"17\" vspace=\"2\" style=\"border:none\" /><br />");
        document.writeln("				Graph");
        document.writeln("             </a>");
        document.writeln("			</td>");
        document.writeln("			<td valign=\"bottom\">");
        document.writeln("				<span class=\"br-rate-table-rate\" id=\"minimortgage30YrRate\"></span> <img id=\"miniOvGraph1\"  width=\"13\" height=\"10\"/><br/>");
        document.writeln("				Average rate");
        document.writeln("			</td>");
        document.writeln("			<td valign=\"bottom\" align=\"center\">");
        document.writeln("				<p class=\"br-rate-table-last\" id=\"minimortgage30YrLastWeek\"></p>");
        document.writeln("				Last week");
        document.writeln("			</td>");
        document.writeln("		</tr>");
        document.writeln("		<tr>");
        document.writeln("			<td width=\"70\">");
        document.writeln("				<a id=\"minimrtg2\" href=\"#\" class=\"br-rate-table-product\">15 year fixed mortgage</a>");
        document.writeln("			</td>");
        document.writeln("			<td width=\"70\" align=\"center\" valign=\"bottom\">");
        document.writeln("              <a id=\"minimrtgImg2\" target=\"_blank\" href=\"#\">");
        document.writeln("				<img src=\"http://www.bankrate.com/system/img/orange-graph.gif\" width=\"20\" height=\"17\" vspace=\"2\" style=\"border:none\" /><br />");
        document.writeln("				Graph");
        document.writeln("              </a>");
        document.writeln("			</td>");
        document.writeln("			<td valign=\"bottom\">");
        document.writeln("				<span class=\"br-rate-table-rate\" id=\"minimortgage15YrRate\"></span> <img id=\"miniOvGraph2\"  width=\"13\" height=\"10\"/><br />");
        document.writeln("				Average rate");
        document.writeln("			</td>");
        document.writeln("			<td valign=\"bottom\" align=\"center\">");
        document.writeln("				<p class=\"br-rate-table-last\" id=\"minimortgage15YrLastWeek\"></p>");
        document.writeln("				Last week");
        document.writeln("			</td>");
        document.writeln("		</tr>");
        document.writeln("		<tr>");
        document.writeln("			<td width=\"70\">");
        document.writeln("				<a href=\"#\" class=\"br-rate-table-product\" id=\"minimrtg3\">5/1 ARM mortgage</a>");
        document.writeln("			</td>");
        document.writeln("			<td width=\"70\" align=\"center\" valign=\"bottom\">");
        document.writeln("               <a id=\"minimrtgImg3\" target=\"_blank\" href=\"#\">");
        document.writeln("				<img src=\"http://www.bankrate.com/system/img/orange-graph.gif\" width=\"20\" height=\"17\" vspace=\"2\" style=\"border:none\" /><br />");
        document.writeln("				Graph");
        document.writeln("               </a>");
        document.writeln("			</td>");
        document.writeln("			<td valign=\"bottom\">");
        document.writeln("				<span class=\"br-rate-table-rate\" id =\"minimortgage51Rate\"></span> <img id=\"miniOvGraph3\" width=\"13\" height=\"10\" /><br />");
        document.writeln("				Average rate");
        document.writeln("			</td>");
        document.writeln("			<td valign=\"bottom\" align=\"center\">");
        document.writeln("				<p class=\"br-rate-table-last\" id=\"minimortgage51LastWeek\"></p>");
        document.writeln("				Last week");
        document.writeln("			</td>");
        document.writeln("		</tr>");
        document.writeln("		<tr>");
        document.writeln("			<td colspan=\"3\" valign=\"top\" class=\"br-rate-table-localize\">");
        document.writeln("			View mortgage rates: <input type=\"text\" id=\"txtminiMortgageZip\" value=\"ZIP Code\" onclick=\"BRMmortgageMiniRateTable.Clear()\" name=\"txtminiMortgageZip\"/>");
        document.writeln("			</td>");
        document.writeln("			<td class=\"br-rate-table-localize\"><a href=\"javascript:onclick=BRMmortgageMiniRateTable.OAResultPage()\"><img src=\"http://www.bankrate.com/system/img/go-button-mini-rate.gif\" width=\"58\" height=\"18\" border=\"0\"/></a></td>");
        document.writeln("		</tr>");
        document.writeln("	</table>");
        document.writeln("	<div class=\"attr1\">");
        document.writeln("	<a href=\"javascript:onclick=BRMmortgageMiniRateTable.SeeAllRates()\" class=\"footer-links\">See all rates &raquo;</a>");
        document.writeln("<img src=\"http://www.bankrate.com/system/img/br-logo.gif\" width=\"92\" height=\"17\" border=\"0\" vspace=\"1\" style=\"margin-bottom:10px\" />");
        document.writeln("	</div>");
        document.writeln("</div>");

        //Mini Overnight rate averages...
    },



    FnInit: function (row, apr, date, aprMax, discPoints, lock, fees, payment, comments, url, imgId, lenderId,
                    commentsHyperlinked, nameHyperlinkAvailable, listingType, defaultSort, lenderSort, aprSort, rateSort, feesSort) {

        this.Arr3Items[this.Arr3Items.length] = lenderId;

        var oTable = document.getElementById("BRrateTB");
        var oDiv = document.createElement("div");
        var oCell, oCell1, oCell2, oCell3, oCell4, oCell5;
        var i, j;
        var cpcLink = url;
        oRow = document.createElement("tr");

        oTable.appendChild(oRow);

        oCell = document.createElement("td");
        oCell.setAttribute('width', '100');
        oCell.style.paddingTop = '5px';
        var a = document.createElement('a');
        if (imgId != null && imgId.length != 0) {
            //if (false) {

            var imeg = document.createElement('img');
            imeg.setAttribute('src', 'http://www.bankrate.com/system/img/inst/' + imgId + '_logo.gif');
            imeg.setAttribute('height', '25');
            imeg.setAttribute('border', '0');
            imeg.setAttribute('width', '61');
            if (listingType == 'paid' && nameHyperlinkAvailable == 'true') {
                if (this.CheckForIE) {
                    a.onclick = new Function("BRMmortgageMiniRateTable.TrackClick(8, this, '" + cpcLink + "');");
                } else {
                    a.setAttribute("onclick", "BRMmortgageMiniRateTable.TrackClick(8, this, '" + cpcLink + "');");
                }

                a.appendChild(imeg);
                oCell.appendChild(a);
            } else {
                oCell.appendChild(imeg);
            }
        }
        else {
            a.style.textDecoration = 'none';
            var lenderName = document.createElement('span');
            lenderName.innerHTML = lenderId + "<br/>";
            if (listingType == 'paid' && nameHyperlinkAvailable == 'true') {
                if (this.CheckForIE) {
                    a.onclick = new Function("BRMmortgageMiniRateTable.TrackClick(2, this, '" + cpcLink + "');");
                } else {
                    a.setAttribute("onclick", "BRMmortgageMiniRateTable.TrackClick(2,this,'" + cpcLink + "');");
                }

                a.appendChild(lenderName);
                oCell.appendChild(a);
            } else {
                oCell.appendChild(lenderName);
            }
            if (this.CheckForIE) {
                oCell.style.verticalAlign = 'middle';
            }
        }

        oRow.appendChild(oCell);

        var aprDiv1 = document.createElement('span');
        aprDiv1.className = "br-rate-table-green";

        aprDiv1.innerHTML = "&nbsp; <strong class=\"mini-apr\">APR:</strong>" + apr + "%" + "<br/>";

        var aprStat2 = document.createElement('span');
        aprStat2.className = "br-rate-table-green";
        aprStat2.innerHTML = "<strong class=\"mini-apr\">Fees:</strong>" + this.FormatCurrency(fees).replace(".00", "");

        oCell.appendChild(aprDiv1);
        oCell.appendChild(aprStat2);

        if (this.CheckForIE) {
            oCell.style.verticalAlign = 'middle';
        }
        oRow.appendChild(oCell);



        oCell2 = document.createElement("td");
        var dateSpan = document.createElement("span");
        dateSpan.style.marginLeft = "15px";
        dateSpan.innerHTML = date;
        oCell2.setAttribute('valign', 'middle');
        oCell2.setAttribute('align', 'left');

        var rateDiv1 = document.createElement('span');
        rateDiv1.className = "br-rate-table-rate";
        rateDiv1.innerHTML = "<br/>" + aprMax + "% <strong class=\"mini-apr-rate-bold\">Rate</strong>" + "<br/>";

        var estpmt2 = document.createElement('div');
        estpmt2.className = "br-rate-table-green";
        estpmt2.innerHTML = "<strong class=\"mini-apr\">Est payment </strong>" + this.FormatCurrency(payment).replace(".00", "");

        oCell2.appendChild(dateSpan);
        oCell2.appendChild(rateDiv1);
        oCell2.appendChild(estpmt2);

        if (this.CheckForIE) {
            oCell2.style.verticalAlign = 'middle';
        }
        oRow.appendChild(oCell2);

        var seeDetailsPar = document.createElement('div');
        seeDetailsPar.className = "details-link";

        var seeDetailsDiv = document.createElement('a');
        if (this.ZipCodeToLink == '')
            seeDetailsDiv.setAttribute("href", "javascript:onclick=BRMmortgageMiniRateTable.RedirectRatePage('http://www.bankrate.com/funnel/mortgages/mortgage-results.aspx?pid=p:' + BRMmortgageMiniRateTable.Partner + '&market=' + BRMmortgageMiniRateTable.MarketLinkId + '&loan=' + BRMmortgageMiniRateTable.LoanAmount + '&perc=20&prods=' + BRMmortgageMiniRateTable.product + '&points=' + BRMmortgageMiniRateTable.points)");
        else
            seeDetailsDiv.setAttribute("href", "javascript:onclick=BRMmortgageMiniRateTable.RedirectRatePage('http://www.bankrate.com/funnel/mortgages/mortgage-results.aspx?pid=p:' + BRMmortgageMiniRateTable.Partner + '&zip=' + BRMmortgageMiniRateTable.ZipCodeToLink + '&loan=' + BRMmortgageMiniRateTable.LoanAmount + '&perc=20&prods=' + BRMmortgageMiniRateTable.product + '&points=' + BRMmortgageMiniRateTable.points)");
        seeDetailsDiv.innerHTML = "See details";
        seeDetailsPar.appendChild(seeDetailsDiv);


        oCell3 = document.createElement("td");
        oCell3.setAttribute("valign", "middle");
        oCell3.setAttribute("align", "center");

        oCell3.appendChild(seeDetailsPar);
        var imeg1 = document.createElement('img');
        imeg1.className = "details-link";
        imeg1.setAttribute('src', 'http://www.bankrate.com/system/img/green-go-button.gif');
        imeg1.setAttribute('height', '18');
        imeg1.setAttribute('border', '0');
        imeg1.setAttribute('width', '58');

        if (listingType == 'paid' && nameHyperlinkAvailable == 'true') {
            var a2 = document.createElement('a');
            if (this.CheckForIE) {
                a2.onclick = new Function("BRMmortgageMiniRateTable.TrackClick(11, this, '" + cpcLink + "');");
            } else {
                a2.setAttribute("onclick", "BRMmortgageMiniRateTable.TrackClick(11,this,'" + cpcLink + "');");
            }

            a2.appendChild(imeg1);
            oCell3.appendChild(a2);
        }

        if (this.CheckForIE) {
            oCell3.style.verticalAlign = 'middle';
        }
        oRow.appendChild(oCell3);

        var rorID = 'oRow' + this.RowCount;

        oRow.setAttribute('id', rorID);
        this.RowCount = this.RowCount + 1;
    },

    TrackClick: function (clickType, obj, url) {
        var today = new Date(); var year = today.getFullYear(); var month = today.getMonth() + 1; var date = today.getDate();
        var hour = today.getHours(); var minute = today.getMinutes(); var second = today.getSeconds(); var millisecond = today.getMilliseconds();
        var currentDT = month + '/' + date + '/' + year + ' ' + hour + ':' + minute + ':' + second + '.' + millisecond;
        var overrides = obj.parentNode.parentNode.id.replace("oRow", "") + "," + clickType + ",,,," + this.Partner;
        var cpcLink = url;
        if (url.indexOf('||') != -1) {
            var cpcValues = url.split('||');
            cpcLink = cpcValues[0];
        }
        if (cpcLink.indexOf("&amp;c=") != -1) {
            cpcLink = cpcLink.replace('&amp;c=', '&c=');
        }
        if (overrides.length > 0 && cpcLink.indexOf('&c=') != -1) {
            var cpcLinkParts = cpcLink.split('?');
            var qs = cpcLinkParts[1];
            var qsItems = qs.split('&');
            for (var i = 0; i < qsItems.length; i++) {
                if (qsItems[i].substring(0, 2) == "c=") {
                    qsItems[i] = "c=" + overrides;
                    break;
                }
            }
            cpcLink = cpcLinkParts[0] + "?" + qsItems.join("&");
        }
        var redirectTo = cpcLink + '&click_date=' + currentDT + '&ref_url=' + escape(location.href);
        window.open(redirectTo);
    },

    TrimAll: function (sString) {
        while (sString.substring(0, 1) == ' ') {
            sString = sString.substring(1, sString.length);
        }
        while (sString.substring(sString.length - 1, sString.length) == ' ') {
            sString = sString.substring(0, sString.length - 1);
        }
        return sString;
    },

    FillBody: function (json) {
        try {

            var headerSection = json.bankrate.data.response.summary.description.split(',');
            var marketLoc = json.bankrate.data.response.global.abbreviatedLocation;
            document.getElementById("RateHeaderMarket").innerHTML = marketLoc;
            this.MarketLinkId = json.bankrate.metadata["@market"];
            this.ZipCodeToLink = json.bankrate.metadata["@zipcode"];

            if (headerSection[0].match('mtg')) {
                document.getElementById("BRcriteriaUsed").innerHTML = headerSection[0].replace("mtg", "mortgage").replace("yr", "year") + " rates in ";
            }
            else {
                document.getElementById("BRcriteriaUsed").innerHTML = headerSection[0].replace("ARM", "adjustable rate mortgage") + " rates in"
            }

            var items = json.bankrate.data.response.result1;

            //this.GetClickDate(); //set current date time for click date.
            this.Arr3Items = new Array();

            this.FetchItemsFromXml(items, 'paid');
            document.getElementById('mtgRateWidg').style.display = 'block';
            /*
            document.getElementById('mtgRateWidg').style.display = 'none';
            document.getElementById('minimrtgOA').style.display = 'block';
            this.OverNightSetControls();
            */

            if (this.Arr3Items.length == 0) { //if there is no paying advertisers in that product
                //if (true) {
                if (this.ArrSelectedProd.length < 3) {//if all three product have not been checked
                    //if (false) {
                    this.FetchRss(); // Fetch using other product
                }
                else { //if there is no paying advertisers in all three products
                    // show OA                     
                    document.getElementById('mtgRateWidg').style.display = 'none';
                    document.getElementById('minimrtgOA').style.display = 'block';
                    this.OverNightSetControls();
                }
            }
            else if (this.Arr3Items.length < 3)
                this.FetchItemsFromXml(items, 'editorial');

        }
        catch (e) { }
    },


    RedirectRatePage: function (redirectUrl1) {
        window.open(redirectUrl1);
    },
    GetClickDate: function () {
        var currentTime = new Date()
        var now = currentTime.getMonth() + 1 + "/" + currentTime.getDate() + "/" + currentTime.getFullYear();

        var time = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds() + "." + currentTime.getMilliseconds();
        this.StrClickDate = now + " " + time;
    },

    CheckDuplicateLander: function (landerToCheck) {
        var res = false;
        for (var i = 0; i < this.Arr3Items.length; i++) {
            if (this.Arr3Items[i].toLowerCase() == landerToCheck.toLowerCase()) {
                res = true;
                break;
            }
        }
        return res;
    },

    CheckDuplicateProduct: function (productVal) {
        var res = false;
        for (var i = 0; i < this.ArrSelectedProd.length; i++) {
            if (this.ArrSelectedProd[i] == productVal) {
                res = true;
                break;
            }
        }
        return res;
    },

    FetchItemsFromXml: function (items, strListingType) {
        for (var j = 0; j < items.length; j++) {
            if (this.Arr3Items.length == 3)
                break;

            var apr = '', aprMax = '', comments = '', date = '', fees = '', payment = '', discPoints = '', lock = '', url = '';
            var imgId = '', lenderId = '', commentsHyperlinked = '', nameHyperlinkAvailable = '', listingType = '';
            var lenderSort = '', aprSort = '', rateSort = '', feesSort = '', defaultSort = '';

            if (typeof (items[j].apr) != 'undefined' && items[j].apr != null)
                apr = items[j].apr;
            if (typeof (items[j].rate) != 'undefined' && items[j].rate != null)
                aprMax = items[j].rate;
            if (typeof (items[j].comments) != 'undefined' && items[j].comments != null)
                comments = items[j].comments;
            if (typeof (items[j].date) != 'undefined' && items[j].date != null)
                date = this.CustomDate(items[j].date);
            if (typeof (items[j].fees) != 'undefined' && items[j].fees != null)
                fees = items[j].fees;
            if (typeof (items[j].payment) != 'undefined' && items[j].payment != null)
                payment = items[j].payment;
            if (typeof (items[j].discPoints) != 'undefined' && items[j].discPoints != null)
                discPoints = items[j].discPoints;
            if (typeof (items[j].lock) != 'undefined' && items[j].lock != null)
                lock = items[j].lock;
            if (typeof (items[j].cpc) != 'undefined' && items[j].cpc != null)
                url = items[j].cpc;
            if (typeof (items[j].img) != 'undefined' && items[j].img != null)
                imgId = items[j].img;
            if (typeof (items[j].lender) != 'undefined' && items[j].lender != null)
                lenderId = items[j].lender;
            if (typeof (items[j].commentsHyperlinked) != 'undefined' && items[j].commentsHyperlinked != null)
                commentsHyperlinked = items[j].commentsHyperlinked;
            if (typeof (items[j].nameHyperlinkAvailable) != 'undefined' && items[j].nameHyperlinkAvailable != null)
                nameHyperlinkAvailable = items[j].nameHyperlinkAvailable;
            if (typeof (items[j].listingType) != 'undefined' && items[j].listingType != null)
                listingType = items[j].listingType;

            if (typeof (items[j].defaultSort) != 'undefined' && items[j].defaultSort != null)
                defaultSort = items[j].defaultSort;
            if (typeof (items[j].publishnameSort) != 'undefined' && items[j].publishnameSort != null)
                lenderSort = items[j].publishnameSort;
            if (typeof (items[j].aprSort) != 'undefined' && items[j].aprSort != null)
                aprSort = items[j].aprSort;
            if (typeof (items[j].rateSort) != 'undefined' && items[j].rateSort != null)
                rateSort = items[j].rateSort;
            if (typeof (items[j].feesSort) != 'undefined' && items[j].feesSort != null)
                feesSort = items[j].feesSort;

            if (listingType == strListingType) {
                if (!this.CheckDuplicateLander(lenderId))
                    this.FnInit(j, apr, date, aprMax, discPoints, lock, fees, payment, comments, url, imgId, lenderId,
                        commentsHyperlinked, nameHyperlinkAvailable, listingType, defaultSort, lenderSort, aprSort, rateSort, feesSort);
            }
        }
    },

    //***********************OA code********************************
    OverNightSetControls: function () {
        this.GetOverNightJSONP();
    },

    FillOABody: function (oaJSON) {
        try {
            this.MarketLinkId = oaJSON.bankrate.metadata["@market"];
            this.ZipCodeToLink = oaJSON.bankrate.metadata["@zipcode"];

            var funnelUrl = oaJSON.bankrate.metadata.funnel["@url"];
            var graphUrl = oaJSON.bankrate.metadata.graph["@url"];
            var oaItems = oaJSON.bankrate.data.response.overnightaverages;
            var OaPID = "&pid=p:" + this.Partner;

            for (var i = 0; i < oaItems.length; i++) {
                var prodId = oaItems[i].productid;
                var prodLink = funnelUrl + prodId + OaPID;
                var stateCode = oaItems[i].statecode;
                var avgGroupId = oaItems[i].avggroupid;
                var graphLink = graphUrl + "&state=" + stateCode + "&ids=" + avgGroupId + OaPID;
                var currRate = oaItems[i].currentrate;
                if (currRate != null && currRate != '')
                    currRate = this.roundNumber(currRate, 2).toFixed(2);
                var lastWeekRate = oaItems[i].lastweekvalue;
                if (lastWeekRate != null && lastWeekRate != '')
                    lastWeekRate = this.roundNumber(lastWeekRate, 2).toFixed(2);

                if (prodId == '1') {
                    var anchor1 = document.getElementById("minimrtg1");
                    anchor1.setAttribute('href', prodLink);
                    var anchorImg1 = document.getElementById("minimrtgImg1");
                    anchorImg1.setAttribute('href', graphLink);

                    document.getElementById("minimortgage30YrRate").innerHTML = currRate + "%";
                    var getSrc1 = this.getClassName(currRate, lastWeekRate);
                    document.getElementById("miniOvGraph1").setAttribute("src", getSrc1);
                    document.getElementById("minimortgage30YrLastWeek").innerHTML = lastWeekRate + "%";
                }
                else if (prodId == '2') {
                    var anchor2 = document.getElementById("minimrtg2");
                    anchor2.setAttribute('href', prodLink);
                    var anchorImg2 = document.getElementById("minimrtgImg2");
                    anchorImg2.setAttribute('href', graphLink);

                    document.getElementById("minimortgage15YrRate").innerHTML = currRate + "%";
                    var getSrc2 = this.getClassName(currRate, lastWeekRate);
                    document.getElementById("miniOvGraph2").setAttribute("src", getSrc2);
                    document.getElementById("minimortgage15YrLastWeek").innerHTML = lastWeekRate + "%";
                }
                else if (prodId == '6') {
                    var anchor3 = document.getElementById("minimrtg3");
                    anchor3.setAttribute('href', prodLink);
                    var anchorImg3 = document.getElementById("minimrtgImg3");
                    anchorImg3.setAttribute('href', graphLink);

                    document.getElementById("minimortgage51Rate").innerHTML = currRate + "%";
                    var getSrc3 = this.getClassName(currRate, lastWeekRate);
                    document.getElementById("miniOvGraph3").setAttribute("src", getSrc3);
                    document.getElementById("minimortgage51LastWeek").innerHTML = lastWeekRate + "%";
                }
            }
        }
        catch (e) {
        }
    },
    getClassName: function (intRate, weekIntRate) {
        var divClassName = "";
        if (parseFloat(intRate) > parseFloat(weekIntRate)) {
            divClassName = "http://www.bankrate.com/system/img/up-arrow.gif";
        }
        else if (parseFloat(intRate) < parseFloat(weekIntRate)) {
            divClassName = "http://www.bankrate.com/system/img/down-arrow.gif";
        }
        else {
            divClassName = "http://www.bankrate.com/system/img/no-change.gif";
        }
        return divClassName;
    },
    roundNumber: function (num, dec) {
        var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
        return result;
    },

    SeeAllRates: function () {
        if (this.ZipCodeToLink != '')
            window.open('http://www.bankrate.com/funnel/mortgages/mortgage-results.aspx?pid=p:' + this.Partner + '&zip=' + this.ZipCodeToLink + '&loan=' + this.LoanAmount + '&perc=20&prods=' + this.product + '&points=' + this.points);
        else if (this.MarketLinkId > 0)
            window.open('http://www.bankrate.com/funnel/mortgages/mortgage-results.aspx?pid=p:' + this.Partner + '&market=' + this.MarketLinkId + '&loan=' + this.LoanAmount + '&perc=20&prods=' + this.product + '&points=' + this.points);
        else
            window.open('http://www.bankrate.com/funnel/mortgages/?pid=p:' + this.Partner + '&loan=' + this.LoanAmount + '&perc=20&prods=' + this.product + '&points=' + this.points);
    },

    OAResultPage: function () {
        var url = "";
        var mortgagezipVal = document.getElementById("txtminiMortgageZip").value;
        if (this.ValidateZip(mortgagezipVal)) {
            url += 'prods=1';
            url += '&zip=' + mortgagezipVal;
            url += '&ic_id=OA_OvernightAverages_13_Mortgage___default.aspx_' + mortgagezipVal;
            window.open("http://www.bankrate.com/funnel/mortgages/mortgage-results.aspx?" + url + "&pid=p:" + this.Partner);
        }
        else {
            document.getElementById("txtminiMortgageZip").value = "Invalid Zip";
        }
    },
    Clear: function () {
        document.getElementById("txtminiMortgageZip").value = '';
    }
    //**************************************************************

}

BRMmortgageMiniRateTable.Init();
