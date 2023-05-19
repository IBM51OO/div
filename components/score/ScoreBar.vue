<template>
    <div class="score-bar" v-if="stages.length">
        <div class="score-bar__stages">
            <div class="stage" 
                    v-for="(stage, index) in stages" 
                    :key="stage.id" 
                    :style="{left: `${delimiterPosition(index)}%`, width:`${1 / stages.length * 100}%`}"
                >
                
                <div class="score-bar__progress" :style="{width: `${progressBarWidth(stage, index)}%`}">

                </div>
                <div class="stage__delimiter"
                    v-if="stage.thresholdPoints"
                    :class="{'stage_reached': lastAchivedStagePoints >= stage.thresholdPoints}"
                >
                    
                    <AchivementIcon class="achivement" v-if="stages.length - 1 === index"/>
                    <StarIcon class="star" v-else />

                </div>
                <div class="stage__threshold-points">
                    <span v-if="lastAchivedStage && lastAchivedStagePoints === stage.thresholdPoints && lastAchivedStage === index">
                    {{ scoreDiv(stage) }} /
                    </span>
                    <span>
                        {{ stage.thresholdPoints }} 
                    </span>
                </div>
            </div>
        </div>
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

const userScore = computed(() => userStore.getUserScore)

stages.value = userScore.value as Stage[]

const lastAchivedStagePoints = ref(0);
const lastAchivedStage = ref<Number | null>(null);

function scoreDiv(stage: Stage)
{
    const currentScoreResult = currentScore(stage)

    if(currentScoreResult > stage.thresholdPoints)
    {
        return stage.thresholdPoints
    }
    else
    {
        return currentScoreResult
    }
}
function currentScore(stage: Stage)
{
    let currentScoreResult = 0;
    stage.games.forEach(element => 
    {
        if(element.isPlayed)
        {
            currentScoreResult += element.bestResult
        }
    });
    return currentScoreResult;
}

function progressBarWidth(stage: Stage, index: number)
{
    if(lastAchivedStage.value === null)
    {
        const scoreSum = currentScore(stage);
        
        if(scoreSum >= stage.thresholdPoints)
        {
            if(index === stages.value.length - 1)
            {
                lastAchivedStage.value = index
            }
            lastAchivedStagePoints.value = stage.thresholdPoints;

            return 100
        }
        
        
        else if(scoreSum <= stage.thresholdPoints)
        {
            lastAchivedStage.value = index
            return scoreSum / stage.thresholdPoints * 100;
        }
    }
}
function delimiterPosition(index: number)
{
    return ((index / stages.value.length) * 100)
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
        
        height: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: right;
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
            transform: translate(50%, 0);
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
        &:first-child
        {
            .score-bar__progress::before
            {
                font-family: 'Inter';
                color: rgba(0, 0, 0, 0.5);
                font-size: 14px;
                content: "0";
                left: 10px;
                position: absolute;
                bottom: -30px;
            }
            .score-bar__progress
            {
                border-radius: 30px 0 0 30px;
            }   
        }
        &:last-child
        {
            .score-bar__progress
            {
                border-radius: 0 30px 30px 0;
            } 
            .stage__threshold-points
            {
                // position: absolute;
                transform: translate(0,0);
                right: 10px;
            }
            .stage__delimiter
            {
                background: none;
            }
        }

    }
    .score-bar__progress
    {
        position: absolute;
        height: 40px;
        left: 0;
        transition: 500ms all ease-in-out;
        background: $div-starBlue;
    }
    .score-bar__progress_full
    {
        width: 100%;
    }
}
</style>