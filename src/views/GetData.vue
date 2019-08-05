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
          v-for="(match, index) in matches"
          :key="index"
        >
        <div class="match__away-player">
          {{match.awayPlayer}}
        </div>
        <div class="match__home-player">
          {{match.homePlayer}}
        </div>
        <time class="match__data">{{match.date}}</time>
        <div class="match__statistics">{{match.statistics}}</div>
        <div class="match__tournament">{{match.idTournament}}</div>
        <div class="match__cover">{{match.cover}}</div>
        <div class="match__city">{{match.city}}</div>
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
