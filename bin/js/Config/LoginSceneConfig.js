var smallGame;
(function (smallGame) {
    var LoginSceneConfig = /** @class */ (function () {
        function LoginSceneConfig() {
        }
        LoginSceneConfig.configCache = [
            {
                id: 1,
                url: "res/CreateGameScence/CreateRoomView/CreateRoomView.atlas",
                type: Laya.Loader.ATLAS,
            },
            {
                id: 2,
                url: "res/CreateGameScence/spine/five-fold.sk",
                type: Laya.Loader.SK,
            },
        ];
        return LoginSceneConfig;
    }());
    smallGame.LoginSceneConfig = LoginSceneConfig;
})(smallGame || (smallGame = {}));
//# sourceMappingURL=LoginSceneConfig.js.map