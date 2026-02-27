export function gerarEmail() {
    const timestamp = Date.now();
    return `qa_${timestamp}@teste.com`;
}