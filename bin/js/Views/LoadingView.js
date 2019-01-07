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
var Dominoes;
(function (Dominoes) {
    var LoadingView = /** @class */ (function (_super) {
        __extends(LoadingView, _super);
        function LoadingView() {
            return _super.call(this) || this;
        }
        LoadingView.create = function () {
            var ret = new LoadingView();
            if (ret && ret.init()) {
                return ret;
            }
            ret = null;
            return ret;
        };
        LoadingView.prototype.init = function () {
            this._versionLabel.text = CLIENTVERSION;
            return true;
        };
        return LoadingView;
    }(ui.LoginViewUI));
    Dominoes.LoadingView = LoadingView;
})(Dominoes || (Dominoes = {}));
//# sourceMappingURL=LoadingView.js.map