module Dominoes {
    export class LoadingView extends ui.LoginViewUI {
        constructor() {
            super();
        }

        public static create() : LoadingView {
            let ret = new LoadingView();
            if(ret && ret.init()) {
                return ret;
            }

            ret = null;
            return ret;
        }

        private init() : boolean {
            this._versionLabel.text = CLIENTVERSION;

            return true;
        }
    }
}