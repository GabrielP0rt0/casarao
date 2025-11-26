/**
 * Cardápio - Café Colonial Digital
 * Handles menu filtering and search functionality
 */

let allItems = [];
let currentCategory = 'Todos';

/**
 * Load cardapio data from JSON file
 * @returns {Promise<Object|null>} Cardapio data or null if error
 */
async function loadCardapioData() {
  try {
    const response = await fetch('/data/cardapio.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading cardapio.json:', error);
    return null;
  }
}

/**
 * Render category filter buttons
 * @param {Array} categories - List of categories
 */
function renderCategories(categories) {
  const container = document.getElementById('category-filters');
  
  if (!container) return;
  
  container.innerHTML = '';
  
  categories.forEach(category => {
    const button = document.createElement('button');
    button.className = category === 'Todos' 
      ? 'px-4 py-2 rounded-full text-sm font-medium bg-amber-700 text-white shadow-md transition-all'
      : 'px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-700 hover:text-amber-700 transition-all';
    button.textContent = category;
    button.setAttribute('data-category', category);
    
    button.addEventListener('click', () => filterByCategory(category));
    
    container.appendChild(button);
  });
}

/**
 * Update active category button style
 * @param {string} category - Selected category
 */
function updateActiveCategoryButton(category) {
  const buttons = document.querySelectorAll('[data-category]');
  
  buttons.forEach(button => {
    const buttonCategory = button.getAttribute('data-category');
    
    if (buttonCategory === category) {
      button.className = 'px-4 py-2 rounded-full text-sm font-medium bg-amber-700 text-white shadow-md transition-all';
    } else {
      button.className = 'px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-700 hover:text-amber-700 transition-all';
    }
  });
}

/**
 * Filter items by category
 * @param {string} category - Category to filter by
 */
function filterByCategory(category) {
  currentCategory = category;
  updateActiveCategoryButton(category);
  
  const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
  
  const filtered = allItems.filter(item => {
    const matchesCategory = category === 'Todos' || item.category === category;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                         item.description.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });
  
  renderItems(filtered);
}

/**
 * Handle search input
 */
function handleSearch() {
  const searchInput = document.getElementById('search-input');
  
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    const filtered = allItems.filter(item => {
      const matchesCategory = currentCategory === 'Todos' || item.category === currentCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                           item.description.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });
    
    renderItems(filtered);
  });
}

/**
 * Render menu items to the DOM
 * @param {Array} items - Items to render
 */
function renderItems(items) {
  const container = document.getElementById('menu-items');
  
  if (!container) return;
  
  // Show "no results" message if no items
  if (items.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 mx-auto text-gray-300 mb-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <p class="text-gray-500 font-medium">Nenhum item encontrado</p>
        <p class="text-sm text-gray-400 mt-1">Tente outra busca ou categoria</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = '';
  
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg border-2 border-gray-200 p-5 hover:shadow-lg hover:border-amber-700 transition-all duration-200';
    
    const priceFormatted = item.price.toFixed(2).replace('.', ',');
    
    card.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold text-gray-900 flex-1">
          ${item.name}
        </h3>
        <span class="text-xl font-bold text-amber-700 ml-3">
          R$ ${priceFormatted}
        </span>
      </div>
      
      <p class="text-sm text-gray-600 leading-relaxed mb-3">
        ${item.description}
      </p>
      
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          ${item.category}
        </span>
        
        ${item.tags && item.tags.length > 0 ? `
          <div class="flex gap-1">
            ${item.tags.slice(0, 2).map(tag => `
              <span class="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded">
                ${tag}
              </span>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
    
    container.appendChild(card);
  });
}

/**
 * Display error message
 */
function showError() {
  const container = document.getElementById('menu-items');
  if (container) {
    container.innerHTML = `
      <div class="col-span-full p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <p class="text-red-600 font-medium">Erro ao carregar o cardápio</p>
        <p class="text-sm text-red-500 mt-1">Por favor, tente novamente mais tarde</p>
      </div>
    `;
  }
}

/**
 * Initialize cardapio page
 */
async function initCardapio() {
  const data = await loadCardapioData();
  
  if (data && data.items && data.categories) {
    allItems = data.items;
    renderCategories(data.categories);
    renderItems(data.items);
    handleSearch();
  } else {
    showError();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initCardapio);

