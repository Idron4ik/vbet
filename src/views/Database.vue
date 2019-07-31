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
            // if(doc.data().homePlayer.id === 'AZg49Et9' || doc.data().awayPlayer.id === 'AZg49Et9'){
            //   console.log(doc.id);
            // }
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
