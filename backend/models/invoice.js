module.exports = (sequelize, Sequelize) => {

    const Invoice = sequelize.define("invoice", {
        
        invoice_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        
        amount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        
        due_date: {
            type: Sequelize.DATEONLY
        },

        upload_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },

        selling_price: {
            type: Sequelize.VIRTUAL,
            get (){
                let diff = Math.abs( new Date(this.getDataValue('due_date')) - new Date( this.getDataValue('upload_date')));
                let coefficient = diff <= 30 ? 0.3 : 0.5;
                let amount = this.getDataValue('amount');
                return amount * coefficient; 
            }

        }
    });

    return Invoice;
};
    