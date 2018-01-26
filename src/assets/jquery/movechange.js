(function($){$.fn.Waterfall=function(setting){return this.each(function(){var vs=$.browser;var defaults={row:0,width:200,margin:5,speed:200,tagName:'div',mark:'fall',delTime:1,control:"#falls:first-child"};var topList=[],leftList=[],settings=$.extend(defaults,setting),$Obj=$(this),Olist,Ol,Olength=0,rows,Fwidth=settings.width+settings.margin,Swidth,Mwidth,msie;var clone,down=false,sour,targ,cur={curX:0,curY:0},sou={souX:0,souY:0},tag={tagX:0,tagY:0},i=0;var min,minIndex;var init=function(){rows=(settings.row==0)?Math.floor(($(window).width()-40)/Fwidth):settings.row; Swidth=Fwidth*rows;Lwidth=Fwidth*(rows+1);$Obj.css("width",Swidth)};var append=function(){init();Olist=$Obj.children(settings.tagName+"[name!='"+settings.mark+"']");Olist.css({"position":"absolute"});if($Obj.children(settings.tagName+"[name='"+settings.mark+"']").length>0){topList=$Obj.data("List").tL;leftList=$Obj.data("List").lL}else{topList.length=0;leftList.length=0;$Obj.removeData("List");for(var i=0;i<rows;i++){leftList.push(Fwidth*i);topList.push(0)}}};var direction=function(elem){min=Math.min.apply({},topList);minIndex=$.inArray(min,topList);topList[minIndex]+=elem.outerHeight()+settings.margin;$Obj.css("height",Math.max.apply({},topList))};var orient=function(){Olist.find("img").bind("load",function(){Ol=$(this).parents("#falls>"+settings.tagName);Ol.attr("name",settings.mark)});var timeout=setTimeout(function(){Olist.each(function(){var Ol=$(this);if(Ol.attr("name")==settings.mark){direction(Ol);Ol.css({top:min,left:leftList[minIndex]}).fadeIn(settings.speed)}else{Ol.remove()}})},settings.delTime);$Obj.data("List",{tL:topList,lL:leftList})};var reset=function(){init();Olist=$Obj.children(settings.tagName+"[name='"+settings.mark+"']");topList.length=0;leftList.length=0;for(var i=0;i<rows;i++){leftList.push(Fwidth*i);topList.push(0)}Olist.each(function(){direction($(this));$(this).stop().animate({top:min,left:leftList[minIndex]},settings.speed)});$Obj.data("List",{tL:topList,lL:leftList})};$(document).ready(function(){append();orient();$(window).unbind("resize").resize(function(){var _w=$(window).width();if(_w<Swidth||_w>Lwidth){reset()}});if(!($.browser.msie&&$.browser.version=="6.0")){$(document).unbind("mousemove mouseup").mousemove(function(event){if(down){var eve=event||window.event;clone.show();var xx=(eve.pageX||eve.clientX)-cur.curX;var yy=(eve.pageY||(eve.clientY+document.documentElement.scrollTop))-cur.curY;clone.css({"top":yy,"left":xx});var scroll=$(document).scrollTop();if(eve.clientY>($(window).height()-100)&&(document.documentElement.scrollTop+$(window).height())<$(document).height()){document.body.scrollTop+=5}else if(eve.clientY<100){document.body.scrollTop-=5}};return false}).mouseup(function(){down=false;try{clone.hide(200)}catch(e){}finally{setTimeout(function(){$(".clone").remove()},200)};return false});var listChange=function(_sub){var _sleft=sou.souX/Fwidth;var _tleft=tag.tagX/Fwidth;topList[_tleft]-=_sub;topList[_sleft]+=_sub;$Obj.css("height",Math.max.apply({},topList))};$Obj.unbind("mousedown mouseup").mousedown(function(e){var event=e||window.event;var elem=$(event.target||event.srcElement);sour=elem.parents(settings.tagName+"[name='"+settings.mark+"']");if(elem.is(settings.control)){sou.souX=parseInt(sour.css("left"));sou.souY=parseInt(sour.css("top"));cur.curX=(event.pageX||event.clientX)-sou.souX-settings.margin*2;cur.curY=(event.pageY||(event.clientY+document.body.scrollTop))-sou.souY-settings.margin*2-10;down=true;try{$(".clone").remove();clone=sour.clone(false,true);clone.attr("name","clone");clone.addClass("clone");$Obj.append(clone)}catch(e){$(".clone").remove()}};return false}).mouseup(function(event){if(down){var eve=event||window.event;var elem=$(eve.target||eve.srcElement);targ=elem.parents(settings.tagName+"[name='"+settings.mark+"']")||elem;if(targ.is(settings.tagName+"[name='"+settings.mark+"']")){var current=$Obj.children(":first");var top,t1=0;var sub=targ.height()-sour.height();tag.tagX=parseInt(targ.css("left"));tag.tagY=parseInt(targ.css("top"));if(tag.tagY!=sou.souY||tag.tagX!=sou.souX){while(current.length!=0){t1=0;top=parseInt(current.css("top"));if(current.css("left")==sou.souX+"px"){if(top>sou.souY){t1+=sub}}if(current.css("left")==tag.tagX+"px"){if(top>tag.tagY){t1+=-sub}}top+=t1;current.css({"top":top});current=current.next()}souX=sour.css("left");souY=sour.css("top");tagX=targ.css("left");tagY=targ.css("top");listChange(sub);targ.css({"top":souY,"left":souX});sour.css({"top":tagY,"left":tagX});clone.stop().animate({"top":parseInt(tagY)+2,"left":parseInt(tagX)+2},200)}}else{clone.hide(200)}$("#time").val(targ.text());down=false;try{setTimeout(function(){clone.remove()},200)}catch(e){$(".clone").remove()}}return false})}})})}})(jQuery);