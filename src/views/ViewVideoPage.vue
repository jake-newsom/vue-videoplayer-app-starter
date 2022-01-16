<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
            <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title>View Video</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">View Video</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content
          pullingIcon=""
          pullingText=""
          refreshingSpinner="circles"
          refreshingText=""
        ></ion-refresher-content>
      </ion-refresher>    
      <div id="view-video-container">
        <ion-grid>
          <ion-row>
            <ion-col>
              <span class="content-publish-date secondary-label">
                {{ prettyPublishedAt }}
              </span>
              <h2 class="selectable">{{ content.title }}</h2>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col
              v-html="content.description"
              id="content"
              class="selectable"
            ></ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-button @click="playVideo()" expand="block">
                <ion-icon :icon="playCircleOutline" slot="start"></ion-icon>
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div v-if="isClicked">
          <FullscreenVideoPlayer :vpHook="vpHook" :videoData="content"></FullscreenVideoPlayer>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons,
IonBackButton, IonGrid, IonRow, IonCol, IonButton, IonIcon,
IonRefresher, IonRefresherContent} from '@ionic/vue';
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { VideoModel } from '../interfaces/interfaces';
import ApiService from '../services/api.services';
import { useVideoPlayer ,VideoPlayerHook, VideoPlayerProps, VideoPlayerOuput } from '../composables/videoplayer';
import { playCircleOutline } from "ionicons/icons";
import FullscreenVideoPlayer from '@/components/FullscreenVideoPlayer.vue';
import { useState } from '@/composables/state';

export default defineComponent({
  name: 'ViewVideo',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    IonRefresher,
    IonRefresherContent,
    FullscreenVideoPlayer
},
  setup () {
    const apiService = new ApiService();
    const onVPEvents: VideoPlayerProps = {} as VideoPlayerProps;
    const [isClicked, setIsClicked] = useState(false);

    const playerLeave = async () => {
      await vpHook.removeListeners();
      await vpHook.stopAllPlayers();
      setIsClicked(false);
    }
    onVPEvents.onPlay = async (fromPlayerId: string, currentTime: number | undefined) => {
        console.log(`<<<< onPlay in ViewVideo ${fromPlayerId} ct: ${currentTime}`);
    }
    onVPEvents.onPause = async (fromPlayerId: string, currentTime: number | undefined) => {
        console.log(`<<<< onPause in ViewVideo ${fromPlayerId} ct: ${currentTime}`)
    }
    onVPEvents.onEnded = async (fromPlayerId: string, currentTime: number | undefined) => {
        console.log(`<<<< onEnded in ViewVideo ${fromPlayerId} ct: ${currentTime}`)
        await playerLeave();
    }
    onVPEvents.onExit = async (dismiss: boolean) => {
        console.log(`<<<< onExit in ViewVideo ${dismiss}`)
        await playerLeave();
    }
    onVPEvents.onReady= async (fromPlayerId: string, currentTime: number | undefined) => {
        console.log(`<<<< onReady in ViewVideo ${fromPlayerId} ct: ${currentTime}`)
    }
    const vpHook: VideoPlayerHook = useVideoPlayer(onVPEvents);
    const route = useRoute();
    const content = ref({} as VideoModel);
    const contentId  = ref(route.params.contentId);
    const getContent = async () => {
        const response = await apiService.get(contentId);
        if ("content" in response) {
            content.value = response.content;
        } else {
            console.log("Failed to load content");
        }    
    }
    onMounted(async () => {
        await getContent();
    });

    return {getContent, content, vpHook, playCircleOutline, isClicked, setIsClicked};
  },
  computed: {
    prettyPublishedAt() {
      const strDate: string = this.content.published_at;
      const d = new Date(strDate);
      return d.toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      
    },
  },
  methods: {

    async playVideo() {
        this.setIsClicked(true);
    },
    async doRefresh(event: { target: { complete: () => void; }; }) {
      await this.getContent();
      event.target.complete();
    },

  }
});
</script>
<style scoped>
    #home-container {
    text-align: center;
    
    position: absolute;
    left: 0;
    right: 0;
    top: 5%;
    }
</style>