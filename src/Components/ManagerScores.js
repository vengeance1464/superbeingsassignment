export default function ManagerScores({scores,totalManagers}) {
    
    const getColorClass=(score)=>{
        
        let className="label "
        score= parseInt(score)
        console.log(score)

        if(score>=0&&score<1)
        {
            className+="light-red"
        }

        if(score>=2&&score<3)
        {
            className+="yellow";
            return className
        }

        if(score>=3&&score<4)
        {
            className+="yellow-green"
        }


        if(score>=1&&score<2)
        {
            className+="red"
              return className
        }

        if(score>=4&&score<=5)
        {
            className+="green"
            return className
        }

      return className
    }
    const aggregatedScore=((Object.values(scores).reduce((sum,element)=>sum+(element.score/element.length),0)).toFixed(2)/totalManagers).toFixed(2)
    return (
        <> 
        {
            
            Object.values(scores).map(element=><div className={getColorClass((element.score/element.length).toFixed(2))}>{(element.score/element.length).toFixed(2)}</div>)
        }
         <div className={getColorClass(aggregatedScore)}>{ aggregatedScore}</div>  
         </>
    )
}
