<script setup>
import Polygon from "@/components/Polygon.vue";
import BarDept from "@/components/BarDept.vue";
import BarType from "@/components/BarType.vue";
import BarRoute from "@/components/BarRoute.vue";
import { ref, onMounted } from "vue";

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.animate(
        [
          { transform: "translateX(-100px)", opacity: 0 },
          { transform: "translateX(0px)", opacity: 1 },
        ],
        {
          duration: 400,
        }
      );
    }
  }
});

const div1 = ref(null);
const div2 = ref(null);
const div3 = ref(null);

onMounted(() => {
  observer.observe(div1.value);
  observer.observe(div2.value);
  observer.observe(div3.value);
});
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

    <div class="w-screen bg-gray-100 px-48 pt-44 text-zinc-900">
      <h2 class="text-3xl font-bold">Introduction</h2>
      <p class="mt-10 text-xl">
        Aujourd’hui, le vélo ne représente que 3% des trajets. Le Plan vélo,
        présenté par le Gouvernement en septembre 2018, vise à encourager le
        développement de ce mode de déplacement en levant les principaux freins
        identifiés. Il prévoit ainsi des actions réparties en quatre axes, parmi
        lesquels l’amélioration de la sécurité routière par le développement
        d’aménagements cyclables. L’objectif fixé était ainsi d’atteindre 55 477
        km d’aménagements cyclables sécurisés (pistes cyclables et voies vertes)
        en 2022. Dès lors, il est important de se demander où aménager des
        infrastructures cyclables pour réduire les accidents à vélo et améliorer
        la sécurité routière ?
      </p>

      <div class="mt-32 flex flex-row items-center gap-20" ref="div1">
        <div class="flex flex-shrink flex-col gap-10">
          <h2 class="text-3xl font-bold">Départements les plus concernés</h2>
          <p class="text-lg">
            Depuis 2005, on peut remarquer que le département le plus touché par
            les accidents de vélo est le 75, donc Paris. En effet, c'est la
            capitale, il y a beaucoup d'habitant donc plus d'accidents. Mais on
            retrouve également un grand nombre d'accidents dans les département
            des grandes métropoles de France, ainsi la Gironde (33), le Rhône
            (69), ou encore le Nord (59) cumulent plus de 2000 accidents chacun.
          </p>
        </div>
        <div class="h-96 w-3/4 flex-shrink-0 flex-grow">
          <BarDept />
        </div>
      </div>

      <div class="mt-32 flex flex-row items-center gap-20" ref="div2">
        <div class="h-96 w-3/4 flex-shrink-0 flex-grow">
          <BarType />
        </div>
        <div class="flex flex-shrink flex-col gap-10">
          <h2 class="text-3xl font-bold">Type d'intersections</h2>
          <p class="text-lg">
            A première vue, on pourrait penser que les intersections sont les
            lieus les plus propices aux accidents de vélo. cependant, on se rend
            compte que la majorité des accidents surviennent hors des
            intersections et ce, même dans le 75. C'est donc peut-être hors des
            intersections que la vigilance des usagers de la route est plus
            faible ce qui rend ces lieus plus propices aux accidents. En effet,
            de manière générale, lorsqu'on arrive à une intersection, on fait
            plus attention aux autres.
          </p>
        </div>
      </div>

      <div class="mt-32 flex flex-row items-center gap-20" ref="div3">
        <div class="flex flex-shrink flex-col gap-10">
          <h2 class="text-3xl font-bold">Gravité des accidents</h2>
          <p class="text-lg">
            Les routes sur lesquelles il se produit le plus d'accidents sont les
            voies communales et les routes départementales. Il y a beaucoup plus
            de blessé léger sur les voies communales, comme la vitesse est
            réduite en ville, les accidents sont moins graves. Cependant, il y a
            quand même plus de 9000 accidents qui ont nécéssité une
            hospitalisation sur route départementale et concernant le nombre de
            mort il est majoritaire sur ce type de route. Les routes
            départementales ne sont donc pas les routes avec le plus d'accidents
            mais celles avec les accidents les plus graves.
          </p>
        </div>
        <div class="h-96 w-3/4 flex-shrink-0 flex-grow">
          <BarRoute />
        </div>
      </div>

      <h2 class="mt-32 text-3xl font-bold">Conclusion</h2>
      <p class="mt-10 text-xl">
        Comme on a pu le voir à travers cette analyse, de manière globale, les
        accidents surviennent beaucoup dans les départements des métropoles de
        France et à plus forte raison dans la capitale. Ces accidents se
        produisent en majorité hors des intersections, entrainant des blessés
        légers en grande partie sur les voies communales et des blessés plus
        graves aussi bien sur les routes départementales que les voies
        communales.
      </p>
      <p class="mt-5 text-xl">
        Pour réduire les accidents à vélo et améliorer la sécurité routière, il
        faudrait donc concentrer les aménagements des infrastructures cyclables
        sur les voies communales et les routes départementales au abords des
        métropoles.
      </p>
    </div>
    <div
      class="mt-32 flex h-36 w-screen items-center justify-center bg-[#13503A] text-gray-100"
    >
      Analyse réalisé grâce à la
      <a
        href="https://www.data.gouv.fr/fr/datasets/bases-de-donnees-annuelles-des-accidents-corporels-de-la-circulation-routiere-annees-de-2005-a-2021/"
        >base de données des accidents corporels</a
      >
      impliquant une personne à vélo pour la période 2005 - 2017
    </div>
  </div>
</template>
