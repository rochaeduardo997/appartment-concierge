/* general import */
const jwt    = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/* config import */
const { superSecretPasswordJWT } = require("../../config/security.json");

/* model import */
const Concierges = require("../models/Concierges");
const Resident = require("../models/Residents");

module.exports = async (req, res) => {
  let { username, password } = req.body;
  let fromRequest            = req.baseUrl;
  
  try {
    if(username) username = username.toLowerCase();
    
    if(fromRequest == "/concierges") {
      const findByUsernameConcierge = await Concierges.findOne({ where: { username }});

      if(findByUsernameConcierge) {
        const passwordMatch = await bcrypt.compare(password, findByUsernameConcierge.password);
        
        if(passwordMatch) {
          const token = jwt.sign({ 
            id:        findByUsernameConcierge.id, 
            email:     findByUsernameConcierge.email,
            profile:   findByUsernameConcierge.profile
          }, superSecretPasswordJWT);
          
          return res.status(200).json({ status: true, token: token }); 
        } else {
          return res.status(401).json({ status: false, error: "Email/Password don\'t match" });
        }
      }
    }
    
    if(fromRequest == "/residents") {
      const findByUsernameResident  = await Resident.findOne({   where: { username }});

      if(findByUsernameResident) {
        const passwordMatch = await bcrypt.compare(password, findByUsernameResident.password);
        
        if(passwordMatch) {
          const token = jwt.sign({ 
            id:        findByUsernameResident.id, 
            email:     findByUsernameResident.email,
            profile:   findByUsernameResident.profile
          }, superSecretPasswordJWT);
          
          return res.status(200).json({ status: true, token: token }); 
        } else {
          return res.status(401).json({ status: false, error: "Email/Password don\'t match" });
        }
      }
    }
    
    return res.status(401).json({ status: false, error: "Email/Password don\'t match" });
  } catch(err) {
    return res.status(500).json({ status: false, message: err.message });
  }
}