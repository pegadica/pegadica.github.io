const STORAGE_KEY = "prompt-studio-pro-state-v1";
const OUTPUT_TYPES = ["image", "video", "speech"];

const COPY_STYLES = [
  { id: "aida", name: "AIDA — Atenção, Interesse, Desejo, Ação" },
  { id: "pas", name: "PAS — Problema, Agitação, Solução" },
  { id: "social", name: "Depoimento — comprei e gostei" },
  { id: "technical", name: "Venda técnica — recursos e capacidades" },
  { id: "urgencia", name: "Urgência / FOMO" },
  { id: "transformacao", name: "Transformação — antes e depois" },
];

const COPY_FRAMEWORKS = {
  aida: "Siga AIDA: abra prendendo a atencao, gere interesse com um diferencial concreto, desperte desejo mostrando o beneficio na vida real e conduza para uma acao natural.",
  pas: "Siga PAS: apresente um problema real do publico, aumente a relevancia dessa dor sem dramatizar e mostre o produto como solucao pratica.",
  social: "Fale em primeira pessoa como cliente real: diga naturalmente que comprou ou recebeu o produto, por que decidiu testar, o que gostou ao usar e por que recomenda. O relato deve soar espontaneo e pessoal, nunca como texto publicitario decorado. Nao invente prazo de entrega, avaliacao, nota, quantidade vendida, resultado ou experiencia que nao possa ser sustentada pela descricao.",
  technical: "Faca uma venda tecnica clara: identifique na descricao todas as especificacoes, recursos, materiais, dimensoes, capacidades, compatibilidades, modos de uso e diferenciais verificaveis; explique o beneficio pratico de cada ponto relevante. Nao invente nenhuma ficha tecnica. Quando o tempo nao comportar tudo, priorize os dados que mais influenciam a compra em vez de falar rapido ou tornar a fala artificial.",
  urgencia: "Use urgencia com responsabilidade: crie senso de oportunidade e incentive a decisao agora, mas nao invente estoque, prazo, desconto, preco ou promocao que nao constem na descricao.",
  transformacao: "Conte uma transformacao plausivel: contraste a situacao antes com a experiencia depois de usar o produto, sem promessas irreais e apoiando tudo na descricao.",
};

const THEMES = [
  ["dracula", "Dracula", "dark"],
  ["gruvbox-dark", "Gruvbox Dark", "dark"],
  ["everforest-dark", "Everforest Dark", "dark"],
  ["nord-night", "Nord Night", "dark"],
  ["tokyo-night", "Tokyo Night", "dark"],
  ["catppuccin-mocha", "Catppuccin Mocha", "dark"],
  ["solarized-dark", "Solarized Dark", "dark"],
  ["notion-light", "Notion Light", "light"],
  ["github-light", "GitHub Light", "light"],
  ["gruvbox-light", "Gruvbox Light", "light"],
  ["everforest-light", "Everforest Light", "light"],
  ["nord-snow", "Nord Snow", "light"],
  ["solarized-light", "Solarized Light", "light"],
  ["catppuccin-latte", "Catppuccin Latte", "light"],
];

const ETNIAS = [
  "sem especificar",
  "branca",
  "parda",
  "preta",
  "indigena brasileira",
  "asiatico-brasileira",
  "arabe-brasileira",
  "miscigenada brasileira",
];

const IDADES = [
  "adulto jovem, entre 20 e 30 anos",
  "adulto, entre 30 e 45 anos",
  "adulto maduro, entre 45 e 60 anos",
  "idoso, acima de 60 anos",
];

const CORPOS = [
  "maromba",
  "atleta",
  "magro",
  "medio",
  "robusto",
  "gordo",
  "obeso",
];

const BODY_PROMPTS = {
  maromba: "corpo maromba, extremamente musculoso, peito largo, ombros grandes, braços muito fortes, pernas fortes e musculatura evidente",
  atleta: "corpo de atleta, fisico esportivo definido, forte e proporcional, com musculos aparentes sem exagero de fisiculturista",
  magro: "corpo magro, silhueta fina, braços e pernas finos, pouca gordura corporal e estrutura corporal leve",
  medio: "corpo medio, proporcao comum brasileira, sem ser magro, sem ser musculoso e sem ser gordo",
  robusto: "corpo robusto, grande, largo, forte e pesado, com ombros e tronco largos, sem parecer obeso",
  gordo: "corpo gordo, barriga grande, braços e pernas cheios, rosto mais cheio e volume corporal claramente acima do medio",
  obeso: "corpo obeso, muito gordo, barriga muito grande, silhueta extremamente arredondada e volumosa, com volume corporal evidente em todo o corpo",
};

const SOTAQUES = [
  "sudeste",
  "norte",
  "nordeste",
  "centro-oeste",
  "sul",
];

const PROFISSOES = [
  { id: "automatico", name: "Automático", prompt: "" },
  { id: "vendedor", name: "Vendedor(a)", prompt: "vendedor ou vendedora de loja, comunicativo, postura comercial natural, roupa simples e atendimento simpatico" },
  { id: "pedreiro", name: "Pedreiro", prompt: "pedreiro brasileiro, trabalhador de obra, postura pratica, roupa de trabalho simples, aparencia realista de quem trabalha com construcao" },
  { id: "mecanico", name: "Mecânico", prompt: "mecanico brasileiro, roupa de oficina, postura pratica, aparencia de profissional que trabalha com ferramentas e manutencao" },
  { id: "cozinheiro", name: "Cozinheiro(a)", prompt: "cozinheiro ou cozinheira, aparencia de profissional de cozinha, roupa simples e limpa, postura pratica e cuidadosa" },
  { id: "professor", name: "Professor(a)", prompt: "professor ou professora, aparencia educada e didatica, postura calma, confiavel e explicativa" },
  { id: "enfermeiro", name: "Enfermeiro(a)", prompt: "enfermeiro ou enfermeira, aparencia de profissional de saude, roupa discreta e limpa, postura cuidadosa e confiavel" },
  { id: "medico", name: "Médico(a)", prompt: "medico ou medica, aparencia de profissional de saude, postura calma e confiavel, sem parecer propaganda falsa" },
  { id: "personal", name: "Personal trainer", prompt: "personal trainer, aparencia esportiva, postura energica e profissional, roupa fitness discreta" },
  { id: "esteticista", name: "Esteticista", prompt: "esteticista, aparencia de profissional de beleza, postura cuidadosa, roupa simples e organizada" },
  { id: "barbeiro", name: "Barbeiro / cabeleireira", prompt: "barbeiro ou cabeleireira, aparencia de profissional de salao, postura comunicativa e cuidadosa" },
  { id: "dona_de_casa", name: "Dona(o) de casa", prompt: "pessoa comum cuidando da casa, aparencia domestica brasileira, roupa casual simples e postura pratica" },
  { id: "lojista", name: "Lojista", prompt: "lojista brasileiro, postura de dono de pequeno comercio, comunicativo, confiavel e natural" },
  { id: "tecnico", name: "Técnico(a)", prompt: "tecnico ou tecnica de manutencao, aparencia pratica, roupa de trabalho simples, postura objetiva e confiavel" },
  { id: "influencer", name: "Influencer", prompt: "influenciador ou influenciadora UGC, aparencia natural, carisma discreto, fala espontanea e postura de recomendacao real" },
];

const AMBIENTES = [
  "automatico conforme o produto",
  "casa brasileira comum",
  "cozinha brasileira comum",
  "area de servico brasileira",
  "area gourmet brasileira",
  "sala brasileira comum",
  "quarto brasileiro comum",
  "banheiro brasileiro comum",
  "loja popular brasileira",
  "ambiente domestico simples",
  "ambiente domestico medio padrao",
  "quintal, varanda ou area externa",
  "estudio UGC minimalista",
  "mesa de unboxing em casa",
];

const PUBLICOS = [
  "publico geral de marketplace",
  "mulheres comprando para casa",
  "homens buscando praticidade",
  "familias brasileiras",
  "jovens adultos",
  "publico premium discreto",
  "lojistas e revendedores",
  "pessoas que valorizam custo-beneficio",
];

const ESTRATEGIAS = [
  "UGC natural",
  "marketplace vendedor",
  "premium confiavel",
  "comparativo discreto",
  "demonstracao pratica",
  "antes e depois sem exagero",
  "lancamento de produto",
  "oferta sem parecer propaganda",
];

const TONS = [
  "natural, simples e convincente",
  "calmo, confiavel e consultivo",
  "popular, direto e brasileiro",
  "premium, discreto e elegante",
  "animado sem exagero",
  "tecnico leve, facil de entender",
  "UGC espontaneo",
];

const PRODUCT_PRESETS = [
  {
    id: "auto",
    name: "Automático",
    type: "external",
    environment: "automatico conforme o produto",
    strategy: "UGC natural",
    hint: "Identificar automaticamente o tipo de produto pela descricao.",
  },
  {
    id: "wear",
    name: "Roupa / moda",
    type: "wearable",
    environment: "quarto brasileiro comum",
    strategy: "UGC natural",
    hint: "Mostrar caimento, tecido, costura, estampa, proporcao e uso real no corpo.",
  },
  {
    id: "shoes",
    name: "Calçado",
    type: "wearable",
    environment: "quarto brasileiro comum",
    strategy: "demonstracao pratica",
    hint: "Mostrar o calcado no pe, com escala real, solado e acabamento visiveis.",
  },
  {
    id: "appliance",
    name: "Eletrodoméstico",
    type: "external",
    environment: "cozinha brasileira comum",
    strategy: "marketplace vendedor",
    hint: "Preservar portas, botoes, puxadores, visor, marca, medidas e proporcao.",
  },
  {
    id: "furniture",
    name: "Móvel",
    type: "external",
    environment: "sala brasileira comum",
    strategy: "premium confiavel",
    hint: "Mostrar tecido, estrutura, pes, textura, dimensoes e proporcao no ambiente.",
  },
  {
    id: "electronics",
    name: "Eletrônico",
    type: "external",
    environment: "mesa de unboxing em casa",
    strategy: "demonstracao pratica",
    hint: "Evitar interface falsa; preservar tela, botoes, entradas, acabamento e escala.",
  },
  {
    id: "beauty",
    name: "Beleza / cosmético",
    type: "external",
    environment: "banheiro brasileiro comum",
    strategy: "UGC natural",
    hint: "Mostrar embalagem nitida, textura quando houver, uso real sem prometer resultado medico.",
  },
  {
    id: "kitchen",
    name: "Cozinha / utensílio",
    type: "external",
    environment: "cozinha brasileira comum",
    strategy: "demonstracao pratica",
    hint: "Mostrar uso na bancada, mao proporcional e funcao principal de forma realista.",
  },
  {
    id: "fitness",
    name: "Fitness",
    type: "external",
    environment: "casa brasileira comum",
    strategy: "demonstracao pratica",
    hint: "Mostrar uso seguro, escala real e movimento natural, sem corpo artificial.",
  },
  {
    id: "decor",
    name: "Decoração",
    type: "external",
    environment: "sala brasileira comum",
    strategy: "premium confiavel",
    hint: "Mostrar composicao domestica realista, materiais, textura, cor e dimensao.",
  },
  {
    id: "pet",
    name: "Pet",
    type: "external",
    environment: "casa brasileira comum",
    strategy: "UGC natural",
    hint: "Mostrar o produto com contexto domestico e sem exagerar reacao do animal.",
  },
  {
    id: "automotive",
    name: "Automotivo",
    type: "external",
    environment: "quintal, varanda ou area externa",
    strategy: "demonstracao pratica",
    hint: "Mostrar encaixe, instalacao ou uso no veiculo, sem marca errada.",
  },
  {
    id: "food",
    name: "Alimento / bebida",
    type: "external",
    environment: "cozinha brasileira comum",
    strategy: "UGC natural",
    hint: "Mostrar embalagem, preparo ou consumo realista sem promessas de saude.",
  },
];

const DEFAULT_TEMPLATES = {
  image: `Crie uma imagem vertical 9:16, realista, com nivel de realismo {{realismo}}, usando a imagem anexada como referencia visual principal do produto.

DEFINICOES:
- Modo de apresentacao: {{modo}}
{{linha_tipo_produto}}
- Preset: {{preset}}
- Estrategia: {{estrategia}}
- Publico: {{publico}}
- Ambiente: {{ambiente}}
{{linha_profissao}}

{{bloco_apresentacao}}

REGRAS DE REALISMO HUMANO:
{{bloco_realismo}}

NIVEL DE REALISMO SELECIONADO:
{{bloco_nivel_realismo}}

REGRAS DO PRODUTO:
{{bloco_produto}}

AMBIENTE:
{{bloco_ambiente}}

REGRAS CONTRA TEXTO E ARTE PROMOCIONAL:
{{bloco_sem_texto}}

DIRECAO CRIATIVA:
{{direcao_criativa}}

Evitar absolutamente:
{{evitar}}

DESCRICAO DO PRODUTO:
<<<
{{descricao}}
>>>`,

  video: `Crie um video vertical 9:16, duracao exata de {{duracao}} segundos, estilo realista, nivel de realismo {{realismo}}, usando a imagem anexada como referencia visual principal do produto.

DEFINICOES:
- Modo de apresentacao: {{modo}}
{{linha_tipo_produto}}
- Preset: {{preset}}
- Estrategia: {{estrategia}}
- Publico: {{publico}}
- Ambiente: {{ambiente}}
{{linha_profissao}}
- Voz: {{voz}}
- Sotaque: {{sotaque}}
- Intensidade do sotaque: {{intensidade_sotaque}}
- Tom: {{tom}}

{{bloco_apresentacao}}

REGRAS DE REALISMO HUMANO:
{{bloco_realismo}}

NIVEL DE REALISMO SELECIONADO:
{{bloco_nivel_realismo}}

REGRAS DO PRODUTO:
{{bloco_produto}}

AMBIENTE:
{{bloco_ambiente}}

MOVIMENTO E DISTANCIA DE CAMERA:
{{bloco_camera}}

ESTRUTURA DE COPY:
{{bloco_copy}}

FUNCAO DESTE TAKE:
{{bloco_take}}

CONTINUIDADE ENTRE TAKES:
{{bloco_continuidade}}

QUALIDADE DE IMAGEM E AUDIO:
{{bloco_audio}}

FALA:
Crie automaticamente uma fala em PT-BR com base somente na descricao do produto.
Nao invente caracteristicas que nao estejam na descricao.
Nao cite preco, frete, estoque, loja, avaliacoes, cupom, parcelas ou quantidade vendida.

{{bloco_sotaque}}
{{lip_sync}}

A fala deve ocupar os {{duracao}} segundos completos, com {{palavras}} distribuidas em {{frases}}.
{{cta}}

Tom da fala:
- {{tom}};
- brasileiro;
- simples;
- convincente;
- como uma pessoa comum recomendando o produto;
- sem parecer leitura tecnica;
- sem parecer vendedor exagerado.

Evitar absolutamente:
{{evitar}}, fala curta demais, silencio nos ultimos segundos, inventar informacoes, legenda automatica, texto na tela.

DESCRICAO DO PRODUTO:
<<<
{{descricao}}
>>>`,

  speech: `Com base na descricao do produto abaixo, crie apenas a fala em PT-BR para um video de {{duracao}} segundos.

ESTRUTURA DE COPY:
{{bloco_copy}}

A fala deve:
- usar {{voz}};
- ter {{palavras}};
- ser distribuida em {{frases}};
- ocupar os {{duracao}} segundos completos;
- seguir o tom: {{tom}};
- conversar com: {{publico}};
- soar natural, brasileira, simples e convincente;
- nao citar preco, frete, estoque, loja, avaliacoes, cupom, parcelas ou quantidade vendida;
- nao inventar caracteristicas que nao estejam na descricao.

{{bloco_sotaque}}
{{cta}}

DESCRICAO DO PRODUTO:
<<<
{{descricao}}
>>>`,
};

const DEFAULT_STATE = {
  theme: "dracula",
  activeTab: "image",
  description: "",
  settings: {
    presetId: "auto",
    mode: "POV",
    productType: "external",
    duration: 10,
    realism: "muito alto",
    environment: "automatico conforme o produto",
    audience: "publico geral de marketplace",
    strategy: "UGC natural",
    gender: "mulher",
    ethnicity: "parda",
    age: "adulto, entre 30 e 45 anos",
    body: "medio",
    accent: "sudeste",
    accentIntensity: "marcado",
    tone: "natural, simples e convincente",
    cta: "confere no link",
    profession: "automatico",
    cameraDistance: "medio",
    influencerPosition: "atras",
    influencerPosture: "em_pe",
    copyStyle: "aida",
    takeCount: 1,
    includeCta: false,
    noText: true,
    preserveProduct: true,
    wholeProduct: true,
    realHands: true,
    allowHand: true,
    naturalSkin: true,
    naturalHair: true,
    wrinkledClothes: true,
    relaxedPosture: true,
    livedInEnvironment: false,
    phoneCapture: true,
    naturalLighting: true,
    naturalMotion: true,
  },
  outputs: {
    image: "",
    video: "",
    speech: "",
  },
  videoTakes: [],
  activeTake: 0,
  templates: { ...DEFAULT_TEMPLATES },
  history: [],
};

const $ = (id) => document.getElementById(id);

let state = loadState();

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return clone(DEFAULT_STATE);
    const loaded = {
      ...clone(DEFAULT_STATE),
      ...saved,
      settings: { ...clone(DEFAULT_STATE.settings), ...(saved.settings || {}) },
      outputs: { ...clone(DEFAULT_STATE.outputs), ...(saved.outputs || {}) },
      videoTakes: Array.isArray(saved.videoTakes) ? saved.videoTakes : [],
      templates: { ...clone(DEFAULT_TEMPLATES), ...(saved.templates || {}) },
      history: Array.isArray(saved.history) ? saved.history : [],
    };
    if (!OUTPUT_TYPES.includes(loaded.activeTab)) loaded.activeTab = "image";
    return loaded;
  } catch {
    return clone(DEFAULT_STATE);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalizeState() {
  if (!CORPOS.includes(state.settings.body)) state.settings.body = "medio";
  if (!SOTAQUES.includes(state.settings.accent)) state.settings.accent = "sudeste";
  if (!PROFISSOES.some((item) => item.id === state.settings.profession)) {
    state.settings.profession = "automatico";
  }
  if (!["perto", "medio", "longe"].includes(state.settings.cameraDistance)) state.settings.cameraDistance = "medio";
  if (!["direita", "esquerda", "atras"].includes(state.settings.influencerPosition)) state.settings.influencerPosition = "atras";
  if (!["em_pe", "agachado"].includes(state.settings.influencerPosture)) state.settings.influencerPosture = "em_pe";
  if (!COPY_STYLES.some((item) => item.id === state.settings.copyStyle)) state.settings.copyStyle = "aida";
  state.settings.takeCount = Math.min(3, Math.max(1, Number(state.settings.takeCount) || 1));
  state.activeTake = Math.min(Math.max(0, Number(state.activeTake) || 0), Math.max(0, state.videoTakes.length - 1));
}

function fillSelect(id, options, selected) {
  const select = $(id);
  select.innerHTML = "";
  options.forEach((option) => {
    const item = document.createElement("option");
    if (Array.isArray(option)) {
      item.value = option[0];
      item.textContent = option[1];
    } else if (typeof option === "object") {
      item.value = option.id;
      item.textContent = option.name;
    } else {
      item.value = option;
      item.textContent = option;
    }
    select.appendChild(item);
  });
  if (selected !== undefined) select.value = selected;
}

function init() {
  fillSelect("themeSelect", THEMES.map(([id, name]) => [id, name]), state.theme);
  fillSelect("productPreset", PRODUCT_PRESETS, state.settings.presetId);
  fillSelect("environmentSelect", AMBIENTES, state.settings.environment);
  fillSelect("audienceSelect", PUBLICOS, state.settings.audience);
  fillSelect("strategySelect", ESTRATEGIAS, state.settings.strategy);
  fillSelect("ethnicitySelect", ETNIAS, state.settings.ethnicity);
  fillSelect("ageSelect", IDADES, state.settings.age);
  fillSelect("bodySelect", CORPOS, state.settings.body);
  fillSelect("accentSelect", SOTAQUES, state.settings.accent);
  fillSelect("toneSelect", TONS, state.settings.tone);
  fillSelect("professionSelect", PROFISSOES, state.settings.profession);
  fillSelect("copyStyleSelect", COPY_STYLES, state.settings.copyStyle);
  normalizeState();
  applyStateToUI();
  bindEvents();
  renderOutput();
}

function applyStateToUI() {
  document.body.dataset.theme = state.theme;
  $("themeSelect").value = state.theme;
  $("productPreset").value = state.settings.presetId;
  $("modeSelect").value = state.settings.mode;
  $("productType").value = state.settings.productType;
  $("durationInput").value = state.settings.duration;
  $("realismSelect").value = state.settings.realism;
  $("environmentSelect").value = state.settings.environment;
  $("audienceSelect").value = state.settings.audience;
  $("strategySelect").value = state.settings.strategy;
  $("genderSelect").value = state.settings.gender;
  $("ethnicitySelect").value = state.settings.ethnicity;
  $("ageSelect").value = state.settings.age;
  $("bodySelect").value = state.settings.body;
  $("accentSelect").value = state.settings.accent;
  $("accentIntensity").value = state.settings.accentIntensity;
  $("toneSelect").value = state.settings.tone;
  $("ctaInput").value = state.settings.cta;
  $("professionSelect").value = state.settings.profession;
  $("cameraDistanceSelect").value = state.settings.cameraDistance;
  $("influencerPositionSelect").value = state.settings.influencerPosition;
  $("influencerPostureSelect").value = state.settings.influencerPosture;
  $("copyStyleSelect").value = state.settings.copyStyle;
  $("takeCountSelect").value = String(state.settings.takeCount);
  $("includeCta").checked = state.settings.includeCta;
  $("noText").checked = state.settings.noText;
  $("preserveProduct").checked = state.settings.preserveProduct;
  $("wholeProduct").checked = state.settings.wholeProduct;
  $("realHands").checked = state.settings.realHands;
  $("allowHand").checked = state.settings.allowHand;
  $("naturalSkin").checked = state.settings.naturalSkin;
  $("naturalHair").checked = state.settings.naturalHair;
  $("wrinkledClothes").checked = state.settings.wrinkledClothes;
  $("relaxedPosture").checked = state.settings.relaxedPosture;
  $("livedInEnvironment").checked = state.settings.livedInEnvironment;
  $("phoneCapture").checked = state.settings.phoneCapture;
  $("naturalLighting").checked = state.settings.naturalLighting;
  $("naturalMotion").checked = state.settings.naturalMotion;
  $("descriptionInput").value = state.description;
  updateProductTypeVisibility();
  updateStats();
}

function bindEvents() {
  $("themeSelect").addEventListener("change", () => {
    state.theme = $("themeSelect").value;
    document.body.dataset.theme = state.theme;
    saveState();
    toast("Tema aplicado.", "success");
  });

  [
    ["modeSelect", "mode"],
    ["productType", "productType"],
    ["realismSelect", "realism"],
    ["environmentSelect", "environment"],
    ["audienceSelect", "audience"],
    ["strategySelect", "strategy"],
    ["genderSelect", "gender"],
    ["ethnicitySelect", "ethnicity"],
    ["ageSelect", "age"],
    ["bodySelect", "body"],
    ["accentSelect", "accent"],
    ["accentIntensity", "accentIntensity"],
    ["toneSelect", "tone"],
    ["professionSelect", "profession"],
    ["cameraDistanceSelect", "cameraDistance"],
    ["influencerPositionSelect", "influencerPosition"],
    ["influencerPostureSelect", "influencerPosture"],
    ["copyStyleSelect", "copyStyle"],
  ].forEach(([id, key]) => {
    $(id).addEventListener("change", () => {
      state.settings[key] = $(id).value;
      saveState();
      if (key === "mode") updateProductTypeVisibility();
    });
  });

  $("takeCountSelect").addEventListener("change", () => {
    state.settings.takeCount = Number($("takeCountSelect").value);
    state.videoTakes = [];
    state.activeTake = 0;
    saveState();
    renderTakeNavigator();
  });

  $("toolbarTakeSelect").addEventListener("change", () => {
    selectTake(Number($("toolbarTakeSelect").value), true);
  });

  $("durationInput").addEventListener("input", () => {
    const value = Number($("durationInput").value);
    if (!Number.isFinite(value) || value <= 0) return;
    state.settings.duration = Math.floor(value);
    saveState();
  });

  $("durationInput").addEventListener("change", () => {
    const value = Number($("durationInput").value);
    state.settings.duration = Number.isFinite(value) && value > 0 ? Math.floor(value) : 1;
    $("durationInput").value = state.settings.duration;
    saveState();
  });

  $("productPreset").addEventListener("change", applyPreset);

  [
    ["ctaInput", "cta"],
  ].forEach(([id, key]) => {
    $(id).addEventListener("input", () => {
      state.settings[key] = $(id).value;
      saveState();
    });
  });

  [
    ["includeCta", "includeCta"],
    ["noText", "noText"],
    ["preserveProduct", "preserveProduct"],
    ["wholeProduct", "wholeProduct"],
    ["realHands", "realHands"],
    ["allowHand", "allowHand"],
    ["naturalSkin", "naturalSkin"],
    ["naturalHair", "naturalHair"],
    ["wrinkledClothes", "wrinkledClothes"],
    ["relaxedPosture", "relaxedPosture"],
    ["livedInEnvironment", "livedInEnvironment"],
    ["phoneCapture", "phoneCapture"],
    ["naturalLighting", "naturalLighting"],
    ["naturalMotion", "naturalMotion"],
  ].forEach(([id, key]) => {
    $(id).addEventListener("change", () => {
      state.settings[key] = $(id).checked;
      saveState();
    });
  });

  $("descriptionInput").addEventListener("input", () => {
    state.description = $("descriptionInput").value;
    saveState();
    updateStats();
  });

  $("outputText").addEventListener("input", () => {
    state.outputs[state.activeTab] = $("outputText").value;
    if (state.activeTab === "video" && state.videoTakes[state.activeTake]) {
      state.videoTakes[state.activeTake].prompt = $("outputText").value;
    }
    saveState();
    updateStats();
  });

  document.querySelectorAll("#promptTabs button").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeTab = button.dataset.tab;
      saveState();
      renderOutput();
    });
  });

  $("btnGenerateImage").addEventListener("click", () => generate("image"));
  $("btnGenerateVideo").addEventListener("click", () => generate("video"));
  $("btnGenerateSpeech").addEventListener("click", () => generate("speech"));
  $("btnCopyCurrent").addEventListener("click", () => copyText($("outputText").value));
  $("btnExportPrompt").addEventListener("click", exportCurrentPrompt);
  $("btnImportConfig").addEventListener("click", () => $("configFileInput").click());
  $("btnExportConfig").addEventListener("click", exportConfig);
  $("btnReset").addEventListener("click", resetSettings);
  $("btnClearAll").addEventListener("click", clearAll);
  $("btnClearDescription").addEventListener("click", clearDescription);
  $("btnTemplates").addEventListener("click", openTemplates);
  $("btnHistory").addEventListener("click", openHistory);
  $("configFileInput").addEventListener("change", importConfig);

  $("templateType").addEventListener("change", loadTemplateEditor);
  $("btnTemplateSave").addEventListener("click", saveTemplate);
  $("btnTemplateDefault").addEventListener("click", restoreDefaultTemplate);
  $("historySearch").addEventListener("input", renderHistory);
  $("btnClearHistory").addEventListener("click", clearHistory);
}

function applyPreset() {
  const preset = PRODUCT_PRESETS.find((item) => item.id === $("productPreset").value) || PRODUCT_PRESETS[0];
  state.settings.presetId = preset.id;
  state.settings.productType = preset.type;
  state.settings.environment = preset.environment;
  state.settings.strategy = preset.strategy;
  applyStateToUI();
  saveState();
  toast("Preset aplicado.", "success");
}

function updateProductTypeVisibility() {
  const relevant = state.settings.mode === "Influencer";
  $("productTypeField").hidden = !relevant;
  $("influencerPositionField").hidden = !relevant;
  $("influencerPostureField").hidden = !relevant;
}

function readProfile() {
  const s = state.settings;
  const preset = PRODUCT_PRESETS.find((item) => item.id === s.presetId) || PRODUCT_PRESETS[0];
  const genero = s.gender === "mulher" ? "mulher brasileira comum" : "homem brasileiro comum";
  const voz = s.gender === "mulher" ? "voz feminina" : "voz masculina";
  const etnia = s.ethnicity === "sem especificar" ? "sem etnia especifica" : s.ethnicity;
  const productTypeRelevant = s.mode === "Influencer";
  const effectiveProductType = productTypeRelevant ? s.productType : "external";
  const tipo = productTypeRelevant
    ? (effectiveProductType === "wearable" ? "Interno / roupa ou item de vestir" : "Externo / objeto separado")
    : "";
  const profession = PROFISSOES.find((item) => item.id === s.profession) || PROFISSOES[0];
  const professionPrompt = profession.id === "automatico" ? "" : profession.prompt;
  const bodyPrompt = BODY_PROMPTS[s.body] || BODY_PROMPTS.medio;

  return {
    ...s,
    presetName: preset.name,
    presetHint: preset.hint,
    productType: effectiveProductType,
    productTypeRelevant,
    genero,
    voz,
    etnia,
    professionName: profession.name,
    professionPrompt,
    bodyPrompt,
    tipo,
    descricao: condenseDescription(state.description),
    titulo: extractTitle(state.description),
  };
}

function condenseDescription(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function extractTitle(text) {
  const firstLine = (text || "").split(/\n/).map((line) => line.trim()).find(Boolean);
  if (!firstLine) return "Produto sem titulo";
  return firstLine.replace(/[.;:]+$/, "").slice(0, 90);
}

function wordsByDuration(seconds) {
  const n = Number(seconds);
  if (n <= 7) return "aproximadamente 18 a 24 palavras";
  if (n <= 10) return "aproximadamente 26 a 34 palavras";
  if (n <= 15) return "aproximadamente 38 a 48 palavras";
  if (n <= 20) return "aproximadamente 52 a 66 palavras";
  return "aproximadamente 76 a 95 palavras";
}

function sentencesByDuration(seconds) {
  const n = Number(seconds);
  if (n <= 7) return "1 ou 2 frases curtas";
  if (n <= 10) return "2 frases curtas";
  if (n <= 15) return "2 ou 3 frases curtas";
  if (n <= 20) return "3 frases naturais";
  return "3 ou 4 frases naturais";
}

function accentBlock(profile) {
  return `A voz deve ser em PT-BR com sotaque brasileiro da macro-regiao ${profile.accent}, em intensidade ${profile.accentIntensity}. O sotaque deve ser perceptivel, humano e regional, mas ainda natural, claro e facil de entender. Nao transformar o sotaque em caricatura.`;
}

function environmentBlock(profile) {
  if (profile.environment === "automatico conforme o produto") {
    return `O ambiente deve ser escolhido automaticamente conforme o tipo de produto:
- geladeira, freezer ou fogao: cozinha brasileira comum, com escala real;
- lavadora, secadora ou tanquinho: lavanderia ou area de servico brasileira;
- roupa, calcado ou item vestivel: ambiente real de uso, quarto, espelho ou cena cotidiana;
- movel: sala, quarto ou ambiente domestico adequado;
- cosmetico: banheiro, bancada ou ambiente de uso realista;
- eletronico compacto: mesa de unboxing, escritorio simples ou bancada;
- produto externo: quintal, varanda ou area gourmet coerente.`;
  }
  return `O ambiente deve ser: ${profile.environment}. Deve parecer brasileiro, realista, organizado e coerente com o produto.`;
}

function humanRealismBlock(profile) {
  const lines = [];
  if (profile.mode === "POV") {
    lines.push("- A mao em primeiro plano, quando aparecer, deve parecer real, humana, brasileira e compativel com genero, etnia, idade e tipo fisico escolhidos.");
  } else {
    lines.push("- A pessoa deve parecer real, brasileira, humana e compativel com genero, etnia, idade e tipo fisico escolhidos.");
  }
  if (profile.naturalSkin) lines.push("- Pele com poros, pequenas marcas, microvariacoes de tom e brilho natural; nunca plastica ou excessivamente retocada.");
  if (profile.naturalHair) lines.push("- Cabelo com fios soltos, leve frizz, volume irregular e acabamento humano, sem penteado geometricamente perfeito.");
  if (profile.wrinkledClothes) lines.push("- Roupa com dobras naturais, costuras visiveis, tensao real do tecido e pequenas irregularidades de uso.");
  if (profile.relaxedPosture) lines.push("- Postura relaxada, assimetria corporal sutil e expressao espontanea, sem pose rigida ou ensaiada.");
  if (profile.livedInEnvironment) lines.push("- Ambiente cotidiano com organizacao imperfeita e texturas reais, sem sujeira excessiva nem cenario cenografico.");
  if (profile.phoneCapture) lines.push("- Aparencia autentica de captura por celular moderno: imagem limpa, nitida e organica, lente plausivel e boa qualidade, sem simular defeitos de gravacao.");
  if (profile.naturalLighting) lines.push("- Luz natural levemente desigual, sombras plausiveis e exposicao realista, preservando cor e detalhes do produto.");
  if (profile.naturalMotion) lines.push("- Em video, incluir microexpressoes faciais, respiracao discreta, pequenos ajustes de postura e gestos nao coreografados.");
  if (profile.realHands) lines.push("- Maos anatomicamente corretas, com dobras, unhas e articulacoes naturais; sem dedos extras ou fundidos.");
  lines.push("- Evitar aparencia de modelo de banco de imagem, pele perfeita demais, pose glamourosa demais e propaganda falsa.");
  lines.push("- Expressao natural, simpatica e confiavel, como alguem mostrando uma compra real.");
  lines.push("- Roupa complementar comum, cotidiana e brasileira, sem luxo exagerado e sem uniforme, exceto se o pedido exigir.");
  lines.push("- O tipo fisico escolhido precisa ser visualmente claro e aparente, sem suavizar o corpo para um padrao generico.");
  if (profile.professionPrompt) {
    lines.push(`- Profissao/aparencia profissional do apresentador: ${profile.professionPrompt}.`);
  }
  return lines.join("\n");
}

function realismLevelBlock(profile, kind) {
  const medium = kind === "video" ? "video" : "imagem";
  const levels = {
    alto: `REALISMO ALTO: produzir ${medium} convincente, com anatomia correta, materiais reconheciveis, luz coerente e produto fiel. Permitir acabamento visual limpo, mas sem pele plastica ou objetos artificiais.`,
    "muito alto": `REALISMO MUITO ALTO: simular captura fotografica real, com poros, microtexturas, fibras, reflexos fisicamente plausiveis, profundidade optica natural, pequenas assimetrias e integracao perfeita entre pessoa, produto e ambiente.`,
    "máximo": `REALISMO MAXIMO: priorizar fidelidade documental. Aplicar anatomia rigorosa, fisica correta, perspectiva e escala consistentes, textura microscopica, sensor e lente plausiveis, iluminacao global natural e ausencia total de sinais tipicos de IA.`,
    "cinematográfico realista": `REALISMO CINEMATOGRAFICO: usar composicao, profundidade, movimento e luz de cinema, mantendo pele, corpo, produto e ambiente autenticos. Nao estilizar a ponto de parecer CGI, publicidade artificial ou cena excessivamente perfeita.`,
  };
  return levels[profile.realism] || levels["muito alto"];
}

function influencerPlacementBlock(profile) {
  const posture = profile.influencerPosture === "agachado"
    ? "agachado de forma natural e anatomicamente correta, com equilibrio e postura plausiveis"
    : "em pe, com postura relaxada e peso corporal distribuido naturalmente";
  const position = {
    direita: "no lado direito do produto na composicao, sem cobrir nenhuma parte importante",
    esquerda: "no lado esquerdo do produto na composicao, sem cobrir nenhuma parte importante",
    atras: "atras do produto, ligeiramente deslocado para manter rosto e produto visiveis",
  }[profile.influencerPosition] || "atras do produto";
  if (profile.productType === "wearable") {
    return `POSICAO DO INFLUENCER: como o produto esta vestido no corpo, posicionar a pessoa no lado ${profile.influencerPosition === "direita" ? "direito" : profile.influencerPosition === "esquerda" ? "esquerdo" : "central/ao fundo"} do enquadramento, ${posture}. Nao separar o produto do corpo para obedecer ao posicionamento.`;
  }
  return `POSICAO DO INFLUENCER: colocar a pessoa ${position}, ${posture}. O produto permanece em primeiro plano e visualmente dominante.`;
}

function presentationImage(profile) {
  if (profile.mode === "POV") {
    if (profile.productType === "wearable") {
      return `MODO POV PARA PRODUTO INTERNO/DE VESTIR

A imagem deve parecer feita em primeira pessoa, mostrando o produto em uso real no corpo.
O produto deve aparecer vestido, calcado, encaixado ou aplicado na parte correta do corpo.
Pode aparecer somente a parte do corpo necessaria para mostrar o uso, compativel com:
- genero: ${profile.genero}
- etnia/aparencia: ${profile.etnia}
- idade visual: ${profile.age}
- tipo fisico sugerido: ${profile.bodyPrompt}

Nao transformar roupa, calcado, acessorio vestivel ou item corporal em objeto solto na frente da camera.
O produto deve continuar sendo o foco principal e precisa estar visivel em uso realista.`;
    }

    const handRule = profile.allowHand
      ? `A unica parte humana permitida e uma mao em primeiro plano, compativel com:
- genero: ${profile.genero}
- etnia/aparencia: ${profile.etnia}
- idade visual: ${profile.age}
- tipo fisico sugerido: ${profile.bodyPrompt}

A mao pode apontar ou tocar discretamente uma lateral do produto, mas nunca pode cobrir marca, portas, puxadores, botoes, tecido, controles ou qualquer detalhe importante.`
      : "Nao mostrar nenhuma parte humana. A imagem deve ser somente o produto no ambiente realista.";

    return `MODO POV

A imagem deve parecer feita por uma pessoa comum olhando ou mostrando o produto com o celular.
Nao mostrar pessoa inteira, rosto, corpo, vendedor, modelo ou pessoa no fundo.

${handRule}

O produto deve ser o protagonista absoluto da cena.`;
  }

  if (profile.productType === "wearable") {
    return `MODO INFLUENCER PARA PRODUTO INTERNO/DE VESTIR

A imagem deve mostrar uma pessoa realista usando o produto no corpo, com:
- genero: ${profile.genero}
- etnia/aparencia: ${profile.etnia}
- idade visual: ${profile.age}
- tipo fisico: ${profile.bodyPrompt}

${influencerPlacementBlock(profile)}

Como o produto e interno/de vestir, o influenciador NAO deve ficar atras do produto como se ele fosse um objeto separado.
O produto deve aparecer vestido, calcado, encaixado ou aplicado no corpo de forma natural, na posicao correta de uso.

Regras:
- pose natural, brasileira, cotidiana e confiavel;
- mostrar o produto em uso real, sem flutuar, sem estar pendurado no ar e sem ficar separado do corpo;
- nao cobrir detalhes importantes do produto com maos, cabelo, objetos ou enquadramento;
- preservar tecido, caimento, costura, cor, estampa, solado, formato, acabamento, marca e proporcao;
- evitar pose artificial de catalogo luxuoso ou propaganda falsa.

O produto deve ser o destaque visual principal da cena, mas integrado ao corpo de forma realista.`;
  }

  return `MODO INFLUENCER

A imagem deve mostrar uma pessoa realista apresentando o produto, com:
- genero: ${profile.genero}
- etnia/aparencia: ${profile.etnia}
- idade visual: ${profile.age}
- tipo fisico: ${profile.bodyPrompt}

${influencerPlacementBlock(profile)}

O influenciador deve respeitar exatamente a posicao e postura selecionadas, olhando para a camera, com expressao simpatica, natural e carismatica.
O produto deve ficar na frente, centralizado ou em destaque, inteiro, nitido e mais importante visualmente do que a pessoa.

Regras:
- rosto visivel;
- pode aparecer em meio corpo ou corpo inteiro, desde que fique atras do produto;
- pode apoiar uma mao levemente na lateral ou no topo do produto;
- nao pode cobrir marca, portas, puxadores, botoes, visor, tecido, pes, controles ou detalhe essencial;
- deve parecer pessoa brasileira comum, realista e confiavel;
- roupa casual, simples e cotidiana.`;
}

function presentationVideo(profile) {
  if (profile.mode === "POV") {
    if (profile.productType === "wearable") {
      return `MODO POV PARA PRODUTO INTERNO/DE VESTIR

O video deve parecer gravado em primeira pessoa, mostrando o produto em uso real no corpo.
O produto deve aparecer vestido, calcado, encaixado ou aplicado naturalmente na parte correta do corpo.

Pode aparecer somente a parte do corpo necessaria para demonstrar o uso, compativel com:
- genero: ${profile.genero}
- etnia/aparencia: ${profile.etnia}
- idade visual: ${profile.age}
- tipo fisico sugerido: ${profile.bodyPrompt}

A fala deve funcionar como voz em off em ${profile.voz}.
Nao tratar roupa, calcado, acessorio vestivel ou item corporal como objeto solto na frente da camera.`;
    }

    return `MODO POV

O video deve parecer gravado por uma pessoa comum segurando o celular e mostrando o produto.
Nao mostrar pessoa inteira, rosto, corpo, vendedor, modelo ou pessoa no fundo.
${profile.allowHand ? "A unica parte humana permitida e uma mao em primeiro plano, apontando ou tocando levemente o produto sem cobrir partes importantes." : "Nao mostrar nenhuma parte humana."}

A fala deve funcionar como voz em off em ${profile.voz}, pois o rosto da pessoa nao aparece.
O produto deve ser o protagonista absoluto durante todo o video.`;
  }

  if (profile.productType === "wearable") {
    return `MODO INFLUENCER PARA PRODUTO INTERNO/DE VESTIR

O video deve mostrar uma pessoa realista usando o produto no corpo, com:
- genero: ${profile.genero}
- etnia/aparencia: ${profile.etnia}
- idade visual: ${profile.age}
- tipo fisico: ${profile.bodyPrompt}

${influencerPlacementBlock(profile)}

Como o produto e interno/de vestir, o influenciador NAO deve ficar atras do produto como se ele fosse um objeto separado.
O produto deve aparecer vestido, calcado, encaixado ou aplicado no corpo durante todo o video, na posicao correta de uso.

Regras:
- fala com lip sync natural em ${profile.voz};
- expressao simpatica, natural e carismatica;
- pose e gestos naturais, sem esconder o produto;
- pode apontar ou tocar levemente o produto em uso, sem cobrir detalhes importantes;
- nao separar o produto do corpo, nao deixar flutuando, nao colocar como objeto na frente da pessoa;
- preservar tecido, costura, cor, estampa, solado, formato, acabamento, marca, caimento e proporcao.`;
  }

  return `MODO INFLUENCER

O video deve mostrar uma pessoa realista apresentando o produto, com:
- genero: ${profile.genero}
- etnia/aparencia: ${profile.etnia}
- idade visual: ${profile.age}
- tipo fisico: ${profile.bodyPrompt}

${influencerPlacementBlock(profile)}

O influenciador deve respeitar exatamente a posicao e postura selecionadas, olhando para a camera e falando com lip sync natural.
O produto deve continuar mais importante visualmente que a pessoa durante todo o video.`;
}

function productRules(profile) {
  const lines = [];
  if (profile.wholeProduct) {
    lines.push(profile.productType === "wearable"
      ? "- O produto deve aparecer nitido, em destaque, INTEIRO e visivel em uso real no corpo durante 100% do video, sem ser tratado como objeto separado e sem nenhuma parte sair do quadro."
      : "- O produto deve permanecer INTEIRO, nitido, centralizado ou em destaque, bem focado e totalmente visivel durante 100% do video.");
  }
  lines.push("- AREA SEGURA OBRIGATORIA: manter uma margem visual folgada entre todas as extremidades do produto e as quatro bordas da tela (topo, base, esquerda e direita).");
  lines.push("- Nenhum movimento, aproximacao, zoom, reenquadramento, gesto ou transicao pode cortar, esconder ou fazer qualquer parte do produto encostar ou sair das bordas do quadro.");
  lines.push("- Antes de iniciar um zoom ou aproximacao, calcular o enquadramento final e interromper o movimento enquanto o produto ainda estiver inteiro e cercado por margem de seguranca visivel.");
  if (profile.preserveProduct) {
    lines.push(profile.productType === "wearable"
      ? "- Preservar cor, formato, marca, tecido, costuras, estampa, caimento, solado, acabamento, textura e proporcoes."
      : "- Preservar cor, formato, marca, portas, puxadores, botoes, visor, tecido, acabamento, pes, divisoes e proporcoes.");
  }
  lines.push("- Manter escala realista e proporcao coerente com uma pessoa brasileira adulta comum.");
  lines.push("- Nao inventar partes, luzes, telas, textos, selos, marcas, estampas ou funcionalidades que nao existam na descricao.");
  lines.push(`- Regra de categoria: ${profile.presetHint}`);
  if (profile.productType === "wearable") {
    lines.push("- Para roupas, calcados e itens vestiveis: mostrar o produto em uso no corpo, sem colocar o influenciador atras dele, sem flutuar e sem virar objeto de vitrine.");
  }
  return lines.join("\n");
}

function noTextRules(profile) {
  if (!profile.noText) {
    return "Nao adicionar texto promocional a menos que seja absolutamente necessario. Priorizar cena realista.";
  }
  return `Nao adicionar nenhum texto visual:
- sem titulo;
- sem preco;
- sem botao;
- sem selo;
- sem cupom;
- sem banner;
- sem legenda;
- sem palavra escrita;
- sem numeros flutuando;
- sem arte promocional pronta;
- sem interface de loja;
- sem elementos de marketplace.`;
}

function creativeDirection(profile) {
  return `A cena deve seguir a estrategia "${profile.strategy}" para ${profile.audience}.
O resultado precisa parecer conteudo real de uma pessoa recomendando uma compra, nao uma propaganda artificial.
Priorizar clareza visual, escala realista, detalhes do produto e confianca para conversao.`;
}

function avoidList(profile) {
  const avoid = [
    "produto cortado",
    "produto desfocado",
    "marca errada",
    "proporcao errada",
    "produto gigante demais",
    "produto pequeno demais",
    "aparencia artificial",
    "maos deformadas",
    "dedos extras",
    "dedos grudados",
    "reflexos exagerados",
    "fundo poluido",
    "ambiente luxuoso demais sem necessidade",
    "mudanca de cor ou formato do produto",
  ];

  if (profile.noText) {
    avoid.push("texto na imagem ou tela", "preco", "botao comprar", "cupom", "selo", "legenda", "banner", "letras soltas", "numeros flutuando");
  }

  if (profile.mode === "POV") {
    avoid.push("pessoa atras do produto", "vendedor", "vendedora", "influenciador", "modelo", "rosto humano", "corpo humano inteiro");
  } else {
    avoid.push("influenciador cobrindo o produto", "pessoa na frente do produto", "mao cobrindo detalhes importantes", "rosto deformado", "pose artificial", "sorriso exagerado", "aparencia de propaganda falsa");
  }

  if (profile.productType === "wearable") {
    avoid.push("produto vestivel separado do corpo", "influenciador atras de roupa ou calcado", "roupa flutuando", "calcado flutuando", "produto interno tratado como objeto de vitrine", "caimento deformado", "tecido derretido ou grudado na pele");
  }

  return avoid.join(", ") + ".";
}

function cameraMovementBlock(profile) {
  const influencerFocusRules = profile.mode === "Influencer"
    ? `- o alvo optico, o ponto de foco e o centro do enquadramento devem ser sempre O PRODUTO, nunca o rosto ou o corpo do influencer;\n- qualquer aproximacao, travelling, zoom ou correcao de enquadramento deve terminar no produto e nos detalhes dele;\n- manter o influencer em posicao secundaria ou periferica na composicao, sem permitir rastreamento facial, reenquadramento automatico no rosto ou mudanca de foco para a pessoa;\n- o rosto pode permanecer visivel quando necessario para a fala, mas nunca deve ocupar o centro visual nem receber mais destaque que o produto;`
    : "- o alvo optico, o ponto de foco e o centro do enquadramento devem permanecer no produto durante todo o take;";
  const common = `- usar camera de celular com movimento leve, natural e estavel;\n${influencerFocusRules}\n- manter o produto nitido, visualmente dominante e como foco principal durante todo o take;\n- REGRA ABSOLUTA DE AREA SEGURA: o produto deve permanecer 100% inteiro dentro do quadro, com margem folgada e claramente visivel entre ele e as quatro bordas da tela durante todos os frames;\n- nunca cortar topo, base, laterais, alcas, pes, mangas, solado, embalagem ou qualquer outra extremidade do produto;\n- todo zoom ou aproximacao deve parar antes de reduzir a margem de seguranca; se nao houver espaco suficiente, nao aproximar mais;\n- movimentos do influencer, da camera ou do produto nao podem provocar corte momentaneo, oclusao ou saida do produto da area segura;\n- nao tremer, nao cortar partes importantes e nao transformar a cena em comercial artificial.`;
  if (profile.cameraDistance === "perto") {
    return `- DISTANCIA PERTO: usar o enquadramento mais proximo possivel SOMENTE se ainda couber o produto inteiro com margem de seguranca em todos os lados;\n- mostrar detalhes, textura, acabamento ou uso sem sacrificar nenhuma extremidade do produto;\n- permitir apenas uma microaproximacao suave que pare antes de ameaçar a area segura;\n${common}`;
  }
  if (profile.cameraDistance === "longe") {
    return `- DISTANCIA LONGE: iniciar com plano aberto, mas ja manter O PRODUTO no centro optico da composicao e mostrar o contexto ao redor;\n- durante toda a minutagem do take, executar uma aproximacao lenta, continua e natural EM DIRECAO AO PRODUTO, nunca em direcao ao influencer;\n- terminar no plano mais proximo que ainda mostre o produto INTEIRO e com margem de seguranca folgada, sem zoom digital brusco;\n${common}`;
  }
  return `- DISTANCIA MEDIA: iniciar em plano medio, CENTRALIZADO NO PRODUTO, mostrando-o inteiro com contexto suficiente e margem folgada;\n- ao longo da minutagem do take, aproximar a camera gradualmente em direcao ao produto;\n- terminar no limite seguro que ainda preserve o produto inteiro e afastado das quatro bordas, nunca focando o rosto ou o corpo do influencer;\n${common}`;
}

function cleanMediaBlock() {
  return `- IMAGEM LIMPA: sem ruido digital, sem granulado, sem artefatos de compressao, sem pixels instaveis, sem flicker e sem aspecto de camera de baixa qualidade;
- o realismo deve vir da pele, materiais, luz, anatomia e movimentos naturais, nunca da degradacao da imagem;
- AUDIO LIMPO E NATURAL: voz clara, presente e inteligivel, gravada com boa captacao;
- sem chiado, ruido de fundo, vento no microfone, estalos, zumbido, eco excessivo, reverberacao artificial, distorcao ou cortes na voz;
- manter apenas uma ambiencia muito discreta e coerente com o local, sem competir com a fala;
- sem musica de fundo, salvo se solicitada explicitamente na descricao;
- volume de voz constante e natural, sem processamento robotico e sem parecer audio de estudio artificial.`;
}

function takePlan(count) {
  if (count === 2) {
    return [
      { title: "Gancho", instruction: "Prenda a atencao imediatamente com uma pergunta, situacao reconhecivel ou demonstracao visual forte. Apresente o problema ou a curiosidade e termine criando vontade de ver a continuacao. Nao conclua a venda ainda." },
      { title: "Valor e conversao", instruction: "Retome naturalmente a ideia anterior, mostre o produto resolvendo a necessidade, destaque beneficios concretos e encerre com desejo e conversao. Inclua CTA somente se ele estiver ativado nas configuracoes." },
    ];
  }
  if (count === 3) {
    return [
      { title: "Gancho", instruction: "Prenda a atencao nos primeiros instantes com uma pergunta, problema, contraste ou demonstracao visual. Gere curiosidade e nao entregue toda a resposta nem faca CTA neste take." },
      { title: "Desenvolvimento", instruction: "Continue a ideia do gancho e desenvolva o argumento. Demonstre o produto em uso, apresente caracteristicas e traduza-as em beneficios concretos. Nao reinicie a historia e nao faca CTA ainda." },
      { title: "Conversao", instruction: "Conclua a narrativa, reforce o principal beneficio e transforme interesse em decisao. Termine com CTA somente se ele estiver ativado nas configuracoes." },
    ];
  }
  return [
    { title: "Video completo", instruction: "Conte a historia completa em um unico take continuo: gancho, desenvolvimento, beneficio e conversao, respeitando a duracao configurada." },
  ];
}

function copyGuidanceForTake(profile, count, takeIndex) {
  if (profile.copyStyle === "social") {
    if (count === 1) return "Estruture o depoimento completo: motivo da compra, experiencia de uso, aspecto concreto de que gostou e recomendacao final.";
    if (count === 2) return takeIndex === 0
      ? "Como inicio do depoimento, conte por que comprou ou decidiu testar e qual era a expectativa ou necessidade."
      : "Como conclusao do depoimento, conte o que percebeu no uso, o que mais gostou e por que recomenda.";
    return [
      "Inicie o depoimento contando que comprou ou recebeu o produto e apresente o motivo real da escolha.",
      "Continue como a mesma cliente, relatando o uso e os aspectos concretos de que gostou, sem reiniciar a historia.",
      "Finalize com o veredito pessoal, para quem recomenda e uma chamada natural se o CTA estiver ativado.",
    ][takeIndex];
  }

  if (profile.copyStyle === "technical") {
    if (count === 1) return "Apresente as especificacoes mais importantes e traduza cada uma em utilidade pratica, mantendo ritmo natural dentro da duracao.";
    if (count === 2) return takeIndex === 0
      ? "Apresente a categoria, a funcao principal e os diferenciais tecnicos que criam interesse."
      : "Complete com as demais capacidades tecnicas relevantes, aplicacoes praticas e uma conclusao de venda objetiva.";
    return [
      "Abra com a funcao principal do produto e o problema pratico que suas especificacoes ajudam a resolver.",
      "Demonstre e explique a maior parte das especificacoes, recursos, materiais e capacidades verificaveis, sempre ligando dado tecnico a beneficio.",
      "Apresente os dados tecnicos restantes que forem relevantes, resuma os diferenciais decisivos e conclua a venda sem repetir toda a ficha.",
    ][takeIndex];
  }
  return "";
}

function takeBlocks(profile, takeIndex) {
  const count = Math.min(3, Math.max(1, Number(profile.takeCount) || 1));
  const plan = takePlan(count);
  const current = plan[takeIndex] || plan[0];
  const copyName = (COPY_STYLES.find((item) => item.id === profile.copyStyle) || COPY_STYLES[0]).name;
  const takeCopyGuidance = copyGuidanceForTake(profile, count, takeIndex);
  const continuity = count === 1
    ? "Este e um unico video em take continuo; nao criar cortes, capitulos ou cenas independentes."
    : `Este prompt gera somente o TAKE ${takeIndex + 1} de ${count}. Ele sera enviado separadamente para uma IA de video. Repita nele todas as definicoes visuais necessarias. Mantenha exatamente a mesma pessoa, produto, roupa complementar, ambiente, iluminacao, voz, sotaque, tom, enquadramento-base e identidade visual dos outros takes. Comece de modo compativel com o final do take anterior e termine deixando uma transicao natural para o proximo, sem mencionar "take" na fala. Nao inclua o conteudo nem a fala completa dos outros takes.`;

  return {
    bloco_copy: `${copyName}. ${COPY_FRAMEWORKS[profile.copyStyle] || COPY_FRAMEWORKS.aida} Neste take, aplique apenas a etapa do framework que combina com sua funcao narrativa.${takeCopyGuidance ? `\nORIENTACAO ESPECIFICA DESTE TAKE: ${takeCopyGuidance}` : ""}`,
    bloco_take: `TAKE ${takeIndex + 1} DE ${count} — ${current.title.toUpperCase()}\n${current.instruction}`,
    bloco_continuidade: continuity,
    takeTitle: current.title,
  };
}

function makeContext(kind, takeIndex = 0) {
  const profile = readProfile();
  const duracao = Number(profile.duration);
  const takeCount = Math.min(3, Math.max(1, Number(profile.takeCount) || 1));
  const mayUseCta = kind !== "video" || takeIndex === takeCount - 1;
  const cta = profile.includeCta && mayUseCta
    ? `Incluir um CTA discreto e natural no final da fala, usando a ideia: "${profile.cta}". O CTA nao pode soar forcado.`
    : (profile.includeCta && kind === "video" ? "Nao incluir CTA neste take; a chamada para acao pertence somente ao ultimo take." : "");
  const lipSync = profile.mode === "Influencer"
    ? "Como o modo e Influencer, a fala deve ter lip sync natural com a boca da pessoa."
    : "Como o modo e POV, a fala deve funcionar como voz em off natural, sem mostrar o rosto da pessoa.";

  return {
    descricao: profile.descricao,
    titulo_produto: profile.titulo,
    modo: profile.mode,
    tipo_produto: profile.tipo,
    linha_tipo_produto: profile.productTypeRelevant ? `- Tipo de produto: ${profile.tipo}` : "",
    preset: profile.presetName,
    estrategia: profile.strategy,
    publico: profile.audience,
    ambiente: profile.environment,
    linha_profissao: profile.professionPrompt ? `- Profissao/aparencia do apresentador: ${profile.professionName}` : "",
    realismo: profile.realism,
    genero: profile.genero,
    voz: profile.voz,
    etnia: profile.etnia,
    idade: profile.age,
    corpo: profile.bodyPrompt,
    sotaque: profile.accent,
    intensidade_sotaque: profile.accentIntensity,
    tom: profile.tone,
    duracao: profile.duration,
    palavras: wordsByDuration(duracao),
    frases: sentencesByDuration(duracao),
    cta,
    lip_sync: lipSync,
    bloco_apresentacao: kind === "video" ? presentationVideo(profile) : presentationImage(profile),
    bloco_realismo: humanRealismBlock(profile),
    bloco_nivel_realismo: realismLevelBlock(profile, kind),
    bloco_produto: productRules(profile),
    bloco_ambiente: environmentBlock(profile),
    bloco_sem_texto: noTextRules(profile),
    bloco_sotaque: accentBlock(profile),
    direcao_criativa: creativeDirection(profile),
    bloco_camera: cameraMovementBlock(profile),
    bloco_audio: cleanMediaBlock(),
    evitar: avoidList(profile),
    ...takeBlocks(profile, takeIndex),
  };
}

function renderTemplate(template, context) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => context[key] ?? "");
}

function buildPrompt(type, takeIndex = 0) {
  const contextKind = type === "video" ? "video" : "image";
  const ctx = makeContext(contextKind, takeIndex);
  let prompt = renderTemplate(state.templates[type], ctx).trim();
  if (type === "video" && !state.templates.video.includes("{{bloco_take}}")) {
    prompt += `\n\nESTRUTURA DE COPY:\n${ctx.bloco_copy}\n\nFUNCAO DESTE TAKE:\n${ctx.bloco_take}\n\nCONTINUIDADE ENTRE TAKES:\n${ctx.bloco_continuidade}`;
  }
  if (type === "video" && !state.templates.video.includes("{{bloco_camera}}")) {
    prompt += `\n\nMOVIMENTO E DISTANCIA DE CAMERA:\n${ctx.bloco_camera}`;
  }
  if (type === "video" && !state.templates.video.includes("{{bloco_audio}}")) {
    prompt += `\n\nQUALIDADE DE IMAGEM E AUDIO:\n${ctx.bloco_audio}`;
  }
  if ((type === "video" || type === "image") && !state.templates[type].includes("{{bloco_nivel_realismo}}")) {
    prompt += `\n\nNIVEL DE REALISMO SELECIONADO:\n${ctx.bloco_nivel_realismo}`;
  }
  if (type === "speech" && !state.templates.speech.includes("{{bloco_copy}}")) {
    prompt += `\n\nESTRUTURA DE COPY:\n${ctx.bloco_copy}`;
  }
  return prompt;
}

function generate(type) {
  if (!validateDescription()) return;
  if (type === "video") {
    const plan = takePlan(state.settings.takeCount);
    state.videoTakes = plan.map((item, index) => ({
      index,
      title: item.title,
      prompt: buildPrompt("video", index),
    }));
    state.activeTake = 0;
    state.outputs.video = state.videoTakes[0].prompt;
  } else {
    state.outputs[type] = buildPrompt(type);
  }
  state.activeTab = type;
  saveState();
  renderOutput();
  addHistory(type, state.outputs[type]);
  const message = type === "video" && state.videoTakes.length > 1
    ? `Take 1 de ${state.videoTakes.length} gerado e copiado.`
    : `Prompt de ${tabLabel(type)} gerado e copiado.`;
  copyText(state.outputs[type], message);
}

function validateDescription() {
  if (state.description.trim()) return true;
  toast("Cole a descricao do produto primeiro.", "error");
  $("descriptionInput").focus();
  return false;
}

function tabLabel(type) {
  return {
    image: "imagem",
    video: "video",
    speech: "fala",
  }[type] || type;
}

function renderOutput() {
  document.querySelectorAll("#promptTabs button").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === state.activeTab);
  });
  $("outputText").value = state.outputs[state.activeTab] || "";
  renderTakeNavigator();
  updateStats();
}

function renderTakeNavigator() {
  const count = Number(state.settings.takeCount) || 1;
  const field = $("toolbarTakeField");
  field.hidden = count <= 1;
  if (count <= 1) {
    $("toolbarTakeSelect").innerHTML = "";
    return;
  }

  const plan = takePlan(count);
  $("toolbarTakeSelect").innerHTML = plan.map((take, index) =>
    `<option value="${index}">Take ${index + 1} — ${escapeHtml(take.title)}</option>`
  ).join("");
  $("toolbarTakeSelect").value = String(Math.min(state.activeTake, count - 1));
}

async function selectTake(index, copyAfterSelection = false) {
  state.activeTake = Math.max(0, Math.min(index, state.settings.takeCount - 1));
  const take = state.videoTakes[state.activeTake];
  if (!take) {
    saveState();
    renderTakeNavigator();
    toast("Gere o video para criar os prompts dos takes.", "error");
    return;
  }
  state.activeTab = "video";
  state.outputs.video = take.prompt;
  saveState();
  renderOutput();
  if (copyAfterSelection) await copyText(take.prompt, `Take ${state.activeTake + 1} copiado.`);
}

function updateStats() {
  const description = $("descriptionInput").value;
  const output = $("outputText").value;
  $("descriptionStats").textContent = `${description.length} caracteres`;
  const words = output.trim() ? output.trim().split(/\s+/).length : 0;
  $("outputStats").textContent = `${words} palavras`;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function copyText(text, successMessage = "Prompt copiado.") {
  if (!text.trim()) {
    toast("Nao ha prompt para copiar.", "error");
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    toast(successMessage, "success");
  } catch {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.left = "-9999px";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
    toast(successMessage, "success");
  }
}

function downloadText(filename, content, type = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function exportCurrentPrompt() {
  const text = state.outputs[state.activeTab] || $("outputText").value;
  if (!text.trim()) {
    toast("Nao ha prompt para exportar.", "error");
    return;
  }
  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
  downloadText(`prompt-${state.activeTab}-${stamp}.txt`, text);
  toast("Prompt exportado.", "success");
}

function exportConfig() {
  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
  downloadText(`prompt-studio-config-${stamp}.json`, JSON.stringify(state, null, 2), "application/json;charset=utf-8");
  toast("Configuracao exportada.", "success");
}

function importConfig(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      state = {
        ...clone(DEFAULT_STATE),
        ...imported,
        settings: { ...clone(DEFAULT_STATE.settings), ...(imported.settings || {}) },
        outputs: { ...clone(DEFAULT_STATE.outputs), ...(imported.outputs || {}) },
        videoTakes: Array.isArray(imported.videoTakes) ? imported.videoTakes : [],
        templates: { ...clone(DEFAULT_TEMPLATES), ...(imported.templates || {}) },
        history: Array.isArray(imported.history) ? imported.history : [],
      };
      if (!OUTPUT_TYPES.includes(state.activeTab)) state.activeTab = "image";
      normalizeState();
      saveState();
      applyStateToUI();
      renderOutput();
      toast("Configuracao importada.", "success");
    } catch {
      toast("Arquivo de configuracao invalido.", "error");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file, "utf-8");
}

function resetSettings() {
  const keepDescription = state.description;
  const keepHistory = state.history;
  state = clone(DEFAULT_STATE);
  state.description = keepDescription;
  state.history = keepHistory;
  saveState();
  applyStateToUI();
  renderOutput();
  toast("Configuracoes e templates restaurados.", "success");
}

function clearDescription() {
  state.description = "";
  $("descriptionInput").value = "";
  saveState();
  updateStats();
  toast("Descricao limpa.", "success");
}

function clearAll() {
  state.description = "";
  state.outputs = clone(DEFAULT_STATE.outputs);
  state.videoTakes = [];
  state.activeTake = 0;
  $("descriptionInput").value = "";
  saveState();
  renderOutput();
  toast("Descricao e prompts limpos.", "success");
}

function openTemplates() {
  $("templateType").value = state.activeTab;
  loadTemplateEditor();
  $("templateDialog").showModal();
}

function loadTemplateEditor() {
  $("templateEditor").value = state.templates[$("templateType").value] || "";
}

function saveTemplate() {
  const type = $("templateType").value;
  state.templates[type] = $("templateEditor").value.trim() || DEFAULT_TEMPLATES[type];
  saveState();
  toast("Template salvo.", "success");
}

function restoreDefaultTemplate() {
  const type = $("templateType").value;
  $("templateEditor").value = DEFAULT_TEMPLATES[type];
}

function addHistory(type, text) {
  const item = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    type,
    text,
    title: extractTitle(state.description),
    preset: (PRODUCT_PRESETS.find((p) => p.id === state.settings.presetId) || PRODUCT_PRESETS[0]).name,
    createdAt: new Date().toISOString(),
    favorite: false,
  };
  state.history = [item, ...state.history].slice(0, 120);
  saveState();
}

function openHistory() {
  renderHistory();
  $("historyDialog").showModal();
}

function renderHistory() {
  const query = $("historySearch").value.trim().toLowerCase();
  const items = state.history.filter((item) => {
    const haystack = `${item.title} ${item.type} ${item.preset} ${item.text}`.toLowerCase();
    return haystack.includes(query);
  });

  $("historyList").innerHTML = items.length
    ? items.map((item) => historyItemHtml(item)).join("")
    : `<div class="history-item"><span>Nenhum prompt no historico.</span></div>`;

  document.querySelectorAll("[data-history-action]").forEach((button) => {
    button.addEventListener("click", handleHistoryAction);
  });
}

function historyItemHtml(item) {
  const date = new Date(item.createdAt).toLocaleString("pt-BR");
  return `<article class="history-item">
    <strong>${escapeHtml(item.title)}</strong>
    <small>${escapeHtml(tabLabel(item.type))} · ${escapeHtml(item.preset)} · ${date}</small>
    <div class="history-actions">
      <button type="button" data-history-action="load" data-id="${item.id}">Abrir</button>
      <button type="button" data-history-action="copy" data-id="${item.id}">Copiar</button>
      <button type="button" data-history-action="favorite" data-id="${item.id}">${item.favorite ? "Favorito" : "Favoritar"}</button>
      <button type="button" data-history-action="delete" data-id="${item.id}">Excluir</button>
    </div>
  </article>`;
}

async function handleHistoryAction(event) {
  const id = event.currentTarget.dataset.id;
  const action = event.currentTarget.dataset.historyAction;
  const item = state.history.find((entry) => entry.id === id);
  if (!item) return;

  if (action === "load") {
    state.outputs[item.type] = item.text;
    state.activeTab = item.type;
    saveState();
    renderOutput();
    $("historyDialog").close();
    toast("Prompt aberto.", "success");
  }

  if (action === "copy") {
    await copyText(item.text);
  }

  if (action === "favorite") {
    item.favorite = !item.favorite;
    state.history.sort((a, b) => Number(b.favorite) - Number(a.favorite) || b.createdAt.localeCompare(a.createdAt));
    saveState();
    renderHistory();
  }

  if (action === "delete") {
    state.history = state.history.filter((entry) => entry.id !== id);
    saveState();
    renderHistory();
  }
}

function clearHistory() {
  state.history = [];
  saveState();
  renderHistory();
  toast("Historico limpo.", "success");
}

function toast(message, type = "info") {
  const pill = $("statusPill");
  pill.textContent = message;
  pill.classList.remove("success", "error");
  if (type === "success") pill.classList.add("success");
  if (type === "error") pill.classList.add("error");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => {
    pill.textContent = "Pronto";
    pill.classList.remove("success", "error");
  }, 3200);
}

init();
