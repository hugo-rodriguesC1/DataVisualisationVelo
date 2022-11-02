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

let liste = ref();

let baseColor = ref();
baseColor.value = "rgba(19,36,80,#deg#)";

let enabled = ref(false)

let loading = ref()
loading.value = false


const couleur = () => {
  let bgColor, bdColor;
  [bgColor, bdColor] = densite(baseColor.value, chartData.datasets[0].data);
  chartData.datasets[0].backgroundColor = bgColor;
  chartData.datasets[0].borderColor = bdColor;
};

onMounted(async () => {
  await fetch("https://accidentvelo.jmfino.fr/json.php")
    .then((response) => response.json())
    .then((response) => {
      liste.value = response;
      loading.value = true
      console.log("liste", liste);
      // Titre du graphique
      chartOptions.plugins.title.text = "Accidents par type d'intersections";
      let setType = new Set();
      // la 1° ligne contient le descriptif
      // firstLine permet de l'éviter lors des calculs
      let firstLine = true;
      liste.value.forEach((el) => {
        // Si ce n'est pas la 1° ligne
        if (!firstLine) {
          setType.add(el[7]);
        } // Ajout du nom du Type
        // Mise à faux au 1° passage et après d'ailleurs
        firstLine = false;
      });
      // Chargement des labels
      // Les Type sont déja classés
      chartData.labels = Array.from(setType);
      general()
      couleur();
    });
});

const select = (cond) => {
    switch (cond) {
        case true :
            general()
            break
        case false :
            paris()
            break
    }
};

const general = () => {
    chartData.datasets[0].data = countDatasSimple(
        liste.value,
        chartData.labels,
        7
      );
      console.log("dataset", chartData.datasets[0].data);

      chartData.datasets[0].label = "Nombre d'accidents";
}
const paris = () => {
    chartData.datasets[0].data = countDatasFilter(
        liste.value,
        chartData.labels,
        7,
        3,
        75
      );
      console.log("dataset", chartData.datasets[0].data);

      chartData.datasets[0].label = "Nombre d'accidents";
}



</script>

<template>
  <div>
    <div v-if="loading">
      <div class="flex flex-row gap-3">
          <Switch
            v-model="enabled"
            :class="enabled ? 'bg-blue-600' : 'bg-gray-200'"
            class="relative inline-flex h-6 w-11 items-center rounded-full"
            @click="select(enabled)"
            ><span
              :class="enabled ? 'translate-x-6' : 'translate-x-1'"
              class="inline-block h-4 w-4 transform rounded-full bg-white transition"
          /></Switch>
          <div class="text-zinc-900 text-base">Seulement dans le 75</div>
      </div>
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
    <div v-else>
      <div class="flex items-center justify-center mt-32">
        <div
          class="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
