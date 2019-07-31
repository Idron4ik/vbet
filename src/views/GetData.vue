<template>
    <div>
      <v-text-field
          label="Enter id player"
          v-model="idPlayer"
      />
      <v-btn @click="loadMatches">load</v-btn>

      <div
        class="matches__container"
        v-if="matches.length > 0"
      >
        <div
          class="matches__item"
          v-for="match in matches"
        >
          {{match}}
          <!--{{match.homePlayer.name}}-->
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'Getdata',

      data(){
        return {
          idPlayer: 'AZg49Et9',
          matches: [],
        }
      },

      methods:{
        loadMatches(){
          console.log(this.idPlayer);
          let matchesRef = this.$db.collection("matches");
          matchesRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if(doc.data().homePlayer.id === this.idPlayer || doc.data().awayPlayer.id === this.idPlayer){
                matchesRef.doc(doc.id).get().then((item)=>{
                  this.matches.push(item.data());

                });
              }
            });

          });

        }
      }
    }
</script>

<style scoped>

</style>
