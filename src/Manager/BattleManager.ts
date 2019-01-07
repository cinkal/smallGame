/*
* name;
*/
class BattleManager{
    private static _instance:BattleManager = null;
    private _battleScene:smallGame.BattleScene;
    private _msgQueue:Array<GameEvent>;


    constructor(){
        this._battleScene = null;
        this._msgQueue = new Array<GameEvent>();
    }


    public static getInstance() : BattleManager {
        if (!this._instance) {
            this._instance = new BattleManager();
            if (this._instance.init()) 
                return this._instance;
            delete this._instance;
            this._instance = null;
        }
        return this._instance;
    }

    private init() : boolean {
        return true;
    }


}