/**
 * Receitas - Café Colonial Digital
 * Displays recipes with expandable details
 */

let receitasData = [];

/**
 * Load receitas data from JSON file
 * @returns {Promise<Object|null>} Receitas data or null if error
 */
async function loadReceitasData() {
  try {
    const response = await fetch('/data/receitas.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading receitas.json:', error);
    return null;
  }
}

/**
 * Get difficulty badge color
 * @param {string} dificuldade - Difficulty level
 * @returns {string} Tailwind classes for badge
 */
function getDifficultyBadge(dificuldade) {
  const badges = {
    'Fácil': 'bg-green-100 text-green-700',
    'Média': 'bg-yellow-100 text-yellow-700',
    'Difícil': 'bg-red-100 text-red-700'
  };
  
  return badges[dificuldade] || 'bg-gray-100 text-gray-700';
}

/**
 * Toggle recipe details visibility
 * @param {string} receitaId - Recipe ID
 */
function toggleRecipe(receitaId) {
  const detailsElement = document.getElementById(`details-${receitaId}`);
  const buttonElement = document.getElementById(`btn-${receitaId}`);
  
  if (!detailsElement || !buttonElement) return;
  
  const isExpanded = detailsElement.classList.contains('hidden');
  
  if (isExpanded) {
    detailsElement.classList.remove('hidden');
    buttonElement.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
      Fechar Receita
    `;
    buttonElement.classList.add('bg-amber-700', 'text-white');
    buttonElement.classList.remove('bg-white', 'text-amber-700');
  } else {
    detailsElement.classList.add('hidden');
    buttonElement.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
      Ver Receita Completa
    `;
    buttonElement.classList.remove('bg-amber-700', 'text-white');
    buttonElement.classList.add('bg-white', 'text-amber-700');
  }
}

/**
 * Render recipes to the DOM
 * @param {Array} receitas - Recipes to render
 */
function renderReceitas(receitas) {
  const container = document.getElementById('receitas-container');
  
  if (!container) return;
  
  container.innerHTML = '';
  
  receitas.forEach(receita => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-all';
    
    card.innerHTML = `
      <!-- Header -->
      <div class="p-6 bg-gradient-to-br from-amber-50 to-orange-50">
        <div class="flex items-start justify-between gap-3 mb-3">
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900 flex-1">
            ${receita.nome}
          </h2>
          <span class="text-xs font-medium px-3 py-1 rounded-full ${getDifficultyBadge(receita.dificuldade)}">
            ${receita.dificuldade}
          </span>
        </div>
        
        <div class="flex flex-wrap gap-4 text-sm text-gray-700">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-amber-700">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>${receita.tempoPreparo}</span>
          </div>
          
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-amber-700">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
            <span>${receita.rendimento}</span>
          </div>
          
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-amber-700">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>
            <span class="text-xs bg-gray-100 px-2 py-1 rounded">${receita.categoria}</span>
          </div>
        </div>
      </div>
      
      <!-- Historia (Always Visible) -->
      <div class="p-6 border-t-2 border-gray-100">
        <h3 class="font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-amber-700">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          História
        </h3>
        <p class="text-sm text-gray-700 leading-relaxed italic">
          ${receita.historia}
        </p>
      </div>
      
      <!-- Expandable Details -->
      <div id="details-${receita.id}" class="hidden border-t-2 border-gray-100">
        <!-- Ingredientes -->
        <div class="p-6 bg-gray-50">
          <h3 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-amber-700">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
            Ingredientes
          </h3>
          <ul class="space-y-2">
            ${receita.ingredientes.map(ing => `
              <li class="flex items-start gap-2 text-sm text-gray-700">
                <span class="text-amber-700 mt-1">•</span>
                <span>${ing}</span>
              </li>
            `).join('')}
          </ul>
        </div>
        
        <!-- Modo de Preparo -->
        <div class="p-6">
          <h3 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-amber-700">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
            </svg>
            Modo de Preparo
          </h3>
          <ol class="space-y-3">
            ${receita.modoPreparo.map((passo, index) => `
              <li class="flex items-start gap-3 text-sm text-gray-700">
                <span class="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-amber-700 text-white text-xs font-bold">
                  ${index + 1}
                </span>
                <span class="flex-1 pt-0.5">${passo}</span>
              </li>
            `).join('')}
          </ol>
        </div>
        
        <!-- Dicas -->
        ${receita.dicas && receita.dicas.length > 0 ? `
          <div class="p-6 bg-amber-50 border-t-2 border-amber-100">
            <h3 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-amber-700">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
              Dicas Especiais
            </h3>
            <ul class="space-y-2">
              ${receita.dicas.map(dica => `
                <li class="flex items-start gap-2 text-sm text-amber-900">
                  <span class="text-amber-600 mt-1">✓</span>
                  <span>${dica}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
      
      <!-- Toggle Button -->
      <div class="p-4 bg-gray-50 border-t-2 border-gray-100">
        <button 
          id="btn-${receita.id}"
          onclick="toggleRecipe('${receita.id}')"
          class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all bg-white text-amber-700 border-2 border-amber-700 hover:bg-amber-700 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
          Ver Receita Completa
        </button>
      </div>
    `;
    
    container.appendChild(card);
  });
}

/**
 * Display error message
 */
function showError() {
  const container = document.getElementById('receitas-container');
  if (container) {
    container.innerHTML = `
      <div class="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <p class="text-red-600 font-medium">Erro ao carregar as receitas</p>
        <p class="text-sm text-red-500 mt-1">Por favor, tente novamente mais tarde</p>
      </div>
    `;
  }
}

/**
 * Initialize receitas page
 */
async function initReceitas() {
  const data = await loadReceitasData();
  
  if (data && data.receitas) {
    receitasData = data.receitas;
    renderReceitas(data.receitas);
  } else {
    showError();
  }
}

// Make toggleRecipe available globally
window.toggleRecipe = toggleRecipe;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initReceitas);

