/*
* name;
*/
class BattleBgView extends Laya.View{
    constructor(){
        super();
    }

    public static create() : BattleBgView {
        let view = new BattleBgView();
        if (view && view.init())
            return view;
        view = null;
        return view;
    }

    private init() : boolean {
        let ret = false;
        do {
            
            this.initView();

            ret = true;
        } while (!ret);
        return ret;
    }

    private initView() : void {
        
    }

}