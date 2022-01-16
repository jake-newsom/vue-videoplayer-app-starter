import videoList from '../../public/assets/json/videolist.json';
import { VideoModel } from '../interfaces/interfaces';
import {Ref} from 'vue';

export default class ApiService {
    videoList: VideoModel[] = videoList.videoList;
    public async get(contentId: Ref<string | string[]>): Promise<any>{
        const index = Number(contentId.value);
        if(index <= this.videoList.length) {
            return Promise.resolve({content: this.videoList[index]});        
        } else {
            return Promise.resolve({});
        }
    }
}