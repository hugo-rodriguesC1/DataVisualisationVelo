<script setup>
// import des éléments de vue
import { reactive, ref, onMounted } from "vue";

// import d'un graphique de type barchart
import { Bar } from "vue-chartjs";

import { Switch } from "@headlessui/vue";

import {
  getLabels,
  countDatasSimple,
  countDatasFilter,
  removeItemAll,
} from "@/composables/utilsApp";
import { densite } from "@/composables/commonChart";

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
  labels: ["Blessé hospitalisé", "Tué"],
  datasets: [
    {
      backgroundColor: ["rgba(223, 91, 49, 0.6)", "rgba(223, 91, 49, 0.4)"],
    },
    {
      backgroundColor: ["rgba(49, 223, 67, 0.6)", "rgba(49, 223, 67, 0.4)"],
    },
    {
      backgroundColor: ["rgba(178, 49, 223, 0.6)", "rgba(178, 49, 223, 0.4)"],
    },
  ],
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

let liste = ref();
let codeLabels = ["2 - Blessé hospitalisé", "3 - Tué"];

const couleur = (ColorBase, numData) => {
  let bgColor, bdColor;
  [bgColor, bdColor] = densite(ColorBase, chartData.datasets[numData].data);
  chartData.datasets[numData].backgroundColor = bgColor;
  chartData.datasets[numData].borderColor = bdColor;
};

onMounted(async () => {
  await fetch("https://accidentvelo.jmfino.fr/json.php")
    .then((response) => response.json())
    .then((response) => {
      liste.value = response;
      console.log("liste", liste);
      // Titre du graphique
      chartOptions.plugins.title.text =
        "Gravité des accidents en fonction du type de route";
      chartData.datasets[0].data = countDatasFilter(
        liste.value,
        codeLabels,
        22,
        11,
        "Voie Communale"
      );
      chartData.datasets[0].label = "Voie communale";
      chartData.datasets[1].data = countDatasFilter(
        liste.value,
        codeLabels,
        22,
        11,
        "Route Départementale"
      );
      chartData.datasets[1].label = "Route départementale";
      chartData.datasets[2].data = countDatasFilter(
        liste.value,
        codeLabels,
        22,
        11,
        "Route Nationale"
      );
      chartData.datasets[2].label = "Route nationale";
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

<style scoped></style>
