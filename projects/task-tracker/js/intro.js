
// Function to fetch and display content
function loadContent(url, sectionId,contentClass) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(data, 'text/html');
      const section = htmlDoc.getElementById(sectionId);
      section.setAttribute('data-simplebar','')
      section.setAttribute('data-simplebar-auto-hide','false')

      console.log(sectionId)
      if (section) {
        const contentElement = document.querySelector(contentClass);
        contentElement.innerHTML = section.outerHTML;
        contentElement.style.opacity = 0;
        setTimeout(() => {
          contentElement.style.opacity = 1;
          contentElement.style.transition = 'opacity 0.5s ease';
        }, 0);
        
      } else {
        console.log(`Section with ID '${sectionId}' not found.`);
      }
    })
    .catch(error => {
      console.log('An error occurred:', error);
    });
}


document.querySelector('.js-load-lesson').addEventListener('click', () => {
  // loadContent('content/lessons.html', 'content','.content');
  loadContent('content/lessons.html', 'lesson7','.lessons');
  
})

function attachClickListener(className, lessonNumber) {
  document.querySelector(className).addEventListener('click', () => {
    loadContent('content/lessons.html', 'lesson' + lessonNumber, '.lessons');
  });
}

attachClickListener('.cpu', 2);
attachClickListener('.ram', 3);
attachClickListener('.storage', 4);
attachClickListener('.io', 5);
attachClickListener('.hardware-and-software', 6);
attachClickListener('.os', 7);
attachClickListener('.as', 8);
attachClickListener('.programming', 9);
