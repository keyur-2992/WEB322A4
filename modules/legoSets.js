/** @format */

const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

const initialize = async () => {
  return new Promise((resolve, reject) => {
    setData.forEach((set) => {
      themeData.forEach((theme) => {
        if (set.theme_id === theme.id) set.theme = theme.name;
      });
      sets.push(set);
    });
    resolve(sets);
  });
};

const getAllSets = async () => {
  return new Promise((resolve, reject) => {
    if (sets.length > 0) resolve(sets);
    else reject("No sets were found...");
  });
};

const getSetByNum = async (setNum) => {
  return new Promise((resolve, reject) => {
    let result = sets.find((set) => set.set_num == setNum);

    if (result) resolve(result);
    else reject(`No set found with id of ${setNum}`);
  });
};

const getSetsByTheme = async (theme) => {
  return new Promise((resolve, reject) => {
    let result = sets.filter((item) => {
      let themeLowerCase = item.theme.toLowerCase();
      return themeLowerCase.includes(theme.toLowerCase());
    });
    if (result.length > 0) resolve(result);
    else reject(`No set found with theme of ${theme}`);
  });
};

module.exports = {
  initialize,
  getAllSets,
  getSetByNum,
  getSetsByTheme,
};
