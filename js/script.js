document.getElementById('generate-html').addEventListener('click', () => {
  const headerText = document.getElementById('header-text').value;
  const headerBg = document.getElementById('header-bg').value;
  const headerTextColor = document.getElementById('header-text-color').value;
  const headerBorder = document.getElementById('header-border').value;
  const headerSpacing = document.getElementById('header-spacing').value;
  const headerImageInput = document.getElementById('header-image');
  let headerImageSrc = '';

  if (headerImageInput.files && headerImageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      headerImageSrc = e.target.result;

      const headerHtml = `
        <header style="
          background-color: ${headerBg};
          color: ${headerTextColor};
          border: ${headerBorder};
          padding: ${headerSpacing};
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
          <div>
            <h1>${headerText}</h1>
          </div>
          <div>
            <img src="${headerImageSrc}" alt="Imagem do Cabeçalho" style="max-height: 100px;">
          </div>
        </header>
      `;

      generatePage(headerHtml);
    };
    reader.readAsDataURL(headerImageInput.files[0]);
  } else {
    const headerHtml = `
      <header style="
        background-color: ${headerBg};
        color: ${headerTextColor};
        border: ${headerBorder};
        padding: ${headerSpacing};
        display: flex;
        align-items: center;
        justify-content: space-between;
      ">
        <div>
          <h1>${headerText}</h1>
        </div>
      </header>
    `;

    generatePage(headerHtml);
  }
});

function generatePage(headerHtml) {
  const menuItems = document.getElementById('menu-items').value.split(',');
  const menuBg = document.getElementById('menu-bg').value;
  const menuTextColor = document.getElementById('menu-text-color').value;
  const menuBorder = document.getElementById('menu-border').value;
  const menuSpacing = document.getElementById('menu-spacing').value;
  const menuImageInput = document.getElementById('menu-image');
  let menuImageSrc = '';

  if (menuImageInput.files && menuImageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      menuImageSrc = e.target.result;

      const menuHtml = `
        <nav style="
          background-color: ${menuBg};
          color: ${menuTextColor};
          border: ${menuBorder};
          padding: ${menuSpacing};
        ">
          <img src="${menuImageSrc}" alt="Imagem do Menu">
          <ul>
            ${menuItems.map(item => `<li style="color: ${menuTextColor};">${item.trim()}</li>`).join('')}
          </ul>
        </nav>
      `;

      generateFullPage(headerHtml, menuHtml);
    };
    reader.readAsDataURL(menuImageInput.files[0]);
  } else {
    const menuHtml = `
      <nav style="
        background-color: ${menuBg};
        color: ${menuTextColor};
        border: ${menuBorder};
        padding: ${menuSpacing};
      ">
        <ul>
          ${menuItems.map(item => `<li style="color: ${menuTextColor};">${item.trim()}</li>`).join('')}
        </ul>
      </nav>
    `;

    generateFullPage(headerHtml, menuHtml);
  }
}

function generateFullPage(headerHtml, menuHtml) {
  const galleryItems = parseInt(document.getElementById('gallery-items').value, 10);
  const formTitle = document.getElementById('form-title').value;

  const footerText = document.getElementById('footer-text').value;
  const footerBg = document.getElementById('footer-bg').value;
  const footerTextColor = document.getElementById('footer-text-color').value;
  const footerFontSize = document.getElementById('footer-font-size').value;
  const footerTextAlign = document.getElementById('footer-text-align').value;

  const footerHtml = `
    <footer style="
      background-color: ${footerBg};
      color: ${footerTextColor};
      font-size: ${footerFontSize};
      text-align: ${footerTextAlign};
      padding: 10px;
    ">
      <p>${footerText}</p>
    </footer>
  `;

  let galleryHtml = '<div class="gallery">';
  for (let i = 0; i < galleryItems; i++) {
    galleryHtml += `<div class="card">Card ${i + 1}</div>`;
  }
  galleryHtml += '</div>';

  const html = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Título da Página</title>
    </head>
    <body>
      ${headerHtml}
      ${menuHtml}
      ${galleryHtml}
      <form>
        <h2>${formTitle}</h2>
      </form>
      ${footerHtml}
    </body>
    </html>
  `;

  document.getElementById('preview').innerHTML = html;
  document.getElementById('generated-code').textContent = html;
}

document.getElementById('save-code').addEventListener('click', () => {
  const code = document.getElementById('generated-code').textContent;
  localStorage.setItem('htmlCode', code);
  alert('Código salvo no LocalStorage!');
});

document.getElementById('load-code').addEventListener('click', () => {
  const code = localStorage.getItem('htmlCode');
  if (code) {
    document.getElementById('generated-code').textContent = code;
    document.getElementById('preview').innerHTML = code;
  } else {
    alert('Nenhum código encontrado no LocalStorage.');
  }
});

document.getElementById('clear-storage').addEventListener('click', () => {
  localStorage.clear();
  alert('LocalStorage limpo!');
});