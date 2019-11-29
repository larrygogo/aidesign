import {
    controller,
    get,
    post,
    required
} from "../lib/Core";
import {
    Parse,
    Render
} from 'aids-core'
import path from 'path'
import ServerException from '../exception/ServerException'
import TemplateService from "../service/template";
import {
    fontConfig
} from '../config'

@controller('/api')
export class Template {


    @post('/image/upload')
    async uploadImage(ctx, next) {
        try {
            let file = ctx.request.files.file;
            let path = file.path.split('upload_')[1]
            ctx.body = {
                success: true,
                msg: 'ok',
                data: `upload_${path}`
            }
        } catch (e) {
            console.error(e)
            throw new ServerException({
                status: e.status,
                msg: e.message
            })
        }
    }


    @post('/template/upload')
    async uploadPsd(ctx, next) {

        try {
            let file = ctx.request.files.file;
            let parse = new Parse(file.path)
            let cover = await parse.getBase64()
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

    @get('/template/all')
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

    @post('/template/render')
    @required({body: ['image', 'main_text', 'sub_text', 'desc_text']})
    async Render(ctx, next) {
        try {
            let {image, main_text: mainText, sub_text: subText, desc_text: descText} = ctx.request.body
            let data = await TemplateService.getTemplateRand()
            // console.log(data)
            const render = new Render(data[0].json, {
                bodyImage: path.join(process.cwd(), `/client/static/uploads/runtime/${image}`),
                mainText: mainText,
                subText: subText,
                actionText: descText,
                font: fontConfig
            })
            let res = await render.run()
            ctx.body = {
                success: true,
                msg: 'ok',
                data: `data:image/png;base64,` + Buffer.from(res).toString('base64')
            }
        } catch (e) {
            console.error(e)
            throw new ServerException({
                status: e.status,
                msg: e.message
            })
        }
    }

    @get('/template/rand')
    async getTemplateRandom(ctx, next) {
        try {
            let {
                limit
            } = ctx.query
            let data = await TemplateService.getTemplateRand(limit)
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
}