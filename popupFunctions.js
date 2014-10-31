var Popup = function (args){
	var isOverlap = 0,
        isDraggable = true,
        addClass = '',
        animateTime = 300;
	if(args){
		if(args.top && args.left){
			var popupWidth = args.top;
			var popupHeight = args.left;
			isOverlap = 1;
		}
        if(args.static) isDraggable = false;
        if(args.addClass) addClass = args.addClass;
        if(args.animateTime) animateTime = args.animateTime;
	}
    var THIS = this;
	THIS.id = new Date().getTime();
	var overlayID = 'popupOverlay_' + THIS.id,
		popupID = 'popup_' + THIS.id,
		closeBtnID = 'popupClose_' + THIS.id,
		contentID = 'popupContent_' + THIS.id,
		headerID = 'popupHeader_' + THIS.id;
	var newPopup = document.createElement('div');
	if(isOverlap){
		newPopup.className = 'popupOverlay_';
	}else{
		newPopup.className = 'popupOverlay';		
	}
    newPopup.id = overlayID;
    newPopup.style.display = "none";
    var newPopupData = document.createElement('div');
    if(addClass !== '') {
        newPopupData.className = 'popup ' + addClass;
    }else{
    	newPopupData.className = 'popup' + addClass;
    }
    newPopupData.id = popupID;
    if(isOverlap){
    	newPopupData.style.top = popupWidth;
    	newPopupData.style.left = popupHeight;
    	newPopupData.style.position = "absolute";
    	newPopupData.style.zIndex = 1000;
    }
    newPopupData.innerHTML = '<a href="#" class="popupClose" id="' + closeBtnID + '"><div class="closeImg"></div></a><div id="popupContent_' + THIS.id + '" class="popupContent"></div>';
    newPopup.appendChild(newPopupData);
    document.body.appendChild(newPopup);

    var overlay = document.getElementById(overlayID),
		closeBtn = document.getElementById(closeBtnID),
		popup = document.getElementById(popupID);
		contentNode = document.getElementById(contentID);

	closeBtn.onclick = function(e){
		e.preventDefault();
        if(args){
            if(args.onClose) {
                args.onClose.call();
                hide();
                return false;            
            }else{
                hide();
                return false;            
            }
        }else{
            hide();
            return false;            
        }
	}
	overlay.onclick = function(event){
	    e = event || window.event
	    if (e.target == this) {
            if(args){
                if(args.onClose) {
                    args.onClose.call();
                }            
            }
	        hide();
	    }
	    //return false;
	}

    var show = function(){
        with(overlay.style){
            display = "block";
            opacity = 0;
            transition = animateTime + 'ms';
            setTimeout(function(){
                opacity = '1';
                setTimeout(function(){
                    transition = 0;
                }, animateTime);
            }, 100);
        }
    };
    var hide = function(){
        with(overlay.style){
            opacity = 1;
            transition = animateTime + 'ms';
            setTimeout(function(){
                opacity = '0';
                setTimeout(function(){
                    transition = 0;
                    display = "none";
                }, animateTime);
            }, 100);
        }
    };
    var showOn = function(targetID){
    	if(document.getElementById(targetID)){
    		var target = document.getElementById(targetID);
    		target.onclick = function(e){
    			e.preventDefault();
    				if(overlay.style.display == "none"){
    					show();
    				}else{
    					hide();
    				}
    			return false;
    		}
    	}
    };
    var header = function(text){
    	if(!document.getElementById(headerID)){
	    	var newHeader = document.createElement('div');
	    	newHeader.id = headerID;
	    	newHeader.className = 'popupHeader';
            if(!isDraggable) newHeader.style.cursor = "default";
	    	newHeader.innerHTML = text;
	    	popup.insertBefore(newHeader, closeBtn);
	    	if(isDraggable) DragMaster.makeDraggable(document.getElementById(headerID));
	    }else{
	    	var header = document.getElementById(headerID);
	    	header.innerHTML = text;
	    }

    };
    var content = function(text){
    	contentNode.innerHTML = text;
    };

    var clearContent = function(){
        contentNode.innerHTML = '';
    };

    var appendContent = function(obj){
        contentNode.appendChild(obj);
    }

    var set = function(args){
    	if(args.title) header(args.title);
    	if(args.content) content(args.content);
    	if(args.width) popup.style.width = args.width;
    };
    var destroy = function(){
        // if(funct)
        //     funct();
        hide();
        setTimeout(function(){
    	   if(document.getElementById(overlayID)) overlay.parentNode.removeChild(overlay);
        }, animateTime);
    };
    var destroyOnClose = function(){
		closeBtn.onclick = function(e){
			e.preventDefault();
            if(args){
                if(args.onClose) {
                    args.onClose.call();
                    destroy();
                    return false;   
                }else{
                    destroy();
                    return false;   
                }
            }else{
                destroy();
                return false;            
            }
		}
		overlay.onclick = function(event){
		    e = event || window.event
		    if (e.target == this) {
		        destroy();
		    }
		    // return false;
		}
    };
    var getID = function(){
    	return THIS.id;
    };


    if(args){
        if(args.title) header(args.title);
        if(args.content) content(args.content);
        if(args.width) popup.style.width = args.width;
    }


    return {
        show: show,
        hide: hide,
        showOn: showOn,
        content: content,
        title: header,
        set: set,
        getID: getID,
        destroy: destroy,
        destroyOnClose: destroyOnClose,
        clearContent: clearContent,
        appendContent: appendContent
    }


};




//drag functions

function fixEvent(e) {
	e = e || window.event

	if ( e.pageX == null && e.clientX != null ) {
		var html = document.documentElement
		var body = document.body
		e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
		e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
	}

	if (!e.which && e.button) {
		e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
	}

	return e
}

function getPosition(e){
    var left = 0
    var top  = 0

    while (e.offsetParent){
        left += e.offsetLeft
        top  += e.offsetTop
        e    = e.offsetParent
    }

    left += e.offsetLeft
    top  += e.offsetTop

    return {x:left, y:top}
}

var DragMaster = (function() {

    var dragObject
    var mouseOffset

    function getMouseOffset(target, e) {
        var docPos  = getPosition(target)
        return {x:e.pageX - docPos.x, y:e.pageY - docPos.y}
    }

    function mouseUp(e){
		e = fixEvent(e)
        dragObject = null

        // clear events
        document.onmousemove = null
        document.onmouseup = null
        document.ondragstart = null
        document.body.onselectstart = null
    }

    function mouseMove(e){
        e = fixEvent(e)

        with(dragObject.style) {
            position = 'absolute'
            top = e.pageY - mouseOffset.y + 'px'
            left = e.pageX - mouseOffset.x + 'px'
            zIndex = 1000
        }
        return false
    }

    function mouseDown(e) {
        dragObject  = this.parentNode;
        mouseOffset = getMouseOffset(this.parentNode, e)

        e = fixEvent(e)
        if (e.which!=1) return
        [].forEach.call(
		 	document.querySelectorAll('.' + dragObject.className), 
		 	function(el){
		    	el.style.zIndex = 100;
		  }
		);

        document.onmousemove = mouseMove
        document.onmouseup = mouseUp

        // отменить перенос и выделение текста при клике на тексте
        document.ondragstart = function() { return false }
        document.body.onselectstart = function() { return false }

        return false
    }

    return {
        makeDraggable: function(element){
            element.onmousedown = mouseDown
        }
    }

}())
