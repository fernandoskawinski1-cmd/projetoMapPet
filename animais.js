// ===== PÁGINA DE ANIMAIS: mostra os anúncios publicados como cards, os mais novos primeiro =====
// Carregue DEPOIS do anuncio.js (ele cria o MapaPetStorage e o evento "mapapet:anuncio-salvo").

(() => {
  const lista = document.querySelector('.lista-animais');
  if (!lista) return;

  // ---------- utilidades ----------
  function criar(tag, classe, texto) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto !== undefined) el.textContent = texto;   // textContent: nunca interpreta HTML digitado pelo usuário
    return el;
  }

  function tempoAtras(dataISO) {
    const minutos = Math.max(0, Math.floor((Date.now() - new Date(dataISO)) / 60000));
    if (minutos < 1) return 'agora mesmo';
    if (minutos < 60) return minutos === 1 ? '1 minuto atrás' : `${minutos} minutos atrás`;
    const horas = Math.floor(minutos / 60);
    if (horas < 24) return horas === 1 ? '1 hora atrás' : `${horas} horas atrás`;
    const dias = Math.floor(horas / 24);
    return dias === 1 ? '1 dia atrás' : `${dias} dias atrás`;
  }

  // "Procurando pet" aparece como "Desaparecido/Desaparecida", como nos outros cards
  function textoStatus(anuncio) {
    if (anuncio.situacao === 'Procurando pet') {
      return anuncio.genero === 'Fêmea' ? 'Desaparecida' : 'Desaparecido';
    }
    return anuncio.situacao || 'Desaparecido';
  }

  // ---------- monta um card (mesma estrutura dos cards do HTML) ----------
  function criarCard(anuncio) {
    const card = criar('article', 'card-animal card-novo');
    card.dataset.id = anuncio.id;
    card.dataset.especie = (anuncio.especie || '').toLowerCase();
    card.dataset.raca = anuncio.raca || '';
    card.dataset.cor = anuncio.cor || '';
    card.dataset.idade = anuncio.idade || '';
    card.dataset.porte = anuncio.porte || '';
    card.dataset.ponto = anuncio.ponto || '';

    card.appendChild(criar('strong', 'status-animal', textoStatus(anuncio)));

    // foto (ou espaço reservado quando não enviaram foto)
    if (typeof anuncio.foto === 'string' && anuncio.foto.startsWith('data:image/')) {
      const foto = criar('img');
      foto.src = anuncio.foto;
      foto.alt = `Foto de ${anuncio.nomePet || 'um pet'}`;
      card.appendChild(foto);
    } else {
      card.appendChild(criar('div', 'card-sem-foto', 'Sem foto'));
    }

    const corpo = criar('div', 'card-corpo');

    const titulo = criar('div', 'card-titulo');
    titulo.appendChild(criar('h2', '', anuncio.nomePet || 'Sem nome'));
    const simbolo = criar('img');
    const femea = anuncio.genero === 'Fêmea';
    simbolo.src = femea ? 'img/simb female.png' : 'img/simb male.png';
    simbolo.alt = femea ? 'Fêmea' : 'Macho';
    titulo.appendChild(simbolo);
    corpo.appendChild(titulo);

    // Mesmas linhas dos outros cards: Raça, Cor, Visto por último em
    const linhas = [];
    if (anuncio.raca)  linhas.push(`Raça: ${anuncio.raca}`);
    if (anuncio.cor)   linhas.push(`Cor: ${anuncio.cor}`);
    if (anuncio.local) linhas.push(`Visto por último em: ${anuncio.local}`);
    if (!linhas.length) linhas.push(`Espécie: ${anuncio.especie || '-'}`);   // anúncios salvos antes dos novos campos
    linhas.forEach((texto) => corpo.appendChild(criar('p', '', texto)));

    const rodape = criar('div', 'card-rodape');
    const hora = criar('time', '', tempoAtras(anuncio.criadoEm));
    hora.dateTime = anuncio.criadoEm;
    rodape.appendChild(hora);
    const mais = criar('a', 'mais-sobre', 'mais sobre');
    mais.href = '#';
    rodape.appendChild(mais);
    corpo.appendChild(rodape);

    card.appendChild(corpo);
    return card;
  }

  // ---------- coloca o card como PRIMEIRO da lista ----------
  function mostrar(anuncio) {
    const repetido = lista.querySelector(`[data-id="${CSS.escape(anuncio.id)}"]`);
    if (repetido) repetido.remove();
    lista.prepend(criarCard(anuncio));
  }

  // ===== BLOCO FLUTUANTE "mais sobre" =====
  const NAO_INFORMADO = 'Não informado';

  const detalhe = criar('dialog', 'detalhe');
  detalhe.setAttribute('aria-labelledby', 'det-nome');
  detalhe.innerHTML = `
    <div class="det-conteudo">
      <button type="button" class="det-fechar" aria-label="Fechar">X</button>

      <div class="det-esquerda">
        <h2 class="det-nome" id="det-nome"></h2>
        <div class="det-foto">
          <img alt="">
          <span class="det-status"></span>
        </div>
      </div>

      <div class="det-direita">
        <div class="det-moldura">

          <section class="det-bloco det-local">
            <h3>Data e local:</h3>
            <dl>
              <dt>Data</dt><dd data-campo="data"></dd>
              <dt>Local</dt><dd data-campo="local"></dd>
              <dt>Ponto de referência</dt><dd data-campo="ponto"></dd>
            </dl>
          </section>

          <section class="det-bloco det-tutor">
            <h3>Informações do tutor:</h3>
            <dl>
              <dt>Nome do tutor</dt><dd data-campo="tutor"></dd>
              <dt>Contato</dt>
              <dd data-campo="telefone"></dd>
              <dd data-campo="email"></dd>
            </dl>
          </section>

          <section class="det-bloco det-descricao">
            <h3>Descrição e adicionais:</h3>
            <p class="det-caixa" data-campo="descricao" data-padrao="Sem descrição."></p>
          </section>

          <section class="det-bloco det-basicas">
            <h3>Informações básicas:</h3>
            <dl>
              <dt>Nome do pet</dt><dd data-campo="nome"></dd>
              <dt>Gênero</dt><dd data-campo="genero"></dd>
              <dt>Espécie</dt><dd data-campo="especie"></dd>
            </dl>
          </section>

          <section class="det-bloco det-caracteristicas">
            <h3>Características:</h3>
            <dl>
              <dt>Raça</dt><dd data-campo="raca"></dd>
              <dt>Idade</dt><dd data-campo="idade"></dd>
              <dt>Cor</dt><dd data-campo="cor"></dd>
            </dl>
          </section>

        </div>
      </div>
    </div>`;
  document.body.appendChild(detalhe);

  const detNome   = detalhe.querySelector('.det-nome');
  const detStatus = detalhe.querySelector('.det-status');
  const detFoto   = detalhe.querySelector('.det-foto img');

  function formatarData(dataISO) {
    return new Date(dataISO).toLocaleDateString('pt-BR');
  }

  // Os cards antigos só têm "5 dias atrás"; calcula a data a partir disso
  function dataDeTempo(texto) {
    const m = /(\d+)\s*(minuto|hora|dia)/.exec(texto || '');
    const unidade = { minuto: 60000, hora: 3600000, dia: 86400000 };
    const quando = m ? new Date(Date.now() - Number(m[1]) * unidade[m[2]]) : new Date();
    return quando.toISOString();
  }

  // Dados de um anúncio publicado (localStorage)
  function dadosDoAnuncio(a) {
    const c = a.contato || {};
    return {
      nome: a.nomePet || 'Sem nome',
      status: textoStatus(a),
      foto: a.foto,
      genero: a.genero === 'Fêmea' ? 'Feminino' : a.genero === 'Macho' ? 'Masculino' : '',
      especie: a.especie,
      raca: a.raca, idade: a.idade, cor: a.cor,
      local: a.local, ponto: a.ponto,
      data: `${formatarData(a.criadoEm)} - ${tempoAtras(a.criadoEm)}`,
      tutor: c.nome, telefone: c.telefone, email: c.email,
      descricao: a.descricao
    };
  }

  // Dados de um card que já estava no HTML
  function dadosDoCard(card) {
    const linhas = [...card.querySelectorAll('.card-corpo p')].map((p) => p.textContent);
    const pega = (rotulo) => {
      const linha = linhas.find((t) => t.startsWith(rotulo + ':'));
      return linha ? linha.slice(rotulo.length + 1).trim() : '';
    };
    const tempo = card.querySelector('time')?.textContent || '';
    const alt = card.querySelector('.card-titulo img')?.alt;
    const especie = card.dataset.especie || '';
    return {
      nome: card.querySelector('h2')?.textContent || '',
      status: card.querySelector('.status-animal')?.textContent || '',
      foto: card.querySelector(':scope > img')?.getAttribute('src') || '',
      genero: alt === 'Fêmea' ? 'Feminino' : alt === 'Macho' ? 'Masculino' : '',
      especie: especie.charAt(0).toUpperCase() + especie.slice(1),
      raca: pega('Raça'), cor: pega('Cor'), local: pega('Visto por último em'),
      data: `${formatarData(dataDeTempo(tempo))} - ${tempo}`
    };
  }

  function preencher(dados) {
    detNome.textContent = dados.nome;
    detStatus.textContent = dados.status;

    const temFoto = typeof dados.foto === 'string' &&
      (dados.foto.startsWith('data:image/') || !dados.foto.startsWith('data:'));
    detFoto.hidden = !(temFoto && dados.foto);
    if (!detFoto.hidden) { detFoto.src = dados.foto; detFoto.alt = `Foto de ${dados.nome}`; }

    detalhe.querySelectorAll('[data-campo]').forEach((el) => {
      const campo = el.dataset.campo;
      const valor = dados[campo];
      el.textContent = '';
      el.classList.toggle('vazio', !valor);
      if (!valor) { el.textContent = el.dataset.padrao || NAO_INFORMADO; return; }

      if (campo === 'telefone' || campo === 'email') {   // contato clicável
        const link = criar('a', '', valor);
        link.href = campo === 'email' ? `mailto:${valor}` : `tel:${valor.replace(/[^\d+]/g, '')}`;
        el.appendChild(link);
      } else {
        el.textContent = valor;
      }
    });
  }

  function abrirDetalhe(card) {
    const anuncio = card.dataset.id && window.MapaPetStorage
      ? window.MapaPetStorage.obter(card.dataset.id) : null;
    preencher(anuncio ? dadosDoAnuncio(anuncio) : dadosDoCard(card));
    detalhe.scrollTop = 0;
    detalhe.showModal();
  }

  // "mais sobre" (vale para os cards antigos e para os novos)
  lista.addEventListener('click', (evento) => {
    const link = evento.target.closest('.mais-sobre');
    if (!link) return;
    evento.preventDefault();
    abrirDetalhe(link.closest('.card-animal'));
  });

  // Fecha: X, Esc (nativo) ou clique fora do bloco
  detalhe.querySelector('.det-fechar').addEventListener('click', () => detalhe.close());
  detalhe.addEventListener('click', (evento) => {
    if (evento.target === detalhe) detalhe.close();
  });

  // ===== FILTROS =====
  const formFiltros = document.querySelector('.filtros');

  const norm = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

  const RACAS_CONHECIDAS = ['shih tzu', 'poodle', 'yorkshire terrier', 'maltes', 'spitz alemao',
    'golden retriever', 'labrador retriever', 'pastor alemao', 'bulldog frances', 'border collie',
    'persa', 'himalaio', 'siames', 'maine coon', 'ragdoll', 'angora', 'bengal', 'sphynx',
    'british shorthair', 'abissinio'];
  const SEM_RACA = ['vira-lata', 'viralata', 'vira lata', 'indefinida', 'srd', 'sem raca definida'];
  const CORES_CONHECIDAS = ['preto', 'branco', 'caramelo', 'marrom', 'cinza', 'creme',
    'preto e branco', 'branco e marrom', 'tigrado', 'tricolor'];

  // "branca e marrom" e "marrom e branco" viram a mesma coisa; "preta" = "preto"
  function normCor(s) {
    return norm(s).replace(/\bpreta\b/g, 'preto').replace(/\bbranca\b/g, 'branco')
      .split(/\s+e\s+/).sort().join(' e ');
  }
  const CORES_NORM = CORES_CONHECIDAS.map(normCor);

  function casaRaca(filtro, valor) {
    const f = norm(filtro), v = norm(valor);
    if (!v) return false;
    if (f === 'sem raca definida') return SEM_RACA.some((s) => v.includes(s));
    if (f === 'outro') return !SEM_RACA.some((s) => v.includes(s)) && !RACAS_CONHECIDAS.some((r) => v.includes(r));
    return v.includes(f);                       // "Persa" encontra "Persa Himalaio"
  }

  function casaCor(filtro, valor) {
    const f = normCor(filtro), v = normCor(valor);
    if (!v) return false;
    return f === 'outro' ? !CORES_NORM.includes(v) : v === f;
  }

  // Lê os dados do card: usa os data-* (anúncios novos) ou o texto do card (cards antigos)
  function dadosFiltro(card) {
    const linha = (rotulo) => {
      const p = [...card.querySelectorAll('.card-corpo p')].find((el) => el.textContent.startsWith(rotulo + ':'));
      return p ? p.textContent.slice(rotulo.length + 1).trim() : '';
    };
    return {
      nome: card.querySelector('h2')?.textContent || '',
      id: card.dataset.id || '',
      especie: card.dataset.especie || '',
      raca: card.dataset.raca || linha('Raça'),
      cor: card.dataset.cor || linha('Cor'),
      idade: card.dataset.idade || '',      // cards antigos não têm; aceita data-idade / data-porte no HTML
      porte: card.dataset.porte || '',
      local: `${linha('Visto por último em')} ${card.dataset.ponto || ''}`
    };
  }

  function cardCombina(card, f) {
    const d = dadosFiltro(card);

    if (f.especies.length && !f.especies.includes(d.especie)) return false;
    if (f.raca  && !casaRaca(f.raca, d.raca)) return false;
    if (f.cor   && !casaCor(f.cor, d.cor)) return false;
    if (f.idade && norm(d.idade) !== norm(f.idade)) return false;
    if (f.porte && norm(d.porte) !== norm(f.porte)) return false;

    if (f.nome) {
      const q = norm(f.nome);
      if (!norm(d.nome).includes(q) && !norm(d.id).includes(q)) return false;
    }
    if (f.endereco) {                           // todas as palavras digitadas precisam aparecer no local
      const local = norm(d.local);
      const palavras = norm(f.endereco).split(/[\s,\-–]+/).filter(Boolean);
      if (!palavras.every((p) => local.includes(p))) return false;
    }
    return true;
  }

  // mensagem quando nada combina
  const vazio = criar('div', 'sem-resultados');
  vazio.hidden = true;
  vazio.appendChild(criar('p', '', 'Nenhum pet encontrado com esses filtros.'));
  const limpar = criar('button', 'btn-limpar', 'Limpar filtros');
  limpar.type = 'button';
  vazio.appendChild(limpar);
  lista.appendChild(vazio);

  function aplicarFiltros() {
    if (!formFiltros) return;
    const d = new FormData(formFiltros);
    const f = {
      endereco: String(d.get('endereco') || '').trim(),
      nome: String(d.get('nome') || '').trim(),
      raca: d.get('raca') || '',
      porte: d.get('porte') || '',
      cor: d.get('cor') || '',
      idade: d.get('idade') || '',
      especies: d.getAll('especie')
    };
    let visiveis = 0;
    lista.querySelectorAll('.card-animal').forEach((card) => {
      const mostrarCard = cardCombina(card, f);
      card.hidden = !mostrarCard;
      if (mostrarCard) visiveis++;
    });
    vazio.hidden = visiveis > 0;
  }

  if (formFiltros) {
    formFiltros.addEventListener('input', aplicarFiltros);      // filtra enquanto digita
    formFiltros.addEventListener('change', aplicarFiltros);     // e ao escolher nas listas / interruptores
    formFiltros.addEventListener('submit', (evento) => {        // botão Pesquisar
      evento.preventDefault();
      aplicarFiltros();
      if (window.matchMedia('(max-width: 900px)').matches) {
        lista.scrollIntoView({ behavior: 'smooth', block: 'start' });   // no celular, leva até os resultados
      }
    });
    limpar.addEventListener('click', () => { formFiltros.reset(); aplicarFiltros(); });
  }

  // 1) Ao abrir a página: anuncia os já salvos (do mais antigo ao mais novo; o mais novo fica no topo)
  const salvos = window.MapaPetStorage ? window.MapaPetStorage.listar() : [];
  salvos.forEach(mostrar);
  aplicarFiltros();

  // 2) Se alguém publicar com esta página aberta: o card aparece na hora, no topo
  document.addEventListener('mapapet:anuncio-salvo', (evento) => {
    if (formFiltros) formFiltros.reset();      // limpa os filtros para o card novo não ficar escondido
    mostrar(evento.detail);
    aplicarFiltros();
    lista.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();