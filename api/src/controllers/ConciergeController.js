/* security import */
const bcrypt          = require("bcrypt");
const { numberOfSaltsBcrypt } = require("../../config/security.json");

/* model import */
const Concierges = require("../models/Concierges");

/* login controller */
const login = require("./LoginController");

module.exports = {
  /* find all */
  async index(req, res) {
    try {
      const concierges = await Concierges.findAll({ attributes: { exclude: "password" }});

      if(concierges.length <= 0) {
        return res.status(204).json({ status: true, message: "There is no concierge yet, try to create one :)" });
      }

      return res.status(200).json({ status: true, concierges });
    } catch(err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  /* find by id */
  async findById(req, res) {
    const { concierge_id } = req.params;

    try {
      const concierge = await Concierges.findByPk(concierge_id, { attributes: { exclude: "password" }});
      if(!concierge) {
        return res.status(404).json({ status: false, message: "Concierge not found" });
      }

      return res.status(200).json({ status: true, concierge });
    } catch(err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  /* create a new concierge */
  async create(req, res) {
    let { firstName, lastName, password, email, profile, workShift } = req.body;

    try {
      if(req.profile != "administrador"){
        return res.status(401).json({ status: false, message: "You do not have permission for do this action" });
      }

      let username  = firstName.toLowerCase().trim() + lastName.toLowerCase().trim();
      
      workShift    = workShift.toLowerCase();
      email        = email.toLowerCase();
      firstName    = firstName.toUpperCase();
      lastName     = lastName.toUpperCase();
      profile      = profile.toLowerCase();
      
      const validateConciergeByUsername = await Concierges.findOne({ where: { username }});
      const validateConciergeByEmail    = await Concierges.findOne({ where: { email }});
      
      if(!(workShift === "diurno") || !(workShift != "noturno")){
        return res.status(409).json({ status: false, message: "Concierge work shift must be diurno or noturno" });
      }
      if(!(profile === "administrador") || !(profile != "porteiro")){
        return res.status(409).json({ status: false, message: "Concierge profile must be administrador or porteiro" });
      }
      
      if(!firstName) return res.status(409).json({ status: false, message: "First name cannot be null or undefined" });
      if(!lastName)  return res.status(409).json({ status: false, message: "Last name cannot be null or undefined" });
      if(!password)  return res.status(409).json({ status: false, message: "Password cannot be null or undefined" });
      if(!email)     return res.status(409).json({ status: false, message: "Email cannot be null or undefined" });
      if(!profile)   return res.status(409).json({ status: false, message: "Profile cannot be null or undefined" });
      
      if(validateConciergeByEmail){
        return res.status(409).json({ status: false, message: "Email already in use" });
      } 
      if(validateConciergeByUsername) {
        username = `username-${Math.floor(Math.random() * (100 - 0) + 0)}`;
      }
      
      const encryptPassword = await bcrypt.hash(password, numberOfSaltsBcrypt);
      const concierge = await Concierges.create({ firstName, lastName, username, password: encryptPassword, email, profile, workShift });
      concierge.password = undefined;

      return res.status(201).json({ status: true, concierge });
    } catch(err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  /* update an existing concierge */
  async update(req, res) {
    const { concierge_id } = req.params;
    let   { firstName, lastName, username, password, email, profile, workShift } = req.body;

    try {
      if(req.profile != "administrador"){
        return res.status(401).json({ status: false, message: "You do not have permission for do this action" });
      }

      const validateConciergeById = await Concierges.findByPk(concierge_id);

      if(!validateConciergeById) {
        return res.status(404).json({ status: false, message: "Concierge not found"});
      }

      if(!(validateConciergeById.email == email)) {
        if(!(await Concierges.findOne({ where: { email: validateConciergeById.email }}) || !email)){
          return res.status(409).json({ status: false, message: "Email already in use"});
        }
      }

      if(firstName) firstName = firstName.toUpperCase();
      if(lastName)  lastName  = lastName.toUpperCase();
      if(username)  username  = username.toLowerCase();
      if(email)     email     = email.toLowerCase();
      if(profile)   profile   = profile.toLowerCase();
      if(workShift) workShift = workShift.toLowerCase();

      if(!firstName) firstName = validateConciergeById.firstName;
      if(!lastName)  lastName  = validateConciergeById.lastName;
      if(!username)  username  = validateConciergeById.username;
      if(!password)  password  = validateConciergeById.password;
      if(!email)     email     = validateConciergeById.email;
      if(!profile)   profile   = validateConciergeById.profile;
      if(!workShift) workShift = validateConciergeById.workShift;

      const encryptPassword = await bcrypt.hash(password, numberOfSaltsBcrypt);
      const conciergeUpdated = await Concierges.update({ 
        firstName, lastName, username, password: encryptPassword, email, profile, workShift
      },{
        where: { id: concierge_id }
      });

      if(conciergeUpdated != 1) {
        return res.status(400).json({ status: false, message: "Invalid concierge informations" });
      }

      return res.status(200).json({ status: true, conciergeUpdated });
    } catch(err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  /* delete an existing resident */
  async delete(req, res) {
    const { concierge_id } = req.params;
    
    try {
      if(req.profile != "administrador"){
        return res.status(401).json({ status: false, message: "You do not have permission for do this action" });
      }
      
      const validateConciergeById = await Concierges.findByPk(concierge_id);
      if(!validateConciergeById) {
        return res.status(404).json({ status: false, message: "Concierge not found"});
      }

      await Concierges.destroy({ where: { id: concierge_id }});

      return res.status(200).json({ status: true, message: "Concierge deleted" });
    } catch(err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  async login(req, res) {
    login(req, res);
  }
}
