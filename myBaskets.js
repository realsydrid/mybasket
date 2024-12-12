let userBaskets;

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
    let res3 = await fetch(`./${loginUser['user_id']}Baskets.json`);
    userBaskets = await res3.json()
    printBaskets(userBaskets);
    printProducts(products);
    setEventListeners();   
    printTotal();
}

const setEventListeners = () => {
    const basketCont = document.getElementById('basketCont');

    basketCont.addEventListener('click', (e) => {
        if (!e.target.className.includes('cnt')) { return; }
        const tr = e.target.closest('tr');
        const priceSpan = tr.querySelector('.price');
        const titleSpan = tr.querySelector('.title');
        const basket = userBaskets.baskets.find(item => item.title === titleSpan.innerText);
        let currentValue = Number(tr.querySelector('.cnt').value);
        if (e.target.className === 'cntPlusBtn') {
            currentValue++;
        } else if (e.target.className === 'cntMinusBtn' && currentValue > 1) {
            currentValue--;
        }
        tr.querySelector('.cnt').value = currentValue;
        priceSpan.innerText = (basket.price * currentValue).toLocaleString();
        printTotal()
    });

    basketCont.addEventListener('change', (e) => {
        if (e.target.className !== 'cnt') { return; }
        const tr = e.target.closest('tr');
        const priceSpan = tr.querySelector('.price');
        const titleSpan = tr.querySelector('.title');
        const basket = userBaskets.baskets.find(item => item.title === titleSpan.innerText);
        let currentValue = e.target.value.replace(/[^0-9]/g, '');
        if (!currentValue || currentValue === '0') {
            currentValue = 1;
        } else {
            currentValue = Math.min(Number(currentValue), 999);
        }
        e.target.value = currentValue;
        priceSpan.innerText = (basket.price * currentValue).toLocaleString();
        printTotal()
    });

    basketCont.addEventListener('input', (e) => {
        if (e.target.className !== 'cnt') { return; }
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        if (e.target.value.startsWith('0')) {
            e.target.value = e.target.value.replace(/^0+/, '');
        }
    });
}




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
            let input = td.querySelector('.cnt')
            let priceSpan = tr.querySelector('.price');
            priceSpan.innerText = (basket.price * input.value).toLocaleString()
            if (key == 'cnt') {
                input.value = basket[key]
            } else if (key != 'price') {
                if (span) {
                    span.innerText = basket[key]
                }
            }
        }
        let img = tr.querySelector('#productImg')
        img.src = basket['img[src]']
    });
}


const printProducts = (products) => {
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
            if (key == 'price') {
                if (span) {
                    span.innerText = product[key].toLocaleString()
                }
            } else {
                if (span) {
                    span.innerText = product[key]
                }
            }
        }
        let img = tr.querySelector('#itemImg')
        img.src = product['img[src]']
    })

}

function printTotal() {
    let basketCont = document.getElementById('basketCont');
    let prodcutInfo = basketCont.querySelectorAll('.prodcutInfo');
    prodcutInfoArr = Array.from(prodcutInfo);
    let priceSum = document.getElementById('priceSum')
    let priceTotal=document.getElementById('priceTotal')
    let totalPriceSum = 0
    prodcutInfoArr.forEach(product => {
        const titleSpan = product.querySelector('.title');

        const basket = userBaskets.baskets.find(item => item.title === titleSpan.innerText);
        let price=basket.price
        let cnt = product.querySelector('.cnt').value
        let totalPrice = parseInt(price) * parseInt(cnt)                
        totalPriceSum=totalPriceSum+totalPrice
    });
    priceSum.innerText=totalPriceSum.toLocaleString()    
    priceTotal.innerHTML=`${totalPriceSum.toLocaleString()}<span>원</span>`
    
}
loadData();


