import {
    Template
} from '../model'
import ServerException from '../exception/ServerException'
import psd from '../../node_modules/psd'
export default class TemplateService {
    static async saveTemplate(name, cover, json) {
        try {
            let template = Template.build({
                name,
                cover,
                json
            })
            await template.save()
        } catch (e) {
            console.error(e.message)
            throw new ServerException({
                msg: '数据库存储失败'
            })
        }
    }

    static async getTemplate() {
        try {
            return await Template.findAll({
                attributes: {exclude: ['json']}
            })
        } catch (e) {
            console.error(e.message)
            throw new ServerException({
                msg: '数据库存储失败'
            })
        }
    }
}