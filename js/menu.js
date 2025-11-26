/**
 * Menu Principal - Café Colonial Digital
 * Loads menu items from JSON and renders them dynamically
 */

// Icon SVG mapping - minimalist inline icons
const ICONS = {
  'menu-book': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>',
  
  'calendar': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>',
  
  'chef-hat': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>',
  
  'wheat': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>',
  
  'bookmark': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>',
  
  'message': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>'
};

/**
 * Load menu data from JSON file
 * @returns {Promise<Object|null>} Menu data or null if error
 */
async function loadMenuData() {
  try {
    const response = await fetch('/data/menu.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading menu.json:', error);
    return null;
  }
}

/**
 * Render menu items to the DOM
 * @param {Array} items - Menu items to render
 */
function renderMenu(items) {
  const container = document.getElementById('menu-items');
  
  if (!container) {
    console.error('Menu container not found');
    return;
  }
  
  // Clear previous content
  container.innerHTML = '';
  
  // Render each menu item
  items.forEach(item => {
    const card = document.createElement('a');
    card.href = item.url;
    card.className = 'block rounded-lg border-2 border-gray-200 p-5 bg-white shadow-sm hover:shadow-lg hover:border-amber-700 transition-all duration-200 transform hover:-translate-y-1';
    
    const iconSVG = ICONS[item.icon] || ICONS['menu-book'];
    
    card.innerHTML = `
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0 text-amber-700">
          ${iconSVG}
        </div>
        <div class="flex-1 min-w-0">
          <h2 class="text-lg font-semibold text-gray-900 mb-1">
            ${item.title}
          </h2>
          <p class="text-sm text-gray-600 leading-relaxed">
            ${item.description}
          </p>
        </div>
        <div class="flex-shrink-0 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
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
      <div class="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <p class="text-red-600 font-medium">Erro ao carregar o menu</p>
        <p class="text-sm text-red-500 mt-1">Por favor, tente novamente mais tarde</p>
      </div>
    `;
  }
}

/**
 * Initialize menu on page load
 */
async function initMenu() {
  const data = await loadMenuData();
  
  if (data && data.items && Array.isArray(data.items)) {
    renderMenu(data.items);
  } else {
    showError();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initMenu);

