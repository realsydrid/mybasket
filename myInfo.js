const userId=document.getElementById('userId').innerText
const loadData = async function () {
    try {
        const res = await fetch(`${userId}UserInfo.json`)
        const userInfo= await res.json();
        console.log(userInfo);
        const infoMain=document.getElementById('infoMain');
        
        for(let key in userInfo){
            let tr=document.querySelector(`.${key}`)
            let td=tr.querySelector('.data')
            if(key == 'married'){
                if(userInfo[key]==false){
                    td.innerText='미혼'
                }else{
                    td.innerText='기혼'
                }
            }else{
                td.innerText=`${userInfo[key]}`
            }
            
        }
        const basketUrl=document.getElementById('basketUrl')
        basketUrl.href=`https://realsydrid.github.io/mybasket/${userId}MyBaskets.html`
        
    } catch(error){
        console.log('정보불러오기에 실패했습니다.');
    }
}

loadData();
