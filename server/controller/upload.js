import {
    controller,
    get
} from "../lib/Core";
import ServerException from '../exception/ServerException'

@controller('/api')
export class Test {

    @get('/psd/upload')
    async uploadPsd(ctx, next) {
        try {
            let file = ctx.request.files.file;
            console.log(file)
            // fs.moveSync(file.path, psdFilePath);
            // let data = await exportTempPNG(tno);
            // data.psdFilePath = '/uploads/psd/' + tno + '.psd';
            ctx.body = {
                success: true,
                msg: 'ok',
                data
            }
        } catch (e) {
            console.error(e)
            throw new ServerException({
                status: 403,
                msg: '拒绝访问'
            })
        }
    }

    @get('/image/upload')
    async uploadImage(ctx, next) {
        // throw new ServerException({status: 403, msg: '拒绝访问'})
        ctx.body = 'hello world'
    }
}

function generantTempNo() {
    let date = new Date();
    let filename = date.getFullYear().toString(16).toUpperCase() +
        date.getMonth().toString(16).toUpperCase() +
        date.getDay() +
        date.getTime().toString().substr(-5) +
        (date.getMilliseconds() * 100).toString().substr(3) +
        (Math.floor(Math.random() * (99 - 10)) + 10);
    return filename;
}