<template>
  <div class="data-base">
    <h2>database</h2>
    <hr>
    {{testMatch}}
    <hr>
    <ul>
      <li
        v-for="(match, index) in matches"
        :key="match.id+index"
        >
          {{match}}
        </li>
    </ul>

    <textarea v-model="newMatches"></textarea>
    <button
      class="btn"
      @click="saveData"
    >
      save data
    </button>
  </div>
</template>

<script>
  export default {
    name: 'Database',

    data(){
      return {
        matches: [],
        newMatches: null,
        testMatch: {
          id: 123,
          idMatch: '0QNEE3kC',
          idTournament: 'cx,mv12a',
          data: '21.06.1998',
          cover: 'grass'
        }
      }
    },

    methods:{
      saveData(){
        let response = JSON.parse(this.newMatches);

        let {idMatch, ...rest} = response;
        console.log(rest);
        console.log(idMatch);
        this.$db.collection("matches").doc(`${idMatch}`).set({
           ...rest
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

        this.newMatches = '';
      }
    },

    mounted(){
      this.$db.collection("matches").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc);
            this.matches.push(doc.data());
          });
      });
    }
  }
</script>

<style lang="scss" scoped>

</style>
