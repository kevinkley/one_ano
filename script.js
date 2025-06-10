// Variáveis globais
const dataInicio = new Date(2024, 5, 12); // Data fixa de início: 12 de junho de 2024
let audioPlayer;
let fogosAtivados = false;

// Função para inicializar o site
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar contador
    atualizarContador();
    
    // Configurar atualização a cada minuto (para demonstração)
    setInterval(atualizarContador, 60000); // 1 minuto em milissegundos
    
    // Criar corações flutuantes
    criarCoracoesFlutuantes();
    
    // Inicializar player de música
    inicializarAudio();
});

// Função para atualizar o contador de dias
function atualizarContador() {
    const hoje = new Date();
    
    // Calcular a diferença em dias entre hoje e a data de início
    const diff = Math.floor((hoje - dataInicio) / (1000 * 60 * 60 * 24));
    
    // Calcular a data exata de 1 ano (365 dias após o início)
    const dataUmAno = new Date(dataInicio);
    dataUmAno.setFullYear(dataUmAno.getFullYear() + 1);
    
    // Calcular quantos dias faltam para completar 1 ano
    const diasParaUmAno = Math.max(0, Math.ceil((dataUmAno - hoje) / (1000 * 60 * 60 * 24)));
    
    // Atualizar o contador principal
    document.getElementById('diasJuntos').textContent = diff;
    
    // Atualizar texto baseado na quantidade de dias
    let textoTempo = '';
    if (diff < 30) {
        textoTempo = `${diff} dias de amor`;
    } else if (diff < 365) {
        const meses = Math.floor(diff / 30);
        const diasRestantes = diff % 30;
        textoTempo = `${meses} ${meses === 1 ? 'mês' : 'meses'} e ${diasRestantes} dias de amor`;
        
        // Adicionar contagem regressiva para 1 ano
        document.getElementById('contagem-regressiva').innerHTML = 
            `<div class="alert alert-danger mt-3 animate__animated animate__pulse animate__infinite">
                <i class="fas fa-hourglass-half me-2"></i>
                Faltam apenas <strong>${diasParaUmAno} ${diasParaUmAno === 1 ? 'dia' : 'dias'}</strong> para completarmos 1 ano juntos!
            </div>`;
    } else {
        const anos = Math.floor(diff / 365);
        const diasRestantes = diff % 365;
        const meses = Math.floor(diasRestantes / 30);
        const dias = diasRestantes % 30;
        textoTempo = `${anos} ${anos === 1 ? 'ano' : 'anos'}, ${meses} ${meses === 1 ? 'mês' : 'meses'} e ${dias} dias de amor`;
        
        // Remover a contagem regressiva após 1 ano
        document.getElementById('contagem-regressiva').innerHTML = '';
    }
    
    // Atualizar barra de progresso para 1 ano
    if (diff < 365) {
        const porcentagem = Math.floor((diff / 365) * 100);
        document.getElementById('progresso-um-ano').style.width = `${porcentagem}%`;
        document.getElementById('progresso-um-ano').setAttribute('aria-valuenow', porcentagem);
        document.getElementById('porcentagem-um-ano').textContent = `${porcentagem}%`;
    } else {
        // Após 1 ano - mostrar 100%
        document.getElementById('progresso-um-ano').style.width = '100%';
        document.getElementById('progresso-um-ano').setAttribute('aria-valuenow', 100);
        document.getElementById('porcentagem-um-ano').textContent = '100%';
    }
    
    // Verificar se é o dia 366 (1 ano completo) para mostrar fogos de artifício
    if (diff === 365 && !fogosAtivados) {
        mostrarFogosDeArtificio();
        fogosAtivados = true;
    } else if (diff !== 365 && fogosAtivados) {
        // Se não for mais o dia 366, remover os fogos
        removerFogosDeArtificio();
        fogosAtivados = false;
    }
}

// Função para mostrar fogos de artifício no dia do aniversário de 1 ano
function mostrarFogosDeArtificio() {
    // Criar overlay para os fogos
    const fogosOverlay = document.createElement('div');
    fogosOverlay.id = 'fogos-overlay';
    fogosOverlay.className = 'fogos-overlay';
    document.body.appendChild(fogosOverlay);
    
    // Adicionar mensagem de parabéns com botão de fechar
    const mensagemParabens = document.createElement('div');
    mensagemParabens.className = 'mensagem-parabens animate__animated animate__zoomIn';
    mensagemParabens.innerHTML = `
    <button id="btnFecharComemoracao" class="btn-fechar-comemoracao" title="Fechar mensagem">×</button>
    <h1>❤️TE AMO❤️</h1>
    <p>Hoje completamos 1 ano juntos!</p>
    <a 
        href="#"  
        id="btnAceitarContrato" 
        class="btn-aceitar-contrato">
        💌 Aceito selar nosso amor? Clique💍
    </a>
    <p id="mensagemConfirmacao" style="display: none; color: #27ae60; font-weight: bold; margin-top: 10px;">
        💖 Olhe seu WHATSAPP AMOR!
    </p>
    `;

    setTimeout(() => {
    const btnContrato = document.getElementById('btnAceitarContrato');
    const mensagemConfirmacao = document.getElementById('mensagemConfirmacao');

    if (btnContrato) {
        btnContrato.addEventListener('click', function (e) {
        e.preventDefault();

        fetch('https://kevinkleyresolve.app.n8n.cloud/webhook-test/test', {
            method: 'GET'
        })
        .then(() => {
            console.log("Webhook disparado com sucesso.");
            if (mensagemConfirmacao) {
            mensagemConfirmacao.style.display = 'block';
            }
        })
        .catch((error) => {
            console.error("Erro ao disparar webhook:", error);
        });
        });
    }
    }, 100);

    fogosOverlay.appendChild(mensagemParabens);
    
    // Adicionar evento de clique ao botão de fechar
    document.getElementById('btnFecharComemoracao').addEventListener('click', function() {
        removerFogosDeArtificio();
        fogosAtivados = false;
    });
    
    // Criar fogos de artifício
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            criarFogoDeArtificio(fogosOverlay);
        }, i * 300);
    }
    
    // Continuar criando fogos a cada 2 segundos
    const fogosInterval = setInterval(() => {
        if (document.getElementById('fogos-overlay')) {
            criarFogoDeArtificio(fogosOverlay);
        } else {
            clearInterval(fogosInterval); // Limpar o intervalo se o overlay for removido
        }
    }, 2000);
}

// Função para criar um único fogo de artifício
function criarFogoDeArtificio(container) {
    // Posição aleatória
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * (window.innerHeight * 0.7); // Apenas na parte superior
    
    // Cor aleatória
    const cores = ['#ff0000', '#ff69b4', '#ff1493', '#ff00ff', '#8a2be2', '#4169e1', '#00bfff'];
    const cor = cores[Math.floor(Math.random() * cores.length)];
    
    // Criar explosão
    const explosao = document.createElement('div');
    explosao.className = 'fogo-artificio';
    explosao.style.left = `${posX}px`;
    explosao.style.top = `${posY}px`;
    explosao.style.backgroundColor = cor;
    container.appendChild(explosao);
    
    // Criar partículas
    for (let i = 0; i < 10; i++) {
        const particula = document.createElement('div');
        particula.className = 'particula';
        particula.style.backgroundColor = cor;
        
        // Ângulo aleatório
        const angulo = Math.random() * Math.PI * 2;
        const velocidade = Math.random() * 3 + 2;
        const tamanho = Math.random() * 4 + 2;
        
        particula.style.width = `${tamanho}px`;
        particula.style.height = `${tamanho}px`;
        
        // Animação de movimento
        particula.style.animation = `mover-particula ${Math.random() * 1 + 1}s linear forwards`;
        particula.style.transform = `translate(${Math.cos(angulo) * velocidade * 20}px, ${Math.sin(angulo) * velocidade * 20}px)`;
        
        explosao.appendChild(particula);
    }
    
    // Remover após a animação
    setTimeout(() => {
        if (explosao.parentNode) {
            explosao.parentNode.removeChild(explosao);
        }
    }, 2000);
}

// Função para remover os fogos de artifício
function removerFogosDeArtificio() {
    const fogosOverlay = document.getElementById('fogos-overlay');
    if (fogosOverlay) {
        document.body.removeChild(fogosOverlay);
    }
}

// Função para criar corações flutuantes no fundo
function criarCoracoesFlutuantes() {
    // Verificar se está em dispositivo móvel (largura menor que 768px)
    const isMobile = window.innerWidth < 768;
    
    const container = document.querySelector('body');
    // Reduzir o número de corações em dispositivos móveis
    const numCoracoes = isMobile ? 5 : 20;
    
    // Limpar corações existentes para evitar acúmulo
    const coracoesExistentes = document.querySelectorAll('.coracao-flutuante');
    coracoesExistentes.forEach(coracao => coracao.remove());
    
    // Não criar corações se a tela for muito pequena
    if (window.innerWidth < 480) {
        return;
    }
    
    for (let i = 0; i < numCoracoes; i++) {
        setTimeout(() => {
            const coracao = document.createElement('i');
            coracao.classList.add('fas', 'fa-heart', 'coracao-flutuante');
            
            // Posição aleatória horizontal, limitada à área visível
            const posX = Math.random() * (window.innerWidth * 0.9);
            coracao.style.left = `${posX}px`;
            
            // Tamanho menor em dispositivos móveis
            const tamanho = isMobile ? 
                (Math.random() * 0.5 + 0.3) : // Entre 0.3 e 0.8 rem para mobile
                (Math.random() * 1 + 0.5);    // Entre 0.5 e 1.5 rem para desktop
            coracao.style.fontSize = `${tamanho}rem`;
            
            // Duração mais curta em dispositivos móveis
            const duracao = isMobile ? 
                (Math.random() * 5 + 3) : // Entre 3 e 8 segundos para mobile
                (Math.random() * 10 + 5); // Entre 5 e 15 segundos para desktop
            coracao.style.animationDuration = `${duracao}s`;
            
            // Atraso aleatório
            const atraso = Math.random() * (isMobile ? 5 : 10);
            coracao.style.animationDelay = `${atraso}s`;
            
            container.appendChild(coracao);
            
            // Remover após a animação
            setTimeout(() => {
                if (coracao.parentNode) {
                    coracao.remove();
                }
            }, (duracao + atraso) * 1000);
        }, i * (isMobile ? 500 : 300));
    }
    
    // Recriar corações a cada 15 segundos (mais tempo em mobile)
    setTimeout(criarCoracoesFlutuantes, isMobile ? 25000 : 15000);
}

// Função para inicializar o player de áudio
function inicializarAudio() {
    audioPlayer = new Audio('https://res.cloudinary.com/dgygieunq/video/upload/v1749522823/John_Legend_-_All_of_Me_Official_Video_wcgt3f.mp3'); // URL de música romântica
    audioPlayer.loop = true;
    
    document.getElementById('btnMusica').addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            this.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            audioPlayer.pause();
            this.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
}
