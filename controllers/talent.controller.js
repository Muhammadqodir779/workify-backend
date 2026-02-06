const { Op } = require('sequelize');
const { Talent } = require('../models');
const validateTalent = require('../validation/talent.validation'); // ✅ destructuring kerak emas

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Agar keyinchalik token ishlatmoqchi bo‘lsangiz
const { Talent } = require('../models');

// 🟢 LOGIN Talent
exports.loginTalent = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    // 1️⃣ Email va password kiritilganini tekshiramiz
    if (!Email || !Password) {
      return res.status(400).json({ message: 'Email va parol talab qilinadi' });
    }

    // 2️⃣ Talent mavjudligini tekshirish
    const talent = await Talent.findOne({ where: { Email } });
    if (!talent) {
      return res
        .status(404)
        .json({
          message: 'Bunday foydalanuvchi mavjud emas. Avval ro‘yxatdan o‘ting.',
        });
    }

    // 3️⃣ Parolni solishtirish
    const isMatch = await bcrypt.compare(Password, talent.Password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email yoki parol noto‘g‘ri' });
    }

    // 4️⃣ (Ixtiyoriy) Token yaratish — agar keyinchalik kerak bo‘lsa
    // const token = jwt.sign({ id: talent.id, Email: talent.Email }, 'secretkey', { expiresIn: '1d' });

    // 5️⃣ Login muvaffaqiyatli
    res.status(200).json({
      message: 'Kirish muvaffaqiyatli bajarildi ✅',
      // token, // keyinchalik JWT ishlatsangiz qo‘shasiz
      talent: {
        id: talent.id,
        Firstname: talent.Firstname,
        Lastname: talent.Lastname,
        Email: talent.Email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 CREATE Talent
exports.createTalent = async (req, res) => {
  const { error } = validateTalent.validate(req.body); // ✅ to‘g‘ri chaqiruv
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const talent = await Talent.create(req.body);
    res.status(201).json({
      message: 'Talent created successfully',
      talent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 GET all Talents
exports.getTalents = async (req, res) => {
  try {
    const talents = await Talent.findAll();
    res.status(200).json({ talents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 GET Talent by ID
exports.getTalentById = async (req, res) => {
  try {
    const talent = await Talent.findByPk(req.params.id);
    if (!talent) return res.status(404).json({ message: 'Talent not found' });

    res.status(200).json(talent.toJSON()); // ✅ talent.toJSON()
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 UPDATE Talent
exports.updateTalent = async (req, res) => {
  const { error } = validateTalent.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const talent = await Talent.findByPk(req.params.id);
    if (!talent) return res.status(404).json({ message: 'Talent not found' });

    await talent.update(req.body);
    res.status(200).json({
      message: 'Talent updated successfully',
      talent,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 DELETE Talent
exports.deleteTalent = async (req, res) => {
  try {
    const talent = await Talent.findByPk(req.params.id);
    if (!talent) return res.status(404).json({ message: 'Talent not found' });

    const talentData = talent.toJSON(); // ✅ to‘g‘ri nom

    await talent.destroy();
    res.status(200).json({
      message: 'Talent deleted successfully',
      deleted: talentData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.searchUser = async (req, res) => {
//   try {
//     console.log('Query received:', req.query.query);

//     const { query } = req.query;
//     if (!query) {
//       return res.status(400).json({ message: 'Search query is required' });
//     }

//     const users = await User.findAll({
//       where: {
//         [Op.or]: [
//           { name: { [Op.iLike]: `%${query}%` } },
//           { email: { [Op.iLike]: `%${query}%` } },
//         ],
//       },
//     });

//     // object ichida yuborish
//     res.status(200).json({ users });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
