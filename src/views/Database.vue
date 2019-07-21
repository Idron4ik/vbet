<template>
  <div class="data-base">
    <h2>database</h2>
    <ul>
      <li 
        v-for="match in matches"
        :key="match.id"
        >
          {{match}}
        </li>
    </ul>

    <textarea v-model="newMatches"></textarea>
    {{newMatches}}
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
      }
    },

    methods:{
      saveData(){
        //   this.$db.collection("matches").add({
        //     title: "po[po",
        //     id: "3",
        // })
        // .then(function(docRef) {
        //     console.log("Document written with ID: ", docRef.id);
        // })
        // .catch(function(error) {
        //     console.error("Error adding document: ", error);
        // });
        this.$db.collection("matches").doc("LA").set({
            name: "Los Angeles sss",
            state: "CAss",
            country: "USA"
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

      }
    },

    mounted(){
      this.$db.collection("matches").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.matches.push(doc.data());
          });
      });
    }
  }
</script>

<style lang="scss" scoped>

</style>
