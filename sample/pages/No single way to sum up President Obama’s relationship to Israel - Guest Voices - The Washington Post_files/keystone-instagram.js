(function($){
    $(document).ready(function() {
      
      	var echo_url = "http://echoapi.arktan.com/v1/search?q=((childrenof:http://www.washingtonpost.com/id_Keystone_Down_the_Line%20-state:ModeratorDeleted,SystemFlagged,CommunityFlagged,ModeratorFlagged%20-user.state:ModeratorBanned))%20safeHTML:false%20children:1%20-state:ModeratorDeleted,SystemFlagged,ModeratorFlagged%20-user.state:ModeratorBanned%20childrenSortOrder:reverseChronological%20childrenItemsPerPage:2%20itemsPerPage:8+&appkey=prod.washpost.com"
      
	    // Make the request
	    $.ajax({
	        url: echo_url,
	        dataType: 'jsonp',
	        context: document.body,
	        success: function(data) { 
	        	loadInstagramImages(data);
	        }
	    })
	    
	    loadInstagramImages = function(data) { 
	    	var showing = 0;
	    	if (data.entries) { 
		    	$.each(data.entries, function(i,v) { 
		    		if (showing < 5) { 
			    		if (v.actor.title == 'mswontheroad' || v.actor.title == 'whitneyshefte') {
			    			$('#keystone-instagram .photos').append('<div class="photo left">' + v.object.content + '</div>');
			    			if (showing > 0) { $('#keystone-instagram .photos .photo .metadata_link img').eq(i).css({width: 70, height: 70, margin: '2px 1px 1px 1px '}) }
		    				$('#keystone-instagram .photos .photo .metadata_link img').eq(i).attr('src',$('#keystone-instagram .photos .photo .metadata_link img').eq(i).attr('data-src-preview'));
			    			showing ++;
			    		}
		    		}
		    	})
		    	$('#keystone-instagram .photos').append('<div class="clear"></div>');
		    	$('#keystone-instagram .photo .note_title').hide()
		    	$('#keystone-instagram .photo .metadata_link').attr('href', 'http://www.washingtonpost.com/blogs/keystone-down-the-line/?tid=rr_mod');
		    } else { 
		    	$('#keystone-instagram-rr').hide();
		    }
	    }
      
    });
})(jQuery);