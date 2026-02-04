const express = require('express');
const router = express.Router();
const talentController = require('../controllers/talent.controller');

/**
 * @swagger
 * tags:
 *   name: Talent
 *   description: Talentlarni boshqarish API'lari
 */

/**
 * @swagger
 * /api/talent/register:
 *   post:
 *     summary: Yangi talentni ro‘yxatdan o‘tkazish
 *     tags: [Talent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Firstname
 *               - Lastname
 *               - Email
 *               - Password
 *               - Gender
 *               - Birthday
 *               - Location
 *               - Phone
 *               - Occupation
 *               - Specialty
 *               - Skills
 *               - Experience
 *               - Level
 *               - EmploymentType
 *               - WorkplaceType
 *               - City
 *             properties:
 *               Firstname:
 *                 type: string
 *                 example: Muhammadqodir
 *               Lastname:
 *                 type: string
 *                 example: Kadirov
 *               Email:
 *                 type: string
 *                 example: test@example.com
 *               Password:
 *                 type: string
 *                 example: 123456
 *               Gender:
 *                 type: string
 *                 enum: [Male, Female]
 *                 example: Male
 *               Birthday:
 *                 type: string
 *                 format: date
 *                 example: 2010-01-21
 *               Location:
 *                 type: string
 *                 example: Namangan
 *               Phone:
 *                 type: string
 *                 example: +998901234567
 *               Occupation:
 *                 type: string
 *                 example: Frontend Developer
 *               Specialty:
 *                 type: string
 *                 enum: [Specialist, Generalist]
 *                 example: Specialist
 *               Skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [Python, React, Vue, Node.js, CSS, HTML, C++, Bootstrap, Express, PostgreSQL, MongoDB, MySQL, Sequelize]
 *                 example: ["React", "Node.js", "CSS"]
 *               Experience:
 *                 type: string
 *                 enum: ["under 1 year", "1 year", "2 years", "3 years", "4 years", "5 years", "+5 years"]
 *                 example: 2 years
 *               Language:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Uzbek", "English"]
 *               Level:
 *                 type: string
 *                 enum: [Beginner, Intermediate, Advanced, Expert, Master]
 *                 example: Intermediate
 *               EmploymentType:
 *                 type: string
 *                 enum: [Full time, Part time, Contract, Freelance]
 *                 example: Full time
 *               WorkplaceType:
 *                 type: string
 *                 enum: [Onsite, Remote, Hybrid]
 *                 example: Remote
 *               MinimumSalary:
 *                 type: number
 *                 example: 500
 *               City:
 *                 type: string
 *                 example: Namangan
 *     responses:
 *       201:
 *         description: Talent muvaffaqiyatli ro‘yxatdan o‘tkazildi
 *       400:
 *         description: Noto‘g‘ri ma’lumot yuborilgan yoki foydalanuvchi mavjud
 *       500:
 *         description: Server xatosi
 */

router.post('/talent/register', talentController.createTalent);

module.exports = router;
