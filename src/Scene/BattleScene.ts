
module smallGame {
    export class BattleScene extends Scene {
        private _playerView:BattlePlayer;

        constructor() {
            super();
            this._sceneType = ScenesType.BattleScene;
            this._playerView = null;
        }

        public static create(): BattleScene {
            let retScene = new BattleScene();
            if (retScene && retScene.init()) {
                return retScene;
            }

            retScene = null;
            return retScene;
        }

        public destroy(): void {
            // if (this._LoginView) {
            //     this._LoginView.unRegsiterEvent();
            //     this._LoginView.removeSelf();
            //     this._LoginView.destroy();
            //     this._LoginView = null;
            // }
        }

        // public getLoginViewUI(): BattleSceneView{
        //     return this._LoginView;
        // }

        public update(delta: number): void {
            super.update(delta);
        }

        public init(): boolean {
            return true;
        }

        public registerEvent() : void {
            this.getEventDispatcher().on(EVENT_RESOURCE_PROGRESS_LOAD_END, this, this.initViews);
        }

        public unRegisterEvent() : void {
            this.getEventDispatcher().off(EVENT_RESOURCE_PROGRESS_LOAD_END, this, this.initViews);
        }

        public initViews(data:any): boolean {
            if(data.sceneType != this._sceneType) return false;

            let bgView = BattleBgView.create();
            this.addChild(bgView);

            return true;
        }

        public onEnter() : void {
            super.onEnter();
            //todo:  初始化各种管理器
            this.registerEvent();
            ResourceManager.getInstance().loadSceneRes(this._sceneType);
        }

        public onExit() : void {
            // this.destory();
        }

        public setPlayer(model:PlayerModel) : void {
            if (!this._playerView) {
                this._playerView = BattlePlayer.create(model);
                this.addChild(this._playerView);
            }else {
                this._playerView.resetView(model);
            }
        }

    }
}



