var smallGame;
(function (smallGame) {
    var GameManager = /** @class */ (function () {
        function GameManager() {
            this._serverDispatcher = null;
            this._serverTime = 0;
        }
        GameManager.getInstace = function () {
            if (!this._shareGameManager) {
                this._shareGameManager = new GameManager();
                if (this._shareGameManager.init()) {
                    if (!this._shareGameManager) {
                        delete this._shareGameManager;
                        this._shareGameManager = null;
                    }
                }
            }
            return this._shareGameManager;
        };
        GameManager.destoryInstance = function () {
            if (this._shareGameManager) {
                delete this._shareGameManager;
                this._shareGameManager = null;
            }
        };
        GameManager.prototype.init = function () {
            this._serverDispatcher = smallGame.SeverDispatcher.create();
            if (!this._serverDispatcher)
                return false;
            this._serverTime = this._lastTime = new Date().getTime();
            return true;
        };
        GameManager.prototype.netDequeue = function (deltaTime) {
            if (this._serverDispatcher) {
                this._serverDispatcher.dequeue(deltaTime);
            }
        };
        GameManager.prototype.getServerDispatcher = function () {
            return this._serverDispatcher;
        };
        // 设置服务器时间，以秒为单位
        GameManager.prototype.setServerTime = function (t) {
            this._serverTime = t;
            this._lastTime = new Date().getTime();
        };
        // 返回以秒为单位的服务器时间
        GameManager.prototype.getServerTime = function () {
            var t = new Date().getTime();
            if (t > this._lastTime) {
                this._serverTime += (t - this._lastTime) / 1000;
                this._lastTime = t;
            }
            return this._serverTime;
        };
        GameManager._shareGameManager = null;
        return GameManager;
    }());
    smallGame.GameManager = GameManager;
})(smallGame || (smallGame = {}));
//# sourceMappingURL=GameManager.js.map