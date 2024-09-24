function copyUrl(url, event) {
  event.preventDefault();
  const button = event.target;
  const originalText = button.textContent;

  navigator.clipboard.writeText(`https://dustindavis.me${url}`).then(
    () => {
      button.textContent = '✓ Copied!';
      button.style.backgroundColor = '#177c23';
      button.style.color = '#fff';

      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
        button.style.color = '';
      }, 2000);
    },
    err => {
      console.error('Could not copy text: ', err);
    }
  );
}

let visiblePosts = 12;
const postsPerPage = 12;
const totalPosts = Number.parseInt(document.getElementById('post-count').text);
let searchTerm = '';

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    loadMorePosts();
  }
});

function loadMorePosts() {
  const container = document.getElementById('blog-posts-container');
  const hiddenPosts = container.querySelectorAll('.blog-post-box[style="display: none;"]');
  let loadedCount = 0;

  for (let i = 0; i < hiddenPosts.length && loadedCount < postsPerPage; i++) {
    const post = hiddenPosts[i];
    if (postMatchesSearch(post)) {
      post.style.display = '';
      visiblePosts++;
      loadedCount++;
    }
  }

  if (visiblePosts >= totalPosts) {
    window.removeEventListener('scroll', loadMorePosts);
  }
}

function postMatchesSearch(post) {
  const title = post.querySelector('h2').textContent.toLowerCase();
  const description = post.querySelector('.css-b983i2').textContent.toLowerCase();
  const categories = Array.from(post.querySelectorAll('.blog-category')).map(cat => cat.textContent.toLowerCase());
  console.log('post', post);
  console.log('title', title);
  console.log('description', description);
  console.log('categories', categories);

  return (
    searchTerm === '' ||
    title.includes(searchTerm) ||
    description.includes(searchTerm) ||
    categories.some(category => category.includes(searchTerm))
  );
}

const searchInput = document.getElementById('search-input');
const blogPosts = document.querySelectorAll('.blog-post-box');
const categoryButtons = document.querySelectorAll('.blog-category');
const activeCategories = new Set();

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const debouncedSearch = debounce(() => {
  searchTerm = searchInput.value.toLowerCase();
  visiblePosts = 0;

  // Update URL with search term
  const url = new URL(window.location);
  if (searchTerm) {
    url.searchParams.set('q', searchTerm);
  } else {
    url.searchParams.delete('q');
  }
  history.pushState({}, '', url);

  for (const post of blogPosts) {
    if (postMatchesSearch(post)) {
      post.style.display = visiblePosts < postsPerPage ? '' : 'none';
      visiblePosts++;
    } else {
      post.style.display = 'none';
    }
  }
  updatePostCount();
}, 300);

function updatePostCount() {
  const postCount = document.getElementById('post-count');
  // if there is an active search tearm, use the search results count
  if (searchTerm !== '') {
    postCount.textContent = visiblePosts;
  } else {
    // otherwise, use the total number of posts
    postCount.textContent = document.getElementById('post-count').dataset.total;
  }
}

function loadSearchFromURL() {
  const url = new URL(window.location);
  const urlSearchTerm = url.searchParams.get('q');
  if (urlSearchTerm) {
    searchInput.value = urlSearchTerm;
    debouncedSearch();
    highlightCategoryButtons();
    updateDuckDuckGoSearchUrl();
  }
}
window.addEventListener('DOMContentLoaded', loadSearchFromURL);

searchInput.addEventListener('input', debouncedSearch);

for (const button of categoryButtons) {
  button.addEventListener('click', () => {
    const category = button.textContent.trim().toLowerCase();
    if (activeCategories.has(category)) {
      activeCategories.delete(category);
      button.classList.remove('active');
      removeSearchInput(category);
    } else {
      activeCategories.add(category);
      button.classList.add('active');
      addSearchInput(category);
    }
    debouncedSearch();
    updateDuckDuckGoSearchUrl();
  });
}

function removeSearchInput(category) {
  let currentSearch = searchInput.value;
  console.log('current search', currentSearch);
  currentSearch = currentSearch.replace(new RegExp(category, 'gi'), '').trim();
  searchInput.value = currentSearch;
}

function addSearchInput(category) {
  let currentSearch = searchInput.value;
  console.log('current search', currentSearch);
  currentSearch = `${currentSearch} ${category}`.trim();
  searchInput.value = currentSearch;
}

searchInput.addEventListener('input', handleSearchInput);

function handleSearchInput() {
  highlightCategoryButtons();
  updateDuckDuckGoSearchUrl();
}

function updateDuckDuckGoSearchUrl() {
  console.log('updateDuckDuckGoSearchUrl');
  const ddgAnchor = document.getElementById('duckduckgo-url');
  const baseSearchTerm = 'site:dustindavis.me ';
  const searchTerm = searchInput.value || 'automation';
  const ddgSearchTerm = baseSearchTerm + searchTerm;
  ddgAnchor.href = `https://duckduckgo.com/?q=${encodeURIComponent(ddgSearchTerm)}`;
}

function highlightCategoryButtons() {
  const terms = searchInput.value.toLowerCase().split(' ');
  activeCategories.clear();
  for (const button of categoryButtons) {
    const category = button.textContent.trim().toLowerCase();
    if (terms.includes(category)) {
      activeCategories.add(category);
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  }
}
