import Exception from '../lib/Exception'

export default class ServerException extends Exception{
    constructor({status = 500, msg = '服务器内部错误'}) {
        super()
        this.status = status
        this.message = msg
    }
}