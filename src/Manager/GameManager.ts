module smallGame {
    export class GameManager implements InterfaceGameMgr {
        private static _shareGameManager:GameManager = null;
        private _serverDispatcher:SeverDispatcher;
        private _serverTime:number;     // 服务器发过来的时间戳，毫秒为单位
        private _lastTime:number;       // 上次确定服务器时间时的本地时间，毫秒为单位

        constructor() {
            this._serverDispatcher = null;
            this._serverTime = 0;
        }

        public static getInstace() : GameManager {
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
        }

        public static destoryInstance() : void  {
            if (this._shareGameManager) {
                delete this._shareGameManager;
                this._shareGameManager = null;
            }
        }

        private init() : boolean {
            this._serverDispatcher = SeverDispatcher.create();
            if(!this._serverDispatcher) return false;

            this._serverTime = this._lastTime = new Date().getTime();
            
            return true;
        }


        public netDequeue(deltaTime:number) : void {
            if (this._serverDispatcher) {
                this._serverDispatcher.dequeue(deltaTime);
            }
        }

        public getServerDispatcher() : SeverDispatcher {
            return this._serverDispatcher;
        }

        // 设置服务器时间，以秒为单位
        public setServerTime(t:number) :void {
            this._serverTime = t;
            this._lastTime = new Date().getTime();
        }

        // 返回以秒为单位的服务器时间
        public getServerTime() :number {
            let t = new Date().getTime();
            if (t > this._lastTime) {
                this._serverTime += (t - this._lastTime)/1000;
                this._lastTime = t;
            }
            return this._serverTime;
        }
    }
}