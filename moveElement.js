/*
 * @description 实现通过鼠标来移动（拖拽）指定元素
 * @browser-support IE7+
 * @version 1.0
 */
(function(window, doc) {
	var zIndex = 666,	//移动元素的【z-index】值
		screenAvailHeight = function(doc) {	//获取当前浏览器下屏幕的可用高度
			try{
				var div = doc.createElement("div");
				div.style.height = "100vh";
				doc.body.appendChild(div);
				var screenAvailHeight = div.clientHeight;
				doc.body.removeChild(div);
				div = null;
				return screenAvailHeight;
			}catch(e){	//IE9以下
				return doc.body.clientHeight;
			}
		}(doc);
	
	var funcs = {	//一些基本功能
		addEventListener : function(dom, type, func) {	//添加监听事件
			if (dom.addEventListener) {
				dom.addEventListener(type, func, false);
			} else if(dom.attachEvent) {
				dom.attachEvent("on" + type, func);
			} else{
				dom["on" + type] = func;
			}
			return this;
		},
		removeEventListener : function(dom, type, func) {	//移除监听事件
			if (dom.removeEventListener) {
				dom.removeEventListener(type, func, false);
			} else if(dom.detachEvent) {
				dom.detachEvent("on" + type, func);
			} else{
				dom["on" + type] = null;
			}
			return this;
		},
		preventDefault : function(e) {	//阻止点击事件的默认行为
			if (e.preventDefault) {
				e.preventDefault();
			} else{
				e.returnValue = false;
			}
			return this;
		}
	};
	
	var moveElement = function(doc, screenAvailHeight, funcs) {		//核心功能
		var add = function(mouseMoveEle, mouseDownEle) {
			/*
			 * @description	为指定元素添加移动功能
			 * @parameter {object} mouseMoveEle 可移动的对象
			 * @parameter {object} [mouseDownEle] 鼠标点击并按住的对象
			 * @return {function} mouseDown 为该点击元素（即上面的[mouseDownEle]）绑定的函数，可用于配合下面的【remove】方法移除此元素的【mousedown】事件
			 */
			
			if (typeof mouseMoveEle !== "object") {
				throw new Error("mouseMoveEle must be a object!");
			}
			if (mouseDownEle && typeof mouseDownEle !== "object") {
				throw new Error("mouseDownEle must be a object!");
			} else if(!mouseDownEle) {
				mouseDownEle = mouseMoveEle;
			}
			
			//保证一些样式（如果已设置，可删除）
			mouseDownEle.style.cursor = "move";
			mouseMoveEle.style.position = "fixed";
			mouseMoveEle.style.zIndex = zIndex++;
			
			var	maxLeft = doc.body.clientWidth - mouseMoveEle.clientWidth,
				maxTop = screenAvailHeight - mouseMoveEle.clientHeight;
			
			var mouseDown = function(event) {	//鼠标按下
				e = event || window.event;
				funcs.preventDefault(e);
				
				var moveEle = mouseMoveEle,
					leftAvail = e.clientX - moveEle.offsetLeft,
					topAvail = e.clientY - moveEle.offsetTop;
					
				var mouseMove = function(event) {	//鼠标移动
					e = event || window.event;
					var left = e.clientX - leftAvail,
						top = e.clientY - topAvail;
					
					//实时设置移动元素的位置，并控制在当前浏览器窗口可用范围内（IE9以下除外）。为了兼容IE7、IE8，下面只能用【moveEle】，而不能直接使用【this】。
					moveEle.style.left = left > 0 ? (left > maxLeft ? (maxLeft + "px") : (left + "px")) : 0;
					moveEle.style.top = top > 0 ? (top > maxTop ? (maxTop + "px") : (top + "px")) : 0;
					return false;
				};
				
				//添加鼠标移动事件
				funcs.addEventListener(doc, "mousemove", mouseMove);
				
				//鼠标抬起后移除鼠标移动事件
				funcs.addEventListener(doc, "mouseup", function() {
					funcs.removeEventListener(doc, "mousemove", mouseMove);
				});
			};
			
			//添加鼠标点击事件
			funcs.addEventListener(mouseDownEle, "mousedown", mouseDown);
			
			return mouseDown;
		};
		var remove = function(mouseDownEle, func) {
			/*
			 * @description	移除点击元素的【mousedown】功能
			 * @parameter {object} mouseDownEle 鼠标点击并按住的对象
			 * @parameter {function} [func] 使用【add】方法所接收到的函数
			 * @return {object} this 【moveElement】对象
			 */
			if (typeof mouseDownEle !== "object") {
				throw new Error("mouseDownEle must be a object!");
			}
			if (typeof func !== "function") {
				throw new Error("func must be a function!");
			}
			
			funcs.removeEventListener(mouseDownEle, "mousedown", func);
			mouseDownEle.style.cursor = "default";
			
			return this;
		};
		
		return {
			add : add,
			remove : remove
		}
	}(doc, screenAvailHeight, funcs);
	
	window.moveElement = moveElement;
	
})(window, document);