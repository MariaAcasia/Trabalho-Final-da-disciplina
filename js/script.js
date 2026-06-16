// ================= MENU MOBILE =================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ================= VALIDAÇÃO FORMULÁRIO =================
const form = document.getElementById('contatoForm');
const sucessoMsg = document.getElementById('sucessoForm');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valido = true;
    limparErros();

    // Nome
    const nome = document.getElementById('nome').value.trim();
    if (nome === '') {
        mostrarErro('nome', 'Por favor, preencha o nome');
        valido = false;
    } else if (nome.length < 3) {
        mostrarErro('nome', 'O nome deve ter pelo menos 3 caracteres');
        valido = false;
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nome)) {
        mostrarErro('nome', 'O nome deve conter apenas letras');
        valido = false;
    }

    // E-mail
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        mostrarErro('email', 'Por favor, preencha o e-mail');
        valido = false;
    } else if (!emailRegex.test(email)) {
        mostrarErro('email', 'E-mail inválido');
        valido = false;
    }

    // Data
    const data = document.getElementById('dataNascimento').value;
    if (data === '') {
        mostrarErro('dataNascimento', 'Por favor, selecione a data');
        valido = false;
    } else {
        const dataNasc = new Date(data);
        const hoje = new Date();
        const idade = hoje.getFullYear() - dataNasc.getFullYear();
        if (idade < 18) {
            mostrarErro('dataNascimento', 'Você deve ter pelo menos 18 anos');
            valido = false;
        } else if (idade > 120) {
            mostrarErro('dataNascimento', 'Data inválida');
            valido = false;
        }
    }

    // Telefone
    const telefone = document.getElementById('telefone').value.trim();
    if (telefone === '') {
        mostrarErro('telefone', 'Por favor, preencha o telefone');
        valido = false;
    } else if (telefone.length < 10) {
        mostrarErro('telefone', 'Telefone deve ter pelo menos 10 dígitos');
        valido = false;
    } else if (!/^\d+$/.test(telefone)) {
        mostrarErro('telefone', 'Telefone deve conter apenas números');
        valido = false;
    }

    // Assunto
    const assunto = document.getElementById('assunto').value;
    if (assunto === '') {
        mostrarErro('assunto', 'Por favor, selecione um assunto');
        valido = false;
    }

    // Termos
    const termos = document.getElementById('termos').checked;
    if (!termos) {
        mostrarErro('termos', 'Você deve aceitar os termos');
        valido = false;
    }

    // Mensagem
    const mensagem = document.getElementById('mensagem').value.trim();
    if (mensagem === '') {
        mostrarErro('mensagem', 'Por favor, escreva uma mensagem');
        valido = false;
    } else if (mensagem.length < 10) {
        mostrarErro('mensagem', 'A mensagem deve ter pelo menos 10 caracteres');
        valido = false;
    } else if (mensagem.length > 500) {
        mostrarErro('mensagem', 'A mensagem deve ter no máximo 500 caracteres');
        valido = false;
    }

    if (valido) {
        sucessoMsg.textContent = '✓ Mensagem enviada com sucesso! Entrarei em contato em breve.';
        sucessoMsg.classList.add('visivel');
        form.reset();
        setTimeout(() => sucessoMsg.classList.remove('visivel'), 5000);
    }
});

function mostrarErro(campo, mensagem) {
    const erroSpan = document.getElementById('erro' + campo.charAt(0).toUpperCase() + campo.slice(1));
    if (erroSpan) erroSpan.textContent = mensagem;
    const input = document.getElementById(campo);
    if (input) input.classList.add('erro-input');
}

function limparErros() {
    document.querySelectorAll('.erro').forEach(erro => erro.textContent = '');
    document.querySelectorAll('.erro-input').forEach(input => input.classList.remove('erro-input'));
}

// Validação em tempo real
document.querySelectorAll('#contatoForm input, #contatoForm select, #contatoForm textarea').forEach(campo => {
    campo.addEventListener('input', function () {
        if (this.classList.contains('erro-input')) {
            this.classList.remove('erro-input');
            const erroId = 'erro' + this.id.charAt(0).toUpperCase() + this.id.slice(1);
            const erroSpan = document.getElementById(erroId);
            if (erroSpan) erroSpan.textContent = '';
        }
    });
});

// ================= QUIZ =================
const respostasCorretas = {
    q1: 'b',
    q2: ['html', 'css'],
    q3: 'git'
};

document.getElementById('verificarQuiz').addEventListener('click', function () {
    let pontuacao = 0;
    const total = 3;

    const q1 = document.querySelector('input[name="q1"]:checked');
    if (q1 && q1.value === respostasCorretas.q1) pontuacao++;

    const q2 = document.querySelectorAll('input[name="q2"]:checked');
    const q2Valores = Array.from(q2).map(c => c.value).sort();
    const q2Corretas = respostasCorretas.q2.sort();
    if (JSON.stringify(q2Valores) === JSON.stringify(q2Corretas)) pontuacao++;

    const q3 = document.querySelector('select[name="q3"]').value;
    if (q3 === respostasCorretas.q3) pontuacao++;

    const resultado = document.getElementById('resultadoQuiz');
    if (pontuacao === total) {
        resultado.className = 'resultado-quiz aprovado';
        resultado.innerHTML = `🎉 Parabéns! Você acertou ${pontuacao}/${total} questões!`;
    } else {
        resultado.className = 'resultado-quiz reprovado';
        resultado.innerHTML = `📚 Você acertou ${pontuacao}/${total}. Estude mais e tente novamente!`;
    }
});

// ================= SCROLL NAVBAR =================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(74, 20, 140, 0.95)';
    } else {
        navbar.style.background = '#4a148c';
    }
});
