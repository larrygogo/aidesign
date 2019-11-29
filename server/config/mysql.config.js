export default {
    database: 'aidesign',
    username: 'root',
    password: 'lahuier.1995',
    config: {
        createdAt: 'create_time',
        updatedAt: 'update_time',
        deletedAt: 'delete_time',
        timezone: '+08:00',
        dialect: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        logging: console.log,
        omitNull: true, // 是否将undefined转化为NULL
        timestamps: true,
        // 字段以下划线（_）来分割（默认是驼峰命名风格）
        // underscored: true,
        // 是否同步
        sync: {force: true},
        // 连接池配置
        pool: {
            max: 5,
            idle: 30000,
            acquire: 60000,
        },
        // isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ
    }
}