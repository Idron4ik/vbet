<template>
  <div class="data-base">
    <v-tabs
        v-model="tab"
        background-color="transparent"
    >
      <v-tab
              v-for="item in items"
              :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
          <v-text-field
                  label="New ids"
                  solo
                  v-model="newIds"
          ></v-text-field>

          <v-btn color="primary" @click="checkIds">Check ID`s</v-btn>

          <p v-if="checkedIds.length > 0">{{checkedIds}}</p>
      </v-tab-item>


      <v-tab-item>
        <v-textarea
            v-model="newMatches"
            solo
            label="Matches data"
        ></v-textarea>

        <v-btn color="primary" @click="saveData">save data</v-btn>

      </v-tab-item>

    </v-tabs-items>


  </div>
</template>

<script>
  export default {
    name: 'Database',

    data(){
      return {
        newIds: null,
        matchesId: [],
        checkedIds: [],
        matches: [],
        newMatches: null,
        testMatch: {
          "8fPZCIB5": {
            "statistics": [
              [
                "9",
                "Подачи навылет",
                "13"
              ],
              [
                "4",
                "Двойные ошибки",
                "3"
              ],
              [
                "64%",
                "% первой подачи",
                "54%"
              ],
              [
                "83% (35/42)",
                "Очки выигр. на п.п.",
                "82% (32/39)"
              ],
              [
                "79% (19/24)",
                "Очки выигр. на в.п.",
                "61% (20/33)"
              ],
              [
                "0% (0/0)",
                "Спасенные брейкпоинты",
                "50% (1/2)"
              ],
              [
                "18% (7/39)",
                "Очки выигр. с п.п.",
                "17% (7/42)"
              ],
              [
                "30% (10/33)",
                "Очки выигр. со в.п.",
                "4% (1/24)"
              ],
              [
                "50% (1/2)",
                "Реализованные брейкпойнты",
                "0% (0/0)"
              ],
              [
                "6",
                "Очки выигр. подряд",
                "5"
              ],
              [
                "82% (54/66)",
                "Выиграно на подаче",
                "72% (52/72)"
              ],
              [
                "28% (20/72)",
                "Выиграно на приеме",
                "18% (12/66)"
              ],
              [
                "54% (74/138)",
                "Всего выигранных очков",
                "46% (64/138)"
              ],
              [
                "3",
                "Геймы выигр. подряд",
                "1"
              ],
              [
                "100% (12/12)",
                "Геймы выигр. на с.п.",
                "92% (11/12)"
              ],
              [
                "8% (1/12)",
                "Геймы выигр. на приеме",
                "0% (0/12)"
              ],
              [
                "54% (13/24)",
                "Всего выигранных геймов",
                "46% (11/24)"
              ]
            ],
            "courseMatch": [
              [
                " \tКлан Б. (Сша)\t2\t77\t7\t \t \t \t "
              ],
              [
                " \tКопил M. (Рум)\t0\t63\t5\t \t \t \t "
              ]
            ],
            "homePlayer": {
              "name": "Клан Б",
              "atp": "94",
              "id": "tpwrq93s"
            },
            "awayPlayer": {
              "name": "Копил M",
              "atp": "84",
              "id": "zgkCPwGs"
            },
            "city": "ATP - ОДИНОЧНЫЙ РАЗРЯД: Атланта (США)",
            "cover": " хард ",
            "date": "2019-08-22T21:00:00.000Z"
          },
          "8fPZCIB2": {
            "statistics": [
              [
                "91",
                "Подачи навылет",
                "13"
              ],
              [
                "4",
                "Двойные ошибки",
                "3"
              ],
              [
                "64%",
                "% первой подачи",
                "54%"
              ],
              [
                "83% (35/42)",
                "Очки выигр. на п.п.",
                "82% (32/39)"
              ],
              [
                "79% (19/24)",
                "Очки выигр. на в.п.",
                "61% (20/33)"
              ],
              [
                "0% (0/0)",
                "Спасенные брейкпоинты",
                "50% (1/2)"
              ],
              [
                "18% (7/39)",
                "Очки выигр. с п.п.",
                "17% (7/42)"
              ],
              [
                "30% (10/33)",
                "Очки выигр. со в.п.",
                "4% (1/24)"
              ],
              [
                "50% (1/2)",
                "Реализованные брейкпойнты",
                "0% (0/0)"
              ],
              [
                "6",
                "Очки выигр. подряд",
                "5"
              ],
              [
                "82% (54/66)",
                "Выиграно на подаче",
                "72% (52/72)"
              ],
              [
                "28% (20/72)",
                "Выиграно на приеме",
                "18% (12/66)"
              ],
              [
                "54% (74/138)",
                "Всего выигранных очков",
                "46% (64/138)"
              ],
              [
                "3",
                "Геймы выигр. подряд",
                "1"
              ],
              [
                "100% (12/12)",
                "Геймы выигр. на с.п.",
                "92% (11/12)"
              ],
              [
                "8% (1/12)",
                "Геймы выигр. на приеме",
                "0% (0/12)"
              ],
              [
                "54% (13/24)",
                "Всего выигранных геймов",
                "46% (11/24)"
              ]
            ],
            "courseMatch": [
              [
                " \tКлан Б. (Сша)\t2\t77\t7\t \t \t \t "
              ],
              [
                " \tКопил M. (Рум)\t0\t63\t5\t \t \t \t "
              ]
            ],
            "homePlayer": {
              "name": "Клан Б 1",
              "atp": "94",
              "id": "tpwrq93s"
            },
            "awayPlayer": {
              "name": "Копил M1",
              "atp": "84",
              "id": "zgkCPwGs"
            },
            "city": "ATP - ОДИНОЧНЫЙ РАЗРЯД: Атланта (США)",
            "cover": " хард ",
            "date": "2019-08-22T21:00:00.000Z"
          }
        },
        tab: null,
        items: ['Check new Id', 'Add Data'],
      }
    },

    methods:{
      saveData(){
        let response = JSON.parse(this.newMatches);
        Object.keys(response).forEach((idMatch)=>{
        console.log(Object.assign({}, response[idMatch].statistics));

          this.$db.collection("matches").doc(`${idMatch}`).set({
            awayPlayer: response[idMatch].awayPlayer,
            homePlayer: response[idMatch].homePlayer,
            // idTournament: response[idMatch].idTournament,
            date: response[idMatch].date,
            statistics: Object.assign({}, response[idMatch].statistics),
            courseMatch: Object.assign({}, response[idMatch].courseMatch),
            cover: response[idMatch].cover,
            city: response[idMatch].city,
          })
          .then(function() {
              console.log("Document successfully written!");
          })
          .catch(function(error) {
              console.error("Error writing document: ", error);
          });
            // this.$db.collection("matches").doc(`${idMatch}`).set(response[idMatch]);
        });



        this.newMatches = '';
      },

      checkIds(){
        let newIds = JSON.parse(this.newIds);

        this.$db.collection("matches").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.matchesId.push(doc.id);
          });

          newIds = newIds.filter(( el ) =>{
            return !this.matchesId.includes( el );
          } );
          this.checkedIds = newIds;
        });


      }
    },
  }
</script>

<style lang="scss" scoped>
  .theme--light.v-tabs-items{
    background-color: transparent;
    padding: 10px 0;
  }
</style>
