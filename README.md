# MoveElementJS
给指定HTML元素添加鼠标移动（拖拽）的功能

#### 1 使用方式
  引入moveElement的JS文件后，会得到一个全局对象【moveElement】，此对象有两个方法：

1.1 【moveElement.add(mouseMoveEle, mouseDownEle)】方法说明如下：
* @description	为指定元素添加移动功能
* @parameter {object} mouseMoveEle 可移动的对象
* @parameter {object} [mouseDownEle] 鼠标点击并按住的对象
* @return {function} mouseDown 为该点击元素（即上面的[mouseDownEle]）绑定的函数，可用于配合下面的【remove】方法移除此元素的【mousedown】事件

1.2【moveElement.remove(mouseDownEle, func)】方法说明如下：
* @description	移除点击元素的【mousedown】事件
* @parameter {object} mouseDownEle 鼠标点击并按住的对象（同上）
* @parameter {function} [func] 使用【add】方法时所接收到的函数
* @return {object} this 【moveElement】对象

#### 2 使用注意
* 【moveElement.add(mouseMoveEle, mouseDownEle)】方法中若第二个参数没有，则默认拖动元素和移动元素都是第一个参数所传递的HTML元素；
* IE系列的IE9+才会针对当前浏览器的可视区域的下方做移动限制，IE8及以下向下移动时没有下边界限制；
* 使用移除函数【moveElement.remove(mouseDownEle, func)】时若不成功，请再三确认参数是否传递正确。

#### 3 浏览器兼容
  IE系列支持IE7+；其它主流浏览器（较）新版本都支持，低版本未测。

#### 4 其它依赖
  无。
#### 5 Demo地址
https://gonghongchen.github.io/MoveElementJS/
