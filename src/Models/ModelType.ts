/*
* 用户登录信息model
*/
type UserModel = {
    userId:string,
    userName:string,
}


/**
 * 玩家操控对象model
 */
type PlayerModel = {
    userId:string,
    
}


/**
 * 游戏消息队列
 */
type GameEvent = {
    type:number,
    data:any,
}