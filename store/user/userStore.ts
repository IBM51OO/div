import { defineStore } from "pinia";
import {Stage} from "@/store/user/IUserStore";
import api from "~/api/api";

interface UserState {
  userScore: Stage[] | null,
}
export const useUser = defineStore('user', { 
    state: (): UserState  => 
    ({
        userScore: []
    }),
    getters: 
    {
        getUserScore(): Stage[] | null
        {
            return this.userScore;
        }
    },
    actions: 
    {
        setUserScore(stages: Stage[])
        {
            this.userScore = stages
        },
        async fetchUserScore()
        {
            const response = (await api.userRepository.getUserScore())?.stages as Stage[];
            this.setUserScore(response)            
        }
    }
})