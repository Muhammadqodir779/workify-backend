const Joi = require('joi');

const validateTalent = Joi.object({
  Firstname: Joi.string().min(2).max(50).required(),
  Lastname: Joi.string().min(2).max(50).required(),
  Email: Joi.string().email().required(),
  Password: Joi.string().min(6).max(50).required(),
  Gender: Joi.string().valid('Male', 'Female').required(),
  Birthday: Joi.date().iso().required(),
  Location: Joi.string().required(),
  Phone: Joi.string()
    .pattern(/^\+998\d{9}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Telefon raqam +998 bilan boshlanishi va 9 ta raqam bo‘lishi kerak.',
    }),
  Occupation: Joi.string().required(),
  Specialty: Joi.string().valid('Specialist', 'Generalist').required(),
  Skills: Joi.array()
    .items(
      Joi.string().valid(
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
    )
    .min(1)
    .required(),
  Experience: Joi.string()
    .valid(
      'under 1 year',
      '1 year',
      '2 years',
      '3 years',
      '4 years',
      '5 years',
      '+5 years'
    )
    .required(),
  Language: Joi.array().items(Joi.string()).optional(),
  Level: Joi.string()
    .valid('Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master')
    .required(),
  EmploymentType: Joi.string()
    .valid('Full time', 'Part time', 'Contract', 'Freelance')
    .required(),
  WorkplaceType: Joi.string().valid('Onsite', 'Remote', 'Hybrid').required(),
  MinimumSalary: Joi.number().min(0).optional(),
  City: Joi.string().required(),
});

module.exports = validateTalent;
