const Appartments = require("../models/Appartments");
const Concierges  = require("../models/Concierges");
const Residents   = require("../models/Residents");
const Delivery    = require("../models/Deliveries");

module.exports = {
  /* find all */
  async index(req, res) {
    try {
      const deliveries = await Delivery.findAll({ 
        include: [{
          model: Appartments,
          as: "appartment",
          attributes: { exclude: [ "createdAt", "updatedAt" ]}
        }, { 
          model: Concierges,
          as: "concierge",
          attributes: { exclude: [ "username", "email", "password", "createdAt", "updatedAt" ]}
        }, { 
          model: Residents,
          as: "resident",
          attributes: { exclude: [ "username", "email", "password", "createdAt", "updatedAt", "appartmentFloor_id" ]}
        }],
        attributes: { exclude: [ "appartmentFloor_id", "resident_id", "concierge_id" ]}
      });

      if(deliveries.length <= 0) {
        return res.status(204).json({ status: true, message: "There is no deliveries yet" });
      }

      return res.status(200).json({ status: true, deliveries });

    } catch(err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  /* find by id */
  async findById(req, res) {
    const { delivery_id } = req.params;

    try {
      const delivery = await Delivery.findByPk(delivery_id, {
        include: [{
          model: Appartments,
          as: "appartment",
          attributes: { exclude: [ "createdAt", "updatedAt" ]}
        }, { 
          model: Concierges,
          as: "concierge",
          attributes: { exclude: [ "username", "email", "password", "createdAt", "updatedAt" ]}
        }, { 
          model: Residents,
          as: "resident",
          attributes: { exclude: [ "username", "email", "password", "createdAt", "updatedAt", "appartmentFloor_id" ]}
        }],
        attributes: { exclude: [ "appartmentFloor_id", "resident_id", "concierge_id" ]}
      });

      if(!delivery_id) {
        return res.status(404).json({ status: false, message: "Delivery not found" });
      }

      return res.status(200).json({ status: true, delivery });
    } catch(err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  /* create a new delivery */
  async create(req, res) {
    const { appartmentFloor_id, resident_id, concierge_id, packageDescription } = req.body;

    try {
      if(req.profile != "administrador"){
        return res.status(401).json({ status: false, message: "You do not have permission for do this action" });
      }

      const validateAppartmentByID = await Appartments.findOne({ where: { id: appartmentFloor_id }});
      const validateResidentByID   = await Residents.findOne({   where: { id: resident_id }});
      const validateConciergeByID  = await Concierges.findOne({  where: { id: concierge_id }});

      if(!validateAppartmentByID) {
        return res.status(404).json({ status: false, message: "Appartment floor not found" });
      }
      if(!validateResidentByID) {
        return res.status(409).json({ status: false, message: "Resident not found" });
      }
      if(!validateConciergeByID) {
        return res.status(409).json({ status: false, message: "Concierge not found" });
      }

      const delivery = await Delivery.create({ appartmentFloor_id, resident_id, concierge_id, packageDescription });

      return res.status(201).json({ status: true, delivery });
    } catch(err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  /* update an existing resident */
  async update(req, res) {
    const { delivery_id }                                                       = req.params;
    const { appartmentFloor_id, resident_id, concierge_id, packageDescription } = req.body;

    try {
      if(req.profile != "administrador"){
        return res.status(401).json({ status: false, message: "You do not have permission for do this action" });
      }

      let validateAppartmentByID;
      let validateResidentByID;
      let validateConciergeByID;
      const validateDeliveryByID    = await Delivery.findOne({    where: { id: delivery_id }});

      if(!validateDeliveryByID) {
        return res.status(404).json({ status: false, message: "Delivery not found" });
      }
      if(appartmentFloor_id){
        validateAppartmentByID  = await Appartments.findOne({ where: { id: appartmentFloor_id }});
        if(!validateAppartmentByID) {
          return res.status(404).json({ status: false, message: "Appartment floor not found" });
        }
      }
      if(resident_id){
        validateResidentByID = await Residents.findOne({   where: { id: resident_id }});
        if(!validateResidentByID) {
          return res.status(404).json({ status: false, message: "Resident not found" });
        }
      }
      if(concierge_id){
        validateConciergeByID   = await Concierges.findOne({  where: { id: concierge_id }});
        if(!validateConciergeByID) {
          return res.status(404).json({ status: false, message: "Concierge not found" });
        }
      }

      const deliveryUpdated = await Delivery.update({ 
        appartmentFloor_id, resident_id, concierge_id, packageDescription 
      },{
        where: { id: delivery_id }
      });

      if(deliveryUpdated != 1) {
        return res.status(400).json({ status: false, message: "Invalid delivery informations" });
      }

      return res.status(200).json({ status: true, deliveryUpdated });
    } catch(err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  /* delete an existing resident */
  async delete(req, res){
    const { delivery_id } = req.params;

    try {
      if(req.profile != "administrador"){
        return res.status(401).json({ status: false, message: "You do not have permission for do this action" });
      }
      
      const validateDeliveryByID = await Delivery.findByPk(delivery_id);
      if(!validateDeliveryByID){
        return res.status(404).json({ status: false, message: "Delivery not found"});
      }

      await Delivery.destroy({ where: { id: delivery_id }});

      return res.status(200).json({ status: true, message: "Delivery deleted" });
    } catch(err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  }
}
