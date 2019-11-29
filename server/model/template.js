export default (Sequelize, DATA) => {
    return Sequelize.define(
        'template',
        {
            id: {
                primaryKey: true,
                type: DATA.INTEGER,
                unique: true,
                autoIncrement: true
            },
            name: {
                type: DATA.STRING(30),
                allowNull: false
            },
            json: {
                type: DATA.JSON,
                allowNull: false
            },
            cover: {
                type: DATA.TEXT,
                allowNull: false
            }
        },
        {
            tableName: 'template',
            createdAt: 'create_time',
            updatedAt: 'update_time',
            deletedAt: 'delete_time'
        }
    );
}