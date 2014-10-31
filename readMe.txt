PopUp! v0.4

Start:
    <script src="[path_to]popupFunctions.js"></script>
    <link rel="stylesheet" type="text/css" href="[path_to]popupStyles.css" />


Create simple popup:
	new Popup()
	Example: 
		var popup = new Popup();
Create several draggable popups on page (without overlay): 
		var popup = new Popup({"top": 100, "left": 100}); 
Create popup with arguments:
	new Popup({obj]);
	Example:
		var popup = new Popup({title: 'sdsdd', width: '300'});

	Arguments:
		title - set title for popup (draggable);
		content - set content;
		width - static content width. Value write with "px", for example: var popup = new Popup({width: "300px"});
    addClass - add some class for popup;
    animateTime - set animate time for hide and show popup. Value set as milisecunds. For example: var popup = new Popup({animateTime: "300"});
		static - disable popup drag. Value - "true" or "false";
		onClose - callback function for close button click and overlay click;
    top - set top margin for popup (use with arg. "left");
    left - set left margin for popup (use with arg. "top");

Method for popup:
	.set({obj}) - set several values for popup:
		title - set title for popup (draggable);
		content - set content;
		width - static content width;
	.title(string) - set title;
	.content(string) - set content data;
	.show() - show popup;
	.hide() - hide popup;
	.showOn(nodeID) - show/hide popup on some DOM element click;
	.destroy() - delete popup from DOM
	.destroyOnClose() - set destroy popup on close button click;
	.getID() - get ID for popup;


Versions:
v0.5
  - Исправлено добавлен обработчик onClose на клик по канве (ix bag: add "onClose" call on overlay click)

v0.5.1
  - Добавлена возможность вызова вложенной функции при срабатывании .destroy() 
    Пример: popup.destroy(function(){console.log("destroy")});
    Add callback function to .destroy() method. For example: popup.destroy(function(){console.log("destroy")});

v.0.5.2
  - Добавлен метод .clearContent() для очистки содержимого контентной части окна
    Add .clearContent() method for clear content of popup;
  - Добавлен метод .appendContent() для добавления контента как объекта. Объект добавляется в конец контентной части с сохранением всех навешенных обработчиков событий
    Add .appendContent([obj]) method for append content.
    Example: 
      var obj = document.getElementById(objID);
      obj.onclick = function(){
        //pass...
      }
      popup.appendContent(obj);

-------------
Example:
<html>
<head>
    <script src="popupFunctions.js"></script>
    <link rel="stylesheet" type="text/css" href="popupStyles.css" />
</head>
<body>
<p><input type="button" value="Popup!" id="popup__toggle"/></p>
<div style="width: 100px; height: 1000px; background: #333"></div>
<p>sdsdsdsdd</p>
<script>
        var targ = document.getElementById('popup__toggle');
          var popup = new Popup({title: 'sdsdd', width: '300'});
          targ.onclick = function(){
          //var popup = new Popup({"top": 100, "left": 100});
          var id = popup.getID();
          var content = '<form><input type="text" value="222" name="text"/><br><input type="submit" value="Ok" name="submit" /></form><p><input type="button" value="destroy!" id="popup__destr_' + id + '"/></p>';
          popup.set({content: content, title:id});
            popup.show();
            //popup.destroyOnClose();

            var targ2 = document.getElementById('popup__destr_' + id);
            targ2.onclick = function(){
                console.log(popup.getID());
                popup.set(
                        {   'title': id,
                            'content': 'Success!',
                            'width': 200
                        }
                );
            }
            return false;
       }
</script>
</body>
</html>

-----------------
Example with several popups:
<html>
<head>
    <script src="popupFunctions.js"></script>
    <link rel="stylesheet" type="text/css" href="popupStyles.css" />
</head>
<body>
<p><input type="button" value="Popup!" id="popup__toggle"/></p>
<div style="width: 100px; height: 1000px; background: #333"></div>
<p>sdsdsdsdd</p>
<script>
        var targ = document.getElementById('popup__toggle');
        targ.onclick = function(){
          //var popup = new Popup({title: 'sdsdd', width: '300'});
          var popup = new Popup({"top": 100, "left": 100});
          var id = popup.getID();
          var content = '<form><input type="text" value="222" name="text"/><br><input type="submit" value="Ok" name="submit" /></form><p><input type="button" value="destroy!" id="popup__destr_' + id + '"/></p>';
          popup.set({content: content, title:id});
            popup.show();
            popup.destroyOnClose();

            var targ2 = document.getElementById('popup__destr_' + id);
            targ2.onclick = function(){
                console.log(popup.getID());
                popup.set(
                        {   'title': id,
                            'content': 'Success!',
                            'width': 200
                        }
                );
            }
            return false;
       }
</script>
</body>
</html>


----------------
Example with callback on close:
<html>
<head>
    <script src="popupFunctions.js"></script>
    <link rel="stylesheet" type="text/css" href="popupStyles.css" />
</head>
<body>
<p><input type="button" value="Popup!" id="popup__toggle"/></p>
<div style="width: 100px; height: 1000px; background: #333"></div>
<p>sdsdsdsdd</p>
<script>
        var targ = document.getElementById('popup__toggle');
          var popup = new Popup({title: 'sdsdd', width: '300', onClose: function(){alert("!")}});
        targ.onclick = function(){
          //var popup = new Popup({"top": 100, "left": 100});
          var id = popup.getID();
          var content = '<form><input type="text" value="222" name="text"/><br><input type="submit" value="Ok" name="submit" /></form><p><input type="button" value="destroy!" id="popup__destr_' + id + '"/></p>';
          popup.set({content: content, title:id});
            popup.show();
            //popup.destroyOnClose();

            var targ2 = document.getElementById('popup__destr_' + id);
            targ2.onclick = function(){
                console.log(popup.getID());
                popup.set(
                        {   'title': id,
                            'content': 'Success!',
                            'width': 200
                        }
                );
            }
            return false;
       }
</script>
</body>
</html>



-----------------
Example .showOn:
<html>
<head>
    <script src="popupFunctions.js"></script>
    <link rel="stylesheet" type="text/css" href="popupStyles.css" />
</head>
<body>
<p><input type="button" value="Popup!" id="popup__toggle"/></p>
<div style="width: 100px; height: 1000px; background: #333"></div>
<p>sdsdsdsdd</p>
<script>
          var targ = document.getElementById('popup__toggle');
          var popup = new Popup({title: 'sdsdd', width: '300'});
          var id = popup.getID();
          var content = '<form><input type="text" value="222" name="text"/><br><input type="submit" value="Ok" name="submit" /></form><p><input type="button" value="destroy!" id="popup__destr_' + id + '"/></p>';
          popup.set({content: content, title: id});
          popup.showOn('popup__toggle');

</script>
</body>
</html>

P.S.
Sided matherials and code? used into the project:
	1) Popups with pure CSS - http://habrahabr.ru/post/136351/
	2) Drag and drop functions - http://javascript.ru/ui/draganddrop