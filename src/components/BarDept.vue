<script setup>
// import des éléments de vue
import { reactive, ref, onMounted } from "vue";

// import d'un graphique de type barchart
import { Bar } from "vue-chartjs";

import {getLabels, countDatasSimple, removeItemAll} from "@/composables/utilsApp"
import {densite} from '@/composables/commonChart'

// import des objets du graphique de la bibliothèque chartjs
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// éléments utilisés par le graphique
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

// Propriétés du graphique utilisées dans le template
// On définit pour chacune son type de donnée et sa valeur par défaut
// On peut aussi utiliser une grande variété de type, voire des objets
const propChart = defineProps({
  chartId: { type: String, default: "bar-chart" },
  datasetIdKey: { type: String, default: "label" },
  width: { type: Number, default: 400 },
  height: { type: Number, default: 400 },
  cssClasses: { type: String, default: "" },
  styles: { type: Object, default: () => {} },
  plugins: { type: Object, default: () => {} },
});

// données injectées dans le graphique
// Données du graphique
// Au moins déclarer les structures de base
let chartData = reactive({
  labels: [],
  datasets: [{}],
});
// Options du graphique
// Au moins déclarer les structures de base
const chartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      text: null,
      display: true,
    },
  },
});

let liste = ref()

let baseColor = ref();
baseColor.value = "rgba(19,80,58,#deg#)";

const couleur = () => {
    let bgColor, bdColor;
    [bgColor, bdColor] = densite(baseColor.value, chartData.datasets[0].data);
    chartData.datasets[0].backgroundColor = bgColor;
    chartData.datasets[0].borderColor = bdColor;
}




onMounted(async () => {
    await fetch("https://accidentvelo.jmfino.fr/json.php")
    .then((response) => response.json())
    .then((response) => {
    liste.value = response;
    console.log("liste", liste);
    // Titre du graphique
    chartOptions.plugins.title.text = "Accidents par département (+ de 500)";
    let setDept = new Set()
        // la 1° ligne contient le descriptif
        // firstLine permet de l'éviter lors des calculs
        let firstLine = true;
        liste.value.forEach( (el) => {
            // Si ce n'est pas la 1° ligne
            if(!firstLine){ setDept.add(el[3])  } // Ajout du nom du Dept
            // Mise à faux au 1° passage et après d'ailleurs
            firstLine = false
        })
        // Chargement des labels
        // Les Dept sont déja classés
    chartData.labels = Array.from(setDept)
    chartData.datasets[0].data = countDatasSimple(liste.value, chartData.labels, 3)
    console.log('dataset', chartData.datasets[0].data)
    let elemSupp = []
    let labelSupp = []
    let labelElemSupp = []
    let i = 0
    chartData.datasets[0].data.forEach((dept) => {
        if (dept<500){
            elemSupp.push(dept)
            labelSupp.push(chartData.datasets[0].data.indexOf(dept,i))
        }
        i=i+1
    })
    console.log('elem a supp', elemSupp)
    console.log('label a supp', labelSupp)
    elemSupp.forEach((el) => {
        removeItemAll(chartData.datasets[0].data,el)
    })
    labelSupp.forEach((label) => {
        labelElemSupp.push(chartData.labels[label])
    })
    labelElemSupp.forEach((el) => {
        removeItemAll(chartData.labels, el)
    })
    chartData.datasets[0].label = "Nombre d'accidents"
    couleur()



    // // Recherche labels
    // chartData.labels = getLabels(liste.value, "departement#1");
    // console.log("labels villageois", chartData.labels);
    // // Comptage
    // chartData.datasets[0].data = countDatas(
    //   liste.value,
    //   chartData.labels,
    //   "laSpecialite.nom#1"
    // );
    // console.log("data villageois", chartData.datasets[0].data);
    // // Libellé des données
    // chartData.datasets[0].label = "Spécialités";
    // selectMode();
  });
});


</script>

<template>
  <div>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<style scoped>
</style>