const GAME_DOWNLOAD = {
  url: 'https://github.com/CCastroo34/WebFisher/releases/download/1.0.0/WebFisher_v3.1.1_Setup.zip',
  fileName: 'WebFisher_v3.1.1_Setup.zip'
};

function executeDownload() {
  const link = document.createElement('a');
  link.href = GAME_DOWNLOAD.url;
  link.download = GAME_DOWNLOAD.fileName;
  link.rel = 'noopener noreferrer';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function setupModal() {
  if (document.getElementById('download-modal-root')) return;
  const root = document.createElement('div');
  root.id = 'download-modal-root';
  root.className = 'wf-modal-root';
  root.setAttribute('aria-hidden', 'true');
  root.innerHTML = `
    <div class="wf-modal-backdrop" data-dl-close></div>
    <div class="wf-modal-panel" role="dialog" aria-modal="true" aria-labelledby="dl-title">
      <div class="wf-modal-header">
        <h2 id="dl-title" data-es="Tu descarga está iniciando" data-en="Your download is starting">Tu descarga está iniciando</h2>
        <button type="button" class="wf-modal-close" data-dl-close aria-label="Cerrar">&times;</button>
      </div>
      <div class="wf-modal-body">
        <p><span data-es="La descarga debería comenzar en unos segundos. El archivo es" data-en="The download should start in a few seconds. The file is">La descarga debería comenzar en unos segundos. El archivo es</span> <code>${GAME_DOWNLOAD.fileName}</code>.</p>
        <ol>
          <li data-es="Cuando termine, abre el archivo desde tu carpeta de Descargas." data-en="When it finishes, open the file from your Downloads folder.">Cuando termine, abre el archivo desde tu carpeta de Descargas.</li>
          <li data-es="Extrae el archivo ZIP en una carpeta de tu elección." data-en="Extract the ZIP file to a folder of your choice.">Extrae el archivo ZIP en una carpeta de tu elección.</li>
          <li data-es="Si Windows muestra SmartScreen, pulsa 'Más información' y 'Ejecutar de todas formas'." data-en="If Windows shows SmartScreen, click 'More info' then 'Run anyway'.">Si Windows muestra SmartScreen, pulsa "Más información" y "Ejecutar de todas formas".</li>
          <li data-es="Sigue los pasos del instalador para jugar." data-en="Follow the installer steps to play.">Sigue los pasos del instalador para jugar.</li>
        </ol>
      </div>
      <div class="wf-modal-footer">
        <button type="button" class="btn btn-primary" data-dl-close data-es="Entendido" data-en="Got it">Entendido</button>
      </div>
    </div>
  `;
  document.body.appendChild(root);
  root.querySelectorAll('[data-dl-close]').forEach((el) => el.addEventListener('click', closeModal));
}

function openModal() {
  setupModal();
  const root = document.getElementById('download-modal-root');
  root.classList.add('open');
  root.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const root = document.getElementById('download-modal-root');
  if (!root) return;
  root.classList.remove('open');
  root.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

export function initDownloadModal() {
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  document.querySelectorAll('[data-download-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => { executeDownload(); openModal(); });
  });
}
