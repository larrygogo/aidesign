import {
    controller,
    get,
    post
} from "../lib/Core";
import {
    Parse
} from 'aids-core'
import ServerException from '../exception/ServerException'
import TemplateService from "../service/template";

@controller('/api')
export class Template {

    @post('/template/upload')
    async uploadPsd(ctx, next) {

        try {
            let file = ctx.request.files.file;
            let parse = new Parse(file.path)
            let base64 = await parse.getBase64()
            let cover = base64.split(',')[1]
            console.log(base64)
            let name = generantTempNo()
            let template = await parse.getTemplate()
            await TemplateService.saveTemplate(name, cover, template)
            ctx.body = {
                success: true,
                msg: 'ok',
            }
        } catch (e) {
            console.error(e)
            throw new ServerException({
                status: e.status,
                msg: e.message
            })
        }
    }

    @get('/template')
    async getAllTemplate(ctx, next) {
        try {

            let data = await TemplateService.getTemplate()
            ctx.body = {
                success: true,
                msg: 'ok',
                data
            }
        } catch (e) {
            console.error(e)
            throw new ServerException({
                status: e.status,
                msg: e.message
            })
        }
    }
}

function generantTempNo() {
    return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
    // let date = new Date();
    // let filename = date.getFullYear().toString(16).toUpperCase() +
    //     date.getMonth().toString(16).toUpperCase() +
    //     date.getDay() +
    //     date.getTime().toString().substr(-5) +
    //     (date.getMilliseconds() * 100).toString().substr(3) +
    //     (Math.floor(Math.random() * (99 - 10)) + 10);
    // return filename;
}