const CART_STORAGE_KEY = "market-basket-cart";

function makeProductImage(artwork) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 150">${artwork}</svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const state = {
    products: [
        {
            id: 1,
            name: "Mandazi (pack of 6)",
            price: 120,
            category: "Bakery",
            image: makeProductImage(`
        <ellipse cx="110" cy="126" rx="74" ry="10" fill="#d8c7a5" opacity=".36"/>
        <path d="M37 91 61 42q4-8 13-4l25 12-17 48q-3 9-13 6L44 98q-10-2-7-7Z" fill="#d99b4d"/>
        <path d="m79 102 24-53q4-9 13-5l27 12-18 52q-3 9-13 6l-27-7q-9-2-6-5Z" fill="#e8b662"/>
        <path d="m125 92 22-49q4-8 13-4l27 13-17 46q-3 9-12 6l-28-7q-9-2-5-5Z" fill="#cb8742"/>
        <path d="m54 78 11-23m29 27 11-24m44 13 10-21" stroke="#f4d28d" stroke-width="5" stroke-linecap="round" opacity=".75"/>
        <circle cx="69" cy="83" r="2" fill="#ad6739"/><circle cx="119" cy="79" r="2" fill="#ad6739"/><circle cx="164" cy="79" r="2" fill="#ad6739"/>
      `),
        },
        {
            id: 2,
            name: "Chapati (pack of 5)",
            price: 150,
            category: "Bakery",
            image: makeProductImage(`
        <ellipse cx="110" cy="126" rx="74" ry="10" fill="#d8c7a5" opacity=".36"/>
        <ellipse cx="109" cy="91" rx="68" ry="37" fill="#c98f4e"/>
        <ellipse cx="106" cy="82" rx="68" ry="37" fill="#edc981"/>
        <ellipse cx="111" cy="70" rx="66" ry="36" fill="#f2d591"/>
        <path d="M57 72q22-24 47-16m-27 38q26-18 54-11m-4-29q22-9 38 6" fill="none" stroke="#d59d5d" stroke-width="4" stroke-linecap="round" opacity=".75"/>
        <g fill="#a9673d"><ellipse cx="82" cy="69" rx="4" ry="2.5"/><ellipse cx="137" cy="77" rx="4" ry="2.5"/><ellipse cx="103" cy="96" rx="3" ry="2"/><ellipse cx="155" cy="62" rx="3" ry="2"/></g>
      `),
        },
        {
            id: 3,
            name: "Tea leaves 250g",
            price: 180,
            category: "Pantry",
            image: makeProductImage(`
        <ellipse cx="110" cy="128" rx="56" ry="9" fill="#d8c7a5" opacity=".4"/>
        <path d="m67 36 86-7 10 89q1 8-8 9l-77 6q-9 1-10-8l-7-81q-1-7 6-8Z" fill="#657d51"/>
        <path d="m75 43 71-6 7 67-73 6Z" fill="#819566"/>
        <path d="M86 60h49v26H86z" rx="3" fill="#f4edda"/>
        <path d="M104 79q-13-12 0-25 12 13 0 25Zm5 1q1-15 18-17-1 16-18 17Z" fill="#627b4d"/>
        <path d="M86 95h51" stroke="#e5d9b7" stroke-width="3" stroke-linecap="round"/>
        <path d="m69 34 88-7 2 14-89 7Z" fill="#526842"/>
      `),
        },
        {
            id: 4,
            name: "Sugar 1kg",
            price: 200,
            category: "Pantry",
            image: makeProductImage(`
      <ellipse cx="110" cy="128" rx="56" ry="9" fill="#d8c7a5" opacity=".4"/>
      <path d="m67 36 86-7 10 89q1 8-8 9l-77 6q-9 1-10-8l-7-81q-1-7 6-8Z" fill="#e5e5e5"/>
      <path d="m75 43 71-6 7 67-73 6Z" fill="#f4f4f4"/>
      <path d="M86 60h49v26H86z" rx="3" fill="#f4edda"/>
      <path d="M104 79q-13-12 0-25 12 13 0 25Zm5 1q1-15 18-17-1 16-18 17Z" fill="#e5e5e5"/>
      <path d="M86 95h51" stroke="#e5d9b7" stroke-width="3" stroke-linecap="round"/>
      <path d="m69 34 88-7 2 14-89 7Z" fill="#d9d9d9"/>
    `),
        },
        {
            id: 5,
            name: "Flour 1kg",
            price: 150,
            category: "Pantry",
            image: makeProductImage(`
     <ellipse cx="110" cy="128" rx="56" ry="9" fill="#d8c7a5" opacity=".4"/>
     <path d="m67 36 86-7 10 89q1 8-8 9l-77 6q-9 1-10-8l-7-81q-1-7 6-8Z" fill="#e9d7ad" stroke="#b58c55" stroke-width="3"/>
     <path d="m75 43 71-6 7 67-73 6Z" fill="#f8efda"/>
     <path d="M83 59h53v31H83z" rx="3" fill="#a76f3d"/>
     <path d="M109 82q-13-12 0-25 12 13 0 25Zm5 1q1-15 18-17-1 16-18 17Z" fill="#d5dfad"/>
     <path d="M87 98h45" stroke="#9d7048" stroke-width="4" stroke-linecap="round"/>
     <path d="m69 34 88-7 2 14-89 7Z" fill="#c7a36c"/>
   `),
        },
        {
            id: 6,
            name: "Juice",
            price: 360,
            category: "Beverages",
            image: makeProductImage(`
      <ellipse cx="110" cy="128" rx="56" ry="9" fill="#d8c7a5" opacity=".4"/>
      <path d="m67 36 86-7 10 89q1 8-8 9l-77 6q-9 1-10-8l-7-81q-1-7 6-8Z" fill="#f3c34e" stroke="#bd7435" stroke-width="3"/>
      <path d="m75 43 71-6 7 67-73 6Z" fill="#ffd96b"/>
      <path d="M86 60h49v31H86z" rx="3" fill="#fff1d2"/>
      <circle cx="110" cy="74" r="12" fill="#ec843b"/>
      <path d="M110 62v24m-12-12h24m-20-9 17 17m0-17L102 83" stroke="#ffe6a1" stroke-width="2"/>
      <path d="M86 98h51" stroke="#c87437" stroke-width="4" stroke-linecap="round"/>
      <path d="m69 34 88-7 2 14-89 7Z" fill="#e9a63e"/>
      <path d="m143 31 5-12" stroke="#a64f37" stroke-width="4" stroke-linecap="round"/>
    `),
        },
        {
            id: 7,
            name: "Soda",
            price: 150,
            category: "Beverages",
            image: makeProductImage(`
      <ellipse cx="110" cy="128" rx="56" ry="9" fill="#d8c7a5" opacity=".4"/>
      <path d="m67 36 86-7 10 89q1 8-8 9l-77 6q-9 1-10-8l-7-81q-1-7 6-8Z" fill="#e5e5e5"/>
      <path d="m75 43 71-6 7 67-73 6Z" fill="#f4f4f4"/>
      <path d="M86 60h49v31H86z" rx="3" fill="#fff1d2"/>
      <circle cx="110" cy="74" r="12" fill="#e54f3c"/>
      <path d="M110 62v24m-12-12h24m-20-9 17 17m0-17L102 83" stroke="#ffe6a1" stroke-width="2"/>
      <path d="M86 98h51" stroke="#c87437" stroke-width="4" stroke-linecap="round"/>
      <path d="m69 34 88-7 2 14-89 7Z" fill="#d9d9d9"/>
      <path d="m143 31 5-12" stroke="#a64f37" stroke-width="4" stroke-linecap="round"/>
    `),
        },
        {
            id: 8,
            name: "Water",
            price: 100,
            category: "Beverages",
            image: makeProductImage(`
      <ellipse cx="110" cy="128" rx="56" ry="9" fill="#d8c7a5" opacity=".4"/>
      <path d="m67 36 86-7 10 89q1 8-8 9l-77 6q-9 1-10-8l-7-81q-1-7 6-8Z" fill="#e5e5e5"/>
      <path d="m75 43 71-6 7 67-73 6Z" fill="#f4f4f4"/>
      <path d="M86 60h49v31H86z" rx="3" fill="#fff1d2"/>
      <circle cx="110" cy="74" r="12" fill="#4fc3f7"/>
      <path d="M110 62v24m-12-12h24m-20-9 17 17m0-17L102 83" stroke="#e1f5fe" stroke-width="2"/>
      <path d="M86 98h51" stroke="#c87437" stroke-width="4" stroke-linecap="round"/>
      <path d="m69 34 88-7 2 14-89 7Z" fill="#d9d9d9"/>
      <path d="m143 31 5-12" stroke="#a64f37" stroke-width="4" stroke-linecap="round"/>
    `),
        },
        {
            id: 9,
            name: "Vasaline Coco Butter",
            price: 250,
            category: "Skincare",
            image: makeProductImage(`
      <ellipse cx="110" cy="128" rx="56" ry="9" fill="#d8c7a5" opacity=".4"/>
      <path d="m67 36 86-7 10 89q1 8-8 9l-77 6q-9 1-10-8l-7-81q-1-7 6-8Z" fill="#e5e5e5"/>
      <path d="m75 43 71-6 7 67-73 6Z" fill="#f4f4f4"/>
      <path d="M86 60h49v31H86z" rx="3" fill="#fff1d2"/>
      <circle cx="110" cy="74" r="12" fill="#4fc3f7"/>
      <path d="M110 62v24m-12-12h24m-20-9 17 17m0-17L102 83" stroke="#e1f5fe" stroke-width="2"/>
      <path d="M86 98h51" stroke="#c87437" stroke-width="4" stroke-linecap="round"/>
      <path d="m69 34 88-7 2 14-89 7Z" fill="#d9d9d9"/>
      <path d="m143 31 5-12" stroke="#a64f37" stroke-width="4" stroke-linecap="round"/>
    `),
        },
    ],
    cart: [],
    history: [],
};

function loadCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
        if (!Array.isArray(saved)) return [];

        return saved.filter(
            (item) =>
                item &&
                state.products.some((product) => product.id === item.productId) &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0
        );
    } catch (error) {
        console.error("Could not load the saved basket:", error);
        return [];
    }
}

state.cart = loadCart();

const productList = document.querySelector("#product-list");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const cartSummary = document.querySelector("#cart-summary");
const headerCount = document.querySelector("#header-count");
const panelCount = document.querySelector("#panel-count");
const cartTotal = document.querySelector("#cart-total");
const cartLink = document.querySelector(".cart-link");
const clearCartButton = document.querySelector("#clear-cart");
const undoButton = document.querySelector("#undo-button");

function formatPrice(amount) {
    return `KSh ${amount.toLocaleString("en-KE")}`;
}

function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find((entry) => entry.id === item.productId);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

function getCartCount() {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
}

function saveCart() {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
    } catch (error) {
        console.error("Could not save the basket:", error);
    }
}

function copyCart(cart) {
    return cart.map(({ productId, quantity }) => ({ productId, quantity }));
}

function updateCart(action) {
    state.history.push(copyCart(state.cart));
    if (state.history.length > 20) state.history.shift();
    action();
    saveCart();
    renderCart();
}

function addToCart(productId) {
    if (!state.products.some((product) => product.id === productId)) return;
    updateCart(() => {
        const existing = state.cart.find((item) => item.productId === productId);
        if (existing) existing.quantity += 1;
        else state.cart.push({ productId, quantity: 1 });
    });
}

function updateQuantity(productId, quantity) {
    const nextQuantity = Math.max(0, Math.floor(Number(quantity) || 0));
    if (!state.cart.some((item) => item.productId === productId)) return;

    updateCart(() => {
        if (nextQuantity === 0) {
            state.cart = state.cart.filter((item) => item.productId !== productId);
        } else {
            const item = state.cart.find((entry) => entry.productId === productId);
            item.quantity = nextQuantity;
        }
    });
}

function removeFromCart(productId) {
    if (!state.cart.some((item) => item.productId === productId)) return;
    updateCart(() => {
        state.cart = state.cart.filter((item) => item.productId !== productId);
    });
}

function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "product-card";

    const art = document.createElement("div");
    art.className = "product-art";
    art.style.setProperty("--art-bg", product.id === 3 ? "#e8ebdd" : "#f3ead8");

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    art.append(image);

    const info = document.createElement("div");
    info.className = "product-info";

    const category = document.createElement("p");
    category.className = "product-category";
    category.textContent = product.category;

    const name = document.createElement("h3");
    name.textContent = product.name;

    const bottom = document.createElement("div");
    bottom.className = "product-bottom";

    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = formatPrice(product.price);

    const addButton = document.createElement("button");
    addButton.className = "add-button";
    addButton.type = "button";
    addButton.dataset.add = String(product.id);
    addButton.textContent = "Add to basket";

    bottom.append(price, addButton);
    info.append(category, name, bottom);
    card.append(art, info);
    return card;
}

function createCartRow(item) {
    const product = state.products.find((entry) => entry.id === item.productId);
    if (!product) return null;

    const row = document.createElement("div");
    row.className = "cart-row";

    const main = document.createElement("div");
    main.className = "cart-row-main";
    const name = document.createElement("span");
    name.className = "cart-row-name";
    name.textContent = product.name;
    const unitPrice = document.createElement("span");
    unitPrice.className = "cart-row-price";
    unitPrice.textContent = `${formatPrice(product.price)} each`;
    main.append(name, unitPrice);

    const lineTotal = document.createElement("span");
    lineTotal.className = "line-total";
    lineTotal.textContent = formatPrice(product.price * item.quantity);

    const controls = document.createElement("div");
    controls.className = "cart-row-controls";
    const quantity = document.createElement("div");
    quantity.className = "quantity-control";
    quantity.setAttribute("aria-label", `Quantity for ${product.name}`);

    const decrease = document.createElement("button");
    decrease.type = "button";
    decrease.dataset.action = "decrease";
    decrease.dataset.productId = String(product.id);
    decrease.setAttribute("aria-label", `Decrease ${product.name} quantity`);
    decrease.textContent = "−";

    const quantityValue = document.createElement("span");
    quantityValue.className = "quantity-value";
    quantityValue.textContent = String(item.quantity);
    quantityValue.setAttribute("aria-live", "polite");

    const increase = document.createElement("button");
    increase.type = "button";
    increase.dataset.action = "increase";
    increase.dataset.productId = String(product.id);
    increase.setAttribute("aria-label", `Increase ${product.name} quantity`);
    increase.textContent = "+";

    quantity.append(decrease, quantityValue, increase);

    const remove = document.createElement("button");
    remove.className = "remove-button";
    remove.type = "button";
    remove.dataset.action = "remove";
    remove.dataset.productId = String(product.id);
    remove.textContent = "Remove";
    controls.append(quantity, remove);

    row.append(main, lineTotal, controls);
    return row;
}

function renderProducts() {
    productList.replaceChildren(...state.products.map(createProductCard));
}

function renderCart() {
    const count = getCartCount();
    const hasItems = state.cart.length > 0;

    headerCount.textContent = String(count);
    panelCount.textContent = String(count);
    cartLink.setAttribute("aria-label", `Your basket, ${count} ${count === 1 ? "item" : "items"}`);
    cartItems.replaceChildren(...state.cart.map(createCartRow).filter(Boolean));
    cartEmpty.hidden = hasItems;
    cartSummary.hidden = !hasItems;
    cartTotal.textContent = formatPrice(getCartTotal());
    clearCartButton.disabled = !hasItems;
    undoButton.disabled = state.history.length === 0;
}

productList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add]");
    if (button) addToCart(Number(button.dataset.add));
});

cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const productId = Number(button.dataset.productId);
    const item = state.cart.find((entry) => entry.productId === productId);
    if (!item) return;

    if (button.dataset.action === "increase") updateQuantity(productId, item.quantity + 1);
    if (button.dataset.action === "decrease") updateQuantity(productId, item.quantity - 1);
    if (button.dataset.action === "remove") removeFromCart(productId);
});

clearCartButton.addEventListener("click", () => {
    if (state.cart.length > 0)
        updateCart(() => {
            state.cart = [];
        });
});

undoButton.addEventListener("click", () => {
    if (state.history.length === 0) return;
    state.cart = state.history.pop();
    saveCart();
    renderCart();
});

renderProducts();
renderCart();
