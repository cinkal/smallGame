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
    var SeverDispatcher = /** @class */ (function (_super) {
        __extends(SeverDispatcher, _super);
        function SeverDispatcher() {
            var _this = _super.call(this) || this;
            _this._PIhandlers = [];
            _this._POhandlers = [];
            _this._protoRoots = [];
            return _this;
            //  this._ip = "192.168.50.15"; //预发布服务
            //this._ip = "domino.mozat.me";//正式服
            // this._ip = "120.50.46.121"; //正式服
            // this._port = 8101;
        }
        SeverDispatcher.create = function () {
            var ret = new SeverDispatcher();
            if (ret && ret.init()) {
                return ret;
            }
            ret = null;
            return null;
        };
        SeverDispatcher.prototype.destory = function () {
        };
        SeverDispatcher.prototype.connectServer = function (ip, port) {
            this._ip = ip;
            this._port = port;
            this.powerOn(this._ip, this._port);
        };
        SeverDispatcher.prototype.init = function () {
            _super.prototype.init.call(this);
            Laya.Browser.window.protobuf.load("proto/c2s_player.proto", this.onProtoBufferComplete.bind(this));
            // Laya.Browser.window.protobuf.load("proto/c2g_game.proto", this.onProtoBufferComplete.bind(this));
            // Laya.Browser.window.protobuf.load("proto/c2s_arena.proto", this.onProtoBufferComplete.bind(this));
            // Laya.Browser.window.protobuf.load("proto/g2c_game.proto", this.onProtoBufferComplete.bind(this));
            // Laya.Browser.window.protobuf.load("proto/s2c_arena.proto", this.onProtoBufferComplete.bind(this));
            // Laya.Browser.window.protobuf.load("proto/s2c_player.proto", this.onProtoBufferComplete.bind(this));
            // this._cmdMap[C2S_PROTOCOL.c2s_heartbeat] = S2C_PROTOCOL.s2c_heartbeat;
            this._cmdMap[C2S_PROTOCOL.c2s_login] = S2C_PROTOCOL.s2c_login;
            this._cmdBasePI = S2C_PROTOCOL_MAX;
            this._cmdBasePO = C2S_PROTOCOL_MAX;
            // //todo: 插入cmd定义 
            // // 必须定义
            this.registerSeverMsg(S2C_PROTOCOL.s2c_login, C2S_PROTOCOL.c2s_login, this.handleLogin, false);
            return this.powerOn(this._ip, this._port);
            // return true;
        };
        /**
        * 消息注册
        * @param S2Cmsg 客户端接收的协议
        * @param C2Smsg 发给服务端的协议
        * @param hander 分发处理函数
        * @param isAsync 是否是异步消�
        */
        SeverDispatcher.prototype.registerSeverMsg = function (S2Cmsg, C2Smsg, hander, isAsync) {
            if (isAsync === void 0) { isAsync = false; }
            if (C2Smsg) {
                this._cmdMap[C2Smsg] = S2Cmsg;
            }
            if (isAsync)
                this._asyncCmdMap[S2Cmsg] = S2Cmsg;
            if (hander)
                this._PIhandlers[S2Cmsg] = new Laya.Handler(this, hander);
        };
        /**
        * 发送数�
        * 新的数据收发只需使用这个sendPack并且registerServerMsg即可
        * @param C2Smsg toc
        * @param tosData 对应的tos
        * @param traceEnable 是否追踪这条协议,同时发多条的时候可以设置不追踪也可以设置分发的时候为不过�
        */
        SeverDispatcher.prototype.sendPack = function (C2Smsg, tosData, traceEnable) {
            if (traceEnable === void 0) { traceEnable = true; }
            tosData = tosData || {};
            var pack = this.getSendPack(C2Smsg, tosData);
            if (pack) {
                if (traceEnable)
                    this._state.traceEnable(C2Smsg);
                this.sendMsg(pack);
            }
            return 0;
        };
        SeverDispatcher.prototype.onProtoBufferComplete = function (err, root) {
            if (err)
                throw err;
            this._protoRoots.push(root);
            this.setLoadMessage(true);
        };
        SeverDispatcher.prototype.getIp = function () {
            return this._ip;
        };
        SeverDispatcher.prototype.onDispatch = function (errorCode, cmd, data, len) {
            if (errorCode != 0) {
                smallGame.Director.getInstance().getEventDispatcher().event(EVENT_NET, smallGame.NetEventCapturor.create(EVENT_NET, EVENT_NET_ERROR_CODE, { cmd: cmd, errorCode: errorCode }));
                return PktState.PKT_DROP;
            }
            if (cmd > this._cmdBasePI) {
                CONSOLE_LOG("[Server Dispatcher]Invalid server response command:%d. \n Should be: %d - %d", cmd, S2C_PROTOCOL_MAX, S2C_PROTOCOL_MAX);
                return PktState.PKT_EXCEPTION;
            }
            this.unmarkCmdPI(cmd);
            if (cmd < S2C_PROTOCOL.s2c_login || cmd > s2c_protocol_max) {
                return PktState.PKT_CONTIUNE;
            }
            // if (this._state._isTracingEnable && cmd != this.getResCmd(this._state._tracingCmd)) {
            //     CONSOLE_LOG("[Server Dispatcher]Response cmd[%d] mismatch: %d", cmd, this.getResCmd(this._state._tracingCmd));
            //     return PktState.PKT_DROP;
            // }
            smallGame.Director.getInstance().getEventDispatcher().event(EVENT_NET, smallGame.NetEventCapturor.create(EVENT_NET, EVENT_NET_UI_HIDE_CONNECT_MSG));
            this.resetTimeTicking();
            this._state._isTracingEnable = false;
            if (!this._PIhandlers[cmd]) {
                CONSOLE_LOG("[Server Dispatcher]Packet handler undefined of command: %d", cmd);
                return PktState.PKT_EXCEPTION;
            }
            var message = this.getMessageData(cmd, data);
            if (message) {
                console.log('======get 6666=========## cmd(' + this.getMessageName(cmd, false) + '|' + cmd + ')=' + JSON.stringify(message));
                var func = this._PIhandlers[cmd];
                if (func)
                    func.runWith(message);
                this.event(cmd.toString(), message);
            }
            return PktState.PKT_DIGESTED;
        };
        SeverDispatcher.prototype.keepAlive = function (delta) {
            this._state._heartbeatTimer += delta;
            if (this._state._heartbeatTimer > this._heartbeatInterval) {
                this._state._heartbeatTimer = 0;
                //todo: 发送心跳包
                this.doPingSignalReq(0);
            }
        };
        SeverDispatcher.prototype.unmarkCmdPI = function (cmd) {
            this._state._isTracingEnable = (cmd in this._asyncCmdMap) ? false : true;
            return cmd;
        };
        SeverDispatcher.prototype.getResCmd = function (reqCmd) {
            var has = reqCmd in this._cmdMap;
            if (has) {
                return this._cmdMap[reqCmd];
            }
            return 0xFFF;
        };
        SeverDispatcher.prototype.getMessageName = function (cmd, isSend) {
            if (!this.getLoadMessage() || this._protoRoots.length == 0)
                return "";
            return PROTOCOL_CMD2NAME[cmd];
        };
        SeverDispatcher.prototype.getSendPack = function (cmd, data) {
            console.log('=====send 6666=========##  cmd(' + this.getMessageName(cmd, false) + '|' + cmd + ')=' + JSON.stringify(data));
            if (this._protoRoots.length == 0)
                return null;
            var login = null;
            for (var _i = 0, _a = this._protoRoots; _i < _a.length; _i++) {
                var proto = _a[_i];
                login = proto.lookup(this.getMessageName(cmd, true));
                if (login)
                    break;
            }
            if (!login)
                return null;
            var loginMsg = login.create(data);
            var errmsg = login.verify(loginMsg);
            if (errmsg)
                throw Error(errmsg);
            var buffer = login.encode(loginMsg).finish();
            return smallGame.NetHelper.SVR_SET_CMD(cmd, buffer);
        };
        SeverDispatcher.prototype.getMessageData = function (cmd, buff) {
            if (this._protoRoots.length == 0) {
                return null;
            }
            var login = null;
            for (var _i = 0, _a = this._protoRoots; _i < _a.length; _i++) {
                var proto = _a[_i];
                login = proto.lookup(this.getMessageName(cmd, false));
                if (login)
                    break;
            }
            if (!login) {
                return null;
            }
            return login.decode(buff);
        };
        //发送心跳包
        SeverDispatcher.prototype.doPingSignalReq = function (time) {
            var packet = smallGame.NetHelper.SVR_SET_CMD(C2S_PROTOCOL.c2s_heartbeat, null);
            if (packet) {
                this.sendMsg(packet);
            }
            return 0;
        };
        SeverDispatcher.prototype.onPingSignalRes = function () {
            CONSOLE_LOG("onPingSignalRes \n");
        };
        SeverDispatcher.prototype.doLoginReq = function (userId) {
            var data = { userId: userId };
            var pack = this.getSendPack(C2S_PROTOCOL.c2s_login, data);
            if (pack) {
                this._state.traceEnable(C2S_PROTOCOL.c2s_login);
                this.sendMsg(pack);
                return 0;
            }
            return -1;
        };
        SeverDispatcher.prototype.handleLogin = function (data) {
        };
        SeverDispatcher.prototype.onKickHandler = function (data) {
        };
        return SeverDispatcher;
    }(smallGame.NetDispatcher));
    smallGame.SeverDispatcher = SeverDispatcher;
})(smallGame || (smallGame = {}));
//# sourceMappingURL=SeverDispatcher.js.map