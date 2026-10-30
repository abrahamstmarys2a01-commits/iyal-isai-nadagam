const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const DATA_DIR = path.join(__dirname, '../data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class Store {
  constructor(collectionName, defaultData = []) {
    this.filePath = path.join(DATA_DIR, `${collectionName}.json`);
    this.name = collectionName;
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
    }
  }

  read() {
    try {
      const content = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(content || '[]');
    } catch (e) {
      return [];
    }
  }

  write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    return data;
  }

  find(predicate) {
    const all = this.read();
    return predicate ? all.filter(predicate) : all;
  }

  findOne(predicate) {
    const all = this.read();
    return all.find(predicate);
  }

  findById(id) {
    const all = this.read();
    return all.find(item => item._id === id || item.id === id);
  }

  create(item) {
    const all = this.read();
    const newItem = {
      _id: 'db_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      ...item,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    all.unshift(newItem);
    this.write(all);
    return newItem;
  }

  findByIdAndUpdate(id, updates) {
    const all = this.read();
    const index = all.findIndex(item => item._id === id || item.id === id);
    if (index === -1) return null;
    all[index] = {
      ...all[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.write(all);
    return all[index];
  }

  findByIdAndDelete(id) {
    const all = this.read();
    const index = all.findIndex(item => item._id === id || item.id === id);
    if (index === -1) return null;
    const removed = all.splice(index, 1)[0];
    this.write(all);
    return removed;
  }

  countDocuments(predicate) {
    const items = this.find(predicate);
    return items.length;
  }
}

const isMongoLive = () => mongoose.connection.readyState === 1;

module.exports = {
  Store,
  isMongoLive
};
