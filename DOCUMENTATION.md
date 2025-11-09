# QueueAdvisor - Documentação Completa

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Funcionalidades Principais](#funcionalidades-principais)
3. [Arquitetura do Sistema](#arquitetura-do-sistema)
4. [Fluxo de Uso](#fluxo-de-uso)
5. [Páginas e Componentes](#páginas-e-componentes)
6. [Sistema de Comparação](#sistema-de-comparação)
7. [Exportação e Compartilhamento](#exportação-e-compartilhamento)
8. [Internacionalização](#internacionalização)
9. [Tecnologias Utilizadas](#tecnologias-utilizadas)

---

## 🎯 Visão Geral

**QueueAdvisor** é uma ferramenta web interativa que ajuda desenvolvedores e arquitetos de software a escolher entre **Amazon SQS** e **Apache Kafka (MSK)** para suas necessidades de mensageria.

### Objetivo Principal
Fornecer recomendações personalizadas baseadas em:
- Volume de mensagens
- Requisitos técnicos (ordenação, replay, tolerância a perda)
- Orçamento disponível
- Ambiente de implantação (AWS ou multicloud)
- Região AWS escolhida

---

## ⚙️ Funcionalidades Principais

### 1. **Formulário Multi-etapas Inteligente**

#### **Etapa 0: Seleção de Preset**
- **AWS Free Tier**: 500K mensagens/mês, $0, ideal para testes
- **Microservices**: 5M mensagens/mês, $200, sem ordenação
- **Event Streaming**: 50M mensagens/mês, $1000, com ordenação e replay
- **Cost Effective**: 1M mensagens/mês, $50, alta tolerância a perda
- **High Throughput**: 100M mensagens/mês, $2000, máximo desempenho
- **Custom Configuration**: Configure manualmente todos os parâmetros

#### **Etapa 1: Volume e Orçamento**
- Slider de volume: 100K até 200M mensagens/mês
- Slider de orçamento: $0 até $5,000/mês
- Visualização em tempo real dos valores

#### **Etapa 2: Requisitos Técnicos**
- **Ordenação**: Necessita ordenação das mensagens? (Sim/Não)
- **Tolerância a perda**: Baixa, Média, Alta
- **Replay**: Necessita reprocessar mensagens? (Sim/Não)

#### **Etapa 3: Ambiente e Região**
- **Ambiente**: AWS-only ou Multicloud
- **Região AWS**: 9 regiões disponíveis
  - us-east-1 (Virginia)
  - us-east-2 (Ohio)
  - us-west-1 (California)
  - us-west-2 (Oregon)
  - eu-west-1 (Ireland)
  - eu-central-1 (Frankfurt)
  - ap-southeast-1 (Singapore)
  - ap-northeast-1 (Tokyo)
  - sa-east-1 (São Paulo)

### 2. **Análise e Recomendação**

#### **Algoritmo de Decisão**
O sistema recomenda **Kafka/MSK** quando:
- Volume > 50M mensagens/mês + replay necessário
- Ordenação estrita + replay necessário
- Ambiente multicloud (portabilidade)
- Baixa tolerância a perda + volume muito alto (>100M)

Caso contrário, recomenda **SQS** como opção gerenciada e econômica.

#### **Resultados Exibidos**
1. **Card de Recomendação**: Serviço recomendado + explicação detalhada
2. **Informações de Região**: Região selecionada e recomendação de região alternativa (se aplicável)
3. **Métricas Comparativas**:
   - Diferença percentual de custo
   - Pontuação média SQS (0-10)
   - Pontuação média Kafka (0-10)
4. **Gráfico Radar**: Comparação visual em 6 dimensões
5. **Tabela de Preços**: Custos detalhados para 1M, 10M e 100M mensagens
6. **Resumo Técnico**: Features de cada serviço

### 3. **Sistema de Salvamento e Histórico**

#### **Salvar Análise**
- Botão "Save Analysis" após ver os resultados
- Armazena no **localStorage** do navegador
- Mantém as últimas **10 análises** automaticamente
- Cada análise inclui:
  - Timestamp de quando foi salva
  - Recomendação (SQS ou Kafka)
  - Todos os parâmetros de entrada
  - Resultados completos
  - ID único

#### **Notificação Bonita**
- Toast elegante no canto da tela
- Confirma salvamento com sucesso
- Mostra qual serviço foi recomendado
- Link para página de comparação

### 4. **Página de Comparação (/compare)**

#### **Visualização de Análises Salvas**
- Grid responsivo com cards das análises
- Mostra: Data/hora, recomendação, região, custos
- Seleção múltipla (até 3 análises)
- Botão de exclusão individual

#### **Comparação Lado a Lado**
Quando 2+ análises selecionadas:

**A. Gráficos Visuais** (toggle Show/Hide Charts)
- **Gráfico Radar**: Comparação de métricas entre análises
- **Gráfico de Barras**: Comparação de custos SQS vs Kafka

**B. Tabela Comparativa**
- Data de cada análise
- Região AWS
- Custos SQS (10M msgs)
- Custos Kafka (10M msgs)
- Todas as métricas do radar (Score/10)

#### **Funcionalidades**
- **Export**: Gera PNG da comparação completa
- **Share**: Compartilha via Web Share API ou copia link
- **Hide/Show Charts**: Alterna visualização de gráficos

---

## 🏗️ Arquitetura do Sistema

### **Frontend**
```
Next.js 16.0.0 (App Router)
├── app/
│   ├── page.tsx                    # Página principal
│   ├── compare/page.tsx            # Página de comparação
│   ├── docs/page.tsx               # Documentação
│   ├── faq/page.tsx                # FAQ
│   ├── how-it-works/page.tsx       # Como funciona
│   ├── credits/page.tsx            # Créditos
│   └── api/compare/route.ts        # API de comparação
│
├── components/
│   ├── comparison-form.tsx         # Formulário multi-etapas
│   ├── results-display.tsx         # Exibição de resultados
│   ├── export-share-menu.tsx       # Menu de export/share
│   ├── service-radar-chart.tsx     # Gráfico radar
│   ├── pricing-table.tsx           # Tabela de preços
│   ├── header.tsx                  # Cabeçalho/navegação
│   └── footer.tsx                  # Rodapé
│
├── lib/
│   ├── aws-pricing.ts              # Dados e cálculos de preços
│   ├── i18n.ts                     # Traduções (EN/PT)
│   └── utils.ts                    # Funções utilitárias
│
└── types/
    └── comparison.ts               # TypeScript types
```

### **Backend (API Routes)**
- **POST /api/compare**: Processa requisição e retorna recomendação
  - Input: FormData com parâmetros
  - Output: ComparisonResult com recomendação completa

---

## 🔄 Fluxo de Uso

### **Fluxo Básico**
```
1. Usuário acessa homepage
   ↓
2. Escolhe preset OU configuração customizada
   ↓
3. Preenche etapas do formulário (1, 2, 3)
   ↓
4. Clica "Compare Services"
   ↓
5. Sistema envia dados para /api/compare
   ↓
6. API aplica algoritmo de decisão
   ↓
7. API busca preços regionais
   ↓
8. Retorna recomendação completa
   ↓
9. Exibe resultados com gráficos e tabelas
```

### **Fluxo com Salvamento**
```
Após ver resultados:
   ↓
Clica "Save Analysis"
   ↓
Análise salva no localStorage
   ↓
Toast de confirmação aparece
   ↓
Pode clicar "View Saved Analyses"
   ↓
Vai para /compare
   ↓
Seleciona 2-3 análises
   ↓
Visualiza gráficos comparativos
   ↓
Exporta ou compartilha comparação
```

---

## 📄 Páginas e Componentes

### **Homepage (app/page.tsx)**
- Hero com título e descrição
- Formulário de comparação (ComparisonForm)
- Resultados dinâmicos (ResultsDisplay)
- Troca de idioma (EN/PT)

### **Compare Page (app/compare/page.tsx)**
- Lista de análises salvas
- Seleção múltipla com cards
- Gráficos comparativos (Radar + Bar)
- Tabela side-by-side
- Export/Share

### **Docs, FAQ, How It Works**
- Informações estáticas
- Links para documentação AWS
- Padrões de arquitetura
- Perguntas frequentes

### **Credits**
- Agradecimentos e créditos
- Links para contribuir
- Informações sobre o criador

---

## 📊 Sistema de Comparação

### **Radar Chart Metrics**
1. **Cost Efficiency**: Eficiência de custo
2. **Scalability**: Escalabilidade
3. **Ease of Use**: Facilidade de uso
4. **Message Ordering**: Ordenação de mensagens
5. **Replay Capability**: Capacidade de replay
6. **Infrastructure Management**: Gerenciamento de infraestrutura

### **Scoring (0-10)**
- **SQS**: Forte em simplicidade, custo para volumes baixos/médios
- **Kafka**: Forte em replay, ordenação, throughput alto

### **Cálculo de Preços**

#### **SQS Pricing**
```
Base: $0.40 por milhão de requests
Regional multiplier aplicado
Free tier: 1M requests/mês
```

#### **MSK Pricing**
```
Base: 3 brokers × $0.21/hora × 730 horas/mês
Storage: $0.10/GB-mês
Estimativa storage:
  - 1M msgs = ~10GB
  - 10M msgs = ~100GB
  - 100M msgs = ~500GB
Regional multiplier aplicado
```

---

## 📤 Exportação e Compartilhamento

### **Formatos de Export**

#### **1. Markdown (.md)**
```markdown
# QueueAdvisor - AWS Service Comparison

## Recommendation
**Amazon SQS**

Explanation...

## Pricing Comparison (10M messages/month)
- SQS: $4.00
- Kafka: $461.00

## Metrics
- Cost Efficiency: SQS 8/10, Kafka 5/10
...
```

#### **2. CSV**
```csv
Metric,Amazon SQS,Apache Kafka
Cost Efficiency,8,5
Scalability,7,9
...
```

#### **3. JSON**
```json
{
  "recommendation": "Amazon SQS",
  "explanation": "...",
  "pricing": {...},
  "radarData": [...]
}
```

#### **4. PNG (Image)**
- Captura screenshot dos resultados usando html2canvas
- Escala 2x para alta resolução
- Background escuro preservado
- Inclui todos os gráficos e tabelas

#### **5. Print**
- CSS otimizado para impressão
- Remove botões e elementos interativos
- Preserva cores e gráficos
- Formato A4
- Page breaks inteligentes

### **Compartilhamento Social**
- **Twitter/X**: Tweet com texto + link
- **LinkedIn**: Post profissional
- **Facebook**: Compartilhamento público
- **Web Share API**: Compartilhamento nativo (mobile)

---

## 🌐 Internacionalização

### **Idiomas Suportados**
- **English (EN)**: Idioma padrão
- **Português (PT-BR)**: Tradução completa

### **Elementos Traduzidos**
- Todos os textos da interface
- Labels de formulário
- Mensagens de erro/sucesso
- Descrições de presets
- Conteúdo de documentação
- Textos de botões
- Tooltips e hints

### **Sistema de Tradução**
```typescript
// lib/i18n.ts
export const translations = {
  en: { ... },
  pt: { ... }
}

// Uso:
const t = useTranslation(locale)
<Button>{t.compareButton}</Button>
```

---

## 🛠️ Tecnologias Utilizadas

### **Core**
- **Next.js 16.0.0**: Framework React com App Router
- **React 19**: Biblioteca UI
- **TypeScript 5**: Type safety
- **Tailwind CSS 4.x**: Styling

### **UI Components**
- **Radix UI**: Primitivos acessíveis (dropdown, card, button, etc)
- **Framer Motion**: Animações suaves
- **Lucide React**: Ícones modernos

### **Charts & Visualization**
- **Recharts**: Gráficos (Radar, Bar, Line)
- **html2canvas**: Captura de screenshot para PNG

### **Utils**
- **clsx/tailwind-merge**: Merge de classes CSS
- **next-themes**: Dark/Light mode

### **Development**
- **pnpm**: Package manager
- **ESLint**: Linting
- **Vercel**: Deployment

---

## 🎨 Design System

### **Cores**
```css
/* Primary (Purple/Blue) */
--brand-primary: #667eea

/* Secondary (Orange) */
--brand-secondary: #f59e0b

/* Charts */
--chart-1: #3b82f6 (Blue)
--chart-2: #10b981 (Green)
--chart-3: #8b5cf6 (Purple)
--chart-4: #f59e0b (Orange)
--chart-5: #ec4899 (Pink)
```

### **Componentes**
- Cards com backdrop-blur
- Gradientes para CTAs
- Borders suaves
- Shadows elegantes
- Animações Framer Motion
- Responsive em todos os breakpoints

---

## 📈 Performance

### **Otimizações**
- Static generation onde possível
- Image optimization (Next.js)
- CSS purge (Tailwind)
- Code splitting automático
- Lazy loading de components pesados

### **Bundle Size**
- Recharts: ~100KB (lazy loaded)
- html2canvas: ~50KB (lazy loaded)
- Core app: ~150KB (gzipped)

---

## 🔒 Privacidade

### **Dados do Usuário**
- **Não coletamos dados pessoais**
- Análises salvas apenas no **localStorage local**
- Não há backend de persistência
- Não há analytics invasivos
- Open source e transparente

### **Storage**
```javascript
// localStorage keys:
"queueadvisor-analyses" // Array de análises (max 10)
```

---

## 🚀 Deploy

### **Vercel (Recomendado)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### **Build Local**
```bash
pnpm install
pnpm build
pnpm start
```

---

## 📝 Roadmap Futuro

### **Features Planejadas**
- [ ] Suporte a RabbitMQ
- [ ] Suporte a Azure Service Bus
- [ ] Suporte a Google Cloud Pub/Sub
- [ ] Calculadora de TCO detalhada
- [ ] Simulador de carga
- [ ] Comparação de mais de 3 análises
- [ ] Export para PDF
- [ ] Templates de arquitetura
- [ ] Integração com Terraform
- [ ] API pública

---

## 🤝 Contribuindo

Este é um projeto open source. Contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

## 👨‍💻 Autor

**Fernando Francisco Azevedo**
- AWS Solutions Architect
- Cloud Enthusiast
- [GitHub](https://github.com/fernandoazevedo)

---

## 🙏 Agradecimentos

- AWS por SQS e MSK
- Comunidade open source
- Next.js team
- Todos os contribuidores

---

**QueueAdvisor** - Escolha o serviço de mensageria certo para sua arquitetura 🚀
