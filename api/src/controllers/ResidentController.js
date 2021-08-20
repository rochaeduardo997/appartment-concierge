/* security import */
const bcrypt          = require("bcrypt");
const securityConfigs = require("../../config/security.json");

/* model import */
const Appartments = require("../models/Appartments");
const Resident    = require("../models/Residents");

/* login controller */
const login = require("./LoginController");

module.exports = {
  /* find all */
  async index(req, res) {
    try {
      const residents = await Resident.findAll({ 
        include:    { model: Appartments, as: "appartments", attributes: { exclude: [ "createdAt", "updatedAt" ]}},
        attributes: { exclude: ["appartmentFloor_id", "password"]},
      });

      if(residents.length <= 0) {
        return res.status(204).json({ status: true, message: "There is no residents yet, try to create one :)" });
      }

      return res.status(200).json({ status: true, residents });
    } catch(err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  /* find by id */
  async findById(req, res) {
    const { resident_id } = req.params;

    try {
      const resident = await Resident.findByPk(resident_id, { 
        include:    { model: Appartments, as: "appartments" },
        attributes: { exclude: ["appartmentFloor_id", "password"]}
      });
      if(!resident) {
        return res.status(404).json({ status: false, message: "Resident not found" });
      }

      return res.status(200).json({ status: true, resident });
    } catch(err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  /* create a new resident */
  async create(req, res) {
    let { ownerFirstName, ownerLastName, password, email, profile, appartmentFloor_id } = req.body;

    try {
      if(req.profile != "administrador"){
        return res.status(401).json({ status: false, message: "You do not have permission for do this action" });
      }

      let username  = ownerFirstName.toLowerCase().trim() + ownerLastName.toLowerCase().trim();

      ownerFirstName = ownerFirstName.toUpperCase();
      ownerLastName  = ownerLastName.toUpperCase();
      email          = email.toLowerCase();
      profile        = profile.toLowerCase();

      const validateResidentByUsername = await Resident.findOne({ where: { username }});
      const validateAppartmentById     = await Appartments.findOne({ where: { id: appartmentFloor_id }});
      if(!validateAppartmentById) {
        return res.status(404).json({ status: false, message: "Appartment floor not found" });
      }

      if(!(profile === "proprietario") || !(profile != "morador")){
        return res.status(409).json({ status: false, message: "Resident profile must be proprietario or morador" });
      }

      if(!ownerFirstName) return res.status(409).json({ status: false, message: "First name cannot be null or undefined" });
      if(!ownerLastName)  return res.status(409).json({ status: false, message: "Last name cannot be null or undefined" });
      if(!password)       return res.status(409).json({ status: false, message: "Password cannot be null or undefined" });
      if(!email)          return res.status(409).json({ status: false, message: "Email cannot be null or undefined" });
      if(!profile)        return res.status(409).json({ status: false, message: "Profile cannot be null or undefined" });

      if(validateResidentByUsername) {
        username = `username-${Math.floor(Math.random() * (100 - 0) + 0)}`;
      }

      const encryptPassword = await bcrypt.hash(password, securityConfigs.numberOfSaltsBcrypt);

      const residents = await Resident.create({ ownerFirstName, ownerLastName, username, password: encryptPassword, email, profile, appartmentFloor_id });
      residents.password = undefined;

      return res.status(201).json({ status: true, residents });
    } catch(err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  /* update an existing resident */
  async update(req, res) {
    const { resident_id } = req.params;
    let { ownerFirstName, ownerLastName, username, password, email, profile, appartmentFloor_id } = req.body;

    try {
      if(req.profile != "administrador"){
        return res.status(401).json({ status: false, message: "You do not have permission for do this action" });
      }

      let validateAppartmentByID;
      const validateResidentByID = await Resident.findOne({ where: { id: resident_id }});

      if(!validateResidentByID) {
        return res.status(404).json({ status: false, message: "Resident not found"});
      }

      if(ownerFirstName) {
        if(ownerFirstName == ""){
          return res.status(400).json({ status: false, message: "Resident first name cannot be null" });
        }
      }
      if(ownerLastName){
        if(ownerLastName == ""){
          return res.status(400).json({ status: false, message: "Resident last name cannot be null" });
        }
      }
      if(appartmentFloor_id){
        validateAppartmentByID = await Appartments.findOne({ where: { id: appartmentFloor_id }});
        if(!validateAppartmentByID){
          return res.status(404).json({ status: false, message: "Appartment floor not found" });
        }
      }

      if(ownerFirstName) ownerFirstName = ownerFirstName.toUpperCase();
      if(ownerLastName)  ownerLastName  = ownerLastName.toUpperCase();
      if(username)       username       = username.toLowerCase();
      if(email)          email          = email.toLowerCase();
      if(profile)        profile        = profile.toLowerCase();

      if(ownerFirstName) ownerFirstName = ownerFirstName.toUpperCase();
      if(ownerLastName)  ownerLastName  = ownerLastName.toUpperCase();
      if(username)       username       = username.toLowerCase();
      if(password)       password       = password;
      if(email)          email          = email.toLowerCase();
      if(profile)        profile        = profile.toLowerCase();

      const encryptPassword = await bcrypt.hash(password, securityConfigs.numberOfSaltsBcrypt);

      const residentUpdated = await Resident.update({ 
        ownerFirstName, ownerLastName, username, password: encryptPassword, email, profile, appartmentFloor_id 
      }, { 
        where: { id: resident_id }
      });

      if(residentUpdated != 1) {
        return res.status(400).json({ status: false, message: "Invalid resident informations" });
      }

      return res.status(200).json({ status: true, residentUpdated });
    } catch(err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },
  
  /* delete an existing resident */
  async delete(req, res) {
    const { resident_id } = req.params;

    try {
      if(req.profile != "administrador"){
        return res.status(401).json({ status: false, message: "You do not have permission for do this action" });
      }
      
      const validateResidentByID = await Resident.findByPk(resident_id);
      if(!validateResidentByID) {
        return res.status(404).json({ status: false, message: "Resident not found"});
      }

      await Resident.destroy({ where: { id: resident_id }});

      return res.status(200).json({ status: true, message: "Resident deleted" });
    } catch(err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  async login(req, res) {
    login(req, res);
  }
}
