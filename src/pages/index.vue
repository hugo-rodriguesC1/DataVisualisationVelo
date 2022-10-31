<script setup>
import Polygon from "@/components/Polygon.vue";
import BarDept from "@/components/BarDept.vue";
import BarType from "@/components/BarType.vue";
import BarRoute from "@/components/BarRoute.vue";
import {ref, onMounted} from 'vue'

const observer = new IntersectionObserver((entries)=>{
  for (const entry of entries) {
    if(entry.isIntersecting){
      entry.target.animate([
        {transform: 'translateX(-100px)', opacity: 0},
        {transform: 'translateX(0px)', opacity: 1},
      ], {
        duration :400
      })
    }
  }
})

const div1 = ref(null)
const div2 = ref(null)
const div3 = ref(null)

onMounted(()=>{
 observer.observe(div1.value)
 observer.observe(div2.value)
 observer.observe(div3.value)
})



</script>

<template>
  <div>
    <div
      class="flex h-screen w-screen flex-row items-center justify-between bg-[#13503A] px-96"
    >
      <div class="w-2/5">
        <Polygon />
      </div>
      <div class="flex w-2/5 flex-col items-center">
        <div class="text-xl font-normal text-gray-100">Hugo Rodrigues</div>
        <h1 class="text-8xl font-bold leading-[130px] text-gray-100">
          Aménagements d'infrastructures cyclables
        </h1>
      </div>
    </div>

    <div class="w-screen bg-gray-100 px-80 pt-44 text-zinc-900">
      <h2 class="text-3xl font-bold">Introduction</h2>
      <p class="mt-10 text-xl">
        Aujourd’hui, le vélo ne représente que 3% des trajets. Le Plan vélo,
        présenté par le Gouvernement en septembre 2018, vise à encourager le
        développement de ce mode de déplacement en levant les principaux freins
        identifiés. Il prévoit ainsi des actions réparties en quatre axes, parmi
        lesquels l’amélioration de la sécurité routière par le développement
        d’aménagements cyclables. L’objectif fixé était ainsi d’atteindre 55 477
        km d’aménagements cyclables sécurisés (pistes cyclables et voies vertes)
        en 2022.
      </p>

      <div class="flex flex-row mt-32 gap-20 items-center" ref="div1">
        <div class="flex flex-col gap-10 flex-shrink">
          <h2 class="text-3xl font-bold">Départements les plus concernés</h2>
          <p class=" text-lg">
            Aujourd’hui, le vélo ne représente que 3% des trajets. Le Plan vélo,
            présenté par le Gouvernement en septembre 2018, vise à encourager le
            développement de ce mode de déplacement en levant les principaux
            freins identifiés.
          </p>
        </div>
        <div class="flex-shrink-0 w-3/5 h-96 flex-grow">
          <BarDept/>
        </div>
      </div>


      <div class="flex flex-row mt-32 gap-20 items-center" ref="div2">
        <div class="flex-shrink-0 w-3/5 h-96 flex-grow">
          <BarType/>
        </div>
        <div class="flex flex-col gap-10 flex-shrink">
          <h2 class="text-3xl font-bold">Introduction</h2>
          <p class=" text-lg">
            Aujourd’hui, le vélo ne représente que 3% des trajets. Le Plan vélo,
            présenté par le Gouvernement en septembre 2018, vise à encourager le
            développement de ce mode de déplacement en levant les principaux
            freins identifiés.
          </p>
        </div>
      </div>


      <div class="flex flex-row mt-32 gap-20 items-center" ref="div3">
        <div class="flex flex-col gap-10 flex-shrink">
          <h2 class="text-3xl font-bold">Introduction</h2>
          <p class=" text-lg">
            Aujourd’hui, le vélo ne représente que 3% des trajets. Le Plan vélo,
            présenté par le Gouvernement en septembre 2018, vise à encourager le
            développement de ce mode de déplacement en levant les principaux
            freins identifiés.
          </p>
        </div>
        <div class="flex-shrink-0 w-3/5 h-96 flex-grow">
          <BarRoute/>
        </div>
      </div>

      <h2 class="text-3xl font-bold mt-32">Introduction</h2>
      <p class="mt-10 text-xl">
        Aujourd’hui, le vélo ne représente que 3% des trajets. Le Plan vélo,
        présenté par le Gouvernement en septembre 2018, vise à encourager le
        développement de ce mode de déplacement en levant les principaux freins
        identifiés. Il prévoit ainsi des actions réparties en quatre axes, parmi
        lesquels l’amélioration de la sécurité routière par le développement
        d’aménagements cyclables. L’objectif fixé était ainsi d’atteindre 55 477
        km d’aménagements cyclables sécurisés (pistes cyclables et voies vertes)
        en 2022.
      </p>
    </div>
  </div>
</template>
