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


const form = document.getElementById('contatoForm');
const sucessoMsg = document.getElementById('sucessoForm');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let valido = true;
        limparErros();

       
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

        
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === '') {
            mostrarErro('email', 'Por favor, preencha o e-mail');
            valido = false;
        } else if (!emailRegex.test(email)) {
            mostrarErro('email', 'E-mail inválido');
            valido = false;
        }

        
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

        
        const assunto = document.getElementById('assunto').value;

        if (assunto === '') {
            mostrarErro('assunto', 'Por favor, selecione um assunto');
            valido = false;
        }

        
        if (valido) {
            sucessoMsg.textContent = '✓ Mensagem enviada com sucesso!';
            sucessoMsg.classList.add('visivel');

            form.reset();

            setTimeout(() => {
                sucessoMsg.classList.remove('visivel');
            }, 5000);
        }
    });
}


function mostrarErro(campo, mensagem) {
    const erroSpan = document.getElementById(
        'erro' + campo.charAt(0).toUpperCase() + campo.slice(1)
    );

    if (erroSpan) {
        erroSpan.textContent = mensagem;
    }

    const input = document.getElementById(campo);

    if (input) {
        input.classList.add('erro-input');
    }
}


function limparErros() {
    document.querySelectorAll('.erro').forEach(erro => {
        erro.textContent = '';
    });

    document.querySelectorAll('.erro-input').forEach(input => {
        input.classList.remove('erro-input');
    });
}


document.querySelectorAll(
    '#contatoForm input, #contatoForm select, #contatoForm textarea'
).forEach(campo => {
    campo.addEventListener('input', function () {
        if (this.classList.contains('erro-input')) {
            this.classList.remove('erro-input');

            const erroId =
                'erro' + this.id.charAt(0).toUpperCase() + this.id.slice(1);

            const erroSpan = document.getElementById(erroId);

            if (erroSpan) {
                erroSpan.textContent = '';
            }
        }
    });
});


window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(74, 20, 140, 0.95)';
    } else {
        navbar.style.background = '#4a148c';
    }
});
