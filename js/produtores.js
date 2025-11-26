/**
 * Produtores - Café Colonial Digital
 * Displays local producers and partners information
 */

/**
 * Load produtores data from JSON file
 * @returns {Promise<Object|null>} Produtores data or null if error
 */
async function loadProdutoresData() {
  try {
    const response = await fetch('/data/produtores.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading produtores.json:', error);
    return null;
  }
}

/**
 * Render info section
 * @param {Object} info - Information data
 */
function renderInfo(info) {
  const container = document.getElementById('info-container');
  
  if (!container || !info) return;
  
  container.innerHTML = `
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-3">
        ${info.titulo}
      </h2>
      <p class="text-gray-700 leading-relaxed max-w-3xl mx-auto">
        ${info.descricao}
      </p>
    </div>
    
    ${info.beneficios && info.beneficios.length > 0 ? `
      <div class="bg-white rounded-lg p-6 border-2 border-gray-200">
        <h3 class="font-semibold text-gray-900 mb-4 text-center">Benefícios da Produção Local</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          ${info.beneficios.map(beneficio => `
            <div class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm text-gray-700">${beneficio}</span>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}
  `;
}

/**
 * Render producers cards
 * @param {Array} produtores - Producers data
 */
function renderProdutores(produtores) {
  const container = document.getElementById('produtores-container');
  
  if (!container) return;
  
  container.innerHTML = '';
  
  // Sort: destacados first
  const sortedProdutores = [...produtores].sort((a, b) => {
    if (a.destaque && !b.destaque) return -1;
    if (!a.destaque && b.destaque) return 1;
    return 0;
  });
  
  sortedProdutores.forEach(produtor => {
    const card = document.createElement('div');
    card.className = produtor.destaque
      ? 'bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-300 p-6 shadow-lg hover:shadow-xl transition-all relative overflow-hidden'
      : 'bg-white rounded-lg border-2 border-gray-200 p-6 hover:shadow-lg hover:border-amber-700 transition-all';
    
    // Destaque badge
    const destaqueHTML = produtor.destaque ? `
      <div class="absolute top-0 right-0 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-3 h-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
        PARCEIRO DESTAQUE
      </div>
    ` : '';
    
    card.innerHTML = `
      ${destaqueHTML}
      
      <!-- Header -->
      <div class="mb-4">
        <h3 class="text-xl font-bold text-gray-900 mb-1">
          ${produtor.nome}
        </h3>
        <p class="text-sm text-gray-600">
          ${produtor.responsavel}
        </p>
      </div>
      
      <!-- Type Badge -->
      <div class="mb-4">
        <span class="inline-block bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full">
          ${produtor.tipoProduto}
        </span>
      </div>
      
      <!-- Description -->
      <p class="text-sm text-gray-700 leading-relaxed mb-4">
        ${produtor.descricao}
      </p>
      
      <!-- Products -->
      <div class="mb-4">
        <h4 class="text-xs font-semibold text-gray-900 uppercase mb-2">Produtos Fornecidos</h4>
        <div class="flex flex-wrap gap-2">
          ${produtor.produtos.map(prod => `
            <span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              ${prod}
            </span>
          `).join('')}
        </div>
      </div>
      
      <!-- Info Grid -->
      <div class="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <div class="flex items-center gap-1 text-gray-600 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span class="text-xs font-medium">Localização</span>
          </div>
          <p class="text-gray-900 font-medium">${produtor.cidade} - ${produtor.estado}</p>
        </div>
        
        <div>
          <div class="flex items-center gap-1 text-gray-600 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <span class="text-xs font-medium">Parceria</span>
          </div>
          <p class="text-gray-900 font-medium">${produtor.anosParceria} ${produtor.anosParceria === 1 ? 'ano' : 'anos'}</p>
        </div>
      </div>
      
      <!-- Certifications -->
      ${produtor.certificacoes && produtor.certificacoes.length > 0 ? `
        <div class="pt-4 border-t border-gray-200">
          <h4 class="text-xs font-semibold text-gray-900 uppercase mb-2 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-green-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            Certificações
          </h4>
          <div class="flex flex-wrap gap-2">
            ${produtor.certificacoes.map(cert => `
              <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-3 h-3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ${cert}
              </span>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;
    
    container.appendChild(card);
  });
}

/**
 * Display error message
 */
function showError() {
  const container = document.getElementById('produtores-container');
  if (container) {
    container.innerHTML = `
      <div class="col-span-full p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <p class="text-red-600 font-medium">Erro ao carregar os produtores</p>
        <p class="text-sm text-red-500 mt-1">Por favor, tente novamente mais tarde</p>
      </div>
    `;
  }
}

/**
 * Initialize produtores page
 */
async function initProdutores() {
  const data = await loadProdutoresData();
  
  if (data) {
    if (data.informacoes) {
      renderInfo(data.informacoes);
    }
    
    if (data.produtores) {
      renderProdutores(data.produtores);
    }
  } else {
    showError();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initProdutores);

