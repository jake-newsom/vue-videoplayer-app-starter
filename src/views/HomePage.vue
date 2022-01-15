<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Home</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="home-container">
        <ion-list>
          <ion-item>
            <ion-button  @click="() => router.push('/viewvideo/0')">MP4 video</ion-button>
          </ion-item>
          <ion-item>
            <ion-button  @click="() => router.push('/viewvideo/1')">HLS video</ion-button>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonButton
  },
  setup() {
    const router = useRouter();    
    return {router}
  },
});
</script>

<style scoped>
#home-container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 15%;
}

#home-container strong {
  font-size: 20px;
  line-height: 26px;
}

#home-container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#home-container a {
  text-decoration: none;
}
</style>