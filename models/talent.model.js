const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Talent = sequelize.define('Talent', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    Firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Gender: {
      type: DataTypes.ENUM('Male', 'Female'),
      allowNull: false,
    },

    Birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    Location: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\+998\d{9}$/, // +998 dan keyin 9 raqam
      },
      defaultValue: '+998',
    },

    Occupation: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Specialty: {
      type: DataTypes.ENUM('Specialist', 'Generalist'),
      allowNull: false,
    },

    Skills: {
      type: DataTypes.ARRAY(
        DataTypes.ENUM(
          'Python',
          'React',
          'Vue',
          'Node.js',
          'CSS',
          'HTML',
          'C++',
          'Bootstrap',
          'Express',
          'PostgreSQL',
          'MongoDB',
          'MySQL',
          'Sequelize'
        )
      ),
      allowNull: false,
    },

    Experience: {
      type: DataTypes.ENUM(
        'under 1 year',
        '1 year',
        '2 years',
        '3 years',
        '4 years',
        '5 years',
        '+5 years'
      ),
      allowNull: false,
    },

    Language: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      // Osiyodagi tillarni frontda ro'yxatdan tanlash uchun qilish mumkin.
    },

    Level: {
      type: DataTypes.ENUM(
        'Beginner',
        'Intermediate',
        'Advanced',
        'Expert',
        'Master'
      ),
      allowNull: false,
    },

    EmploymentType: {
      type: DataTypes.ENUM('Full time', 'Part time', 'Contract', 'Freelance'),
      allowNull: false,
    },

    WorkplaceType: {
      type: DataTypes.ENUM('Onsite', 'Remote', 'Hybrid'),
      allowNull: false,
    },

    MinimumSalary: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
      },
    },

    City: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Talent.beforeSave(async (talent, options) => {
    if (talent.changed('Password')) {
      talent.Password = await bcrypt.hash(talent.Password, 10);
    }
  });

  // Talent.associate = (models) => {
  // Talent.belongsTo(models.Customer, {
  //   foreignKey: 'customer_id',
  //   as: 'customer',
  // });
  // Talent.belongsTo(models.Car, {
  //   foreignKey: 'car_id',
  //   as: 'car',
  // });
  // };

  return Talent;
};
