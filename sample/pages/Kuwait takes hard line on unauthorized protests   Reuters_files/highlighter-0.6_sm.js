/*

Search Term Highlighter 
Author: Dave Lemen
Version: 0.6

This script highlights searched words on your web page. Since it's implemented 
in JavaScript that runs in the browser, you don't need to do anything special 
on the server. It works in static HTML files as well as dynamically generated
pages.

Here's how to implement it:
1. (Optional) Change the items in the Configuration Section that you want to change.
   There are examples to show you how.
2. Put this file on your web server.
3. Add a script tag to your web page, like this:
	<script type="text/javascript" src="/highlighter.js"></script>
4. Add an "onload" attribute to the body tag, like this:
	<body onload="highlighter.highlight()">
*/

window.highlighter = new SearchTermHighlighter();

// ---------------------------------------------------------------------------
// Configuration Section:
// ---------------------------------------------------------------------------

// Uncomment the following line to hide the legend.
highlighter.legend = false;

// List the URL parameters that contain search terms.
// Defaults: q, as_q, as_epq, as_oq, query, search
// Example:
// highlighter.parameters = 'q, as_q, as_epq, as_oq, query, search';

// Use addStyle(color, background, fontWeight) to change the highlighting style.
// This is optional. A set of 10 default styles will be used automatically.
// Example:
//highlighter.addStyle('#000', '#FF4', 'bold'); // bold, black text on yellow background.
//highlighter.addStyle('', '', ''); // empty style means no highlighting

// ---------------------------------------------------------------------------

highlighter.init();

function SearchTermHighlighter()
{
	var ok = ((document.createElement) ? true : false); // do not run on older browsers
	var isInitialized = false;
	var searchTerms = new Array();
	//var searchTermsB = new Array();
	var foundCount = 0;
	var styles = new Array();
	var usingDefaultStyles = true;
	var DEBUG = false;
	

	this.parameters = 'q as_q as_epq as_oq query search p ';
	this.legend = true;
	this.init = init;
	this.loadSearchTerms = loadSearchTerms;
	this.highlight = highlight;
	this.highlightTerm = highlightTerm;
	this.writeLegend = writeLegend;
	this.hideLegend = hideLegend;
	this.unhighlight = unhighlight;
	this.searchTerms = searchTerms;
	//this.searchTermsB = searchTermsB;
	this.searchKeywords = searchKeywords;
	
	if (!ok) return;


	function addStyle(color, background, fontWeight)
	{}

	function init()
	{
		if (!ok) return;
		this.loadSearchTerms();
		isInitialized = true;
	}

	function loadSearchTerms()
	{
		var a = new Array();
		var params = getParamValues(document.referrer, this.parameters);
		var terms;
		var index = 0;
		for (i = 0; i < params.length; i++) 
		{
			terms = parseTerms(params[i]); // run some checks on the params
			for (j = 0; j < terms.length; j++)
			{
				if (terms[j] != '')
				{
					a.push(new SearchTerm(index++, terms[j].toLowerCase()));
				}
			}
		}
		a.sort(function(t1, t2){return ((t1.term == t2.term) ? 0 : ((t1.term < t2.term) ? -1 : 1));});
		var prev = new SearchTerm(0, '');
		for (i = a.length - 1; i >= 0; i--)
		{
			if (a[i].term != prev.term)
			{
				searchTerms.push(a[i]);
				prev = a[i];
			}
		}
		searchTerms.sort(function(t1, t2){return t1.index - t2.index;});
	trace('Search Terms:\n' + searchTerms.join('\n'));
	}
	

	
	function parseTerms (query)
	{
		var s = query + '';
		s = s.replace(/(^|\s)(site|related|link|info|cache):[^\s]*(\s|$)/ig, ' ');
		s = s.replace(/[^a-z0-9_-]/ig, ' '); // word chars only.
		s = s.replace(/(^|\s)-/g, ' '); // +required -excluded ~synonyms
		s = s.replace(/\b(and|not|or)\b/ig, ' ');
		s = s.replace(/\b[a-z0-9]\b/ig, ' '); // one char terms
		return s.split(/\s+/);
	}

	function getParamValues(url, parameters)
	{
		var params = new Array(); // define array for params
		var p = parameters.replace(/,/, ' ').split(/\s+/); // split parameters into array called p
		if (url.indexOf('?') > 0)  // if there is a query string
		{
			var qs = url.substr(url.indexOf('?') + 1); // extract the querystring
			var qsa = qs.split('&'); // split into array of parts ie url=http%3A%2F%2Fus.idev.amers.ime.reuters.com%2Farticle%2FnewsOne%2FidUSN0742944620080108  q=dvd
			for (i = 0; i < qsa.length; i++)  // for each part of querystring
			{
				nameValue = qsa[i].split('='); //split into a temp array containing q, dvd
				if (nameValue.length != 2) continue;  // should equal 2, if not, leave loop
				for (j = 0; j < p.length; j++) //run a loop for each possible value of parameters
				{
					if (nameValue[0] == p[j]) //if the key matches a parameter
					{
						params.push(unescape(nameValue[1]).toLowerCase().replace(/\+/g, ' ')); // add lowercase term to params
					}
				}
			}
		}
		return params; // return params array, empty or not
	}

	function highlight() 
	{
		if (!ok) return;
		if (!isInitialized) this.init();
		searchTerms.sort(function(term1, term2){return term2.length-term1.length;});
		/*for (var i = 0; i < searchTerms.length; i++)
		{
			this.highlightTerm(document.getElementsByTagName("body")[0], searchTerms[i]);
		}*/
		if (this.legend)
		{
			this.writeLegend();
		}
		if (searchTerms.length > 0) 
		{
			var body = document.getElementById("searchInterceptResults");
			body.className = 'wResults';
		} 
	}
	
	function highlightTerm(node, term)  // highlight terms on the page, NOT IN USE
	{}

	function writeLegend()
	{
		if (foundCount > 0)
		{
			var body = document.getElementById("legend-container");
			//body.className = 'wResults';
			var legend = body.insertBefore(document.createElement('DIV'), body.childNodes[0]);
			legend.id = 'sth_legend';
			var s = "";
			s += '<p>More Search Results for <b>';
			//s += '<p>These search terms have been highlighted:</p>';
			searchTerms.sort(function(t1, t2){return t1.index - t2.index;});
			for (var i = 0; i < searchTerms.length; i++)
			{
				s += searchTerms[i].term + ' ';
			}
			s += '</b></p>';

			legend.innerHTML = s;
		}
	}
	
	function hideLegend()
	{}

	function unhighlight()
	{}

	function debugAlert(msg){if(DEBUG)alert(msg);}

	function SearchTerm(index, term)
	{
		this.CSS_CLASS_PREFIX = 'sth_';
		this.index = index;
		this.term = term.toLowerCase();
		this.cssClass = this.CSS_CLASS_PREFIX + this.term.replace(/[^a-z0-9_ ]/g, '').replace(/ /g, '_');
		this.pattern = new RegExp('\\b' + this.term + '\\b', 'i');
		this.found = false;
		this.toString = function(){return this.term};
	}

	function HighlightStyle(color, background, fontWeight)
	{}
	
	// Added to output keywords in term+term format
	function searchKeywords()
	{
		var keys = escape(searchTerms.join(' '));
		return keys;
	}
	
	function addtext(what){
		if (document.createTextNode){
		var mytext=document.createTextNode(what)
		document.getElementById("testResults").appendChild(mytext)
		}
	}
	
}

/*

 Copyright 2004 Dave Lemen
 
 Licensed under the Apache License, Version 2.0 (the "License"); 
 you may not use this file except in compliance with the License. 
 You may obtain a copy of the License at 
 
	http://www.apache.org/licenses/LICENSE-2.0 

Unless required by applicable law or agreed to in writing, software 
distributed under the License is distributed on an "AS IS" BASIS, 
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
See the License for the specific language governing permissions and 
limitations under the License.

*/