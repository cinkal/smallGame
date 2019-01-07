var smallGame;
(function (smallGame) {
    var NetPacket = /** @class */ (function () {
        function NetPacket() {
            this._head = 255;
            this._cmd = 0;
            this._len = 0;
            this._errorCode = 0;
            this._data = new Laya.Byte();
        }
        return NetPacket;
    }());
    smallGame.NetPacket = NetPacket;
})(smallGame || (smallGame = {}));
//# sourceMappingURL=NetPacket.js.map