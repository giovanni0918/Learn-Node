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
};

exports.editStore = async (req, res) => {
  // 1. Find the store given the ID
  const store = await Store.findOne({ _id: req.params.id });

  // 2. Confirm they are the owner of the store
  // TODO

  // 3. Render out the edit form so the user can update his store
  res.render('editStore', { title: `Edit ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
  // 1. Find and update the store
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new store instead of the old one
    runValidators: true,    
  }).exec();

  // 2. Redirect to the store and flash success msg
  req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store ➜</a>`)
  res.redirect(`/stores/${store._id}/edit`);
};