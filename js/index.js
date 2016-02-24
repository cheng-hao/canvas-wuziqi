window.onload=function(){
	var canvas=document.querySelector('#canvas');
	var ctx=canvas.getContext('2d');
	var qizi={};//所有落子数据
	var kaiguan=true;//控制该谁落子

	kaiguan=localStorage.x?false:true;
	//绘制棋盘
	var huaqipan=function(){
		ctx.clearRect(0,0,600,600);
		ctx.beginPath();
		ctx.moveTo(20,20.5);
		ctx.lineTo(580,20.5);
		ctx.stroke();
		var x=20.5;
		var y=20.5;
		for(var i=0;i<15;i++){
			x+=40;
		//颜色渐变
		/*var li=ctx.createLinearGradient(0,0,560,0);
		li.addColorStop(0.5,'red');
		li.addColorStop(1,'green');*/
		ctx.strokeStyle="#000";
		//画线
		ctx.beginPath();
		ctx.moveTo(20,x);
		ctx.lineTo(580,x);
		ctx.stroke();
	}
	ctx.beginPath();
	ctx.moveTo(20.5,20);
	ctx.lineTo(20.5,580);
	ctx.stroke();
	for(var i=0;i<15;i++){
		y+=40;
		/*var li=ctx.createLinearGradient(0,0,0,560);
		li.addColorStop(0.5,'blue');
		li.addColorStop(1,'yellow');*/
		ctx.strokeStyle='#000';
		ctx.beginPath();
		ctx.moveTo(y,20);
		ctx.lineTo(y,580);
		ctx.stroke();
	}
	//5个圆点
	ctx.beginPath();
	ctx.arc(300.5,300.5,5,0,Math.PI*2);
	ctx.fill();
	ctx.beginPath();
	ctx.arc(140.5,140.5,5,0,Math.PI*2);
	ctx.fill();
	ctx.beginPath();
	ctx.arc(460.5,140.5,5,0,Math.PI*2);
	ctx.fill();
	ctx.beginPath();
	ctx.arc(140.5,460.5,5,0,Math.PI*2);
	ctx.fill();
	ctx.beginPath();
	ctx.arc(460.5,460.5,5,0,Math.PI*2);
	ctx.fill();
	//棋盘背景
	/*var img=new Image();
	img.src="images/1.jpg"
	img.onload = function() {  
          ctx.drawImage(img,0,0);  
        }*/
	/*ctx.fillStyle='rgba(255,255,0,.5)';
	ctx.fillRect(20,20,560,560);*/
	//渐变
	/*var lingrad= ctx.createLinearGradient(20,300,580,300);
	lingrad.addColorStop(0,'red');
	lingrad.addColorStop(0.2,'orange');
	lingrad.addColorStop(0.4,'yellow');
	lingrad.addColorStop(0.6,'green');
	lingrad.addColorStop(0.8,'blue');
	lingrad.addColorStop(1,'purple');

	ctx.lineWidth=4;
	ctx.lineCap='round';
	ctx.strokeStyle=lingrad;
	ctx.fillStyle=lingrad;

	ctx.beginPath();
	ctx.moveTo(20,300);
	ctx.lineTo(580,300);
	ctx.stroke();*/
}
huaqipan();

	//落子
	//x：number 落子的x坐标 y：number 落子y轴坐标 color：booleans true代表黑子 false代表白子
	var luozi=function(x,y,color){
		var zx=40*x+20.5;
		var zy=40*y+20.5;
		var black=ctx.createRadialGradient(zx,zy,3,zx,zy,18);
		black.addColorStop(0.5,'#555');
		black.addColorStop(1,'black');

		var white=ctx.createRadialGradient(zx,zy,3,zx,zy,18);
		white.addColorStop(0.5,'#fff');
		white.addColorStop(1,'#ddd');

		ctx.fillStyle=color ? black:white;
		ctx.beginPath();
		ctx.arc(zx,zy,14,0,Math.PI*2);
		ctx.fill();
	}
	//使用图片
	/*var qipanimg= document.querySelector("#sucai");
	var luozi=function(x,y,color){
		var zx=40*x+4.5;
		var zy=40*y+4.5;
		if(color){
			ctx.drawImage(qiziimg,0,0,75,75,zx,zy,36,36);
		}else{
			ctx.drawImage(qiziimg,85,0,75,75,zx,zy,36,36);
		}
	}*/
	var xy2id = function(x,y) {
		return x+'_'+y;
	}
	//判断
	var panduan = function(x,y,color) {
		var shuju = filter(color);
		var tx,ty,hang = 1;shu = 1; zuoxie= 1;youxie = 1;
		tx=x;ty=y;while( shuju[ xy2id( tx-1,ty ) ]){tx--;hang++};
		tx=x;ty=y;while( shuju[ xy2id( tx+1,ty ) ]){tx++;hang++};
		if(hang >= 5){return true};
		tx=x;ty=y;while( shuju[ xy2id( tx,ty-1 ) ]){ty--;shu++};
		tx=x;ty=y;while( shuju[ xy2id( tx,ty+1 ) ]){ty++;shu++};
		if(shu >= 5){return true};
		tx=x;ty=y;while( shuju[ xy2id( tx+1,ty-1 ) ]){tx++;ty--;zuoxie++};
		tx=x;ty=y;while( shuju[ xy2id( tx-1,ty+1 ) ]){tx--;ty++;zuoxie++};
		if(zuoxie >= 5){return true};
		tx=x;ty=y;while( shuju[ xy2id( tx-1,ty-1 ) ]){tx--;ty--;youxie++};
		tx=x;ty=y;while( shuju[ xy2id( tx+1,ty+1 ) ]){tx++;ty++;youxie++};
		if(youxie >= 5){return true};
	}
  //
	var filter = function(color) {
  	var r = {};
  	for(var i in qizi){
  		if(qizi[i]  == color){
  			r[i] = qizi[i];
  		}
  	}
  	return r;
  }

  canvas.onclick=function(e){
		var x=Math.round((e.offsetX-20.5)/40);//四舍五入  确定点击的位置离哪个落点近
		var y=Math.round((e.offsetY-20.5)/40);
		if(qizi[x+'_'+y]){return;}//通过字典判断  x + '_' + y  是否存在，是的话就是有子啦
		luozi(x,y,kaiguan);
		qizi[x+'_'+y]=kaiguan?'black':'white'; //保存下的是黑子还是白子

		if(kaiguan){
			//alert(1);
			if( panduan(x,y,'black') ){

				alert('黑棋赢');
				if(confirm('是否再来一局？')){
					localStorage.clear();
					qizi = {};
					huaqipan();
					kaiguan = true;
					return;
				}else{
					canvas.onclick  = null;
				}
			}
		}else{
			if( panduan(x,y,'white') ){
				alert('白棋赢');
				if(confirm('是否再来一局？')){
					localStorage.clear();
					qizi = {};
					huaqipan();
					kaiguan = true;
					return;
				}else{
					canvas.onclick = null;
				}
			}
		}

		kaiguan=!kaiguan;
	    localStorage.data=JSON.stringify(qizi);//把对象转成字符串  存入localStorage  落子之后  localStorage.data  里边就有数据啦

	    if(!kaiguan){
	    	localStorage.x='a';
	    }else{
	    	localStorage.removeItem('x');
	    }
	}
	
	//如果本地存储中有棋盘数据，读取这些数据并绘制到页面中
	if(localStorage.data){
	    qizi=JSON.parse(localStorage.data);//转换为原对象
	    for(var i in qizi){
	    	var x=i.split('_')[0];
	    	var y=i.split('_')[1];
	    	luozi(x,y,(qizi[i]=='black')?true:false);
	    }
	}
	canvas.ondblclick=function(e){//清除画板双击的冒泡
		e.stopPropagation();
	}
	document.ondblclick=function(){ //双击document的时候清空数据并重载页面
		localStorage.clear();
		location.reload();
	}


}