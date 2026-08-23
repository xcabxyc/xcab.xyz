/* ============================================================
   XCABXYC — Day Powley Portfolio
   Loads portfolio-data.json and renders the grid, filters,
   click-to-expand detail views and external links.
   You normally never need to edit this file — change your
   content in portfolio-data.json instead.
   ============================================================ */

(function () {
  var gridEl = document.getElementById('grid');
  var detailEl = document.getElementById('detail');
  var navEl = document.getElementById('nav');
  var logoEl = document.getElementById('logo');

  var DATA = { categories: [], items: [] };
  var activeFilter = 'all';

  /* ----- Load the JSON data ----- */
  fetch('portfolio-data.json')
    .then(function (res) {
      if (!res.ok) throw new Error('Could not load portfolio-data.json');
      return res.json();
    })
    .then(function (data) {
      DATA = data;
      buildNav();
      renderGrid();
    })
    .catch(function (err) {
      gridEl.innerHTML =
        '<p style="font-size:14px;color:#b00;">' +
        'Could not load portfolio-data.json. If you are opening index.html ' +
        'directly from your file system, run a local web server instead ' +
        '(see the guide). On GitHub Pages it works automatically.</p>';
      console.error(err);
    });

  /* ----- Build navigation ----- */
  function buildNav() {
    var links = [{ label: 'all', filter: 'all' }];
    (DATA.categories || []).forEach(function (cat) {
      links.push({ label: cat.toLowerCase(), filter: cat });
    });

    navEl.innerHTML = '';
    links.forEach(function (item) {
      var sep = document.createElement('span');
      sep.className = 'sep';
      sep.textContent = '/';
      navEl.appendChild(sep);

      var btn = document.createElement('button');
      btn.textContent = item.label;
      var isFilter = item.label !== 'all';
      if (isFilter && activeFilter === item.filter) btn.classList.add('active');
      btn.addEventListener('click', function () {
        activeFilter = item.filter;
        hideDetail();
        renderGrid();
        buildNav();
      });
      navEl.appendChild(btn);
    });
  }

  /* ----- Render the grid ----- */
  function renderGrid() {
    hideDetail();
    gridEl.hidden = false;
    gridEl.innerHTML = '';

    var items = (DATA.items || []).filter(function (it) {
      return activeFilter === 'all' || it.category === activeFilter;
    });

    items.forEach(function (item) {
      var block = document.createElement('button');
      block.className = 'block';

      var thumb = document.createElement('div');
      thumb.className = 'thumb';

      var img = document.createElement('img');
      img.src = item.image;
      img.alt = item.title || 'Portfolio item';
      img.loading = 'lazy';
      thumb.appendChild(img);

      var overlay = document.createElement('div');
      overlay.className = 'overlay';
      var otext = document.createElement('span');
      otext.textContent = item.title + (item.link ? ' ↗' : '');
      overlay.appendChild(otext);
      thumb.appendChild(overlay);

      block.appendChild(thumb);

      var caption = document.createElement('div');
      caption.className = 'caption';
      caption.innerHTML =
        '<span>' + item.year + '</span>' +
        '<span class="dash">—</span>' +
        '<span>' + item.category + '</span>';
      block.appendChild(caption);

      block.addEventListener('click', function () {
        if (item.link) {
          window.open(item.link, '_blank', 'noopener,noreferrer');
        } else {
          showDetail(item);
        }
      });

      gridEl.appendChild(block);
    });
  }

  /* ----- Show the expanded detail view ----- */
  function showDetail(item) {
    gridEl.hidden = true;
    detailEl.hidden = false;
    detailEl.innerHTML = '';

    var back = document.createElement('button');
    back.className = 'back';
    back.innerHTML = '← Back';
    back.addEventListener('click', renderGrid);
    detailEl.appendChild(back);

    var top = document.createElement('div');
    top.className = 'detail-top';

    var imgWrap = document.createElement('div');
    imgWrap.className = 'detail-image';
    var img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title;
    imgWrap.appendChild(img);
    top.appendChild(imgWrap);

    var info = document.createElement('div');
    var meta = document.createElement('div');
    meta.className = 'detail-meta';
    meta.textContent = item.year + ' — ' + item.category;
    var title = document.createElement('h2');
    title.className = 'detail-title';
    title.textContent = item.title;
    var desc = document.createElement('p');
    desc.className = 'detail-desc';
    desc.innerHTML = item.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    info.appendChild(meta);
    info.appendChild(title);
    info.appendChild(desc);
    top.appendChild(info);

    detailEl.appendChild(top);

    if (item.gallery && item.gallery.length) {
      var gallery = document.createElement('div');
      gallery.className = 'gallery';
      item.gallery.forEach(function (src, i) {
        var gi = document.createElement('div');
        gi.className = 'g-item';
        var gimg = document.createElement('img');
        gimg.src = src;
        gimg.alt = item.title + ' image ' + (i + 1);
        gi.appendChild(gimg);
        gallery.appendChild(gi);
      });
      detailEl.appendChild(gallery);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function hideDetail() {
    detailEl.hidden = true;
    detailEl.innerHTML = '';
  }

  /* ----- Helpers ----- */
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  logoEl.addEventListener('click', function () {
    activeFilter = 'all';
    renderGrid();
    buildNav();
  });
})();
