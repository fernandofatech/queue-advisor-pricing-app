export type Locale = "en" | "pt"

export const translations = {
  en: {
    // Header
    title: "QueueAdvisor",
    subtitle: "AWS Service Comparison Tool",

    // Form
    formTitle: "Architecture Requirements",
    formDescription: "Answer a few questions to get a personalized recommendation",
    messagesLabel: "Volume of messages per month",
    messagesPlaceholder: "e.g., 1000000",
    orderingLabel: "Require ordering?",
    yes: "Yes",
    no: "No",
    messageLossLabel: "Message loss tolerance",
    low: "Low",
    medium: "Medium",
    high: "High",
    replayLabel: "Replay needed?",
    budgetLabel: "Monthly budget (USD)",
    budgetPlaceholder: "e.g., 500",
    environmentLabel: "Environment",
    aws: "AWS",
    multicloud: "Multicloud",
    compareButton: "Compare Services",
    analyzing: "Analyzing...",

    // Results
    recommended: "Recommended",
    serviceComparison: "Service Comparison",
    serviceComparisonDesc: "Visual comparison across key metrics",
    costComparison: "Cost Comparison",
    costComparisonDesc: "Live AWS pricing data (updated hourly)",
    technicalSummary: "Technical Summary",

    // SQS Features
    sqsTitle: "Amazon SQS",
    sqsFeature1: "Fully managed, serverless message queuing",
    sqsFeature2: "Standard: unlimited throughput, at-least-once delivery",
    sqsFeature3: "FIFO: up to 70K msgs/sec, exactly-once processing",
    sqsFeature4: "Pay-per-request ($0.40/million), 1M free tier/month",
    sqsFeature5: "Messages up to 256KB, retention up to 14 days",
    sqsDocs: "AWS SQS Documentation",

    // Kafka Features
    kafkaTitle: "Apache Kafka (MSK)",
    kafkaFeature1: "Distributed event streaming platform",
    kafkaFeature2: "Millions of msgs/sec per broker, horizontal scaling",
    kafkaFeature3: "Unlimited message replay with configurable retention",
    kafkaFeature4: "Fixed cost: ~$460/month (3 brokers) + storage",
    kafkaFeature5: "Ideal for event sourcing, CQRS, real-time analytics",
    kafkaDocs: "AWS MSK Documentation",

    // Footer
    builtBy: "Built by",

    // Pricing Table
    service: "Service",
    monthlyCost: "Monthly Cost",
    perRequest: "Per Request",
    storageRetention: "Storage/Retention",

    // Workflow translations
    step: "Step",
    next: "Next",
    previous: "Back",
    customConfiguration: "Or customize your configuration",

    // Preset titles
    presetMicroservices: "Microservices",
    presetEventStreaming: "Event Streaming",
    presetCostEffective: "Cost Effective",
    presetHighThroughput: "High Throughput",

    // Preset descriptions
    presetMicroservicesDesc: "Ideal for decoupling services with moderate traffic",
    presetEventStreamingDesc: "Real-time processing with message replay",
    presetCostEffectiveDesc: "Budget-friendly solution for low traffic",
    presetHighThroughputDesc: "Enterprise-scale with maximum performance",

    // Preset features
    messagesMonth: "messages/month",
    noOrdering: "No ordering required",
    withOrdering: "With message ordering",
    highTolerance: "High loss tolerance",
    withReplay: "With message replay",
    budget: "monthly budget",

    // Environment descriptions
    awsDesc: "AWS-only deployment",
    multicloudDesc: "Multi-cloud flexibility",

    // Navigation
    nav: {
      home: "Home",
      howItWorks: "How It Works",
      docs: "Documentation",
      faq: "FAQ",
    },

    // Documentation
    docs: {
      title: "Documentation & Wiki",
      subtitle: "Comprehensive AWS messaging services reference",
      awsResources: "AWS Resources",
      architecturePatterns: "Architecture Patterns",
      detailedComparison: "Detailed Comparison",

      // SQS Resources
      sqsOverview: "Amazon SQS Developer Guide",
      sqsOverviewDesc: "Complete guide to using Amazon SQS",
      sqsPricing: "SQS Pricing Details",
      sqsPricingDesc: "Official AWS SQS pricing information",
      sqsBestPractices: "SQS Best Practices",
      sqsBestPracticesDesc: "Recommended patterns and configurations",
      sqsFifo: "FIFO Queue Documentation",
      sqsFifoDesc: "Learn about ordered message processing",

      // MSK Resources
      mskOverview: "Amazon MSK Developer Guide",
      mskOverviewDesc: "Complete guide to using Amazon MSK",
      mskPricing: "MSK Pricing Details",
      mskPricingDesc: "Official AWS MSK pricing information",
      mskBestPractices: "MSK Best Practices",
      mskBestPracticesDesc: "Performance and reliability guidelines",
      kafkaDoc: "Apache Kafka Documentation",
      kafkaDocDesc: "Official Kafka project documentation",

      // Architecture Patterns
      microservicesPattern: "Microservices Communication",
      microservicesPatternDesc: "Loosely coupled services using message queues for asynchronous communication",
      eventSourcingPattern: "Event Sourcing",
      eventSourcingPatternDesc: "Store state changes as a sequence of events with full replay capability",
      cqrsPattern: "CQRS (Command Query Responsibility Segregation)",
      cqrsPatternDesc: "Separate read and write operations using event streams",
      taskQueuePattern: "Task Queue Pattern",
      taskQueuePatternDesc: "Distribute workload across multiple workers with automatic retry",

      bestFor: "Best for",

      // Comparison Table
      sqsVsKafka: "SQS vs Kafka: Feature Comparison",
      feature: "Feature",
      messageOrdering: "Message Ordering",
      sqsOrdering: "FIFO queues: up to 70,000 msgs/sec (high-throughput mode)",
      kafkaOrdering: "Native ordering within partitions (unlimited throughput)",
      messageRetention: "Message Retention",
      sqsRetention: "4 days default, max 14 days (cannot be extended)",
      kafkaRetention: "7 days default, configurable retention (days, weeks, or unlimited)",
      throughput: "Throughput",
      sqsThroughput: "Standard: unlimited | FIFO: 3,000 msgs/sec (70,000 with batching)",
      kafkaThroughput: "Millions of msgs/sec per broker (horizontally scalable)",
      replayCapability: "Replay Capability",
      sqsReplay: "No native replay",
      kafkaReplay: "Full message replay",
      infrastructure: "Infrastructure",
      sqsInfrastructure: "Fully managed, serverless",
      kafkaInfrastructure: "Managed brokers, requires cluster management",
      pricing: "Pricing Model",
      sqsPricingModel: "Pay per request ($0.40 per million)",
      kafkaPricingModel: "Pay for broker hours (~$100-500/month)",
      useCase: "Best Use Case",
      sqsUseCase: "Simple queuing, decoupling microservices",
      kafkaUseCase: "Event streaming, real-time analytics, log aggregation",
    },

    // How It Works
    howItWorks: {
      title: "How QueueAdvisor Works",
      subtitle: "Understanding the recommendation algorithm and process",

      algorithmTitle: "Recommendation Algorithm",
      algorithmDesc:
        "QueueAdvisor uses a decision matrix based on AWS best practices and real-world use cases to recommend the optimal messaging service.",

      sqsRecommendedWhen: "SQS is recommended when:",
      sqsCondition1: "Simple message queuing without replay requirements",
      sqsCondition2: "Moderate to high volume (< 100M/month optimal cost point)",
      sqsCondition3: "Serverless architecture preferred (no infrastructure management)",
      sqsCondition4: "Pay-per-request pricing model fits your budget",

      kafkaRecommendedWhen: "Kafka/MSK is recommended when:",
      kafkaCondition1: "Message replay and reprocessing are required",
      kafkaCondition2: "Very high throughput (> 100M/month for cost efficiency)",
      kafkaCondition3: "Event sourcing, CQRS, or stream processing architectures",
      kafkaCondition4: "Multi-consumer scenarios with independent consumption rates",

      step1Title: "Collect Requirements",
      step1Desc: "You provide your technical and business requirements",
      step1Detail1: "Message volume and throughput needs",
      step1Detail2: "Ordering and replay requirements",
      step1Detail3: "Budget constraints and environment preferences",

      step2Title: "Analyze Requirements",
      step2Desc: "Our algorithm processes your inputs against decision criteria",
      step2Detail1: "Evaluate message volume against service capabilities",
      step2Detail2: "Match technical requirements with service features",
      step2Detail3: "Calculate total cost of ownership for each option",

      step3Title: "Fetch Real-Time Pricing",
      step3Desc: "Get accurate AWS pricing data for both services",
      step3Detail1: "SQS pricing based on request count",
      step3Detail2: "MSK pricing based on broker hours and storage",
      step3Detail3: "Additional costs for data transfer and features",

      step4Title: "Generate Recommendation",
      step4Desc: "Receive a comprehensive comparison with visual insights",
      step4Detail1: "Radar chart showing service strengths",
      step4Detail2: "Detailed pricing breakdown",
      step4Detail3: "Export options for sharing with your team",

      techStackTitle: "Technology Stack",
      pricingSource: "Pricing Data Source",
      pricingSourceDesc: "Static pricing based on official AWS pricing pages (updated monthly)",
      calculation: "Cost Calculation",
      calculationDesc: "Real-time calculations based on your specific usage patterns",
      visualization: "Data Visualization",
      visualizationDesc: "Interactive charts built with Recharts and Framer Motion",
    },

    // FAQ
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about QueueAdvisor",

      generalCategory: "General",
      pricingCategory: "Pricing",
      technicalCategory: "Technical",

      q1: "What is QueueAdvisor?",
      a1: "QueueAdvisor is a free tool that helps you choose between Amazon SQS and Apache Kafka (MSK) based on your technical requirements, message volume, and budget. It uses real AWS pricing data and best practices to provide personalized recommendations.",

      q2: "Is QueueAdvisor affiliated with AWS?",
      a2: "No, QueueAdvisor is an independent tool created by Fernando Moretes. It uses publicly available AWS pricing information and documentation to help developers make informed decisions.",

      q3: "How accurate are the recommendations?",
      a3: "The recommendations are based on AWS best practices, official documentation, and real-world use cases. However, every architecture is unique, so we recommend using QueueAdvisor as a starting point and consulting with AWS architects for production deployments.",

      q4: "Are the prices shown accurate?",
      a4: "Yes, the pricing is based on official AWS pricing pages. However, AWS pricing can vary by region and may include additional costs for data transfer, storage, and other features not captured in the basic calculation.",

      q5: "Does this tool incur any AWS costs?",
      a5: "No, QueueAdvisor is completely free to use and does not make any API calls to your AWS account. It's a static analysis tool that runs entirely in your browser.",

      q6: "How often is pricing data updated?",
      a6: "Pricing data is updated monthly to reflect any changes from AWS. The last update date is shown in the application.",

      q7: "Can I use both SQS and Kafka together?",
      a7: "Yes! Many architectures use both services. For example, you might use SQS for simple task queuing and Kafka for event streaming and analytics. QueueAdvisor helps you understand which service fits which use case.",

      q8: "What about other messaging services like RabbitMQ or Azure Service Bus?",
      a8: "Currently, QueueAdvisor focuses on AWS services (SQS and MSK). We may add support for other cloud providers and self-managed solutions in the future.",

      q9: "How do I export my comparison results?",
      a9: "After generating a comparison, click the 'Export & Share' button to download your results as Markdown, CSV, JSON, or PNG. You can also share directly to social media.",

      additionalResources: "Additional Resources",
      resource1Title: "AWS Architecture Center",
      resource1Desc: "Best practices and reference architectures",
      resource2Title: "AWS Pricing Calculator",
      resource2Desc: "Estimate costs for your AWS infrastructure",
      resource3Title: "AWS Free Tier",
      resource3Desc: "Learn about free tier limits for SQS and MSK",
    },
  },
  pt: {
    // Header
    title: "QueueAdvisor",
    subtitle: "Ferramenta de Comparação de Serviços AWS",

    // Form
    formTitle: "Requisitos de Arquitetura",
    formDescription: "Responda algumas perguntas para obter uma recomendação personalizada",
    messagesLabel: "Volume de mensagens por mês",
    messagesPlaceholder: "ex: 1000000",
    orderingLabel: "Requer ordenação?",
    yes: "Sim",
    no: "Não",
    messageLossLabel: "Tolerância a perda de mensagens",
    low: "Baixa",
    medium: "Média",
    high: "Alta",
    replayLabel: "Necessário replay?",
    budgetLabel: "Orçamento mensal (USD)",
    budgetPlaceholder: "ex: 500",
    environmentLabel: "Ambiente",
    aws: "AWS",
    multicloud: "Multinuvem",
    compareButton: "Comparar Serviços",
    analyzing: "Analisando...",

    // Results
    recommended: "Recomendado",
    serviceComparison: "Comparação de Serviços",
    serviceComparisonDesc: "Comparação visual entre métricas principais",
    costComparison: "Comparação de Custos",
    costComparisonDesc: "Dados de preços da AWS em tempo real (atualizado a cada hora)",
    technicalSummary: "Resumo Técnico",

    // SQS Features
    sqsTitle: "Amazon SQS",
    sqsFeature1: "Filas de mensagens totalmente gerenciadas e serverless",
    sqsFeature2: "Standard: throughput ilimitado, entrega at-least-once",
    sqsFeature3: "FIFO: até 70K msgs/seg, processamento exactly-once",
    sqsFeature4: "Pague por solicitação ($0,40/milhão), 1M grátis/mês",
    sqsFeature5: "Mensagens até 256KB, retenção até 14 dias",
    sqsDocs: "Documentação AWS SQS",

    // Kafka Features
    kafkaTitle: "Apache Kafka (MSK)",
    kafkaFeature1: "Plataforma distribuída de streaming de eventos",
    kafkaFeature2: "Milhões de msgs/seg por broker, escalabilidade horizontal",
    kafkaFeature3: "Replay ilimitado com retenção configurável",
    kafkaFeature4: "Custo fixo: ~$460/mês (3 brokers) + armazenamento",
    kafkaFeature5: "Ideal para event sourcing, CQRS, análise em tempo real",
    kafkaDocs: "Documentação AWS MSK",

    // Footer
    builtBy: "Desenvolvido por",

    // Pricing Table
    service: "Serviço",
    monthlyCost: "Custo Mensal",
    perRequest: "Por Solicitação",
    storageRetention: "Armazenamento/Retenção",

    // Workflow translations
    step: "Etapa",
    next: "Próximo",
    previous: "Voltar",
    customConfiguration: "Ou personalize sua configuração",

    // Preset titles
    presetMicroservices: "Microsserviços",
    presetEventStreaming: "Streaming de Eventos",
    presetCostEffective: "Custo Reduzido",
    presetHighThroughput: "Alta Capacidade",

    // Preset descriptions
    presetMicroservicesDesc: "Ideal para desacoplar serviços com tráfego moderado",
    presetEventStreamingDesc: "Processamento em tempo real com replay de mensagens",
    presetCostEffectiveDesc: "Solução econômica para tráfego baixo",
    presetHighThroughputDesc: "Escala empresarial com máximo desempenho",

    // Preset features
    messagesMonth: "mensagens/mês",
    noOrdering: "Sem necessidade de ordenação",
    withOrdering: "Com ordenação de mensagens",
    highTolerance: "Alta tolerância a perda",
    withReplay: "Com replay de mensagens",
    budget: "orçamento mensal",

    // Environment descriptions
    awsDesc: "Implantação somente AWS",
    multicloudDesc: "Flexibilidade multinuvem",

    // Navigation
    nav: {
      home: "Início",
      howItWorks: "Como Funciona",
      docs: "Documentação",
      faq: "Perguntas Frequentes",
    },

    // Documentation
    docs: {
      title: "Documentação & Wiki",
      subtitle: "Referência completa dos serviços de mensageria AWS",
      awsResources: "Recursos AWS",
      architecturePatterns: "Padrões de Arquitetura",
      detailedComparison: "Comparação Detalhada",

      // SQS Resources
      sqsOverview: "Guia do Desenvolvedor Amazon SQS",
      sqsOverviewDesc: "Guia completo para usar o Amazon SQS",
      sqsPricing: "Detalhes de Preços SQS",
      sqsPricingDesc: "Informações oficiais de preços AWS SQS",
      sqsBestPractices: "Melhores Práticas SQS",
      sqsBestPracticesDesc: "Padrões e configurações recomendadas",
      sqsFifo: "Documentação de Filas FIFO",
      sqsFifoDesc: "Aprenda sobre processamento ordenado de mensagens",

      // MSK Resources
      mskOverview: "Guia do Desenvolvedor Amazon MSK",
      mskOverviewDesc: "Guia completo para usar o Amazon MSK",
      mskPricing: "Detalhes de Preços MSK",
      mskPricingDesc: "Informações oficiais de preços AWS MSK",
      mskBestPractices: "Melhores Práticas MSK",
      mskBestPracticesDesc: "Diretrizes de desempenho e confiabilidade",
      kafkaDoc: "Documentação Apache Kafka",
      kafkaDocDesc: "Documentação oficial do projeto Kafka",

      // Architecture Patterns
      microservicesPattern: "Comunicação de Microsserviços",
      microservicesPatternDesc: "Serviços fracamente acoplados usando filas de mensagens para comunicação assíncrona",
      eventSourcingPattern: "Event Sourcing",
      eventSourcingPatternDesc:
        "Armazena mudanças de estado como uma sequência de eventos com capacidade de replay completo",
      cqrsPattern: "CQRS (Segregação de Responsabilidade de Comando e Consulta)",
      cqrsPatternDesc: "Separa operações de leitura e escrita usando fluxos de eventos",
      taskQueuePattern: "Padrão de Fila de Tarefas",
      taskQueuePatternDesc: "Distribui carga de trabalho entre vários workers com retry automático",

      bestFor: "Melhor para",

      // Comparison Table
      sqsVsKafka: "SQS vs Kafka: Comparação de Recursos",
      feature: "Recurso",
      messageOrdering: "Ordenação de Mensagens",
      sqsOrdering: "Filas FIFO: até 70.000 msgs/seg (modo high-throughput)",
      kafkaOrdering: "Ordenação nativa dentro de partições (throughput ilimitado)",
      messageRetention: "Retenção de Mensagens",
      sqsRetention: "4 dias padrão, máx 14 dias (não pode ser estendido)",
      kafkaRetention: "7 dias padrão, retenção configurável (dias, semanas ou ilimitado)",
      throughput: "Throughput",
      sqsThroughput: "Standard: ilimitado | FIFO: 3.000 msgs/seg (70.000 com batching)",
      kafkaThroughput: "Milhões de msgs/seg por broker (escalável horizontalmente)",
      replayCapability: "Capacidade de Replay",
      sqsReplay: "Sem replay nativo",
      kafkaReplay: "Replay completo de mensagens",
      infrastructure: "Infraestrutura",
      sqsInfrastructure: "Totalmente gerenciado, serverless",
      kafkaInfrastructure: "Brokers gerenciados, requer gerenciamento de cluster",
      pricing: "Modelo de Preços",
      sqsPricingModel: "Pague por solicitação ($0,40 por milhão)",
      kafkaPricingModel: "Pague por horas de broker (~$100-500/mês)",
      useCase: "Melhor Caso de Uso",
      sqsUseCase: "Enfileiramento simples, desacoplamento de microsserviços",
      kafkaUseCase: "Streaming de eventos, análise em tempo real, agregação de logs",
    },

    // How It Works
    howItWorks: {
      title: "Como o QueueAdvisor Funciona",
      subtitle: "Entendendo o algoritmo de recomendação e o processo",

      algorithmTitle: "Algoritmo de Recomendação",
      algorithmDesc:
        "O QueueAdvisor usa uma matriz de decisão baseada em melhores práticas da AWS e casos de uso do mundo real para recomendar o serviço de mensageria ideal.",

      sqsRecommendedWhen: "SQS é recomendado quando:",
      sqsCondition1: "Enfileiramento simples sem requisitos de replay",
      sqsCondition2: "Volume moderado a alto (< 100M/mês ponto ótimo de custo)",
      sqsCondition3: "Arquitetura serverless preferida (sem gerenciamento de infraestrutura)",
      sqsCondition4: "Modelo de preço por solicitação se adequa ao orçamento",

      kafkaRecommendedWhen: "Kafka/MSK é recomendado quando:",
      kafkaCondition1: "Replay e reprocessamento de mensagens são necessários",
      kafkaCondition2: "Throughput muito alto (> 100M/mês para eficiência de custo)",
      kafkaCondition3: "Arquiteturas de event sourcing, CQRS ou processamento de streams",
      kafkaCondition4: "Cenários multi-consumidor com taxas de consumo independentes",

      step1Title: "Coletar Requisitos",
      step1Desc: "Você fornece seus requisitos técnicos e de negócio",
      step1Detail1: "Volume de mensagens e necessidades de throughput",
      step1Detail2: "Requisitos de ordenação e replay",
      step1Detail3: "Restrições de orçamento e preferências de ambiente",

      step2Title: "Analisar Requisitos",
      step2Desc: "Nosso algoritmo processa suas entradas contra critérios de decisão",
      step2Detail1: "Avaliar volume de mensagens contra capacidades dos serviços",
      step2Detail2: "Combinar requisitos técnicos com recursos dos serviços",
      step2Detail3: "Calcular custo total de propriedade para cada opção",

      step3Title: "Buscar Preços em Tempo Real",
      step3Desc: "Obter dados precisos de preços da AWS para ambos os serviços",
      step3Detail1: "Preços SQS baseados em contagem de solicitações",
      step3Detail2: "Preços MSK baseados em horas de broker e armazenamento",
      step3Detail3: "Custos adicionais para transferência de dados e recursos",

      step4Title: "Gerar Recomendação",
      step4Desc: "Receba uma comparação abrangente com insights visuais",
      step4Detail1: "Gráfico de radar mostrando pontos fortes dos serviços",
      step4Detail2: "Detalhamento detalhado de preços",
      step4Detail3: "Opções de exportação para compartilhar com sua equipe",

      techStackTitle: "Stack Tecnológica",
      pricingSource: "Fonte de Dados de Preços",
      pricingSourceDesc: "Preços estáticos baseados nas páginas oficiais de preços da AWS (atualizado mensalmente)",
      calculation: "Cálculo de Custos",
      calculationDesc: "Cálculos em tempo real baseados em seus padrões de uso específicos",
      visualization: "Visualização de Dados",
      visualizationDesc: "Gráficos interativos construídos com Recharts e Framer Motion",
    },

    // FAQ
    faq: {
      title: "Perguntas Frequentes",
      subtitle: "Tudo que você precisa saber sobre o QueueAdvisor",

      generalCategory: "Geral",
      pricingCategory: "Preços",
      technicalCategory: "Técnico",

      q1: "O que é o QueueAdvisor?",
      a1: "QueueAdvisor é uma ferramenta gratuita que ajuda você a escolher entre Amazon SQS e Apache Kafka (MSK) baseado em seus requisitos técnicos, volume de mensagens e orçamento. Usa dados de preços reais da AWS e melhores práticas para fornecer recomendações personalizadas.",

      q2: "O QueueAdvisor é afiliado à AWS?",
      a2: "Não, QueueAdvisor é uma ferramenta independente criada por Fernando Moretes. Usa informações de preços e documentação da AWS disponíveis publicamente para ajudar desenvolvedores a tomar decisões informadas.",

      q3: "Quão precisas são as recomendações?",
      a3: "As recomendações são baseadas em melhores práticas da AWS, documentação oficial e casos de uso do mundo real. No entanto, cada arquitetura é única, então recomendamos usar o QueueAdvisor como ponto de partida e consultar arquitetos AWS para implantações em produção.",

      q4: "Os preços mostrados são precisos?",
      a4: "Sim, os preços são baseados nas páginas oficiais de preços da AWS. No entanto, os preços da AWS podem variar por região e podem incluir custos adicionais para transferência de dados, armazenamento e outros recursos não capturados no cálculo básico.",

      q5: "Esta ferramenta gera custos na AWS?",
      a5: "Não, o QueueAdvisor é completamente gratuito e não faz nenhuma chamada de API para sua conta AWS. É uma ferramenta de análise estática que roda inteiramente no seu navegador.",

      q6: "Com que frequência os dados de preços são atualizados?",
      a6: "Os dados de preços são atualizados mensalmente para refletir quaisquer mudanças da AWS. A data da última atualização é mostrada na aplicação.",

      q7: "Posso usar SQS e Kafka juntos?",
      a7: "Sim! Muitas arquiteturas usam ambos os serviços. Por exemplo, você pode usar SQS para enfileiramento simples de tarefas e Kafka para streaming de eventos e análise. O QueueAdvisor ajuda você a entender qual serviço se encaixa em qual caso de uso.",

      q8: "E quanto a outros serviços de mensageria como RabbitMQ ou Azure Service Bus?",
      a8: "Atualmente, o QueueAdvisor foca em serviços AWS (SQS e MSK). Podemos adicionar suporte para outros provedores de nuvem e soluções autogerenciadas no futuro.",

      q9: "Como exporto meus resultados de comparação?",
      a9: "Após gerar uma comparação, clique no botão 'Exportar e Compartilhar' para baixar seus resultados como Markdown, CSV, JSON ou PNG. Você também pode compartilhar diretamente nas redes sociais.",

      additionalResources: "Recursos Adicionais",
      resource1Title: "Centro de Arquitetura AWS",
      resource1Desc: "Melhores práticas e arquiteturas de referência",
      resource2Title: "Calculadora de Preços AWS",
      resource2Desc: "Estime custos para sua infraestrutura AWS",
      resource3Title: "AWS Free Tier",
      resource3Desc: "Aprenda sobre limites do nível gratuito para SQS e MSK",
    },
  },
}

export function useTranslation(locale: Locale) {
  return translations[locale]
}
