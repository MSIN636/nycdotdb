var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const Project = require('./project.model');


var app = express();
mongoose.connect("mongodb://alfred:password00@cluster0-shard-00-00-4ok8e.mongodb.net:27017,cluster0-shard-00-01-4ok8e.mongodb.net:27017,cluster0-shard-00-02-4ok8e.mongodb.net:27017/projects?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true", { useNewUrlParser: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();

});

app.get('/api/projects', (req, res, next) => {

  Project.find().exec().then(docs => {

    return res.status(200.).json({
      message: 'Post Fetched succedfully',
      projects: docs
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });

});

app.delete('/api/delete/:id', (req, res, next) => {

  Project.deleteOne({ _id: req.params.id }).then(doc => {

    res.status(200).json({
      message: 'Post Deleted',
    })
  });
});

app.get('/api/project/:id', (req, res, next) => {

  Project.find({ _id: req.params.id }).exec().then(doc => {
    console.log(doc)
    res.status(200).json({
      message: 'Post fetched',
      project: doc
    });
  })
});


app.post('/api/add', (req, res, next) => {
  const project = new Project({
    number: req.body.number,
    dueDate: req.body.dueDate,
    startDate: req.body.startDate,
    name: req.body.name,
    description: req.body.description,
    manger: req.body.manger,
    status: req.body.status,
    agency: req.body.agency,
    edit: req.body.edit,
    borough: req.body.borough,
    contract: req.body.contract,
    markers: req.body.markers
  });
  console.log(project)
  project.save();
  res.status(201).json({
    message: 'Project Added Successfully!'
  });
  next();
});

module.exports = app;
