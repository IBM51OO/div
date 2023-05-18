<template>
    <div class="score-bar" v-if="bestScore != undefined">
        <div class="score-bar__stages">
            <div class="stage" 
                    v-for="(stage, index) in modifiedStages" 
                    :key="stage.id" 
                    :style="{left: `${delimiterPosition(stage.thresholdPoints)}%`}"
                >
                <div class="stage__delimiter"
                    v-if="stage.thresholdPoints"
                    :class="{'stage_reached': bestScore >= stage.thresholdPoints}"
                >
                    
                    <AchivementIcon class="achivement" v-if="stages.length === index"/>
                    <StarIcon class="star" v-else />

                </div>
                <div class="stage__threshold-points">
                    <span>
                        {{ stage.thresholdPoints }} 
                    </span>
                    <span 
                        v-if="stage.thresholdPoints && 
                        bestScore > stage.thresholdPoints"
                    >
                        / {{ stage.thresholdPoints }}
                    </span>
                </div>
            </div>
        </div>
        <div class="score-bar__progress" :style="{width: `${bestScore}%`}"></div>
    </div>
</template>
<script lang="ts" setup>
import User, { Game, Stage } from "~/store/user/IUserStore"
import StarIcon from "@/components/icons/StarIcon.vue";
import AchivementIcon from "@/components/icons/AchivementIcon.vue";
import { useUser } from "@/store/user/userStore";

const userStore = useUser();
await userStore.fetchUserScore();

const stages = ref<Stage[]>([]);
const modifiedStages = ref<Stage[] | undefined>();
const firstStage = <Stage[]>(
[{
    name: 'zeroStage',
    id: 0,
    thresholdPoints: 0,
    games: []
}])
const userScore = computed(() => userStore.getUserScore)

stages.value = userScore.value as Stage[]

modifiedStages.value = [...firstStage, ...stages.value];

const bestScore = stagesBestScore(modifiedStages.value)

function stagesBestScore(modifiedStages: Stage[] | undefined)
{
    if(modifiedStages)
    {
        let bestScore = 0;
        for(let i = 1; i < modifiedStages.length; i++)
        {
            let currentThreholdPoints = modifiedStages[i].thresholdPoints;
            
            for(let j = 0; j < modifiedStages[i].games.length; j++)
            {
                if(modifiedStages[i].games[j].isPlayed)
                {
                    bestScore += modifiedStages[i].games[j].bestResult
                }
            }
            
            if(bestScore >= currentThreholdPoints)
            {   
                bestScore = currentThreholdPoints;
            }
            else
            {
                return bestScore
            }
        }
        return bestScore
    }
}

function delimiterPosition(stageNum: number)
{
    return ((stageNum / stages.value[stages.value.length - 1].thresholdPoints) * 100)
}


</script>
<style lang="scss">
.score-bar
{
    margin-top: 50px;
    width: 100%;
    height: 40px;
    position: relative;

    border-radius: 30px;
    background: rgba($color: $div-grey, $alpha: 0.6);
    .stage
    {
        font-family: 'Inter';
        &:first-child
        {
            .stage__threshold-points
            {
               left: 10px;
            }
        }
        &:last-child
        {
            .stage__threshold-points
            {
                // position: absolute;
               right: 10px;
            }
            .stage__delimiter
            {
                background: none;
            }
        }
        height: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        position: absolute;
        .score-bar__delimiter
        {
            height: 100%;
            position: absolute;
            width: 2px;
            background: #000;
        }
        .stage__threshold-points
        {
            display: flex;
            white-space: pre;
            font-size: 14px;
            color: rgba($color: #000000, $alpha: 0.5);
            position: absolute;
            bottom: -30px;
        }
        .stage__delimiter
        {
            position: relative;
            z-index: 2;
            height: 100%;
            width: 1px;
            background: rgba($color: #000000, $alpha: 0.2);
            .star
            {
                position: absolute;
                top: -30px;
                left: -50%;
                transform: translate(-50%, 0);
            }
            .achivement
            {
                position: absolute;
                top: -30px;
                right: 0;
            }
        }
        .stage_reached
        {
            background: #000;
            .star
            {
                fill: $div-starBlue;
            }
        }

    }
    .score-bar__progress
    {
        border-radius: 30px;
        position: absolute;
        height: 40px;
        max-width: 1440px;
        width: 100px;
        transition: 500ms all ease-in-out;
        background: $div-starBlue;
    }
}
</style>