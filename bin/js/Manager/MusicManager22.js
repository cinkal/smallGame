var smallGame;
(function (smallGame) {
    var MusicManager22 = /** @class */ (function () {
        function MusicManager22() {
            // this._musicMap = new smallGame.Map<Laya.SoundChannel>();
            this._soundVolume = 0;
            this._musicVolue = 0;
            this._currMusic = "";
            this._currSound = "";
        }
        MusicManager22.getInstace = function () {
            if (!this._shareMusicManager) {
                this._shareMusicManager = new MusicManager22();
                if (this._shareMusicManager.init()) {
                    if (!this._shareMusicManager) {
                        delete this._shareMusicManager;
                        this._shareMusicManager = null;
                    }
                }
            }
            return this._shareMusicManager;
        };
        // public static destoryInstance() : void {
        //     if(this._shareMusicManager) {
        //         delete this._shareMusicManager;
        //         this._shareMusicManager = null;
        //     }
        // }
        MusicManager22.prototype.init = function () {
            // Laya.SoundManager.autoStopMusic = false;
            return true;
        };
        MusicManager22.prototype.playMusic = function (file, isLoop, callback) {
            if (isLoop === void 0) { isLoop = true; }
            if (BANMUSIC)
                return;
            var isFound = this._musicMap.has(file);
            if (isFound) {
                var preChannel = this._musicMap.get(file);
                Laya.SoundManager.removeChannel(preChannel);
                this._musicMap.remove(file);
            }
            var loop = isLoop ? 0 : 1;
            var channel = this._musicMap.at(file);
            if (!channel) {
                channel = Laya.SoundManager.playMusic(file, loop, callback);
                this._musicMap.add(file, channel);
            }
            else {
                Laya.SoundManager.addChannel(channel);
            }
            this._currMusic = file;
        };
        MusicManager22.prototype.play = function (file, isLoop, callback) {
            if (isLoop === void 0) { isLoop = false; }
            if (BANMUSIC)
                return;
            var isFound = this._musicMap.has(file);
            if (isFound) {
                var preChannel = this._musicMap.get(file);
                Laya.SoundManager.removeChannel(preChannel);
                this._musicMap.remove(file);
            }
            var loop = isLoop ? 0 : 1;
            var channel = Laya.SoundManager.playSound(file, loop, callback);
            this._musicMap.add(file, channel);
            this._currSound = file;
        };
        MusicManager22.prototype.stopAll = function () {
            Laya.SoundManager.stopAll();
        };
        MusicManager22.prototype.stopMusic = function () {
            Laya.SoundManager.stopMusic();
        };
        MusicManager22.prototype.stopSound = function (file) {
            var channel = this._musicMap.at(file);
            if (channel) {
                this._musicMap.remove(file);
            }
            Laya.SoundManager.stopSound(file);
        };
        MusicManager22.prototype.getCurrSound = function () {
            return this._currSound;
        };
        MusicManager22.prototype.getCurrMusic = function () {
            return this._currMusic;
        };
        MusicManager22.prototype.setSoundVolume = function (volume) {
            this._soundVolume = volume;
            Laya.SoundManager.setSoundVolume(volume);
        };
        MusicManager22.prototype.getSoundVolume = function () {
            return this._soundVolume;
        };
        MusicManager22.prototype.setMusicVolume = function (volume) {
            this._musicVolue = volume;
            Laya.SoundManager.setMusicVolume(volume);
        };
        MusicManager22.prototype.isAutoStopMusic = function () {
            return Laya.SoundManager.autoStopMusic;
        };
        MusicManager22.prototype.isMuted = function () {
            return Laya.SoundManager.muted;
        };
        MusicManager22.prototype.getChannelByPath = function (file) {
            var channel = this._musicMap[file];
            if (channel)
                return channel;
            else
                return null;
        };
        MusicManager22.prototype.stopSoundChannel = function (sound) {
            if (!sound)
                return;
            for (var key in this._musicMap) {
                var channel = this._musicMap[key];
                if (channel && channel == sound) {
                    Laya.SoundManager.removeChannel(sound);
                }
            }
        };
        MusicManager22._shareMusicManager = null;
        return MusicManager22;
    }());
})(smallGame || (smallGame = {}));
//# sourceMappingURL=MusicManager22.js.map