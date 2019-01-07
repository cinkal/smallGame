/*
* name;
*/
enum PlayerStatus {
    NORMAL,
    RUN,
    JUMP,
    DEAD,
}


class BattlePlayer extends Laya.View {
    private _playerModel: PlayerModel;
    private _playerSk:Laya.Skeleton;

    constructor() {
        super();
        this._playerModel = { userId: "" };
        this._playerSk = null;
    }

    public static create(model: PlayerModel): BattlePlayer {
        let view = new BattlePlayer();
        if (view && view.init())
            return view;
        view = null;
        return view;
    }

    private init(): boolean {
        let ret = false;
        do {
            this.width = 50;
            this.height = 50;

            this.initView();

            ret = true;
        } while (!ret);
        return ret;
    }

    private initView(): void {

    }

    public setStatus(status: number, loop:boolean): void {
        if (!this._playerSk) return;
        this._playerSk.play(status, loop);

        // switch (status) {
        //     case PlayerStatus.NORMAL:
        //         {
        //             this._playerSk.play(0, false);
        //             break;
        //         }
        //     case PlayerStatus.RUN:
        //         {
        //             this._playerSk.play(1, true);
        //             break;
        //         }
        //     case PlayerStatus.JUMP:
        //         {
        //             this._playerSk.play(2, false);
        //             break;
        //         }
        //     case PlayerStatus.DEAD:
        //         {
        //             this._playerSk.play(3, false);
        //             break;
        //         }
        //     default:
        //         break;
        // }
    }

    public resetView(model:PlayerModel) : void {
        this._playerModel = model;
        if (this._playerSk) {
            this._playerSk.removeSelf();
            this._playerSk.destroy();
            this._playerSk = null;
        }
        let temp = smallGame.ResourceManager.getInstance().getBuildingsTempletMap().get("");
        if (temp) {
            this._playerSk = temp.buildArmature(0);
            this._playerSk.pos(this.width / 2, this.height / 2);
            this.addChild(this._playerSk);
        }
    }
}