

//project
//1.로그인 유저 ajax로 불러오기(동시에 상품 리스트)
//2.그 유저의 장바구니목록 불러오기

const loadData = async function () {
    let resArr = await Promise.all([
        fetch('./loginUser.json'),
        fetch('./recommend_products.json')
    ]);
    let objArr = await Promise.all([
        resArr[0].json(),
        resArr[1].json()
    ])
    const loginUser = objArr[0];
    const products = objArr[1];
    //baskets?user_id=isy; =>isyBaskets.json
    let res3 = await fetch(`./${loginUser['user_id']}Baskets.json`);
    let userBaskets = await res3.json()
    printBaskets(userBaskets);
    printProducts(products);
}
loadData();
const printBaskets = (userBaskets) => {
    const basketTrEx = document.getElementById('basketTrEx');
    const basketCont = document.getElementById('basketCont');
    let basketsList = userBaskets['baskets']
    basketCont.innerHTML = ''
    basketsList.forEach((basket) => {
        let tr = basketTrEx.cloneNode(true);
        tr.removeAttribute('id');
        basketCont.append(tr);
        for (let key in basket) {
            let td = tr.querySelector('#productInfo');
            let span = td.querySelector(`.${key}`)
            if (span) {
                span.innerText = basket[key]
            }
        }
        let img = tr.querySelector('#productImg')
        img.src = basket['img[src]']
    });
}

const printProducts = (products) => {
    console.log(products);
    const productTrEx = document.getElementById('productTrEx');
    const productCont = document.getElementById('productCont')
    productCont.innerHTML = ''
    products.forEach((product) => {
        let tr = productTrEx.cloneNode(true);
        tr.removeAttribute('id');
        productCont.append(tr);
        for (let key in product) {
            let td = tr.querySelector('#itemInfo')
            let span = td.querySelector(`.${key}`);
            if (span) {
                span.innerText = product[key]
            }
        }
        let img = tr.querySelector('#itemImg')
        img.src = product['img[src]']
    })

}



