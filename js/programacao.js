/**
 * Programação - Café Colonial Digital
 * Displays schedule and events information
 */

/**
 * Load programacao data from JSON file
 * @returns {Promise<Object|null>} Programacao data or null if error
 */
async function loadProgramacaoData() {
  try {
    const response = await fetch('/data/programacao.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading programacao.json:', error);
    return null;
  }
}

/**
 * Render operating hours
 * @param {Object} horarios - Operating hours data
 */
function renderHorarios(horarios) {
  const container = document.getElementById('horarios-container');
  
  if (!container || !horarios) return;
  
  const { diasSemana, observacaoGeral } = horarios;
  
  let html = '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">';
  
  Object.entries(diasSemana).forEach(([dia, info]) => {
    html += `
      <div class="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-amber-700 transition-colors">
        <h3 class="font-semibold text-lg text-gray-900 mb-2">${dia}</h3>
        <div class="space-y-2 text-sm">
          <div class="flex items-center gap-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-amber-700">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span><strong>Horário:</strong> ${info.abertura} às ${info.fechamento}</span>
          </div>
          ${info.observacao ? `
            <p class="text-xs text-gray-600 pl-6">
              ${info.observacao}
            </p>
          ` : ''}
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  
  if (observacaoGeral) {
    html += `
      <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
        <strong>Observação:</strong> ${observacaoGeral}
      </div>
    `;
  }
  
  container.innerHTML = html;
}

/**
 * Get event type badge color
 * @param {string} tipo - Event type
 * @returns {string} Tailwind classes for badge
 */
function getEventTypeBadge(tipo) {
  const badges = {
    'regular': 'bg-blue-100 text-blue-700',
    'especial': 'bg-purple-100 text-purple-700',
    'entretenimento': 'bg-green-100 text-green-700'
  };
  
  return badges[tipo] || 'bg-gray-100 text-gray-700';
}

/**
 * Get event type label
 * @param {string} tipo - Event type
 * @returns {string} Human-readable label
 */
function getEventTypeLabel(tipo) {
  const labels = {
    'regular': 'Regular',
    'especial': 'Especial',
    'entretenimento': 'Entretenimento'
  };
  
  return labels[tipo] || tipo;
}

/**
 * Render events
 * @param {Array} eventos - Events data
 */
function renderEventos(eventos) {
  const container = document.getElementById('eventos-container');
  
  if (!container || !eventos) return;
  
  container.innerHTML = '';
  
  // Sort events: destacados first, then by day
  const sortedEventos = [...eventos].sort((a, b) => {
    if (a.destaque && !b.destaque) return -1;
    if (!a.destaque && b.destaque) return 1;
    return 0;
  });
  
  sortedEventos.forEach(evento => {
    const card = document.createElement('div');
    card.className = evento.destaque 
      ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-6 shadow-md relative overflow-hidden'
      : 'bg-white border-2 border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-amber-700 transition-all';
    
    // Destaque badge
    const destaqueHTML = evento.destaque ? `
      <div class="absolute top-0 right-0 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
        DESTAQUE
      </div>
    ` : '';
    
    card.innerHTML = `
      ${destaqueHTML}
      
      <div class="mb-3">
        <div class="flex items-start justify-between gap-3 mb-2">
          <h3 class="text-xl font-bold text-gray-900 flex-1">
            ${evento.titulo}
          </h3>
          <span class="text-xs font-medium px-2 py-1 rounded ${getEventTypeBadge(evento.tipo)}">
            ${getEventTypeLabel(evento.tipo)}
          </span>
        </div>
        
        <p class="text-sm text-gray-600 leading-relaxed">
          ${evento.descricao}
        </p>
      </div>
      
      <div class="space-y-2 text-sm mb-4">
        <div class="flex items-center gap-2 text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-amber-700">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <span><strong>Dias:</strong> ${evento.dias.join(', ')}</span>
        </div>
        
        <div class="flex items-center gap-2 text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-amber-700">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span><strong>Horário:</strong> ${evento.horarioInicio} às ${evento.horarioFim}</span>
        </div>
        
        <div class="flex items-center gap-2 text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-amber-700">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span><strong>Valor:</strong> ${evento.preco}</span>
        </div>
      </div>
      
      ${evento.observacao ? `
        <div class="bg-white bg-opacity-70 border border-gray-300 rounded px-3 py-2 text-xs text-gray-700">
          <strong>Obs:</strong> ${evento.observacao}
        </div>
      ` : ''}
    `;
    
    container.appendChild(card);
  });
}

/**
 * Render notices/warnings
 * @param {Array} avisos - Notices data
 */
function renderAvisos(avisos) {
  const container = document.getElementById('avisos-container');
  
  if (!container || !avisos || avisos.length === 0) return;
  
  container.innerHTML = '';
  
  avisos.forEach(aviso => {
    const div = document.createElement('div');
    
    const styles = {
      'info': 'bg-blue-50 border-blue-300 text-blue-800',
      'warning': 'bg-yellow-50 border-yellow-300 text-yellow-800',
      'error': 'bg-red-50 border-red-300 text-red-800'
    };
    
    const icons = {
      'info': '<path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />',
      'warning': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />',
      'error': '<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />'
    };
    
    div.className = `flex items-start gap-3 p-4 border-2 rounded-lg ${styles[aviso.tipo] || styles.info}`;
    div.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 flex-shrink-0 mt-0.5">
        ${icons[aviso.tipo] || icons.info}
      </svg>
      <p class="text-sm leading-relaxed">${aviso.mensagem}</p>
    `;
    
    container.appendChild(div);
  });
}

/**
 * Display error message
 */
function showError() {
  const main = document.querySelector('main');
  if (main) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'max-w-2xl mx-auto p-6 bg-red-50 border border-red-200 rounded-lg text-center';
    errorDiv.innerHTML = `
      <p class="text-red-600 font-medium">Erro ao carregar a programação</p>
      <p class="text-sm text-red-500 mt-1">Por favor, tente novamente mais tarde</p>
    `;
    main.appendChild(errorDiv);
  }
}

/**
 * Initialize programacao page
 */
async function initProgramacao() {
  const data = await loadProgramacaoData();
  
  if (data) {
    if (data.horariosFuncionamento) {
      renderHorarios(data.horariosFuncionamento);
    }
    
    if (data.eventos) {
      renderEventos(data.eventos);
    }
    
    if (data.avisos) {
      renderAvisos(data.avisos);
    }
  } else {
    showError();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initProgramacao);

