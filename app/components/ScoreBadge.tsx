const ScoreBadge =({score} : {score : number})=>{

    let badgeColor ='';
    let badgeText ='';

    if(score > 70){
        badgeColor = 'bg-badge-green text-green-700';
        badgeText = 'Strong'        
    }else if(score > 49){
        badgeColor = 'bg-badge-yellow text-yellow-500';
        badgeText = 'Good Start'
    }else{
        badgeText = 'bg-badge-red text-red=700'
        badgeText = 'Needs Improvement'
    }

    return (
        <div className={`px-3 py-1 rounded-full ${badgeColor}`} >
            <p className="text-sm font-medium">
                {badgeText}
            </p>
        </div>
    )
}
export default ScoreBadge;