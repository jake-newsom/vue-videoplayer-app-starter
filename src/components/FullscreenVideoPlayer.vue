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
      console.log(`&&&& ${props.videoData.subtitle_url}`)
      console.log(`&&&& ${props.videoData.subtitle_langage}`)
      console.log(`&&&& ${JSON.stringify(props.videoData.subtitle_options)}`)
      if( props.videoData.subtitle_url != null && 
          props.videoData.subtitle_langage != null &&
          props.videoData.subtitle_options != null) {
        ret = await props.vpHook.initPlayer("fullscreen",props.videoData.url,"fullscreen","div",
              props.videoData.subtitle_url,props.videoData.subtitle_langage,
              props.videoData.subtitle_options);
      } else {
        ret = await props.vpHook.initPlayer("fullscreen",props.videoData.url,"fullscreen","div");
      }
        console.log(`ret : ${JSON.stringify(ret)}`)
    } 
    onMounted(async () => {
        await playVideo();
    });
  }
});
</script>