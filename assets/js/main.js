/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== HOME SWIPER ===============*/
let homeSwiper = new Swiper(".home-swiper", {
    spaceBetween: 30,
    loop: 'true',
    grabCursor: 'true',

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
})

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
    centeredSlides: true,
    slidesPerView: "auto",
    loop: 'true',
    spaceBetween: 16,
    grabCursor: true,
});



/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 460 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 460) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal(`.home-swiper, .new-swiper, .newsletter__container`)
sr.reveal(`.category__data, .trick__content, .footer__content`, { interval: 100 })
sr.reveal(`.about__data, .discount__img`, { origin: 'left' })
sr.reveal(`.about__img, .discount__data`, { origin: 'right' })


const searchBtn = document.querySelector('#search-button'),
    searchWindow = document.querySelector('.search');

searchBtn.onclick = function () {
    searchWindow.classList.toggle('active')
    shopWindow.classList.remove('active')
}

const shopBtn = document.querySelector('#shop-button'),
    shopWindow = document.querySelector('.basket'),
    shopClose = document.querySelector('.basket__close')
    

shopBtn.onclick = function () {
    searchWindow.classList.remove('active')
    shopWindow.classList.toggle('active')

}

shopClose.onclick = function () {
    shopWindow.classList.remove('active')
}

const product = {
    toffee: {
        name: 'Toffee',
        price: 11.99,
        amount: 0,
        img: 'assets/img/trick-treat1-img.png',
        get totalSum() {
            return this.price * this.amount;
        }
    },
    bone: {
        name: 'Bone',
        price: 8.99,
        amount: 0,
        img: 'assets/img/trick-treat2-img.png',
        get totalSum() {
            return this.price * this.amount;
        }
    },
    scraecrow: {
        name: 'Scraecrow',
        price: 15.99,
        amount: 0,
        img: 'assets/img/trick-treat3-img.png',
        get totalSum() {
            return this.price * this.amount;
        }
    },
    candy: {
        name: 'Candy',
        price: 7.99,
        amount: 0,
        img: 'assets/img/trick-treat4-img.png',
        get totalSum() {
            return this.price * this.amount;
        }
    },
    pumpkin: {
        name: 'Pumpkin',
        price: 19.99,
        amount: 0,
        img: 'assets/img/trick-treat5-img.png',
        get totalSum() {
            return this.price * this.amount;
        }
    },
    ghost: {
        name: 'Ghost',
        price: 17.99,
        amount: 0,
        img: 'assets/img/trick-treat6-img.png',
        get totalSum() {
            return this.price * this.amount;
        }
    },
};

const
    otherProductBtns = document.querySelectorAll('.new__button'),
    productBtns = document.querySelectorAll('.trick__button'),
    basketIndicator = document.querySelector('.sidebar__indicator'),
    basketChecklist = document.querySelector('.basket__center'),
    basketTotalPrice = document.querySelector('.basket__price'),
    basketPrint = document.querySelector('.basket__buy'),
    clearBtn = document.querySelector('.basket__reset'),
    printChecklist = document.querySelector('.print__body'),
    printTotalSum = document.querySelector('.print__footer');


productBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        plusOrMinus(this)
    })
})

function plusOrMinus(button) {
    var parent = button.closest('.trick__content')
    var parentId = parent.getAttribute('id')
    product[parentId].amount++;
    console.log(parentId);
    basket();
}

function basket() {
    const productArray = [];
    var totalCount = 0;
    basketIndicator.classList.remove('active')

    for (const key in product) {
        const po = product[key];
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`)
        const productCardInd = productCard.querySelector('.trick__indicator')

        if (po.amount) {
            productArray.push(po);
            basketIndicator.classList.add('active');
            totalCount += po.amount
            productCardInd.classList.add('active');
            productCardInd.innerHTML = po.amount;
        } else {
            productCardInd.classList.remove('active');
            productCardInd.innerHTML = 0;
        }
        basketIndicator.innerHTML = totalCount;


    }
    basketChecklist.innerHTML = '';

    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemTrick(productArray[i]);
    }
    basketTotalPrice.innerHTML = totalSumProducts();
}

function cardItemTrick(dataTrick) {

    const { name, totalSum: price, amount, img } = dataTrick;
    return `
        <div class="basket__product">
            <div class="basket__info">
            <img src="${img}" alt="">
                <div class="basket__sub">
                    <p class="basket__name">${name}</p>
                    <p class="basket__sum">$ <span>${price.toLocaleString()}</span></p>
                </div>
            </div>
            <div class="basket__count" id="${name.toLowerCase()}__card">
                <button class="basket__symbol" data-symbol="-">-</button>
                <output class="basket__output">${amount}</output>
                <button class="basket__symbol" data-symbol="+">+</button>
            </div>
        </div>
                `
}

window.addEventListener('click', function (event) {
    const btn = event.target;

    if (btn.classList.contains('basket__symbol')) {
        const attr = btn.getAttribute('data-symbol')

        const parent = btn.closest('.basket__count')
        console.log(attr);

        if (parent) {
            const idProduct = parent.getAttribute('id').split('__')[0];

            if (attr == '+') {
                product[idProduct].amount++
            } else if (attr == '-') {
                product[idProduct].amount--
            }

            basket()
        }
    }
});

clearBtn.addEventListener('click', function () {
    for (const key in product) {
        product[key].amount = 0;
    }
    basket();
});

function totalSumProducts() {
    let total = 0;

    for (const key in product) {
        total += product[key].totalSum
    }

    return '$ ' + total.toLocaleString() 
};

const otherProduct = {
    house: {
        name: 'House',
        price: 14.99,
        amount: 0,
        img: 'assets/img/new1-img.png',
        get totalSum() {
            return this.price * this.amount;
        }
    },
    candle: {
        name: 'Candle',
        price: 11.99,
        amount: 0,
        img: 'assets/img/new2-img.png',
        get totalSum() {
            return this.price * this.amount;
        }
    },
    hat: {
        name: 'Hat',
        price: 4.99,
        amount: 0,
        img: 'assets/img/new3-img.png',
        get totalSum() {
            return this.price * this.amount;
        }
    },
    rip: {
        name: 'Rip',
        price: 24.99,
        amount: 0,
        img: 'assets/img/new4-img.png',
        get totalSum() {
            return this.price * this.amount;
        }
    },
    ball: {
        name: 'Ball',
        price: 5.99,
        amount: 0,
        img: 'assets/img/new5-img.png',
        get totalSum() {
            return this.price * this.amount;
        }
    },
    broom: {
        name: 'Broom',
        price: 7.99,
        amount: 0,
        img: 'assets/img/new6-img.png',
        get totalSum() {
            return this.price * this.amount;
        }
    },
};

otherProductBtns.forEach((otherBtn) => {
    otherBtn.addEventListener('click', function () {
        addOrRemove(this)
    })
})

function addOrRemove(otherButton) {
    var parent = otherButton.closest('.new__content')
    var parentId = parent.getAttribute('id')
    otherProduct[parentId].amount++;
    console.log(parentId);
    basket();
}

function basket() {
    const productArray = [];
    var totalCount = 0;
    basketIndicator.classList.remove('active')

    for (const key in product) {
        const po = product[key];
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`)
        const productCardInd = productCard.querySelector('.trick__indicator')

        if (po.amount) {
            productArray.push(po);
            basketIndicator.classList.add('active');
            totalCount += po.amount
            productCardInd.classList.add('active');
            productCardInd.innerHTML = po.amount;
        } else {
            productCardInd.classList.remove('active');
            productCardInd.innerHTML = 0;
        }
        basketIndicator.innerHTML = totalCount;


    }
    basketChecklist.innerHTML = '';

    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemTrick(productArray[i]);
    }
    basketTotalPrice.innerHTML = totalSumProducts();
}

function cardItemTrick(dataTrick) {

    const { name, totalSum: price, amount, img } = dataTrick;
    return `
        <div class="basket__product">
            <div class="basket__info">
            <img src="${img}" alt="">
                <div class="basket__sub">
                    <p class="basket__name">${name}</p>
                    <p class="basket__sum">$ <span>${price.toLocaleString()}</span></p>
                </div>
            </div>
            <div class="basket__count" id="${name.toLowerCase()}__card">
                <button class="basket__symbol" data-symbol="-">-</button>
                <output class="basket__output">${amount}</output>
                <button class="basket__symbol" data-symbol="+">+</button>
            </div>
        </div>
                `
}



