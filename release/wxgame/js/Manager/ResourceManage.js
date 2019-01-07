var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var laya;
(function (laya) {
    var ResourceManager = /** @class */ (function (_super) {
        __extends(ResourceManager, _super);
        function ResourceManager() {
            var _this = _super.call(this) || this;
            _this._nowcount = 0; //已加载数量
            _this._maxCount = 0; //需加载数量
            // this._currResIndex = VIEWID.VIEWID_NORMAL;
            _this._commonResArray = [];
            _this._loadCommonCount = 0;
            _this._loadNextArray = null;
            return _this;
        }
        ResourceManager.getInstance = function () {
            if (!this._shareInstance) {
                this._shareInstance = new ResourceManager();
                if (this._shareInstance.init()) {
                    if (!this._shareInstance) {
                        this._shareInstance = null;
                        return null;
                    }
                }
            }
            return this._shareInstance;
        };
        ResourceManager.destoryInstance = function () {
            if (this._shareInstance) {
                this._shareInstance.destory();
                delete this._shareInstance;
                this._shareInstance = null;
            }
        };
        ResourceManager.prototype.destory = function () {
            // let len = this._loadedResMap.size();
            // if (len > 0) {
            //     for (let i = 0; i < len; ++i) {
            //         this._loadedResMap.removeByIndex(i);
            //     }
            //     delete this._loadedResMap;
            //     this._loadedResMap = null;
            // }
        };
        ResourceManager.prototype.loadCommonRes = function () {
            // this.loadResWithArray(CommonConfig.configCache, true);
        };
        ResourceManager.prototype.init = function () {
            // this._loadedResMap = new Vector<string>();
            // this._buildingsTempletMap = new Map<Laya.Templet>();
            // this._fontsMap = new Map<Laya.BitmapFont>();
            // this._eventDispatcher = Director.getInstance().getEventDispatcher();
            this.loadCommonRes();
            return true;
        };
        ResourceManager.prototype.getBuildingsTempletMap = function () {
            // return this._buildingsTempletMap;
        };
        // public loadSceneRes(scene: ScenesType): number {
        //     let resArray = null;
        //     switch (scene) {
        //         case ScenesType.LoadingScene:
        //         case ScenesType.LoginScene:
        //         {
        //             resArray = LoginSceneConfig.configCache;
        //             this._currResIndex = ScenesType.LoginScene;
        //             break;
        //         }
        //     }
        //     if (!resArray || resArray.length <= 0) return;
        //     this.loadResWithArray(resArray);
        // }
        // private loadResWithArray(array: any[], isLoadCommon?: boolean): void {
        //     if (!isLoadCommon && this._loadCommonCount > 0) {this._loadNextArray = array; return;}
        //     this._nowcount = 0;
        //     this._maxCount = array.length;
        //     this._loadCommonCount = isLoadCommon ? array.length : 0;
        //     for (let i = 0; i < array.length; ++i) {
        //         let file = array[i];
        //         switch (file.type) {
        //             case Laya.Loader.SK:
        //                 {
        //                     let templet = null;
        //                     templet = this._buildingsTempletMap.at(file.url);
        //                     if (templet) {
        //                         if (!isLoadCommon) {
        //                             this.loadViewResCallback(null, file.type);
        //                         }else {
        //                             this.loadCommonCallBack();
        //                         } 
        //                         continue;
        //                     }
        //                     templet = new Laya.Templet();
        //                     let callback = null;
        //                     if (!isLoadCommon) {
        //                         callback = this.loadViewResCallback;
        //                     }else {
        //                         callback = this.loadCommonCallBack;
        //                     } 
        //                     templet.on(Laya.Event.COMPLETE, this, callback, [file.url, file.type, templet]);
        //                     templet.on(Laya.Event.ERROR, this, this.loadResErrorCallBack, [file.url]);
        //                     templet.loadAni(file.url);
        //                 }
        //                 break;
        //             case Laya.Loader.FONT:
        //                 {
        //                     let bitmapFont = null;
        //                     bitmapFont = this._fontsMap.at(file.url);
        //                     if (bitmapFont) {
        //                         if (!isLoadCommon) {
        //                             this.loadViewResCallback(null, file.type);
        //                         }else {
        //                             this.loadCommonCallBack();
        //                         }
        //                         continue;
        //                     }
        //                     let callback = null;
        //                     if (!isLoadCommon) {
        //                         callback = this.loadViewResCallback;
        //                     }else {
        //                         callback = this.loadCommonCallBack;
        //                     } 
        //                     bitmapFont = new Laya.BitmapFont();
        //                     bitmapFont.loadFont(file.url, Laya.Handler.create(this, callback, [file.url, file.type, bitmapFont]));
        //                 }
        //                 break;
        //             case Laya.Loader.IMAGE:
        //             default:
        //                 {
        //                     if (!super.getRes(file.url)) {
        //                         let callback = null;
        //                         if (!isLoadCommon) {
        //                             callback = this.loadViewResCallback;
        //                         }else {
        //                             callback = this.loadCommonCallBack;
        //                         }
        //                         super.load(file.url, Laya.Handler.create(this, callback, [file.url, file.type]), null, file.type);
        //                     }
        //                     else {
        //                         if (!isLoadCommon) {
        //                             this.loadViewResCallback(file.url, file.type, null);
        //                         }else {
        //                             this.loadCommonCallBack();
        //                         }
        //                     }
        //                 }
        //                 break;
        //         }
        //     }
        // }
        ResourceManager.prototype.loadRes = function (path) {
            // super.load(path, Laya.Handler.create(this, this.loadResCallback));
            return true;
        };
        // private loadResCallback(path: any): void {
        //     let p = this._loadedResMap.indexOf(path.url);
        //     if (p < 0) {
        //         this._loadedResMap.push(path);
        //     }
        // }
        // private loadCommonCallBack() : void {
        //     this._loadCommonCount --;
        //     if (this._loadCommonCount <= 0) {
        //         this._loadCommonCount = 0;
        //         if (this._loadNextArray) {
        //             this.loadResWithArray(this._loadNextArray, false);
        //             this._loadNextArray = null;
        //         }
        //     } 
        // }
        // public loadViewResCallback(url?: any, type?: any, data?: any): void {
        //     this._nowcount++;
        //     switch (type) {
        //         case Laya.Loader.SK:
        //             {
        //                 if (data) this._buildingsTempletMap.add(data._skBufferUrl, data);
        //             }
        //             break;
        //         case Laya.Loader.FONT:
        //             {
        //                 if (data) {
        //                     this._fontsMap.add(url, data);
        //                     Laya.Text.registerBitmapFont(url, data);
        //                 }
        //             }
        //             break;
        //         case Laya.Loader.IMAGE:
        //         default:
        //             break;
        //     }
        //     if (this._nowcount >= this._maxCount) {
        //         this._nowcount = this._maxCount;
        //         this._eventDispatcher.event(EVENT_RESOURCE_PROGRESS_LOAD_END, { sceneType: this._currResIndex, count: this._nowcount, max: this._maxCount });
        //     }
        //     else {
        //         this._eventDispatcher.event(EVENT_LOADING_PROGRESS_VALUE, { sceneType: this._currResIndex, count: this._nowcount, max: this._maxCount });
        //     }
        // }
        // public loadResErrorCallBack(url:any) : void {
        //     this._nowcount++;
        //     if (this._nowcount >= this._maxCount) {
        //         this._nowcount = this._maxCount;
        //         this._eventDispatcher.event(EVENT_RESOURCE_PROGRESS_LOAD_END, { sceneType: this._currResIndex, count: this._nowcount, max: this._maxCount });
        //     }
        //     // if (this._currResIndex != ScenesType.LoginScene) laya.GameManager.getInstace().getServerDispatcher().sendLog2Server("loadResErrorCallBack============"+url);
        // }
        ResourceManager.prototype.getNowProgress = function () {
            return this._nowcount * 100 / this._maxCount;
        };
        //获取缓存资源
        ResourceManager.prototype.getRes = function (url) {
            return _super.prototype.getRes.call(this, url);
        };
        ResourceManager.prototype.clearFile = function (url) {
            _super.prototype.clearTextureRes.call(this, url);
        };
        ResourceManager._shareInstance = null;
        return ResourceManager;
    }(Laya.LoaderManager));
    laya.ResourceManager = ResourceManager;
})(laya || (laya = {}));
//# sourceMappingURL=ResourceManage.js.map