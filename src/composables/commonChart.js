export const densite = (base, datas) => {
  let valMax = 0;
  let valMin = 9999;
  datas.forEach((val) => {
    if (val < valMin) {
      valMin = val;
    }
    if (val > valMax) {
      valMax = val;
    }
  });
  let nbVal = 0.8 / (valMax - valMin);
  let tabVal = [];
  let tabBorder = [];
  let deg = 0.1;
  datas.forEach((val) => {
    let transp = nbVal * val + deg;
    let color = base.replace("#deg#", transp);
    let border = base.replace("#deg#", 1);
    tabVal.push(color);
    tabBorder.push(border);
  });
  return [tabVal, tabBorder];
};

const couleur = (max) => {
  return Math.round(Math.random() * max, 0);
};

export const aleatoire = (labels) => {
  let bgColor = [];
  let bdColor = [];
  labels.forEach(function (val) {
    // On calcul la couleur du secteur
    let c1 = couleur(255);
    let c2 = couleur(255);
    let c3 = couleur(255);
    let tr = 0.5;
    // Couleur avec transparence
    let color = "rgba(" + [c1, c2, c3, tr].join(",") + ")";
    bgColor.push(color);
    // Bordure sans transparence
    let border = "rgba(" + [c1, c2, c3].join(",") + ")";
    bdColor.push(color);
  });
  return [bgColor, bdColor];
};
