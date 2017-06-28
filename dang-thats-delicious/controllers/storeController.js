const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  
  res.render('hello', {

    title: 'Getting Started w. Node',
    year: 2017
  
  });

};

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' });
};

exports.createStore = async (req, res) => {
  const store = new Store(req.body);
  console.log(req.body);
  await store.save();
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
  res.redirect('/');
};

exports.getStores = async (req, res) => {
  // 1. Query the db for a list of all stores
  const stores = await Store.find();
  res.render('stores', {title: 'Stores', stores });
}