document.addEventListener("DOMContentLoaded", () => {
  const programData = {
    "mali-kreatori": {
      title: "КЛУБ: МАЛИ КРЕАТОРИ (6–9 години)",
      description: `Забавно патување низ приказни, игри и проекти каде децата ги учат основите на претприемништвото, тимската работа и креативното размислување. Преку фантазија и пракса, ги развиваат самодовербата и животните вештини додека создаваат нешто свое.`,
      schedule: `Траење: 4 недели.<br>Сесии: недела, 11:00–12:30 ч.`,
      format: `Физички и далечински.`,
      teacher: `Јана Џеков`,
      teacherBio: "/html/instructors.html#јана-џеков",
      price: `3000 МКД`,
      image: "../assets/images/Edu Cards/mali-kreatori.png",
    },
    "idni-osnovaci": {
      title: "КЛУБ: ИДНИ ОСНОВАЧИ (10–14 години)",
      description: `Патување во светот на бизнисот, иновациите и лидерството! Преку практични проекти и тимски предизвици, децата учат како да развиваат идеи, креираат бизнис планови и да комуницираат самоуверено. Идеално за градење лидерски и претприемачки вештини.`,
      schedule: `Траење: 4 недели.<br>Сесии: сабота, 11:00–13:00 ч.`,
      format: `Физички и далечински.`,
      teacher: `Елена Хаџи Пецова`,
      teacherBio: "/html/instructors.html#елена-хаџи-пецова",
      price: `3500 МКД`,
      image: "../assets/images/Edu Cards/idni-osnovaci.png",
    },
    "mini-startapdzii": {
      title: "КЛУБ: МИНИ СТАРТАПЏИИ (15–18 години)",
      description: `Место каде младите учат како да градат идеи, креираат бизнис-планови и стануваат лидери. Совршен предизвик за тинејџери кои сакаат да размислуваат креативно и делуваат проактивно.`,
      schedule: `Траење: 4 недели.<br>Сесии: сабота, 13:30–15:30 ч.`,
      format: `Физички и далечински.`,
      teacher: `Виктор Митевски`,
      teacherBio: "/html/instructors.html#виктор-митевски",
      price: `4000 МКД`,
      image: "../assets/images/Edu Cards/mini-startapdzii.png",
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const selectedProgram = urlParams.get("program");
  const details = programData[selectedProgram];
  const container = document.getElementById("program-details");

  if (details && container) {
    container.innerHTML = `

      <h1>${details.title}</h1>
      <div class="edu-image-wrapper">
        <img src="${details.image}" alt="${details.title}" loading="lazy">
      </div>
      <p>${details.description}</p>
      <h3>🗓 Распоред</h3>
      <p>${details.schedule}</p>
      <h3>📍 Формат на предавања</h3>
      <p>${details.format}</p>
      <h3>👩‍🏫 Предавач</h3>
      <p>${details.teacher}</p>
      <a href="${details.teacherBio}" class="btn-main btn-main-secondary" style="margin-bottom:1rem;">Повеќе за предавачот</a>
      <h3>💰 Цена</h3>
      <p>${details.price}</p>
      <a href="/html/contact.html" class="btn-main btn-main-secondary">Запиши се →</a>
    `;
  } else if (container) {
    container.innerHTML = `<p>Програмата не е пронајдена.</p>`;
  }

  // Sorting and Filtering Functionality
  const sortSelect = document.getElementById('sort-select');
  const filterAge = document.getElementById('filter-age');
  const coursesContainer = document.querySelector('.courses-container');
  const cards = Array.from(document.querySelectorAll('.course-card'));

  function sortCards(sortValue) {
    const sortedCards = [...cards].sort((a, b) => {
      const ageA = a.dataset.age.split('-')[0];
      const ageB = b.dataset.age.split('-')[0];
      
      if (sortValue === 'age-asc') {
        return parseInt(ageA) - parseInt(ageB);
      } else if (sortValue === 'age-desc') {
        return parseInt(ageB) - parseInt(ageA);
      }
      return 0;
    });

    // Clear container and append sorted cards
    coursesContainer.innerHTML = '';
    sortedCards.forEach(card => {
      if (filterAge.value === 'all' || card.dataset.age === filterAge.value) {
        coursesContainer.appendChild(card);
      }
    });
  }

  function filterCards() {
    const selectedAge = filterAge.value;
    cards.forEach(card => {
      if (selectedAge === 'all' || card.dataset.age === selectedAge) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Event listeners
  sortSelect.addEventListener('change', () => {
    sortCards(sortSelect.value);
  });

  filterAge.addEventListener('change', () => {
    filterCards();
    if (sortSelect.value !== 'default') {
      sortCards(sortSelect.value);
    }
  });
});
