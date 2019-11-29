import {
    Template,
    sequelize
} from '../model'
import ServerException from '../exception/ServerException'
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
                attributes: {
                    exclude: ['json']
                }
            })
        } catch (e) {
            console.error(e.message)
            throw new ServerException({
                msg: '数据库查询失败'
            })
        }
    }

    static async getTemplateRand(limit = 1) {
        try {
            let res = await Template.findAll({
                attributes: {
                    exclude: ['cover']
                },
                limit: limit == null ? 1 : Number(limit),
                order: sequelize.random()
            })
            return res
        } catch (e) {
            console.error(e.message)
            throw new ServerException({
                msg: '数据库存储失败'
            })
        }
    }
}