<template>
  <div id="fullscreen">
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  name: 'FullscreenVideoPlayer',
  props: ['vpHook','videoData'],
  setup(props) {
    let ret: any = {};
    const playVideo = async () => {
      var params = ["fullscreen",props.videoData.url,"fullscreen","div"];

      if( props.videoData.subtitle_url != null && 
          props.videoData.subtitle_langage != null) {
        params = [...params,props.videoData.subtitle_url,props.videoData.subtitle_langage];
      }
      if(props.videoData.subtitle_options != null) {
        params = [...params,props.videoData.subtitle_options];
      }
      ret = await props.vpHook.initPlayer(...params);
      console.log(`ret : ${JSON.stringify(ret)}`)
    } 
    onMounted(async () => {
        await playVideo();
    });
  }
});
</script>