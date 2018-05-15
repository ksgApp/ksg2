enchant();
window.onload = function() {
 var game = new Game(320,467); //ゲーム準備、表示領域
 var scale_h = window.innerHeight/480;
 var scale_w = window.innerWidth/320;
 if(scale_h >= scale_w){
  game.scale = scale_w
 }
 else{
 	 game.scale = scale_h
 }

 game.preload('./img/003.png','./img/b.png','./img/b2.png','./img/enemy.png'); //ゲームに用いるリソース（画像）読み込み
 game.fps = 30;
 game.onload = function() {

 //タイトル画面

 var createTitleScene = function() {
	var scene = new Scene();
	var label = new Label('ダッシュ');

	label.textAlign = 'center';
	label.y = 220;
	label.font = '28px sans-serif';

	scene.addChild(label);
	scene.backgroundColor = 'rgba(230,250,230,1)';
	scene.addEventListener(Event.TOUCH_START,function(e){
	
	 game.replaceScene(createGameScene());
	});
	return scene;
  };

//ゲーム画面

  var createGameScene = function() {
    var GRAND_LINE = 400;	//地平線の高さ
	var SCROLL_SPEED = 5;	//スクロールの速さ
	var scroll = 0;
	var scene = new Scene();
	scene.backgroundColor = '#8fd3ef';	//シーンの背景色
	
	var bg = new Sprite(320, 467);	//背景生成
	bg.image = game.assets['./img/b.png'];	//背景画像設定
	bg.x = 0;	//背景の配置
	bg.y = 0;
	scene.addChild(bg);

	var bg2 = new Sprite(320, 467);	//背景生成
	bg2.image = game.assets['./img/b2.png'];	//背景画像設定
	bg2.x = 320;	//背景の配置
	bg2.y = 0;
	scene.addChild(bg2);

	var scoreLabel = new Label("");	//スコア生成
	scoreLabel.color = '#000';
	scoreLabel.font = '14px sans-serif';
	scene.addChild(scoreLabel);

	var e = new Sprite(57, 80);	//障害物生成
	e.image = game.assets['./img/enemy.png'];	//しょうがいぶつ画像設定
	e.x = -e.width;	//障害物配置
	e.y = GRAND_LINE - e.height;
	scene.addChild(e);

	var player = new Sprite(88, 90);	//プレイヤー生成
	player.image = game.assets['./img/003.png'];	//プレイヤー画像設定
	player.x = 20;	//プレイヤーの配置
	player.y = GRAND_LINE - player.height;
	scene.addChild(player);

	var damage = function() {	//当たった時の関数
	 alert("たぶんいたい");
	 game.pushScene(createGameoverScene(scroll));
	}


	scene.addEventListener(Event.ENTER_FRAME, function(){	//毎フレームイベント

	scroll += SCROLL_SPEED;
	scoreLabel.text = 'スコア：'+scroll.toString();	//スコア加算

	bg.x -= SCROLL_SPEED;	//背景画像スクロール
	bg2.x -= SCROLL_SPEED;
	if(bg.x <= -320){
		bg.x = 320;
	}if(bg2.x <= -320){
		bg2.x = 320;
	}


	player.frame ++;	//プレイヤーわさわさ
	if(player.frame > 3){
	 player.frame = 0;
	 }
	
	
	if(scroll % 400 == 0){	//障害物スクロール
		e.x = 320;
	}
	if(e.x > -e.width){
		e.x -= SCROLL_SPEED*2;
		if (e.within(player, 60)){
			damage();
		}
	}


	
	});

	scene.addEventListener(Event.TOUCH_START, function(e){
	
	player.tl.moveBy(0,-115,12, enchant.Easing.CUBIC_EASEOUT)	//ジャンプ
		.moveBy(0, 115, 12, enchant.Easing.CUBIC_EASEIN);
	});

	return scene;
  };

  
//終了画面
var createGameoverScene = function(scroll) {
	var scene = new Scene();
	scene.backgroundColor = '#000';

	var label = new Label(scroll+'m走った！');
	label.textAlign = 'center';
	label.color = '#fff';
	label.y = 220;
	label.font = '40px sans-serif';
	scene.addChild(label);

	var retry = new Label('リトライ');
	retry.color = '#fff';
	retry.x = 0;
	retry.y = 30;
	retry.font = '20px sans-serif';
	scene.addChild(retry);

	retry.addEventListener(Event.TOUCH_START, function(e) {
		game.replaceScene(createTitleScene());
	});
	return scene;

	};
	
  game.replaceScene(createTitleScene());
 }
 game.start(); //ゲーム開始
};