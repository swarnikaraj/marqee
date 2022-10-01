

  module.exports = (sequelize, Sequelize) => {
    const Company= sequelize.define("company", {
        id:{
          
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },
        name: {
          
            type: Sequelize.STRING,
        },
        cin:{ type:Sequelize.STRING}
       
      });
  
    return Company;
  };
 