(function () {
    const slug = document.currentScript.getAttribute("data-slug") || "djiedson413"; // Usando o orgSlug padrão
    const buttonText = document.currentScript.getAttribute("data-button-text") || "💬 Suporte";
    const modalTitle = document.currentScript.getAttribute("data-modal-title") || "Reportar um Problema";

    // Cria botão flutuante
    const btn = document.createElement("button");
    btn.innerText = buttonText;
    btn.className = "hd-widget-button";

    // Chat flutuante (modal)
    const chat = document.createElement("div");
    chat.className = "hd-widget-chat";
    chat.innerHTML = `
        <div class="hd-widget-chat-header">
            <h3>${modalTitle}</h3>
            <button class="hd-widget-close-chat">✕</button>
        </div>
        <div class="hd-widget-chat-content">
            <form id="hd-form">
                <input name="name" placeholder="Seu nome" required />
                <input name="email" placeholder="Seu e-mail" type="email" required />
                <input name="title" placeholder="Título do Problema" required />
                <textarea name="description" placeholder="Descrição do problema..." required></textarea>
                <select name="priority" required>
                    <option value="" disabled selected>Prioridade</option>
                    <option value="LOW">Baixa</option>
                    <option value="MEDIUM">Média</option>
                    <option value="HIGH">Alta</option>
                </select>
                <button type="submit" id="hd-submit-button">Enviar</button>
                <div class="hd-progress-bar" style="display: none;"></div>
                <div class="hd-watermark">Plano Grátis | <a href="https://redhelp.webfacil.site" target="_blank" class="hd-redhelp">RedHelp</a></div> <!-- Marca d'água atualizada com link -->
            </form>
        </div>
    `;

    // Estilos (pode ser movido para um arquivo CSS separado)
    const style = document.createElement("style");
    style.textContent = `
        .hd-widget-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            padding: 12px 20px;
            background-color: #1f2937;
            color: white;
            border: none;
            border-radius: 999px;
            font-size: 16px;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(0,0,0,0.2);
            transition: transform 0.2s;
        }
        .hd-widget-button:hover {
            transform: scale(1.05);
        }
        .hd-widget-chat {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 300px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.2);
            z-index: 9998;
            transform: translateY(20px);
            opacity: 0;
            transition: transform 0.3s ease-out, opacity 0.3s ease-out;
            pointer-events: none;
        }
        .hd-widget-chat.active {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
        }
        .hd-widget-chat-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            background-color: #1f2937;
            color: white;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .hd-widget-chat-header h3 {
            margin: 0;
            font-size: 16px;
        }
        .hd-widget-close-chat {
            background: none;
            border: none;
            color: white;
            font-size: 16px;
            cursor: pointer;
        }
        .hd-widget-chat-content {
            padding: 16px;
        }
        #hd-form input, #hd-form textarea, #hd-form select {
            width: 100%;
            padding: 8px;
            margin: 8px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        #hd-form button {
            width: 100%;
            padding: 8px;
            background-color: #1f2937;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .hd-progress-bar {
            width: 20px;
            height: 20px;
            border: 3px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-top-color: #1f2937;
            animation: spin 1s linear infinite;
            margin: 8px auto;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .hd-watermark {
            text-align: center;
            margin-top: 8px;
            font-size: 12px;
            color: #9CA3AF;
            opacity: 0.7;
        }
        .hd-redhelp {
            color: #3B82F6;
            font-weight: bold;
            text-decoration: none; /* Remove o sublinhado padrão */
        }
        .hd-redhelp:hover {
            text-decoration: underline; /* Adiciona sublinhado ao passar o mouse */
        }
    `;
    document.head.appendChild(style);

    // Ao enviar
    chat.querySelector("#hd-form").onsubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const submitButton = form.querySelector("#hd-submit-button");
        const progressBar = form.querySelector(".hd-progress-bar"); // Novo elemento

        submitButton.disabled = true;
        submitButton.innerText = "Enviando...";
        progressBar.style.display = "block"; // Mostra a barra de progresso

        const data = {
            title: form.title.value,
            description: form.description.value,
            priority: form.priority.value,
            name: form.name.value,
            email: form.email.value,
        };

        try {
            const res = await fetch(`https://helpback.webfacil.site/tickets/external?orgSlug=${slug}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                chat.querySelector(".hd-widget-chat-content").innerHTML = `
                    <div class="hd-success-message">
                        <p>Seu ticket foi registrado com sucesso! 🎉</p>
                        <p>Verifique seu e-mail para acompanhar o andamento do ticket.</p>
                    </div>
                `;
                setTimeout(() => {
                    chat.classList.remove("active");
                }, 3000);
            } else {
                const errorData = await res.json();
                showToast(`Erro: ${errorData.message || "Tente novamente mais tarde."}`, "error");
            }
        } catch (error) {
            console.error("Erro ao enviar ticket:", error);
            showToast("Erro de conexão. Tente novamente mais tarde.", "error");
        } finally {
            submitButton.disabled = false;
            submitButton.innerText = "Enviar";
            progressBar.style.display = "none"; // Oculta a barra de progresso
        }
    };

    // Toggle chat
    btn.onclick = () => {
        // Reseta o conteúdo do chat para o formulário sempre que o botão é clicado
        chat.querySelector(".hd-widget-chat-content").innerHTML = `
            <form id="hd-form">
                <input name="name" placeholder="Seu nome" required />
                <input name="email" placeholder="Seu e-mail" type="email" required />
                <input name="title" placeholder="Título do Problema" required />
                <textarea name="description" placeholder="Descrição do problema..." required></textarea>
                <select name="priority" required>
                    <option value="" disabled selected>Prioridade</option>
                    <option value="LOW">Baixa</option>
                    <option value="MEDIUM">Média</option>
                    <option value="HIGH">Alta</option>
                </select>
                <button type="submit" id="hd-submit-button">Enviar</button>
                <div class="hd-progress-bar" style="display: none;"></div> <!-- Novo elemento -->
                <div class="hd-watermark">Plano Grátis | <a href="https://redhelp.webfacil.site" target="_blank" class="hd-redhelp">RedHelp</a></div> <!-- Marca d'água atualizada com link -->
            </form>
        `;
        // Reativa o evento de submit
        chat.querySelector("#hd-form").onsubmit = async (e) => {
            e.preventDefault();
            const form = e.target;
            const submitButton = form.querySelector("#hd-submit-button");
            const progressBar = form.querySelector(".hd-progress-bar"); // Novo elemento

            submitButton.disabled = true;
            submitButton.innerText = "Enviando...";
            progressBar.style.display = "block"; // Mostra a barra de progresso

            const data = {
                title: form.title.value,
                description: form.description.value,
                priority: form.priority.value,
                name: form.name.value,
                email: form.email.value,
            };

            try {
                const res = await fetch(`https://helpback.webfacil.site/tickets/external?orgSlug=${slug}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                if (res.ok) {
                    // Mensagem de sucesso simplificada
                    chat.querySelector(".hd-widget-chat-content").innerHTML = `
                        <div class="hd-success-message">
                            <p>Seu ticket foi registrado com sucesso! 🎉</p>
                            <p>Verifique seu e-mail para acompanhar o andamento do ticket.</p>
                        </div>
                    `;
                    // Fecha o chat após 3 segundos
                    setTimeout(() => {
                        chat.classList.remove("active");
                    }, 3000);
                } else {
                    const errorData = await res.json();
                    // Toast para erro
                    showToast(`Erro: ${errorData.message || "Tente novamente mais tarde."}`, "error");
                }
            } catch (error) {
                // Toast para erro de conexão
                showToast("Erro de conexão. Tente novamente mais tarde.", "error");
            } finally {
                submitButton.disabled = false;
                submitButton.innerText = "Enviar";
                progressBar.style.display = "none"; // Oculta a barra de progresso
            }
        };
        // Alterna a visibilidade do chat
        chat.classList.toggle("active");
    };
    chat.querySelector(".hd-widget-close-chat").onclick = () => {
        chat.classList.remove("active");
    };

    document.body.appendChild(btn);
    document.body.appendChild(chat);
})();

// Função para exibir toasts
function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `hd-toast hd-toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Estilos para os toasts
const toastStyle = document.createElement("style");
toastStyle.textContent = `
    .hd-toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        border-radius: 4px;
        color: white;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    }
    .hd-toast-success {
        background-color: #10B981;
    }
    .hd-toast-error {
        background-color: #EF4444;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
`;
document.head.appendChild(toastStyle);
