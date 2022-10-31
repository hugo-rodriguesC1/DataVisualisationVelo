export const getLabels = (lstData, label) => {
  let tl = label.split("#");
  let occurence = tl[1];
  let lbl = tl[0];
  let val = lbl.split(".");
  let retour = [];
  let set = new Set();
  let tabObj = [];
  lstData.forEach((element) => {
    switch (val.length) {
      case 1:
        if (occurence == 1) {
          set.add(element[val[0]]);
        }
        if (occurence == "multi") {
          element.forEach((elt) => {
            tabObj.push(elt[val[0]]);
          });
        }
        break;
      case 2:
        if (occurence == 1) {
          set.add(element[val[0]][val[1]]);
        }
        if (occurence == "multi") {
          element[val[0]].forEach((elt) => {
            tabObj.push(elt[val[1]]);
          });
        }
        break;
      case 3:
        if (occurence == 1) {
          set.add(element[val[0]][val[1]][val[2]]);
        }
        if (occurence == "multi") {
          element[val[0]][val[1]].forEach((elt) => {
            tabObj.push(elt[val[2]]);
          });
        }
        break;
      case 4:
        if (occurence == 1) {
          set.add(element[val[0]][val[1]][val[2]][val[3]]);
        }
        if (occurence == "multi") {
          element[val[0]][val[1]][val[2]].forEach((elt) => {
            tabObj.push(elt[val[3]]);
          });
        }
        break;
    }
  });
  if (occurence == "multi") {
    set = new Set(tabObj);
  }
  retour = Array.from(set);
  retour.sort();
  return retour;
};

export const countDatas = (lst, lstLabel, libLabel) => {
  let tl = libLabel.split("#");
  let occurence = tl[1];
  let lbl = tl[0];
  let val = lbl.split(".");
  let retour = [];
  lstLabel.forEach((label) => {
    let nb = 0;
    lst.forEach((element) => {
      switch (val.length) {
        case 1:
          if (occurence == 1) {
            if (element[val[0]] == label) {
              nb++;
            }
          }
          if (occurence == "multi") {
            element[val[0]].forEach((elt) => {
              nb++;
            });
          }
          break;
        case 2:
          if (occurence == 1) {
            if (element[val[0]][val[1]] == label) {
              nb++;
            }
          }
          if (occurence == "multi") {
            element[val[0]].forEach((elt) => {
              if (elt[val[1]] == label) {
                nb++;
              }
            });
          }
          break;
        case 3:
          if (occurence == 1) {
            if (element[val[0]][val[1]][val[2]] == label) {
              nb++;
            }
          }
          if (occurence == "multi") {
            element[val[0]][val[1]].forEach((elt) => {
              if (elt[val[2]] == label) {
                nb++;
              }
            });
          }
          break;
      }
    });
    retour.push(nb);
  });
  return retour;
};

export const countDatasSimple = (lst, lstLabel, num) => {
  let retour = [];
  lstLabel.forEach((label) => {
    let nb = 0;
    lst.forEach((element) => {
      if (element[num] == label) {
        nb++;
      }
    });

    retour.push(nb);
  });
  return retour;
};

export const countDatasFilter = (lst, lstLabel, num, numFilter, libFilter) => {
  let retour = [];
  lstLabel.forEach((label) => {
    let nb = 0;
    lst.forEach((element) => {
      if (element[num] == label && element[numFilter] == libFilter) {
        nb++;
      }
    });

    retour.push(nb);
  });
  return retour;
};

export const removeItemAll = (arr, value) => {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
};
