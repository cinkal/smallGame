var laya;
(function (laya) {
    var MusicManager22 = /** @class */ (function () {
        // private _musicMap:smallGame.Map<Laya.SoundChannel>;
        // //音量范围 0-1 （0.静音 1.最大）
        // private _soundVolume:number;                    
        // private _musicVolue:number;
        // private _currMusic:string;
        // private _currSound:string;
        function MusicManager22() {
            // this._musicMap = new smallGame.Map<Laya.SoundChannel>();
            // this._soundVolume = 0;
            // this._musicVolue = 0;
            // this._currMusic = "";
            // this._currSound = "";
        }
        MusicManager22.getInstace = function () {
            if (!this._shareMusicManager) {
                this._shareMusicManager = new MusicManager22();
                if (this._shareMusicManager.init()) {
                    if (!this._shareMusicManager) {
                        delete this._shareMusicManager;
                        this._shareMusicManager = null;
                    }
                }
            }
            return this._shareMusicManager;
        };
        // public static destoryInstance() : void {
        //     if(this._shareMusicManager) {
        //         delete this._shareMusicManager;
        //         this._shareMusicManager = null;
        //     }
        // }
        MusicManager22.prototype.init = function () {
            // Laya.SoundManager.autoStopMusic = false;
            return true;
        };
        MusicManager22._shareMusicManager = null;
        return MusicManager22;
    }());
    smallGame.MusicManager22 = MusicManager22;
})(laya || (laya = {}));
//# sourceMappingURL=MusicManager.js.map