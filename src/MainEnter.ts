// 程序入口
class MainEnter{
    constructor()
    {

        let director = smallGame.Director.getInstance();
        director.setAnimationIntervalExtar(1.0 / 30);
        director.runWithScene(smallGame.LoginScene.create());
    }
}

// var pkApi = Laya.Browser.window.PkApi;
// var SDKConfig = Laya.Browser.window.SDKConfig;
//初始化微信小游戏
Laya.MiniAdpter.init();
var CLIENTVERSION = "1.0.1217.7";

new MainEnter();
