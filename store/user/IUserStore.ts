interface User 
{
    stages: Stage[]
    
}
interface Game
{
    name: string,
    bestResult: number,
    isPlayed: boolean
}
interface Stage 
{
    id: number,
    name: string,
    thresholdPoints: number,
    games: Game[]
}
export default User;
export { User, Stage, Game };