const mongoose = require('mongoose');
const ProjectSchema = mongoose.Schema({
  number: Number,
  dueDate: Date,
  startDate: Date,
  name: String,
  description: String,
  manger: String,
  status: String,
  agency: String,
  edit: Boolean,
  borough: String,
  contract: String,
  markers: { type : Array , "default" : [] }
});

module.exports=mongoose.model('Project', ProjectSchema);