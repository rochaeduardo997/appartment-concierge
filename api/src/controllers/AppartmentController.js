/* model import */
const Appartment = require("../models/Appartments");

module.exports = {
  /* find all */
  async index(req, res) {
    try {
      const appartments = await Appartment.findAll();

      if(appartments.length <= 0) {
        return res.status(204).json({ status: true, message: "There is no appartments yet, try to create one :)" });
      }
  
      return res.status(200).json({ status: true, appartments });
    } catch(err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  /* find by id */
  async findById(req, res) {
    const { appartment_id } = req.params;

    try {
      const appartments = await Appartment.findByPk(appartment_id);

      if(!appartments) {
        return res.status(404).json({ status: true, message: "Appartment floor not found" });
      }
  
      return res.status(200).json({ status: true, appartments });
    } catch(err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  /* create a new appartment */
  async create(req, res) {
    let { appartmentFloor } = req.body;

    try {
      if(req.profile != "administrador"){
        return res.status(401).json({ status: false, message: "You do not have permission for do this action" });
      }
      
      appartmentFloor = appartmentFloor.toUpperCase();
      const validateAppartmentFloor = await Appartment.findOne({ where: { appartmentFloor }});
      
      if(validateAppartmentFloor) {
        return res.status(409).json({ status: false, message: "Appartment floor already inserted" });
      }

      const appartments = await Appartment.create({ appartmentFloor });

      return res.status(201).json({ status: true, appartments });
    } catch(err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  /* update an existing appartment */
  async update(req, res) {
    const { appartment_id }   = req.params;
    const { appartmentFloor } = req.body;

    try {
      if(req.profile != "administrador"){
        return res.status(401).json({ status: false, message: "You do not have permission for do this action" });
      }

      let validateAppartmentByID;
      if(appartmentFloor){
        validateAppartmentByID = await Appartment.findByPk(appartment_id);
        
        if(!validateAppartmentByID) return res.status(404).json({ status: false, message: "Appartment floor not found" });
        if(!appartmentFloor)        return res.status(400).json({ status: false, message: "Appartment floor can't be null or undefined" });
      }

      const appartmentUpdated = await Appartment.update({ appartmentFloor }, { where: { id: appartment_id }});

      if(appartmentUpdated != 1) {
        return res.status(400).json({ status: false, message: "Invalid appartment floor" });
      }

      return res.status(200).json({ status: true, appartmentUpdated });
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  },

  /* delete an existing appartment */
  async delete(req, res) {
    const { appartment_id } = req.params;

    try {
      if(req.profile != "administrador"){
        return res.status(401).json({ status: false, message: "You do not have permission for do this action" });
      }
      
      const validateAppartmentByID = await Appartment.findByPk(appartment_id);

      if(!validateAppartmentByID) {
        return res.status(404).json({ status: false, message: "Appartment floor not found" });
      }

      await Appartment.destroy({ where: { id: appartment_id }});

      return res.status(200).json({ status: true, message: "Appartment floor deleted" });
    } catch (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
  }
}