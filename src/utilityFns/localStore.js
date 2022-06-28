const localStore = {
  update: (entity, data) => {
    if (localStorage.getItem(entity)) {
      const tempData = JSON.parse(localStorage.getItem(entity));
      tempData.push(data);
      localStorage.setItem(entity, JSON.stringify(tempData));
    } else {
      localStorage.setItem(entity, JSON.stringify([data]));
    }
  },
  remove: (entity, id, attribute = 'id') => {
    const entityData = JSON.parse(localStorage.getItem(entity));
    const filteredData = entityData.filter((ent) => ent[attribute] !== id);
    localStorage.setItem(entity, JSON.stringify(filteredData));
  }
}

export default localStore;