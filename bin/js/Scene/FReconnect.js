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
/**
* name
*/
var smallGame;
(function (smallGame) {
    var FReconnect = /** @class */ (function (_super) {
        __extends(FReconnect, _super);
        function FReconnect() {
            var _this = _super.call(this) || this;
            _this._reconnectView = null;
            _this._endGame = false;
            _this._enterBackground = false;
            return _this;
        }
        FReconnect.create = function () {
            var ret = new FReconnect();
            if (ret && ret.init()) {
                return ret;
            }
            ret = null;
            return null;
        };
        FReconnect.prototype.init = function () {
            this.regsiterEvent();
            this.initOnBackgroundAndForeground();
            return true;
        };
        FReconnect.prototype.destroy = function () {
            this.unRegsiterEvent();
            this.removeSelf();
            _super.prototype.destroy.call(this);
        };
        FReconnect.prototype.setEndGame = function (endGame) {
            this._endGame = endGame;
        };
        FReconnect.prototype.getEnterBackground = function () {
            return this._enterBackground;
        };
        FReconnect.prototype.setEnterBackground = function (enterBackground) {
            this._enterBackground = enterBackground;
        };
        FReconnect.prototype.regsiterEvent = function () {
            smallGame.Director.getInstance().getEventDispatcher().on(EVENT_NET, this, this.netCapturor);
        };
        FReconnect.prototype.unRegsiterEvent = function () {
            smallGame.Director.getInstance().getEventDispatcher().off(EVENT_NET, this, this.netCapturor);
        };
        FReconnect.prototype.hideNetMsgBoxView = function () {
            if (this._reconnectView && this._reconnectView.visible) {
                smallGame.GameManager.getInstace().getServerDispatcher().getNetState()._waitRebuild = false;
                this._reconnectView.setViewVisible(false);
            }
        };
        FReconnect.prototype.closeGame = function () {
            this._endGame = true;
            // SdkUtils.closeAndEndGame(ROLETYPE.ANCHOR, true, 0);
        };
        FReconnect.prototype.netWorkRebuild = function () {
            var _this = this;
            if (this._endGame || this._enterBackground)
                return;
            var handler = Laya.Handler.create(this, function () {
                var network = smallGame.GameManager.getInstace().getServerDispatcher();
                var rebuildcount = network.getRebuildCount();
                CONSOLE_LOG("重试次数 ： %i", rebuildcount);
                if (rebuildcount > NET_REBUILD_MAX) {
                    CONSOLE_LOG("关闭游戏。");
                    _this._endGame = true;
                    // SdkUtils.closeAndEndGame(GameManager.getInstace().getPlayer().getRoleType());
                }
                else {
                    smallGame.GameManager.getInstace().getServerDispatcher().connectionRebuild();
                }
            }, null, true);
            if (!this._reconnectView) {
                this._reconnectView = ReconnectView.create(null);
                this.addChild(this._reconnectView);
                this._reconnectView.setViewVisible(true);
            }
            else if (!this._reconnectView.visible) {
                this._reconnectView.setViewVisible(true);
            }
            handler.runWith(handler.args);
        };
        FReconnect.prototype.netErrorTips = function (errorCode) {
            // MsgToast.showToast(GET_LANGUAGE_TEXT(LConfig.LBYErrorCode.getMsg_id(errorCode)));
        };
        FReconnect.prototype.netCapturor = function (e) {
            switch (e._subEvent) {
                case EVENT_NET_START:
                    {
                        CONSOLE_LOG("网络连接成功。");
                        smallGame.GameManager.getInstace().getServerDispatcher().resetRebuildCount();
                        this.hideNetMsgBoxView();
                        if (smallGame.GameManager.getInstace().getServerDispatcher().isRebuild()) {
                            smallGame.GameManager.getInstace().getServerDispatcher().setRebuild(false);
                            // SdkUtils.loginServerAfterPlatform();
                            // enterGame(true);
                        }
                    }
                    break;
                case EVENT_NET_ERROR_CODE:
                    this.netErrorTips(e._data.errorCode);
                    break;
                case EVENT_NET_UI_HIDE_CONNECT_MSG:
                    this.hideNetMsgBoxView();
                    break;
                case EVENT_NET_REBUILD:
                    CONSOLE_LOG("EVENT_NET_REBUILD");
                    this.netWorkRebuild();
                    break;
                case EVENT_NET_CLOSE:
                    // this.netWorkLost();
                    CONSOLE_LOG("EVENT_NET_CLOSE");
                    this.netWorkRebuild();
                    break;
                case EVENT_NET_SENDERROR:
                    break;
                default:
                    break;
            }
        };
        FReconnect.prototype.applicationDidEnterBackground = function () {
            CONSOLE_LOG("进入后台");
            // this.setEnterBackground(true);
            this._enterBackground = true;
            smallGame.MusicManager.getInstace().stopAll();
            smallGame.GameManager.getInstace().getServerDispatcher().freeTcp();
            smallGame.Director.getInstance().unScheduleMainLoop();
        };
        FReconnect.prototype.applicationWillEnterForeground = function () {
            CONSOLE_LOG("回到前台");
            if (!this._enterBackground)
                return;
            this._enterBackground = false;
            var curMusic = smallGame.MusicManager.getInstace().getCurrMusic();
            if (curMusic && curMusic != "") {
                smallGame.MusicManager.getInstace().playMusic(curMusic);
            }
            smallGame.Director.getInstance().scheduleMainLoop();
            this.netWorkRebuild();
        };
        FReconnect.prototype.initOnBackgroundAndForeground = function () {
            var _this = this;
            var win = Laya.Browser.window, hidden, visibilityChange, _undef = "undefined";
            if (typeof Laya.Browser.document.hidden !== 'undefined') {
                hidden = "hidden";
            }
            else if (typeof Laya.Browser.document.mozHidden !== 'undefined') {
                hidden = "mozHidden";
            }
            else if (typeof Laya.Browser.document.msHidden !== 'undefined') {
                hidden = "msHidden";
            }
            else if (typeof Laya.Browser.document.webkitHidden !== 'undefined') {
                hidden = "webkitHidden";
            }
            var self = this;
            if (hidden) {
                for (var i = 0; i < changeList.length; i++) {
                    document.addEventListener(changeList[i], function (event) {
                        var visible = document[hidden];
                        // QQ App
                        visible = visible || event["hidden"];
                        if (visible) {
                            _this.applicationDidEnterBackground();
                        }
                        else {
                            _this.applicationWillEnterForeground();
                        }
                    }, false);
                }
            }
            else {
                win.addEventListener("blur", this.applicationDidEnterBackground, false);
                win.addEventListener("focus", this.applicationWillEnterForeground, false);
            }
            if (navigator.userAgent.indexOf("MicroMessenger") > -1) {
                win.onfocus = function () { _this.applicationWillEnterForeground(); };
            }
            if ("onpageshow" in win && "onpagehide" in win) {
                win.addEventListener("pagehide", this.applicationDidEnterBackground, false);
                win.addEventListener("pageshow", this.applicationWillEnterForeground, false);
            }
        };
        return FReconnect;
    }(smallGame.BaseView));
    smallGame.FReconnect = FReconnect;
})(smallGame || (smallGame = {}));
//# sourceMappingURL=FReconnect.js.map