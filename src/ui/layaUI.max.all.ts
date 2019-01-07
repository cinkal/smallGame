
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class ComfirmDialogUI extends View {
		public _titleImg:Laya.Image;
		public txt2:Laya.Label;
		public _cancelButton:Laya.Button;
		public _okButton1:Laya.Button;
		public _okButton:Laya.Button;
		public btn1:Laya.Button;
		public _btn1Label:Laya.Label;
		public btn2:Laya.Button;
		public _btn2Label:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":540,"height":960},"child":[{"type":"Image","props":{"y":115,"x":55,"skin":"res/CreateGameScence/CreateRoomView/Pop_ups.png"}},{"type":"Image","props":{"y":152,"x":270,"var":"_titleImg","skin":"res/CreateGameScence/titleWorld/Quit-Game.png","name":"_titleImg","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":191,"x":67,"wordWrap":true,"width":408,"var":"txt2","valign":"middle","text":"Winners have not yet come out, if you quit game halfway 3 times a day, you will be unable to start game again.","rotation":0,"name":"_contentLabel","leading":5,"height":151,"fontSize":20,"color":"#000000","bold":false,"align":"center"}},{"type":"Button","props":{"y":345,"x":87,"width":0,"var":"_cancelButton","stateNum":2,"skin":"res/CreateGameScence/button/btn_r.png","name":"_cancelButton","height":0},"child":[{"type":"Label","props":{"y":0,"x":0,"wordWrap":true,"width":160,"valign":"middle","text":"Cancel","rotation":0,"height":55,"fontSize":24,"color":"#000000","bold":false,"align":"center"}}]},{"type":"Button","props":{"y":345,"x":292,"width":0,"var":"_okButton1","stateNum":2,"skin":"res/CreateGameScence/button/btn_y2.png","name":"_okButton1","height":0},"child":[{"type":"Label","props":{"y":0,"x":0,"wordWrap":true,"width":160,"valign":"middle","text":"OK","rotation":0,"height":55,"fontSize":24,"color":"#000000","bold":false,"align":"center"}}]},{"type":"Button","props":{"y":345,"x":189,"width":0,"var":"_okButton","stateNum":2,"skin":"res/CreateGameScence/button/btn_y2.png","name":"_okButton2","height":0},"child":[{"type":"Label","props":{"y":0,"x":0,"wordWrap":true,"width":160,"valign":"middle","text":"OK","rotation":0,"height":55,"fontSize":24,"color":"#000000","bold":false,"align":"center"}}]},{"type":"Button","props":{"y":345,"x":87,"width":0,"var":"btn1","stateNum":2,"skin":"res/CreateGameScence/button/btn_r.png","name":"_quitButton","height":0},"child":[{"type":"Label","props":{"y":0,"x":0,"wordWrap":true,"width":160,"var":"_btn1Label","valign":"middle","text":"Quit","rotation":0,"height":55,"fontSize":24,"color":"#000000","bold":false,"align":"center"}}]},{"type":"Button","props":{"y":345,"x":292,"width":0,"var":"btn2","stateNum":2,"skin":"res/CreateGameScence/button/btn_y2.png","name":"_stayButton","height":0},"child":[{"type":"Label","props":{"y":0,"x":0,"wordWrap":true,"width":160,"var":"_btn2Label","valign":"middle","text":"Stay","rotation":0,"height":55,"fontSize":24,"color":"#000000","bold":false,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.ComfirmDialogUI.uiView);

        }

    }
}

module ui {
    export class LoginViewUI extends View {
		public _versionLabel:Laya.Label;
		public _loadingBarBg:Laya.Image;
		public _loadingBar:Laya.Clip;

        public static  uiView:any ={"type":"View","props":{"width":540,"height":960},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"res/CreateGameScence/CreateRoomView/bg.png"}},{"type":"Image","props":{"y":208,"x":43,"skin":"res/CreateGameScence/CreateRoomView/logo.png"}},{"type":"Image","props":{"y":360,"x":88,"skin":"res/CreateGameScence/CreateRoomView/lading.png"}},{"type":"Label","props":{"y":407,"x":88,"width":365,"text":"Loading...","name":"_loadingLabel","height":35,"fontSize":27,"bold":false,"align":"center"}},{"type":"Label","props":{"y":497,"x":12,"width":516,"var":"_versionLabel","valign":"middle","text":"2.0.0000.0","name":"_versionLabel","height":35,"fontSize":22,"bold":false,"align":"right"}},{"type":"Image","props":{"y":360,"x":88,"var":"_loadingBarBg","skin":"res/CreateGameScence/CreateRoomView/lading.png"},"child":[{"type":"Clip","props":{"var":"_loadingBar","skin":"res/CreateGameScence/CreateRoomView/lading2.png","clipWidth":100}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.LoginViewUI.uiView);

        }

    }
}

module ui {
    export class ReconnectUI extends View {
		public _bg:Laya.Image;
		public _line:Laya.Image;
		public _content:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":540,"height":960},"child":[{"type":"Box","props":{"y":220,"x":525,"width":230,"height":280},"child":[{"type":"Image","props":{"y":-119,"x":-368,"var":"_bg","skin":"res/Common/loopsTip.png"}},{"type":"Image","props":{"y":-13,"x":-262,"var":"_line","skin":"res/Common/loops.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":117,"x":-391,"width":280,"var":"_content","text":"Reconnect","height":30,"fontSize":30,"color":"#fbfbdc","align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.ReconnectUI.uiView);

        }

    }
}
