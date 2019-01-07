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
var smallGame;
(function (smallGame) {
    var BaseView = /** @class */ (function (_super) {
        __extends(BaseView, _super);
        function BaseView() {
            var _this = _super.call(this) || this;
            _this._viewType = VIEWID.VIEWID_NORMAL;
            _this._isRunning = false;
            _this._eventDispatcher = smallGame.Director.getInstance().getEventDispatcher();
            return _this;
        }
        BaseView.prototype.getEventDispatcher = function () {
            return this._eventDispatcher;
        };
        BaseView.prototype.setEventDispatcher = function (dispatcher) {
            this._eventDispatcher = dispatcher;
        };
        BaseView.prototype.setType = function (type) {
            this._viewType = type;
        };
        BaseView.prototype.getType = function () {
            return this._viewType;
        };
        BaseView.prototype.update = function (delta) {
        };
        BaseView.prototype.isRunning = function () {
            return this._isRunning;
        };
        BaseView.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        BaseView.prototype.onEnter = function () { };
        BaseView.prototype.onExit = function () { };
        BaseView.prototype.onEnterTransitionDidFinish = function () {
        };
        BaseView.prototype.onExitTransitionDidStart = function () {
        };
        return BaseView;
    }(Laya.View));
    smallGame.BaseView = BaseView;
})(smallGame || (smallGame = {}));
//# sourceMappingURL=BaseView.js.map