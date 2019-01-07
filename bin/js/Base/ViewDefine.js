var smallGame;
(function (smallGame) {
    var ViewDefine = /** @class */ (function () {
        function ViewDefine(viewId, isFade, callback) {
            this._viewId = viewId ? viewId : VIEWID.VIEWID_BASEVIEW;
            this._isFade = isFade ? isFade : false;
            this._callback = callback ? callback : null;
        }
        return ViewDefine;
    }());
    smallGame.ViewDefine = ViewDefine;
})(smallGame || (smallGame = {}));
//# sourceMappingURL=ViewDefine.js.map