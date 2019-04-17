<template>
  <div id="app">
    <v-app id="inspire">
      <v-card-text>
        <h1 class="text-md-center">Vue preferences sample</h1>
        <div class="source-code--container">
          <img :src="require('./assets/images/GitHub-Mark-64px.png')" class="github">
          <a
            href="https://www.github.com/streaver/vue-preferences"
            target="_blank"
            rel="noreferrer"
            class="source-code--link"
          >Check source code</a>
        </div>
      </v-card-text>
      <v-layout>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-img
              class="white--text"
              height="300px"
              :src="require('./assets/images/hands_pde.jpg')"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">5 Interesting facts about Uruguay</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>

            <v-layout wrap justify-space-between mt-4>
              <v-flex xs12 md6 align-end flexbox>
                <div>
                  <span>A collection of interesting facts about Uruguay</span>
                  <br>
                  <span>📷 Punta del Este, Maldonado, Uruguay.</span>
                  <br>
                  <span class="grey--text">Photo by Ernesto Velázquez, Unsplash</span>
                </div>
              </v-flex>

              <PersistantText/>
            </v-layout>

            <v-card-actions>
              <v-container fluid>
                <v-switch v-model="expandedContent" label="Expand content"></v-switch>
              </v-container>
            </v-card-actions>
          </v-card>

          <v-card style="margin-top: 30px;" v-show="expandedContent">
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex
                  v-for="card in cards"
                  :key="card.title"
                  v-bind="{ [`xs${card.flex}`]: true }"
                >
                  <v-card>
                    <v-img :src="card.src" class="card-image">
                      <v-container fill-height fluid pa-2>
                        <v-layout fill-height>
                          <v-flex xs12 align-end flexbox>
                            <span class="headline white--text" v-text="card.title"></span>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>

                    <v-card-text>{{card.caption}}</v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>

      <v-card-text>
        <span>
          made with ❤️ by
          <a href="https://www.streaver.com">Streaver.</a>
        </span>
      </v-card-text>
    </v-app>
  </div>
</template>

<script>
import PersistantText from "./components/PersistantText.vue";

export default {
  name: "app",
  components: {
    PersistantText
  },
  data() {
    return {
      expandedContent: false,
      cards: [
        {
          title:
            "The name Uruguay comes from the Uruguay River which means ‘river of the painted birds.",
          src: require("./assets/images/naranjales-salto.jpg"),
          caption:
            "The 'Uruguay' River starts in Brazil and ends in the Rio de la Plata Basin which forms the water border between Uruguay and Argentina. It measures about 1,838 kilometres (1,142 mi) in length.",
          flex: 12
        },
        {
          title:
            "Over half of the country’s 3.3 million people live in the capital, Montevideo.",
          src: require("./assets/images/pocitos-mdeo.jpg"),
          caption:
            "Approximately 80% of the population is urban, living in towns or cities. Uruguay is splited in 19 departments where Montevideo is the largest in population and the smallest in territory. It has only 176,215 km2 (68,037 sq mi) and the 1.5% is covered by water.",
          flex: 6
        },
        {
          title: "In Uruguay, cows outnumber people four to one.",
          src: require("./assets/images/ganado-young.jpg"),
          caption:
            'Uruguay is sometimes described as "one big farm". Our famous "parillas" (grills) are a common desire all over the world. You just need to taste it once, to love it for ever.',
          flex: 6
        },
        {
          title: "Uruguay has won the Soccer World Cup twice",
          src: require("./assets/images/uy-soccer-team.jpg"),
          caption:
            'Despite our size as a country and population, "la celeste" - as we call it, has won the Soccer World Cup twice: 1930 & 1950. We had organized and hold the first world cup and also invented the Olympic Lap.',
          flex: 6
        },
        {
          title:
            "The highest point in Uruguay is Cerro Catedral at just 514m (1,684ft) above sea level.",
          src: require("./assets/images/cerro-catedral.jpg"),
          caption:
            "We are a really flat country. Uruguay has flat plains on its eastern, southern, and western edges. The narrow Atlantic coastal plain is sandy and marshy, occasionally broken by shallow lagoons. The littorals of the Río de la Plata and the Río Uruguay are somewhat broader and merge more gradually into the hilly interior.",
          flex: 6
        }
      ]
    };
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.github {
  height: 25px;
}

.source-code--link {
  margin-left: 10px;
}

.source-code--container {
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: center;
}

.card-image {
  height: 300px;
}
</style>
