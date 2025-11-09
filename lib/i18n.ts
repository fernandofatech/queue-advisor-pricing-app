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
    sqsFeature1: "Fully managed message queuing",
    sqsFeature2: "Serverless and auto-scaling",
    sqsFeature3: "Pay per request pricing",
    sqsFeature4: "Best for decoupling microservices",
    sqsFeature5: "Standard and FIFO queue options",
    sqsDocs: "AWS SQS Documentation",

    // Kafka Features
    kafkaTitle: "Apache Kafka (MSK)",
    kafkaFeature1: "High-throughput event streaming",
    kafkaFeature2: "Message replay and retention",
    kafkaFeature3: "Ideal for complex event processing",
    kafkaFeature4: "Requires broker infrastructure",
    kafkaFeature5: "Better for real-time analytics",
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
    sqsFeature1: "Filas de mensagens totalmente gerenciadas",
    sqsFeature2: "Serverless e auto-escalável",
    sqsFeature3: "Preço por solicitação",
    sqsFeature4: "Ideal para desacoplar microsserviços",
    sqsFeature5: "Opções de filas Standard e FIFO",
    sqsDocs: "Documentação AWS SQS",

    // Kafka Features
    kafkaTitle: "Apache Kafka (MSK)",
    kafkaFeature1: "Streaming de eventos de alta capacidade",
    kafkaFeature2: "Replay e retenção de mensagens",
    kafkaFeature3: "Ideal para processamento complexo de eventos",
    kafkaFeature4: "Requer infraestrutura de brokers",
    kafkaFeature5: "Melhor para análise em tempo real",
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
  },
}

export function useTranslation(locale: Locale) {
  return translations[locale]
}
