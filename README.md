# ☕ Café Colonial Digital — Casarão

Projeto de extensão universitária para digitalização da experiência do Café Colonial, oferecendo acesso rápido via QR Code a cardápio, programação, receitas, produtores locais e sistema de reservas.

---

## 🎯 Sobre o Projeto

Este é um site estático responsivo desenvolvido para melhorar a experiência dos visitantes do Café Colonial do Casarão, permitindo acesso instantâneo a todas as informações através de um QR Code.

### ✨ Funcionalidades

- 📱 **Menu Principal** — Navegação intuitiva para todas as seções
- 🍰 **Cardápio Interativo** — Filtros por categoria e busca por nome
- 📅 **Programação** — Horários de funcionamento e eventos especiais
- 👨‍🍳 **Receitas** — Receitas tradicionais com histórias e curiosidades
- 🌾 **Produtores Locais** — Conheça os parceiros e fornecedores
- 📝 **Reservas Online** — Formulário integrado via Google Forms
- 💬 **Feedback** — Canal direto para avaliações e sugestões
- 📍 **Localização** — Mapa interativo do Google Maps

---

## 🛠️ Stack Tecnológica

- **Frontend:** HTML5 + Tailwind CSS (CDN) + JavaScript Vanilla
- **Dados:** JSON estáticos (sem backend)
- **Deploy:** Vercel
- **Formulários:** Google Forms
- **Mapas:** Google Maps Embed

---

## 📁 Estrutura do Projeto

```
/casarao
├── index.html              # Menu principal (QR Code aponta aqui)
├── cardapio.html           # Cardápio com filtros
├── programacao.html        # Programação e horários
├── receitas.html           # Receitas tradicionais
├── produtores.html         # Produtores locais
├── reservas.html           # Integração Google Forms
├── feedback.html           # Integração Google Forms
├── /css
│   └── styles.css          # Estilos customizados
├── /js                     # Scripts JavaScript
├── /data                   # Arquivos JSON com dados
└── /assets                 # Recursos estáticos
```

📖 **Veja detalhes completos em:** [`project_structure.md`](./project_structure.md)

---

## 🚀 Como Executar Localmente

### Opção 1: Servidor HTTP Simples (Python)

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/casarao.git
cd casarao

# Inicie um servidor local
python -m http.server 8000

# Acesse no navegador
# http://localhost:8000
```

### Opção 2: Live Server (VS Code)

1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

### Opção 3: Node.js (http-server)

```bash
# Instale o http-server globalmente
npm install -g http-server

# Execute no diretório do projeto
http-server -p 8000

# Acesse no navegador
# http://localhost:8000
```

---

## 📦 Deploy no Vercel

### Primeira Vez

1. **Criar repositório no GitHub**
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/casarao.git
   git push -u origin main
   ```

2. **Importar no Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Importe seu repositório GitHub
   - Configure (detecção automática)
   - Deploy! 🚀

3. **Gerar QR Code**
   - Copie a URL de produção (ex: `https://casarao.vercel.app`)
   - Use um gerador online: [qr-code-generator.com](https://www.qr-code-generator.com/)
   - Imprima e posicione nas mesas do café

### Atualizações Futuras

```bash
# Faça suas alterações
git add .
git commit -m "feat: update menu items"
git push origin main

# Deploy automático no Vercel (1-2 minutos)
```

---

## 📝 Como Atualizar Conteúdo

### Editar Cardápio

1. Abra `/data/cardapio.json`
2. Adicione, edite ou remova itens:

```json
{
  "id": "item-01",
  "name": "Bolo de Fubá",
  "description": "Bolo tradicional com fubá de milho orgânico",
  "category": "Pães e Bolos",
  "price": 8.50,
  "tags": ["doce", "tradicional"]
}
```

3. Salve e faça push para GitHub

### Editar Programação

Edite `/data/programacao.json`:

```json
{
  "id": "evt-01",
  "titulo": "Workshop de Panificação",
  "descricao": "Aprenda a fazer pães artesanais",
  "dia": "Sábado",
  "horario": "14:00 - 16:00"
}
```

### Adicionar Receitas

Edite `/data/receitas.json` seguindo a estrutura existente.

### Atualizar Produtores

Edite `/data/produtores.json` com informações dos parceiros.

---

## 🔧 Configurações Importantes

### Google Forms

Para configurar os formulários de Reservas e Feedback:

📖 **Consulte:** [`GOOGLE_FORMS_INSTRUCOES.md`](./GOOGLE_FORMS_INSTRUCOES.md)

### Google Maps

Para adicionar a localização do Casarão:

1. Acesse [Google Maps](https://maps.google.com)
2. Busque o endereço do Casarão
3. Clique em "Compartilhar" → "Incorporar um mapa"
4. Copie o código iframe
5. Cole em `index.html` na seção de localização (comentada)

Exemplo:
```html
<iframe 
  src="https://www.google.com/maps/embed?pb=..." 
  width="100%" 
  height="300" 
  style="border:0;" 
  allowfullscreen="" 
  loading="lazy">
</iframe>
```

---

## 🎨 Personalização

### Cores

Edite as variáveis CSS em `/css/styles.css`:

```css
:root {
  --color-primary: #8B4513;
  --color-secondary: #D2691E;
  --color-neutral: #F5F5DC;
  --color-text: #2D2D2D;
  --color-bg: #FAFAF8;
}
```

### Textos e Títulos

Todos os textos estão em arquivos HTML individuais e podem ser editados diretamente.

---

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:

- 📱 **Smartphones** (< 640px) — Experiência principal
- 📲 **Tablets** (640px - 1024px)
- 💻 **Desktops** (> 1024px)

---

## ✅ Checklist de Produção

Antes de gerar o QR Code final:

- [ ] Todos os dados JSON estão atualizados
- [ ] Links do Google Forms configurados
- [ ] Google Maps adicionado
- [ ] Testado em dispositivos móveis
- [ ] Testado em diferentes navegadores
- [ ] Deploy no Vercel finalizado
- [ ] URL de produção funcionando
- [ ] QR Code gerado e testado

---

## 🐛 Resolução de Problemas

### Erro ao carregar JSON

**Problema:** Console mostra erro 404 ao buscar arquivos JSON.

**Solução:** 
- Verifique se está rodando via servidor HTTP (não abra HTML direto)
- Confirme que os arquivos JSON existem em `/data`

### Filtros não funcionam

**Problema:** Botões de filtro não alteram os itens exibidos.

**Solução:**
- Verifique o console do navegador (F12)
- Confirme que `cardapio.js` está carregado
- Verifique estrutura do JSON

### Deploy não atualiza

**Problema:** Alterações não aparecem no site após push.

**Solução:**
- Aguarde 1-2 minutos para deploy completar
- Verifique o dashboard do Vercel
- Limpe cache do navegador (Ctrl + F5)

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Consulte [`project_structure.md`](./project_structure.md)
2. Verifique issues no GitHub
3. Entre em contato com a equipe do projeto

---

## 📄 Licença

Este projeto é parte de um trabalho de extensão universitária.

---

## 🤝 Contribuindo

Melhorias são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: add nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📊 Status do Projeto

🟢 **Em Produção** — Site ativo e funcional

**Versão:** 1.0.0  
**Última atualização:** 26/11/2025

---

**Desenvolvido com ☕ pela equipe do Café Colonial Digital**
