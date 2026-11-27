// ===== BLOCO FLUTUANTE: "Perdi meu pet" / "Encontrei um pet" =====
// Etapa 1 (Quem é você?) -> Continuar -> Etapa 2 (Crie seu anúncio) -> Publicar fecha.
// O X fecha em qualquer etapa. Funciona em qualquer página que carregue este arquivo.

(() => {
  // ---------- HTML do bloco (inserido uma única vez no <body>) ----------
  const modal = document.createElement('dialog');
  modal.className = 'anuncio';
  modal.id = 'anuncio-modal';
  modal.setAttribute('aria-label', 'Cadastro do anúncio');

  modal.innerHTML = `
    <button type="button" class="anuncio-fechar" aria-label="Fechar">X</button>

    <!-- ETAPA 1 -->
    <form class="passo passo-1" id="form-contato" data-passo="1">
      <h2>Quem é você?</h2>
      <p class="passo-sub">Informações para contato</p>

      <label for="c-nome">Nome:</label>
      <input type="text" id="c-nome" name="nome" placeholder="Digite seu nome completo" autocomplete="name" required>

      <label for="c-endereco">Endereço:</label>
      <input type="text" id="c-endereco" name="endereco" placeholder="Digite seu endereço completo" autocomplete="street-address" required>

      <label for="c-email">E-mail</label>
      <input type="email" id="c-email" name="email" placeholder="Digite seu e-mail" autocomplete="email" required>

      <label for="c-telefone">Telefone</label>
      <input type="tel" id="c-telefone" name="telefone" placeholder="+55 (12) 34567-8900" autocomplete="tel" required>

      <button type="submit" class="anuncio-btn">Continuar</button>
      <div class="bichos" aria-hidden="true"></div>
    </form>

    <!-- ETAPA 2 -->
    <form class="passo passo-2" id="form-anuncio" data-passo="2" hidden>
      <h2>Crie seu anúncio para buscas</h2>
      <p class="passo-sub passo-sub-escuro">Insira informações do animal para começarmos a instantaneamente a espalhar o anúncio por sua comunidade.</p>

      <div class="grade">
        <div class="coluna">
          <label for="a-nome">Nome do Pet</label>
          <input type="text" id="a-nome" name="nome_pet">

          <label for="a-situacao">Situação</label>
          <select id="a-situacao" name="situacao" required>
            <option value="Procurando pet">Procurando pet</option>
            <option value="Procurando tutor">Procurando tutor</option>
            <option value="Para adoção">Para adoção</option>
          </select>

          <label for="a-especie">Espécie</label>
          <select id="a-especie" name="especie" required>
            <option value="" selected disabled>Selecione</option>
            <option value="Gato">Gato</option>
            <option value="Cachorro">Cachorro</option>
          </select>

          <label for="a-genero">Gênero</label>
          <select id="a-genero" name="genero" required>
            <option value="" selected disabled>Selecione</option>
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </select>

          <label for="a-raca">Raça</label>
          <select id="a-raca" name="raca">
            <option value="" selected>Selecione</option>
            <option value="Sem raça definida">Sem raça definida (vira-lata)</option>
            <optgroup label="Cachorros">
              <option value="Shih Tzu">Shih Tzu</option>
              <option value="Poodle">Poodle</option>
              <option value="Yorkshire Terrier">Yorkshire Terrier</option>
              <option value="Maltês">Maltês</option>
              <option value="Spitz Alemão">Spitz Alemão</option>
              <option value="Golden Retriever">Golden Retriever</option>
              <option value="Labrador Retriever">Labrador Retriever</option>
              <option value="Pastor Alemão">Pastor Alemão</option>
              <option value="Bulldog Francês">Bulldog Francês</option>
              <option value="Border Collie">Border Collie</option>
            </optgroup>
            <optgroup label="Gatos">
              <option value="Persa">Persa</option>
              <option value="Himalaio">Himalaio</option>
              <option value="Siamês">Siamês</option>
              <option value="Maine Coon">Maine Coon</option>
              <option value="Ragdoll">Ragdoll</option>
              <option value="Angorá">Angorá</option>
              <option value="Bengal">Bengal</option>
              <option value="Sphynx">Sphynx</option>
              <option value="British Shorthair">British Shorthair</option>
              <option value="Abissínio">Abissínio</option>
            </optgroup>
            <option value="Outro">Outro</option>
          </select>

          <label for="a-idade">Idade</label>
          <select id="a-idade" name="idade">
            <option value="" selected>Selecione</option>
            <option value="Jovem">Jovem</option>
            <option value="Adulto">Adulto</option>
            <option value="Idoso">Idoso</option>
          </select>

          <label for="a-porte">Porte</label>
          <select id="a-porte" name="porte">
            <option value="" selected>Selecione</option>
            <option value="Pequeno">Pequeno</option>
            <option value="Médio">Médio</option>
            <option value="Grande">Grande</option>
          </select>

          <label for="a-cor">Cor</label>
          <select id="a-cor" name="cor">
            <option value="" selected>Selecione</option>
            <option value="Preto">Preto</option>
            <option value="Branco">Branco</option>
            <option value="Caramelo">Caramelo</option>
            <option value="Marrom">Marrom</option>
            <option value="Cinza">Cinza</option>
            <option value="Creme">Creme</option>
            <option value="Preto e branco">Preto e branco</option>
            <option value="Branco e marrom">Branco e marrom</option>
            <option value="Tigrado">Tigrado</option>
            <option value="Tricolor">Tricolor</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div class="coluna">
          <label for="a-descricao">Descrição</label>
          <textarea id="a-descricao" name="descricao" rows="3" placeholder="Descreva o animal: cor, tamanho, manchas, etc."></textarea>

          <label for="a-local">Local</label>
          <input type="text" id="a-local" name="local" placeholder="Rua, bairro e cidade" autocomplete="off" required>

          <label for="a-ponto">Ponto de referência</label>
          <input type="text" id="a-ponto" name="ponto" placeholder="Ex.: próximo à praça" autocomplete="off">

          <label for="a-foto" class="rotulo-foto">Foto do pet</label>
          <label for="a-foto" class="foto-caixa">
            <span class="foto-dica">Adicione uma foto do pet para identificação</span>
            <svg class="foto-icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
              <circle cx="12" cy="13" r="3.5"/>
            </svg>
            <img class="foto-previa" alt="Prévia da foto escolhida" hidden>
          </label>
          <input type="file" id="a-foto" name="foto" accept="image/*" class="so-leitor">
        </div>
      </div>

      <label class="alertas">
        <input type="checkbox" name="alertas">
        <span>Desejo receber alertas locais de animais de estimação encontrados e perdidos</span>
      </label>

      <button type="submit" class="anuncio-btn">Publicar</button>
      <div class="detetive" aria-hidden="true"></div>
    </form>
  `;
  document.body.appendChild(modal);

  // ---------- referências ----------
  const formContato = modal.querySelector('#form-contato');
  const formAnuncio = modal.querySelector('#form-anuncio');
  const situacao    = modal.querySelector('#a-situacao');
  const inputFoto   = modal.querySelector('#a-foto');
  const previa      = modal.querySelector('.foto-previa');
  const iconeFoto   = modal.querySelector('.foto-icone');
  const dicaFoto    = modal.querySelector('.foto-dica');

  // ---------- ARMAZENAMENTO (localStorage) ----------
  // Todos os anúncios ficam na chave "mapapet:anuncios", como uma lista (array) em JSON.
  // Cada anúncio:
  // { id, criadoEm, contato:{nome,endereco,email,telefone},
  //   nomePet, situacao, especie, genero, raca, idade, porte, cor, local, ponto,
  //   descricao, alertas, foto }
  // "foto" é uma imagem reduzida em texto (data URL) ou null.
  const CHAVE = 'mapapet:anuncios';

  const Armazenamento = {
    listar() {
      try { return JSON.parse(localStorage.getItem(CHAVE)) || []; }
      catch (erro) { return []; }
    },
    obter(id) { return this.listar().find((a) => a.id === id) || null; },
    salvar(anuncio) {                       // pode lançar erro se o armazenamento estiver cheio
      const lista = this.listar();
      lista.push(anuncio);
      localStorage.setItem(CHAVE, JSON.stringify(lista));
    },
    remover(id) {
      localStorage.setItem(CHAVE, JSON.stringify(this.listar().filter((a) => a.id !== id)));
    },
    limpar() { localStorage.removeItem(CHAVE); }
  };
  window.MapaPetStorage = Armazenamento;    // disponível em qualquer página/script

  // Reduz a foto (máx. 800 px) e converte em texto, para caber no localStorage (limite ~5 MB)
  function lerFoto(arquivo) {
    return new Promise((resolve) => {
      if (!arquivo) return resolve(null);
      const url = URL.createObjectURL(arquivo);
      const img = new Image();
      img.onload = () => {
        const escala = Math.min(1, 800 / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * escala);
        canvas.height = Math.round(img.height * escala);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
      img.src = url;
    });
  }

  // ---------- funções ----------
  function mostrarPasso(n) {
    formContato.hidden = n !== 1;
    formAnuncio.hidden = n !== 2;
    const primeiro = (n === 1 ? formContato : formAnuncio).querySelector('input, select, textarea');
    if (primeiro) primeiro.focus();
    modal.scrollTop = 0;
  }

  function abrir(tipo) {
    // "Perdi meu pet" -> Procurando pet | "Encontrei um pet" -> Procurando tutor
    situacao.value = tipo === 'encontrei' ? 'Procurando tutor' : 'Procurando pet';
    mostrarPasso(1);
    if (!modal.open) modal.showModal();
  }

  function fechar() {
    if (modal.open) modal.close();
  }

  function limparFoto() {
    if (previa.src) URL.revokeObjectURL(previa.src);
    previa.removeAttribute('src');
    previa.hidden = true;
    iconeFoto.hidden = false;
    dicaFoto.hidden = false;
  }

  // ---------- eventos ----------
  // Abre ao clicar em qualquer botão/link "Perdi meu pet" ou "Encontrei um pet"
  document.addEventListener('click', (evento) => {
    const gatilho = evento.target.closest(
      'a[href="#perdi"], a[href="#encontrei"], a[href="#cadastro"]'
    );
    if (!gatilho) return;
    evento.preventDefault();
    abrir(gatilho.getAttribute('href') === '#encontrei' ? 'encontrei' : 'perdi');
  });

  // X fecha em qualquer etapa
  modal.querySelector('.anuncio-fechar').addEventListener('click', fechar);

  // Continuar -> etapa 2 (o navegador já valida os campos obrigatórios)
  formContato.addEventListener('submit', (evento) => {
    evento.preventDefault();
    mostrarPasso(2);
  });

  // Publicar -> salva no localStorage e fecha o bloco
  formAnuncio.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const botao = formAnuncio.querySelector('button[type="submit"]');
    botao.disabled = true;

    const contato = Object.fromEntries(new FormData(formContato));
    const campos  = Object.fromEntries(new FormData(formAnuncio));

    const anuncio = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      criadoEm: new Date().toISOString(),
      contato,                                   // nome, endereco, email, telefone
      nomePet: campos.nome_pet || '',
      situacao: campos.situacao,
      especie: campos.especie,
      genero: campos.genero,
      descricao: campos.descricao || '',
      raca: campos.raca || '',
      idade: campos.idade || '',
      porte: campos.porte || '',
      cor: campos.cor || '',
      local: campos.local || '',
      ponto: campos.ponto || '',
      alertas: formAnuncio.elements.alertas.checked,
      foto: await lerFoto(inputFoto.files[0])
    };

    try {
      Armazenamento.salvar(anuncio);
    } catch (erro) {
      try {                                      // armazenamento cheio? tenta de novo sem a foto
        anuncio.foto = null;
        Armazenamento.salvar(anuncio);
      } catch (erro2) {
        alert('Não foi possível salvar o anúncio neste navegador.');
        botao.disabled = false;
        return;
      }
    }

    // Avisa o resto do site que há um anúncio novo (útil para atualizar listas na tela)
    document.dispatchEvent(new CustomEvent('mapapet:anuncio-salvo', { detail: anuncio }));

    botao.disabled = false;
    fechar();
  });

  // Prévia da foto escolhida
  inputFoto.addEventListener('change', () => {
    const arquivo = inputFoto.files[0];
    limparFoto();
    if (!arquivo) return;
    previa.src = URL.createObjectURL(arquivo);
    previa.hidden = false;
    iconeFoto.hidden = true;
    dicaFoto.hidden = true;
  });

  // Ao fechar (X, Esc ou Publicar), limpa tudo para a próxima vez
  modal.addEventListener('close', () => {
    formContato.reset();
    formAnuncio.reset();
    limparFoto();
  });
})();