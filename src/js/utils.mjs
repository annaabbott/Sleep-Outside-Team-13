// Utilidades básicas
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Actualización del contador del carrito (versión mejorada)
export function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  if (!cartCountElement) return;
  
  const cartItems = getLocalStorage('so-cart') || [];
  const itemCount = cartItems.reduce((total, item) => {
    return total + (item.quantity || 1);
  }, 0);
  
  cartCountElement.textContent = itemCount;
  return itemCount; // Devuelve el conteo por si se necesita
}

// Función para ser llamada desde otras páginas
export function updateCart() {
  updateCartCount();
}

// Resto de tus utilidades existentes...
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML(position, list.map(template).join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) callback(data);
}

async function loadTemplate(path) {
  const res = await fetch(path);
  return await res.text();
}

export async function loadHeaderFooter() {
  try {
    const [header, footer] = await Promise.all([
      loadTemplate("../partials/header.html"),
      loadTemplate("../partials/footer.html")
    ]);
    
    const headerElement = qs("#main-header");
    const footerElement = qs("#main-footer");
    
    if (headerElement) {
      renderWithTemplate(header, headerElement);
      // Actualizar el contador después de cargar el header
      updateCartCount();
    }
    if (footerElement) renderWithTemplate(footer, footerElement);
  } catch (error) {
    console.error("Error loading templates:", error);
  }
}