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
    setEventListeners(userBaskets);
    printTotal(userBaskets);
}

const setEventListeners = () => {
    const basketCont = document.getElementById('basketCont');

    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const getTotalBasketCount = () => document.querySelectorAll('.basketSelect').length;
    const totalBasketCount = document.querySelectorAll('.basketSelect').length;

    const updateSelectCount = () => {
        const selectedCount = basketCont.querySelectorAll('.basketSelect:checked').length;
        const totalBasketCount = getTotalBasketCount();
        totalSelectCount.innerText = `( ${selectedCount} / ${totalBasketCount} )`;
        selectAllCheckbox.checked = (selectedCount === totalBasketCount);
    };

    basketCont.addEventListener('change', (e) => {
        if (e.target.classList.contains('basketSelect')) {
            updateSelectCount();
        }
        printTotal()
    });

    selectAllCheckbox.addEventListener('change', () => {
        const isChecked = selectAllCheckbox.checked;
        const checkboxes = basketCont.querySelectorAll('.basketSelect');
        checkboxes.forEach(checkbox => { checkbox.checked = isChecked; });
        updateSelectCount();
        printTotal()
    });

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

    basketCont.addEventListener('click', (e) => {
        if (e.target.className !== 'deleteBtn') { return; }
        let tr = e.target.closest('tr')        
        let titleSpan = tr.querySelector('.title');
        const index = userBaskets.baskets.findIndex(item => item.title === titleSpan.innerText);
        if (index !== -1) {
            userBaskets.baskets.splice(index, 1);
        }
        tr.remove();
        printTotal();
        updateSelectCount();
    });

    const selectedDeleteBtn = document.getElementById('selectedDeleteBtn')
    selectedDeleteBtn.addEventListener('click', () => {
        let checkedboxes = basketCont.querySelectorAll('.basketSelect:checked')
        checkedboxes.forEach(checkedbox => {
            let tr = checkedbox.closest('tr')
            let titleSpan = tr.querySelector('.title');            
            const index = userBaskets.baskets.findIndex(item => item.title === titleSpan.innerText);
        if (index !== -1) {
            userBaskets.baskets.splice(index, 1);
        }
        tr.remove();
        });
        printTotal();
        updateSelectCount();
    })
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
        printArrive(tr);
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
    let baskets = userBaskets.baskets
    const basketCont = document.getElementById('basketCont');
    priceSum = 0
    let checkedboxes = basketCont.querySelectorAll('.basketSelect:checked')
    checkedboxes.forEach(checkedbox => {
        let tr = checkedbox.closest('tr')
        let priceText = tr.querySelector('.price').innerText
        let price = priceText.replace(/,/g, '');
        priceSum += parseInt(price)
    });
    let priceSumText = document.getElementById('priceSum');
    let priceTotal = document.getElementById('priceTotal');
    priceSumText.innerHTML = `${priceSum.toLocaleString()}<span>원</span>`;
    priceTotal.innerHTML = `${priceSum.toLocaleString()}<span>원</span>`;
}

function printArrive(tr) {
    let arriveDay = tr.querySelector('.arriveDateDay')
    let arriveDate = tr.querySelector('.arriveDateDate')
    let today = new Date();
    let tommorow = new Date(today.setDate(today.getDate() + 1));
    let week = ["월", "화", "수", "목", "금", "토", "일"];
    arriveDay.innerText = "(" + week[tommorow.getDay()] + ")";
    arriveDate.innerText = `${tommorow.getMonth() + 1}` + "/" + tommorow.getDate();

}
loadData();


