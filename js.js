// JavaScript Document
/////////////////////////////////////////////////$仿jQuery//////////////////////////////////////////////////
   function $(v){
        if(typeof v === 'function'){
            window.onload =v;
        }else if(typeof v === 'string'){
            return document.getElementById(id);
        }else if(typeof v ==='object'){
            return v;
        }
       }

////////////////////////////////////////////////getID//////////////////////////////////////////////////////
   function getId(id){
        return document.getElementById(id);
   }

///////////////////////////////////////DOM2级兼容///////////////////////////////////////////////////////////
   
    function addHande(obj,type,hander){
		if(obj.addEventListener){
		obj.addEventListener(type,hander,false);
		}else if(obj.attachEvent){
		obj.attachEvent('on'+type,hander);
		}else{
		obj['on'+type]= hander;	
			}
		}
	function removeHander(obj,type,hander){
		if(obj.removeEventListener){
		obj.removeEventListener(type,hander,false);
		}else if(obj.detachEvent){
		obj.detachEvent('on'+type,hander);
		}else{
		obj['on'+type]= null;	
			}
		}
////////////////////////////////////////////getElementsByClassName////////////////////////////////////////////////
	function getElementsByClassName(parent,classname,tagname){
       var _aels = parent.getElementsByTagName(tagname);
	   var arr =[];
	   for (var i=0;i<_aels.length;i++){
		
	   var _aclass = _aels[i].className.split(' ');
	   for (var j=0;j<_aclass.length;j++){
	   if(_aclass[j] == classname){
		 arr.push(_aels[i]);
		break;
		}
		}
	}	
    return arr;
  }
///////////////////getStyle函数////////////////////////////////////
    function getStyle (obj,attr){
     return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];		
		}
////////////////////////////////////////////addclass//////////////////////////////////////////////////////////////		
    function addClass(obj,classname){
		//如果原来没有class
		if(obj.className == ''){
		obj.className =classname;
		}else{
		//如果原来有class
		  var _arrclassname = obj.className.split(' ');
		  var _index =arrIndex(_arrclassname,classname)
		  if(_index == -1){
			 //如果原来的class不存在
			 obj.className += ' ' + classname
			  }	
		   //如果原来的的class存在
		}
		}
	
////////////////////////////////////////////////////数组中匹配相同值/////////////////////////////////////////////		
    function arrIndex(arr,v){
		for(var i=0;i<arr.length;i++){
			if(arr[i]== v){
			 return	i;
				}
			}
		return -1;
		}
////////////////////////运动函数doMove减速运动/////////////////////////////////////////////////////////完美运动框架

   function starMove(obj,json,timers,speednum,fn){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var iStop = true;
        for(attr in json){                             //json循环
            //取当前值
    	    var iCur =0 ;
    	    if(attr=='opacity'){                      //属性为opacity时
    	    iCur=parseInt(parseFloat(getStyle(obj,attr))*100);//计算机最好不小数，小数出错，转换成整数
    	    }else{
    	    iCur=parseInt(getStyle(obj,attr));
    	    }

            //算速度
    	   var iSpeed = (json[attr] - iCur)/speednum;   //速度   （目标位置-当前位置）/速度系数
    	    iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
            //检测停止
            if(iCur!=json[attr]){
               iStop=false;
            }

            if(attr== 'opacity'){                        //属性为opacity时
    	     obj.style.filter = 'alpha(opacity='+(iCur + iSpeed)+')';//filter:alpha(opacity=)渐变
    	     obj.style.opacity = (iCur + iSpeed)/100;//opacity渐变
    	     }else{
    	    obj.style[attr]= iCur + iSpeed+'px'; 
    	     }

    	   
        }
          if(iStop){
    	      clearInterval(obj.timer)
    	      fn && fn();                                 //回调函数存在，执行
    	    }
   },timers)


   }

/////////////////////////////////////////////运动函数fastMove匀速运动///////////////////////////////////////////

   function fastMove(obj,attr,timers,iTarget,iSpeed,fn){
            clearInterval(obj.timer);
            obj.timer = setInterval(function(){
                //取当前值
                var iCur =0 ;
                if(attr=='opacity'){                      //属性为opacity时
                    iCur=parseInt(parseFloat(getStyle(obj,attr))*100);//计算机最好不小数，小数出错，转换成整数
                }else{
                    iCur=parseInt(getStyle(obj,attr));
                }
                //算速度
                iSpeed=iCur<iTarget?iSpeed:-iSpeed;
                //检测停止
                if(iSpeed==iTarget){
                	clearInterval(obj.timer);
                	fn&&fn();
                }else{
                if(attr== 'opacity'){                        //属性为opacity时
                    obj.style.filter = 'alpha(opacity='+(iCur + iSpeed)+')';//filter:alpha(opacity=)渐变
                    obj.style.opacity = (iCur + iSpeed)/100;//opacity渐变
                }else{
                    obj.style[attr]= iCur + iSpeed+'px';
                }
               
                }
                   
            },timers)
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    function doMove( obj, attr, dir, iTarget, endFn ) {
    
    dir = parseInt(getStyle( obj, attr )) < iTarget ? dir : -dir;
    
    clearInterval( obj.timer );
    
    obj.timer = setInterval(function () {
        
        var iSpeed = parseInt(getStyle( obj, attr )) + dir;          // 步长
        
        if ( iSpeed > iTarget && dir > 0 ||  iSpeed < iTarget && dir < 0  ) {
            iSpeed = iTarget;
        }
        
        
        
        if ( iSpeed == iTarget ) {
            clearInterval( obj.timer );
            endFn && endFn();
        }else{
            obj.style[attr] = iSpeed + 'px';
        }
        
    }, 30);
}
////////////////////////////////////////////////////拖拽Drag///////////////////////////////////////////////////
    function Drag(obj){

            obj.onmousedown = function(ev) {
                var ev = ev || event;
                var disX = ev.clientX - this.offsetLeft;//鼠标当前所在X轴-obj自身长度
                var disY = ev.clientY - this.offsetTop;//鼠标当前所在Y轴-obj自身高度
                    if(obj.setCapture){
                        obj.setCapture();
                    }
                document.onmousemove = function(ev){
                    var ev = ev || event;
                    var l = ev.clientX - disX;    //当前object离页面X距离
                    var t = ev.clientY - disY;    //当前object离页面Y距离
                    //可视距离
                    var winW = document.documentElement.clientWidth|| document.body.clientWidth;
                    var winH = document.documentElement.clientHeight || document.body.clientHeight;
                    //可视距离-自身距离
                    var maxW = winW - obj.offsetWidth;
                    var maxH = winH - obj.offsetHeight;
                    if(l<0){
                        l=0;
                    }else if(l>maxW){
                        l = maxW;
                    }else if(t<0){
                        t = 0;
                    }else if(t>maxH){
                        t = maxH;
                    }
                    obj.style.left = l+'px';
                    obj.style.top = t+'px';
                };
                document.onmouseup= function(){
                    document.onmousemove = null;
                    document.onmouseup = null;
                    if(obj.releaseCapture){
                        obj.releaseCapture();
                    }
                };
                return false;
            };
        }

//////////////////////抖动运动////////////////////////////////////////////////////////////////////////////////////////////
        //取值,_attr代表obj.offsetLeft/obj.offsetTop因为left/top等一些值不能为小数;
        var _attr=0;

        function shakeMove(obj,attr,iTarget,iSpeed){
            clearInterval(timer)
            obj.timer = setInterval(function(){

                  iSpeed +=(iTarget-getStyle(obj,attr))/5; //速度
                  iSpeed *=0.7; 
                  _attr += iSpeed;  

                  if(Math.abs(iSpeed<1)&&Math.abs(_attr-iTarget)<1){  //当速度为小数 且当前offsetLeft/Top与iTarge小于1相交时
                    clearInterval(timer);
                    obj.style[attr] = iTarget +'px';//定时器走完，offsetLeft/Top到目标点iTarget，避免误差
                   }else{
                   	obj.style[attr] = _attr + 'px';
                   }
            },30)
    }
///////////////////////////////////////////////getPos得到当前页面位置/////////////////////////////////////////////////////////////////////
    function getPos(obj){
        var pos = {left:0,top:0};
        while(obj){
            pos.left += obj.offsetLeft;
            pos.top += obj.offsetTop;
            obj = obj.offsetParent;
        }
    return pos;
    }   
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
