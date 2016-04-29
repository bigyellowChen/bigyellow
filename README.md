# bigyellow
// JavaScript Document
//DOM2

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
//getElementsByClassName
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
//getStyle
    function getStyle (obj,attr){
     return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];		
		}
//////////////////////////addclass//////////////////////////////		
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
	
//arrIndex		
    function arrIndex(arr,v){
		for(var i=0;i<arr.length;i++){
			if(arr[i]== v){
			 return	i;
				}
			}
		return -1;
		}
//doMove

   function doMove(obj,json[attr],timers,speednum,fn){
    clearInterval(obj.timer)
    obj.timer = setInterval(function(){
    var iStop = true;
    for(attr in json){                            
        //取当前值
	    var iCur =0 ;
	    if(attr=='opacity'){                      
	    iCur=parseInt(parseFloat(getStyle(obj,attr))*100);
	    }else{
	    iCur=parseInt(getStyle(obj,attr));
	    }

        //算速度
	   var iSpeed = (json[attr] - iCur)/speednum;   
	    iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
        //检测停止
        if(iCur!=json[attr] ){
           iStop=false;
        }

        if(attr== 'opacity'){                        
	     obj.style.filter = 'alpha(opacity='+(iCur + iSpeed)+')';//filter:alpha(opacity=)渐变
	     obj.style.opacity = (iCur + iSpeed)/100;//opacity渐变
	     }else{
	    obj.style[attr]= iCur + iSpeed; 
	     }

	   
    }
      if(iStop){
	      clearInterval(obj.timer)
	      fn && fn();                                 
	    }
   },timers)


   }

